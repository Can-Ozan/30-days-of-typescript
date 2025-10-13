import { Mail, User, Calendar, Tag, TrendingUp, Trash2 } from 'lucide-react';
import { Email, Summary } from '../lib/supabase';

interface EmailWithSummary extends Email {
  summary?: Summary;
}

interface EmailDetailProps {
  email: EmailWithSummary;
  onDelete: (emailId: string) => void;
}

export function EmailDetail({ email, onDelete }: EmailDetailProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex-1">{email.subject}</h2>
          <button
            onClick={() => onDelete(email.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete email"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4" />
            <span className="font-medium">From:</span>
            <span>{email.sender}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4" />
            <span className="font-medium">To:</span>
            <span>{email.recipient}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Date:</span>
            <span>{new Date(email.received_date).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {email.summary && (
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-slate-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            AI Summary
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">{email.summary.summary_text}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-600" />
              <span
                className={`text-xs px-3 py-1 rounded-full border font-medium ${getPriorityColor(
                  email.summary.priority
                )}`}
              >
                Priority: {email.summary.priority}
              </span>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${getSentimentColor(
                email.summary.sentiment
              )}`}
            >
              Sentiment: {email.summary.sentiment}
            </span>
          </div>

          {email.summary.key_points && email.summary.key_points.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Points:</h4>
              <ul className="space-y-2">
                {email.summary.key_points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-auto p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Body
        </h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{email.body}</p>
        </div>
      </div>
    </div>
  );
}