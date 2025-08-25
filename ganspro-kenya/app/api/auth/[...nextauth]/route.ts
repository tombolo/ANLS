import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db();

                const user = await db
                    .collection("users")
                    .findOne({ email: credentials?.email });

                if (!user) return null;

                const isValid = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
                if (!isValid) return null;

                // ✅ Make sure role is returned (default = "student")
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role || "student",
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role; // ✅ attach role
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as any).id = token.id;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                (session.user as any).role = token.role; // ✅ attach role
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
