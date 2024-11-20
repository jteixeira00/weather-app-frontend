import React, { useState } from "react";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
  } from "chart.js";
import { FaChartBar, FaTable } from "react-icons/fa"; 
import "./DailyDataDisplay.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const DailyDataDisplay = ({ dailyData }) => {
  const [viewMode, setViewMode] = useState("chart");

  const chartData = {
    labels: dailyData.map((day) => day.date),
    datasets: [
        {
          label: "Max Temperature (°C)",
          data: dailyData.map((day) => day.temperature_max),
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Min Temperature (°C)",
          data: dailyData.map((day) => day.temperature_min),
          borderColor: "lightblue",
          backgroundColor: "rgba(173, 216, 230, 0.2)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Precipitation (mm)",
          data: dailyData.map((day) => day.precipitation),
          borderColor: "darkblue",
          backgroundColor: "rgba(0, 0, 139, 0.2)",
          yAxisID: "yPrecipitation",
          fill: true,
          tension: 0.4,
        },
      ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: false, 
        min: Math.min(...dailyData.map((day) => day.temperature_min)) - 5,
        max: Math.max(...dailyData.map((day) => day.temperature_max)) + 5,
      },
      yPrecipitation: {
        position: "right",
        title: {
          display: true,
          text: "Precipitation (mm)",
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="weather-carousel-container">
      <div className="toggle-buttons-container">
        <button
          className={`toggle-button ${viewMode === "chart" ? "active" : ""}`}
          onClick={() => setViewMode("chart")}
        >
          <FaChartBar />
        </button>
        <button
          className={`toggle-button ${viewMode === "table" ? "active" : ""}`}
          onClick={() => setViewMode("table")}
        >
          <FaTable />
        </button>
      </div>

      <div className="daily-data-content">
  {viewMode === "chart" ? (
    <Line data={chartData} options={chartOptions} />
  ) : (
    <table className="daily-data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Min Temp (°C)</th>
          <th>Max Temp (°C)</th>
          <th>Precipitation (mm)</th>
          <th>Sunrise</th>
          <th>Sunset</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {dailyData.map((day, index) => (
          <tr key={index}>
            <td>{day.date}</td>
            <td>{day.temperature_min}°C</td>
            <td>{day.temperature_max}°C</td>
            <td>{day.precipitation} mm</td>
            <td>{formatTime(day.sunrise)}</td>
            <td>{formatTime(day.sunset)}</td>
            <td>{day.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
};

export default DailyDataDisplay;
