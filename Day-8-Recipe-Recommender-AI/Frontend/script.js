class RecipeRecommender {
    constructor() {
        this.backendUrl = 'http://localhost:3000'; // 3000 portu
        this.init();
    }

    init() {
        this.bindEvents();
        this.testBackendConnection();
    }

    async testBackendConnection() {
        try {
            const response = await fetch(`${this.backendUrl}/health`);
            if (response.ok) {
                console.log('✅ Backend bağlantısı başarılı');
            }
        } catch (error) {
            console.log('❌ Backend bağlantısı yok, demo moda geçiliyor');
        }
    }

    bindEvents() {
        document.getElementById('getRecipes').addEventListener('click', () => {
            this.getRecipeSuggestions();
        });

        // Enter tuşu desteği
        document.getElementById('ingredients').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.getRecipeSuggestions();
            }
        });
    }

    async getRecipeSuggestions() {
        const ingredientsInput = document.getElementById('ingredients').value.trim();
        
        if (!ingredientsInput) {
            this.showError('Lütfen malzemelerinizi girin!');
            return;
        }

        const ingredients = ingredientsInput.split(',').map(ing => ing.trim()).filter(ing => ing);
        
        if (ingredients.length === 0) {
            this.showError('Lütfen geçerli malzemeler girin!');
            return;
        }

        this.showLoading();
        
        try {
            console.log('📡 Backend\'e istek gönderiliyor...');
            
            const response = await fetch(`${this.backendUrl}/api/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients })
            });

            console.log('📨 Backend cevabı alındı:', response.status);

            if (!response.ok) {
                throw new Error(`Backend hatası: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Tarifler alındı:', data.recipes.length);
            
            this.displayRecipes(data.recipes);
            
        } catch (error) {
            console.error('❌ API Hatası:', error);
            this.showError('Backend sunucusuna bağlanılamıyor. Lütfen backend\'in çalıştığından emin olun.');
        } finally {
            this.hideLoading();
        }
    }

    displayRecipes(recipes) {
        const recipesList = document.getElementById('recipesList');
        const recipesSection = document.getElementById('recipesSection');
        
        if (!recipes || recipes.length === 0) {
            this.showError('Tarif bulunamadı. Lütfen farklı malzemeler deneyin.');
            return;
        }

        recipesList.innerHTML = recipes.map((recipe, index) => `
            <div class="recipe-card">
                <h3>${recipe.name || `Tarif ${index + 1}`}</h3>
                <p><strong>🛒 Malzemeler:</strong> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
                <p><strong>👨‍🍳 Hazırlanış:</strong> ${recipe.instructions || 'Tarif detayı bulunamadı.'}</p>
                <p><strong>⏱️ Pişirme Süresi:</strong> ${recipe.cookingTime || 'Belirtilmemiş'}</p>
                <p><strong>📊 Zorluk:</strong> ${recipe.difficulty || 'Belirtilmemiş'}</p>
            </div>
        `).join('');

        recipesSection.classList.remove('hidden');
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('recipesSection').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showError(message) {
        const recipesList = document.getElementById('recipesList');
        const recipesSection = document.getElementById('recipesSection');
        
        recipesList.innerHTML = `
            <div class="error">
                <p>${message}</p>
                <div class="debug-info">
                    <p><strong>Backend'i başlatmak için:</strong></p>
                    <code>cd backend<br>npm install<br>npm start</code>
                </div>
            </div>
        `;
        recipesSection.classList.remove('hidden');
        this.hideLoading();
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new RecipeRecommender();
    console.log('🧑‍🍳 Tarif Önerici AI başlatıldı');
});