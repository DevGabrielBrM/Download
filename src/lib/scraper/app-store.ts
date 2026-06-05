import { BaseScraper, ScraperResult, ScrapedReview } from './types';

export class AppStoreScraper extends BaseScraper {
  async scrape(url: string): Promise<ScraperResult> {
    try {
      const appIdMatch = url.match(/\/id(\d+)/);
      if (!appIdMatch) {
        throw new Error('Invalid App Store URL');
      }
      
      const appId = appIdMatch[1];
      const rssUrl = `https://itunes.apple.com/rss/customerreviews/id=${appId}/json`;
      
      const response = await fetch(rssUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch App Store reviews: ${response.statusText}`);
      }
      
      const data = await response.json();
      const entries = data.feed?.entry || [];
      
      const reviews: ScrapedReview[] = entries.map((entry: any) => ({
        author: entry.author?.name?.label || 'Anonymous',
        rating: parseInt(entry['im:rating']?.label || '0'),
        title: entry.title?.label,
        body: entry.content?.label || '',
        date: entry.updated?.label || new Date().toISOString()
      }));
      
      return {
        reviews,
        platform: 'app_store'
      };
    } catch (error: any) {
      console.error('App Store scraping error:', error.message);
      return { reviews: [], platform: 'app_store' };
    }
  }
}
