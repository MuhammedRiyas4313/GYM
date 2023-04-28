import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../../../axios/services/chat/trainerChat";

function ClientList({ clients }) {
  const navigate = useNavigate();

  const [client, setClient] = useState([]);
  const clientsLength = clients.length;

  const Trainer = useSelector((state) => state.trainerReducer.trainer);
  const trainerId = Trainer.trainer._id


  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  function viewDetails(clientId, courseId) {
    navigate("/trainer/client/details", { state: { clientId, courseId } });
  }

 async function message (clientId){
   const response = await createConversation(trainerId,clientId)
   console.log(response,'convo create')
    navigate('/trainer/chat',{state:{trainerId:trainerId,clientId:clientId}})
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Course Name</th>
            <th>joined</th>
            <th>Payment Status</th>
            <th>emergency Contact</th>
            <th>Slote</th>
            <th>Admission Status</th>
            <th>Attendance</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientsLength === 0 && (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="flex justify-center text-bold w-full">
                NO CLIENTS JOINED YET
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {clients?.map((val) => {
            return (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{val.user.fname}</div>
                      {/* <div classNameName="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{val.coursename}</td>
                <td>{val.joined}</td>
                <td>
                  {val.paymentStatus ? (
                    <div classNameName="badge bg-green-700">Completed</div>
                  ) : (
                    <div classNameName="badge bg-red-700">Pending</div>
                  )}
                </td>
                <td>{val.emergencyContact}</td>
                <td>{val.bookedSlote}</td>
                <td>
                  {val.status === "Active" ? (
                    <div className="flex justify-center">
                      <span className="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                        Canceled
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <button className="flex px-3 py-2 hover:bg-yellow-500 bg-yellow-400 mr-1 text-white font-semibold rounded">
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>

                    <span className="ml-1">Update⬇️</span>
                  </button>
                </td>
                <td>
                  <button className="flex px-3 py-2 bg-red-500 hover:bg-red-600 mx-1 my-1 text-white font-semibold rounded">
                    <span className="ml-1">🎥Video Call</span>
                  </button>
                  <button onClick={()=>message(val.user._id)} className="flex px-4 py-2 bg-red-500 hover:bg-red-600 mx-1 my-1 text-white font-semibold rounded">
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
                <th>
                  <button
                    onClick={() => viewDetails(val._id, val.courseId)}
                    className="btn btn-ghost bg-gray-500 hover:bg-gray-600 text-white btn-xs"
                  >
                    details
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ClientList;
