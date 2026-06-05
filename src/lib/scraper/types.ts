export interface ScrapedReview {
  author: string;
  rating: number;
  title?: string;
  body: string;
  date: string;
}

export interface ScraperResult {
  reviews: ScrapedReview[];
  platform: string;
}

export abstract class BaseScraper {
  abstract scrape(url: string): Promise<ScraperResult>;
}
