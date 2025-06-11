import React, { useState, useEffect } from 'react';
import './WorldClock.css';

function WorldClock() {
  const [time, setTime] = useState({});
  const [customCity, setCustomCity] = useState('');
  const [customZone, setCustomZone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Initial list of time zones to display
  const [timeZones, setTimeZones] = useState([
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
    { name: 'Bangalore', zone: 'Asia/Kolkata' },
    { name: 'Belgrade', zone: 'Europe/Belgrade' }
  ]);

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      const newTime = {};
      timeZones.forEach(({ name, zone }) => {
        const now = new Date();
        // Get time
        newTime[name] = {
          time: now.toLocaleTimeString('en-US', {
            timeZone: zone,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }),
          // Get date
          date: now.toLocaleDateString('en-US', {
            timeZone: zone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        };
      });
      setTime(newTime);
      setLoading(false);
    };

    // Update time immediately
    updateTime();

    // Set up interval to update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeZones]);

  // Function to handle adding a custom time zone
  const handleAddTimeZone = (e) => {
    e.preventDefault();

    if (!customCity || !customZone) {
      setError('Please enter both city name and time zone.');
      return;
    }

    // Check if the city name already exists
    if (timeZones.some(tz => tz.name === customCity)) {
      setError('A city with this name already exists. Please use a different name.');
      return;
    }

    // Check if the time zone is valid
    try {
      // Test if the time zone is valid by trying to format a date with it
      new Intl.DateTimeFormat('en-US', { timeZone: customZone }).format(new Date());

      // Set loading to true while the new time zone data is being fetched
      setLoading(true);

      // Add the new time zone to the list
      setTimeZones([...timeZones, { name: customCity, zone: customZone }]);

      // Clear the form and any error messages
      setCustomCity('');
      setCustomZone('');
      setError('');
    } catch (err) {
      setError('Invalid time zone. Please use a valid IANA time zone identifier (e.g., America/Chicago).');
    }
  };

  // Function to remove a time zone
  const handleRemoveTimeZone = (name) => {
    setTimeZones(timeZones.filter(tz => tz.name !== name));
  };

  return (
    <div className="world-clock">
      <h2>World Clock</h2>

      {/* Form for adding custom time zones */}
      <div className="add-timezone-form">
        <h3>Add Custom Time Zone</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleAddTimeZone}>
          <div className="form-group">
            <input
              type="text"
              placeholder="City Name (e.g., Paris)"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Time Zone (e.g., Europe/Paris)"
              value={customZone}
              onChange={(e) => setCustomZone(e.target.value)}
            />
            <p className="helper-text">
              Use IANA time zone format: Continent/City (e.g., America/New_York, Europe/London)
            </p>
          </div>
          <button type="submit">Add Time Zone</button>
        </form>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading time data...</p>
        </div>
      ) : (
        <div className="clock-container">
          {timeZones.map(({ name }) => (
            <div key={name} className="clock-item">
              <div className="clock-header">
                <h3>{name}</h3>
                <button 
                  className="remove-button" 
                  onClick={() => handleRemoveTimeZone(name)}
                  aria-label={`Remove ${name}`}
                >
                  ×
                </button>
              </div>
              {time[name] && (
                <>
                  <p className="time">{time[name].time}</p>
                  <p className="date">{time[name].date}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorldClock;
