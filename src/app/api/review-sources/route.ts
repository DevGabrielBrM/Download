import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, auth) => {
  try {
    const sources = db.query(`SELECT * FROM review_sources WHERE workspace_id = '${auth.workspaceId}' ORDER BY created_at DESC`);
    return NextResponse.json({ sources });
  } catch (error: any) {
    console.error('Get review sources error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});

export const POST = withAuth(async (req, auth) => {
  try {
    const { url, platform, name } = await req.json();

    if (!url || !platform) {
      return NextResponse.json({ error: 'URL and platform are required' }, { status: 400 });
    }

    const id = uuidv4();
    const escapedUrl = db.escape(url);
    const escapedPlatform = db.escape(platform);
    const escapedName = db.escape(name || '');

    db.execute(`
      INSERT INTO review_sources (id, workspace_id, url, platform, name)
      VALUES ('${id}', '${auth.workspaceId}', '${escapedUrl}', '${escapedPlatform}', '${escapedName}')
    `);

    return NextResponse.json({ 
      source: { id, workspace_id: auth.workspaceId, url, platform, name },
      message: 'Review source added successfully'
    });
  } catch (error: any) {
    console.error('Add review source error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
