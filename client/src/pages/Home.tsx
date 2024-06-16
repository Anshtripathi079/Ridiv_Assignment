import { useState } from "react";
import rainy from "/rainy.svg";
import sun from "/sunbg.png";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import CurrentLocation from "../components/CurrentLocation";
import Favorites from "../components/Favorites";

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCity(search);
      localStorage.setItem("city", search);
      setSearch("");
      navigate("/forecast");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col justify-between items-center md:flex-row p-4">
        <div className="flex justify-between w-full flex-col md:flex-row items-center gap-6 md:gap-0">
          <div className="flex md:gap-2 justify-center items-center">
            <Link to="/">
              <span className="text-xl font-bold">RiDiv.Weather</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:flex-row flex-col">
            <div className="flex gap-4">
              <Favorites />
              <ThemeToggle />
            </div>
            <CurrentLocation setCity={setCity} />
          </div>
        </div>
      </div>
      <div className="flex  justify-center items-center flex-col gap-6 relative mt-2 xl:mt-[15rem]">
        <div className="text-3xl font-bold">
          {city ? "Enter city Name" : "Enter City Name"}
        </div>
        <div className="mr-6  bg-white dark:bg-[#2b282e] rounded-lg w-[250px] lg:w-[300px] xl:w-[600px] max-w-[600px] shadow-md flex items-center p-3 relative">
          <input
            type="text"
            placeholder="Search place"
            className="bg-transparent border-none focus:outline-none mr-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <span>
            <FaSearch
              onClick={() => {
                setCity(search);
                localStorage.setItem("city", search);
                setSearch("");
                navigate("/forecast");
              }}
              className="cursor-pointer"
            />
          </span>
          <img
            src={rainy}
            alt=""
            className="absolute -top-60 h-40 w-40 -left-10 xl:-top-64 xl:-left-32 xl:h-44 xl:w-44"
          />
          <img
            src={sun}
            alt=""
            className="absolute -top-64  -right-14 md:-right-28 xl:-right-32 h-44 w-44"
          />
        </div>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
