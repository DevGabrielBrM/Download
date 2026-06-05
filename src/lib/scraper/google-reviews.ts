import { execSync } from 'child_process';
import { BaseScraper, ScraperResult, ScrapedReview } from './types';

export class GoogleReviewsScraper extends BaseScraper {
  async scrape(url: string): Promise<ScraperResult> {
    try {
      const escapedUrl = url.replace(/"/g, '\\"');
      // Using agent-browser chat to perform the complex task of finding and clicking reviews
      const command = `agent-browser chat "Open ${escapedUrl}, find and click the reviews tab or link, and then extract the reviews (author, rating, title, body, date) as a JSON array."`;
      
      const output = execSync(command, { encoding: 'utf8' });
      
      const jsonMatch = output.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Could not find review data in browser output');
      }
      
      const rawReviews = JSON.parse(jsonMatch[0]);
      
      const reviews: ScrapedReview[] = rawReviews.map((r: any) => ({
        author: r.author || 'Anonymous',
        rating: typeof r.rating === 'number' ? r.rating : parseInt(String(r.rating || '0')),
        title: r.title,
        body: r.body || r.content || '',
        date: r.date || new Date().toISOString()
      }));
      
      return {
        reviews,
        platform: 'google_reviews'
      };
    } catch (error: any) {
      console.error('Google Reviews scraping error:', error.message);
      return { reviews: [], platform: 'google_reviews' };
    }
  }
}
