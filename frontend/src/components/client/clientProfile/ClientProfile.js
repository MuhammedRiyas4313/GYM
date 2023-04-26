import React, { useEffect, useState } from "react";
import "./ClientProfile.css";
import { getUserDetails } from "../../../axios/services/clientServices/clientServices";
import { useLocation } from "react-router-dom";
import userAvatar from '../../../assets/images/profileLogo.png'
import { useSelector } from "react-redux";

function ClientProfile() {
  
  const location = useLocation();
  const User = useSelector((state) => state.userReducer.user);
  const userId = User.user._id ;

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

  function updataProfile() {
    console.log("updataProfile calling");
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
                  <div className="flex mb-5">
                    <div className="">
                      <label
                        tabIndex={0}
                        className="btn m-1 btn-circle swap swap-rotate bg-orange-500"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="-1.5 0 34 34"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="icons"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="ui-gambling-website-lined-icnos-casinoshunter"
                              transform="translate(-85.000000, -283.000000)"
                              fill="#252528"
                              fill-rule="nonzero"
                            >
                              <g
                                id="square-filled"
                                transform="translate(50.000000, 120.000000)"
                              >
                                <path
                                  className="fill-current text-white"
                                  d="M50.5,163 C52.3058348,163 53.792246,164.367615 53.9799976,166.123608 C55.2509455,164.813386 57.0304845,164 59,164 C62.8659932,164 66,167.134007 66,171 C66,174.170639 63.8919961,176.848928 61.0010432,177.709811 L61,186 L61.5,186 C63.4329966,186 65,187.567003 65,189.5 C65,191.432997 63.4329966,193 61.5,193 L55.6583461,193.000686 C54.8344797,195.330712 52.6121813,197 50,197 C47.3878187,197 45.1655203,195.330712 44.3416539,193.000686 L38.5,193 C36.5670034,193 35,191.432997 35,189.5 C35,187.567003 36.5670034,186 38.5,186 L39,186 L39,177 C39,172.336021 41.9026613,168.349994 46.0000384,166.749866 L46,166.5 C46,164.631437 47.4642776,163.104874 49.3079648,163.005179 L49.5,163 L50.5,163 Z M53.4642293,193.001109 L46.5357707,193.001109 C47.2275472,194.1961 48.5198932,195 50,195 C51.4801068,195 52.7724528,194.1961 53.4642293,193.001109 Z M61.5,188 L38.5,188 C37.6715729,188 37,188.671573 37,189.5 C37,190.328427 37.6715729,191 38.5,191 L61.5,191 C62.3284271,191 63,190.328427 63,189.5 C63,188.671573 62.3284271,188 61.5,188 Z M50,168 C45.1181973,168 41.1442086,171.886814 41.0038371,176.734638 L41,177 L41,186 L59,186 L59,178 L59,178 C55.1340068,178 52,174.865993 52,171 C52,170.065184 52.1832441,169.173167 52.5157721,168.357909 C51.7995338,168.148099 51.0448716,168.026408 50.2653623,168.003837 L50,168 Z M59,166 C56.2385763,166 54,168.238576 54,171 C54,173.761424 56.2385763,176 59,176 C61.7614237,176 64,173.761424 64,171 C64,168.238576 61.7614237,166 59,166 Z M50.5,165 L49.5,165 C48.7830092,165 48.1835122,165.503051 48.0352024,166.175458 C48.6737492,166.059923 49.3298767,166 50,166 C50.6701233,166 51.3262508,166.059923 51.9633166,166.174703 C51.8164878,165.503051 51.2169908,165 50.5,165 Z"
                                  id="notification"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </label>
                    </div>
                    <div className="flex">
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
                            <li onClick={updataProfile}>
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
