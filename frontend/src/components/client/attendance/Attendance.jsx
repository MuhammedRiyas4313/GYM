import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAttendanceDetails } from "../../../axios/services/clientServices/clientServices";

function Attendance() {
  const location = useLocation();

  const [attdnce, setAttdnce] = useState([]);

  const clientId = location?.state.clientId;
  const courseId = location?.state.courseId;

  useEffect(() => {
    getAttendanceDetails(courseId, clientId).then((res) => {
      setAttdnce(res.data);
    });
  }, []);

  return (
    <div>
      <div>
        <div className="pb-10 mb-10">
          <div className="container">
            <div className="md:flex no-wrap md:-mx-2 pt-24 md:pt-24 md:p-10">
              <div className="w-full mx-2 h-64">
                <div className="bg-gray-100 shadow-sm rounded-sm md:p-2">
                  <div className="flex flex-wrap justify-between font-semibold text-gray-900">
                    <div className="flex justify-center align-middle font-bold text-3xl p-5">
                      Attendance
                    </div>
                  </div>
                </div>

                <div className="my-4"></div>

                <div className="bg-gray-100">
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full border">
                      <thead>
                        <tr>
                          <th>S.no</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attdnce.map((val,ind) => {
                          return (
                            <tr>
                              <th>{ind + 1}</th> 
                              <td>{val.date}</td>
                              <td>{val.status}</td>
                              <td>{val.reason}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Attendance;
