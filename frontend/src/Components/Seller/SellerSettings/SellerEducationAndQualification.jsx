import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import { DatePicker } from "antd";

import { customStyles, proofDocSVG } from "../../../Styles/Style";
import { degrees, qualifications } from "../../../Static/Data";
import { PiBooksFill } from "react-icons/pi";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerEducationAndQualification = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(0);

  const { seller } = useSelector((state) => state.seller);
  const [selectedEducationExperience, setSelectedEducationExperience] =
    useState(0);
  const selectedExperience =
    seller.educationExperiences[selectedEducationExperience];

  const [qualification, setQualification] = useState(
    selectedExperience.qualification
  );
  const [subject, setSubject] = useState(selectedExperience.subject);
  const [institution, setInstitution] = useState(
    selectedExperience.institution
  );
  const [educationalFromDate, setEducationalFromDate] = useState(
    selectedExperience.educationalFromDate
  );
  const [educationalToDate, setEducationalToDate] = useState(
    selectedExperience.educationalToDate
  );
  const [educationalExperience, setEducationalExperience] = useState(
    selectedExperience.educationalExperience
  );
  const [educationalDocument, setEducationalDocument] = useState(null);

  useEffect(() => {
    const selectedExperience =
      seller.educationExperiences[selectedEducationExperience];

    setQualification(
      selectedComponent === 0 ? selectedExperience?.qualification || "" : ""
    );
    setSubject(
      selectedComponent === 0 ? selectedExperience?.subject || "" : ""
    );
    setInstitution(
      selectedComponent === 0 ? selectedExperience?.institution || "" : ""
    );
    setEducationalFromDate(
      selectedComponent === 0
        ? selectedExperience?.educationalFromDate || null
        : null
    );
    setEducationalToDate(
      selectedComponent === 0
        ? selectedExperience?.educationalToDate || null
        : null
    );
    setEducationalExperience(
      selectedComponent === 0
        ? selectedExperience?.educationalExperience || ""
        : ""
    );
  }, [selectedComponent, selectedEducationExperience, seller]);

  const ComponentSwitch = (num) => {
    setSelectedComponent(num);
  };

  const EducationPagenation = (num) => {
    setSelectedEducationExperience(num);

    const newSelectedExperience = seller.educationExperiences[num];
    setQualification(newSelectedExperience.qualification);
    setSubject(newSelectedExperience.subject);
    setInstitution(newSelectedExperience.institution);
    setEducationalFromDate(newSelectedExperience.educationalFromDate);
    setEducationalToDate(newSelectedExperience.educationalToDate);
    setEducationalExperience(newSelectedExperience.educationalExperience);
  };

  // Educational Document
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setEducationalDocument(selectedImage);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files[0];
    setEducationalDocument(droppedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
                  Education & Qualification Information
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <PiBooksFill />
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
                  Update Educational Informations
                </div>
                <div className="w-[2px] h-7 mx-2 bg-gray-500"></div>
                <div
                  className={`ml-2 p-2 rounded-xl text-[18px] relative inline-block cursor-pointer font-semibold underlineAnimation02 ${
                    selectedComponent === 1 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(1)}
                >
                  Add New Educational Informations
                </div>
              </div>

              {selectedComponent === 0 && (
                <>
                  <div className="p-4 my-2">
                    <div className="w-full flex items-center justify-end">
                      {/* Pagination Button */}
                      {seller.educationExperiences.map((experience, index) => (
                        <div
                          key={index}
                          className={`rounded-sm w-[25px] h-[25px] flex items-center justify-center cursor-pointer m-2 ${
                            selectedEducationExperience === index
                              ? "bg-theme-blue text-[#fff]"
                              : "bg-neutral-300"
                          }`}
                          onClick={() => EducationPagenation(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-8">
                      <div className="flex">
                        <div className="w-1/2 pr-2 flex flex-col gap-6">
                          {/* Qualification */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Qualification :
                            </label>
                            <Select
                              options={qualifications}
                              placeholder="Select Qualification"
                              styles={customStyles}
                              isSearchable={false}
                              value={qualification}
                              onChange={setQualification}
                            />
                          </div>

                          {/* Subject */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Subject :
                            </label>
                            <Select
                              options={degrees}
                              placeholder="Select Subject"
                              styles={customStyles}
                              isSearchable={false}
                              value={subject}
                              onChange={setSubject}
                            />
                          </div>

                          {/* Instituition */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Instituition :
                            </label>
                            <input
                              type="text"
                              id="institutionInput"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-md sm:leading-6"
                              placeholder="University of Munchin"
                            />
                          </div>
                        </div>

                        {/* Upload Document Picture */}
                        <div className="w-1/2 pl-2">
                          <div className="flex flex-col justify-center items-center">
                            <div
                              className="w-52 h-52 flex flex-col items-center justify-center ring-1 ring-neutral-300 rounded-3xl bg-neutral-200 cursor-pointer my-4"
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                              onClick={() => {
                                const fileInput =
                                  document.querySelector('input[type="file"]');
                                fileInput.click();
                              }}
                            >
                              {educationalDocument ? (
                                <img
                                  src={URL.createObjectURL(educationalDocument)}
                                  alt="Profile"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              ) : (
                                <>
                                  <img
                                    src={
                                      seller?.educationExperiences[
                                        selectedEducationExperience
                                      ]?.educationalDocument.url
                                    }
                                    className="max-w-[80%] max-h-[70%]"
                                    alt="Document"
                                  />
                                  <article className="text-base text-neutral-500 mt-3">
                                    Click or Drag to
                                    <span className="text-theme-blue">
                                      {" "}
                                      Upload
                                    </span>
                                  </article>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Dates */}
                      <div className="flex">
                        {/* From Date */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your From Date :
                          </label>
                          <DatePicker
                            id="fromDate"
                            selected={educationalFromDate}
                            onChange={(date) => setEducationalFromDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                          />
                        </div>

                        {/* To Date */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your To Date :
                          </label>
                          <DatePicker
                            id="toDate"
                            selected={educationalToDate}
                            onChange={(date) => setEducationalToDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* Educational Experience */}
                      <div>
                        <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                          Change your Education Experience :
                        </label>
                        <textarea
                          name="about"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300 placeholder:text-gray-300"
                          rows="7"
                          placeholder={`How did you do as a student?\nWhat did you learn?\n\nOther specific details regarding the subject.`}
                          value={educationalExperience}
                          onChange={(e) =>
                            setEducationalExperience(e.target.value)
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
                        <div className="w-1/2 pr-2 flex flex-col gap-6">
                          {/* Qualification */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Qualification :
                            </label>
                            <Select
                              options={qualifications}
                              placeholder="Select Qualification"
                              styles={customStyles}
                              isSearchable={false}
                              value={qualification}
                              onChange={setQualification}
                            />
                          </div>

                          {/* Subject */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Subject :
                            </label>
                            <Select
                              options={degrees}
                              placeholder="Select Subject"
                              styles={customStyles}
                              isSearchable={false}
                              value={subject}
                              onChange={setSubject}
                            />
                          </div>

                          {/* Instituition */}
                          <div className="w-full">
                            <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                              Change your Instituition :
                            </label>
                            <input
                              type="text"
                              id="institutionInput"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-md sm:leading-6"
                              placeholder="University of Munchin"
                            />
                          </div>
                        </div>

                        {/* Upload Document Picture */}
                        <div className="w-1/2 pl-2">
                          <div className="flex flex-col justify-center items-center">
                            <div
                              className="w-52 h-52 flex flex-col items-center justify-center ring-1 ring-neutral-300 rounded-3xl bg-neutral-200 cursor-pointer my-4"
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                              onClick={() => {
                                const fileInput =
                                  document.querySelector('input[type="file"]');
                                fileInput.click();
                              }}
                            >
                              {educationalDocument ? (
                                <img
                                  src={URL.createObjectURL(educationalDocument)}
                                  alt="Profile"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              ) : (
                                <>
                                  {proofDocSVG(140, 140)}
                                  <article className="text-base text-neutral-500 mt-3">
                                    Click or Drag to
                                    <span className="text-theme-blue">
                                      {" "}
                                      Upload
                                    </span>
                                  </article>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Dates */}
                      <div className="flex">
                        {/* From Date */}
                        <div className="w-1/2 pr-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your From Date :
                          </label>
                          <DatePicker
                            id="fromDate"
                            selected={educationalFromDate}
                            onChange={(date) => setEducationalFromDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                          />
                        </div>

                        {/* To Date */}
                        <div className="w-1/2 pl-2">
                          <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                            Change your To Date :
                          </label>
                          <DatePicker
                            id="toDate"
                            selected={educationalToDate}
                            onChange={(date) => setEducationalToDate(date)}
                            isClearable
                            placeholderText="mm/dd/yyyy"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* Educational Experience */}
                      <div>
                        <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                          Change your Education Experience :
                        </label>
                        <textarea
                          name="about"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300 placeholder:text-gray-300"
                          rows="7"
                          placeholder={`How did you do as a student?\nWhat did you learn?\n\nOther specific details regarding the subject.`}
                          value={educationalExperience}
                          onChange={(e) =>
                            setEducationalExperience(e.target.value)
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

export default SellerEducationAndQualification;
