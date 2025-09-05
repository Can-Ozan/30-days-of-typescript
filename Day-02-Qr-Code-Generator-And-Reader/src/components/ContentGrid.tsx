import React, { useState, useMemo } from 'react';
import { ContentCard, ContentItem } from '@/components/ContentCard';
import { SearchFilter } from '@/components/SearchFilter';
import { mockContent, genres } from '@/data/mockData';

export const ContentGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'book'>('all');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredContent = useMemo(() => {
    return mockContent.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesGenre = !selectedGenre || item.genre.includes(selectedGenre);
      
      return matchesSearch && matchesType && matchesGenre;
    });
  }, [searchTerm, selectedType, selectedGenre]);

  const handleCardClick = (item: ContentItem) => {
    console.log('Clicked item:', item);
    // Here you would navigate to a detail page
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Tüm İçerikler</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Binlerce film ve kitap arasından favorilerinizi keşfedin. Derecelendirilmiş ve incelenmiş içeriklerle doğru seçim yapın.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            genres={genres}
          />

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredContent.length} sonuç bulundu
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredContent.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ContentCard item={item} onClick={handleCardClick} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-semibold">Sonuç bulunamadı</h3>
              <p className="text-muted-foreground">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};