import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Email, Summary } from '../lib/supabase';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { AddEmailForm } from './AddEmailForm';
import { Plus, LogOut, Mail, Loader2 } from 'lucide-react';

interface EmailWithSummary extends Email {
  summary?: Summary;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [emails, setEmails] = useState<EmailWithSummary[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailWithSummary | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEmails();
    }
  }, [user]);

  const loadEmails = async () => {
    try {
      const { data: emailsData, error: emailsError } = await supabase
        .from('emails')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (emailsError) throw emailsError;

      const { data: summariesData, error: summariesError } = await supabase
        .from('summaries')
        .select('*')
        .eq('user_id', user!.id);

      if (summariesError) throw summariesError;

      const emailsWithSummaries = emailsData.map((email) => {
        const summary = summariesData.find((s) => s.email_id === email.id);
        return { ...email, summary };
      });

      setEmails(emailsWithSummaries);
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = async (emailData: {
    subject: string;
    sender: string;
    recipient: string;
    body: string;
    receivedDate: string;
  }) => {
    try {
      const { data: newEmail, error: insertError } = await supabase
        .from('emails')
        .insert({
          user_id: user!.id,
          subject: emailData.subject,
          sender: emailData.sender,
          recipient: emailData.recipient,
          body: emailData.body,
          received_date: emailData.receivedDate,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailData.subject,
          sender: emailData.sender,
          body: emailData.body,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate summary');

      const summaryData = await response.json();

      const { error: summaryError } = await supabase.from('summaries').insert({
        email_id: newEmail.id,
        user_id: user!.id,
        summary_text: summaryData.summary,
        key_points: summaryData.keyPoints,
        sentiment: summaryData.sentiment,
        priority: summaryData.priority,
      });

      if (summaryError) throw summaryError;

      await loadEmails();
    } catch (error) {
      console.error('Error adding email:', error);
      throw error;
    }
  };

  const handleDeleteEmail = async (emailId: string) => {
    if (!confirm('Are you sure you want to delete this email?')) return;

    try {
      const { error } = await supabase.from('emails').delete().eq('id', emailId);

      if (error) throw error;

      setEmails(emails.filter((e) => e.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Email Summarizer AI</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-96 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              Add Email
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <EmailList
                emails={emails}
                onSelectEmail={setSelectedEmail}
                selectedEmailId={selectedEmail?.id}
              />
            )}
          </div>
        </div>

        <div className="flex-1 bg-white overflow-hidden">
          {selectedEmail ? (
            <EmailDetail email={selectedEmail} onDelete={handleDeleteEmail} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <Mail className="w-24 h-24 mb-4" />
              <p className="text-lg font-medium">Select an email to view details</p>
              <p className="text-sm">or add a new email to get started</p>
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddEmailForm onClose={() => setShowAddForm(false)} onSubmit={handleAddEmail} />
      )}
    </div>
  );
}