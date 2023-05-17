import React, { useEffect, useState } from "react";
import { getTrainers,changeBlockStatus } from "../../../axios/services/adminServices/adminServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../../../axios/services/chat/adminChat";
import { useSelector } from "react-redux";

function TrainersTable() {

  const [trainersList, setTrainersList] = useState([]);
  const [trainerBlockStatus, setTrainerBlockStatus] = useState(false)
  
  const navigate = useNavigate()

  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  const adminId = AdminDetails?.admin?._id
  const token = AdminDetails?.token

  useEffect(() => {
   getTrainers(token).then((response)=>{
    setTrainersList(response?.data)
   })
  }, [trainerBlockStatus]);

  async function blockStatus(currentStatus,trainerId){
    
    const response = await changeBlockStatus(currentStatus,trainerId)
    toast.success(response?.data?.message)
    setTrainerBlockStatus(!trainerBlockStatus)

  }

  function viewDetails(trainerId){
    console.log(trainerId,'view details trainer ')
    navigate('/admin/trainerdetails', { state: { trainerId: trainerId } });
  }

  function formateDate(date){
    const formatDate = new Date(date)
    const formated = `${formatDate.getDate()}-${formatDate.getMonth() + 1}-${formatDate.getFullYear()}`
    console.log('formate date is calling.....')
    return formated
  }

  async function message (trainerId){
    const response = await createConversation(adminId,trainerId)
     navigate('/admin/chat',{state:{trainerId:trainerId,adminId:adminId}})
   }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center md:justify-between p-6 bg-gray-900 dark:bg-gray-900 md:ml-64">
        <h3 className="md:text-3xl text-lg text-white font-bold">Trainers</h3>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            required
          ></input>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md md:ml-64">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Verification Status
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
              <th scope="col" className="px-6 py-3">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {trainersList ? (
              trainersList?.map((val) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={val.profile}
                        alt=" trainer image"
                      ></img>
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {val.fname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {val.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{formateDate(val.createdAt)}</td>
                    <td className="px-6 py-4">{val.gender}</td>
                    <td className=" text-center">
                      {val.isVerified ? (
                        <div>
                          <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                            Not Verified
                          </span>
                        </div>
                      )}
                    </td>
                    <td className=" text-center">
                      {!val.isBlocked ? (
                        <div>
                          <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                            Active
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

                  <button onClick={()=>message(val._id)} className="flex px-4 py-2 bg-red-500 hover:bg-red-600 mx-1 my-1 text-white font-semibold rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>

                    <span className="ml-1">Message</span>
                  </button>
                    </td>
                    <td className="px-6 py-4">
                    <button type="button" onClick={()=>{viewDetails(val._id)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline border-0">View Details</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrainersTable;
