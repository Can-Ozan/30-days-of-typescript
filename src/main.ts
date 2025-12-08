import { PasswordChecker, PasswordAnalysis } from './PasswordChecker';
import { StrengthMeter } from './StrengthMeter';
import { UI } from './UI';

/**
 * Rastgele güçlü parola oluşturucu
 * @param length Parola uzunluğu
 * @returns Rastgele parola
 */
function generateRandomPassword(length: number = 16): string {
    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    // Tüm karakterleri birleştir
    const allChars = 
        charset.lowercase + 
        charset.uppercase + 
        charset.numbers + 
        charset.special;
    
    let password = '';
    
    // Her kategoriden en az bir karakter garantile
    password += getRandomChar(charset.lowercase);
    password += getRandomChar(charset.uppercase);
    password += getRandomChar(charset.numbers);
    password += getRandomChar(charset.special);
    
    // Kalan karakterleri rastgele seç
    for (let i = 4; i < length; i++) {
        password += getRandomChar(allChars);
    }
    
    // Karakterleri karıştır
    return shuffleString(password);
}

/**
 * Rastgele karakter seçer
 * @param str Karakter seti
 * @returns Rastgele karakter
 */
function getRandomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
}

/**
 * String içindeki karakterleri karıştırır
 * @param str Karıştırılacak string
 * @returns Karıştırılmış string
 */
function shuffleString(str: string): string {
    const array = str.split('');
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array.join('');
}

/**
 * Ana uygulama sınıfı
 */
class PasswordStrengthCheckerApp {
    private passwordInput: HTMLInputElement;
    private togglePasswordBtn: HTMLButtonElement;
    private generatePasswordBtn: HTMLButtonElement;
    
    private strengthMeter: StrengthMeter;
    private ui: UI;
    
    // Analiz için debounce timer
    private analysisTimer: number | null = null;
    
    constructor() {
        this.initializeElements();
        this.initializeModules();
        this.setupEventListeners();
        this.initializeUI();
    }
    
    /**
     * DOM elementlerini başlatır
     */
    private initializeElements(): void {
        this.passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
        this.togglePasswordBtn = document.getElementById('togglePassword') as HTMLButtonElement;
        this.generatePasswordBtn = document.getElementById('generatePassword') as HTMLButtonElement;
    }
    
    /**
     * Modülleri başlatır
     */
    private initializeModules(): void {
        this.strengthMeter = new StrengthMeter(
            'strengthBar',
            'strengthLevel',
            'scoreValue'
        );
        
        this.ui = new UI(
            'criteriaList',
            'feedbackContent',
            'suggestionsContent',
            'timeToCrack'
        );
    }
    
    /**
     * Olay dinleyicilerini kurar
     */
    private setupEventListeners(): void {
        // Parola input değişikliği
        this.passwordInput.addEventListener('input', () => {
            this.handlePasswordChange();
        });
        
        // Parola görünürlüğü toggle
        this.togglePasswordBtn.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Rastgele parola oluşturma
        this.generatePasswordBtn.addEventListener('click', () => {
            this.generateAndSetPassword();
        });
        
        // Sayfa yüklendiğinde parola input'una odaklan
        window.addEventListener('DOMContentLoaded', () => {
            this.passwordInput.focus();
        });
    }
    
    /**
     * Başlangıç UI'ını ayarlar
     */
    private initializeUI(): void {
        this.ui.reset();
        this.strengthMeter.reset();
    }
    
    /**
     * Parola değişikliğini işler (debounce ile)
     */
    private handlePasswordChange(): void {
        // Önceki timer'ı temizle
        if (this.analysisTimer) {
            clearTimeout(this.analysisTimer);
        }
        
        // Yeni timer ayarla (100ms debounce)
        this.analysisTimer = window.setTimeout(() => {
            this.analyzePassword();
        }, 100);
    }
    
    /**
     * Parolayı analiz eder ve UI'ı günceller
     */
    private analyzePassword(): void {
        const password = this.passwordInput.value;
        
        // Parola boşsa UI'ı sıfırla
        if (!password || password.length === 0) {
            this.ui.reset();
            this.strengthMeter.reset();
            return;
        }
        
        // Parolayı analiz et
        const analysis = PasswordChecker.analyze(password);
        
        // Güç göstergesini güncelle
        this.strengthMeter.update(analysis.score, analysis.level);
        
        // UI'ı güncelle
        this.ui.updateAll(analysis, password);
    }
    
    /**
     * Parola görünürlüğünü değiştirir
     */
    private togglePasswordVisibility(): void {
        const type = this.passwordInput.type;
        const icon = this.togglePasswordBtn.querySelector('i') as HTMLElement;
        
        if (type === 'password') {
            this.passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
            this.togglePasswordBtn.setAttribute('aria-label', 'Parolayı gizle');
        } else {
            this.passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
            this.togglePasswordBtn.setAttribute('aria-label', 'Parolayı göster');
        }
    }
    
    /**
     * Rastgele parola oluşturur ve input'a yerleştirir
     */
    private generateAndSetPassword(): void {
        const randomPassword = generateRandomPassword(16);
        this.passwordInput.value = randomPassword;
        this.passwordInput.type = 'text';
        
        // İkonu güncelle
        const icon = this.togglePasswordBtn.querySelector('i') as HTMLElement;
        icon.className = 'fas fa-eye-slash';
        this.togglePasswordBtn.setAttribute('aria-label', 'Parolayı gizle');
        
        // Parolayı analiz et
        this.analyzePassword();
        
        // Parolayı seç (kopyalamayı kolaylaştırmak için)
        this.passwordInput.select();
        
        // Kullanıcıya bilgi ver
        this.showToast('Güçlü bir parola oluşturuldu!');
    }
    
    /**
     * Toast mesajı gösterir
     * @param message Gösterilecek mesaj
     */
    private showToast(message: string): void {
        // Toast elementini oluştur
        const toast = document.createElement('div');
        toast.className = 'toast-message fade-in';
        toast.textContent = message;
        
        // Stil ekle
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2a9d8f;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            max-width: 300px;
        `;
        
        // Sayfaya ekle
        document.body.appendChild(toast);
        
        // 3 saniye sonra kaldır
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Uygulamayı başlat
const app = new PasswordStrengthCheckerApp();

// Global scope'a ekle (geliştirme için)
declare global {
    interface Window {
        app: PasswordStrengthCheckerApp;
    }
}

window.app = app;