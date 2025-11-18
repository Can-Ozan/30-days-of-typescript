export interface CalendarDay {
    day: number;
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
}

export class DateUtils {
    static getDaysInMonth(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    static getFirstDayOfMonth(date: Date): number {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // Pazartesi başlangıç için ayarlama (Pazar=0, Pazartesi=1, ...)
        return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    }

    static generateCalendarDays(date: Date): CalendarDay[] {
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        
        const daysInMonth = this.getDaysInMonth(date);
        const firstDayIndex = this.getFirstDayOfMonth(date);
        
        const days: CalendarDay[] = [];
        
        // Önceki aydan günler
        const prevMonth = new Date(year, month - 1, 1);
        const daysInPrevMonth = this.getDaysInMonth(prevMonth);
        
        for (let i = 0; i < firstDayIndex; i++) {
            const day = daysInPrevMonth - firstDayIndex + i + 1;
            const dateObj = new Date(year, month - 1, day);
            days.push({
                day,
                date: dateObj,
                isCurrentMonth: false,
                isToday: this.isSameDay(dateObj, today),
                isWeekend: this.isWeekend(dateObj)
            });
        }
        
        // Mevcut ay günleri
        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            days.push({
                day: i,
                date: dateObj,
                isCurrentMonth: true,
                isToday: this.isSameDay(dateObj, today),
                isWeekend: this.isWeekend(dateObj)
            });
        }
        
        // Sonraki aydan günler (42 hücre için)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const dateObj = new Date(year, month + 1, i);
            days.push({
                day: i,
                date: dateObj,
                isCurrentMonth: false,
                isToday: this.isSameDay(dateObj, today),
                isWeekend: this.isWeekend(dateObj)
            });
        }
        
        return days;
    }

    static isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    static isWeekend(date: Date): boolean {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    static formatDate(date: Date): string {
        return date.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatTime(date: Date): { hours: string, minutes: string, seconds: string, ampm: string } {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes,
            seconds,
            ampm: hours >= 12 ? 'PM' : 'AM'
        };
    }

    static getDayOfYear(date: Date): number {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    static getWeekNumber(date: Date): number {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    static getDaysLeftInYear(date: Date): number {
        const endOfYear = new Date(date.getFullYear(), 11, 31);
        const diff = endOfYear.getTime() - date.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
}