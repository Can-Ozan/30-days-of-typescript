```markdown
# 📧 Email Summarizer AI

AI-powered email summarization service that converts long emails into concise summaries using OpenAI API.

## 🚀 Features

- ✨ Instant summarization of long emails
- 🎯 Turkish language support
- ⚡ Fast and user-friendly interface
- 📱 Responsive design
- 🔄 Real-time summarization
- 📊 Word count and reduction statistics

## 🛠 Technology Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Vanilla JavaScript** - Functionality
- **Live Server** - Development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Programming language
- **OpenAI API** - AI summarization
- **CORS** - Cross-origin security

## 📦 Installation

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=3000" > .env
echo "OPENAI_API_KEY=sk-your-api-key-here" >> .env

# Start backend server
npm run dev
```

Backend: http://localhost:3000

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Start development server
npx live-server --port=8080
```

Frontend: http://localhost:8080

## 🔧 API Endpoints

### POST /api/summarize
Summarizes email content

**Request:**
```json
{
  "email": "Email text here...",
  "maxLength": 150
}
```

**Response:**
```json
{
  "original": "Original email content...",
  "summary": "Summarized email content...",
  "length": {
    "original": 250,
    "summary": 75,
    "reduction": "70%"
  }
}
```

### GET /health
Service health check

## 🎯 Usage

1. Open the frontend (http://localhost:8080)
2. Paste your email content into the textarea
3. Select desired maximum word count
4. Click "Summarize" button
5. View AI-generated summary

## 🔑 OpenAI API Key

Real summarization requires OpenAI API key:

1. Get API key from https://platform.openai.com/api-keys
2. Add to `backend/.env` file:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key
   ```

## 🐛 Troubleshooting

### Backend not working:
```bash
# Check port usage
netstat -ano | findstr :3000

# Kill process
taskkill /PID [PROCESS_ID] /F
```

### Frontend not working:
```bash
# Install live-server globally
npm install -g live-server

# Or run with npx
npx live-server --port=8080
```

### CORS errors:
Check CORS configuration in backend.

## 📁 Project Structure

```
email-summarizer-ai/
├── 📂 backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── 📂 frontend/
    ├── index.html
    ├── style.css
    ├── script.js
    └── package.json
```

## 👨‍💻 Developer

**Yusuf Can Ozan**
- 📧 Email: yusufcanozan9@gmail.com
- 💼 GitHub:(https://github.com/Can-Ozan)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Note:** This project is developed for educational purposes. Security measures should be added for production use.
```