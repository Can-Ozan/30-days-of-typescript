import { useState, useEffect } from 'react';
import { History, Trash2, Calendar } from 'lucide-react';
import { supabase, type GameIdea } from '../lib/supabase';

interface SavedIdeasProps {
  onLoad: (idea: GameIdea) => void;
  refreshTrigger: number;
}

export function SavedIdeas({ onLoad, refreshTrigger }: SavedIdeasProps) {
  const [savedIdeas, setSavedIdeas] = useState<GameIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadSavedIdeas();
  }, [refreshTrigger]);

  async function loadSavedIdeas() {
    setLoading(true);
    const { data, error } = await supabase
      .from('game_ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error loading ideas:', error);
    } else {
      setSavedIdeas(data || []);
    }
    setLoading(false);
  }

  async function deleteIdea(id: string) {
    const { error } = await supabase
      .from('game_ideas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting idea:', error);
    } else {
      setSavedIdeas(savedIdeas.filter(idea => idea.id !== id));
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="w-full max-w-4xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-medium text-gray-700"
      >
        <History className="w-5 h-5" />
        <span>Saved Ideas ({savedIdeas.length})</span>
      </button>

      {isOpen && (
        <div className="mt-4 bg-white rounded-xl shadow-xl p-6 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading...</p>
          ) : savedIdeas.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No saved ideas yet. Generate and save your first idea!</p>
          ) : (
            <div className="space-y-3">
              {savedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 cursor-pointer" onClick={() => onLoad(idea)}>
                      <h3 className="font-bold text-gray-800 mb-1">{idea.theme}</h3>
                      <p className="text-sm text-gray-600 mb-2">{idea.genre}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(idea.created_at)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}