import React, { useState } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";

import { LanguagesSpokenData } from "../../../Static/Data";
import { customStyles } from "../../../Styles/Style";
import { MdWork } from "react-icons/md";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerProfessionalInformation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(0);

  const { seller } = useSelector((state) => state.seller);
  const [professionalSkill, setProfessionalSkill] = useState(
    seller && seller.professionalSkill
  );
  const [professionalEmail, setProfessionalEmail] = useState(
    seller && seller.professionalEmail
  );
  const [languagesSpoken, setLanguagesSpoken] = useState(
    seller && seller.languagesSpoken ? seller.languagesSpoken : ["English"]
  );
  const [socialMediaProfiles, setSocialMediaProfiles] = useState(() => {
    const initialProfiles = {
      linkedin: "",
      twitter: "",
      facebook: "",
      github: "",
      instagram: "",
    };

    if (seller && seller.socialMediaProfiles) {
      for (const key in seller.socialMediaProfiles) {
        if (key in initialProfiles) {
          initialProfiles[key] = seller.socialMediaProfiles[key];
        }
      }
    }

    return initialProfiles;
  });
  const [about, setAbout] = useState(seller && seller.about);
  const [professionalImage, setProfessionalImage] = useState(null);

  const ComponentSwitch = (num) => {
    setSelectedComponent(num);
  };

  // Social Media Profiles
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaProfiles((prevProfiles) => ({
      ...prevProfiles,
      [name]: value,
    }));
  };

  // Professional Image
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    readImage(selectedImage);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files[0];
    readImage(droppedImage);
  };

  const readImage = (imageFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfessionalImage(reader.result);
      }
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
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
                  Personal Information
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <MdWork />
                </span>
              </div>

              {/* Switch Button */}
              <div className="w-full flex items-center">
                <div
                  className={`mr-2 p-2 rounded-xl text-[20px] relative inline-block cursor-pointer font-semibold underlineAnimation ${
                    selectedComponent === 0 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(0)}
                >
                  Information
                </div>
                <div className="w-[2px] h-7 mx-2 bg-gray-500"></div>
                <div
                  className={`ml-2 p-2 rounded-xl text-[20px] relative inline-block cursor-pointer font-semibold underlineAnimation02 ${
                    selectedComponent === 1 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(1)}
                >
                  Professional Image
                </div>
              </div>

              {selectedComponent === 0 && (
                <>
                  {/* Input Containers */}
                  <div className="flex flex-col gap-8 mt-8">
                    {/* Professional Skill */}
                    <div>
                      <label
                        htmlFor="professionalSkill"
                        className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                      >
                        Change your Professional Skill :
                      </label>
                      <div className="mt-1">
                        <input
                          id="professionalSkill"
                          placeholder="Professional Skill"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={professionalSkill}
                          onChange={(e) => setProfessionalSkill(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Professional Email */}
                    <div>
                      <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                        Change your Professional Email :
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                        placeholder="Professional Email"
                        value={professionalEmail}
                        onChange={(e) => setProfessionalEmail(e.target.value)}
                      />
                    </div>

                    {/* Languages */}
                    <div>
                      <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                        Change your Languages :
                      </label>
                      <Select
                        options={LanguagesSpokenData}
                        placeholder="Select Language"
                        isMulti
                        styles={customStyles}
                        isSearchable={false}
                        value={LanguagesSpokenData.filter((lang) =>
                          languagesSpoken.includes(lang.value)
                        )}
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map(
                            (option) => option.value
                          );
                          setLanguagesSpoken(selectedValues);
                        }}
                      />
                    </div>

                    {/* Social Links */}
                    <div className="flex">
                      {/* LinkedIn */}
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="linkedin"
                          className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                        >
                          Change your LinkdIn Link :
                        </label>
                        <input
                          id="linkedin"
                          name="linkedin"
                          placeholder="Add your LinkedIn URL here..."
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={socialMediaProfiles.linkedin}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Twitter */}
                      <div className="w-1/2 pl-2">
                        <label
                          htmlFor="twitter"
                          className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                        >
                          Change your Twitter Link :
                        </label>
                        <input
                          id="twitter"
                          name="twitter"
                          placeholder="Add your Twitter URL here..."
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={socialMediaProfiles.twitter}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex">
                      {/* Facebook */}
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="facebook"
                          className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                        >
                          Change your Facebook Link :
                        </label>
                        <input
                          id="facebook"
                          name="facebook"
                          placeholder="Add your Facebook URL here..."
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={socialMediaProfiles.facebook}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Github */}
                      <div className="w-1/2 pl-2">
                        <label
                          htmlFor="github"
                          className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                        >
                          Change your Github Link :
                        </label>
                        <input
                          id="github"
                          name="github"
                          placeholder="Add your Github URL here..."
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={socialMediaProfiles.github}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex">
                      {/* Instagram */}
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="instagram"
                          className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                        >
                          Change your Instagram Link :
                        </label>
                        <input
                          id="instagram"
                          name="instagram"
                          placeholder="Add your Instagram URL here..."
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                          value={socialMediaProfiles.instagram}
                          onChange={handleChange}
                        />
                      </div>

                      <div></div>
                    </div>

                    {/* About */}
                    <div>
                      <label
                        label
                        className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                      >
                        Change Your About :
                      </label>
                      <textarea
                        name="about"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                        rows="7"
                        placeholder="Tell us something about yourself..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="w-full flex items-center justify-end mt-8">
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
                </>
              )}

              {selectedComponent === 1 && (
                <>
                  <div className="p-4">
                    {/* Upload Profile Picture */}
                    <div className="my-10 flex flex-col justify-center items-center">
                      <div
                        className="w-52 h-52 2xl:w-72 2xl:h-72 flex flex-col items-center justify-center ring-1 ring-neutral-300 rounded-3xl bg-neutral-200 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => {
                          const fileInput =
                            document.querySelector('input[type="file"]');
                          fileInput.click();
                        }}
                      >
                        {professionalImage ? (
                          <img
                            src={URL.createObjectURL(professionalImage)}
                            alt="Profile"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        ) : (
                          <>
                            <img
                              src={seller?.professionalImage?.url}
                              alt="Professional"
                            />
                            <article className="text-base text-neutral-500 mt-3">
                              Click or Drag to
                              <span className="text-theme-blue"> Upload</span>
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
                      <article className="w-[18rem] mt-4 text-sm text-neutral-400 italic whitespace-pre-line">
                        {
                          "Tips:\nUpload a photo in which you’re clearly facing the camera.\nA photo shouldn’t have fancy backgrounds, single color backgrounds are preferred."
                        }
                      </article>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex items-center justify-end mt-8">
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

export default SellerProfessionalInformation;
