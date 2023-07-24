import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ title, data }) => {
  return (
    <div className="doughnut-container">
      <div className="doughnut-title">
        <h3>{title}</h3>
      </div>
      <div className="doughnut-body">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default DoughnutChart;
