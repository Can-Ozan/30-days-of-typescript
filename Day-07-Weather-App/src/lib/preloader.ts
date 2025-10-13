// Preload weather icons for better performance
const commonWeatherIcons = [
  '01d', '01n', // clear sky
  '02d', '02n', // few clouds
  '03d', '03n', // scattered clouds
  '04d', '04n', // broken clouds
  '09d', '09n', // shower rain
  '10d', '10n', // rain
  '11d', '11n', // thunderstorm
  '13d', '13n', // snow
  '50d', '50n', // mist
];

export const preloadWeatherIcons = () => {
  commonWeatherIcons.forEach(iconCode => {
    const img = new Image();
    img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  });
};