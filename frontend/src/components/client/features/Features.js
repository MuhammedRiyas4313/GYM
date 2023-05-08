import React from "react";
import { Card } from "flowbite-react";
import Stepper from '../../../assets/images/dumbbell.png'
import equipment from '../../../assets/images/treadmill.png'
import dumbbell from '../../../assets/images/dumbell2.png'
import wellness from '../../../assets/images/wellness.png'
import "./Features.css";

function Features() {
  return (
    <section className="choseus-section spad ">
      <div className="container">
        <div className="section-title pt-10">
          <span className="text-gray-400 text-3xl ">Why choose us ?</span>
        </div>
      </div>
    <div className="flex flex-wrap justify-around ">
      <div className="pb-5">
          <Card className="cardcontainer md:m-0 border-0 m-3">
            <div className="flex flex-col items-center pb-10 bg-black object-fill">
              <img
                className="mb-3 h-24 w-24 shadow-lg"
                src={equipment}
                alt="Bonnie image"
              />
              <h5 className="mb-1 md:text-2xl text-lg font-bold text-gray-300 dark:text-gray-300">
              Modern equipment
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-0 md:m-0 m-3">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 shadow-lg"
                src={wellness}
                alt="Bonnie image"
              />
              <h5 className="mb-1 md:text-2xl text-lg font-bold text-gray-300 dark:text-gray-300">
              Healthy nutrition plan
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-0 md:m-0 m-3">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24  shadow-lg"
                src={dumbbell}
                alt="Bonnie image"
              />
              <h5 className="mb-1 md:text-2xl text-lg font-bold text-gray-300 dark:text-gray-300">
              Professional training
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-0 md:m-0 m-3">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 shadow-lg"
                src={Stepper}
                alt="Bonnie image"
              />
              <h5 className="mb-1 md:text-2xl text-lg font-bold  text-gray-300 dark:text-gray-300">
              Unique to your needs
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;
