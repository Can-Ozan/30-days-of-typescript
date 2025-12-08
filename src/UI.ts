import { PasswordAnalysis, PasswordChecker } from './PasswordChecker';

/**
 * Arayüz yönetimi
 */
export class UI {
    private criteriaListElement: HTMLElement;
    private feedbackContentElement: HTMLElement;
    private suggestionsContentElement: HTMLElement;
    private timeToCrackElement: HTMLElement;
    
    constructor(
        criteriaListId: string,
        feedbackContentId: string,
        suggestionsContentId: string,
        timeToCrackId: string
    ) {
        this.criteriaListElement = document.getElementById(criteriaListId) as HTMLElement;
        this.feedbackContentElement = document.getElementById(feedbackContentId) as HTMLElement;
        this.suggestionsContentElement = document.getElementById(suggestionsContentId) as HTMLElement;
        this.timeToCrackElement = document.getElementById(timeToCrackId) as HTMLElement;
    }
    
    /**
     * Kriter listesini günceller
     * @param criteria Kriter sonuçları
     */
    updateCriteriaList(criteria: any): void {
        this.criteriaListElement.innerHTML = '';
        
        const criteriaItems = [
            {
                id: 'length',
                text: 'En az 12 karakter',
                met: criteria.length
            },
            {
                id: 'hasLowercase',
                text: 'Küçük harf içeriyor',
                met: criteria.hasLowercase
            },
            {
                id: 'hasUppercase',
                text: 'Büyük harf içeriyor',
                met: criteria.hasUppercase
            },
            {
                id: 'hasNumbers',
                text: 'Rakam içeriyor',
                met: criteria.hasNumbers
            },
            {
                id: 'hasSpecialChars',
                text: 'Özel karakter içeriyor',
                met: criteria.hasSpecialChars
            },
            {
                id: 'noRepeatingChars',
                text: 'Tekrarlanan karakter yok',
                met: criteria.noRepeatingChars
            },
            {
                id: 'notWeakPassword',
                text: 'Zayıf parola değil',
                met: criteria.notWeakPassword
            },
            {
                id: 'noSequentialChars',
                text: 'Sıralı karakter yok',
                met: criteria.noSequentialChars
            }
        ];
        
        criteriaItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'criteria-item fade-in';
            
            const icon = document.createElement('span');
            icon.className = 'criteria-icon';
            icon.innerHTML = item.met ? 
                '<i class="fas fa-check-circle criteria-met"></i>' : 
                '<i class="fas fa-times-circle criteria-not-met"></i>';
            
            const text = document.createElement('span');
            text.className = `criteria-text ${item.met ? 'criteria-met' : 'criteria-not-met'}`;
            text.textContent = item.text;
            
            li.appendChild(icon);
            li.appendChild(text);
            this.criteriaListElement.appendChild(li);
        });
    }
    
    /**
     * Geri bildirim içeriğini günceller
     * @param feedback Geri bildirim mesajları
     */
    updateFeedbackContent(feedback: string[]): void {
        this.feedbackContentElement.innerHTML = '';
        
        if (feedback.length === 0) {
            const p = document.createElement('p');
            p.className = 'initial-message';
            p.textContent = 'Analiz sonuçları burada görünecektir.';
            this.feedbackContentElement.appendChild(p);
            return;
        }
        
        feedback.forEach((message, index) => {
            const div = document.createElement('div');
            div.className = 'feedback-item fade-in';
            
            // Gecikmeli animasyon için
            div.style.animationDelay = `${index * 0.05}s`;
            
            const icon = document.createElement('span');
            icon.className = 'feedback-icon';
            
            // Mesaj türüne göre ikon belirle
            if (message.includes('Harika') || message.includes('yeterli') || message.includes('karşılıyor')) {
                icon.innerHTML = '<i class="fas fa-check-circle" style="color: #2a9d8f;"></i>';
            } else if (message.includes('orta') || message.includes('başlangıç')) {
                icon.innerHTML = '<i class="fas fa-info-circle" style="color: #ff9e00;"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #e63946;"></i>';
            }
            
            const text = document.createElement('span');
            text.className = 'feedback-text';
            text.textContent = message;
            
            div.appendChild(icon);
            div.appendChild(text);
            this.feedbackContentElement.appendChild(div);
        });
    }
    
    /**
     * Öneriler içeriğini günceller
     * @param suggestions Öneri mesajları
     */
    updateSuggestionsContent(suggestions: string[]): void {
        this.suggestionsContentElement.innerHTML = '';
        
        if (suggestions.length === 0) {
            const p = document.createElement('p');
            p.className = 'initial-message';
            p.textContent = 'Öneriler burada görünecektir.';
            this.suggestionsContentElement.appendChild(p);
            return;
        }
        
        suggestions.forEach((suggestion, index) => {
            const p = document.createElement('p');
            p.className = 'fade-in';
            p.style.animationDelay = `${index * 0.05}s`;
            p.textContent = suggestion;
            this.suggestionsContentElement.appendChild(p);
        });
    }
    
    /**
     * Tahmini kırılma süresini günceller
     * @param password Parola
     * @param score Parola puanı
     */
    updateTimeToCrack(password: string, score: number): void {
        const timeToCrack = PasswordChecker.estimateTimeToCrack(password, score);
        this.timeToCrackElement.textContent = timeToCrack;
    }
    
    /**
     * Tüm arayüzü analiz sonuçlarına göre günceller
     * @param analysis Parola analiz sonuçları
     * @param password Parola
     */
    updateAll(analysis: PasswordAnalysis, password: string): void {
        this.updateCriteriaList(analysis.criteria);
        this.updateFeedbackContent(analysis.feedback);
        this.updateSuggestionsContent(analysis.suggestions);
        this.updateTimeToCrack(password, analysis.score);
    }
    
    /**
     * Arayüzü sıfırlar
     */
    reset(): void {
        this.criteriaListElement.innerHTML = '';
        
        this.feedbackContentElement.innerHTML = `
            <p class="initial-message">Parolanızı girmeye başladığınızda detaylı analiz sonuçları burada görünecektir.</p>
        `;
        
        this.suggestionsContentElement.innerHTML = `
            <p class="initial-message">Parolanız analiz edildikten sonra güvenliği artırmak için öneriler burada görünecektir.</p>
        `;
        
        this.timeToCrackElement.textContent = 'Parola girmediniz';
    }
}