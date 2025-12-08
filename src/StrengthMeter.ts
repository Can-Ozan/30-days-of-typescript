import { StrengthLevel } from './PasswordChecker';

/**
 * Güç göstergesi yönetimi
 */
export class StrengthMeter {
    private barElement: HTMLElement;
    private levelElement: HTMLElement;
    private scoreElement: HTMLElement;
    
    constructor(
        barElementId: string,
        levelElementId: string,
        scoreElementId: string
    ) {
        this.barElement = document.getElementById(barElementId) as HTMLElement;
        this.levelElement = document.getElementById(levelElementId) as HTMLElement;
        this.scoreElement = document.getElementById(scoreElementId) as HTMLElement;
    }
    
    /**
     * Güç göstergesini günceller
     * @param score Parola puanı (0-100)
     * @param level Güç seviyesi
     */
    update(score: number, level: StrengthLevel): void {
        // Bar genişliğini güncelle
        this.barElement.style.width = `${score}%`;
        
        // Bar rengini güncelle
        this.updateBarColor(level);
        
        // Seviye metnini güncelle
        this.updateLevelText(level);
        
        // Puanı güncelle
        this.scoreElement.textContent = score.toString();
    }
    
    /**
     * Bar rengini güç seviyesine göre günceller
     * @param level Güç seviyesi
     */
    private updateBarColor(level: StrengthLevel): void {
        // Önceki renk sınıflarını temizle
        this.barElement.classList.remove('weak', 'medium', 'strong', 'very-strong');
        
        // Yeni renk sınıfını ekle
        switch (level) {
            case StrengthLevel.VERY_WEAK:
            case StrengthLevel.WEAK:
                this.barElement.classList.add('weak');
                break;
            case StrengthLevel.MEDIUM:
                this.barElement.classList.add('medium');
                break;
            case StrengthLevel.STRONG:
                this.barElement.classList.add('strong');
                break;
            case StrengthLevel.VERY_STRONG:
                this.barElement.classList.add('very-strong');
                break;
        }
    }
    
    /**
     * Seviye metnini günceller
     * @param level Güç seviyesi
     */
    private updateLevelText(level: StrengthLevel): void {
        let levelText = '';
        let levelClass = '';
        
        switch (level) {
            case StrengthLevel.EMPTY:
                levelText = 'Değerlendiriliyor...';
                break;
            case StrengthLevel.VERY_WEAK:
                levelText = 'Çok Zayıf';
                levelClass = 'weak';
                break;
            case StrengthLevel.WEAK:
                levelText = 'Zayıf';
                levelClass = 'weak';
                break;
            case StrengthLevel.MEDIUM:
                levelText = 'Orta';
                levelClass = 'medium';
                break;
            case StrengthLevel.STRONG:
                levelText = 'Güçlü';
                levelClass = 'strong';
                break;
            case StrengthLevel.VERY_STRONG:
                levelText = 'Çok Güçlü';
                levelClass = 'very-strong';
                break;
        }
        
        this.levelElement.textContent = levelText;
        
        // Önceki sınıfları temizle
        this.levelElement.classList.remove('weak', 'medium', 'strong', 'very-strong');
        
        // Yeni sınıfı ekle
        if (levelClass) {
            this.levelElement.classList.add(levelClass);
        }
    }
    
    /**
     * Göstergeleri sıfırlar
     */
    reset(): void {
        this.barElement.style.width = '0%';
        this.barElement.classList.remove('weak', 'medium', 'strong', 'very-strong');
        this.levelElement.textContent = 'Değerlendiriliyor...';
        this.levelElement.classList.remove('weak', 'medium', 'strong', 'very-strong');
        this.scoreElement.textContent = '0';
    }
}