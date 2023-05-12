import React, { useEffect, useState } from 'react';
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
import { getUserProgress } from '../../../axios/services/trainerServices/trainerService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function ProgressChart({clientId,courseId}) {

  const [progress, setProgress] = useState([])

  useEffect(()=>{
    getUserProgress(clientId,courseId).then((res)=>{
      setProgress(res.data)
    })
  }, [])

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

 const labels = progress?.map(obj => obj.month)

 const data = {
  labels,
  datasets: [
    {
      label: 'Weight',
      data: progress?.map(obj => obj.weight),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Height',
      data:  progress?.map(obj => obj.height),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  return <Bar options={options} data={data} />;
}