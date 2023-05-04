import React, { useEffect, useRef, useState } from "react";
import TriainersHero from "./TrianersHero";
import { getTrainers } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Trainers() {

  const [trainersList, setTrainersList] = useState([]);

  const viewTrainers = useRef()
  const viewTop = useRef()

  const navigate = useNavigate();

  useEffect(() => {
    getTrainers().then((res) => {
      console.log(res.data, "response from the getTrainers api");
      setTrainersList(res.data);
    });
    viewTop?.current?.scrollIntoView()
    setTimeout(() => {
      viewTrainers?.current?.scrollIntoView({ behavior: 'smooth' })
  }, 1000);
  }, []);

  function formateDate(date) {
    const formatDate = new Date(date);
    const formated = `${formatDate.getDate()}-${
      formatDate.getMonth() + 1
    }-${formatDate.getFullYear()}`;
    console.log("formate date is calling.....");
    return formated;
  }

  function viewDetails(trainerId) {
    console.log(trainerId, "view details trainer ");
    navigate("/trainer/details", { state: { trainerId: trainerId } });
  }

  return (
    <div className="bg-black w-full h-full" ref={viewTop}>
      <TriainersHero />
      <div className="container">
        <div className="w-20 h-20" ref={viewTrainers}></div>
        <div className="section-title pt-10">
          <span className="text-gray-400 text-3xl ">OUR TEAM</span>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {trainersList?.map((val) => {
          return (
            <section className="choseus-section spad  flex flex-wrap cursor-pointer mx-auto">
              <div className="card card-compact bg-black md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap">
                <figure>
                  <img
                    src={val.profile}
                    alt="Shoes"
                    className="w-80 h-80 object-cover"
                  />
                </figure>
                <div className="card-body bg-black flex items-center">
                  <h2 className="text-white card-title uppercase">{val.fname}</h2>
                  <p className="text-white">Rating : ⭐⭐⭐⭐⭐ </p>
                  <p className="text-white">
                    Member since : {formateDate(val.createdAt)}
                  </p>

                  <div className="card-actions justify-end m-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => viewDetails(val._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Trainers;
