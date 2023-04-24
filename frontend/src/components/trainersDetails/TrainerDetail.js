import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getTrainerDetails,
  getTrainerCourseList,
} from "../../axios/services/clientServices/clientServices";
import TrainerCourseList from "./TrainerCourseList";

function TrainerDetail() {
  
  const location = useLocation();
  const trainerId = location.state?.trainerId;

  const [option, setOption] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState({});
  const [courseList, setCourseList] = useState([]);

  function options() {
    setOption((state) => !state);
    console.log(option, "option status....");
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    console.log("formate date is calling.....");
    return formated;
  }

  useEffect(() => {
    console.log("close dropdown");
  }, [option]);

  useEffect(() => {
    getTrainerDetails(trainerId).then((res) => {
      console.log(res, "response from the backend");
      setTrainerDetails(res.data);
    });
    getTrainerCourseList(trainerId).then((res) => {
      console.log(res.data, "ind trainer course list");
      setCourseList(res.data);
    });
  }, []);

  function Courses() {
    console.log("courses calling");
  }

  return (
    <div>
      <div className="pb-10 mb-10">
        <div className="container ">
          <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-gray-100 p-3">
                <div className="image overflow-hidden flex align-middle justify-center mt-10">
                  <img
                    className="rounded w-64 h-72 "
                    src={trainerDetails.profile}
                    alt="Extra large avatar"
                  ></img>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase">
                  {trainerDetails.fname}&nbsp;{trainerDetails.lname}
                </h1>
                <h3 className="text-gray-600 font-lg text-center text-semibold leading-6">
                  Trainer at GYM FITNESS Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  {/* <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                    </span>
                  </li> */}
                  <li className="flex items-center py-3">
                    <span>Rating </span>
                    <span className="ml-auto">⭐⭐⭐⭐</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{formateDate(trainerDetails.createdAt)}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span className="mr-5">Email</span>
                    <span className="ml-auto break-words">{trainerDetails.email}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Gender</span>
                    <span className="ml-auto">{trainerDetails.gender}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-gray-100 shadow-sm rounded-sm md:p-5">
                <div className="flex flex-wrap justify-around font-semibold text-gray-900">
                  <div className="flex">
                    <input type="text" placeholder="Search" className="input" />
                    <button className="btn btn-ghost btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="dropouter flex justify-end">
                    <div className="dropdown md:dropdown-end  ">
                      <label
                        tabIndex={1}
                        className="btn m-1 btn-circle swap swap-rotate bg-orange-500"
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          onClick={options}
                        />

                        <svg
                          className="swap-off fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 512 512"
                        >
                          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>

                        <svg
                          className="swap-on fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 512 512"
                        >
                          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                      </label>
                      {option ? (
                        <div className="dropdownlist">
                          <ul
                            tabIndex={1}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a className="text-black">Message</a>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>

              <div className="bg-gray-100">
                <div className="flex justify-center align-middle font-bold text-3xl p-5">
                  Courses
                </div>

                <TrainerCourseList courseList={courseList} />
                {/* Course list table */}
              </div>

              <div className="bg-gray-100 p-10 shadow-sm rounded-sm flex flex-wrap justify-around mt-5">
                <div className="flex flex-wrap justify-between">
                  <div className="">
                    <div className="space-x-2 font-semibold text-gray-900 leading-8 mb-3 flex flex-wrap">
                      <h1>More details........</h1>
                    </div>
                    <ul className="list-inside space-y-2">
                      <p>Loading......</p>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between mt-5">
                  <div className="">
                    <div className="space-x-2 font-semibold text-gray-900 leading-8 mb-3 flex flex-wrap">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Description</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="px-4 py-2">description</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetail;
