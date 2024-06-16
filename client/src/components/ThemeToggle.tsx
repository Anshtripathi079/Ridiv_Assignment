// src/components/ThemeToggle.js
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme }: any = useContext(ThemeContext);

  return (
    <div
      className="rounded-full dark:bg-gray-800 bg-gray-200 flex items-center justify-center w-12 h-12 cursor-pointer shadow-md"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-2xl " />
      ) : (
        <MdOutlineDarkMode className="text-2xl " />
      )}
    </div>
  );
};

export default ThemeToggle;
