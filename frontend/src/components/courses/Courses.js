import React, { useEffect, useRef, useState } from "react";
import CourseHero from "./CourseHero";
import { getCourses, searchCourses } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Courses() {

  const viewCourses = useRef();
  const searchInp = useRef();

  const [courseList, setCourseList] = useState([]);
  const [mouseOver, setMouseOver] = useState("");
  const [courseCover, setCourseCover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then((res) => {
      const coursesList = res.data.filter((obj) => obj.status === "Active");
      setCourseList(coursesList);
    });
    setTimeout(() => {
      viewCourses?.current?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  }, []);

  function viewDetails(courseId) {
    console.log(courseId, "view details trainer ");
    navigate("/course/details", { state: { courseId: courseId } });
  }

  function changeCover1(val) {
    setMouseOver(val);
    setCourseCover(true);
  }

  function changeCover2(val) {
    setMouseOver(val);
    setCourseCover(false);
  }

async function search(){
  const data = searchInp.current.value
  console.log(data,'search.....')
  const response = await searchCourses(data)
  console.log(response.data,'search.....')
  searchInp.current.focus()
  const coursesList = response.data.filter((obj) => obj.status === "Active");
  setCourseList(coursesList);
}

  return (
    <div className="bg-black w-full h-full">
      <CourseHero ref={viewCourses} />
      <div className="pt-20" ref={viewCourses}></div>
      <div className="container">
        <div className="section-title p-5 flex justify-around align-middle  bg-gray-900">
          <span className="text-gray-400 text-3xl ">Top Courses</span>
          <div className="flex items-center">
            <div className="flex space-x-1">
              <input
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
                ref={searchInp}
                onKeyUp={search}
              />
              <button className="px-4 text-white bg-orange-500 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
      { courseList?.length === 0 && <div className="flex justify-center items-center w-full h-72 text-gray-400 text-3xl uppercase"> No course Found</div>}
        {courseList?.map((val) => {
          return (
            <section className="choseus-section spad  flex flex-wrap cursor-pointer mx-auto">
              <div
                className="card card-compact bg-base-100 md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap"
                onMouseOver={() => changeCover1(val._id)}
                onMouseLeave={() => changeCover2(val._id)}
              >
                <figure>
                  <img
                    src={
                      courseCover && mouseOver === val._id
                        ? val.cover2
                        : val.cover1
                    }
                    alt="Shoes"
                    className="w-80 h-80 object-cover"
                  />
                </figure>
                <div className="card-body bg-black flex ">
                  <div className="flex justify-center">
                    <h2 className="text-white card-title">{val.coursename}</h2>
                  </div>
                  <div className="flex justify-between p-5">
                    <div>
                      <p className="text-white">
                        Trainer : {val.trainerId.fname}
                      </p>
                      <p className="text-white">Fee : {val.charge} ₹</p>
                    </div>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => viewDetails(val._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
