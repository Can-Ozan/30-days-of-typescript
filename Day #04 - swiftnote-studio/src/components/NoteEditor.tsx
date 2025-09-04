import { useState, useEffect } from 'react';
import { Save, X, Heart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNoteStore } from '@/store/noteStore';
import { cn } from '@/lib/utils';

export function NoteEditor() {
  const { 
    selectedNote, 
    isEditing, 
    categories,
    addNote, 
    updateNote, 
    setIsEditing, 
    setSelectedNote,
    toggleFavorite 
  } = useNoteStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Genel');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (selectedNote && !isEditing) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setCategory(selectedNote.category);
      setTags(selectedNote.tags);
      setTagInput('');
    } else if (isEditing && !selectedNote) {
      // New note
      setTitle('');
      setContent('');
      setCategory('Genel');
      setTags([]);
      setTagInput('');
    }
  }, [selectedNote, isEditing]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    const noteData = {
      title: title.trim() || 'Başlıksız Not',
      content: content.trim(),
      category,
      tags,
      is_favorite: selectedNote?.is_favorite || false,
    };

    if (selectedNote && isEditing) {
      updateNote(selectedNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (!selectedNote) {
      setSelectedNote(null);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!isEditing && !selectedNote) {
    return (
      <div className="glass-card p-8 text-center animate-fade-in h-full flex items-center justify-center">
        <div>
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2">Not seçin veya yeni oluşturun</h3>
          <p className="text-muted-foreground">
            Soldaki listeden bir not seçin ya da yeni not oluşturarak başlayın.
          </p>
        </div>
      </div>
    );
  }

  if (!isEditing && selectedNote) {
    return (
      <div className="glass-card p-6 animate-scale-in h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {selectedNote.title || 'Başlıksız Not'}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="secondary">{selectedNote.category}</Badge>
              <span>
                {new Date(selectedNote.created_at).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(selectedNote.id)}
              className="hover:bg-red-500/10"
            >
              <Heart 
                className={cn(
                  "w-4 h-4",
                  selectedNote.is_favorite ? "fill-red-400 text-red-400" : "text-muted-foreground"
                )} 
              />
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              Düzenle
            </Button>
          </div>
        </div>

        {selectedNote.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {selectedNote.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {selectedNote.content || 'Bu not henüz içerik içermiyor...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-scale-in h-full" onKeyDown={handleKeyPress}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {selectedNote ? 'Notu Düzenle' : 'Yeni Not'}
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={handleCancel}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-primary-foreground"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Not başlığı..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold bg-muted/30 border-border/50"
        />

        <div className="flex space-x-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48 bg-muted/30 border-border/50">
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  <span className="flex items-center">
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1 flex space-x-2">
            <Input
              placeholder="Etiket ekle..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="bg-muted/30 border-border/50"
            />
            <Button onClick={handleAddTag} variant="outline" size="sm">
              Ekle
            </Button>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}

        <Textarea
          placeholder="Notunuzu yazın..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[400px] resize-none bg-muted/30 border-border/50 leading-relaxed"
        />
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd> + 
        <kbd className="px-2 py-1 bg-muted rounded text-xs ml-1">Enter</kbd> ile kaydet
      </div>
    </div>
  );
}