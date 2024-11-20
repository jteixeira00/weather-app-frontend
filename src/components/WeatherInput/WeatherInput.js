import React, { useState } from "react";
import axios from "axios";
import "./WeatherInput.css";

const WeatherInput = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  const fetchSuggestions = async (query) => {
    try {
      const apiKey = "c078d45ff9524a9eb52e05b286c89d6a";
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: query,
            key: apiKey,
            limit: 5,
          },
        }
      );

      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleCityChange = (e) => {
    const query = e.target.value;
    setCity(query);

    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.formatted);
    setSelectedLocation(suggestion);
    setSuggestions([]);
  };

  const validateDates = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("End date must be after the start date.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSearch = async () => {
    if (!city || !startDate || !endDate) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    if (!selectedLocation) {
      setErrorMessage("Please select a valid location from the suggestions.");
      return;
    }

    if (!validateDates()) {
      return;
    }

    try {
      const { lat, lng } = selectedLocation.geometry;
      onSearch(lat, lng, startDate, endDate);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="weather-input-container">
      <div className="input-group">
        <div className="city-input-wrapper">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleCityChange}
            onKeyDown={handleKeyDown}
            className="city-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={today} // Restrict to today or earlier
          onKeyDown={handleKeyDown}
          className="date-input"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || today} // Dynamically set minimum date
          max={today} // Restrict to today or earlier
          onKeyDown={handleKeyDown}
          className="date-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default WeatherInput;
