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

export const defaultClothingItems = [
  {
    _id: 'default-cap',
    name: 'Cap',
    weather: 'hot',
    imageUrl: new URL('../images/defaultClothes/Cap.png', import.meta.url).href,
  },
  {
    _id: 'default-hoodie',
    name: 'Hoodie',
    weather: 'warm',
    imageUrl: new URL('../images/defaultClothes/Hoodie.png', import.meta.url).href,
  },
  {
    _id: 'default-jacket',
    name: 'Jacket',
    weather: 'cold',
    imageUrl: new URL('../images/defaultClothes/Jacket.png', import.meta.url).href,
  },
  {
    _id: 'default-sneakers',
    name: 'Sneakers',
    weather: 'warm',
    imageUrl: new URL('../images/defaultClothes/Sneakers.png', import.meta.url).href,
  },
  {
    _id: 'default-tshirt',
    name: 'T-Shirt',
    weather: 'hot',
    imageUrl: new URL('../images/defaultClothes/T-Shirt.png', import.meta.url).href,
  },
  {
    _id: 'default-coat',
    name: 'Coat',
    weather: 'cold',
    imageUrl: new URL('../images/defaultClothes/Coat.png', import.meta.url).href,
  },
];
