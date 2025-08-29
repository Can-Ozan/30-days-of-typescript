# 📝 SwiftNote Studio

A modern and dynamic note-taking web application. Categorize, tag, search, and organize your notes efficiently.

## ✨ Features

- 🎨 **Modern Design**: Glass morphism effects and smooth animations
- 📁 **Category System**: Organize your notes into categories
- 🏷️ **Tag System**: Add tags to your notes
- 🔍 **Powerful Search**: Search through titles, content, and tags
- ⭐ **Favorites**: Mark important notes as favorites
- 💾 **Auto-Save**: Your data is safely stored
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Instant search and smooth transitions

## 🛠️ Technologies

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide Icons** - Beautiful icon set
- **date-fns** - Date formatting
- **Vite** - Fast build tool

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Robust database
- **Real-time subscriptions** - Live updates

## 🖼️ Project Screenshots

### Main Interface
![SwiftNote Studio Interface](/images/arayüz.png)

## 🚀 Installation

### Requirements
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the project**
```bash
git clone https://github.com/Can-Ozan/swiftnote-studio.git
cd swiftnote-studio
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

4. **Open in your browser**
```
http://localhost:8080
```

## 📖 Usage

### Creating Notes
1. Click the **"New Note"** button
2. Add title and content
3. Select a category
4. Add tags (optional)
5. Click **"Save"** button

### Editing Notes
1. Click on the note you want to edit
2. Click the **"Edit"** button
3. Make your changes
4. Save with **"Save"**

### Search and Filtering
- **Search bar**: Quickly search through your notes
- **Categories**: Filter by categories in the left sidebar
- **Favorites**: View your favorite notes

### Keyboard Shortcuts
- `Ctrl + Enter`: Save note
- `Esc`: Cancel editing

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── Header.tsx      # Top header and search
│   ├── Sidebar.tsx     # Category navigation
│   ├── NoteList.tsx    # Note list
│   └── NoteEditor.tsx  # Note editor
├── store/              # Zustand store
│   └── noteStore.ts    # Note state management
├── types/              # TypeScript type definitions
│   └── note.ts         # Note types
├── pages/              # Page components
│   └── Index.tsx       # Main page
└── lib/                # Utility functions
    └── utils.ts        # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: Deep Purple (`#7c3aed`)
- **Accent**: Cyan Blue (`#06b6d4`)
- **Background**: Dark theme with gradients
- **Glass Effects**: Modern look with backdrop blur

### Animations
- **Fade In**: Page loading
- **Slide Up**: List items
- **Scale In**: Modals and popups
- **Hover Effects**: Interactive elements

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Style
- **ESLint** for code quality control
- **Prettier** for code formatting
- **TypeScript** for type safety

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📞 Contact

- **Email**: yusufcanozan9@gmail.com
- **GitHub**: https://github.com/Can-Ozan/swiftnote-studio.git

---

Manage your notes in a modern and efficient way with **SwiftNote Studio**! ✨
