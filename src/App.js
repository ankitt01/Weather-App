import axios from "axios";
import { useEffect } from "react";

const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'London,uk',
    lat: '0',
    lon: '0',
    id: '2172797',
    lang: 'null',
    units: 'imperial',
    mode: 'xml'
  },
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': 'bbb25c8f99mshcd089c39737ba8cp11cacajsn846eca9a794c'
  }
};


function App() {


  useEffect(() => {
    axios
    .request(options)
    .then((res) => {
      console.log(JSON.stringify(res.data))
    })
    .catch(err => {console.log(err)})
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
