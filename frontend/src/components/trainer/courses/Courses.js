import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CourseList from "./CourseList";
import { getTrainerCourseList } from "../../../axios/services/trainerServices/trainerService";

function Courses() {

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
    getTrainerCourseList(trainerId).then((res) => {
      console.log(res.data, "ind trainer course list");
      setCourseList(res.data);
    });
  }, []);

  return (
    <div>
      <div className="pb-10 mb-10">
        <div className="container">
          <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
            <div className="w-full mx-2 h-64">
              <div className="bg-gray-100 shadow-sm rounded-sm md:p-2">
                <div className="flex flex-wrap justify-between font-semibold text-gray-900">
                <div className="flex justify-center align-middle font-bold text-3xl p-5">
                  Courses
                </div>
                  <div className="flex md:p-2">
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
                </div>
              </div>

              <div className="my-4"></div>

              <div className="bg-gray-100">
                <CourseList courseList={courseList} />
                {/* Course list table */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
