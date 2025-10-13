# AI Game Idea Generator

An interactive web application that generates unique game concepts complete with themes, mechanics, characters, and descriptions. Perfect for game developers, designers, and creative brainstorming sessions.

![AI Game Idea Generator](https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Features

- **Random Game Generation**: Generate unique game concepts with a single click
- **Comprehensive Details**: Each idea includes:
  - Theme (e.g., Cyberpunk Future, Medieval Fantasy)
  - Genre (e.g., Action RPG, Platformer, Strategy)
  - 3-5 Game Mechanics (e.g., Double Jump, Time Manipulation)
  - 3-4 Unique Characters with roles and descriptions
  - Game Description
- **Save System**: Save your favorite ideas to a Supabase database
- **History View**: Browse and reload previously generated ideas
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Production Ready**: Fully functional with database persistence

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Ready for production

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository** (or use the existing project directory)

```bash
cd project-directory
```

2. **Install dependencies**

```bash
npm install
```

The following packages are already configured in `package.json`:

### Dependencies
- `react` - React library for building UI
- `react-dom` - React DOM rendering
- `@supabase/supabase-js` - Supabase client for database operations
- `lucide-react` - Icon library

### Dev Dependencies
- `vite` - Fast build tool and dev server
- `typescript` - TypeScript support
- `tailwindcss` - Utility-first CSS framework
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixing

3. **Environment Setup**

The `.env` file is already configured with Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

The database has been automatically configured with:

- **Table**: `game_ideas`
- **Columns**: id, theme, genre, mechanics, characters, description, created_at, user_id
- **Security**: Row Level Security (RLS) enabled with public read/write policies
- **Indexes**: Optimized for performance on created_at and theme columns

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

1. **Generate a Game Idea**
   - Click the "Generate New Idea" button
   - Wait for the AI to create a unique game concept
   - View the generated theme, genre, mechanics, and characters

2. **Save Your Idea**
   - After generating an idea you like, click "Save Idea"
   - The idea will be stored in the database

3. **View Saved Ideas**
   - Click "Saved Ideas" to see your history
   - Click on any saved idea to reload it
   - Delete unwanted ideas with the trash icon

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── GameIdeaCard.tsx      # Main display card for game ideas
│   │   └── SavedIdeas.tsx        # History/saved ideas component
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client configuration
│   │   └── gameGenerator.ts     # Game idea generation logic
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── supabase/
│   └── migrations/               # Database migrations
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

## Key Components

### GameIdeaCard
Displays a generated game idea with:
- Theme and genre header
- Description section
- Mechanics showcase
- Characters grid with roles

### SavedIdeas
Manages the history of saved ideas:
- Collapsible panel
- List of saved ideas with timestamps
- Load and delete functionality

### gameGenerator
Contains the core generation logic:
- 28+ unique themes
- 20+ game genres
- 36+ game mechanics
- Dynamic character generation
- Smart description creation

## Customization

### Adding New Themes
Edit `src/lib/gameGenerator.ts` and add to the `themes` array:

```typescript
const themes = [
  'Your New Theme',
  // ... existing themes
];
```

### Adding New Mechanics
Edit the `mechanics` array in `gameGenerator.ts`:

```typescript
const mechanics = [
  'Your New Mechanic',
  // ... existing mechanics
];
```

### Styling
The app uses Tailwind CSS. Modify colors and styles in components or update `tailwind.config.js` for global changes.

## Database Schema

```sql
CREATE TABLE game_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL,
  genre text NOT NULL,
  mechanics jsonb NOT NULL DEFAULT '[]'::jsonb,
  characters jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);
```

## Troubleshooting

### Build Errors
```bash
npm run typecheck  # Check for TypeScript errors
npm run lint       # Check for linting issues
```

### Database Connection Issues
- Verify `.env` file has correct Supabase credentials
- Check Supabase dashboard for project status
- Ensure RLS policies are correctly configured

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

Potential features to add:
- User authentication for personalized history
- Export ideas as PDF or JSON
- Share ideas with unique URLs
- Filter and search saved ideas
- Custom generation parameters
- AI-powered image generation for characters
- Multiplayer voting on ideas

## License

This project is open source and available for educational and commercial use.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the project structure
3. Inspect browser console for errors
4. Verify database connection in Supabase dashboard

---

Built with React, TypeScript, Tailwind CSS, and Supabase.