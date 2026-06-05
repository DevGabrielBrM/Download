import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'feedbackflow-secret-key-12345';

export interface AuthPayload {
  userId: string;
  email: string;
  workspaceId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Helper to get the authenticated user from the request
 */
export function getAuth(req: NextRequest): AuthPayload | null {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.cookies.get('token')?.value;

  if (!token) return null;
  return verifyToken(token);
}

/**
 * Middleware-like helper for protected routes
 */
export function withAuth(handler: (req: NextRequest, auth: AuthPayload) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const auth = getAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, auth);
  };
}
