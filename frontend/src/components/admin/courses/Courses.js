import React, { useEffect, useState } from 'react'
import avatar1 from "../../../assets/images/avatars/1.jpg";
import { getCourses } from '../../../axios/services/adminServices/adminServices';

function Courses() {

  const [ courseList, setCourseList] = useState([])

  useEffect(()=>{
    getCourses().then((res)=>{
      console.log(res)
      setCourseList(res.data)
      console.log(res.data.trainerId,'trainer')
    })
  },[])

  function formatDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center md:justify-between p-6 bg-gray-900 dark:bg-gray-900 md:ml-64">
        <h3 className="md:text-3xl text-lg text-white font-bold">Courses</h3>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            required
          ></input>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md md:ml-64">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Started
              </th>
              <th scope="col" className="px-6 py-3">
                Charge/month
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                No.of Clients
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            { courseList?.map((val)=>{
              return(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={val.cover1}
                  alt="Jese image"
                ></img>
                <div className="pl-3">
                  <div className="text-base font-semibold">{val.coursename}</div>
                  <div className="font-normal text-gray-500">
                    {val.trainerId?.fname}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{val.charge} &nbsp; ₹</td>
              <td className="px-6 py-4">{formatDate(val.createdAt)}</td>
              <td className="px-6 py-4">{val.status}</td>
              <td className="px-6 py-4 text-center">
                0{val.clients?.length}
              </td>
              <td><button>Details</button></td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Courses
