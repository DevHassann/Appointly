import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DatePicker } from "antd";
import { SiChianetwork } from "react-icons/si";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerProfessionalExperiences = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(0);

  const { seller } = useSelector((state) => state.seller);
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState(0);
  const selectedExperience =
    seller.professionalExperiences[selectedProfessionalExperience];

  const [company, setCompany] = useState(selectedExperience.company);
  const [position, setPosition] = useState(selectedExperience.position);
  const [experienceFromDate, setExperienceFromDate] = useState(
    selectedExperience.experienceFromDate
  );
  const [experienceToDate, setExperienceToDate] = useState(
    selectedExperience.experienceToDate
  );
  const [professionalExperience, setProfessionalExperience] = useState(
    selectedExperience.professionalExperience
  );

  useEffect(() => {
    const selectedExperience =
      seller.professionalExperiences[selectedProfessionalExperience];

    setCompany(
      selectedComponent === 0 ? selectedExperience?.company || "" : ""
    );
    setPosition(
      selectedComponent === 0 ? selectedExperience?.position || "" : ""
    );
    setExperienceFromDate(
      selectedComponent === 0
        ? selectedExperience?.experienceFromDate || null
        : null
    );
    setExperienceToDate(
      selectedComponent === 0
        ? selectedExperience?.experienceToDate || null
        : null
    );
    setProfessionalExperience(
      selectedComponent === 0
        ? selectedExperience?.professionalExperience || ""
        : ""
    );
  }, [selectedComponent, selectedProfessionalExperience, seller]);

  const ComponentSwitch = (num) => {
    setSelectedComponent(num);
  };

  const ProfessionalPagenation = (num) => {
    setSelectedProfessionalExperience(num);

    const newSelectedExperience = seller.professionalExperiences[num];
    setCompany(newSelectedExperience.company);
    setPosition(newSelectedExperience.position);
    setExperienceFromDate(newSelectedExperience.experienceFromDate);
    setExperienceToDate(newSelectedExperience.experienceToDate);
    setProfessionalExperience(newSelectedExperience.professionalExperience);
  };

  return (
    <>
      {seller == null ? (
        <>
          <div className="p-4">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center w-full p-8 bg-white">
            <div className="w-full">
              {/* Headings */}
              <div className="mb-8 border-b-[1px] flex justify-between items-center">
                <h2 className="text-2xl text-gray-500 border-gray-100">
                  Professional Experiences
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <SiChianetwork />
                </span>
              </div>

              {/* Switch Button */}
              <div className="w-full flex items-center">
                <div
                  className={`mr-2 p-2 rounded-xl text-[18px] relative inline-block cursor-pointer font-semibold underlineAnimation ${
                    selectedComponent === 0 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(0)}
                >
                  Update Professional Experiences
                </div>
                <div className="w-[2px] h-7 mx-2 bg-gray-500"></div>
                <div
                  className={`ml-2 p-2 rounded-xl text-[18px] relative inline-block cursor-pointer font-semibold underlineAnimation02 ${
                    selectedComponent === 1 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(1)}
                >
                  Add New Professional Experience
                </div>
              </div>

              {selectedComponent === 0 && (
                <>
                  <div className="p-4 my-2">
                    {/* Pagination through Experiences */}
                    <div className="w-full flex items-center justify-end">
                      {seller.professionalExperiences.map(
                        (experience, index) => (
                          <div
                            key={index}
                            className={`rounded-sm w-[25px] h-[25px] flex items-center justify-center cursor-pointer m-2 ${
                              selectedProfessionalExperience === index
                                ? "bg-theme-blue text-[#fff]"
                                : "bg-neutral-300"
                            }`}
                            onClick={() => ProfessionalPagenation(index)}
                          >
                            {index + 1}
                          </div>
                        )
                      )}
                    </div>

                    {/* Fields Container */}
                    <div className="flex flex-col gap-8">
                      <div className="flex">
                        {/* Company */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your Company Name :
                          </label>
                          <input
                            type="text"
                            id="CompanyName"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>

                        {/* Position */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your Position :
                          </label>
                          <input
                            type="text"
                            id="Position"
                            name="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="flex">
                        {/* From Date */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change From Date :
                          </label>
                          <DatePicker
                            id="fromDate"
                            selected={experienceFromDate}
                            onChange={(date) => setExperienceFromDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>

                        {/* To Date */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change To Date :
                          </label>
                          <DatePicker
                            id="toDate"
                            selected={experienceToDate}
                            onChange={(date) => setExperienceToDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* Professional Experience */}
                      <div>
                        <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                          Change your Professional Experience :
                        </label>
                        <textarea
                          name="about"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300 placeholder:text-gray-300"
                          rows="7"
                          placeholder={`How did you do as an employee?\nWhat did you learn?\n\nOther specific details regarding the position...`}
                          value={professionalExperience}
                          onChange={(e) =>
                            setProfessionalExperience(e.target.value)
                          }
                        />
                      </div>

                      {/* Update Button */}
                      <div className="w-full flex items-center justify-end">
                        <button className="bg-blue-500 text-white w-[20%] px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          {loading ? (
                            <div className="flex">
                              <LodingButton name={"Updating"} />
                            </div>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedComponent === 1 && (
                <>
                  <div className="p-4 mt-10">
                    {/* Fields Container */}
                    <div className="flex flex-col gap-8">
                      <div className="flex">
                        {/* Company */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Add your Company Name :
                          </label>
                          <input
                            type="text"
                            id="CompanyName"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>

                        {/* Position */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Add your Position :
                          </label>
                          <input
                            type="text"
                            id="Position"
                            name="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="flex">
                        {/* From Date */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Add From Date :
                          </label>
                          <DatePicker
                            id="fromDate"
                            selected={experienceFromDate}
                            onChange={(date) => setExperienceFromDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>

                        {/* To Date */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Add To Date :
                          </label>
                          <DatePicker
                            id="toDate"
                            selected={experienceToDate}
                            onChange={(date) => setExperienceToDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue text-md sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* Professional Experience */}
                      <div>
                        <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                          Add your Professional Experience :
                        </label>
                        <textarea
                          name="about"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300 placeholder:text-gray-300"
                          rows="7"
                          placeholder={`How did you do as an employee?\nWhat did you learn?\n\nOther specific details regarding the position...`}
                          value={professionalExperience}
                          onChange={(e) =>
                            setProfessionalExperience(e.target.value)
                          }
                        />
                      </div>

                      {/* Update Button */}
                      <div className="w-full flex items-center justify-end">
                        <button className="bg-blue-500 text-white w-[20%] px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          {loading ? (
                            <div className="flex">
                              <LodingButton name={"Updating"} />
                            </div>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Error message component */}
      <ErrorMessage
        open={errorMessage !== ""}
        setOpen={() => setErrorMessage("")}
        heading="Error"
        message={errorMessage}
      />

      {/* Success message component */}
      <PromptMessage
        open={successMessage !== ""}
        setOpen={() => setSuccessMessage("")}
        heading="Success"
        message={successMessage}
      />
    </>
  );
};

export default SellerProfessionalExperiences;
