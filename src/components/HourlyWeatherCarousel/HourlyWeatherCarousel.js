import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "../WeatherCarousel/WeatherCarousel.css";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
import weatherCodeIcons from "../../utils/weatherCodeIcons";

const HourlyWeatherCarousel = ({ data }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    centerMode: false,
    vertical: false,
  };

  return (
    <div className="weather-carousel-container">
      <Slider {...settings}>
        {data.map((hourlyItem, index) => {
          const weatherInfo = weatherCodeIcons[hourlyItem.weather_code]?.day || {};
  
          return (
            <HourlyWeather
              key={index}
              data={hourlyItem}
              weatherInfo={weatherInfo}
            />
          );
        })}
      </Slider>
    </div>
  );
  
};

export default HourlyWeatherCarousel;
