# Recipe Recommender AI 🍳

A smart AI-powered recipe recommendation system that suggests recipes based on the ingredients you have available. Built with OpenAI API and modern web technologies.

## 🌟 Features

- **AI-Powered Recommendations**: Get personalized recipe suggestions using OpenAI GPT
- **Ingredient-Based Search**: Input available ingredients and get matching recipes
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Processing**: Instant recipe generation with loading indicators
- **Detailed Recipes**: Complete cooking instructions, ingredients, cooking time, and difficulty levels
- **Demo Mode**: Works even without OpenAI API key

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6+** - Async/await, Fetch API, Classes

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI recipe generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
recipe-recommender/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styles and responsive design
│   └── script.js           # Frontend JavaScript logic
└── backend/
    ├── server.js           # Express server and API routes
    ├── package.json        # Dependencies and scripts
    ├── .env               # Environment variables
    └── .gitignore         # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (optional for demo mode)

### Installation

1. **Clone or download the project**
```bash
# Create project directory
mkdir recipe-recommender
cd recipe-recommender
```

2. **Setup Backend**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# Start the backend server
npm start
```

3. **Setup Frontend**
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Open with Live Server (VS Code extension)
# Or simply open index.html in your browser
```

### Access Points
- **Frontend**: http://localhost:5500 (Live Server default)
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 🔧 Configuration

### Environment Variables (.env)
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=3000
NODE_ENV=development
```

### Getting OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to API Keys section
4. Create a new secret key
5. Copy and paste it in your `.env` file

## 📚 API Endpoints

### GET `/health`
- **Description**: Check if backend is running
- **Response**: 
```json
{
  "status": "OK",
  "message": "Recipe Recommender API çalışıyor",
  "environment": "development"
}
```

### POST `/api/recipes`
- **Description**: Get recipe suggestions based on ingredients
- **Request Body**:
```json
{
  "ingredients": ["tomato", "onion", "garlic"]
}
```
- **Response**:
```json
{
  "success": true,
  "count": 3,
  "recipes": [
    {
      "name": "Tomato Onion Salad",
      "ingredients": ["tomato", "onion", "garlic", "olive oil"],
      "instructions": "1. Chop all ingredients...",
      "cookingTime": "10 minutes",
      "difficulty": "Easy"
    }
  ]
}
```

## 💡 Usage Guide

1. **Start the Application**
   - Backend: `cd backend && npm start`
   - Frontend: Open `frontend/index.html` with Live Server

2. **Enter Ingredients**
   - Type your available ingredients separated by commas
   - Example: `tomato, onion, garlic, olive oil, salt`

3. **Get Recipes**
   - Click "Get Recipe Suggestions" button
   - Wait for AI to generate personalized recipes
   - Browse through the suggested recipes

4. **Cook!**
   - Follow the detailed instructions
   - Check cooking time and difficulty level
   - Enjoy your meal! 🍽️

## 🎨 Features in Detail

### Smart Recipe Matching
- Uses OpenAI GPT to understand ingredient relationships
- Suggests creative recipe combinations
- Provides complete cooking instructions

### User Experience
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Helpful error messages with debugging info
- **Responsive Design**: Optimized for all screen sizes
- **Demo Mode**: Works without API key using sample recipes

### Recipe Information
Each recipe includes:
- 🍽️ Recipe name
- 🛒 Required ingredients
- 👨‍🍳 Step-by-step instructions
- ⏱️ Cooking time
- 📊 Difficulty level

## 🔄 Development

### Running in Development Mode
```bash
# Backend with auto-reload (if nodemon is installed)
cd backend
npm run dev

# Frontend - use Live Server for auto-reload
```

### Project Dependencies

#### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "openai": "^4.20.1",
  "dotenv": "^16.3.1"
}
```

#### Development Dependencies
```json
{
  "nodemon": "^3.0.1"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend is running on port 3000
   - Check if `npm start` shows success message
   - Verify no other applications are using port 3000

2. **OpenAI API Errors**
   - Check if API key is valid and has credits
   - Verify API key is correctly set in `.env` file
   - Ensure OpenAI account is active

3. **CORS Errors**
   - Backend includes CORS configuration
   - Ensure frontend is served from allowed origin
   - Check browser console for specific errors

4. **Module Not Found**
   - Run `npm install` in backend directory
   - Delete `node_modules` and `package-lock.json`, then reinstall

### Debugging Steps

1. **Check Backend Status**
```bash
curl http://localhost:3000/health
```

2. **Test API Endpoint**
```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["tomato","onion"]}'
```

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in Console tab
   - Check Network tab for failed requests

## 🌐 Deployment

### Backend Deployment (Heroku/Netlify/Railway)
1. Set environment variables in hosting platform
2. Deploy backend code
3. Update frontend API URLs to point to deployed backend

### Frontend Deployment
- Can be deployed to any static hosting (Netlify, Vercel, GitHub Pages)
- Update `backendUrl` in `script.js` to point to deployed backend

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Express.js team for the excellent web framework
- All contributors and testers

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Look at browser console for error messages
3. Ensure all prerequisites are met
4. Verify API keys and environment variables

---

**Happy Cooking!** 🍳👨‍🍳👩‍🍳

Built with ❤️ using AI and modern web technologies.