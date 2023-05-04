import React, { useEffect, useRef, useState } from "react";
import { getCourseDetails } from "../../axios/services/clientServices/clientServices";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./CourseDetails.css";
import { useSelector } from "react-redux";

function CourseDetails() {

  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState({});
  const [trainer, setTrainer] = useState({});
  const [option, setOption] = useState(false);
  const [slote,setSlote] = useState([])
  const [loged, setLoged] = useState('')

  const Location = useLocation();
  const viewTop = useRef()

  const courseId = Location.state?.courseId;

  const User = useSelector((state) => state.userReducer.user);
  const Trainer = useSelector((state) => state.trainerReducer.trainer);



  function enroll (){
    console.log('enroll fn calling.....')
    navigate('/enroll',{ state: { courseId: courseId } })
  }

  useEffect(() => {
    getCourseDetails(courseId).then((res) => {
      console.log(res, "res from the getcourseDetails api");
      setCourseDetails(res.data);
      setTrainer(res.data.trainerId);
      const allSlotes = res.data.availableSlots
      const slotes = allSlotes.filter((val)=> val.status === 'free')
      setSlote(slotes)
    });
    if (Trainer?.trainer) {
      setLoged('trainer');
      console.log(Trainer.trainer,"trainer loged");
    } else if (User?.user) {
      console.log(User.user,"user loged");
      setLoged('user');
    }
    viewTop?.current?.scrollIntoView()
  }, []);

  function options() {
    console.log(option, 'options calling')
    setOption(!option);
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  function viewTrainerDetails() {
    navigate("/trainer/details", { state: { trainerId: trainer._id } });
  }

  return (
    <div className="pb-10 mb-10" ref={viewTop}>
      <div className="container ">
        <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-gray-100 p-3">
              <div className="image overflow-hidden flex align-middle justify-center mt-10">
                <img
                  onClick={viewTrainerDetails}
                  className="rounded w-64 h-72 "
                  src={trainer.profile}
                  alt="Extra large avatar"
                ></img>
              </div>
              <h1 onClick={viewTrainerDetails} className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase cursor-pointer">
                {trainer.fname}
              </h1>
              <h3 className="text-gray-600 font-lg text-center text-semibold leading-6">
                Trainer at GYM FITNESS Company Inc.
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
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
                  <span className="ml-auto">
                  ⭐⭐⭐⭐ 
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {formateDate(trainer.createdAt)}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Email</span>
                  <span className="ml-auto break-words">{trainer.email}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Gender</span>
                  <span className="ml-auto">{trainer.gender}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-gray-100 p-3 shadow-sm rounded-sm md:p-10">
              <div className="flex items-center justify-between space-x-2 font-semibold text-gray-900  m-5">
                <div className="flex">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About Course</span>
                </div>
                {
                  loged === 'user' ? <div className="dropouter">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
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
                    { option ? (
                      <div className="dropdownlist">
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>Message</a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>:''
                }
                
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Course Name</div>
                    <div className="px-4 py-2">{courseDetails.coursename}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Start Date</div>
                    <div className="px-4 py-2">
                      {formateDate(courseDetails.createdAt)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">No.of Clients</div>
                    <div className="px-4 py-2">
                      {courseDetails.clients?.length}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Timing</div>
                    <div className="px-4 py-2">{courseDetails.timing}</div>
                  </div> */}
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Charge / Month
                    </div>
                    <div className="px-4 py-2">{courseDetails.charge} ₹</div>
                  </div>

                  {/* <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Current Address</div>
                            <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Permanant Address</div>
                            <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                        </div> */}
                </div>
              </div>
              {/* <button
                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                    Full Information</button> */}
            </div>

            <div className="my-4"></div>

            <div className="bg-gray-100">
              <div className=" font-semibold pt-10 px-10">Cover Photos</div>
              <div className="mb-5 flex flex-wrap bg-gray-100 p-10 justify-around">
                <div className="image overflow-hidden flex align-middle justify-center">
                  <img
                    className="rounded w-96 h-96 object-cover"
                    src={courseDetails.cover1}
                    alt="Extra large avatar"
                  ></img>
                </div>
                <div className="image overflow-hidden flex align-middle justify-center">
                  <img
                    className="rounded w-96 h-96 object-cover"
                    src={courseDetails.cover2}
                    alt="Extra large avatar"
                  ></img>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-10 shadow-sm rounded-sm flex flex-wrap justify-around ">
              <div className="flex flex-wrap justify-between">
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
                    <span className="tracking-wide">
                      Training Session Video
                    </span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <video
                        src={courseDetails.introVideo}
                        loop
                        muted
                        controls
                        className=" z-10 w-96 h-52 bg-black"
                      ></video>
                    </li>
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
                      <div className="px-4 py-2">
                        {courseDetails.description}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
           {
            loged === 'user' ?  <div className="flex justify-end mt-5 mb-5 bg-gray-100 p-10">
            {
              slote.length === 0 ? <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" disabled>
              No more Slotes available for this month
            </button>: courseDetails.status === 'Active' ? <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={enroll}>
              Enroll Now
            </button>:<div className="badge-warning md:p-5 rounded break-words text-black">
                  Thank you for your interest in our course. We're sorry to hear that you were unable to enroll at this time. &nbsp;&nbsp;➡️
                  </div>
            }
          </div>:''
           }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
