import React from "react";
import { CChart } from "@coreui/react-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LabelBarChart = ({ labelData }) => {
  const labels = [];
  const percentages = [];

  if (labelData) {
    Object.values(labelData).forEach((item) => {
      labels.push(item.name);
      percentages.push(item.percent);
    });
  }

  const pastelColors = ["#FFB3C1", "#A8D8FF", "#FFF3B0", "#B2F7EF", "#D3C0F9"];

  const data = {
    labels,
    datasets: [
      {
        label: "Proportion (%)",
        data: percentages,
        backgroundColor: pastelColors.slice(0, labels.length),
        borderColor: labels.map(() => "#000000"),
        borderWidth: 1.5,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter",
            size: 18,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: "Percentage (%)",
          font: {
            family: "Inter",
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Labels",
          font: {
            family: "Inter",
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 className="label-chart-title">Label Distribution</h3>
      <CChart type="bar" data={data} options={options} />
    </div>
  );
};

export default LabelBarChart;
