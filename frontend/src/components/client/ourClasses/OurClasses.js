import React from "react";
import avatar from "../../../assets/images/t8.jpg";

function OurClasses() {
  return (
    <div>
      <section className="choseus-section spad  flex flex-wrap cursor-pointer mx-auto">
        <div className="container">
          <div className="section-title pt-10">
            <span className="text-gray-400 text-3xl ">Our Classes</span>
          </div>
        </div>
        <div className="card card-compact bg-base-100 md:w-4-12 shadow-xl mx-5 my-5 border flex flex-wrap">
          <figure>
            <img src={avatar} alt="Shoes" className="w-80 h-80 object-cover" />
          </figure>
          <div className="card-body bg-black flex ">
            <div className="flex justify-center">
              <h2 className="text-white card-title">jjjj</h2>
            </div>
            <div className="flex flex-wrap justify-between p-5">
              <div>
                <p className="text-white">Trainer : </p>
                <p className="text-white">Fee : ₹</p>
              </div>
              <div className="card-actions md:mt-0 mt-3 justify-end">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurClasses;
