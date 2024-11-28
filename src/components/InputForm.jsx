import React, { useState } from "react";

const InputForm = ({ calculateCarbonFootprint }) => {
  const [formData, setFormData] = useState({
    distance: "",
    riders: "",
    fuelType: "Petrol",
    traffic: "Light",
    idleTime: "",
    nighttime: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCarbonFootprint(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-md dark:bg-gray-800 dark:text-white"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block">Distance (km):</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block">Riders:</label>
          <input
            type="number"
            name="riders"
            value={formData.riders}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block">Fuel Type:</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="EV">EV</option>
          </select>
        </div>
        <div>
          <label className="block">Traffic:</label>
          <select
            name="traffic"
            value={formData.traffic}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
          >
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Heavy">Heavy</option>
          </select>
        </div>
        <div>
          <label className="block">Idle Time (minutes):</label>
          <input
            type="number"
            name="idleTime"
            value={formData.idleTime}
            onChange={handleChange}
            className="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="nighttime"
              checked={formData.nighttime}
              onChange={handleChange}
              className="mr-2"
            />
            Nighttime
          </label>
        </div>
      </div>
      <button type="submit" className="bg-gradient-to-r from-[#7F40F3] via-[#964DDF] to-[#DC74A7] text-white px-4 py-2 rounded w-full">
        Calculate
      </button>
    </form>
  );
};

export default InputForm;
