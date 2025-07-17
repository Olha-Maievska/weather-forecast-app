import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import ForecastChart from "./components/ForecastChart";
import Header from "./components/Header";
import VideoBg from "./components/VideoBg";

function App() {
  return (
    <div className="app">
      <VideoBg />
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
