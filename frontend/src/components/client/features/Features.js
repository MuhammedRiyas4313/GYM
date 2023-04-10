import React from "react";
import { Dropdown, Card } from "flowbite-react";
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
          <Card className="cardcontainer border-orange-600">
            <div className="flex flex-col items-center pb-10 bg-black">
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-bold text-gray-300 dark:text-gray-300">
              Modern equipment
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-orange-600">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-bold text-gray-300 dark:text-gray-300">
              Healthy nutrition plan
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-orange-600">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-bold text-gray-300 dark:text-gray-300">
              Professional training
              </h5>
              <p className="text-sm mt-5 text-center text-gray-300 dark:text-gray-300">Lorem ipsum dolor sit amet,consectetur<br /> adipiscing elit, sed do eiusmod tempor <br />incididunt ut dolore facilisis.
              </p>
            </div>
          </Card>
        </div>
        <div className="pb-5">
          <Card className="cardcontainer border-orange-600">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-2xl font-bold  text-gray-300 dark:text-gray-300">
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
