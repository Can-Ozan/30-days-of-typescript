import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, Category } from '@/types';

interface NoteStore {
  notes: Note[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  selectedNote: Note | null;
  isEditing: boolean;
  
  // Actions
  addNote: (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setSelectedNote: (note: Note | null) => void;
  setIsEditing: (editing: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  toggleFavorite: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Genel', color: 'hsl(259, 94%, 67%)', icon: '📝' },
  { id: '2', name: 'İş', color: 'hsl(200, 94%, 67%)', icon: '💼' },
  { id: '3', name: 'Kişisel', color: 'hsl(142, 76%, 56%)', icon: '🌟' },
  { id: '4', name: 'Fikirler', color: 'hsl(48, 96%, 65%)', icon: '💡' },
];

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      categories: defaultCategories,
      selectedCategory: null,
      searchQuery: '',
      selectedNote: null,
      isEditing: false,

      addNote: (noteData) => {
        const note: Note = {
          ...noteData,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        set((state) => ({
          notes: [note, ...state.notes],
          selectedNote: note,
          isEditing: false,
        }));
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updated_at: new Date().toISOString() }
              : note
          ),
          selectedNote: state.selectedNote?.id === id 
            ? { ...state.selectedNote, ...updates, updated_at: new Date().toISOString() }
            : state.selectedNote,
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
        }));
      },

      setSelectedNote: (note) => {
        set({ selectedNote: note, isEditing: false });
      },

      setIsEditing: (editing) => {
        set({ isEditing: editing });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      addCategory: (categoryData) => {
        const category: Category = {
          ...categoryData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          categories: [...state.categories, category],
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, is_favorite: !note.is_favorite, updated_at: new Date().toISOString() }
              : note
          ),
          selectedNote: state.selectedNote?.id === id 
            ? { ...state.selectedNote, is_favorite: !state.selectedNote.is_favorite }
            : state.selectedNote,
        }));
      },
    }),
    {
      name: 'swiftnote-storage',
    }
  )
);