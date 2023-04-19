import React, { useEffect, useState } from "react";
import "./TrainerProfile.css";
import { Link, useLocation } from "react-router-dom";

function TrainerDetail() {

  const location = useLocation();
  const trainerId = location.state?.trainerId;

  const [option, setOption] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState({});

  function options() {
    setOption((state) => !state);
    console.log(option, "option status....");
  }

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    console.log("formate date is calling.....");
    return formated;
  }

  useEffect(() => {
    console.log("close dropdown");
  }, [option]);

  useEffect(() => {
    getTrainerDetails(trainerId).then((res) => {
      console.log(res.data, "response from the backend");
      setTrainerDetails(res.data);
    });
  }, []);

  function Courses() {
    console.log("courses calling");
  }

  return (
    <div>

    </div>
  )
}

export default TrainerDetail;
