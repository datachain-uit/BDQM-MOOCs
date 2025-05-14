import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết cho Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LabelBarChart = () => {
  const data = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
  {
    label: 'Proportion(%)',
    data: [10, 20, 30, 25, 15],
    backgroundColor: [
      '#FFB3C1', // Hồng pastel
      '#A8D8FF', // Xanh dương pastel
      '#FFF3B0', // Vàng pastel
      '#B2F7EF', // Xanh ngọc pastel
      '#D3C0F9', // Tím pastel
    ],
    borderColor: [
      '#000000', // Viền đen cho tất cả cột
      '#000000',
      '#000000',
      '#000000',
      '#000000',
    ],
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
        position: 'top',
        labels: {
          font: {
            family: 'Inter',
            size: 18,
            weight: 'bold',
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
        ticks: {
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            family: 'Inter',
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Labels',
          font: {
            family: 'Inter',
            size: 14,
            weight: 'bold',
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
