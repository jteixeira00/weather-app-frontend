import React from "react";
import "./WeatherCard.css"; // Optional: If you want specific styles for cards
import { FaTemperatureHigh, FaTemperatureLow, FaTint, FaSun, FaRegSun } from "react-icons/fa"; // Icons for weather

const WeatherCard = ({
  data,
  weatherInfo,
  onClick,
  isHourly,
  formatTime,
  formatDate,
  formatSunshineDuration,
}) => {
    if (!data) return null;
  return (
    <div className="weather-card" onClick={() => onClick(data.date || data.hour)}>
      <div className="weather-card-header">
        <h4 className="weather-card-date">
          {isHourly ? formatTime(data.hour) : formatDate(data.date)}
        </h4>
      </div>
      <div className="weather-card-content">
        {/* Left Section: Icon and Description */}
        <div className="weather-card-left">
          <img
            src={weatherInfo?.image}
            alt={weatherInfo?.description}
            className="weather-icon"
          />
          <p className="weather-description">
            {weatherInfo?.description || "N/A"}
          </p>
        </div>

        {/* Right Section: Temperatures and Precipitation */}
        <div className="weather-card-right">
          <p>
            <FaTemperatureHigh className="weather-icon-small" />{" "}
            <span className="temp-high">{data.temperature_max || data.temperature}°C</span>
          </p>
          {data.temperature_min && (
            <p>
              <FaTemperatureLow className="weather-icon-small" />{" "}
              <span className="temp-low">{data.temperature_min}°C</span>
            </p>
          )}
          <p>
            <FaTint className="weather-icon-small" /> {data.precipitation || 0} mm
          </p>
        </div>
      </div>

      {/* Bottom Section: Sunrise, Sunset, and Sunshine */}
      {!isHourly && (
        <div className="weather-card-footer">
          <p>
            <FaSun className="weather-icon-small" /> Sunrise:{" "}
            {formatTime(data.sunrise)}
          </p>
          <p>
            <FaRegSun className="weather-icon-small" /> Sunset:{" "}
            {formatTime(data.sunset)}
          </p>
          <p>
            Total sunshine: {formatSunshineDuration(data.sunshine_duration)}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
