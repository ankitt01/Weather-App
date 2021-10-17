import axios from "axios";
import { useEffect, useState, useRef } from "react";
import moment from 'moment';
import './App.css'


function App() {

  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState('');


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

  useEffect(() => {
    determineBackgroundImage();
  },[weatherInfo])

  const determineBackgroundImage = () => {
    if(weatherInfo?.main.temp <10) {
      setImage('https://images.unsplash.com/photo-1519944159858-806d435dc86b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29sZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
    }
    if(weatherInfo?.main.temp >= 10) {
      setImage('https://images.unsplash.com/photo-1594156596782-656c93e4d504?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')
    }
    console.log(image)
  }

  return (
    <div className="App" style={{backgroundImage: `url(${image})`}}>
      <div className="app__container">
        <h1>React Weather App</h1>
        <form>
          <input ref={inputRef} type="text" placeholder="Type the city" /> <br />
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
