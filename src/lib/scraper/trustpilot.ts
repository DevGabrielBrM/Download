import { execSync } from 'child_process';
import { BaseScraper, ScraperResult, ScrapedReview } from './types';

export class TrustpilotScraper extends BaseScraper {
  async scrape(url: string, maxPages: number = 3): Promise<ScraperResult> {
    const allReviews: ScrapedReview[] = [];
    
    try {
      for (let page = 1; page <= maxPages; page++) {
        const pageUrl = page === 1 ? url : `${url}?page=${page}`;
        console.log(`Scraping Trustpilot page ${page}: ${pageUrl}`);
        
        const escapedUrl = pageUrl.replace(/"/g, '\\"');
        const command = `agent-browser open "${escapedUrl}" && agent-browser wait 2000 && agent-browser eval "Array.from(document.querySelectorAll('article')).map(a => ({title: a.querySelector('h2')?.innerText, body: a.querySelector('p')?.innerText, rating: a.querySelector('img[alt^=\\\"Rated\\\"]')?.alt, author: a.querySelector('[data-consumer-name-typography=\\\"true\\\"]')?.innerText, date: a.querySelector('time')?.getAttribute('datetime')}))"`;
        
        const output = execSync(command, { encoding: 'utf8' });
        const jsonMatch = output.match(/\[[\s\S]*\]/);
        
        if (!jsonMatch) break;
        
        const rawReviews = JSON.parse(jsonMatch[0]);
        if (rawReviews.length === 0) break;
        
        const reviews: ScrapedReview[] = rawReviews.map((r: any) => ({
          author: r.author || 'Anonymous',
          rating: this.parseRating(r.rating),
          title: r.title,
          body: r.body || '',
          date: r.date || new Date().toISOString()
        }));
        
        allReviews.push(...reviews);
        
        // If we got fewer than 20 reviews, it might be the last page
        if (reviews.length < 15) break;
      }
      
      return {
        reviews: allReviews,
        platform: 'trustpilot'
      };
    } catch (error: any) {
      console.error('Trustpilot scraping error:', error.message);
      return { reviews: [], platform: 'trustpilot' };
    }
  }

  private parseRating(ratingStr: string): number {
    if (!ratingStr) return 0;
    const match = ratingStr.match(/Rated (\d) out of 5 stars/);
    return match ? parseInt(match[1]) : 0;
  }
}
