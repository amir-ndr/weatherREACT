import React, { useState } from 'react';

const API = {
  key: "6c91a85104e9a58249e9e7537809c4a8",
  base: "https://api.openweathermap.org/data/2.5/",
}
function App() {

  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = async ()=>{
    const response = await fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`);
    const data =await response.json();
    setWeather(data);
    setQuery('');
  }

  const searchEnter =event=>{
    if(event.key === "Enter"){
      search();
    }
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search region"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchEnter}
          />
          <button onClick={search} type="submit" className="search-btn">
            Search
          </button>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;
