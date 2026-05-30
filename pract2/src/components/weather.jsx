import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true');
        
        if (!response.ok) throw new Error('Помилка мережі');
        
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={{ color: 'palevioletred', marginTop: 0 }}>Рівень 1: Прогноз погоди (Київ)</h3>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'crimson' }}>Помилка: {error}</p>}
      {weather && (
        <div>
          <p><strong>Температура:</strong> <span style={{ color: 'violetred', fontWeight: 'bold' }}>{weather.temperature}°C</span></p>
          <p><strong>Швидкість вітру:</strong> {weather.windspeed} км/год</p>
          <p><strong>Час оновлення:</strong> {weather.time}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: { border: '1px solid palevioletred', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: 'lavenderblush', color: 'maroon' }
};

export default Weather;