import React from "react";
import Logo from './Logo/Logo'
const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-[#7F40F3] via-[#964DDF] to-[#DC74A7] text-white">
      <div className="flex items-center jusify-between"><Logo/><h2 className="text-lg font-bold">RideBuddy</h2></div>
      <label className="flex items-center space-x-2">
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        <input
          type="checkbox"
          onChange={toggleDarkMode}
          checked={darkMode}
          className="toggle-checkbox hidden"
        />
        <div
          className={`toggle-switch ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } w-12 h-6 rounded-full relative cursor-pointer`}
        >
          <div
            className={`dot ${
              darkMode ? "bg-white translate-x-6" : "bg-[#7F40F3]"
            } w-6 h-6 rounded-full absolute top-0 left-0 transition-transform`}
          ></div>
        </div>
      </label>
    </nav>
  );
};

export default Navbar;
