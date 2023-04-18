import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/19.jpg";
import CourseHero from "./CourseHero";
import { getCourses } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Courses() {

  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getCourses().then((res) => {
      console.log(res.data, "response from the geCourse api");
      setCourseList(res.data);
    });
  }, []);

  function viewDetails(courseId) {
    console.log(courseId, "view details trainer ");
    navigate("/course/details", { state: { courseId: courseId } });
  }

  return (
    <div className="bg-black w-full h-full">
      <CourseHero />
      <div className="container">
        <div className="section-title pt-10">
          <span className="text-gray-400 text-3xl ">Top Courses</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        {courseList?.map((val) => {
          return (
            <section className="choseus-section spad  flex flex-wrap">
              <div className="card card-compact bg-base-100 md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap ">
                <figure>
                  <img src={val.cover1} alt="Shoes" className="w-80 h-56" />
                </figure>
                <div className="card-body bg-black">
                  <h2 className="text-white card-title">{val.coursename}</h2>
                  <p className="text-white">Trainer : {val.trainerId.fname}</p>
                  <p className="text-white">Time : {val.timing}</p>
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
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
