import { analyzeWithAI, AnalysisResult } from './ai-client';

export async function analyzeReview(title: string, body: string): Promise<AnalysisResult> {
  const combinedText = `Title: ${title}\nBody: ${body}`;
  return analyzeWithAI(combinedText);
}
