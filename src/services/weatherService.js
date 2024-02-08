// src/services/weatherService.js
const apiKey = "bde3c653f3c418797ad263c01891f327";
export const getWeather = async (latitude, longitude) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching weather data:', error);
  }
};

