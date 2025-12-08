import { runAllValidations } from './Validators';

/**
 * Parola güçlülük seviyeleri
 */
export enum StrengthLevel {
    EMPTY = 'empty',
    VERY_WEAK = 'çok zayıf',
    WEAK = 'zayıf',
    MEDIUM = 'orta',
    STRONG = 'güçlü',
    VERY_STRONG = 'çok güçlü'
}

/**
 * Parola analiz sonuçları
 */
export interface PasswordAnalysis {
    score: number;
    level: StrengthLevel;
    criteria: {
        length: boolean;
        hasLowercase: boolean;
        hasUppercase: boolean;
        hasNumbers: boolean;
        hasSpecialChars: boolean;
        noRepeatingChars: boolean;
        notWeakPassword: boolean;
        noSequentialChars: boolean;
    };
    feedback: string[];
    suggestions: string[];
}

/**
 * Parola güçlülük analizi yapar
 */
export class PasswordChecker {
    
    /**
     * Parolayı analiz eder
     * @param password Analiz edilecek parola
     * @returns Analiz sonuçları
     */
    static analyze(password: string): PasswordAnalysis {
        if (!password || password.length === 0) {
            return this.getEmptyAnalysis();
        }
        
        // Tüm validasyonları çalıştır
        const validationResults = runAllValidations(password);
        
        // Toplam puanı hesapla
        let totalScore = 
            validationResults.length +
            validationResults.hasLowercase +
            validationResults.hasUppercase +
            validationResults.hasNumbers +
            validationResults.hasSpecialChars +
            validationResults.varietyBonus;
        
        // Ceza puanlarını çıkar
        totalScore -= 
            validationResults.repeatingCharsPenalty +
            validationResults.weakPasswordPenalty +
            validationResults.sequentialCharsPenalty;
        
        // Puanı 0-100 aralığına sınırla
        totalScore = Math.max(0, Math.min(totalScore, 100));
        
        // Güç seviyesini belirle
        const level = this.determineStrengthLevel(totalScore);
        
        // Kriterleri değerlendir
        const criteria = {
            length: validationResults.length >= 20,
            hasLowercase: validationResults.hasLowercase > 0,
            hasUppercase: validationResults.hasUppercase > 0,
            hasNumbers: validationResults.hasNumbers > 0,
            hasSpecialChars: validationResults.hasSpecialChars > 0,
            noRepeatingChars: validationResults.repeatingCharsPenalty === 0,
            notWeakPassword: validationResults.weakPasswordPenalty === 0,
            noSequentialChars: validationResults.sequentialCharsPenalty === 0
        };
        
        // Geri bildirim mesajlarını oluştur
        const feedback = this.generateFeedback(password, validationResults, criteria);
        
        // Önerileri oluştur
        const suggestions = this.generateSuggestions(criteria, totalScore);
        
        return {
            score: totalScore,
            level,
            criteria,
            feedback,
            suggestions
        };
    }
    
    /**
     * Boş parola için analiz sonuçları
     * @returns Boş analiz
     */
    private static getEmptyAnalysis(): PasswordAnalysis {
        return {
            score: 0,
            level: StrengthLevel.EMPTY,
            criteria: {
                length: false,
                hasLowercase: false,
                hasUppercase: false,
                hasNumbers: false,
                hasSpecialChars: false,
                noRepeatingChars: false,
                notWeakPassword: false,
                noSequentialChars: false
            },
            feedback: ['Lütfen bir parola girin'],
            suggestions: ['Parola uzunluğu en az 8 karakter olmalıdır']
        };
    }
    
    /**
     * Puanı güç seviyesine dönüştürür
     * @param score Parola puanı (0-100)
     * @returns Güç seviyesi
     */
    private static determineStrengthLevel(score: number): StrengthLevel {
        if (score === 0) return StrengthLevel.EMPTY;
        if (score < 30) return StrengthLevel.VERY_WEAK;
        if (score < 50) return StrengthLevel.WEAK;
        if (score < 70) return StrengthLevel.MEDIUM;
        if (score < 85) return StrengthLevel.STRONG;
        return StrengthLevel.VERY_STRONG;
    }
    
    /**
     * Geri bildirim mesajlarını oluşturur
     * @param password Parola
     * @param validationResults Validasyon sonuçları
     * @param criteria Kriterler
     * @returns Geri bildirim mesajları
     */
    private static generateFeedback(
        password: string,
        validationResults: any,
        criteria: any
    ): string[] {
        const feedback: string[] = [];
        
        // Uzunluk geri bildirimi
        if (password.length < 8) {
            feedback.push(`Parolanız çok kısa (${password.length} karakter). En az 8 karakter önerilir.`);
        } else if (password.length < 12) {
            feedback.push(`Parolanız orta uzunlukta (${password.length} karakter). 12+ karakter daha güvenlidir.`);
        } else {
            feedback.push(`Parolanız yeterli uzunlukta (${password.length} karakter).`);
        }
        
        // Karakter çeşitliliği geri bildirimi
        if (!criteria.hasLowercase) {
            feedback.push('Küçük harf içermiyor. Küçük harf ekleyin.');
        }
        
        if (!criteria.hasUppercase) {
            feedback.push('Büyük harf içermiyor. Büyük harf ekleyin.');
        }
        
        if (!criteria.hasNumbers) {
            feedback.push('Rakam içermiyor. Rakam ekleyin.');
        }
        
        if (!criteria.hasSpecialChars) {
            feedback.push('Özel karakter içermiyor. Özel karakter ekleyin.');
        }
        
        // Ceza geri bildirimleri
        if (!criteria.noRepeatingChars) {
            feedback.push('Tekrarlanan karakterler içeriyor. Tekrarları azaltın.');
        }
        
        if (!criteria.notWeakPassword) {
            feedback.push('Yaygın kullanılan bir parola veya benzeri içeriyor.');
        }
        
        if (!criteria.noSequentialChars) {
            feedback.push('Sıralı karakterler içeriyor (abc, 123 gibi).');
        }
        
        // Pozitif geri bildirimler
        const positiveCount = Object.values(criteria).filter(Boolean).length;
        if (positiveCount >= 6) {
            feedback.push('Harika! Parolanız çoğu güvenlik kriterini karşılıyor.');
        } else if (positiveCount >= 4) {
            feedback.push('İyi başlangıç! Ancak daha fazla güvenlik için geliştirilebilir.');
        }
        
        return feedback;
    }
    
    /**
     * Öneri mesajlarını oluşturur
     * @param criteria Kriterler
     * @param score Parola puanı
     * @returns Öneri mesajları
     */
    private static generateSuggestions(criteria: any, score: number): string[] {
        const suggestions: string[] = [];
        
        if (score < 50) {
            suggestions.push('Parolanızı güçlendirmek için aşağıdaki önerileri uygulayın:');
        }
        
        if (!criteria.length) {
            suggestions.push('• Parola uzunluğunu en az 12 karaktere çıkarın');
        }
        
        if (!criteria.hasLowercase) {
            suggestions.push('• En az bir küçük harf ekleyin (a-z)');
        }
        
        if (!criteria.hasUppercase) {
            suggestions.push('• En az bir büyük harf ekleyin (A-Z)');
        }
        
        if (!criteria.hasNumbers) {
            suggestions.push('• En az bir rakam ekleyin (0-9)');
        }
        
        if (!criteria.hasSpecialChars) {
            suggestions.push('• En az bir özel karakter ekleyin (!@#$%^&* gibi)');
        }
        
        if (!criteria.noRepeatingChars) {
            suggestions.push('• Aynı karakteri arka arkaya tekrarlamaktan kaçının');
        }
        
        if (!criteria.notWeakPassword) {
            suggestions.push('• Yaygın kullanılan kelimeler ve parolaları kullanmayın');
        }
        
        if (!criteria.noSequentialChars) {
            suggestions.push('• Sıralı karakter dizilerinden kaçının (abc, 123 gibi)');
        }
        
        if (score >= 70) {
            suggestions.push('Güzel! Parolanız iyi bir güvenlik seviyesine sahip.');
        }
        
        if (score >= 85) {
            suggestions.push('Mükemmel! Parolanız çok güçlü görünüyor.');
        }
        
        return suggestions;
    }
    
    /**
     * Parolanın tahmini kırılma süresini hesaplar
     * @param password Parola
     * @param score Parola puanı
     * @returns Tahmini kırılma süresi
     */
    static estimateTimeToCrack(password: string, score: number): string {
        if (!password || password.length === 0) {
            return 'Parola girmediniz';
        }
        
        // Karakter seti boyutunu hesapla
        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/\d/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
        
        // Saldırganın saniyede deneyebileceği tahmini parola sayısı
        const guessesPerSecond = 1000000000; // 1 milyar/saniye
        
        // Toplam olası kombinasyon
        const totalCombinations = Math.pow(charsetSize, password.length);
        
        // Tahmini kırılma süresi (saniye)
        const secondsToCrack = totalCombinations / guessesPerSecond;
        
        // İnsan dostu formata çevir
        if (secondsToCrack < 1) return '1 saniyeden az';
        if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} saniye`;
        
        const minutesToCrack = secondsToCrack / 60;
        if (minutesToCrack < 60) return `${Math.round(minutesToCrack)} dakika`;
        
        const hoursToCrack = minutesToCrack / 60;
        if (hoursToCrack < 24) return `${Math.round(hoursToCrack)} saat`;
        
        const daysToCrack = hoursToCrack / 24;
        if (daysToCrack < 30) return `${Math.round(daysToCrack)} gün`;
        
        const monthsToCrack = daysToCrack / 30;
        if (monthsToCrack < 12) return `${Math.round(monthsToCrack)} ay`;
        
        const yearsToCrack = daysToCrack / 365;
        if (yearsToCrack < 100) return `${Math.round(yearsToCrack)} yıl`;
        if (yearsToCrack < 1000) return `${Math.round(yearsToCrack / 10) * 10} yıl`;
        
        return 'binlerce yıl';
    }
}