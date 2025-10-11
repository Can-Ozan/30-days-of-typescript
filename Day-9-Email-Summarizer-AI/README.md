# Email Summarizer AI

An intelligent email summarization application powered by OpenAI GPT-4, built with React, TypeScript, Supabase, and Tailwind CSS. Transform long emails into concise, actionable summaries with AI-powered intelligence.

## Features

### Core Functionality
- **AI-Powered Summarization**: Leverages OpenAI GPT-4 to generate intelligent email summaries
- **Multiple Summary Lengths**: Choose between short (2-3 sentences), medium (1 paragraph), or detailed (multiple paragraphs)
- **Key Points Extraction**: Automatically extracts 3-5 key action items from each email
- **Real-time Processing**: Fast email analysis with loading indicators

### User Experience
- **Intuitive Interface**: Clean, modern design with a two-panel layout
- **Copy to Clipboard**: One-click copy functionality for summaries
- **Download Summaries**: Export summaries as text files
- **Character Counter**: Real-time tracking of email length
- **Compression Statistics**: View how much content was reduced

### History & Analytics
- **Summary History**: Access up to 20 recent email summaries
- **Statistics Dashboard**: Track total summaries, daily activity, and compression rates
- **Search & Filter**: Easily find previous summaries
- **Delete Management**: Remove unwanted summaries

### Design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Built with shadcn/ui components
- **Smooth Animations**: Professional transitions and micro-interactions
- **Accessible**: ARIA-compliant components

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL database + Edge Functions)
- **AI**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **State Management**: Zustand
- **Routing**: React Router

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account
- OpenAI API key

### Environment Variables
Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. The database tables and edge functions are already configured via Supabase migrations

3. Configure OpenAI API Key in Supabase:
   - Go to your Supabase project dashboard
   - Navigate to Edge Functions > Settings
   - Add secret: `OPENAI_API_KEY` with your OpenAI API key

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Database Schema

### email_summaries Table
- `id` (uuid, primary key)
- `email_subject` (text) - Email subject line
- `email_body` (text) - Original email content
- `summary` (text) - AI-generated summary
- `summary_length` (text) - Summary length type (short/medium/detailed)
- `key_points` (jsonb) - Array of extracted key points
- `user_id` (uuid, nullable) - For future authentication
- `created_at` (timestamptz) - Creation timestamp

## Edge Function

### summarize-email
Processes email content and generates summaries using OpenAI GPT-4:
- Accepts email subject, body, and desired summary length
- Returns structured JSON with summary and key points
- Includes error handling and CORS support

## Usage

1. **Enter Email Content**: Paste your email in the text area
2. **Add Subject** (optional): Include the email subject for better context
3. **Select Summary Length**: Choose between short, medium, or detailed
4. **Generate Summary**: Click the "Summarize Email" button
5. **View Results**: See the summary, key points, and compression statistics
6. **Copy or Download**: Use the action buttons to save your summary
7. **Check History**: View all previous summaries in the History tab

## Features Breakdown

### Email Summarizer Component
- Subject and body input fields
- Summary length selector
- Real-time character counting
- Loading states during processing
- Error handling with toast notifications

### Summary Display
- Formatted summary text
- Numbered key points list
- Compression statistics (original, summary, compression rate)
- Copy and download actions

### History Panel
- List of recent summaries
- Date and time stamps
- Summary length badges
- View and delete actions
- Empty state handling

### Statistics Dashboard
- Total summaries count
- Daily summaries count
- Average compression rate
- Total characters saved
- Formatted number display (K, M suffixes)

## Styling

The application uses a modern, professional design with:
- Blue color scheme (primary color)
- Gradient background
- Card-based layout
- Rounded corners and shadows
- Smooth hover effects
- Responsive breakpoints

## Security

- Row Level Security (RLS) enabled on all tables
- Public access for demo purposes (can be restricted per user)
- Edge function authentication configurable
- Environment variables for sensitive data

## Performance

- Optimized bundle size with tree-shaking
- Lazy loading of components
- Efficient database queries with indexes
- Caching for better performance

## Future Enhancements

- User authentication and private summaries
- Email categorization (work, personal, newsletters)
- Bulk email processing
- Email templates for common scenarios
- Integration with email providers (Gmail, Outlook)
- Advanced filtering and search
- Export to multiple formats (PDF, Markdown)
- Email sentiment analysis
- Multi-language support

## License

This project is part of a coding challenge series.

## Credits

Built with modern web technologies and AI-powered by OpenAI.
