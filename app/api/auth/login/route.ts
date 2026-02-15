import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth/session';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '@/lib/auth/config';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { username, password } = result.data;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('KEYSTATIC_ADMIN_USERNAME or KEYSTATIC_ADMIN_PASSWORD not configured in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Simple username and password comparison
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Add delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));

      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create session
    const session = await getSession();
    session.isAuthenticated = true;
    session.createdAt = Date.now();
    await session.save();

    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
