import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
