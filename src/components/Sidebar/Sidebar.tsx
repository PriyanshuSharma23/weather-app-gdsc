import { useEffect, useState } from "react";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import OutsideAlerter from "../../hooks/outsideClick";
import { DebounceInput } from "react-debounce-input";
import "./sidebar.css";
import { City } from "../../hooks/useCurrentWeather";

const recommendedCities = [
  {
    id: 1,
    name: "New York",
    region: "New York",
    country: "USA",
    lat: 40.714,
    lon: -74.006,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 2,
    name: "London",
    region: "City of London",
    country: "UK",
    lat: 51.517,
    lon: -0.106,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 3,
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.866,
    lon: 2.333,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 4,
    name: "Tokyo",
    region: "Tokyo",
    country: "Japan",
    lat: 35.683,
    lon: 139.683,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
];

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) => {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [searchedCities, setSearchedCities] = useState<City[]>([]);
  const { fetchCurrentWeather } = useCurrWeather();
  const [clickedCity, setClickedCity] = useState<City | null>(null);

  useEffect(() => {
    if (city === "") {
      setSearchedCities([]);
      return;
    }
    let abortController = new AbortController();
    setLoading(true);
    const url = `http://api.weatherapi.com/v1/search.json?${new URLSearchParams(
      {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: city,
      }
    )}`;

    fetch(url)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setSearchedCities(data);
          });
        } else {
          console.log("error");
          setError(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [city]);

  useEffect(() => {
    let abortController = new AbortController();

    if (clickedCity) {
      fetchCurrentWeather(abortController, clickedCity);
      setSidebarOpen(false);
    }

    return () => {
      abortController.abort();
    };
  }, [clickedCity]);

  return (
    <OutsideAlerter
      cb={() => {
        setSidebarOpen(false);
      }}
    >
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="input-group">
          <DebounceInput
            type="text"
            className=""
            placeholder="Enter City Name"
            value={city}
            debounceTimeout={1000}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button disabled className="search-button">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <desc></desc>
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v10"></path>
              <path d="M9 4v13"></path>
              <path d="M15 7v5"></path>
              <circle cx="16.5" cy="17.5" r="2.5"></circle>
              <path d="M18.5 19.5l2.5 2.5"></path>
            </svg>
          </button>
        </div>

        <div className="recommended">
          <h3>Search Results</h3>
          <div className="recommended__cities">
            {loading ? <p>Loading...</p> : null}

            {error ? <p>Error</p> : null}

            {searchedCities.map((city) => (
              <div
                className="recommended__city"
                key={city.id}
                onClick={() => {
                  setClickedCity(city);
                }}
              >
                <h4>{city.name}</h4>
                <p>
                  {city.region} {city.country}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* recommended section */}
        <div className="recommended">
          <h3>Popular Cities</h3>
          <div className="recommended__cities">
            {recommendedCities.map((city) => (
              <div
                className="recommended__city"
                key={city.id}
                onClick={() => {
                  setClickedCity(city);
                }}
              >
                <h4>{city.name}</h4>
                <p>
                  {city.region} {city.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </OutsideAlerter>
  );
};
