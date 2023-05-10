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
import { getUsersCount } from '../../../axios/services/adminServices/adminServices';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export function RevanueChart() {

  const [userCount, setUserCount] = useState([])


  useEffect(()=>{
    getUsersCount().then((res)=>{
      setUserCount(res.data)
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

const labels = userCount.map((val)=>{
  return val._id
})

 const data = {
  labels,
  datasets: [
    {
      label: 'Monthly Admissions',
      data: userCount.map((val)=>{
        return val.count
      }),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data:  [1,2,3,5,1,2],
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};


  return <Bar options={options} data={data} />;
}