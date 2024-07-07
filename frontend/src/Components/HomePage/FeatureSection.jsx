import React from "react";

import feature1Image from "../../Assets/featureSection.png";

import { features } from "../../Static/Data";

const FeatureSection = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-8">
      <div className="mx-auto max-w-7xl 2xl:max-w-[80%] px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg 2xl:max-w-xl">
              <p className="mt-2 text-3xl 2xl:text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Professional Consultancy, Done Right!
              </p>
              <p className="mt-6 text-lg 2xl:text-xl leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9 2xl:text-xl">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative overflow-hidden w-full hidden lg:block lg:order-first">
            <img
              src={feature1Image}
              alt="FeatureImage"
              width={120}
              className="absolute translate-x-[30%] 2xl:translate-x-[35%] w-[22rem] 2xl:w-[25rem]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
