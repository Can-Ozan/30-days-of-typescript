import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  subject: string;
  emailBody: string;
  summaryLength: 'short' | 'medium' | 'detailed';
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { subject, emailBody, summaryLength }: RequestBody = await req.json();

    if (!emailBody || !summaryLength) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const lengthInstructions = {
      short: 'Provide a very brief summary in 2-3 sentences only.',
      medium: 'Provide a concise summary in one paragraph (4-6 sentences).',
      detailed: 'Provide a detailed summary in 2-3 paragraphs, covering all important points.',
    };

    const systemPrompt = `You are an expert email summarizer. Your task is to analyze emails and provide clear, concise summaries along with key action points.

${lengthInstructions[summaryLength]}

Also extract 3-5 key points or action items from the email.

Respond in the following JSON format:
{
  "summary": "your summary here",
  "keyPoints": ["point 1", "point 2", "point 3"]
}`;

    const userPrompt = `Email Subject: ${subject || 'No subject'}

Email Body:
${emailBody}

Please provide a summary and key points.`;

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate summary', details: errorData }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const openaiData: OpenAIResponse = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;

    let parsedResponse;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = {
          summary: aiResponse,
          keyPoints: [],
        };
      }
    } catch (parseError) {
      parsedResponse = {
        summary: aiResponse,
        keyPoints: [],
      };
    }

    return new Response(
      JSON.stringify(parsedResponse),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
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