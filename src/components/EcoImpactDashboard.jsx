import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const EcoImpactDashboard = ({ cumulativeData }) => {
  const barData = {
    labels: cumulativeData.map((_, index) => `Trip ${index + 1}`),
    datasets: [
      {
        label: "Carbon Savings (g)",
        data: cumulativeData.map((item) => item.savings),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Total Emissions", "Carbon Savings"],
    datasets: [
      {
        data: cumulativeData.reduce(
          (acc, item) => [acc[0] + item.totalEmissions, acc[1] + item.savings],
          [0, 0]
        ),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="charts-section mt-4">
      <div className="bg-gray-100 p-4 rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-bold text-white">Bar Chart</h2>
        <Bar data={barData} options={{ responsive: true }} />
      </div>
      <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-white">Pie Chart</h2>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default EcoImpactDashboard;
