import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  subject: string;
  sender: string;
  body: string;
}

interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const lowerText = text.toLowerCase();
  const positiveWords = ['great', 'excellent', 'good', 'happy', 'thanks', 'appreciate', 'wonderful', 'amazing', 'best'];
  const negativeWords = ['urgent', 'problem', 'issue', 'error', 'failed', 'wrong', 'bad', 'concern', 'complaint'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

function determinePriority(subject: string, body: string): 'low' | 'medium' | 'high' | 'urgent' {
  const text = (subject + ' ' + body).toLowerCase();
  
  if (text.includes('urgent') || text.includes('asap') || text.includes('immediately') || text.includes('critical')) {
    return 'urgent';
  }
  
  if (text.includes('important') || text.includes('priority') || text.includes('deadline')) {
    return 'high';
  }
  
  if (text.includes('follow up') || text.includes('reminder') || text.includes('update')) {
    return 'medium';
  }
  
  return 'low';
}

function extractKeyPoints(body: string): string[] {
  const sentences = body
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200);
  
  const keyPoints: string[] = [];
  const keywords = ['important', 'need', 'require', 'must', 'should', 'please', 'urgent', 'deadline', 'meeting', 'schedule'];
  
  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();
    const hasKeyword = keywords.some(keyword => lowerSentence.includes(keyword));
    
    if (hasKeyword && keyPoints.length < 5) {
      keyPoints.push(sentence);
    }
  }
  
  if (keyPoints.length === 0 && sentences.length > 0) {
    keyPoints.push(sentences[0]);
    if (sentences.length > 1) {
      keyPoints.push(sentences[sentences.length - 1]);
    }
  }
  
  return keyPoints.slice(0, 5);
}

function generateSummary(subject: string, body: string): string {
  const sentences = body.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  if (sentences.length === 0) {
    return `Email about: ${subject}`;
  }
  
  const firstSentence = sentences[0];
  const wordCount = body.split(/\s+/).length;
  
  if (wordCount < 50) {
    return `Brief message regarding ${subject.toLowerCase()}: ${firstSentence}`;
  } else if (wordCount < 150) {
    return `${subject}. ${firstSentence}.`;
  } else {
    const midSentence = sentences[Math.floor(sentences.length / 2)];
    return `${subject}. Key points: ${firstSentence}. ${midSentence}.`;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { subject, sender, body }: EmailRequest = await req.json();

    if (!subject || !sender || !body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: subject, sender, body' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const summary = generateSummary(subject, body);
    const keyPoints = extractKeyPoints(body);
    const sentiment = analyzeSentiment(subject + ' ' + body);
    const priority = determinePriority(subject, body);

    const response: SummaryResponse = {
      summary,
      keyPoints,
      sentiment,
      priority,
    };

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in summarize-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});