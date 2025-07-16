import CurrentWeather from "./components/current-weather";
import Forecast from './components/forecast';
import Header from "./components/header";

function App() {
  const night = new Date().getHours() >= 18 || new Date().getHours() < 6;

  return (
    <div className={`app app__${night ? "night" : "day"}`}>
      <Header />

      <main className="container">
        <CurrentWeather />
        <Forecast /> 
      </main>
    </div>
  );
}

export default App;
