import { FaLocationCrosshairs } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CurrentLocation = ({ setCity }: any) => {
  const [ip, setIp] = useState("");
  const navigate = useNavigate();
  const getIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org");
      const data = await res.text();
      setIp(data);
      fetchIPInfo();
    } catch (err) {
      //   console.log(err);
    }
  };

  const fetchIPInfo = async () => {
    try {
      const res = await fetch(`https://ipinfo.io/${ip}/json`);
      const data = await res.json();
      //   console.log(data);
      setCity(data?.city);
      localStorage.setItem("city", data?.city);
      navigate("/forecast");
    } catch (er) {
      //   console.log(er);
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-gray-200 text-gray-900 dark:bg-[#2b282e] p-2 lg:p-3 flex gap-3 items-center dark:text-white rounded-lg font-semibold shadow-md"
          onClick={getIP}
        >
          <FaLocationCrosshairs />
          <span>Weather at my location</span>
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default CurrentLocation;
