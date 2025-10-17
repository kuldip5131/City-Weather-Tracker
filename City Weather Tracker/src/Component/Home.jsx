import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
    const [city, setCity] = useState("");  // City to search for
    const [weatherData, setWeatherData] = useState({
        desc: "Clear Sky",
        name: "-",
        icon: "http://openweathermap.org/img/wn/01d@2x.png",
        humidity: 0,
        wind: 0,
        temp: 0,
    });
    const [date, setDate] = useState("");
    const [message, setMessage] = useState(""); // New state for success/error messages

    // Function to check the weather
    const checkWeather = async () => {
        if (city.trim() === "") {
            setMessage("❌ City Not Found.");
            return;
        }

        const api_key = "3a1be83dfa9c35ee1098db641a46496c";
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
            );
            const data = await response.json();

            if (data.cod === 200) {
                setWeatherData({
                    desc: data.weather[0].main,
                    name: data.name,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    temp: Math.round(data.main.temp - 273.15),
                });
                setMessage(`✅ Successfully. ${data.name}`);
            } else {
                setMessage("❌ City Not Found.");
            }
        } catch (error) {
            setMessage("❌ City Not Found.");
            console.error("❌ City Not Found.", error);
        }
    };

    // Set the current date when the component is mounted
    useEffect(() => {
        const d = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const fullDate = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        setDate(fullDate);
    }, []);

    return (
        <div>
            <h1 className="heading">⛅ Check Weather of Your City ⛅</h1>
            <div className="containerone">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <i className="bi bi-search search-icon" onClick={checkWeather}></i>
                </div>

                {/* Message Display */}
                {message && <p className="message">{message}</p>}

                {/* Weather Data */}
                <div className="weather">
                    <img src={weatherData.icon} className="icon" alt="Weather Icon" />
                    <div className="weather-text">
                        <p className="des">{weatherData.desc}</p>
                        <h2>
                            <span className="temp">{weatherData.temp}</span>
                            <span className="celcious">°C</span>
                        </h2>
                        <span className="city name">{weatherData.name}</span>
                    </div>
                </div>

                {/* Weather Details */}
                <div className="weather-details">
                    <div className="humidity">
                        <i className="bi bi-water w-icon"></i>
                        <p className="figure">
                            <span className="hm">{weatherData.humidity}</span>%
                        </p>
                        <p className="detail">Humidity</p>
                    </div>
                    <div className="wind">
                        <i className="bi bi-tornado w-icon"></i>
                        <p className="figure">
                            <span className="sp">{weatherData.wind}</span> km/h
                        </p>
                        <p className="detail">Wind Speed</p>
                    </div>
                </div>
            </div>

            {/* Display the current date */}
            <div><p className="date">{date}</p></div>
        </div>
    );
};

export default Home;
