// Bnei Brak:
export const latitude = 32.109333;
export const longitude = 34.855499;
export const APIkey = 'a054fb4cb3f3b71d4a96d2ff376d1d77';

export const defaultWeatherOptions = {
  day: {
    url: new URL('../images/day/default.png', import.meta.url).href,
  },
  night: {
    url: new URL('../images/night/default.png', import.meta.url).href,
  },
};

export const weatherOptions = [
  {
    day: true,
    condition: 'clear',
    url: new URL('../images/day/clear.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../images/day/cloudy.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rain',
    url: new URL('../images/day/rain.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'thunderstorm',
    url: new URL('../images/day/thunderstorm.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../images/day/snow.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'atmosphere',
    url: new URL('../images/day/atmosphere.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clear',
    url: new URL('../images/night/clear.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../images/night/clouds.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rain',
    url: new URL('../images/night/rain.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'thunderstorm',
    url: new URL('../images/night/thunderstorm.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../images/night/snow.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'atmosphere',
    url: new URL('../images/night/atmosphere.png', import.meta.url).href,
  },
];

const DEFAULT_CLOTHES = [
  { file: 'Cap', weather: 'hot' },
  { file: 'Hoodie', weather: 'warm' },
  { file: 'Jacket', weather: 'cold' },
  { file: 'Sneakers', weather: 'warm' },
  { file: 'T-Shirt', weather: 'hot' },
  { file: 'Coat', weather: 'cold' },
];

export const defaultClothingItems = DEFAULT_CLOTHES.map(
  ({ file, weather }) => ({
    _id: `default-${file.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: file,
    weather,
    isDefault: true,
    seedId: file,
    imageUrl: `/defaultClothes/${file}.png`,
  }),
);
