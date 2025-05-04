import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export const BarChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB'
        }
      },
      title: {
        display: true,
        text: title,
        color: '#E5E7EB'
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF'
        },
        grid: {
          color: '#4B5563'
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF'
        },
        grid: {
          color: '#4B5563'
        }
      }
    }
  };

  return <Bar options={options} data={data} />;
};

export const PieChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB'
        }
      },
      title: {
        display: true,
        text: title,
        color: '#E5E7EB'
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB'
        }
      },
      title: {
        display: true,
        text: title,
        color: '#E5E7EB'
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF'
        },
        grid: {
          color: '#4B5563'
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF'
        },
        grid: {
          color: '#4B5563'
        }
      }
    }
  };

  return <Line options={options} data={data} />;
};