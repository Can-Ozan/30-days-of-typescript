# 🔐 Password Strength Checker - Real-time Password Analysis Tool

![Password Strength Checker Screenshot](https://img.shields.io/badge/Status-Running-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![No Backend](https://img.shields.io/badge/Backend-None-red)

A modern, responsive, real-time password strength analyzer that works entirely in the browser. No data is sent to any server.

## ✨ Features

### 🎯 Core Features
- ✅ **Real-time analysis** - Instant evaluation as you type
- ✅ **Visual strength meter** - Animated colored bar
- ✅ **Detailed criteria checking** - 8 different security criteria
- ✅ **Constructive feedback** - Shows weaknesses and suggestions
- ✅ **Responsive design** - Perfect display on all devices

### 🔧 Advanced Features
- 🎨 **Automatic theme support** - Adapts to system theme
- 👁️ **Password visibility toggle** - Show/hide password
- 🔄 **Random password generator** - Generate strong passwords
- ⏱️ **Estimated cracking time** - Security level visualization
- 📱 **Mobile compatible** - Works flawlessly on phones and tablets

## 📊 Security Criteria

The tool analyzes passwords based on the following criteria:

| Criteria | Minimum | Ideal |
|----------|---------|--------|
| 📏 Length | 8 characters | 12+ characters |
| 🔤 Lowercase | 1 character | 2+ characters |
| 🔠 Uppercase | 1 character | 2+ characters |
| 🔢 Numbers | 1 character | 2+ characters |
| ⭐ Special characters | 1 character | 2+ characters |
| 🔄 Repeat check | No 3+ repeats | No repeats at all |
| 📖 Weak password | Dictionary check | Unique content |
| 🔗 Sequential chars | No abc, 123 | No patterns |

## 🚀 Quick Start

### Method 1: Direct Run (Easiest)

1. **Download the files:**
```bash
git clone 
cd password-strength-checker
```

2. **Open in browser:**
   - Open the `index.html` file directly in your browser
   - **No installation required!** 🎉

### Method 2: Run in Development Mode

1. **Install Node.js:**
   - [Download Node.js](https://nodejs.org/) (LTS version recommended)

2. **Set up the project:**
```bash
# Navigate to project directory
cd password-strength-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Open in browser:**
   - Go to `http://localhost:5173`

## 📁 Project Structure

```
password-strength-checker/
├── 📄 index.html          # Main HTML file
├── 🎨 style.css           # Stylesheet
├── ⚙️ package.json        # Dependencies and scripts
├── 📜 tsconfig.json       # TypeScript configuration
├── 📂 src/                # Source code
│   ├── 🏗️ main.ts         # Main application entry point
│   ├── 🔍 PasswordChecker.ts # Scoring algorithm
│   ├── ✅ Validators.ts   # Character analysis functions
│   ├── 📊 StrengthMeter.ts # Strength meter management
│   └── 🖥️ UI.ts           # DOM updates
└── 📖 README.md           # This file
```

## 🛠️ Technologies

- **TypeScript** - Type-safe JavaScript
- **ES6+** - Modern JavaScript features
- **CSS3** - CSS variables, Grid, Flexbox
- **HTML5** - Semantic HTML structure
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## 📱 Responsive Design

| Device | Width | Features |
|--------|-------|----------|
| 📱 Mobile | < 768px | Vertical layout, large buttons |
| 📟 Tablet | 768px - 1024px | 2-column layout |
| 🖥️ Desktop | > 1024px | 3-column layout, full features |

## 🌙 Theme Support

- **Light theme** - Default
- **Dark theme** - Automatically activated in system dark mode
- **CSS Variables** - Easy theme customization

## 🔧 Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build Project
```bash
npm run build
```

### TypeScript Check
```bash
npx tsc --noEmit
```

## 🐛 Troubleshooting

### If npm doesn't work in PowerShell:
```powershell
# Open PowerShell as administrator and run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use CMD:
cmd
cd project-directory
npm install
```

### If Node.js is not installed:
1. Download LTS version from https://nodejs.org/
2. Use default settings in installation wizard
3. Restart terminal and check with `node --version`

## 🎨 Customization

### Changing Colors
Update CSS variables in `style.css`:
```css
:root {
    --primary-color: #4361ee;
    --weak-color: #e63946;
    --medium-color: #ff9e00;
    --strong-color: #2a9d8f;
    /* Other colors... */
}
```

### Modifying Criteria
Customize the scoring system in `Validators.ts`:
```typescript
// Example: Change length scores
function checkLength(password: string): number {
    if (password.length === 0) return 0;
    if (password.length < 8) return 5;    // Modified
    if (password.length < 12) return 15;  // Modified
    if (password.length < 16) return 25;  // Modified
    return 35;                            // Modified
}
```

## 📈 Performance

- ⚡ **Debounce usage** - Analysis after 100ms, not on every keystroke
- 🎯 **Optimized regex** - Efficient pattern matching
- 🔄 **Effective DOM updates** - No unnecessary redraws
- 📦 **Modular structure** - Only necessary code loads

## 🔒 Security

- 🛡️ **Completely frontend** - Passwords never sent to server
- 🚫 **No logging** - Analysis results not stored
- 🔐 **Privacy-focused** - User data protected
- 🌐 **Offline capable** - No internet connection required

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Contribution Ideas
- 📱 New responsive design improvements
- 🔐 Additional security criteria
- 🌍 Multi-language support
- 📊 Detailed statistics
- 🎨 Additional theme options

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Password Strength Checker** - Modern password security analysis tool

- 📧 Email: yusufcanozan9@gmail.com
- 💼 LinkedIn: [Yusuf Can Ozan](www.linkedin.com/in/yusufcanozan)

## 🌟 Star This Project!

If you like this project, don't forget to give it a star on GitHub! ⭐

---

**Note:** This tool is for educational purposes only. Additional security measures are recommended for critical systems.

## 🎯 Use Cases

### 1. 🏢 Enterprise Usage
- Password policy training for employees
- Security awareness enhancement
- Password creation guide

### 2. 🏫 Education
- Information security courses
- Password security workshops
- Student projects

### 3. 👨‍💻 Developer Tools
- Application development testing
- User registration forms
- Password validation systems

## 🔄 Update History

### v1.0.0 (Initial Release)
- ✅ Basic password analysis features
- ✅ Responsive design
- ✅ Real-time feedback
- ✅ Random password generator

---

**Happy Coding!** 🚀