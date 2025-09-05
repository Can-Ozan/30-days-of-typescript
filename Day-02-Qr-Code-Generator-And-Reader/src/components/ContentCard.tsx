import React from 'react';
import { Star, Play, BookOpen } from 'lucide-react';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export interface ContentItem {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string[];
  type: 'movie' | 'book';
  description?: string;
}

interface ContentCardProps {
  item: ContentItem;
  onClick?: (item: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  return (
    <Card 
      className="group card-hover cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur-sm"
      onClick={() => onClick?.(item)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={item.poster}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            {item.type === 'movie' ? <Play className="w-3 h-3 mr-1" /> : <BookOpen className="w-3 h-3 mr-1" />}
            {item.type === 'movie' ? 'Film' : 'Kitap'}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Rating value={item.rating} size="sm" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{item.year}</p>
        <div className="flex flex-wrap gap-1">
          {item.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};