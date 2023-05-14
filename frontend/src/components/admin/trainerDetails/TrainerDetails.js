import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTrainerDetails } from "../../../axios/services/adminServices/adminServices";
import PdfViewer from "../pdfViewer/PdfViewer";
import VerificationModal from "./VerificationModal";
import { verifyTrainer } from "../../../axios/services/adminServices/adminServices";
import { toast } from "react-toastify";

function TrainerDetails() {

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const token = AdminDetails?.token 

  const location = useLocation();
  const trainerId = location.state?.trainerId;

  const [trainerDetails, setTrainerDetails] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const [urlFormated, setUrlFormated] = useState("");
  const [pdfFormated, setPdfFormated] = useState("");
  const [confirmationModalShow, setConfirmationModal] = useState(false);

  useEffect(() => {
    getTrainerDetails(token,trainerId).then((res) => {
      setTrainerDetails(res.data);
      const formatDate = new Date(res.data.createdAt);
      const formated = `${formatDate.getDate()}-${
        formatDate.getMonth() + 1
      }-${formatDate.getFullYear()}`;
      setFormattedDate(formated);
      const url = res.data.link;
      const Url = res.data.certificate;
      const yUrl = url.replace(/"/g, "");
      const pdfUrl = Url.replace(/"/g, "");
      setUrlFormated(yUrl);
      setPdfFormated(pdfUrl);
    });

  }, []);

  function verificationTrainer() {
    setConfirmationModal(true);
  }

  async function confirmation(val) {
    if (val) {
      const res = await verifyTrainer(token,trainerId);
      console.log(res.data.data, "verified Trainer..");
      if (res) toast.success(res.data.message);
      setTrainerDetails(res.data.data);
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
      <div className="bg-gray-100 md:ml-60 relative z-10">
        <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-900">
          <h3 className="md:text-3xl text-2xl text-white font-bold p-3">
            Trainer Details
          </h3>
        </div>
        {confirmationModalShow ? (
          <VerificationModal
            modalShow={setConfirmationModal}
            confirmation={confirmation}
          />
        ) : (
          <div></div>
        )}
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden flex align-middle justify-center">
                  <img
                    className="rounded w-52 h-72"
                    src={trainerDetails.profile}
                    alt="Extra large avatar"
                  ></img>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 mt-3 mb-3 flex justify-center uppercase">
                  {trainerDetails.fname}
                </h1>
                <h3 className="text-gray-600 font-lg text-center text-semibold leading-6">
                  Trainer at GYM FITNESS Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {trainerDetails.isVerified ? (
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Verified
                        </span>
                      ) : (
                        <span className="bg-red-600 py-1 px-2 rounded text-white text-sm">
                          Not Verified
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
                      <div className="px-4 py-2">{trainerDetails.fname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{trainerDetails.lname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{trainerDetails.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{trainerDetails.phone}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800 break-words">
                          {trainerDetails.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Date of Birth
                      </div>
                      <div className="px-4 py-2">{trainerDetails.dob}</div>
                    </div>
                  </div>
                </div>
                {/* <button
                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                    Full Information</button> */}
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-3 shadow-sm rounded-sm flex flex-wrap">
                <div className="flex flex-wrap justify-between">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
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
                        <iframe
                          className="w-full h-full"
                          src={urlFormated}
                          allow="autoplay ; encrypted-media ;"
                          allowFullScreen
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="md:ml-10 items-end">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
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
                      <span className="tracking-wide">Certificate</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div>
                          <PdfViewer url={pdfFormated} />
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Bachelors Degreen in LPU
                        </div>
                        <div className="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mb-10 p-20">
                {!trainerDetails.isVerified ? (
                  <button
                    onClick={verificationTrainer}
                    className=" text-white text-sm font-semibold rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline focus:bg-blue-600 bg-blue-600 hover:shadow-xs p-3 my-4"
                  >
                    Verify Trainer
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetails;
