import React, { useState, useEffect } from "react";
import "./Weather1.css";
import axios from "axios";
import humidity_icons from "./Assets/humidity.png";
import wind_icons from "./Assets/wind.png";
import latitude_icons from "./Assets/lati.png";
import longitude_icons from "./Assets/longi.png";
import sea_level_icons from "./Assets/sealevel.png";
import ground_level_icons from "./Assets/Ground.png";
import { Link } from "react-router-dom";

const api_key = "e8cecc0f65e0d047902dc6f18e430241";
const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: { units: "metric", appid: api_key },
});

const Weather1 = () => {
  const [iconCode, setIconCode] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchLocation = async (location) => {
    try {
      const response = await weatherApi.get("/weather", {
        params: { q: location },
      });

      setData(response.data);
      setIconCode(response.data.weather[0].icon);
    } catch (error) {
      console.error(error);
      alert("Enter a valid location");
    }
  };

  const fetchCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await weatherApi.get("/weather", {
            params: { lat: latitude, lon: longitude },
          });

          setData(response.data);
          setIconCode(response.data.weather[0].icon);
        } catch (error) {
          console.error(error);
          alert("Failed to retrieve your current location.");
        }
      });
    } else {
      console.error("Geolocation is not available.");
      alert("Geolocation is not available in your browser.");
    }
  };

  useEffect(() => {
    fetchCurrentLocationWeather();
 
  }, [location]);

  const fetchCityList = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const data = await response.json();
      const allCities = data.data.map((country) => country.cities).flat();
      setCityList(allCities);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };
  useEffect(() => {
    fetchCityList();
  }, []);

  const handleSelectCity = (city) => {
    setShowDropdown(false);
    searchLocation(city);
    setLocation(city);
  };

  const filteredCities = cityList.filter((city) =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="back">
      <div className="bk">
      <Link className="lin" to="/">
        back
      </Link>
      </div>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            maxLength={85}
            className="cityInput"
            placeholder="Enter the Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowDropdown(true);
            }}
            onKeyUp={(e) => {
               if (e.key === 'Enter') {
                 searchLocation(location);
               }
             }}
          />
          <div>
            {showDropdown && location&&(
              <div className="drop">
                {filteredCities.slice(0, 5).map((city, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      handleSelectCity(city);
                      searchLocation(city);
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {data && (
          <div className="weather-data">
            <div className="ima">
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="weather-temp">{Math.floor(data.main.temp)}°C</div>
            <div className="weather-location">
              {data.name}, {data.sys.country}
            </div>
            <br></br>
            <br></br>
            <div className="data-container">
              <div className="element">
                <img src={humidity_icons} alt="" className="icon" />
                <div className="humidity-percent">{data.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
              <div className="element">
                <img src={wind_icons} alt="" className="icon" />
                <div className="wind-rate">
                  {Math.floor(data.wind.speed)} km/hr
                </div>
                <div className="text">Wind speed</div>
              </div>
            </div>
            <div className="data-container">
              <div className="element">
                <img src={sea_level_icons} alt="" className="icon" />
                <div className="sea-level">{data.main.sea_level}</div>
                <div className="text">Sea Level</div>
              </div>
              <div className="element">
                <img src={ground_level_icons} alt="" className="icon" />
                <div className="ground-level">{data.main.grnd_level}</div>
                <div className="text">Ground Level</div>
              </div>
            </div>
            <div className="data-container">
              <div className="element">
                <img src={longitude_icons} alt="" className="icon" />
                <div className="longitude">{data.coord.lon}</div>
                <div className="text">Longitude</div>
              </div>
              <div className="element">
                <img src={latitude_icons} alt="" className="icon" />
                <div className="latitude">{data.coord.lat}</div>
                <div className="text">Latitude</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather1;
