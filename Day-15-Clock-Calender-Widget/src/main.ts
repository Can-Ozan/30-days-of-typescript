import { Clock } from './Clock';
import { Calendar } from './Calendar';

class App {
    private clock: Clock;
    private calendar: Calendar;

    constructor() {
        this.clock = new Clock();
        this.calendar = new Calendar();
        this.initializeApp();
    }

    private initializeApp(): void {
        // Uygulamayı başlat
        this.clock.start();
        this.calendar.initialize();
        
        // Tema değiştiriciyi kur
        this.setupThemeToggle();
        
        console.log('Modern Saat & Takvim uygulaması başlatıldı');
    }

    private setupThemeToggle(): void {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Kayıtlı temayı yükle
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme, themeToggle);

        // Tema değiştirme olayını dinle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme, themeToggle);
        });
    }

    private setTheme(theme: string, themeToggle: HTMLElement): void {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// DOM yüklendikten sonra uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new App();
});