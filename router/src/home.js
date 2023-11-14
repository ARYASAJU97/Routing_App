import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
 
const MainPage = () => {
  return (
      <div className="mainPage">
        <div className="ima1"></div>
        <div className="cal">
          <button className="calcu">
            <Link to="/Calculator">Calculator</Link>
          </button>
        </div>
  

        <div className="ima2"></div>
          <div className="weatherButton">  
            <button>
              <Link to="/Weather1">WeatherApp</Link>
            </button>
          </div>
        </div>
  );
};
 
export default MainPage;