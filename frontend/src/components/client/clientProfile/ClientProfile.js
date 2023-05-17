import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../axios/services/clientServices/clientServices";
import userAvatar from "../../../assets/images/profileLogo.png";
import EditProfilePicture from "./EditProfilePicture";
import EditProfile from "./EditProfile";
import "./ClientProfile.css";

function ClientProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const User = useSelector((state) => state.userReducer.user);
  const userId = User.user._id;
  const token = User.token;

  const [option, setOption] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [updateProfileImage, setUpdateProfileImage] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  function options() {
    setOption((state) => !state);
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  useEffect(() => {
    console.log("ClientProfile");
  }, [option, updateProfileImage, userDetails, updateProfile]);

  useEffect(() => {
    getUserDetails(token,userId).then((res) => {
      setUserDetails(res?.data);
    });
  }, []);

  function message() {
    navigate("/client/chat", { state: { userId: userId } });
  }
  function wallet() {
    navigate("/wallet", { state: { userId: userId } });
  }

  function courses() {
    navigate("/client/courses", { state: { userId: userId } });
  }

  return (
    <div className="bg-white">
      {updateProfile ? (
        <EditProfile
          token={token}
          setUserDetails={setUserDetails}
          setUpdateProfile={setUpdateProfile}
          userDetails={userDetails}
        />
      ) : (
        <div></div>
      )}
      {updateProfileImage ? (
        <EditProfilePicture
          token={token}
          userId={userId}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setUpdateProfileImage={setUpdateProfileImage}
        />
      ) : (
        <div></div>
      )}
      <div className=" md:pt-12  ">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className=" w-full md:mx-2 md:mb-2">
            <div className="profileside bg-gray-400 p-5">
              <div className="flex flex-wrap justify-between p-5 bg-transparent mb-3"></div>
              <div className="image overflow-hidden flex flex-wrap align-middle justify-center ">
                <div className="w-full flex flex-wrap align-middle justify-center">
                  <div
                    onClick={() => {
                      setUpdateProfileImage((state) => !state);
                    }}
                    class="relative w-52 h-52 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  object-cover "
                  >
                    <img
                      src={
                        userDetails?.profile ? userDetails?.profile : userAvatar
                      }
                      alt="trainer profile"
                      className="hover:tooltip-bottom"
                      title="Update Profile Photo"
                    />
                  </div>
                </div>
                <div className="flex w-full md:w-1/3 justify-end">
                  <div className="flex mb-5">
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
                            <li
                              onClick={() => {
                                setUpdateProfile((state) => !state);
                              }}
                            >
                              <a>Edit Profile</a>
                            </li>
                            <li onClick={wallet}>
                              <a>My wallet</a>
                            </li>
                            <li onClick={courses}>
                              <a>My Courses</a>
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
                    <span className="ml-auto">{userDetails?.email}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Phone</span>
                    <span className="ml-auto">{userDetails?.phone}</span>
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
                      {formateDate(userDetails?.createdAt)}
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
