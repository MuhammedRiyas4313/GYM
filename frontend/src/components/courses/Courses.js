import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/19.jpg";
import CourseHero from "./CourseHero";
import { getCourses } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Courses() {

  const [courseList, setCourseList] = useState([]);
  const [mouseOver , setMouseOver] = useState('')
  const [courseCover , setCourseCover] = useState(false)
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

  function changeCover1(val){
    setMouseOver(val)
    setCourseCover(true)
  }

  function changeCover2(val){
    setMouseOver(val)
    setCourseCover(false)
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
        { courseList?.map((val) => {
          return (
            <section className="choseus-section spad  flex flex-wrap cursor-pointer mx-auto" >
              <div className="card card-compact bg-base-100 md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap" onMouseOver={()=>changeCover1(val._id)} onMouseLeave={()=>changeCover2(val._id)}>
                <figure>
                  <img src={ courseCover && mouseOver === val._id ? val.cover2 : val.cover1 } alt="Shoes" className="w-80 h-56" />
                </figure>
                <div className="card-body bg-black flex items-center">
                  <h2 className="text-white card-title">{val.coursename}</h2>
                  <p className="text-white">Trainer : {val.trainerId.fname}</p>
                  <p className="text-white">Fee : {val.charge} ₹</p>
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
