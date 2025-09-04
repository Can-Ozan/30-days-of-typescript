import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedType: 'all' | 'movie' | 'book';
  onTypeChange: (type: 'all' | 'movie' | 'book') => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedGenre,
  onGenreChange,
  genres
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Film veya kitap ara..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2 items-center">
        <div className="flex gap-1">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange('all')}
            className="px-3"
          >
            Tümü
          </Button>
          <Button
            variant={selectedType === 'movie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange('movie')}
            className="px-3"
          >
            Filmler
          </Button>
          <Button
            variant={selectedType === 'book' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange('book')}
            className="px-3"
          >
            Kitaplar
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {selectedGenre || 'Tür'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onGenreChange('')}>
              Tümü
            </DropdownMenuItem>
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre}
                onClick={() => onGenreChange(genre)}
              >
                {genre}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};