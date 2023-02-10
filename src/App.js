import './App.css';
import { useEffect, useState } from 'react';
import { fetchWeather } from './api';
import WeatherCard from './Components/WeatherCard';

function App() {

  const [city, setCity] = useState('Lahore');
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    // event.();
    console.log('called')
    try {
      const weather = await fetchWeather(city, setError);
      setWeather(weather);
    } catch (error) {
      setError("City not found");
    }
  };
  useEffect(()=>{
    handleSubmit()
  },[])
  
  return (
    <div className="App">
      <h1 className='app_heading'>Weather App Using City Name</h1>
      <div className='input-heading'>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;
