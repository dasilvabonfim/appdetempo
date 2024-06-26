import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'


function Weather() {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloud,
        '02n': cloud,
        '03d': cloud,
        '03n': cloud,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow,
    }


    const chave = '9a06055b4bb9bb5795f8f99ac815bc38';
    const search = async (city) =>{
        if(city === ""){
            alert("Digite o nome de uma cidade");
            return;
        } 
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${chave}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert("Cidade não encontrada");
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch ( error ){
            setWeatherData(false);
        }
    }

    useEffect(() => {
        search("Campo Mourão");
    },[])



return (
    <div className="weather">
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                placeholder="Digite o nome da cidade"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        search(inputRef.current.value);
                    }
                }}
            />
            <img
                src={search_icon}
                alt=""
                onClick={() => search(inputRef.current.value)}
            />
        </div>
        {weatherData ? (
            <>
                <img src={weatherData.icon} alt="" className="weather-icon" />
                <p className="temperature">{weatherData.temperature}°C</p>
                <p className="location">{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Úmidade</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind} alt="" />
                        <div>
                            <p>{weatherData.wind} Km/H</p>
                            <span>Velocidade do vento</span>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
            </>
        )}
    </div>
);
}

export default Weather