import { useState } from 'react';
import { Sparkles, Save, RefreshCw } from 'lucide-react';
import { GameIdeaCard } from './components/GameIdeaCard';
import { SavedIdeas } from './components/SaveIdeas';
import { generateGameIdea } from './lib/gameGenerator';
import { supabase, type GameIdea } from './lib/supabase';

function App() {
  const [currentIdea, setCurrentIdea] = useState<GameIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  async function handleGenerate() {
    setIsGenerating(true);
    setSaveMessage('');

    setTimeout(() => {
      const idea = generateGameIdea();
      setCurrentIdea(idea);
      setIsGenerating(false);
    }, 800);
  }

  async function handleSave() {
    if (!currentIdea) return;

    setIsSaving(true);
    setSaveMessage('');

    const { error } = await supabase
      .from('game_ideas')
      .insert([currentIdea]);

    if (error) {
      console.error('Error saving idea:', error);
      setSaveMessage('Error saving idea');
    } else {
      setSaveMessage('Idea saved successfully!');
      setRefreshTrigger(prev => prev + 1);
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  }

  function handleLoadIdea(idea: GameIdea) {
    setCurrentIdea(idea);
    setSaveMessage('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Game Idea Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Generate unique game concepts with themes, mechanics, and characters. Let AI spark your next gaming masterpiece!
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Generate New Idea</span>
                </>
              )}
            </button>

            {currentIdea && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold text-lg border-2 border-gray-200"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Save Idea</span>
                  </>
                )}
              </button>
            )}
          </div>

          {saveMessage && (
            <div className={`px-6 py-3 rounded-lg font-medium ${
              saveMessage.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {saveMessage}
            </div>
          )}
        </div>

        {currentIdea && (
          <div className="flex justify-center mb-8">
            <GameIdeaCard
              theme={currentIdea.theme}
              genre={currentIdea.genre}
              mechanics={currentIdea.mechanics}
              characters={currentIdea.characters}
              description={currentIdea.description}
            />
          </div>
        )}

        {!currentIdea && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-16 max-w-2xl w-full text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Create?</h2>
              <p className="text-gray-600">
                Click the button above to generate your first unique game idea!
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <SavedIdeas onLoad={handleLoadIdea} refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App;