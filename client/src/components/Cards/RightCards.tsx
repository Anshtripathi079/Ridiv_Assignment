import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import wind from "/wind.png";
import windblack from "/windblack.png";
import thermometer from "/thermometer.png";
import thermoblack from "/thermoblack.png";
import sun from "/sun.png";
import sunblack from "/sunblack.png";
import moon from "/moon.png";
import moonblack from "/moonblack.png";
import humid from "/humid.png";
import humidblack from "/humidblack.png";
import visibility from "/visibility.png";
import visibilityblack from "/visibilityblack.png";
import { ThemeContext } from "../../context/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

interface RightCardsProps {
  data: WeatherData;
  forecastData: AirQualityData;
  isCelsius: boolean;
}

const RightCards: React.FC<RightCardsProps> = ({
  data,
  forecastData,
  isCelsius,
}) => {
  const { theme }: any = useContext(ThemeContext);
  const [aqiData, setAqiData] = useState<any>(null);
  const [timedData, setTimedData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
          data?.coord?.lat
        }&lon=${
          data?.coord?.lon
        }&appid=89187f0172415e3f0d994eca5c595f38&units=${
          isCelsius ? "metric" : "imperial"
        }`
      );

      const jsonData = await res.json();
      setAqiData(jsonData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [data, isCelsius]);

  const GetTime: React.FC<{ timestamp: number }> = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
    };
    const kolkataTime = date.toLocaleString("en-US", options);
    return <div>{kolkataTime}</div>;
  };

  useEffect(() => {
    if (forecastData && forecastData.list) {
      const timedData = forecastData.list.slice(0, 8);
      setTimedData(timedData);
    }
  }, [forecastData]);

  function formatTime(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours} ${ampm}`;
  }

  const getQualitativeName = (val: number) => {
    if (val < 10) {
      return "Good";
    } else if (val >= 10 && val < 25) {
      return "Fair";
    } else if (val >= 25 && val < 50) {
      return "Moderate";
    } else if (val >= 50 && val < 75) {
      return "Poor";
    } else if (val >= 75) {
      return "Very Poor";
    }
  };

  return (
    <div className="flex flex-col col-span-7 md:col-span-5 lg:col-span-7 xl:col-span-9 margin-m">
      <div className="bg-white dark:bg-[#1D1B1F] rounded-xl shadow p-6 margin-m">
        <h2 className="text-lg font-semibold">Today's Highlights</h2>
        {/* top */}
        <div className="flex flex-col xl:flex-row justify-between items-center mt-3 w-full gap-6">
          {/* left */}
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] p-4 flex-1 rounded-xl w-full">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-semibold dark:text-gray-400">
                Air Quality Index
              </span>
              <span className="py-[2px] px-[6px] bg-orange-200 text-black text-sm text-center rounded-xl">
                {aqiData ? (
                  getQualitativeName(aqiData?.list[0]?.components?.pm2_5)
                ) : (
                  <Skeleton width={50} />
                )}
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 mt-6 items-center p-1">
              <div className="flex items-center justify-center">
                <img
                  src={`${theme === "dark" ? wind : windblack}`}
                  alt="logo"
                  className="w-16 "
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className=" text-gray-700 dark:text-gray-400">PM2_5</span>
                <span className="text-xl md:text-3xl">
                  {aqiData ? aqiData?.list[0]?.components?.pm2_5 : <Skeleton />}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className=" text-gray-700 dark:text-gray-400">SO2</span>
                <span className="text-xl md:text-3xl">
                  {aqiData ? aqiData?.list[0]?.components?.so2 : <Skeleton />}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className=" text-gray-700 dark:text-gray-400">NO2</span>
                <span className="text-xl md:text-3xl">
                  {aqiData ? aqiData?.list[0]?.components?.no2 : <Skeleton />}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className=" text-gray-700 dark:text-gray-400">O3</span>
                <span className="text-xl md:text-3xl">
                  {aqiData ? aqiData?.list[0]?.components?.o3 : <Skeleton />}
                </span>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] p-4 flex-1 rounded-xl w-full ">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-semibold dark:text-gray-400">
                Sunrise & Sunset
              </span>
            </div>
            <div className="flex justify-between items-center gap-2 mt-6 mx-2 flexCol">
              <div className="w-full flex items-center  gap-5">
                <img
                  src={`${theme === "dark" ? sun : sunblack}`}
                  alt="sun"
                  className="w-12"
                />
                <div className="flex flex-col gap-2 ">
                  <span className="text-gray-700 dark:text-gray-400">
                    Sunrise
                  </span>
                  <span className="text-xl md:text-3xl">
                    {data ? (
                      <GetTime timestamp={data?.sys?.sunrise} />
                    ) : (
                      <Skeleton />
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full flex items-center p-2 gap-5">
                <img
                  src={`${theme === "dark" ? moon : moonblack}`}
                  alt="sun"
                  className="w-12"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-gray-700 dark:text-gray-400">
                    Sunset
                  </span>
                  <span className="text-xl md:text-3xl">
                    {data ? (
                      <GetTime timestamp={data?.sys?.sunset} />
                    ) : (
                      <Skeleton />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="flex flex-col lg:flex-row justify-between w-full mt-6 gap-3">
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] rounded-xl shadow p-6 w-full">
            <span>Humidity</span>
            <div className="mt-4 flex justify-between items-center">
              <img
                src={`${theme === "dark" ? humid : humidblack}`}
                alt="wind"
                className="w-8 xl:w-12"
              />
              <span className="text-xl">
                {data ? data?.main?.humidity + "%" : <Skeleton width={50} />}
              </span>
            </div>
          </div>
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] rounded-xl shadow p-6 w-full">
            <span>Pressure</span>
            <div className="mt-4 flex justify-between items-center gap-2">
              <img
                src={`${theme === "dark" ? wind : windblack}`}
                alt="wind"
                className="w-8 xl:w-12"
              />
              <span className="text-base xl:text-xl">
                {data ? data?.main?.pressure + "hPa" : <Skeleton width={50} />}
              </span>
            </div>
          </div>
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] rounded-xl shadow p-6 w-full">
            <span>Visibility</span>
            <div className="mt-4 flex justify-between items-center">
              <img
                src={`${theme === "dark" ? visibility : visibilityblack}`}
                alt="wind"
                className="w-8 xl:w-16"
              />
              <span className="text-xl">
                {data ? (
                  data?.visibility / 1000 + "km"
                ) : (
                  <Skeleton width={50} />
                )}
              </span>
            </div>
          </div>
          <div className="bg-[#ebecf7] dark:bg-[#1A191C] rounded-xl shadow p-6 w-full">
            <span>Feels Like</span>
            <div className="mt-4 flex justify-between items-center">
              <img
                src={`${theme === "dark" ? thermometer : thermoblack}`}
                alt="wind"
                className="w-8 xl:w-12"
              />
              <span className="text-xl">
                {data ? (
                  `${data?.main?.feels_like} ${isCelsius ? "°C" : "°F"}`
                ) : (
                  <Skeleton width={50} />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* right bottom */}
      <h2 className="text-lg mt-6 font-semibold">Today at</h2>
      <div className=" mt-2">
        <div className="flex items-center justify-between gap-2 overflow-x-scroll lg:overflow-visible">
          {timedData.length
            ? timedData.map((val, i) => (
                <div
                  className="bg-white dark:bg-[#1A191C] p-3 rounded-lg min-w-[75px] w-full flex flex-col justify-between items-center"
                  key={i}
                >
                  <span className="text-sm">
                    {timedData && formatTime(val?.dt_txt)}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${val?.weather[0]?.icon}@2x.png`}
                    alt=""
                    className="w-12"
                  />
                  <span>
                    {Math.round(val?.main?.temp)}
                    {isCelsius ? "°C" : "°F"}
                  </span>
                </div>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <div
                  className="bg-white dark:bg-[#1A191C] p-3 rounded-lg min-w-[75px] w-full flex flex-col justify-between items-center"
                  key={i}
                >
                  <Skeleton circle={true} height={50} width={50} />
                  <Skeleton width={50} />
                  <Skeleton width={30} />
                </div>
              ))}
        </div>
        <div className="flex items-center justify-between gap-2 mt-4 overflow-x-scroll lg:overflow-visible">
          {timedData.length
            ? timedData.map((val, i) => (
                <div
                  className="bg-white dark:bg-[#1A191C] p-3 rounded-lg min-w-[75x] w-full flex flex-col justify-between items-center gap-3"
                  key={i}
                >
                  <span className="text-sm">
                    {timedData && formatTime(val?.dt_txt)}
                  </span>
                  <img
                    src={`${theme === "dark" ? wind : windblack}`}
                    alt=""
                    className="w-6"
                  />
                  <span className="text-sm">
                    {Math.round(val?.wind?.speed)}km/h
                  </span>
                </div>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <div
                  className="bg-white dark:bg-[#1A191C] p-3 rounded-lg min-w-[75x] w-full flex flex-col justify-between items-center gap-3"
                  key={i}
                >
                  <Skeleton circle={true} height={50} width={50} />
                  <Skeleton width={50} />
                  <Skeleton width={30} />
                </div>
              ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default RightCards;
