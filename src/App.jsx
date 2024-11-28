import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";
import EcoImpactDashboard from "./components/EcoImpactDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const [results, setResults] = useState(null);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const calculateCarbonFootprint = (formData) => {
    const { distance, riders, fuelType, traffic, idleTime, nighttime } = formData;

    const baseEmissions = 251;
    const fuelAdjustment = fuelType === "Diesel" ? 1.15 : fuelType === "EV" ? 0 : 1;
    const trafficAdjustment = traffic === "Moderate" ? 1.1 : traffic === "Heavy" ? 1.2 : 1;
    const idleEmissions = idleTime ? idleTime * 10 : 0;
    const nighttimeAdjustment = nighttime ? 0.95 : 1;

    const totalEmissions =
      distance *
      baseEmissions *
      fuelAdjustment *
      trafficAdjustment *
      nighttimeAdjustment +
      idleEmissions;
    const savings = totalEmissions * (1 - 1 / riders);

    setResults({ totalEmissions, savings });
    setCumulativeData((prev) => [...prev, { totalEmissions, savings }]);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#7A3DF7]">RideBuddy Carbon Tracker</h1>
        <InputForm calculateCarbonFootprint={calculateCarbonFootprint} />
        <ResultsDisplay results={results} />
        <EcoImpactDashboard cumulativeData={cumulativeData} />
      </div>
    </div>
  );
};

export default App;
