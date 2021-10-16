import axios from "axios";
import { useEffect, useState, useRef } from "react";
import moment from 'moment';
import './App.css'


function App() {

  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);


  useEffect(() => {
    fetchWeatherInfo();
  },[])

  const fetchWeatherInfo = (e) => {
    e?.preventDefault()

    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: inputRef.current.value || 'London,uk', //'London,uk',
        lat: '0',
        lon: '0',
        id: '2172797',
        lang: 'null',
        units: 'imperial'
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'bbb25c8f99mshcd089c39737ba8cp11cacajsn846eca9a794c'
      }
    };

    axios
    .request(options)
    .then((res) => {
      console.log(res.data)
      setWeatherInfo(res.data)
    })
    .catch(err => {console.log(err)})
  }

  return (
    <div className="App">
      <div className="app__container">
        <h1>Weather App</h1>
        <form>
          <input ref={inputRef} type="text" placeholder="Type the city" />
          <button onClick={fetchWeatherInfo} type="submit">Show me the weather</button>
        </form>
        <h1>{weatherInfo?.name}</h1>
        <h2>{weatherInfo?.main.temp} Degree Celsius</h2>
        <h1>{weatherInfo && moment.unix(weatherInfo?.sys?.sunrise).format("DD/MM/YYYY")}</h1>
      </div>
    </div>
  );
}

export default App;
