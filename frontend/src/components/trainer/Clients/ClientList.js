import { RestaurantSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientList(props) {
  const navigate = useNavigate();

  const [client, setClient] = useState([]);

  //   console.log(clientList, "client list from the props");

  useEffect(() => {
    console.log("useEffect working");
    mapClientList();
  }, []);

  let arr = [];

  function mapClientList() {
    try {
      const clientList = props.clients;
      const clientLength = clientList.length;
      console.log("MapClientList working....");

      const ClieList = clientList.map((val) => {
        console.log(val.coursename,'.....................................................................................................')
        // val.clients.map((vals) => {
        //   arr.push(vals);
        // });
      });

      console.log(arr, "arr in the map client fn");
      setClient(arr);
    } catch (error) {
        console.log(error.message,'error in mapClientList')
    }
  }

  console.log(client, "clients state after maping.....");
  console.log(arr, "arr  after maping.....");

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
    // navigate("/course/details", { state: { courseId: courseId } });
  }

  return (
    <div className="overflow-x-auto w-full">
      {console.log(arr, "arr inthe component")}
    </div>
  );
}

export default ClientList;
