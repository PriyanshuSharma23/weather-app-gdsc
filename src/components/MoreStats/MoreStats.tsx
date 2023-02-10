import "./morestats.css";
import { useCurrentWeather } from "../../hooks/useCurrentWeather";
import { useMemo } from "react";

export const MoreStats = () => {
  const { currentWeather } = useCurrentWeather();

  const content = [
    ["pm10", currentWeather?.current.air_quality.pm10.toFixed(2), "😷"],
    ["visibility", currentWeather?.current.vis_km.toString(), "㎞"],
    [
      "sunrise",
      currentWeather?.forecast.forecastday &&
        currentWeather.forecast.forecastday[0].astro.sunrise,
      "🌅",
    ],
    [
      "sunset",
      currentWeather?.forecast.forecastday &&
        currentWeather.forecast.forecastday[0].astro.sunset,
      "🌇",
    ],
    [
      "moonrise",
      currentWeather?.forecast.forecastday &&
        currentWeather.forecast.forecastday[0].astro.moonrise,
      "🌕",
    ],
    [
      "moonset",
      currentWeather?.forecast.forecastday &&
        currentWeather.forecast.forecastday[0].astro.moonset,
      "🌑",
    ],
  ];

  return (
    <div className="more-stats">
      {content.map(([key, value, emoji]) => {
        return (
          <div key={key} className="more-stats__item">
            <div className="more-stats__key">{key}</div>
            <div className="more-stats__emoji">{emoji}</div>
            <div className="more-stats__value">{value}</div>
          </div>
        );
      })}
    </div>
  );
};
