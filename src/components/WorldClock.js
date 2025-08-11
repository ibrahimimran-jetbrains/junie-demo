import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './WorldClock.css';

// Clock item component for better performance
const ClockItem = React.memo(({ name, timeData, onRemove }) => {
  return (
    <div className="clock-item">
      <div className="clock-header">
        <h3>{name}</h3>
        <button 
          className="remove-button" 
          onClick={() => onRemove(name)}
          aria-label={`Remove ${name}`}
        >
          ×
        </button>
      </div>
      {timeData && (
        <>
          <p className="time">{timeData.time}</p>
          <p className="date">{timeData.date}</p>
        </>
      )}
    </div>
  );
});

function WorldClock() {
  // Get saved time zones from localStorage or use defaults
  const getInitialTimeZones = () => {
    const savedTimeZones = localStorage.getItem('worldClockTimeZones');
    if (savedTimeZones) {
      try {
        return JSON.parse(savedTimeZones);
      } catch (e) {
        console.error('Failed to parse saved time zones:', e);
      }
    }
    return [
      { name: 'New York', zone: 'America/New_York' },
      { name: 'London', zone: 'Europe/London' },
      { name: 'Tokyo', zone: 'Asia/Tokyo' },
      { name: 'Sydney', zone: 'Australia/Sydney' },
      { name: 'Los Angeles', zone: 'America/Los_Angeles' }
    ];
  };

  const [time, setTime] = useState({});
  const [customCity, setCustomCity] = useState('');
  const [customZone, setCustomZone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [timeZones, setTimeZones] = useState(getInitialTimeZones);

  // Save time zones to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('worldClockTimeZones', JSON.stringify(timeZones));
    } catch (e) {
      console.error('Failed to save time zones to localStorage:', e);
    }
  }, [timeZones]);

  // Memoized function to update time
  const updateTime = useCallback(() => {
    const newTime = {};
    timeZones.forEach(({ name, zone }) => {
      try {
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
      } catch (err) {
        console.error(`Error formatting time for ${name} (${zone}):`, err);
        newTime[name] = { time: 'Error', date: 'Invalid time zone' };
      }
    });
    setTime(newTime);
    setLoading(false);
  }, [timeZones]);

  // Set up the interval timer only once
  useEffect(() => {
    // Update time immediately
    updateTime();

    // Set up interval to update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [updateTime]);

  // Function to handle adding a custom time zone
  const handleAddTimeZone = useCallback((e) => {
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
      setTimeZones(prevTimeZones => [...prevTimeZones, { name: customCity, zone: customZone }]);

      // Clear the form and any error messages
      setCustomCity('');
      setCustomZone('');
      setError('');
    } catch (err) {
      setError('Invalid time zone. Please use a valid IANA time zone identifier (e.g., America/Chicago).');
    }
  }, [customCity, customZone, timeZones]);

  // Function to remove a time zone
  const handleRemoveTimeZone = useCallback((name) => {
    setTimeZones(prevTimeZones => prevTimeZones.filter(tz => tz.name !== name));
  }, []);

  // Memoize the sorted time zones to prevent unnecessary re-renders
  const sortedTimeZones = useMemo(() => {
    return [...timeZones].sort((a, b) => a.name.localeCompare(b.name));
  }, [timeZones]);

  return (
    <div className="world-clock" role="region" aria-label="World Clock Application">
      <h2>World Clock</h2>

      {/* Form for adding custom time zones */}
      <div className="add-timezone-form">
        <h3>Add Custom Time Zone</h3>
        {error && <p className="error-message" role="alert">{error}</p>}
        <form onSubmit={handleAddTimeZone}>
          <div className="form-group">
            <label htmlFor="city-name" className="visually-hidden">City Name</label>
            <input
              id="city-name"
              type="text"
              placeholder="City Name (e.g., Paris)"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="time-zone" className="visually-hidden">Time Zone</label>
            <input
              id="time-zone"
              type="text"
              placeholder="Time Zone (e.g., Europe/Paris)"
              value={customZone}
              onChange={(e) => setCustomZone(e.target.value)}
              aria-required="true"
            />
            <p className="helper-text" id="time-zone-help">
              Use IANA time zone format: Continent/City (e.g., America/New_York, Europe/London)
            </p>
          </div>
          <button type="submit">Add Time Zone</button>
        </form>
      </div>

      {loading ? (
        <div className="loading-container" role="status">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p>Loading time data...</p>
        </div>
      ) : (
        <div className="clock-container" role="list">
          {sortedTimeZones.map(({ name }) => (
            <ClockItem 
              key={name} 
              name={name} 
              timeData={time[name]} 
              onRemove={handleRemoveTimeZone} 
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default WorldClock;
