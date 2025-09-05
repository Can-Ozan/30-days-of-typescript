import { ContentItem } from '@/components/ContentCard';
import movie1 from '@/assets/movie-1.jpg';
import movie2 from '@/assets/movie-2.jpg';
import book1 from '@/assets/book-1.jpg';

export const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Galactic Shadows',
    poster: movie1,
    rating: 8.4,
    year: 2024,
    genre: ['Sci-Fi', 'Thriller'],
    type: 'movie',
    description: 'Uzak gelecekte geçen bu bilim kurgu thriller, insanlığın yaşamı için verdiği mücadeleyi konu alıyor.'
  },
  {
    id: '2',
    title: 'Mystic Realms',
    poster: book1,
    rating: 9.1,
    year: 2023,
    genre: ['Fantasy', 'Adventure'],
    type: 'book',
    description: 'Büyülü dünyalarda geçen bu fantastik roman, genç bir sihirbazın maceralarını anlatıyor.'
  },
  {
    id: '3',
    title: 'Urban Legends',
    poster: movie2,
    rating: 7.8,
    year: 2024,
    genre: ['Action', 'Adventure'],
    type: 'movie',
    description: 'Şehrin karanlık sokaklarında geçen bu aksiyon dolu film, modern kahramanlık hikayesi.'
  },
  {
    id: '4',
    title: 'Quantum Dreams',
    poster: movie1,
    rating: 8.9,
    year: 2023,
    genre: ['Sci-Fi', 'Drama'],
    type: 'movie',
    description: 'Kuantum fiziği ve insan bilinci arasındaki ilişkiyi keşfeden dram.'
  },
  {
    id: '5',
    title: 'The Last Kingdom',
    poster: book1,
    rating: 8.7,
    year: 2024,
    genre: ['Fantasy', 'Historical'],
    type: 'book',
    description: 'Ortaçağ atmosferinde geçen fantastik roman serisinin ilk kitabı.'
  },
  {
    id: '6',
    title: 'Cyber Revolution',
    poster: movie2,
    rating: 7.5,
    year: 2024,
    genre: ['Sci-Fi', 'Action'],
    type: 'movie',
    description: 'Yakın gelecekte teknoloji ve insanlık arasındaki savaşı konu alan aksiyon filmi.'
  }
];

export const featuredContent = mockContent.slice(0, 3);

export const genres = [
  'Action', 'Adventure', 'Sci-Fi', 'Fantasy', 'Drama', 
  'Thriller', 'Historical', 'Romance', 'Comedy', 'Horror'
];