# QR Scanner - Advanced QR Code Generator, Scanner & API Tool

A modern, feature-rich QR code generator and scanner application with API integration capabilities. Built with React, TypeScript, and Capacitor for cross-platform compatibility. Generate custom-sized QR codes, scan with camera, and integrate with external APIs - all with beautiful dark/light theme support.

## ✨ Features

### 🎯 QR Code Generator
- **Multiple Input Types**: Text, URLs, and contact information (vCard format)
- **Custom Sizes**: Choose from 5 size options (200px - 800px) including A4 print-ready format
- **Professional Quality**: High-resolution output with customizable error correction
- **Export Options**: Download as PNG, copy to clipboard, or share directly
- **Settings Panel**: Advanced configuration options for size and quality

### 📷 QR Code Scanner
- **Live Camera Scanning**: Real-time QR code detection with native camera access
- **Image Upload Scanning**: Scan QR codes from gallery images
- **Flashlight Support**: Built-in flashlight toggle for low-light scanning
- **Smart Content Detection**: Auto-recognizes URLs, text, contact cards, and more
- **Formatted Results**: Beautiful display of scanned content with appropriate actions

### 🌐 API Integration Tool
- **HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE requests
- **Custom Headers**: JSON-formatted header configuration including authentication
- **Request Body**: Full JSON body support for POST/PUT requests
- **Response Viewer**: Formatted JSON response display with syntax highlighting
- **Status Monitoring**: HTTP status code indicators with color coding
- **CORS Handling**: Built-in CORS notice and recommendations

### 🎨 Theme & UI Features
- **Dark/Light Mode**: Seamless theme switching with system preference support
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean design using Tailwind CSS and shadcn/ui components
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🖼️ Project Screenshots

### Main Interface
![SwiftNote Studio Interface](/images/image.png)

### 📱 Mobile & Cross-Platform
- **Native Camera Access**: Capacitor integration for native device features
- **Offline Capable**: Full functionality without internet connection
- **Cross-Platform**: iOS, Android, and web browser support
- **Hot Reload**: Development-friendly with live updates
- **Progressive Web App**: Installable on mobile devices

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Theming**: next-themes for dark/light mode
- **Mobile**: Capacitor for native device integration
- **QR Libraries**: qrcode (generation) + qr-scanner (detection)
- **HTTP Client**: Fetch API with CORS handling
- **State Management**: React hooks and context

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- For mobile development: Android Studio (Android) or Xcode (iOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Can-Ozan/Qr-Code-Generator-And-Reader.git
   cd Qr-Code-Generator-And-Reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Mobile Development

To run on mobile devices:

1. **Export to GitHub** using the "Export to GitHub" button in the Lovable interface

2. **Clone your repository locally**
   ```bash
   git clone https://github.com/Can-Ozan/Qr-Code-Generator-And-Reader.git
   cd Qr-Code-Generator-And-Reader
   npm install
   ```

3. **Add mobile platforms**
   ```bash
   # For Android
   npx cap add android
   
   # For iOS (macOS only)
   npx cap add ios
   ```

4. **Build and sync**
   ```bash
   npm run build
   npx cap sync
   ```

5. **Run on device/emulator**
   ```bash
   # Android
   npx cap run android
   
   # iOS
   npx cap run ios
   ```

## Usage Guide

### QR Code Generation

1. **Text QR Codes**
   - Navigate to the Generator tab
   - Select "Text" and enter your content
   - Configure size in Settings (gear icon)
   - Choose from: Small (200px), Medium (300px), Large (400px), A4 Print (600px), High Quality (800px)
   - Click "Generate QR Code"
   - Download, copy to clipboard, or share

2. **URL QR Codes**
   - Select "URL" tab in Generator
   - Enter complete URL (including https://)
   - Customize size as needed
   - Generate and export your QR code

3. **Contact QR Codes (vCard)**
   - Choose "Contact" tab
   - Fill in contact details (name, phone, email, organization)
   - Generate vCard-formatted QR code for easy contact sharing

### QR Code Scanning

1. **Live Camera Scanning**
   - Switch to Scanner tab
   - Grant camera permissions when prompted
   - Point camera at QR code for automatic detection
   - Use flashlight toggle for better visibility in low light
   - Results display automatically with appropriate actions

2. **Image Upload Scanning**
   - Click "Scan from Image" in Scanner
   - Select image file from device gallery
   - View detected content with smart formatting

### API Integration

1. **Making HTTP Requests**
   - Navigate to API tab
   - Select HTTP method (GET, POST, PUT, PATCH, DELETE)
   - Enter target API URL
   - Configure custom headers in JSON format:
     ```json
     {
       "Authorization": "Bearer your-token",
       "Content-Type": "application/json",
       "X-API-Key": "your-api-key"
     }
     ```
   - Add request body for POST/PUT operations
   - Send request and view formatted response

2. **Response Handling**
   - View HTTP status codes with color indicators
   - Copy response data to clipboard
   - Handle JSON and text responses automatically
   - CORS error handling and guidance

### Theme Switching

- **Desktop**: Click sun/moon icon in top navigation
- **Mobile**: Access theme toggle in mobile menu
- **Auto-Detection**: Respects system preferences by default

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui component library
│   ├── AppNavigation.tsx   # Main navigation with theme toggle
│   ├── QRGenerator.tsx     # QR generation with custom sizing
│   ├── QRScanner.tsx       # Camera-based QR scanning
│   └── APIIntegration.tsx  # HTTP API request tool
├── hooks/
│   └── use-toast.ts        # Toast notification system
├── lib/
│   └── utils.ts           # Utility functions and helpers
├── pages/
│   └── Index.tsx          # Main application routing
└── App.tsx                # Root component with theme provider
```

## Configuration

### Capacitor Configuration
- **App ID**: `app.lovable.b639fbb0672b41beb85348d802d757f7`
- **App Name**: `QR Scanner - Advanced QR Code Generator, Scanner`
- **Hot Reload**: Enabled for development with sandbox URL
- **Server Configuration**: Optimized for mobile development

### Theme Configuration
- **Default Theme**: Light mode with system preference detection
- **Theme Provider**: next-themes with class attribute switching
- **CSS Variables**: Complete design system with HSL color values
- **Dark Mode**: Professional dark theme optimized for mobile

### Camera Permissions
The application automatically requests camera permissions for QR scanning. Ensure your browser/device allows camera access:
- **Web**: Grant camera permission when prompted
- **Mobile**: Check app permissions in device settings
- **Development**: Use HTTPS for camera access in production

### API Configuration
- **CORS Handling**: Built-in CORS error detection and user guidance
- **Request Timeout**: Standard fetch API timeout handling
- **Error Handling**: Comprehensive error messages for network issues
- **Content Types**: Support for JSON and text response formats

## Browser Compatibility

### Desktop Browsers
- **Chrome/Chromium**: Full support including camera and API features
- **Firefox**: Complete functionality with camera access
- **Safari**: Full support on macOS with native integration
- **Edge**: Complete feature support

### Mobile Browsers
- **Chrome Mobile**: Native camera integration via Capacitor
- **Safari iOS**: Full iOS integration with native camera
- **Samsung Internet**: Complete Android support
- **Firefox Mobile**: Full functionality on Android

### Progressive Web App
- **Installation**: Add to home screen on mobile devices
- **Offline Support**: Core functionality works without internet
- **Native Feel**: App-like experience on mobile platforms

## Performance & Optimization

### QR Code Generation
- **Image Optimization**: Efficient PNG generation with optimal compression
- **Size Options**: Multiple resolution options for different use cases
- **Memory Management**: Automatic cleanup of generated images
- **Batch Processing**: Optimized for multiple QR code generation

### Camera Performance
- **Stream Management**: Efficient camera stream handling
- **Auto-Focus**: Automatic focus adjustment for better scanning
- **Frame Rate**: Optimized scanning frequency for battery life
- **Memory Usage**: Proper cleanup of camera resources

### API Performance
- **Request Caching**: Smart caching for repeated API calls
- **Error Recovery**: Automatic retry logic for failed requests
- **Timeout Handling**: Proper timeout management for long requests
- **Response Parsing**: Efficient JSON/text response processing

## Security & Privacy

### Data Protection
- **No Persistent Storage**: QR codes and scan results are never stored permanently
- **Local Processing**: All QR generation and scanning happens on-device
- **No Analytics**: Zero user tracking or data collection
- **Memory Cleanup**: Automatic cleanup of temporary data

### Camera Security
- **Permission-Based**: Camera access only with explicit user consent
- **No Recording**: Camera stream used only for real-time QR detection
- **Local Processing**: Image processing happens entirely on-device
- **Auto-Cleanup**: Camera resources released immediately after use

### API Security
- **Client-Side Only**: API requests made directly from user's device
- **No Proxy Storage**: Request/response data not stored on servers
- **HTTPS Enforcement**: Secure connections recommended for API calls
- **Header Security**: Secure handling of authentication headers

### Network Security
- **CORS Compliance**: Proper CORS handling with user guidance
- **SSL/TLS**: HTTPS required for camera access and secure API calls
- **No Third-Party Tracking**: No external analytics or tracking scripts
- **Local Storage**: Minimal use of browser storage for theme preferences only

## Troubleshooting

### Camera Issues
- **Permission Denied**: Check browser/device camera permissions
- **Black Screen**: Ensure HTTPS is used in production
- **No Detection**: Clean camera lens and ensure good lighting
- **Flashlight**: Not available on all devices/browsers

### QR Generation Issues
- **Large Text**: Use higher quality settings for complex content
- **Download Fails**: Check browser download permissions
- **Copy Error**: Ensure modern browser with clipboard API support

### API Integration Issues
- **CORS Errors**: Use backend proxy for production applications
- **Timeout**: Check network connection and API endpoint status
- **Authentication**: Verify API key format and permissions
- **Response Format**: Ensure API returns valid JSON or text

### Mobile Deployment
- **Build Errors**: Run `npm install` after cloning repository
- **Sync Issues**: Always run `npx cap sync` after code changes
- **Permission Issues**: Check native app permissions in device settings
- **Performance**: Close other apps for better camera performance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [Capacitor documentation](https://capacitorjs.com/docs) for mobile-specific issues
- Review [Lovable documentation](https://docs.lovable.dev/) for deployment questions

## Acknowledgments

### Core Libraries
- **[QRCode.js](https://github.com/davidshimjs/qrcodejs)** - High-quality QR code generation
- **[QR Scanner](https://github.com/nimiq/qr-scanner)** - Efficient QR code detection
- **[Capacitor](https://capacitorjs.com/)** - Native mobile app capabilities
- **[React](https://reactjs.org/)** - Modern UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### UI & Design
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Comprehensive icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching solution

### Development Tools
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[Lovable](https://lovable.dev/)** - AI-powered development platform

---

**Built with ❤️ by Yusuf Can Ozan**

*This project showcases modern web development practices with React, TypeScript, and native mobile integration through Capacitor. Perfect for learning cross-platform development and progressive web app concepts.*

---

### Quick Links
- 📖 [Capacitor Documentation](https://capacitorjs.com/docs)
- 🚀 [Lovable Platform](https://docs.lovable.dev/)
- 💡 [Contributing Guidelines](#contributing)
- 🐛 [Report Issues](https://github.com/Can-Ozan/Qr-Code-Generator-And-Reader/issues)
