import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req, auth) => {
  try {
    // Aggregated sentiment stats for the current workspace
    const stats = db.query(`
      SELECT 
        sa.sentiment,
        COUNT(*) as count
      FROM sentiment_analyses sa
      JOIN reviews r ON sa.review_id = r.id
      JOIN review_sources rs ON r.review_source_id = rs.id
      WHERE rs.workspace_id = '${auth.workspaceId}'
      GROUP BY sa.sentiment
    `);

    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error('Get sentiment stats error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
