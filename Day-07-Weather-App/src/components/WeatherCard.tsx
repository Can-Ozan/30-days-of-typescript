import { Card } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';
import { weatherService } from '@/lib/weather';
import { MapPin, Eye, Droplets, Wind, Gauge } from 'lucide-react';
import { memo, useMemo } from 'react';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = memo(({ weather }: WeatherCardProps) => {
  const { isDay, backgroundClass, iconUrl } = useMemo(() => {
    const dayStatus = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
    return {
      isDay: dayStatus,
      backgroundClass: weatherService.getWeatherBackground(weather.weather[0].main, dayStatus),
      iconUrl: weatherService.getWeatherIcon(weather.weather[0].icon)
    };
  }, [weather.dt, weather.sys.sunrise, weather.sys.sunset, weather.weather]);

  return (
    <Card className={`glass transition-spring hover:scale-[1.02] overflow-hidden ${backgroundClass}`}>
      <div className="p-8 text-white">
        {/* Location */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">
            {weather.name}, {weather.sys.country}
          </span>
        </div>

        {/* Main weather info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src={iconUrl}
              alt={weather.weather[0].description}
              className="w-20 h-20 drop-shadow-lg"
              loading="lazy"
            />
            <div>
              <div className="text-5xl font-light mb-2">
                {weatherService.formatTemperature(weather.main.temp)}
              </div>
              <div className="text-white/80 capitalize">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">Hissedilen</div>
            <div className="text-2xl font-light">
              {weatherService.formatTemperature(weather.main.feels_like)}
            </div>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass rounded-lg p-4 transition-smooth hover:bg-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm text-white/80">Görüş</span>
            </div>
            <div className="text-lg font-medium">
              {(weather.visibility / 1000).toFixed(1)} km
            </div>
          </div>

          <div className="glass rounded-lg p-4 transition-smooth hover:bg-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4" />
              <span className="text-sm text-white/80">Nem</span>
            </div>
            <div className="text-lg font-medium">{weather.main.humidity}%</div>
          </div>

          <div className="glass rounded-lg p-4 transition-smooth hover:bg-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4" />
              <span className="text-sm text-white/80">Rüzgar</span>
            </div>
            <div className="text-lg font-medium">
              {weather.wind.speed.toFixed(1)} m/s
            </div>
          </div>

          <div className="glass rounded-lg p-4 transition-smooth hover:bg-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4" />
              <span className="text-sm text-white/80">Basınç</span>
            </div>
            <div className="text-lg font-medium">{weather.main.pressure} hPa</div>
          </div>
        </div>

        {/* Sun times */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="glass rounded-lg p-4">
            <div className="text-sm text-white/80 mb-1">Gündoğumu</div>
            <div className="font-medium">
              {weatherService.formatTime(weather.sys.sunrise)}
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="text-sm text-white/80 mb-1">Günbatımı</div>
            <div className="font-medium">
              {weatherService.formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});