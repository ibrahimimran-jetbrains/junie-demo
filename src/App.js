import './App.css';
import WorldClock from './components/WorldClock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <div className="crown-logo"></div>
        </div>
        <h1>Prestige Timekeeper</h1>
        <p className="app-description">
          Precision timekeeping across the globe. Excellence in every timezone.
        </p>
        <WorldClock />
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Prestige Timekeeper. Inspired by luxury watchmaking.</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
