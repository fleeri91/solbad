export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  isSunny: boolean;
  windSpeed: number;
  humidity: number;
}

// Weather condition codes from OpenWeather:
// 800 = clear sky, 801 = few clouds — both considered sunny
function checkIsSunny(weatherId: number): boolean {
  return weatherId === 800 || weatherId === 801;
}

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error("OPENWEATHER_API_KEY is not set");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 600 } }); // cache 10 min

  if (!res.ok) {
    throw new Error(`OpenWeather API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const weather = data.weather[0];

  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: weather.main,
    description: weather.description,
    icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
    isSunny: checkIsSunny(weather.id),
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
  };
}
