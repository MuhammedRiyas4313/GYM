import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getPresentCount } from '../../../axios/services/adminServices/adminServices';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PaymentChart(){

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const adminId = AdminDetails?.admin?._id
  const token = AdminDetails?.token
 
  const [presentCount, setPresentCount] = useState([])

  useEffect(()=>{
    getPresentCount(token).then((res)=>{
      setPresentCount(res?.data)
    })
  }, [])
  
 const data = {
    labels: ['Absent', 'Present'],
  datasets: [
    {
      label: '# of Votes',
      data: presentCount?.map((val)=>{
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