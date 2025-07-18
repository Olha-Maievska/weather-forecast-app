import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "../features/weather/weatherSlice";
import createSagaMiddleware from 'redux-saga';
import { watchFetchWeather } from '@/features/weather';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchWeather);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
