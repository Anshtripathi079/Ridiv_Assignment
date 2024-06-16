import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";

interface LeftCardsProps {
  data: WeatherData | null;
  forecastData: Forecast[];
  city: string;
  isCelsius: boolean;
}

const LeftCards: React.FC<LeftCardsProps> = ({ data, city, isCelsius }) => {
  const [fiveDayForecast, setFiveDayForecast] = useState<any[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=89187f0172415e3f0d994eca5c595f38&units=${
            isCelsius ? "metric" : "imperial"
          }`
        );
        const jsonData = await res.json();
        const unique: number[] = [];
        const five = jsonData.list.filter((forecast: any) => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!unique.includes(forecastDate)) {
            unique.push(forecastDate);
            return true;
          }
          return false;
        });
        setFiveDayForecast(five.slice(1, 6));
      } catch (err) {
        // console.log(err);
        console.log("error");

        toast.error("Some error occurred");
      }
    };

    fetchForecast();
  }, [city, isCelsius]);

  function TimestampConverter({ timestamp }: { timestamp: number }) {
    const dateObj = new Date(timestamp * 1000);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dateMonth = dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    return (
      <div>
        {dayOfWeek}, {dateMonth}
      </div>
    );
  }

  function getDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };

    const dateN = new Date(date).toLocaleDateString("en-us", options);
    return <span>{dateN}</span>;
  }
  function getDay(date: string) {
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = new Date(date).toLocaleDateString("en-US", options);
    return <span>{dayName}</span>;
  }

  return (
    <div className="flex flex-col col-span-7 md:col-span-4 lg:col-span-4 xl:col-span-3 margin-m-left">
      <div className="bg-white dark:bg-[#1D1B1F] rounded-xl shadow-sm p-6 flex flex-col">
        <span className="text-lg">Now</span>
        <div className="flex justify-between items-center mt-2">
          <span className="text-5xl">
            {data ? (
              `${data.main.temp} ${isCelsius ? "°C" : "°F"}`
            ) : (
              <Skeleton width={50} />
            )}
          </span>

          {data ? (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="cloud"
              className="w-16"
            />
          ) : (
            <Skeleton circle={true} height={50} width={50} />
          )}
        </div>
        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {data ? (
            data.weather[0].description?.toUpperCase()
          ) : (
            <Skeleton width={100} />
          )}
        </span>
        <hr className="mt-2" />
        <div className="mt-3 flex items-center gap-3">
          <FaCalendar />
          <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
            {data ? (
              <TimestampConverter timestamp={data.dt} />
            ) : (
              <Skeleton width={100} />
            )}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <FaLocationDot />
          <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
            {data ? (
              `${data.name}, ${data.sys.country}`
            ) : (
              <Skeleton width={100} />
            )}
          </span>
        </div>
      </div>
      <div className="text-lg mt-4">5 days forecast</div>
      <div className="bg-white dark:bg-[#1D1B1F] rounded-xl shadow-sm p-6 mt-3 flex flex-col">
        {fiveDayForecast.length > 0
          ? fiveDayForecast.map((val, i) => (
              <div className="flex justify-between items-center mt-2" key={i}>
                <div className="text-lg flex items-center gap-2 flex-1">
                  <img
                    src={`https://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`}
                    alt="cloud"
                    className="w-8"
                  />
                  <span>
                    {Math.round(val.main.temp)}
                    {isCelsius ? "°c" : "°f"}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-400 flex-1">
                  {getDate(val.dt_txt)}
                </span>
                <span className="text-gray-700 dark:text-gray-400 flex-1">
                  {getDay(val.dt_txt)}
                </span>
              </div>
            ))
          : Array.from({ length: 5 }).map((_, i) => (
              <div className="flex justify-between items-center mt-2" key={i}>
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton width={50} />
                <Skeleton width={50} />
              </div>
            ))}
      </div>
      <Toaster />
    </div>
  );
};

export default LeftCards;
