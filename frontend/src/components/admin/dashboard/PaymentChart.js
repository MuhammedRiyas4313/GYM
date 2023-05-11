import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getPresentCount } from '../../../axios/services/adminServices/adminServices';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PaymentChart(){
 
  const [presentCount, setPresentCount] = useState([])

  useEffect(()=>{
    getPresentCount().then((res)=>{
      setPresentCount(res.data)
      console.log(res.data,'res.data from the getpresent count')
    })
  }, [])
  
 const data = {
    labels: ['Absent', 'Present'],
  datasets: [
    {
      label: '# of Votes',
      data: presentCount.map((val)=>{
        return val.count
      }),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',   
        'rgba(54, 162, 235, 0.2)'  ,
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
 }
  return <Doughnut data={data} />;
}