import React from "react";
import { useNavigate } from "react-router-dom";

function CourseList({courseList}) {

  const navigate = useNavigate()

  
  const courseLength = courseList.length
  console.log(courseList,courseLength, "from the trainerCourseList and length table comp");

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    console.log(formated, "formate date is calling.....");
    return formated;
  }

  function viewDetails(courseId) {
    console.log(courseId, "view details trainer ");
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
            {/* <th>Action</th> */}
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
                <td> {val.status === 'Active' ? (
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
                      )}</td>
                {/* <td>{val.status === 'Active' ? (
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          // onClick={() => {
                          //   blockStatus(val.isBlocked, val._id);
                          // }}
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-white bg-green-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          // onClick={() => {
                          //   blockStatus(val.isBlocked, val._id);
                          // }}
                        >
                          Unblock
                        </button>
                      )}</td> */}
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

export default CourseList;
