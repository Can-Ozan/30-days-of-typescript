export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type NoteFormData = Omit<Note, 'id' | 'created_at' | 'updated_at'>;