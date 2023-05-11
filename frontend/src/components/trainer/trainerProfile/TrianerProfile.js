import React, { useEffect, useState } from "react";
import "./TrainerProfile.css";
import { getTrainerDetails } from "../../../axios/services/trainerServices/trainerService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EditProfile from "./EditProfile";
import EditProfilePicture from "./EditProfilePicture";

function TrianerProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [option, setOption] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState({});
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

  useEffect(() => {}, [option]);

  const trainer = useSelector((state) => state.trainerReducer.trainer);
  let trainerId = trainer.trainer._id;
  // let train =  location.state?.trainerId;

  useEffect(() => {
    getTrainerDetails(trainerId).then((res) => {
      setTrainerDetails(res.data);
    });
  }, []);

  function courses() {
    navigate("/trainer/courses", { state: { trainerId: trainerId } });
  }

  function clients() {
    navigate("/trainer/clients", { state: { trainerId: trainerId } });
  }

  function message() {
    navigate("/trainer/chat", { state: { trainerId: trainerId } });
  }

  function wallet() {
    navigate('/wallet', { state: { userId: trainerId } })
  }

  return (
    <div className="bg-white">
      {updateProfile ? (
        <EditProfile
          setTrainerDetails={setTrainerDetails}
          setUpdateProfile={setUpdateProfile}
          trainerDetails={trainerDetails}
        />
      ) : (
        <div></div>
      )}
      {updateProfileImage ? (
        <EditProfilePicture
          trainerId={trainerId}
          trainerDetails={trainerDetails}
          setTrainerDetails={setTrainerDetails}
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
                    class="relative w-52 h-52 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  object-cover"
                  >
                    <img
                      src={trainerDetails?.profile}
                      alt="trainer profile"
                      className="hover:tooltip-bottom"
                      title="Update Profile Photo"
                    />
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
                            <li onClick={courses}>
                              <a>Courses</a>
                            </li>
                            <li onClick={clients}>
                              <Link>Clients</Link>
                            </li>
                            <li
                              onClick={() => {
                                setUpdateProfile((state) => !state);
                              }}
                            >
                              <a>Edit Profile</a>
                            </li>
                            <li>
                              <Link to="/trainer/addcourse">Add course</Link>
                            </li>
                            <li
                            onClick={wallet}
                            >
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
                      {trainerDetails?.fname}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Email</span>
                    <span className="ml-auto truncate">{trainerDetails.email}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Phone</span>
                    <span className="ml-auto">{trainerDetails.phone}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Designation</span>
                    <span className="ml-auto">Trainer</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {formateDate(trainerDetails.createdAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrianerProfile;
