import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/current-weather';
import { WEATHER_API_KEY,WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather,setCurrentWeather]=useState(null);
  const [forecast,setforecast]=useState(null);
  const handleOnSearchChange=(searchData)=>{
    const [lat,lon]=searchData.value.split(" ");

    const currentWeatherFetch=fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch=fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forecastFetch])
      .then(async (response)=>{
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city:searchData.label, ...weatherResponse});
        setforecast({ city:searchData.label, forecastResponse});
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      console.log(currentWeather);
      console.log(forecast);

  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather &&<CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data ={forecast}/>}
    </div>
  );
}

export default App;
