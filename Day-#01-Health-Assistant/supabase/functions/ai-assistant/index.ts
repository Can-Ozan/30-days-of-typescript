import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, context } = await req.json();
    
    if (!message) {
      throw new Error('Mesaj gerekli');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API anahtarı yapılandırılmamış');
    }

    // Kullanıcı verilerini al (kişiselleştirme için)
    let userContext = '';
    if (userId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, language')
          .eq('user_id', userId)
          .single();

        const { data: activities } = await supabase
          .from('user_activities')
          .select('activity_type, created_at, score')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (profile) {
          userContext = `Kullanıcı bilgileri: Ad: ${profile.full_name || 'Bilinmiyor'}, Dil: ${profile.language || 'tr'}`;
        }

        if (activities && activities.length > 0) {
          const recentActivities = activities.map(a => 
            `${a.activity_type} (${new Date(a.created_at).toLocaleDateString('tr-TR')})`
          ).join(', ');
          userContext += `\nSon aktiviteler: ${recentActivities}`;
        }
      } catch (error) {
        console.log('Kullanıcı bağlamı alınamadı:', error);
      }
    }

    // Sistem promptu - Türkçe sağlık asistanı
    const systemPrompt = `Sen ErgoAsistan'ın AI sağlık asistanısın. Uzaktan çalışanlar için ergonomi, duruş, göz sağlığı ve genel sağlıklı çalışma alışkanlıkları konusunda yardımcı oluyorsun.

Özelliklerin:
- Türkçe konuş ve samimi ol
- Kısa ve pratik öneriler ver
- Pozitif ve motive edici ol
- Sağlık konularında profesyonel tavsiyelerde bulun
- Ergonomi, duruş kontrolü, göz egzersizleri ve mola alışkanlıkları hakkında bilgi ver
- Zararlı olabilecek tavsiyeler verme, ciddi sağlık sorunları için doktora yönlendir

${userContext ? `\n${userContext}` : ''}

Kullanıcının sorusuna yardımcı ol:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API hatası:', errorData);
      throw new Error(`OpenAI API hatası: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI yanıt oluşturuldu:', { userId, message: message.substring(0, 50) });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI asistan hatası:', error);
    
    // Hata durumunda varsayılan yanıt
    const fallbackResponse = "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin. Bu arada, 20-20-20 kuralını hatırlamayı unutmayın: Her 20 dakikada bir, 20 saniye boyunca 6 metre uzaktaki bir noktaya bakın! 👀";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      error: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // Kullanıcıya hata göstermemek için 200 döndür
    });
  }
});