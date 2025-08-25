import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // Custom role check
        const role = req.nextauth?.token?.role;

        if (req.nextUrl.pathname.startsWith("/dashboard") && role !== "admin") {
            return Response.redirect(new URL("/studentportal", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/studentportal") && role !== "student") {
            return Response.redirect(new URL("/dashboard", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // only allow signed in users
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/studentportal/:path*"], // protect these routes
};
