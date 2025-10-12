import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock OpenAI servisi - API key olmadan çalışır
const mockOpenAI = {
  chat: {
    completions: {
      create: async ({ messages }) => {
        const userMessage = messages.find(m => m.role === 'user')?.content || '';
        const email = userMessage.replace('Aşağıdaki e-postayı özetle:\n\n', '');
        
        return {
          choices: [{
            message: {
              content: `📋 **MOCK ÖZET**\n\n• E-posta başarıyla alındı\n• ${email.split(' ').length} kelime\n• OpenAI API key bekleniyor\n• Gerçek özet burada görünecek`
            }
          }]
        };
      }
    }
  }
};

// Özetleme endpoint'i
app.post('/api/summarize', async (req, res) => {
  try {
    const { email, maxLength = 150 } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-posta metni gerekli' });
    }

    // Mock OpenAI çağrısı
    const completion = await mockOpenAI.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `E-postayı Türkçe özetle. Maksimum ${maxLength} kelime.`
        },
        {
          role: "user", 
          content: `Aşağıdaki e-postayı özetle:\n\n${email}`
        }
      ]
    });

    const summary = completion.choices[0].message.content;

    res.json({
      original: email,
      summary: summary,
      length: {
        original: email.split(/\s+/).length,
        summary: summary.split(/\s+/).length,
        reduction: '%50'
      }
    });

  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend çalışıyor!' });
});

app.listen(port, () => {
  console.log(`🚀 Backend http://localhost:${port} portunda çalışıyor`);
  console.log(`📊 Health: http://localhost:${port}/health`);
});