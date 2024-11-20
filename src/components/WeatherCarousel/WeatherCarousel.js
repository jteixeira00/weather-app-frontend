import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "./WeatherCarousel.css";
import weatherCodeIcons from "../../utils/weatherCodeIcons";
import WeatherCard from "../WeatherCard/WeatherCard";

const WeatherCarousel = ({ data, onCardClick, isHourly }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    centerMode: false,
    vertical: false,
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatSunshineDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
      <div className="weather-carousel-container">
        <Slider {...settings}>
          {data.map((item, index) => {
            const weatherInfo = weatherCodeIcons[item.weather_code]?.day || {}; // Default fallback for weatherInfo
      
            return (
              <WeatherCard
                key={index}
                data={item}
                weatherInfo={weatherInfo}
                onClick={onCardClick}
                isHourly={isHourly}
                formatTime={formatTime}
                formatDate={formatDate}
                formatSunshineDuration={formatSunshineDuration}
              />
            );
          })}
        </Slider>
      </div>

  );
};

export default WeatherCarousel;
