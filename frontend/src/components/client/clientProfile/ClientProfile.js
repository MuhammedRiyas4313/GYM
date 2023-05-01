import React, { useEffect, useState } from "react";
import "./ClientProfile.css";
import { getUserDetails } from "../../../axios/services/clientServices/clientServices";
import { useLocation, useNavigate } from "react-router-dom";
import userAvatar from "../../../assets/images/profileLogo.png";
import { useSelector } from "react-redux";

function ClientProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const User = useSelector((state) => state.userReducer.user);
  const userId = User.user._id;

  const [option, setOption] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  function options() {
    setOption((state) => !state);
    console.log(option, "option status....");
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  useEffect(() => {
    console.log("close dropdown");
  }, [option]);

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      console.log(res.data, "user details response from the backend");
      setUserDetails(res.data);
    });
  }, []);

  function message() {
    console.log("message calling");
    navigate("/client/chat", { state: { userId: userId } });
  }

  function videoCall() {
    console.log("video  calling");
    navigate('/client/videocall')
    
  }

  return (
    <div className="bg-white">
      <div className=" md:pt-12  ">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className=" w-full md:mx-2 md:mb-2">
            <div className="profileside bg-gray-400 p-5">
              <div className="flex flex-wrap justify-between p-5 bg-transparent mb-3"></div>
              <div className="image overflow-hidden flex flex-wrap align-middle justify-center ">
                <div className="w-full flex flex-wrap align-middle justify-center">
                  <div class="relative w-52 h-52 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  object-cover ">
                    <img src={userAvatar} alt="trainer profile" />
                  </div>
                </div>
                <div className="flex w-full md:w-1/3 justify-between">
                  <div className="flex flex-wrap justify-between mt-3 ">
                    <div className="rating">
                      <input
                        type=""
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type=""
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type=""
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type=""
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type=""
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                  </div>
                  <div className="flex mb-5" >
                    <div className="" onClick={videoCall}>
                      <label
                        tabIndex={0}
                        className="btn m-1 btn-circle swap swap-rotate bg-orange-500"
                      >
                        <svg
                          className="fill-current text-white"
                          width="32"
                          height="32"
                          viewBox="0 0 512 512"
                          enable-background="new 0 0 48 48"
                          id="Layer_1"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Layer_3">
                            <path
                              d="M0,109.7v292.6h402.3v-61.7L512,395.4V116.6l-109.7,54.9v-61.7H0z M36.6,146.3h329.1v219.4H36.6V146.3z M475.4,176v160l-73.1-36.6v-86.9L475.4,176z"
                              fill="#241F20"
                              className="fill-current text-white"
                            />
                          </g>
                        </svg>
                      </label>
                    </div>
                    <div className="flex" onClick={message}>
                      <label
                        tabIndex={0}
                        className="btn m-1 btn-circle p-2 bg-orange-500"
                      >
                        <svg
                          className="fill-current text-white"
                          width="32"
                          height="32"
                          viewBox="0 0 48 48"
                          enable-background="new 0 0 48 48"
                          id="Layer_1"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Layer_3">
                            <path
                              className="fill-current text-white"
                              d="M0,1.499v36h12.031V48l14.906-10.501H48v-36H0z M44,33.499H26.906L16,41.125v-3.75v-3.876H4v-28h40V33.499z   "
                              fill="#241F20"
                            />
                          </g>
                        </svg>
                      </label>
                    </div>
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
                        <div className="dropdownlist mt-10">
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a>Edit Profile</a>
                            </li>
                            <li>
                              <a>My wallet</a>
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

              <div className="flex justify-center details">
                <ul className="w-full p-5 bg-gray-200 text-gray-600 hover:text-gray-700 hover:shadow  rounded shadow-sm md:w-1/3 md:p-10">
                  <li className="flex items-center py-3">
                    <span>Name</span>
                    <span className="ml-auto font-bold uppercase">
                      {userDetails.fname}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Email</span>
                    <span className="ml-auto">{userDetails.email}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Phone</span>
                    <span className="ml-auto">{userDetails.phone}</span>
                  </li>
                  {/* <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    {true ? (
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-600 py-1 px-2 rounded text-white text-sm">
                        Blocked
                      </span>
                    )}
                  </span>
                </li> */}
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {formateDate(userDetails.createdAt)}
                    </span>
                  </li>
                  {/* <li className="flex items-center py-3">
                  <span>Active Courses</span>
                  <span className="ml-auto">04</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Active Clients</span>
                  <span className="ml-auto">15</span>
                </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
