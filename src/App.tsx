import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
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

      <Footer />
    </div>
  );
}

export default App;
