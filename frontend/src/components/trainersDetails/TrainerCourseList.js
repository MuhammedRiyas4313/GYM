import React from "react";
import { useNavigate } from "react-router-dom";

function TrainerCourseList(props) {

  const navigate = useNavigate()

  const courseList = props.courseList;
  const courseLength = courseList.length

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    return formated;
  }

  function viewDetails(courseId) {
    navigate("/course/details", { state: { courseId: courseId } });
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Started</th>
            <th>Charge / Month</th>
            <th>Clients</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        { courseLength === 0 && <tr><td></td><td className="flex justify-center text-bold w-full">NO COURSES ADDED YET</td><td></td><td></td><td></td></tr> }
          { courseList?.map((val) => {
            return (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{val.coursename}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{formateDate(val.createdAt)}</td>
                <td>{val.charge} ₹</td>
                <td>0{val.clients?.length}</td>
                <td>{val.status === 'Active' ? <div className="badge bg-green-600 text-white p-2">Active</div>: <div className="badge bg-red-600 text-white p-2">Inactive</div>}</td>
                <th>
                  <button
                    onClick={() => viewDetails(val._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </button>
                </th>
              </tr>
            );
          }) }
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

export default TrainerCourseList;
