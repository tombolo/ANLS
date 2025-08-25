// app/api/auth/signup.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    console.log('[Signup] API endpoint hit');

    try {
        // Parse request body
        const requestBody = await request.json();
        console.log('[Signup] Request body:', JSON.stringify(requestBody, null, 2));

        const { email, password, name } = requestBody;

        // Validate required fields
        if (!email || !password || !name) {
            console.error('[Signup] Missing required fields');
            return NextResponse.json(
                {
                    success: false,
                    error: 'All fields are required',
                    missingFields: {
                        email: !email,
                        password: !password,
                        name: !name
                    }
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('[Signup] Invalid email format');
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            console.error('[Signup] Password too short');
            return NextResponse.json(
                { success: false, error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        console.log('[Signup] Connecting to MongoDB...');
        const client = await clientPromise;
        const db = client.db();
        console.log('[Signup] Connected to MongoDB');

        // Check for existing user
        console.log('[Signup] Checking for existing user with email:', email);
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            console.error('[Signup] User already exists');
            return NextResponse.json(
                {
                    success: false,
                    error: 'User already exists',
                    existingEmail: email
                },
                { status: 409 } // 409 Conflict
            );
        }

        // Hash password
        console.log('[Signup] Hashing password...');
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('[Signup] Password hashed successfully');

        // Create new user
        console.log('[Signup] Creating new user document...');
        const currentDate = new Date();
        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            name,
            balance: 0,
            createdAt: currentDate,
            updatedAt: currentDate,
            emailVerified: null,
            role: 'user'
        });

        console.log('[Signup] User created successfully with ID:', result.insertedId);

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            userId: result.insertedId,
            user: {
                email,
                name
            }
        }, { status: 201 });

    } catch (error) {
        console.error('[Signup] Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Add TypeScript interface for response
export interface SignupResponse {
    success: boolean;
    message?: string;
    error?: string;
    userId?: string;
    user?: {
        email: string;
        name: string;
    };
    missingFields?: {
        email: boolean;
        password: boolean;
        name: boolean;
    };
    existingEmail?: string;
    details?: string;
}