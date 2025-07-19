import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Forecast from "./components/Forecast";
import ForecastChart from "./components/ForecastChart";
import Header from "./components/Header";
import Loader from "./components/Loader";
import VideoBg from "./components/VideoBg";
import { useAppSelector } from "./hooks";

function App() {
  const { loading } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="app">
      <VideoBg />
      <Header />

      <main className="container">
        <CurrentWeather />
        <Forecast />
        <ForecastChart />
      </main>

      {loading && <Loader />}

      <Footer />
    </div>
  );
}

export default App;
