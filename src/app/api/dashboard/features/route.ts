import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, auth) => {
  try {
    const features = db.query(`
      SELECT 
        fr.*,
        r.author as review_author,
        r.body as review_body
      FROM feature_requests fr
      JOIN reviews r ON fr.review_id = r.id
      JOIN review_sources rs ON r.review_source_id = rs.id
      WHERE rs.workspace_id = '${auth.workspaceId}'
      ORDER BY fr.votes DESC, fr.created_at DESC
    `);

    return NextResponse.json({ features });
  } catch (error: any) {
    console.error('Get feature requests error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
