# 🌤️ Weather App
A Single Page Application (SPA) built with React, Redux Toolkit, Redux-Saga, TypeScript, and Recharts. It allows users to search for a city (in English), view the current weather, a 5-day forecast, and a temperature chart.

---

## 💡 Usage Notes

City names must be typed in English.

Only cities from a predefined list of countries are allowed.

Selecting a city loads the current weather, 5-day forecast, and chart.

If no city is found, a “No cities found” message is shown.

Includes a loader and dynamic video background based on time of day.

---

## 🔧 Tech Stack

- **React + Vite**
- **TypeScript**
- **Redux Toolkit & Redux-Saga**
- **SCSS Modules**
- **Recharts**
- **Lucide Icons**
- **OpenWeatherMap API**

---

## 🗂 Project Structure
src/ directory contains:

    api/ – Functions to interact with the OpenWeatherMap API.

    assets/ – Static files like images and background videos.

    components/ – Reusable UI components: Header, Footer, Forecast, CurrentWeather, ForecastChart, etc.

    const/ – Constants used across the app, such as allowed countries.

    features/ – Redux Toolkit slices and saga files for weather state management.

    hooks/ – Custom React hooks, e.g. for city list, search debounce, weather fetcher.

    interfaces/ – TypeScript interfaces and types for weather and forecast data.

    styles/ – SCSS module styles for components and layout.

    utils/ – Utility functions like debounce, video background helpers.

    App.tsx – Main app component that brings everything together.

    main.tsx – Entry point of the React application.

---

## 🚀 Getting Started

1. **Clone the repository**

git clone https://github.com/Olha-Maievska/weather-forecast-app
cd weather-app

2. **Install dependencies**

npm install

3. **Create an .env file**

VITE_OPENWEATHER_API_KEY=your_api_key_here

🔑 You can get a free API key at https://openweathermap.org/api

4. **Run the development server**

npm run dev

---

## 🌍 Browser Support
The application supports the latest versions of:

Google Chrome

Mozilla Firefox

Microsoft Edge

---

## 🧪 Notes
This app was developed as a technical test project.