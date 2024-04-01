import React, { useEffect, useState } from 'react';

function DailyForecastWidget() {
    const [dailyForecast, setDailyForecast] = useState([]);

    useEffect(() => {
        const fetchDailyForecast = async () => {
            try {
                const API_KEY = 'e3c180e2c32b5c0a6202b0585947d578'; 
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=${API_KEY}`);
                const data = await response.json();
                const filteredForecast = filterDailyForecast(data.list);
                setDailyForecast(filteredForecast);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDailyForecast();
    }, []);

    const filterDailyForecast = (forecastList) => {
        const filteredForecast = [];
        const seenDates = new Set();

        forecastList.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
            if (!seenDates.has(date)) {
                filteredForecast.push(day);
                seenDates.add(date);
            }
        });

        return filteredForecast;
    };

    return (
        <div className="forecast-widget" style={styles.forecastWidget}>
            <h2 style={styles.heading}>Daily Forecast</h2>
            <div className="daily-forecast" style={styles.dailyForecast}>
                {dailyForecast.map(day => (
                    <div key={day.dt} className="daily-item" style={styles.dailyItem}>
                        <p style={styles.date}>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} style={styles.icon} />
                        <p style={styles.temperature}>{(day.main.temp - 273.15).toFixed(1)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    forecastWidget: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor:'grey',
        borderRadius: '10px',
        width: '300px',
        margin: 'auto',
        marginTop:'50px'
    },
    heading: {
        fontSize: '24px',
        marginBottom: '15px',
        textAlign: 'center',
    },
    dailyForecast: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
    },
    dailyItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    date: {
        marginRight: '10px',
        fontWeight: 'bold',
    },
    icon: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    temperature: {
        fontWeight: 'bold',
    },
};

export default DailyForecastWidget;