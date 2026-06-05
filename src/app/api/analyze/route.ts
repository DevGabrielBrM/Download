import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { analyzeReview } from '@/lib/analyzer';

export const POST = withAuth(async (req) => {
  try {
    const { review_source_id, review_ids } = await req.json();

    let sql = `SELECT * FROM reviews WHERE id NOT IN (SELECT review_id FROM sentiment_analyses)`;
    
    if (review_ids && Array.isArray(review_ids)) {
      const ids = review_ids.map(id => `'${db.escape(id)}'`).join(',');
      sql += ` AND id IN (${ids})`;
    } else if (review_source_id) {
      sql += ` AND review_source_id = '${db.escape(review_source_id)}'`;
    }

    const reviews = db.query(sql);

    if (reviews.length === 0) {
      return NextResponse.json({ 
        message: 'No pending reviews to analyze', 
        count: 0 
      });
    }

    let analyzedCount = 0;

    for (const review of reviews) {
      try {
        const result = await analyzeReview(review.title || '', review.body);
        
        // Save sentiment
        const sentimentId = uuidv4();
        db.execute(`
          INSERT INTO sentiment_analyses (id, review_id, sentiment, score)
          VALUES ('${sentimentId}', '${review.id}', '${result.sentiment}', ${result.sentimentScore})
        `);

        // Save Bug Report if applicable
        if (result.category === 'bug') {
          const bugId = uuidv4();
          db.execute(`
            INSERT INTO bug_reports (id, review_id, title, description, severity)
            VALUES ('${bugId}', '${review.id}', '${db.escape(result.title)}', '${db.escape(result.description)}', '${result.severity || 'medium'}')
          `);
        }

        // Save Feature Request if applicable
        if (result.category === 'feature') {
          const featureId = uuidv4();
          db.execute(`
            INSERT INTO feature_requests (id, review_id, title, description)
            VALUES ('${featureId}', '${review.id}', '${db.escape(result.title)}', '${db.escape(result.description)}')
          `);
        }

        analyzedCount++;
      } catch (err) {
        console.error(`Failed to analyze review ${review.id}:`, err);
      }
    }

    return NextResponse.json({ 
      message: `Successfully analyzed ${analyzedCount} reviews`, 
      count: analyzedCount 
    });
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
});
