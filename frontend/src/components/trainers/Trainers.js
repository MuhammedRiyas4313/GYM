import React, { useEffect, useRef, useState } from "react";
import TriainersHero from "./TrianersHero";
import { getTrainers } from "../../axios/services/clientServices/clientServices";
import { useNavigate } from "react-router-dom";

function Trainers() {

  const [allTrainersList, setAllTrainersList] = useState([]);
  const [trainersList, setTrainersList] = useState([]);

  const viewTrainers = useRef()
  const viewTop = useRef()
  const searchInp = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    getTrainers().then((res) => {
      setAllTrainersList(res.data);
      setTrainersList(res.data)
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

  async function search(){
    const data = searchInp.current.value;
    const regex = new RegExp(`^${data}`, "i");
    const filteredCourse = trainersList?.filter((trainer) => regex.test(trainer.fname));
    if(!data){
      setTrainersList(allTrainersList)
    }else{
      setTrainersList(filteredCourse)
    }
  }

  return (
    <div className="bg-black w-full h-full" ref={viewTop} >
      <TriainersHero />
      <div className="pt-20" ref={viewTrainers}></div>
      <div className="">
      <div className="section-title p-5 flex flex-wrap  justify-around align-middle  bg-gray-900">
          <span className="text-gray-400 text-3xl md:mb-0 mb-3">Our Team</span>
          <div className="flex items-center">
            <div className="flex space-x-1">
              <input
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
                ref={searchInp}
                onKeyUp={search}
              />
              <button className="px-4 text-white bg-orange-500 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap ">
        { trainersList?.length === 0 && <div className="flex justify-center items-center w-full h-72 text-gray-400 text-3xl uppercase"> No trainers Found</div>}
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
                      onClick={() => viewDetails(val?._id)}
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
