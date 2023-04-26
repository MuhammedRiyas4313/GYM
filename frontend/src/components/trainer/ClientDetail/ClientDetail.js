import React, { useEffect, useState } from "react";
import { getClientDetails } from "../../../axios/services/trainerServices/trainerService";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Avatar from "../../../assets/images/profileLogo.png";
import { useSelector } from "react-redux";
import BarChart, { ProgressChart } from "./ProgressChart";

function ClientDetail() {
  const navigate = useNavigate();
  const [clientDetails, setClientDetails] = useState({});
  const [client, setClient] = useState({});
  const [course, setCourse] = useState({});
  const [option, setOption] = useState(false);

  const Location = useLocation();
  const clientId = Location.state?.clientId;
  const courseId = Location.state?.courseId;

  console.log(clientId, courseId, "clientId and courseId from navigate");

  const User = useSelector((state) => state.userReducer.user);
  const Trainer = useSelector((state) => state.trainerReducer.trainer);

  function enroll() {
    // console.log('enroll fn calling.....')
    // navigate('/enroll',{ state: { courseId: courseId } })
  }

  useEffect(() => {
    getClientDetails(clientId,courseId).then((res) => {
      console.log(res, "res from the getcourseDetails api");
      setClientDetails(res.data?.clientDetails?.clients[0]);
      setClient(res.data?.clientDetails?.clients[0]?.user);
      setCourse(res.data.course);
    });
  }, []);

  function options() {
    console.log(option, "options calling");
    setOption(!option);
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;

    return formated;
  }

  return (
    // <div><h1 className="text-black flex w-full h-screen justify-center items-center">Client details</h1></div>
    <div className="pb-10 mb-10">
      <div className="container ">
        <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-gray-100 p-3">
              <div className="image overflow-hidden flex align-middle justify-center mt-10">
                <img
                  className="rounded w-32 h-32 "
                  src={Avatar}
                  alt="Extra large avatar"
                ></img>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase">
                {client.fname}
              </h1>
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
                  <span>Member since</span>
                  <span className="ml-auto">{formateDate(client.createdAt)}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Email</span>
                  <span className="ml-auto break-words">{client.email}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Gender</span>
                  <span className="ml-auto">{client.gender}</span>
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
                  <span className="tracking-wide">Details</span>
                </div>
                <div className="dropouter">
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
                    {option ? (
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
                </div>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Course Name</div>
                    <div className="px-4 py-2">{course.coursename}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Joined</div>
                    <div className="px-4 py-2">{clientDetails.joined}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Slote</div>
                    <div className="px-4 py-2">{clientDetails.bookedSlote}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Emergency Contact</div>
                    <div className="px-4 py-2">
                      {clientDetails.emergencyContact}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Health info</div>
                    <div className="px-4 py-2">
                      {clientDetails.healthInfo}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Timing</div>
                    <div className="px-4 py-2">{courseDetails.timing}</div>
                  </div> */}
                  {/* <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Charge / Month
                    </div>
                    <div className="px-4 py-2">{courseDetails.charge} ₹</div>
                  </div> */}

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
              <div className=" font-semibold pt-10 px-10 flex justify-center mb-2">Progress Chart</div>
              <hr />
              <div className="mb-5 flex w-full justify-center h-96 flex-wrap bg-gray-100 p-5">

                 <ProgressChart/>
                
              </div>
            </div>

            <div className="bg-gray-100 p-10 shadow-sm rounded-sm flex flex-wrap justify-around ">
            <div className=" font-semibold pt-10 px-10 flex justify-center mb-2">Attendance Details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
