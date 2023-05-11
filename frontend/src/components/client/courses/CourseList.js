import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelationModal from "./CancelationModal";

function CourseList({ courses, userId, setCourseCancel }) {

  const navigate = useNavigate();

  const [cancelation, setCancelation] = useState(false);
  const [courseId, setCourseId] = useState('');

  const courseLength = courses.length;

  function cancelMembership(courseId){
    setCourseId(courseId)
    setCancelation(state => !state)
  }

  function viewDetails(courseId) {
    navigate("/course/details", { state: { courseId: courseId } });
  }

  function viewAttendanceDetails(courseId) {
    navigate("/attendance/client", { state: { courseId: courseId ,clientId: userId} });
  }

  return (
    <div className="overflow-x-auto w-full">
        {
            cancelation ? <CancelationModal setCourseCancel={setCourseCancel} userId={userId} courseId={courseId} setCancelation={setCancelation} />:<></>
        }
      <table className="table w-full">
        <thead>
          <tr>
            <th className="hidden"></th>
            <th>Course Name</th>
            <th>Joined</th>
            <th>Slote</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Details</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courseLength === 0 && (
            <tr>
              <td className="hidden"></td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
              <td className="">
                NO COURSES ADDED YET
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}

          {courses?.map((val) => {
            return (
              <tr>
                <td className="hidden"></td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{val.course.coursename}</div>
                    </div>
                  </div>
                </td>
                {val.course.clients
                  .filter((obj) => obj.user === userId)
                  .map((obj) => (
                    <td key={obj.user}>{obj.joined}</td>
                  ))}
                {val.course.clients
                  .filter((obj) => obj.user === userId)
                  .map((obj) => (
                    <td key={obj.user}>{obj.bookedSlote}</td>
                  ))}
                {val.course.clients
                  .filter((obj) => obj.user === userId)
                  .map((obj) => {
                    if (obj.paymentStatus) {
                      return (
                        <td key={obj.user}>
                          <div>
                            <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                              Completed
                            </span>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td key={obj.user}>
                          <div>
                            <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                              Pending
                            </span>
                          </div>
                        </td>
                      );
                    }
                  })}
                <td>
                  {val.course.status === "Active" ? (
                    <div>
                      <span class="bg-green-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-500">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span class="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-800">
                        Inactive
                      </span>
                    </div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => viewDetails(val.course._id)}
                    className="btn btn-ghost btn-xs bg-slate-300"
                  >
                    details
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => viewAttendanceDetails(val.course._id)}
                    className="btn btn-ghost btn-xs bg-slate-300"
                  >
                    View Attendance
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => cancelMembership(val.course._id)}
                    className="btn btn-sm text-white bg-red-600"
                  >
                    Cancel membership
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th className="hidden"></th>
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

export default CourseList;
