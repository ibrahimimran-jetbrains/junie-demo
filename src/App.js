import './App.css';
import WorldClock from './components/WorldClock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>World Clock App</h1>
        <p className="app-description">
          Check the current time and date across different time zones around the world.
        </p>
        <WorldClock />
      </header>
    </div>
  );
}

export default App;
