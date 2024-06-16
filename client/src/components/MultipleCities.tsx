import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
}

interface WeatherData {
  weather: Weather[];
  main: Main;
}

interface WeatherDisplayProps {
  city: string;
  data?: WeatherData;
  loading: boolean;
  isCelsius: boolean;
}

interface CityWeatherData {
  city: string;
  data: WeatherData;
}
interface MultipleCitiesProps {
  isCelsius: boolean;
}
const MultipleCities: React.FC<MultipleCitiesProps> = ({ isCelsius }) => {
  const [weatherData, setWeatherData] = useState<CityWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "89187f0172415e3f0d994eca5c595f38";
  const cities = ["Delhi", "Jaipur", "Punjab", "Mumbai", "Assam"];

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const promises = cities.map((city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        return fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for ${city}: ${response.status}`
            );
          }
          return response.json();
        });
      });
      try {
        const results = await Promise.all(promises);
        setWeatherData(
          results.map((data, index) => ({ city: cities[index], data }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherForCities();
  }, []);

  return (
    <div className="px-8 pb-4">
      <p className="font-semibold text-xl">Weather In Different Cities</p>
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {loading
          ? cities.map((city) => (
              <div
                key={city}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
              >
                <WeatherDisplay
                  city={city}
                  loading={true}
                  isCelsius={isCelsius}
                />
              </div>
            ))
          : weatherData.map(({ city, data }) => (
              <div
                key={city}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
              >
                <WeatherDisplay
                  city={city}
                  data={data}
                  loading={false}
                  isCelsius={isCelsius}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default MultipleCities;

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
  data,
  loading,
  isCelsius,
}) => {
  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  if (loading) {
    return (
      <div className="dark:bg-[#1A191C] bg-white p-4 flex flex-col rounded-lg w-full shadow-md">
        <Skeleton height={30} width="80%" className="mx-auto my-2" />
        <Skeleton
          circle={true}
          height={64}
          width={64}
          className="mx-auto my-2"
        />
        <Skeleton height={20} width="60%" className="mx-auto my-2" />
        <Skeleton height={20} width="40%" className="mx-auto my-2" />
      </div>
    );
  }

  return (
    <div className="dark:bg-[#1A191C] bg-white p-4 flex flex-col rounded-lg w-full shadow-md">
      <h2 className="text-center text-lg font-semibold dark:text-white">
        Weather in {city}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
        alt="cloud"
        className="w-16 mx-auto"
      />
      <p className="dark:text-white text-center">
        Description:{" "}
        {data?.weather[0].description
          .split(" ")
          .map((item: string) => capitalize(item))
          .join(" ")}
      </p>
      <p className="dark:text-white text-center">
        Temperature: {data?.main.temp}
        {isCelsius ? "°C" : "°F"}
      </p>
    </div>
  );
};
