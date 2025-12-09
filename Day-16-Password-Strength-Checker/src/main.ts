import { PasswordChecker } from './PasswordChecker';
import { StrengthMeter } from './StrengthMeter';
import { UI } from './UI';

/**
 * Generate random strong password
 * @param length Password length
 * @returns Random password
 */
function generateRandomPassword(length: number = 16): string {
    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    // All characters combined
    const allChars = 
        charset.lowercase + 
        charset.uppercase + 
        charset.numbers + 
        charset.special;
    
    let password = '';
    
    // Ensure at least one character from each category
    password += getRandomChar(charset.lowercase);
    password += getRandomChar(charset.uppercase);
    password += getRandomChar(charset.numbers);
    password += getRandomChar(charset.special);
    
    // Fill remaining characters randomly
    for (let i = 4; i < length; i++) {
        password += getRandomChar(allChars);
    }
    
    // Shuffle the characters
    return shuffleString(password);
}

/**
 * Get random character from string
 */
function getRandomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
}

/**
 * Shuffle string characters
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
 * Main application class
 */
class PasswordStrengthCheckerApp {
    // Definite assignment assertion
    private passwordInput!: HTMLInputElement;
    private togglePasswordBtn!: HTMLButtonElement;
    private generatePasswordBtn!: HTMLButtonElement;
    
    private strengthMeter!: StrengthMeter;
    private ui!: UI;
    
    // Analysis debounce timer
    private analysisTimer: number | null = null;
    
    constructor() {
        this.initializeElements();
        this.initializeModules();
        this.setupEventListeners();
        this.initializeUI();
    }
    
    /**
     * Initialize DOM elements
     */
    private initializeElements(): void {
        const passwordInput = document.getElementById('passwordInput');
        const togglePasswordBtn = document.getElementById('togglePassword');
        const generatePasswordBtn = document.getElementById('generatePassword');
        
        // Check if elements exist
        if (!passwordInput || !togglePasswordBtn || !generatePasswordBtn) {
            throw new Error('Required DOM elements not found');
        }
        
        this.passwordInput = passwordInput as HTMLInputElement;
        this.togglePasswordBtn = togglePasswordBtn as HTMLButtonElement;
        this.generatePasswordBtn = generatePasswordBtn as HTMLButtonElement;
    }
    
    /**
     * Initialize modules
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
     * Setup event listeners
     */
    private setupEventListeners(): void {
        // Password input change
        this.passwordInput.addEventListener('input', () => {
            this.handlePasswordChange();
        });
        
        // Password visibility toggle
        this.togglePasswordBtn.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
        
        // Random password generation
        this.generatePasswordBtn.addEventListener('click', () => {
            this.generateAndSetPassword();
        });
        
        // Focus on input when page loads
        window.addEventListener('DOMContentLoaded', () => {
            this.passwordInput.focus();
        });
    }
    
    /**
     * Initialize UI
     */
    private initializeUI(): void {
        this.ui.reset();
        this.strengthMeter.reset();
    }
    
    /**
     * Handle password change with debounce
     */
    private handlePasswordChange(): void {
        // Clear previous timer
        if (this.analysisTimer) {
            clearTimeout(this.analysisTimer);
        }
        
        // Set new timer (100ms debounce)
        this.analysisTimer = window.setTimeout(() => {
            this.analyzePassword();
        }, 100);
    }
    
    /**
     * Analyze password and update UI
     */
    private analyzePassword(): void {
        const password = this.passwordInput.value;
        
        // Reset UI if password is empty
        if (!password || password.length === 0) {
            this.ui.reset();
            this.strengthMeter.reset();
            return;
        }
        
        // Analyze password
        const analysis = PasswordChecker.analyze(password);
        
        // Update strength meter
        this.strengthMeter.update(analysis.score, analysis.level);
        
        // Update UI
        this.ui.updateAll(analysis, password);
    }
    
    /**
     * Toggle password visibility
     */
    private togglePasswordVisibility(): void {
        const type = this.passwordInput.type;
        const icon = this.togglePasswordBtn.querySelector('i') as HTMLElement;
        
        if (type === 'password') {
            this.passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
            this.togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            this.passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
            this.togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }
    }
    
    /**
     * Generate random password and set it in input
     */
    private generateAndSetPassword(): void {
        const randomPassword = generateRandomPassword(16);
        this.passwordInput.value = randomPassword;
        this.passwordInput.type = 'text';
        
        // Update icon
        const icon = this.togglePasswordBtn.querySelector('i') as HTMLElement;
        icon.className = 'fas fa-eye-slash';
        this.togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        
        // Analyze the password
        this.analyzePassword();
        
        // Select the password for easy copying
        this.passwordInput.select();
        
        // Show notification
        this.showToast('Strong password generated!');
    }
    
    /**
     * Show toast message
     * @param message Message to show
     */
    private showToast(message: string): void {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-message fade-in';
        toast.textContent = message;
        
        // Add styles
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
        
        // Add to page
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
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

// Start the application
const app = new PasswordStrengthCheckerApp();

// Add to global scope for development
declare global {
    interface Window {
        app: PasswordStrengthCheckerApp;
    }
}

window.app = app;