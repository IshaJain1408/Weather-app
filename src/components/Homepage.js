import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import UserTable from './UserTable';
import { FaTemperatureHigh, FaTint, FaWind, FaClock } from 'react-icons/fa'; 
import { getWeather} from '../services/weatherService'; 
import './HomePage.css'; 


const Homepage = () => {
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;     
                getWeather(latitude, longitude)
          .then((data) => setWeather(data))
          .catch((error) => console.error('Error getting weather:', error));
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    
    <div className="WeatherInfo">
        <Typography variant="h5">Weather Information</Typography>
        {weather && (
          <div className="WeatherCards">
            <div className="Row">
              <Card className="WeatherCard">
                <CardMedia height="140" alt="Temperature" />
                <CardContent>
                  <Typography variant="h6">
                    <FaTemperatureHigh /> Temperature
                  </Typography>
                  <Typography>{weather.main?.temp}°C</Typography>
                </CardContent>
              </Card>

              <Card className="WeatherCard">
                <CardMedia height="140" alt="Humidity" />
                <CardContent>
                  <Typography variant="h6">
                    <FaTint /> Humidity
                  </Typography>
                  <Typography>{weather.main?.humidity}%</Typography>
                </CardContent>
              </Card>
            </div>
            
            <div className="Row">
              <Card className="WeatherCard">
                <CardMedia height="140" alt="Wind Speed" />
                <CardContent>
                  <Typography variant="h6">
                    <FaWind /> Wind Speed
                  </Typography>
                  <Typography>{weather.wind?.speed} m/s</Typography>
                </CardContent>
              </Card>

              <Card className="WeatherCard">
                <CardContent>
                  <Typography variant="h6">
                  <FaClock  /> Clock</Typography>
                  <Typography>{currentTime.toLocaleTimeString()}</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <div className="WeatherInfo">
        <UserTable />
      </div>
    </>
  );
};

export default Homepage;
