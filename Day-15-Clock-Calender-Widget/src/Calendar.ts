import { DateUtils, CalendarDay } from './DateUtils';

export class Calendar {
    private currentDate: Date;
    private selectedDate: Date | null = null;

    constructor() {
        this.currentDate = new Date();
    }

    initialize(): void {
        this.renderCalendar();
        this.setupEventListeners();
    }

    private renderCalendar(): void {
        this.updateMonthYear();
        this.renderCalendarDays();
    }

    private updateMonthYear(): void {
        const monthYearElement = document.getElementById('currentMonthYear');
        if (monthYearElement) {
            const months = [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ];
            const month = months[this.currentDate.getMonth()];
            const year = this.currentDate.getFullYear();
            monthYearElement.textContent = `${month} ${year}`;
        }
    }

    private renderCalendarDays(): void {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        // Mevcut gün başlıklarını koru, sadece gün hücrelerini temizle
        const dayHeaders = Array.from(calendarGrid.children).slice(0, 7);
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(header => calendarGrid.appendChild(header));

        const days = DateUtils.generateCalendarDays(this.currentDate);
        
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = this.getDayCellClass(day);
            dayElement.textContent = day.day.toString();
            dayElement.addEventListener('click', () => this.handleDayClick(day));
            
            calendarGrid.appendChild(dayElement);
        });
    }

    private getDayCellClass(day: CalendarDay): string {
        let className = 'day-cell';
        
        if (!day.isCurrentMonth) {
            className += ' other-month';
        }
        
        if (day.isToday) {
            className += ' today';
        }
        
        if (day.isWeekend) {
            className += ' weekend';
        }
        
        if (this.selectedDate && DateUtils.isSameDay(day.date, this.selectedDate)) {
            className += ' selected';
        }
        
        return className;
    }

    private handleDayClick(day: CalendarDay): void {
        this.selectedDate = day.date;
        this.renderCalendar();
        
        console.log('Seçilen tarih:', day.date.toLocaleDateString('tr-TR'));
    }

    previousMonth(): void {
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1,
            1
        );
        this.renderCalendar();
    }

    nextMonth(): void {
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + 1,
            1
        );
        this.renderCalendar();
    }

    goToToday(): void {
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.renderCalendar();
    }

    private setupEventListeners(): void {
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const todayBtn = document.getElementById('todayBtn');

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => this.previousMonth());
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => this.nextMonth());
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }
    }
}