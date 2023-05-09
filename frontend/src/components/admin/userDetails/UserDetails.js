import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../../../axios/services/adminServices/adminServices";
import avatar from "../../../assets/images/profileLogo.png";
import { toast } from "react-toastify";

function UserDetails() {
  const location = useLocation();
  const userId = location.state?.userId;

  const [userDetails, setUserDetails] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [ courses, setCourses] = useState([])


  // const [urlFormated, setUrlFormated] = useState("");
  // const [pdfFormated, setPdfFormated] = useState("");
  // const [confirmationModalShow, setConfirmationModal] = useState(false);

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      setUserDetails(res.data);
     setCourses(res.data?.courses)
    });
  }, []);

  return (
    <div>
      <div className="bg-gray-100 md:ml-60">
        <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-900">
          <h3 className="md:text-3xl text-2xl text-white font-bold p-3">
            User Details
          </h3>
        </div>
        {/* { confirmationModalShow ? <VerificationModal
      modalShow ={setConfirmationModal}
      confirmation = {confirmation}
      />:<div></div>} */}
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2 md:mb-2">
              <div className="bg-white p-3">
                <div className="image overflow-hidden object-cover flex justify-center">
                  <div class="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                    <img
                      src={userDetails?.profile ? userDetails?.profile : avatar}
                      alt="User profile"
                    ></img>
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase">
                  {userDetails.fname}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  User at GYM FITNESS Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 p-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {!userDetails.isBlocked ? (
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-600 py-1 px-2 rounded text-white text-sm">
                          Blocked
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{formattedDate}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm md:p-10">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
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
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{userDetails.fname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{userDetails.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{userDetails.phone}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">{userDetails.dob}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2 overflow-hidden">
                        <a
                          className="text-blue-800 truncate"
                          href="mailto:jane@example.com"
                        >
                          {userDetails.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>

              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="">
                 <h2 class="text-lg font-semibold leading-tight py-5 px-5 bg-gray-200 text-center">Courses</h2>
                  <div className=" overflow-x-auto shadow-md">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-500">
                      <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Course Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Joined
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Trainer Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Payment Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Fee/month
                          </th>
                          <th scope="col" className="px-6 py-3">
                            View Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {
                          courses?.map((course)=>{
                            return (
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="pl-3">
                              <div className="text-base font-semibold">
                                {course.coursename}
                              </div>
                            </div>
                          </th>
                          <td className="px-6 py-4">08-04-2023</td>
                          <td className="px-6 py-4">08-05-2023</td>
                          <td className=" text-center">jhon wick</td>
                          <td className=" text-center">
                            {!userDetails.isBlocked ? (
                              <div>
                                <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                                  Completed
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                                  Blocked
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            1200/-
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline border-0"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                    { courses.length === 0 && <div className="text-gray-600 md:text-3xl text-sm md:p-5 p-2 flex justify-center bg-gray-400 font-extrabold"> No courses </div>}
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

export default UserDetails;
