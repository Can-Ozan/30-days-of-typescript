import { useState } from 'react';
import { Heart, Calendar, Tag, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNoteStore } from '@/store/noteStore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export function NoteList() {
  const { 
    notes, 
    selectedCategory, 
    searchQuery, 
    selectedNote,
    setSelectedNote,
    deleteNote,
    toggleFavorite,
    setIsEditing
  } = useNoteStore();

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === null ||
      (selectedCategory === 'favorites' && note.is_favorite) ||
      note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleEdit = (note: typeof selectedNote) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  if (filteredNotes.length === 0) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">Not bulunamadı</h3>
        <p className="text-muted-foreground">
          {searchQuery 
            ? "Arama kriterlerinize uygun not bulunamadı." 
            : "Bu kategoride henüz not bulunmuyor."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {filteredNotes.map((note, index) => (
        <div
          key={note.id}
          onClick={() => setSelectedNote(note)}
          className={cn(
            "glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-slide-up",
            selectedNote?.id === note.id && "ring-2 ring-primary/50 bg-primary/5",
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground line-clamp-1 flex-1 pr-2">
              {note.title || 'Başlıksız Not'}
            </h3>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(note.id);
                }}
                className="h-8 w-8 p-0 hover:bg-red-500/10"
              >
                <Heart 
                  className={cn(
                    "w-4 h-4 transition-colors",
                    note.is_favorite ? "fill-red-400 text-red-400" : "text-muted-foreground"
                  )} 
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(note);
                }}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Edit className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="h-8 w-8 p-0 hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>

          <p className="text-foreground-secondary text-sm mb-3 line-clamp-2">
            {note.content || 'İçerik yok...'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(note.created_at), 'dd MMM', { locale: tr })}
              </div>
              <Badge variant="secondary" className="text-xs">
                {note.category}
              </Badge>
            </div>

            {note.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Tag className="w-3 h-3 text-muted-foreground" />
                <div className="flex space-x-1">
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{note.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}