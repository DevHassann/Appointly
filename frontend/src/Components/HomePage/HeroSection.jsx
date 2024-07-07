import React from "react";
import { Link } from "react-router-dom";

import TestimonialFloat from "./TestimonialFloat";

import HeroImage from "../../Assets/HeroImage.png";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const HeroSection = () => {
  return (
    <div className="bg-white">
      <div className="relative h-[60vh] bt:h-screen isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg lg:max-w-4xl">
                <div className="mt-0 sm:mt-0 lg:mt-0">
                  <Link to="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-btn-bg ring-1 ring-inset ring-indigo-600/10">
                      Top Services
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                      <span>Industry Professionals</span>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl 2xl:text-8xl">
                  Appointments were never this easy!
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 2xl:text-2xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="#"
                    className="rounded-md bg-btn-bg px-3.5 py-2.5 text-sm 2xl:text-xl font-semibold text-white shadow-sm hover:bg-btn-bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Start Scheduling
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="absolute hidden bt:block right-[10%] md:right-[30%] bottom-1/4">
              <TestimonialFloat />
            </div>
            <img
              src={HeroImage}
              alt=""
              className="absolute hidden bt:block right-[10%] 2xl:right-[10%] top-[5%] w-[25rem] 2xl:w-[38rem] -z-10"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
};

export default HeroSection;
