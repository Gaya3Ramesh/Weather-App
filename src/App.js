import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "273c315087a3883e188a2c2e015e0dcc"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  const fetchWeatherData = () => {
    setError("");
    if (cityName.trim() !== "") {
      fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);
          } else {
            setError("City not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setError("An error occurred");
        });
    }
  };

  return (
    <div className="App">
      <div>
        <section>
        <div className="allwraper">
          <header>
            Weather App
          </header>
          <section className="input-part">
            
            <div className="content">
              <input
                type="text"
                spellCheck="false"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                required
              />
              <button onClick={fetchWeatherData}>Search</button>
            </div>
          </section>
          </div>
          {weatherData.main && (
            <div className="wrapper">
              <div className="weather-part">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <div className="temp">
                  <span className="numb">{weatherData.main.temp}</span>
                  <span className="deg">°</span>C
                </div>
                <div className="weather">
                  {weatherData.weather[0].description}
                </div>
                <div className="location">
                  <span>
                    {weatherData.name}, {weatherData.sys.country}
                  </span>
                </div>
                <div className="bottom-details">
                  <div className="column feels">
                    <div className="details">
                      <div className="temp">
                        <span className="numb-2">
                          {weatherData.main.feels_like}
                        </span>
                        <span className="deg">°</span>C
                      </div>
                      <p>Feels like</p>
                    </div>
                  </div>
                  <div className="column humidity">
                    <div className="details">
                      <span>{weatherData.main.humidity}%</span>
                      <p>Humidity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </section>
      </div>
    </div>


  );
}

export default App;
