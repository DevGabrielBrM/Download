import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, auth) => {
  try {
    const user = db.one(`SELECT id, email, name FROM users WHERE id = '${auth.userId}'`);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const workspace = db.one(`SELECT * FROM workspaces WHERE id = '${auth.workspaceId}'`);

    return NextResponse.json({ 
      user: {
        ...user,
        workspace
      } 
    });
  } catch (error: any) {
    console.error('Get current user error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
