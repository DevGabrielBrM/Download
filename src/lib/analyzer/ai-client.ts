import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

export interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  category: 'bug' | 'feature' | 'general';
  title: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export async function analyzeWithAI(text: string): Promise<AnalysisResult> {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  if (!hasOpenAI && !hasAnthropic) {
    return fallbackAnalysis(text);
  }

  try {
    const model = hasOpenAI 
      ? openai('gpt-3.5-turbo') 
      : anthropic('claude-3-haiku-20240307');

    const { text: resultText } = await generateText({
      model,
      prompt: `Analyze this customer review and return ONLY a valid JSON object with this structure:
{
  "sentiment": "positive|negative|neutral",
  "sentimentScore": 0.0-1.0,
  "category": "bug|feature|general",
  "title": "short issue/suggestion title",
  "severity": "low|medium|high|critical" (only for bugs),
  "description": "brief description"
}

Review:
${text}`,
    });

    // Extract JSON from the result text (in case there's extra text)
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    
    return JSON.parse(jsonMatch[0]) as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis error:", error);
    return fallbackAnalysis(text);
  }
}

function fallbackAnalysis(text: string): AnalysisResult {
  const lowerText = text.toLowerCase();
  
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  let category: 'bug' | 'feature' | 'general' = 'general';
  
  const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing', 'happy', 'best'];
  const negativeWords = ['bad', 'terrible', 'horrible', 'hate', 'awful', 'worst', 'poor'];
  const bugWords = ['bug', 'crash', 'error', 'fail', 'broken', 'not working', 'issue', 'problem'];
  const featureWords = ['wish', 'want', 'suggest', 'would be nice', 'add', 'improve', 'feature'];

  const posCount = positiveWords.filter(w => lowerText.includes(w)).length;
  const negCount = negativeWords.filter(w => lowerText.includes(w)).length;

  if (posCount > negCount) sentiment = 'positive';
  else if (negCount > posCount) sentiment = 'negative';

  if (bugWords.some(w => lowerText.includes(w))) category = 'bug';
  else if (featureWords.some(w => lowerText.includes(w))) category = 'feature';

  return {
    sentiment,
    sentimentScore: 0.5,
    category,
    title: text.substring(0, 50) + "...",
    severity: category === 'bug' ? 'medium' : undefined,
    description: text
  };
}
