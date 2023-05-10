import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseList from "./CourseList";
import { getUserCourseList } from "../../../axios/services/clientServices/clientServices";

function Courses() {

  const location = useLocation();
  const userId = location.state?.userId;

  const [courses, setCourses] = useState([]);
  const [cancelCourse, setCourseCancel] = useState(false)
  
  useEffect(() => {
    getUserCourseList(userId).then((res) => {
      console.log(res.data.courses, "ind user course list");
      setCourses(res.data.courses);
    });
  }, [cancelCourse]);


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
                
                <CourseList setCourseCancel={setCourseCancel} courses={courses} userId={userId} />
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
