import { Mail, Calendar, User, ChevronRight } from 'lucide-react';
import { Email, Summary } from '../lib/supabase';

interface EmailWithSummary extends Email {
  summary?: Summary;
}

interface EmailListProps {
  emails: EmailWithSummary[];
  onSelectEmail: (email: EmailWithSummary) => void;
  selectedEmailId?: string;
}

export function EmailList({ emails, onSelectEmail, selectedEmailId }: EmailListProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentEmoji = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <Mail className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No emails yet</p>
        <p className="text-sm">Add your first email to get started</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => onSelectEmail(email)}
          className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
            selectedEmailId === email.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {email.subject}
                </h3>
                {email.summary && (
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getPriorityColor(
                        email.summary.priority
                      )}`}
                    >
                      {email.summary.priority}
                    </span>
                    <span className="text-lg">{getSentimentEmoji(email.summary.sentiment)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <User className="w-4 h-4" />
                <span className="truncate">{email.sender}</span>
              </div>
              {email.summary && (
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                  {email.summary.summary_text}
                </p>
              )}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{new Date(email.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </button>
      ))}
    </div>
  );
}