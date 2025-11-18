# Smart Code Refactorer 🔧

A powerful, AST-based code analysis and refactoring tool built with TypeScript and React. Analyzes JavaScript/TypeScript code to detect patterns, suggest improvements, and provide automated refactoring suggestions.

## ✨ Features

- **🔍 AST-Based Analysis**: Uses Abstract Syntax Tree for precise code analysis
- **🚀 No API Required**: All processing happens client-side
- **💡 Smart Suggestions**: Automatic detection of code patterns and improvements
- **👁️ Before/After Visualization**: Side-by-side comparison of original and refactored code
- **📊 Issue Detection**: Identifies code smells, duplicates, and complexity issues
- **🛠️ Multiple Refactoring Strategies**:
  - Extract Function
  - Extract Variable  
  - Simplify Conditions
  - Remove Duplicates

## 🏗️ Project Structure

```
smart-code-refactorer/
├── src/
│   ├── ast/
│   │   ├── types.ts          # AST type definitions
│   │   ├── tokenizer.ts      # Code tokenization
│   │   ├── parser.ts         # AST parsing
│   │   └── analyzer.ts       # Code analysis
│   ├── refactor/
│   │   ├── strategies.ts     # Refactoring strategies
│   │   └── refactorer.ts     # Main refactoring engine
│   ├── ui/
│   │   ├── components/
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── BeforeAfter.tsx
│   │   │   └── Suggestions.tsx
│   │   └── styles/
│   │       └── main.css
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone
   cd smart-code-refactorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Code Analysis**: Custom AST Parser
- **Styling**: CSS3 with modern features
- **Package Manager**: npm

## 🔧 How It Works

### 1. Tokenization
The code is broken down into tokens (keywords, identifiers, operators, etc.)

### 2. Parsing  
Tokens are transformed into an Abstract Syntax Tree (AST)

### 3. Analysis
The AST is analyzed for:
- Code complexity
- Duplicate patterns
- Unused variables
- Inefficient structures

### 4. Refactoring
Based on analysis, the system suggests and applies:
- Function extraction
- Variable extraction
- Condition simplification
- Duplicate removal

## 📋 Supported Analysis

### Code Issues Detected
- **Complex Functions**: Functions that are too long or have too many parameters
- **Duplicate Code**: Repeated code blocks and patterns
- **Unused Variables**: Variables declared but not used
- **Complex Conditions**: Overly complicated conditional logic
- **Nested Loops**: Performance-impacting loop structures

### Refactoring Strategies
- **Extract Function**: Convert repeated code into reusable functions
- **Extract Variable**: Replace complex expressions with descriptive variables
- **Simplify Condition**: Break down complex conditions into readable functions
- **Remove Duplicate**: Eliminate redundant code blocks

## 🎯 Usage

1. **Enter your code** in the left editor panel
2. **Click "Analyze Code"** to start the analysis
3. **View results** in three sections:
   - Before/After code comparison
   - Refactoring suggestions
   - Detected issues with severity levels

## 🔍 Example

**Input Code:**
```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```

**Suggested Refactoring:**
```javascript
function calculateItemTotal(item) {
  return item.price * item.quantity;
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
}
```

## 📦 Dependencies

### Production
- `react`: ^18.2.0
- `react-dom`: ^18.2.0

### Development  
- `@types/react`: ^18.2.0
- `@types/react-dom`: ^18.2.0
- `@vitejs/plugin-react`: ^4.0.0
- `typescript`: ^5.0.0
- `vite`: ^4.4.0

## 🚨 Troubleshooting

### Common Issues

1. **Port 5173 not working?**
   - Check if another process is using the port
   - Use `npx vite --port 3000` to change port

2. **Build errors?**
   - Clear cache: `rm -rf node_modules package-lock.json`
   - Reinstall: `npm install`

3. **TypeScript errors?**
   - Run `npx tsc --noEmit` to check types
   - Ensure all AST types are properly defined

### Development Tips

- Use `npm run dev` for hot-reload development
- Check browser console for runtime errors
- Use TypeScript strict mode for better code quality

## 🔮 Future Enhancements

- [ ] Support for more JavaScript features (ES6+)
- [ ] Integration with popular code formatters
- [ ] Export refactored code to files
- [ ] Code metrics and statistics
- [ ] Plugin system for custom analyzers
- [ ] Support for multiple programming languages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Acknowledgments

- Built with modern web technologies
- Inspired by code quality tools and linters
- Uses custom AST implementation for educational purposes

---

**Happy Refactoring!** 🚀

For questions or support, please open an issue in the repository.