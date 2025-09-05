import { Heart, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNoteStore } from '@/store/noteStore';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { categories, selectedCategory, setSelectedCategory, notes } = useNoteStore();

  const favoriteCount = notes.filter(note => note.is_favorite).length;
  const allNotesCount = notes.length;

  return (
    <aside className="w-64 space-y-4 animate-slide-up">
      <div className="glass-card p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Hash className="w-4 h-4 mr-2 text-primary" />
          Kategoriler
        </h3>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "w-full justify-start text-left hover:bg-muted/50 transition-colors",
              selectedCategory === null && "bg-primary/10 text-primary border-primary/20"
            )}
          >
            <span className="mr-2">📝</span>
            Tümü
            <span className="ml-auto text-xs bg-muted/50 px-2 py-1 rounded-full">
              {allNotesCount}
            </span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => setSelectedCategory('favorites')}
            className={cn(
              "w-full justify-start text-left hover:bg-muted/50 transition-colors",
              selectedCategory === 'favorites' && "bg-primary/10 text-primary border-primary/20"
            )}
          >
            <Heart className="w-4 h-4 mr-2 text-red-400" />
            Favoriler
            <span className="ml-auto text-xs bg-muted/50 px-2 py-1 rounded-full">
              {favoriteCount}
            </span>
          </Button>

          {categories.map((category) => {
            const categoryCount = notes.filter(note => note.category === category.name).length;
            return (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "w-full justify-start text-left hover:bg-muted/50 transition-colors",
                  selectedCategory === category.name && "bg-primary/10 text-primary border-primary/20"
                )}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className="ml-auto text-xs bg-muted/50 px-2 py-1 rounded-full">
                  {categoryCount}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}