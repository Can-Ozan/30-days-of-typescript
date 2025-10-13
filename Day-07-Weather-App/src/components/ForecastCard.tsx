import { Card } from '@/components/ui/card';
import { ForecastData } from '@/types/weather';
import { weatherService } from '@/lib/weather';
import { memo, useMemo } from 'react';

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard = memo(({ forecast }: ForecastCardProps) => {
  // Group forecast by day (take one entry per day) - memoized for performance
  const dailyForecast = useMemo(() => {
    return forecast.list.filter((item, index) => 
      index === 0 || new Date(item.dt * 1000).getDate() !== new Date(forecast.list[index - 1].dt * 1000).getDate()
    ).slice(0, 5);
  }, [forecast.list]);

  return (
    <Card className="glass transition-spring hover:scale-[1.01]">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">5 Günlük Tahmin</h2>
        
        <div className="space-y-4">
          {dailyForecast.map((day, index) => (
            <div
              key={day.dt}
              className="flex items-center justify-between p-4 rounded-lg glass transition-smooth hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <img
                  src={weatherService.getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="w-12 h-12"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-foreground">
                    {index === 0 ? 'Bugün' : weatherService.formatDate(day.dt)}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {day.weather[0].description}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {weatherService.formatTemperature(day.main.temp_max)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherService.formatTemperature(day.main.temp_min)}
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>{day.main.humidity}%</div>
                  <div>{day.wind.speed.toFixed(1)} m/s</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
});