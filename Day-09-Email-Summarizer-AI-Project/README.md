# Email Summarizer AI

A modern, intelligent email management application that uses AI to automatically summarize emails, extract key points, analyze sentiment, and determine priority levels.

## Features

- **User Authentication**: Secure email/password authentication with Supabase
- **Email Management**: Add, view, and delete emails with a clean, intuitive interface
- **AI-Powered Summarization**: Automatically generates concise summaries of email content
- **Key Points Extraction**: Identifies and highlights the most important information
- **Sentiment Analysis**: Determines if an email is positive, neutral, or negative
- **Priority Detection**: Automatically categorizes emails as low, medium, high, or urgent
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Real-time Updates**: Instant synchronization of email data across sessions

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Serverless Functions**: Supabase Edge Functions
- **Deployment**: Optimized for production builds

## Project Structure

```
src/
├── components/
│   ├── AuthForm.tsx          # Login and signup form
│   ├── Dashboard.tsx         # Main application dashboard
│   ├── EmailList.tsx         # Email list with summaries
│   ├── EmailDetail.tsx       # Detailed email view
│   └── AddEmailForm.tsx      # Form to add new emails
├── contexts/
│   └── AuthContext.tsx       # Authentication context provider
├── lib/
│   └── supabase.ts          # Supabase client and types
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## Database Schema

### Tables

1. **profiles**
   - User profile information
   - Linked to Supabase auth users
   - Stores email and full name

2. **emails**
   - Email message storage
   - Contains subject, sender, recipient, body
   - Timestamps for received and created dates

3. **summaries**
   - AI-generated summaries
   - Key points as JSON array
   - Sentiment and priority analysis
   - Linked to emails and users

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure policies for SELECT, INSERT, UPDATE, and DELETE operations

## Edge Functions

### summarize-email

A Supabase Edge Function that processes emails and generates:
- Intelligent summaries based on email content
- Extraction of key points and important information
- Sentiment analysis (positive, neutral, negative)
- Priority detection (low, medium, high, urgent)

## Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account (database already configured)

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Environment variables are already configured in `.env`:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## NPM Packages Required

All necessary packages are already installed. Here's the complete list:

### Dependencies
- `react@^18.3.1` - React library
- `react-dom@^18.3.1` - React DOM rendering
- `@supabase/supabase-js@^2.57.4` - Supabase client
- `lucide-react@^0.344.0` - Icon library

### Dev Dependencies
- `typescript@^5.5.3` - TypeScript support
- `vite@^5.4.2` - Build tool and dev server
- `@vitejs/plugin-react@^4.3.1` - React plugin for Vite
- `tailwindcss@^3.4.1` - Utility-first CSS framework
- `autoprefixer@^10.4.18` - PostCSS plugin
- `postcss@^8.4.35` - CSS transformation tool
- `eslint@^9.9.1` - Linting tool
- `@types/react@^18.3.5` - React type definitions
- `@types/react-dom@^18.3.0` - React DOM type definitions

## Available Scripts

- `npm run dev` - Start development server (automatically runs)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

1. **Sign Up / Sign In**: Create an account or log in with existing credentials
2. **Add Email**: Click "Add Email" button to add a new email with subject, sender, recipient, and body
3. **View Summary**: Each added email is automatically processed by AI to generate a summary
4. **View Details**: Click on any email in the list to see the full details and AI analysis
5. **Delete Email**: Use the delete button in the detail view to remove emails
6. **Sign Out**: Click the sign out button to log out

## AI Analysis Features

### Sentiment Analysis
- **Positive**: Email contains positive language and tone
- **Neutral**: Email is informational or matter-of-fact
- **Negative**: Email contains concerns, problems, or negative tone

### Priority Levels
- **Urgent**: Contains urgent, ASAP, immediately, or critical keywords
- **High**: Contains important, priority, or deadline keywords
- **Medium**: Contains follow-up, reminder, or update keywords
- **Low**: General information or routine communication

### Key Points Extraction
- Automatically identifies the most important sentences
- Highlights action items and critical information
- Displays up to 5 key points per email

## Design Features

- Modern, clean interface with gradient accents
- Responsive layout for all screen sizes
- Smooth transitions and hover effects
- Color-coded priority and sentiment indicators
- Loading states and error handling
- Accessible UI components

## Security Best Practices

- Passwords hashed and managed by Supabase Auth
- Row Level Security enforces data isolation
- JWT-based authentication for Edge Functions
- No sensitive data exposed in client code
- CORS properly configured for Edge Functions

## License

MIT License - Feel free to use this project for learning or production purposes.

## Support

For issues or questions, please check the Supabase documentation or create an issue in the repository.