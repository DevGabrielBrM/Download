import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const escapedEmail = db.escape(email);
    const escapedName = db.escape(name || '');

    // Check if user exists
    const existingUser = db.one(`SELECT id FROM users WHERE email = '${escapedEmail}'`);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const userId = uuidv4();
    const passwordHash = await hashPassword(password);
    
    // Create user
    db.execute(`INSERT INTO users (id, email, name, password_hash) VALUES ('${userId}', '${escapedEmail}', '${escapedName}', '${passwordHash}')`);

    // Create a default workspace for the user
    const workspaceId = uuidv4();
    const workspaceName = `${name || 'My'}'s Workspace`;
    db.execute(`INSERT INTO workspaces (id, user_id, name) VALUES ('${workspaceId}', '${userId}', '${db.escape(workspaceName)}')`);

    const token = generateToken({ userId, email, workspaceId });

    const response = NextResponse.json({ 
      user: { id: userId, email, name: escapedName, workspaceId },
      message: 'User registered successfully'
    });
    
    // Set cookie
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
