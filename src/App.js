import React, { useState } from "react";
import WeatherInput from "./components/WeatherInput/WeatherInput";
import WeatherCarousel from "./components/WeatherCarousel/WeatherCarousel";
import HourlyWeatherCarousel from "./components/HourlyWeatherCarousel/HourlyWeatherCarousel";
import DailyDataDisplay from "./components/DailyDataDisplay/DailyDataDisplay";
import { FaArrowLeft } from "react-icons/fa"; // Import the icon
import "./App.css";
import axios from "axios";

const App = () => {
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [showHourly, setShowHourly] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const fetchDailyData = async (latitude, longitude, startDate, endDate) => {
    try {
      const response = await axios.get("http://localhost:3000/weathers", {
        params: { latitude, longitude, start_date: startDate, end_date: endDate },
      });
      setDailyData(response.data);
      setLocation({ latitude, longitude });
      setShowHourly(false); // Reset hourly view
    } catch (error) {
      console.error("Error fetching daily data:", error);
      alert("Could not fetch daily data");
    }
  };

  const fetchHourlyData = async (date) => {
    if (!location.latitude || !location.longitude || !date) {
      console.error("Missing parameters for fetchHourlyData:", {
        latitude: location.latitude,
        longitude: location.longitude,
        date,
      });
      alert("Invalid parameters for hourly data");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/hourly_weather", {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          date,
        },
      });
      setHourlyData(response.data.hourly_data); // Save hourly data
      setShowHourly(true);
    } catch (error) {
      console.error("Error fetching hourly data:", error);
      alert("Could not fetch hourly data");
    }
  };


  const goBackToDaily = () => {
    setShowHourly(false); // Switch back to daily view
  };
  return (
    <div className="weather-app-container">
      <WeatherInput onSearch={fetchDailyData} />
  
      {!showHourly && dailyData.length > 0 && (
      <>
        <WeatherCarousel
          data={dailyData}
          onCardClick={(date) => fetchHourlyData(date)}
          isHourly={false}
        />
        <DailyDataDisplay dailyData={dailyData} />
      </>
    )}
  
    {showHourly && hourlyData.length > 0 && (
      <>
        <HourlyWeatherCarousel data={hourlyData} />
        <div className="back-button-container-left">
          <button className="back-to-daily-button" onClick={goBackToDaily}>
            <FaArrowLeft /> Back
          </button>
        </div>
      </>
    )}
    </div>
  );
  
};

export default App;