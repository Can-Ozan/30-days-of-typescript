import { DateUtils } from './DateUtils';

export class Clock {
    private is24Hour: boolean = true;
    private intervalId: number | null = null;

    constructor() {}

    start(): void {
        this.update();
        this.intervalId = window.setInterval(() => this.update(), 1000);
    }

    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private update(): void {
        const now = new Date();
        const time = DateUtils.formatTime(now);
        
        // Saati güncelle
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const ampmElement = document.getElementById('ampm');
        
        if (hoursElement) hoursElement.textContent = time.hours;
        if (minutesElement) minutesElement.textContent = time.minutes;
        if (secondsElement) {
            secondsElement.textContent = time.seconds;
            secondsElement.className = 'seconds';
        }
        if (ampmElement) ampmElement.textContent = this.is24Hour ? '' : time.ampm;
        
        // Tarihi güncelle
        const dateDisplay = document.getElementById('dateDisplay');
        if (dateDisplay) {
            dateDisplay.textContent = DateUtils.formatDate(now);
        }
        
        // İstatistikleri güncelle
        this.updateStats(now);
    }

    private updateStats(date: Date): void {
        const dayOfYearElement = document.getElementById('dayOfYear');
        const weekNumberElement = document.getElementById('weekNumber');
        const daysLeftElement = document.getElementById('daysLeft');
        
        if (dayOfYearElement) {
            dayOfYearElement.textContent = DateUtils.getDayOfYear(date).toString();
        }
        if (weekNumberElement) {
            weekNumberElement.textContent = DateUtils.getWeekNumber(date).toString();
        }
        if (daysLeftElement) {
            daysLeftElement.textContent = DateUtils.getDaysLeftInYear(date).toString();
        }
    }

    toggleTimeFormat(): void {
        this.is24Hour = !this.is24Hour;
        this.update();
    }
}