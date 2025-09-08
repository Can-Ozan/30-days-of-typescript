# Modern Weather App

A beautiful, modern weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information and 5-day forecasts for any location worldwide.

## 🌟 Features

- **Real-time Weather Data**: Current temperature, humidity, wind speed, and atmospheric pressure
- **5-Day Forecast**: Extended weather predictions with detailed daily information
- **Location Search**: Search for weather information in any city worldwide
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI/UX**: Glass morphism effects, smooth animations, and intuitive interface
- **Dynamic Backgrounds**: Weather-responsive background themes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Can-Ozan/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```


## 🛠️ Development

### Local Development

The project uses Vite for fast development and hot module replacement. Make changes to the code and see them reflected instantly in your browser.

### Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Code Quality

```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── WeatherCard.tsx # Main weather display
│   ├── ForecastCard.tsx # 5-day forecast
│   └── SearchBar.tsx   # Location search
├── lib/                # Utility functions
│   ├── weather.ts      # Weather API integration
│   └── utils.ts        # General utilities
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## 🛠️ Tech Stack & Languages

### Frontend Languages & Frameworks
- **TypeScript** - Primary development language for type safety
- **TSX/JSX** - React component markup with TypeScript
- **CSS** - Styling with Tailwind utility classes
- **HTML** - Semantic markup structure

### Core Technologies
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **OpenWeather API** - Real-time weather data

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Node.js** - JavaScript runtime environment

## 🚀 Deployment

### GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   # If using gh-pages package
   npm install --save-dev gh-pages
   npm run deploy
   ```

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch
3. Set build command: `npm run build`
4. Set output directory: `dist`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for similar problems
- Provide detailed information about the bug or feature request
