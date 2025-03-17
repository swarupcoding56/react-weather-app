import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Kolkata");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling
  const API_KEY = "152d725b9b9b41e1b98185743251703"; // Replace with your actual key

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const getBackground = (condition) => {
    if (condition?.includes("Sunny")) 
      return "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?auto=format&fit=crop&w=1920&q=80";
    if (condition?.includes("Clear")) 
      return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80";
    if (condition?.includes("Cloudy"))
      return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80";
    if (condition?.includes("Rain")) 
      return "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80";
    if (condition?.includes("Snow")) 
      return "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80";
    if (condition?.includes("Mist"))
      return "/photo-1506452305024-9d3f02d1c9b5.avif";
    return "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80";
  };

  const fetchWeather = async () => {
    setLoading(true);
    setWeather(null); // Reset previous weather data
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
  
      if (data.error) {
        setError("City not found"); // Set error state
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("An error occurred while fetching the weather data."); // Set error state
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="app-container"
      style={{
        background: `url(${weather ? getBackground(weather.current.condition.text) : getBackground()}) no-repeat center center/cover`,
        transition: "background 0.5s ease-in-out",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              }
            }
          },
          background: {
            opacity: 0
          }
        }}
      />
      <motion.h1
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="weather-title"
      >
        Ultimate Weather Experience
      </motion.h1>

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather} disabled={loading}>
          <FaSearch />
        </button>
      </div>

      {loading && <motion.p animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="loading">Fetching Data...</motion.p>}

      {error && (
        <motion.div className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2>❌ {error}</h2>
        </motion.div>
      )}

      {!loading && weather && weather.current && (
        <motion.div
          className="weather-info"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Weather in {weather.location.name}
          </motion.h2>
          <div className="weather-grid">
            <motion.div
              className="weather-item"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="icon">🌡</span>
              <p>Temperature</p>
              <h3>{weather.current.temp_c}°C</h3>
            </motion.div>
            <motion.div
              className="weather-item"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="icon">😎</span>
              <p>Feels Like</p>
              <h3>{weather.current.feelslike_c}°C</h3>
            </motion.div>
            <motion.div
              className="weather-item"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="icon">🌤</span>
              <p>Condition</p>
              <h3>{weather.current.condition.text}</h3>
            </motion.div>
            <motion.div
              className="weather-item"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="icon">💧</span>
              <p>Humidity</p>
              <h3>{weather.current.humidity}%</h3>
            </motion.div>
          </div>
          <motion.img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="weather-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          />
          <motion.div
            className="additional-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>🌬 Wind Speed: {weather.current.wind_kph} km/h</p>
            <p>📅 Last Updated: {new Date(weather.current.last_updated).toLocaleString()}</p>
          </motion.div>
        </motion.div>
      )}

      <p className="footer">Powered by SwarupAPI</p>
    </motion.div>
  );
}

export default App;
