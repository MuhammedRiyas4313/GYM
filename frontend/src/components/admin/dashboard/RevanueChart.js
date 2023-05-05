import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function RevanueChart() {

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Auguest', 'Septemper', 'October', 'November', 'December'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,5,1,2],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data:  [1,2,3,5,1,2],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


  return <Bar options={options} data={data} />;
}