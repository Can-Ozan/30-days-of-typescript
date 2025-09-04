import { Search, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNoteStore } from '@/store/noteStore';

export function Header() {
  const { searchQuery, setSearchQuery, setSelectedNote, setIsEditing } = useNoteStore();

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  return (
    <header className="glass-card border-none p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Star className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">SwiftNote Studio</h1>
            <p className="text-sm text-foreground-secondary">Modern not defteriniz</p>
          </div>
        </div>
        
        <Button
          onClick={handleNewNote}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Not
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Notlarınızda arayın..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
        />
      </div>
    </header>
  );
}