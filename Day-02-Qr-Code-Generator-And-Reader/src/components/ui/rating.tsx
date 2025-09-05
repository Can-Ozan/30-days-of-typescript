import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  className
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleStarClick = (rating: number) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= value;
        const isPartial = starValue > value && starValue - 1 < value;
        
        return (
          <button
            key={index}
            className={cn(
              'relative transition-colors duration-200',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
            onClick={() => handleStarClick(starValue)}
            disabled={!interactive}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors duration-200',
                isFilled
                  ? 'fill-accent text-accent'
                  : 'fill-transparent text-muted-foreground hover:text-accent'
              )}
            />
            {isPartial && (
              <Star
                className={cn(
                  sizeClasses[size],
                  'absolute top-0 left-0 fill-accent text-accent'
                )}
                style={{
                  clipPath: `inset(0 ${100 - ((value - Math.floor(value)) * 100)}% 0 0)`
                }}
              />
            )}
          </button>
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {value.toFixed(1)}
      </span>
    </div>
  );
};