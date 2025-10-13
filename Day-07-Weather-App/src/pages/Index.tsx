import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/types/weather';
import { weatherService } from '@/lib/weather';
import { preloadWeatherIcons } from '@/lib/preloader';
import { WeatherCard } from '@/components/WeatherCard';
import { ForecastCard } from '@/components/ForecastCard';
import { SearchBar } from '@/components/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CloudSun } from 'lucide-react';

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadWeatherData = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const [currentWeather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon),
        weatherService.getForecast(lat, lon),
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
      
      // Update background based on weather
      const backgroundClass = weatherService.getWeatherBackground(
        currentWeather.weather[0].main,
        currentWeather.dt > currentWeather.sys.sunrise && currentWeather.dt < currentWeather.sys.sunset
      );
      document.body.className = `${backgroundClass}`;
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Hava durumu verileri yüklenemedi',
        variant: 'destructive',
      });
      console.error('Weather loading error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Preload weather icons for better performance
    preloadWeatherIcons();
    
    const initializeWeather = async () => {
      try {
        const position = await weatherService.getCurrentPosition();
        await loadWeatherData(position.lat, position.lon);
      } catch (error) {
        // Fallback to Istanbul if location access denied
        await loadWeatherData(41.0082, 28.9784);
      }
    };

    initializeWeather();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Hava Durumu Yükleniyor</h2>
          <p className="text-muted-foreground">Lütfen bekleyin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Hava Durumu
            </h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Güncel hava durumu ve 5 günlük tahmin
          </p>
          <SearchBar onLocationSelect={loadWeatherData} />
        </header>

        {/* Weather Content */}
        {weather && forecast && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            <div>
              <ForecastCard forecast={forecast} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
