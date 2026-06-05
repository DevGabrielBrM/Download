import { TrustpilotScraper } from './trustpilot';
import { AppStoreScraper } from './app-store';
import { GoogleReviewsScraper } from './google-reviews';
import { ScraperResult } from './types';

export async function scrapeReviewSource(url: string): Promise<ScraperResult> {
  if (url.includes('trustpilot.com')) {
    return new TrustpilotScraper().scrape(url);
  } else if (url.includes('apps.apple.com')) {
    return new AppStoreScraper().scrape(url);
  } else if (url.includes('google.com/maps') || url.includes('goo.gl/maps')) {
    return new GoogleReviewsScraper().scrape(url);
  } else {
    throw new Error('Unsupported review platform');
  }
}
