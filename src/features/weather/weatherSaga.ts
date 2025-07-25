import { call, put, takeLatest } from "redux-saga/effects";
import { fetchWeatherData } from "@/api/weatherApi";
import { setWeatherData, setForecastData } from "./weatherSlice";
import { fetchWeatherRequest } from "./weatherActions";

function* fetchWeatherSaga(action: ReturnType<typeof fetchWeatherRequest>) {
  try {
    const { weather, forecast } = yield call(fetchWeatherData, action.payload);
    yield put(setWeatherData(weather));
    yield put(setForecastData(forecast));
  } catch (err) {
    console.log(err);
  }
}

export function* watchFetchWeather() {
  yield takeLatest(fetchWeatherRequest.type, fetchWeatherSaga);
}
