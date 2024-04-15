"use client";

import { MdLightMode, MdDarkMode } from "react-icons/md";

import { useTheme } from "next-themes";

const DarkModeSwitch = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      className=" me-3 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      {currentTheme === "dark" ? (
        <MdLightMode className="h-6 w-6 " onClick={()=>setTheme('light')} />
      ) : (
        <MdDarkMode className="h-6 w-6 " onClick={()=>setTheme('dark')}  />
      )}
    </button>
  );
};

export default DarkModeSwitch;
