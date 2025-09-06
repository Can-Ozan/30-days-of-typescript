# Voice Recognition Studio

A comprehensive web-based voice recognition application built with modern web technologies. Transform speech to text with advanced features including real-time transcription, voice commands, analytics, and multi-language support.

## 🚀 Features

### Core Voice Recognition
- **Real-time Speech-to-Text**: Continuous voice recognition with Web Speech API
- **Multi-language Support**: 12+ languages including Turkish, English, German, French, Spanish, and more
- **Voice Activity Detection**: Smart detection of speech vs silence
- **Confidence Scoring**: Real-time confidence metrics for recognition accuracy
- **Noise Reduction**: Advanced filtering for cleaner transcriptions

### Advanced Functionality
- **Voice Commands**: Hands-free control with customizable voice commands
- **Emotion Analysis**: Real-time emotion detection from speech patterns
- **Session Management**: Save, load, and organize transcription sessions
- **Search & Highlight**: Full-text search with keyword highlighting
- **Audio Visualization**: Real-time audio level indicators and waveforms

### Analytics & Insights
- **Performance Metrics**: Accuracy rates, confidence scores, speech clarity
- **Usage Analytics**: Session tracking, daily patterns, language usage
- **Speech Pattern Analysis**: WPM, pause frequency, vocabulary richness
- **Emotion Distribution**: Visual breakdown of emotional states

### Export & Sharing
- **Multiple Formats**: Export to TXT, JSON, CSV, PDF, DOCX, HTML
- **Flexible Selection**: Export current session, selected sessions, or all data
- **Metadata Options**: Include timestamps, duration, confidence scores
- **Quick Sharing**: Copy to clipboard functionality

### User Experience
- **Modern UI**: Beautiful, responsive design with dark/light mode support
- **Customizable Settings**: Adjust sensitivity, confidence thresholds, languages
- **Keyboard Shortcuts**: Quick access to common functions
- **Auto-save**: Automatic session preservation
- **History Management**: Star important sessions, delete old ones

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Speech Recognition**: Web Speech API (browser native)
- **Charts & Analytics**: Recharts for data visualization
- **State Management**: React hooks and context
- **Animation**: CSS animations with Tailwind transitions

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with Web Speech API support:
  - Chrome (recommended)
  - Edge
  - Safari
  - Firefox (limited support)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd voice-recognition-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` in your web browser

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 Usage Guide

### Basic Voice Recognition

1. **Grant Microphone Permission**: Allow browser access to your microphone
2. **Select Language**: Choose your preferred language from settings
3. **Start Recording**: Click the microphone button to begin recognition
4. **Speak Naturally**: Talk normally - the app will transcribe in real-time
5. **Stop Recording**: Click the stop button to end the session

### Voice Commands

Enable hands-free control with built-in voice commands:

- "start recording" - Begin voice recognition
- "stop recording" - End current session
- "clear text" - Clear current transcript
- "save session" - Save current session to history
- "new paragraph" - Add line break
- Custom commands can be added through the settings

### Advanced Features

- **Session Management**: Save important sessions with star ratings
- **Search Functionality**: Find specific content across all sessions
- **Export Options**: Export data in multiple formats for external use
- **Analytics Dashboard**: View detailed insights about your speech patterns

## 🔧 Configuration

### Voice Settings

Customize the recognition engine through the settings panel:

- **Language**: Select primary recognition language
- **Sensitivity**: Adjust microphone sensitivity (10-100%)
- **Confidence Threshold**: Set minimum confidence for accepted text (50-100%)
- **Noise Reduction**: Enable/disable background noise filtering
- **Continuous Mode**: Toggle continuous vs. manual recognition

### Export Settings

Configure export behavior:

- **Default Format**: Set preferred export format
- **Include Metadata**: Toggle session information in exports
- **Auto-naming**: Automatic filename generation with timestamps

## 🌐 Browser Compatibility

| Browser | Support Level | Notes |
|---------|---------------|-------|
| Chrome | ✅ Full | Recommended - best performance |
| Edge | ✅ Full | Full feature support |
| Safari | ⚠️ Partial | Limited language support |
| Firefox | ⚠️ Limited | Basic functionality only |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Check browser permissions for microphone access
- Ensure HTTPS connection (required for Web Speech API)
- Try different browser or device

**Recognition accuracy issues:**
- Check microphone quality and positioning
- Reduce background noise
- Adjust sensitivity settings
- Ensure clear speech and appropriate speaking pace

**Browser compatibility:**
- Use Chrome or Edge for best results
- Update browser to latest version
- Check Web Speech API support

### Getting Help

- Check the browser console for error messages
- Verify microphone permissions in browser settings
- Test with different languages and settings
- Report issues via GitHub Issues

## 🔮 Roadmap

### Upcoming Features

- [ ] Cloud synchronization
- [ ] Collaborative transcription
- [ ] Custom vocabulary training
- [ ] API integration options
- [ ] Mobile app version
- [ ] Advanced punctuation detection
- [ ] Speaker identification
- [ ] Real-time translation

## 📊 Performance

The application is optimized for:

- **Real-time Processing**: Sub-100ms latency for speech recognition
- **Memory Efficiency**: Optimized session storage and cleanup
- **Battery Life**: Efficient audio processing algorithms
- **Network Usage**: Minimal data usage with local processing

## 🏗 Architecture

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── VoiceRecorder/  # Main voice recorder
│   ├── VoiceSettings/  # Configuration panel
│   ├── VoiceAnalytics/ # Analytics dashboard
│   └── ExportManager/  # Export functionality
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── styles/             # CSS and styling
```

## 📈 Analytics

The application tracks:

- **Usage Patterns**: Session frequency and duration
- **Performance Metrics**: Recognition accuracy and confidence
- **Speech Analysis**: Speaking rate, pause patterns, vocabulary
- **Error Rates**: Failed recognitions and retries

All analytics are processed locally - no data is sent to external servers.

---

**Built with ❤️ using modern web technologies**