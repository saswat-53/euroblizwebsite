import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAuthenticated: boolean;
  createdAt: number;
}

function getSessionSecret(): string {
  const secret = process.env.KEYSTATIC_SESSION_SECRET;

  if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error(
      'KEYSTATIC_SESSION_SECRET environment variable must be set in production'
    );
  }

  return secret || 'complex_password_at_least_32_characters_long_for_dev_only';
}

export const sessionOptions: SessionOptions = {
  password: getSessionSecret(),
  cookieName: 'admin_auth_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  },
};

export const ADMIN_USERNAME = process.env.KEYSTATIC_ADMIN_USERNAME || '';
export const ADMIN_PASSWORD = process.env.KEYSTATIC_ADMIN_PASSWORD || '';
export const LOGIN_PAGE = '/keystatic-login';
export const KEYSTATIC_ROUTES = ['/keystatic', '/api/keystatic'];
