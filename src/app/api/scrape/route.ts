import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { scrapeReviewSource } from '@/lib/scraper';

export const POST = withAuth(async (req, auth) => {
  try {
    const { review_source_id } = await req.json();

    if (!review_source_id) {
      return NextResponse.json({ error: 'Review source ID is required' }, { status: 400 });
    }

    // Get source details
    const source = db.one(`SELECT * FROM review_sources WHERE id = '${db.escape(review_source_id)}' AND workspace_id = '${auth.workspaceId}'`);
    if (!source) {
      return NextResponse.json({ error: 'Review source not found' }, { status: 404 });
    }

    // Scrape reviews
    const { reviews } = await scrapeReviewSource(source.url);

    if (reviews.length === 0) {
      return NextResponse.json({ 
        message: 'No reviews found or scraping failed', 
        count: 0 
      });
    }

    // Save reviews to database
    let savedCount = 0;
    for (const review of reviews) {
      const reviewId = uuidv4();
      try {
        db.execute(`
          INSERT INTO reviews (id, review_source_id, author, rating, title, body, date)
          VALUES (
            '${reviewId}', 
            '${source.id}', 
            '${db.escape(review.author)}', 
            ${review.rating}, 
            '${db.escape(review.title || '')}', 
            '${db.escape(review.body)}', 
            '${db.escape(review.date)}'
          )
        `);
        savedCount++;
      } catch (err) {
        // Skip duplicate reviews or other errors
        console.error('Failed to save review:', err);
      }
    }

    return NextResponse.json({ 
      message: `Successfully scraped and saved ${savedCount} reviews`, 
      count: savedCount 
    });
  } catch (error: any) {
    console.error('Scrape API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
