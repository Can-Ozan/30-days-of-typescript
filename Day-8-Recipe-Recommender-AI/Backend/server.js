const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint - sunucunun çalıştığını göster
app.get('/', (req, res) => {
    res.json({ 
        message: '🎉 Backend çalışıyor!',
        timestamp: new Date().toISOString(),
        status: 'OK'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Recipe Recommender API çalışıyor',
        environment: process.env.NODE_ENV
    });
});

// Basit tarif endpoint'i (OpenAI olmadan - demo)
app.post('/api/recipes', (req, res) => {
    try {
        const { ingredients } = req.body;
        
        console.log('📨 Gelen malzemeler:', ingredients);
        
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ 
                error: 'Lütfen en az 1 malzeme giriniz' 
            });
        }

        // Demo tarifler - her zaman çalışsın
        const demoRecipes = [
            {
                name: `🧑‍🍳 ${ingredients[0]}'lı Özel Tarif`,
                ingredients: [...ingredients, "tuz", "karabiber", "zeytinyağı"],
                instructions: `1. ${ingredients.join(', ')} malzemelerini hazırlayın\n2. Tencereye alıp orta ateşte pişirin\n3. Baharatları ekleyip karıştırın\n4. Sıcak servis yapın`,
                cookingTime: "15-20 dakika",
                difficulty: "Kolay"
            },
            {
                name: `🥗 ${ingredients.slice(0, 2).join(' ve ')} Salatası`,
                ingredients: ingredients,
                instructions: "1. Tüm malzemeleri yıkayıp doğrayın\n2. Büyük bir kasede karıştırın\n3. Zeytinyağı ve limon ile soslayın\n4. Soğuk servis yapın",
                cookingTime: "10 dakika",
                difficulty: "Çok Kolay"
            },
            {
                name: `🍳 ${ingredients[0]} Omlet`,
                ingredients: [...ingredients, "yumurta", "peynir"],
                instructions: "1. Yumurtaları çırpın\n2. Malzemeleri ekleyip karıştırın\n3. Tavada pişirin\n4. Peynir serpip servis yapın",
                cookingTime: "10 dakika",
                difficulty: "Kolay"
            }
        ];

        console.log('✅ Demo tarifler gönderiliyor:', demoRecipes.length);
        
        res.json({
            success: true,
            message: 'Demo tarifler başarıyla oluşturuldu',
            count: demoRecipes.length,
            recipes: demoRecipes
        });

    } catch (error) {
        console.error('❌ Hata:', error);
        res.status(500).json({ 
            error: 'Sunucu hatası: ' + error.message 
        });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('🔥 Global Hata:', error);
    res.status(500).json({ 
        error: 'Sunucu hatası: ' + error.message 
    });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log('='.repeat(50));
    console.log(`🚀 BACKEND BAŞLATILDI: http://localhost:${port}`);
    console.log(`🔍 Test: http://localhost:${port}/health`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log('='.repeat(50));
});