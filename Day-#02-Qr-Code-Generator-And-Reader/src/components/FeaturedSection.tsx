import React from 'react';
import { Star, TrendingUp, Clock } from 'lucide-react';
import { ContentCard } from '@/components/ContentCard';
import { Badge } from '@/components/ui/badge';
import { featuredContent } from '@/data/mockData';

export const FeaturedSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-accent">
      <div className="container mx-auto">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <Badge className="gradient-primary text-white border-0 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Öne Çıkanlar
            </Badge>
            <h2 className="text-4xl font-bold">Bu Hafta Trend Olanlar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Topluluk tarafından en çok beğenilen ve incelenen içerikler
            </p>
          </div>

          {/* Featured Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((item, index) => (
              <div
                key={item.id}
                className="relative group animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Featured Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-accent text-white shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    #{index + 1}
                  </Badge>
                </div>
                
                <ContentCard item={item} />
                
                {/* Additional Info */}
                <div className="mt-4 p-4 bg-card/30 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Son 24 saat
                    </span>
                    <span className="text-accent font-medium">
                      +{Math.floor(Math.random() * 500 + 100)} inceleme
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">
              Daha fazla trend içerik görmek ister misiniz?
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-white transition-colors">
                #TrendFilmler
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-white transition-colors">
                #YeniÇıkanlar
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-white transition-colors">
                #Enİyiler
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};