# 🕐 Modern Clock & Calendar Widget

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![Responsive](https://img.shields.io/badge/Responsive-Design-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A fully responsive clock and calendar widget with Turkish language support, modern interface, and advanced features**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development)

![Widget Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Modern+Clock+%26+Calendar+Widget)

</div>

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)
- [FAQ](#-faq)

## 🚀 About the Project

Modern Clock & Calendar Widget is a fully responsive and user-friendly time management tool developed using TypeScript and Vite. This widget provides a modern solution that developers can integrate into their projects or use as a standalone application.

### 🎯 Core Objectives

- ✅ **Real-time** clock and date display
- ✅ **User-interactive** calendar component
- ✅ **Fully responsive** design
- ✅ **Modern UI/UX** principles
- ✅ **Turkish language** support
- ✅ **High performance**

## ✨ Features

### 🕐 Clock Section
- **Real-time** digital clock (second-based updates)
- **Smooth animated** seconds indicator
- **24-hour format** support
- **Turkish date** format ("1 Ocak 2024 Pazartesi")
- **Smooth transitions** and modern typography

### 📅 Calendar Section
- **Interactive monthly** calendar view
- **Month navigation** buttons (previous/next)
- **Return to today** feature
- **Day selection** and highlighting
- **Weekend** color coding
- **Grayed out days** from other months
- **Monday-start** week layout

### 🎨 Theme System
- **Light/Dark** theme support
- **CSS variables** for theme management
- **LocalStorage** theme preference memory
- **Smooth theme transition** animations

### 📊 Statistics
- **Day of the year** counter
- **Week number**
- **Days left in year** countdown

### 📱 Responsive Design
- **Mobile-friendly** design
- **Tablet and desktop** optimization
- **Flexbox + CSS Grid** implementation
- **Adaptive typography** and spacing

## 🛠 Technologies

| Technology | Description | Version |
|-----------|----------|----------|
| **TypeScript** | Type safety and modern JavaScript | ^5.0.0 |
| **Vite** | Fast build tool and development server | ^5.0.0 |
| **HTML5** | Semantic markup and modern features | - |
| **CSS3** | Modern styling and layout | - |
| **ES2020** | Modern JavaScript features | - |

### 🎯 Technical Features

- **Modular Architecture**: Each component as separate TypeScript class
- **Type Safety**: Full TypeScript support
- **Hot Module Replacement**: Instant change visualization
- **Tree Shaking**: Optimized bundle
- **Source Maps**: Easy debugging

## 📥 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Step-by-Step Installation

1. **Download or clone the project:**

```bash
git clone <repository-url>
cd clock-calendar-widget
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

4. **Open in browser:**

```
http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Preview build
npm run preview
```

## 🎮 Usage

### Basic Usage

The widget automatically initializes and includes the following components:

1. **Clock Section**: Real-time clock and date at the top
2. **Calendar Section**: Interactive calendar in the middle
3. **Statistics**: Time statistics at the bottom
4. **Theme Toggle**: Theme button in the top right corner

### Interactions

- **⬅️ ➡️**: Month navigation buttons
- **📅 Return to Today**: Navigate to current month and day
- **🌙/☀️**: Theme toggle
- **Click on Days**: Day selection and detail viewing

## 📁 Project Structure

```
clock-calendar-widget/
├── 📄 index.html              # Main HTML file
├── 🎨 style.css               # Stylesheet (with CSS variables)
├── 📦 package.json            # Project configuration
├── ⚙️ vite.config.js          # Vite configuration
├── 🔧 tsconfig.json           # TypeScript configuration
└── 📁 src/                    # Source code
    ├── 🚀 main.ts             # Application entry point
    ├── 🕐 Clock.ts            # Clock component
    ├── 📅 Calendar.ts         # Calendar component
    └── 📊 DateUtils.ts        # Date utility functions
```

### File Descriptions

#### `src/main.ts`
- Application initializer
- Theme management
- Component coordination

#### `src/Clock.ts`
- Real-time clock management
- Date formatting
- Statistics calculations

#### `src/Calendar.ts`
- Calendar creation and management
- Month navigation operations
- Day selection interactions

#### `src/DateUtils.ts`
- Date calculation functions
- Calendar day generation
- Formatting helpers

#### `style.css`
- Theme system with CSS variables
- Responsive grid and flexbox layout
- Modern animations and transitions

## 🔧 Development

### Development Scripts

```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Build preview
}
```

### Development Tips

1. **Hot Reload**: Changes appear instantly when you save files
2. **Type Checking**: TypeScript compile-time error checking
3. **Source Maps**: Source maps enabled for debugging

### Code Standards

- **TypeScript strict mode** disabled (for flexibility)
- **ES2020** target
- **Modular class structure**
- **English comments**

## 📚 API Reference

### DateUtils Class

```typescript
// Calendar day interface
interface CalendarDay {
    day: number;
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
}

// Static methods
DateUtils.generateCalendarDays(date: Date): CalendarDay[]
DateUtils.formatDate(date: Date): string
DateUtils.formatTime(date: Date): TimeObject
DateUtils.getDayOfYear(date: Date): number
DateUtils.getWeekNumber(date: Date): number
DateUtils.getDaysLeftInYear(date: Date): number
```

### Clock Class

```typescript
class Clock {
    start(): void                    // Start clock
    stop(): void                     // Stop clock
    toggleTimeFormat(): void        // Toggle time format
}
```

### Calendar Class

```typescript
class Calendar {
    initialize(): void              // Initialize calendar
    previousMonth(): void           // Go to previous month
    nextMonth(): void               // Go to next month
    goToToday(): void               // Return to today
}
```

## 🎨 Customization

### Customizing Themes

You can customize themes by modifying CSS variables:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --accent: #3b82f6;
    /* Other variables... */
}

[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --accent: #60a5fa;
    /* Other variables... */
}
```

### Changing Color Scheme

1. Update CSS variables in `style.css`
2. Modify gradient background
3. Update theme colors

### Adding Language Support

1. Change locale settings in `DateUtils.ts`
2. Update texts in `index.html` file
3. Modify calendar headers

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow **TypeScript** coding standards
- Add **English comments**
- Don't break **responsive design**
- **Test** and ensure it works

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ❓ FAQ

### Q: How can I integrate the widget into my own project?
**A:** Copy the built files (`dist` folder) to your project and use the structure from `index.html`.

### Q: Can I change the Turkish language support?
**A:** Yes, modify the `toLocaleDateString('tr-TR')` part in the `DateUtils.ts` file.

### Q: Can I add new themes to the theme system?
**A:** Yes, add new `[data-theme="theme-name"]` selectors to the `style.css` file.

### Q: How is the performance on mobile devices?
**A:** High performance is ensured with optimized CSS and JavaScript.

### Q: What is the browser compatibility?
**A:** The last 2 versions of modern browsers are supported.

## 📞 Contact

For questions about the project:

- **GitHub Issues**: [Create an issue](https://github.com/username/repo/issues)
- **Email**: developer@example.com

---

<div align="center">

**⭐ If you like this project, don't forget to give it a star!**

*Modern Clock & Calendar Widget - With Turkish Support* 🚀

</div>