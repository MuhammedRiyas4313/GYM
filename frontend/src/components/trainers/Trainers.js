import React, { useEffect, useState } from "react";
import TriainersHero from "./TrianersHero";
import { getTrainers } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Trainers() {

  const [trainersList, setTrainersList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getTrainers().then((res) => {
        console.log(res.data, "response from the getTrainers api");
        setTrainersList(res.data);
      });
  },[]);

  function viewDetails(trainerId) {
    console.log(trainerId, "view details trainer ");
    navigate("/trainers/details", { state: { trainerId: trainerId } });
  }

  return (
    <div className="bg-black w-full h-full">
      <TriainersHero />
      <div className="container">
        <div className="section-title pt-10">
          <span className="text-gray-400 text-3xl ">OUR TEAM</span>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {trainersList?.map((val) => {
          return (
            <section className="choseus-section spad  flex flex-wrap mx-auto">
              <div className="card card-compact bg-base-100 md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap ">
                <figure className="">
                  <img src={val.profile} alt="Shoes" className="w-80 h-80  object-cover trainerProImg" />
                </figure>
                <div className="card-body bg-black">
                  <h2 className="text-white card-title">{val.fname}</h2>
                  <p className="text-white">Joined : </p>
                  <p className="text-white">Time : {val.timing}</p>
                  <div className="card-actions justify-end">
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
