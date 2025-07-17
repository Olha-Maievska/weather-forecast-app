import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import ForecastChart from './components/ForecastChart';
import Header from "./components/Header";


function App() {
  const night = new Date().getHours() >= 18 || new Date().getHours() < 6;

  return (
    <div className={`app app__${night ? "night" : "day"}`}>
      <Header />

      <main className="container">
        <CurrentWeather />
        <Forecast />
        <ForecastChart />
      </main>
    </div>
  );
}

export default App;
