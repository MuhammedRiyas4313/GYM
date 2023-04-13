import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../../../axios/services/adminServices/adminServices";
import PdfViewer from "../pdfViewer/PdfViewer";
import { verifyTrainer } from "../../../axios/services/adminServices/adminServices";
import { toast } from "react-toastify";

function UserDetails() {
  const location = useLocation();
  const userId = location.state?.userId;

  const [userDetails, setUserDetails] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [urlFormated, setUrlFormated] = useState("");
  const [pdfFormated, setPdfFormated] = useState("");
  const [confirmationModalShow, setConfirmationModal] = useState(false);

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      console.log(res, "res from the getTrainerDetails.......");
      console.log("res.data from the getTrainerDetails.......");
      setUserDetails(res.data);
      const formatDate = new Date(res.data.createdAt);
      const formated = `${formatDate.getDate()}-${
        formatDate.getMonth() + 1
      }-${formatDate.getFullYear()}`;
      setFormattedDate(formated);
      //   const url = res.data.link;
      //   const Url = res.data.certificate;
      //   console.log(url, "url of the youtube vivdeppp");
      //   console.log(Url, "url of the certificate vivdeppp");
      //   const yUrl = url.replace(/"/g, "");
      //   const pdfUrl = Url.replace(/"/g, "");
      //   console.log(yUrl, "link of the yutube video converted");
      //   console.log(pdfUrl, "link of the certificate converted");
      //   setUrlFormated(yUrl);
      //   setPdfFormated(pdfUrl);
    });

    console.log(formattedDate, "formated date into dmy");
  }, []);

  function verificationTrainer() {
    setConfirmationModal(true);
    console.log("button clicked for the confirmation");
  }

  async function confirmation(val) {
    if (val) {
      const res = await verifyTrainer(userId);
      console.log(res.data.data, "verified Trainer..");
      if (res) toast.success(res.data.message);
      setUserDetails(res.data.data);
      const formatDate = new Date(res.data.data.createdAt);
      const formated = `${formatDate.getDate()}-${
        formatDate.getMonth() + 1
      }-${formatDate.getFullYear()}`;
      setFormattedDate(formated);
      const url = res.data.data.link;
      const Url = res.data.data.certificate;
      console.log(url, "url of the youtube vivdeppp");
      console.log(Url, "url of the certificate vivdeppp");
      const yUrl = url.replace(/"/g, "");
      const pdfUrl = Url.replace(/"/g, "");
      console.log(yUrl, "link of the yutube video converted");
      console.log(pdfUrl, "link of the certificate converted");
      setUrlFormated(yUrl);
      setPdfFormated(pdfUrl);
    }
  }

  return (
    <div>
      <div className="bg-gray-100 md:ml-60">
        <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-900">
          <h3 className="md:text-3xl text-2xl text-white font-bold p-3">
            Trainer Details
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
                <div className="image overflow-hidden flex align-middle justify-center">
                  <div class="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex align-middle justify-center">
                    <svg
                      class="absolute w-36 h-40 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
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
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{userDetails.lname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{userDetails.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{userDetails.phone}</div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Current Address</div>
                            <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Permanant Address</div>
                            <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                        </div> */}
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">{userDetails.dob}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2 overflow-hidden">
                        <a
                          className="text-blue-800 break-words"
                          href="mailto:jane@example.com"
                        >
                          {userDetails.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button
                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                    Full Information</button> */}
              </div>

              <div className="my-4"></div>

              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          class="h-5"
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
                      <span class="tracking-wide">Experience</span>
                    </div>
                    <ul class="list-inside space-y-2">
                      <li>
                        <div class="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div class="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div class="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div class="text-teal-600">
                          Owner at Her Company Inc.
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          class="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span class="tracking-wide">Education</span>
                    </div>
                    <ul class="list-inside space-y-2">
                      <li>
                        <div class="text-teal-600">
                          Masters Degree in Oxford
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div class="text-teal-600">
                          Bachelors Degreen in LPU
                        </div>
                        <div class="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* {!userDetails.isVerified ? (
                <button
                  onClick={verificationTrainer}
                  className="block w-full text-white text-sm font-semibold rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline focus:bg-blue-600 bg-blue-600 hover:shadow-xs p-3 my-4"
                >
                  Verify Trainer
                </button>
              ) : (
                <button className="block w-full text-white text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  bg-green-700  p-3 my-4 disabled:">
                  Verified Trainer
                </button>
              )} */}
            </div>
          </div>
          <div className="tablecontainer overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Start
                </th>
                <th scope="col" className="px-6 py-3">
                  End
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* <img
                        className="w-10 h-10 rounded-full"
                        src={userDetails.profile}
                        alt="Jese image"
                      ></img> */}
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                     Body Gaining
                    </div>
                    {/* <div className="font-normal text-gray-500">
                          {userDetails.email}
                        </div> */}
                  </div>
                </th>
                <td className="px-6 py-4">08-04-2023</td>
                <td className="px-6 py-4">08-05-2023</td>
                <td className=" text-center">
                 jhon wick
                </td>
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
                  {/* {userDetails.isBlocked ? (
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Block
                    </button>
                  )} */}
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
            </tbody>
          </table>
         </div>
        </div>
      </div>
      
    </div>
  );
}

export default UserDetails;
