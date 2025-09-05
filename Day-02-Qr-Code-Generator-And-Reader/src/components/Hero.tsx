import React from 'react';
import { Play, BookOpen, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-bg.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge className="gradient-primary text-white border-0 px-4 py-2 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-2" />
            Türkiye'nin En Büyük İnceleme Platformu
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent leading-tight">
            CineReads
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Film ve kitapları keşfedin, derecelendirin ve incelemelerinizi paylaşın. 
            <br />
            <span className="text-accent font-medium">Toplulukla birlikte</span> en iyi içerikleri bulun.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">10K+</div>
              <div className="text-sm text-muted-foreground">Film & Kitap</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">İnceleme</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">25K+</div>
              <div className="text-sm text-muted-foreground">Kullanıcı</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gradient-primary text-white border-0 px-8 py-6 text-lg group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Keşfetmeye Başla
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-accent text-accent hover:bg-accent hover:text-white">
              <BookOpen className="w-5 h-5 mr-2" />
              İnceleme Yaz
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-accent" />
              <span>5 Yıldız Derecelendirme</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Detaylı İncelemeler</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>Kişisel Listeler</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};