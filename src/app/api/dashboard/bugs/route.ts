import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, auth) => {
  try {
    const bugs = db.query(`
      SELECT 
        br.*,
        r.author as review_author,
        r.body as review_body
      FROM bug_reports br
      JOIN reviews r ON br.review_id = r.id
      JOIN review_sources rs ON r.review_source_id = rs.id
      WHERE rs.workspace_id = '${auth.workspaceId}'
      ORDER BY br.created_at DESC
    `);

    return NextResponse.json({ bugs });
  } catch (error: any) {
    console.error('Get bug reports error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
