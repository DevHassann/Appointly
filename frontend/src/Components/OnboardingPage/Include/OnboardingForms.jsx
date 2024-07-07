import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { motion } from "framer-motion";
import { DatePicker, FloatButton } from "antd";
import { server } from "../../../server";
import { Label, TagInput, TextInput, Textarea } from "./Fields";
import { Button, AddButton } from "./Buttons";
import ReactFlagsSelect from "react-flags-select";
import Select from "react-select";
import moment from "moment";
import { getAllSellers, loadSeller } from "../../../Store/Actions/seller";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import {
  LanguagesSpokenData,
  degrees,
  genderData,
  qualifications,
  quartersData,
  daysOfWeek,
  customData,
} from "../../../Static/Data";
import { customStyles, proofDocSVG } from "../../../Styles/Style";
import { profileSVG } from "../../../Styles/Style";

import SuccessAnimation from "./SuccessAnimation";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import LodingButton from "../../LodingButton";

const OnboardingForms = () => {
  const [stage, setstage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [displayCountry, setDisplayCountry] = useState(null);
  const [country, setCountry] = useState("");
  // Professional Details
  const [professionalSkill, setProfessionalSkill] = useState("");
  const [skillTags, setSkillTags] = useState([]);
  const [professionalEmail, setProfessionalEmail] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState(["English"]);
  const [socialMediaProfiles, setSocialMediaProfiles] = useState({
    linkedin: "",
    twitter: "",
    facebook: "",
    github: "",
    instagram: "",
  });
  const [about, setAbout] = useState("");
  const [professionalImage, setProfessionalImage] = useState(null);
  // Education Experiences
  const [educationExperiences, setEducationExperiences] = useState([]);
  const [qualification, setQualification] = useState(null);
  const [subject, setSubject] = useState(null);
  const [institution, setInstitution] = useState("");
  const [educationalFromDate, setEducationalFromDate] = useState(null);
  const [educationalToDate, setEducationalToDate] = useState(null);
  const [educationalExperience, setEducationalExperience] = useState("");
  const [educationalDocument, setEducationalDocument] = useState(null);
  // Professional Experiences
  const [professionalExperiences, setProfessionalExperiences] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [experienceFromDate, setExperienceFromDate] = useState(null);
  const [experienceToDate, setExperienceToDate] = useState(null);
  const [professionalExperience, setProfessionalExperience] = useState("");
  // Availability
  const [slotsAvailability, setSlotsAvailability] = useState([]);
  const [selectedQuarters, setSelectedQuarters] = useState(1);
  const [selectedSlotsByDay, setSelectedSlotsByDay] = useState({});
  const [result, setResult] = useState([]);
  //  Pricing
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  const userId = user?._id;

  // Next Steps
  const handleNextStep = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      country === ""
    ) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");

      setstage(stage + 1);
    }
  };

  const handleNextStep01 = () => {
    if (
      professionalSkill.trim() === "" ||
      professionalEmail.trim() === "" ||
      languagesSpoken.length === 0 ||
      about.trim() === "" ||
      !professionalImage
    ) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");

      setstage(stage + 1);
    }
  };

  const handleNextStep02 = () => {
    if (
      !qualification ||
      !subject ||
      institution.trim() === "" ||
      !educationalFromDate ||
      !educationalToDate ||
      educationalExperience.trim() === "" ||
      !educationalDocument
    ) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");
      const newExperience = {
        qualification,
        subject,
        institution,
        educationalFromDate,
        educationalToDate,
        educationalExperience,
        educationalDocument,
      };

      setEducationExperiences([...educationExperiences, newExperience]);

      setstage(stage + 1);
    }
  };

  const handleNextStep03 = () => {
    if (
      company.trim() === "" ||
      position.trim() === "" ||
      !experienceFromDate ||
      !experienceToDate ||
      professionalExperience.trim() === ""
    ) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");

      const newExperience = {
        company,
        position,
        experienceFromDate,
        experienceToDate,
        professionalExperience,
      };

      setProfessionalExperiences([...professionalExperiences, newExperience]);

      setstage(stage + 1);
    }
  };

  const handleNextStep04 = () => {
    const isAnyIncompleteDay = daysOfWeek.every(
      (day) => !selectedSlotsByDay[day] || selectedSlotsByDay[day].length === 0
    );

    if (isAnyIncompleteDay) {
      setErrorMessage("Please select at least one slot.");
    } else {
      setErrorMessage("");
      const availabilityData = daysOfWeek.map((day) => ({
        day,
        slot: selectedSlotsByDay[day] || [],
      }));
      setSlotsAvailability(availabilityData);

      setstage(stage + 1);
    }
  };

  // Country Data Handle
  const handleCountrySelect = (code, label) => {
    setDisplayCountry(code);
    setCountry(label);
  };

  // Drag Over Picture / Document
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Profile Picture
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

  // Social Media Profiles
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaProfiles((prevProfiles) => ({
      ...prevProfiles,
      [name]: value,
    }));
  };

  // Education Document
  const handleEducationFileChange = (e) => {
    const selectedDocument = e.target.files[0];
    readEducationDocument(selectedDocument);
  };

  const handleEducationDrop = (e) => {
    e.preventDefault();
    const droppedDocument = e.dataTransfer.files[0];
    readEducationDocument(droppedDocument);
  };

  const readEducationDocument = (documentFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setEducationalDocument(reader.result);
      }
    };
    if (documentFile) {
      reader.readAsDataURL(documentFile);
    }
  };

  // Educational Experiences
  const addEducationalExperience = () => {
    const newExperience = {
      qualification,
      subject,
      institution,
      educationalFromDate,
      educationalToDate,
      educationalExperience,
      educationalDocument,
    };

    setEducationExperiences([...educationExperiences, newExperience]);

    setQualification(null);
    setSubject(null);
    setInstitution("");
    setEducationalFromDate(null);
    setEducationalToDate(null);
    setEducationalExperience("");
    setEducationalDocument(null);
  };

  // Professional Experiences
  const addProfessionalExperience = () => {
    const newExperience = {
      company,
      position,
      experienceFromDate,
      experienceToDate,
      professionalExperience,
    };

    setProfessionalExperiences([...professionalExperiences, newExperience]);

    setCompany("");
    setPosition("");
    setExperienceFromDate(null);
    setExperienceToDate(null);
    setProfessionalExperience("");
  };

  // Quaters Button
  const handleQuaters = (num) => {
    setSelectedQuarters(num);
  };

  useEffect(() => {
    const { startTime, endTime } = quartersData[selectedQuarters - 1];

    function intervals(startString, endString) {
      const start = moment(startString, "hh:mm A");
      const end = moment(endString, "hh:mm A");
      const timeSlots = [];

      while (start < end) {
        const slotStart = start.format("hh:mm A");
        start.add(1, "hour");
        const slotEnd = start.format("hh:mm A");
        timeSlots.push(`${slotStart} - ${slotEnd}`);
      }

      setResult(timeSlots);
    }

    intervals(startTime, endTime);
  }, [selectedQuarters]);

  // Slot Selection
  const handleSlotSelection = (day, slot) => {
    const daySlots = selectedSlotsByDay[day] || [];
    setSelectedSlotsByDay((prevSelectedSlotsByDay) => ({
      ...prevSelectedSlotsByDay,
      [day]: daySlots.includes(slot)
        ? daySlots.filter((selectedSlot) => selectedSlot !== slot)
        : [...daySlots, slot],
    }));
  };

  // Slot Table
  const SlotTable = () => {
    return daysOfWeek.map((day, index) => {
      const currentDate = moment().add(index, "days").format("MMM DD");

      return (
        <div className="flex w-full items-center border-b-2 py-4" key={index}>
          <div className="w-[130px]">
            <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
              {day}
            </h2>
            <p className="text-[#575757] text-[0.8125rem]">{currentDate}</p>
          </div>
          <div className="grid grid-cols-6 max-w-full flex-2">
            {result.map((time, timeIndex) => (
              <div
                key={timeIndex}
                className={`${
                  selectedSlotsByDay[day] &&
                  selectedSlotsByDay[day].includes(time)
                    ? "bg-theme-blue text-[#fff]"
                    : "bg-gray-200"
                } text-center rounded-lg shadow-lg mx-4 flex my-3 p-3 cursor-pointer`}
                onClick={() => handleSlotSelection(day, time)}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`${server}/seller/create-seller`, {
        userId,
        firstName,
        lastName,
        gender,
        country,
        socialMediaProfiles,
        skillTags,
        languagesSpoken,
        professionalEmail,
        professionalSkill,
        professionalImage,
        about,
        educationExperiences,
        professionalExperiences,
        slotsAvailability,
        price,
      })
      .then((res) => {
        setSuccessMessage(res.data.message, "Seller Created Successfully.");
        setLoading(false);
        setstage(6);
        dispatch(loadSeller(userId));
        dispatch(getAllSellers());
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="relative h-10 w-1/4 text-center">
        <div className="rounded-full absolute top-1/2 -translate-y-1/2 w-full bg-neutral-200 h-1"></div>
        <motion.div
          animate={{ width: `${stage * 17}%` }}
          className="rounded-full absolute top-1/2 -translate-y-1/2 bg-theme-blue h-1"
        ></motion.div>
      </div>

      {/* Back Button */}
      {stage !== 6 && stage !== 0 && (
        <FloatButton
          icon={<ChevronLeftIcon className="font-semibold" />}
          style={{
            top: "2%",
            left: "2%",
          }}
          className="w-9 h-9"
          onClick={() => {
            if (stage > 0) {
              setstage(stage - 1);
            }
          }}
        />
      )}

      {/* Form Steps */}

      {/* Personal Details */}
      {stage === 0 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Personal Information
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Enter your Personal Information
            </div>
            <div className="tracking-tight grid grid-cols-2 mt-8 ml-10 mb-16">
              <div className="col-span-2">
                {/* Input Container */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {/* First Name */}
                  <div>
                    <Label htmlFor={"firstName"} children={"First Name"} />
                    <div className="mt-1">
                      <TextInput
                        id={"firstName"}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label htmlFor={"lastName"} children={"Last Name"} />
                    <div className="mt-1">
                      <TextInput
                        id={"lastName"}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <Label htmlFor={"gender"} children={"Select Your Gender"} />
                    <div className="mt-1">
                      <Select
                        options={genderData}
                        placeholder="Select Gender"
                        styles={customStyles}
                        isSearchable={false}
                        value={genderData.find(
                          (option) => option.value === gender
                        )}
                        onChange={(selectedOption) => {
                          const selectedValue = selectedOption.value;
                          setGender(selectedValue);
                        }}
                      />
                    </div>
                  </div>
                  {/* Tip */}
                  <div className="flex items-end w-3/4">
                    <h1 className="text-sm text-neutral-500">
                      Please submit accurate professional information for global
                      visibility. This will be displayed prominently for
                      potential buyers worldwide.
                    </h1>
                  </div>

                  {/* Country */}
                  <div>
                    <div className="relative">
                      <Label htmlFor={"country"} children={"Country"} />
                      <div className="mt-1">
                        <ReactFlagsSelect
                          selected={displayCountry}
                          onSelect={(code) =>
                            handleCountrySelect(
                              code,
                              customData.find((item) => item.value === code)
                                .label
                            )
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                          placeholder="Select Country"
                          searchable
                          searchPlaceholder="Search your Country"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleNextStep} label="Next Step" />
          </div>
        </>
      )}

      {/* Professional Details */}
      {stage === 1 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Professional Information
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Enter your Professional Information
            </div>
            <div className="tracking-tight grid grid-cols-3 mt-8 ml-10 mb-16">
              <div className="col-span-2">
                {/* Input Container */}
                <div className="grid grid-cols-1 gap-y-6">
                  {/* Professional Skill Name */}
                  <div>
                    <Label
                      htmlFor={"professionalSkill"}
                      children={"What Are You Offereing ?"}
                    />
                    <div className="mt-1">
                      <TextInput
                        id={"professionalSkill"}
                        value={professionalSkill}
                        onChange={(e) => setProfessionalSkill(e.target.value)}
                        placeholder="Professional Skill"
                      />
                    </div>
                  </div>

                  {/* Skill Tags */}
                  <div>
                    <Label htmlFor={"skillTags"} children={"Skill Tags"} />
                    <TagInput
                      id="skillTags"
                      tags={skillTags}
                      onTagsChange={setSkillTags}
                      placeholder="Add skill tags"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-7">
                  {/* Profesional Email */}
                  <div>
                    <Label
                      htmlFor={"professionalEmail"}
                      children={"Professional Email Address"}
                    />
                    <div className="mt-1">
                      <TextInput
                        id={"professionalEmail"}
                        value={professionalEmail}
                        onChange={(e) => setProfessionalEmail(e.target.value)}
                        placeholder="Add Professional Email Address"
                      />
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <Label
                      htmlFor={"languages"}
                      children={"Select Your Languages"}
                      CustomStyleProp={"mb-1"}
                    />
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

                  {/* Social Media Links */}

                  {/* LinkedIn */}
                  <div>
                    <Label htmlFor={"linkedin"} children={"LinkedIn URL"} />
                    <div className="mt-1">
                      <TextInput
                        id={"linkedin"}
                        name={"linkedin"}
                        value={socialMediaProfiles.linkedin}
                        onChange={handleChange}
                        placeholder="Add your LinkedIn URL here..."
                      />
                    </div>
                  </div>

                  {/* Twitter */}
                  <div>
                    <Label htmlFor={"twitter"} children={"Twitter URL"} />
                    <div className="mt-1">
                      <TextInput
                        id={"twitter"}
                        name={"twitter"}
                        value={socialMediaProfiles.twitter}
                        onChange={handleChange}
                        placeholder="Add your Twitter URL here..."
                      />
                    </div>
                  </div>

                  {/* Facebook */}
                  <div>
                    <Label htmlFor={"facebook"} children={"Facebook URL"} />
                    <div className="mt-1">
                      <TextInput
                        id={"facebook"}
                        name={"facebook"}
                        value={socialMediaProfiles.facebook}
                        onChange={handleChange}
                        placeholder="Add your Facebook URL here..."
                      />
                    </div>
                  </div>

                  {/* Github */}
                  <div>
                    <Label htmlFor={"github"} children={"Github URL"} />
                    <div className="mt-1">
                      <TextInput
                        id={"github"}
                        name={"github"}
                        value={socialMediaProfiles.github}
                        onChange={handleChange}
                        placeholder="Add your Github URL here..."
                      />
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <Label htmlFor={"instagram"} children={"Instagram URL"} />
                    <div className="mt-1">
                      <TextInput
                        id={"instagram"}
                        name={"instagram"}
                        value={socialMediaProfiles.instagram}
                        onChange={handleChange}
                        placeholder="Add your Instagram URL here..."
                      />
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="flex items-end w-3/4">
                    <h1 className="text-sm text-neutral-500">
                      Kindly provide the precise URLs for your social media
                      profiles, as these fields are optional.
                    </h1>
                  </div>
                </div>

                {/* About */}
                <div className="mt-7">
                  <Label htmlFor={"about"} children={"About Yourself"} />
                  <div className="mt-1">
                    <Textarea
                      rows={7}
                      name="about"
                      id="about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder={
                        "tell about yourself briefly your personality, your mission and vision..."
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Upload Profile Picture */}
              <div className="col-span-1 flex flex-col justify-center items-center">
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
                      src={professionalImage}
                      alt="Profile"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <>
                      {profileSVG(140, 140)}
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
            </div>

            <Button onClick={handleNextStep01} label="Next Step" />
          </div>
        </>
      )}

      {/* Education Details  */}
      {stage === 2 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Educational Information
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Enter your Educational Details
            </div>
            <div className="tracking-tight grid grid-cols-3 mt-8 ml-10">
              <div className="col-span-2">
                {/* Input Container */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {/* Qualification */}
                  <div className="relative">
                    <Label
                      htmlFor={"qualificaton"}
                      children={"Qualification"}
                    />
                    <Select
                      options={qualifications}
                      placeholder="Select Qualification"
                      styles={customStyles}
                      isSearchable={false}
                      value={qualifications.find(
                        (option) => option.label === qualification
                      )}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption.value;
                        setQualification(selectedValue);
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <Label
                      htmlFor={"subject"}
                      children={"What Subject did you studied?"}
                    />
                    <Select
                      options={degrees}
                      placeholder="Select Subject"
                      styles={customStyles}
                      isSearchable={false}
                      value={degrees.find((option) => option.value === subject)}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption.label;
                        setSubject(selectedValue);
                      }}
                    />
                  </div>

                  {/* Institution / University */}
                  <div>
                    <Label
                      htmlFor={"institution"}
                      children={"Instituition or University"}
                    />
                    <div className="mt-1">
                      <TextInput
                        id={"institution"}
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="University of Munchin"
                      />
                    </div>
                  </div>

                  {/* From & To Input */}
                  <div className="relative flex">
                    {/* From */}
                    <div className="mr-2 w-full flex-1">
                      <Label htmlFor={"fromDate"} children={"From"} />
                      <DatePicker
                        id="fromDate"
                        selected={educationalFromDate}
                        onChange={(date) => setEducationalFromDate(date)}
                        isClearable
                        placeholderText="mm/dd/yyyy"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                      />
                    </div>

                    {/* To */}
                    <div className="ml-2 w-full flex-1">
                      <Label htmlFor={"toDate"} children={"To"} />
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

                  {/* Experience Field */}
                  <div className="relative col-span-2">
                    <Label
                      htmlFor={"educationalExperience"}
                      children={" Tell us about your experience"}
                      CustomStyleProp={"mb-2"}
                    />
                    <p className="absolute right-0 top-1 text-xs md:text-sm text-neutral-400">
                      50 words minimum
                    </p>
                    <div className="mt-1 text-right">
                      <Textarea
                        rows={7}
                        name={"educationalExperience"}
                        id={"educationalExperience"}
                        value={educationalExperience}
                        onChange={(e) =>
                          setEducationalExperience(e.target.value)
                        }
                        placeholder={`How did you do as a student?\nWhat did you learn?\nHow can you help others with your education?\n\nOther specific details regarding the subject.`}
                        minLength={50}
                      />
                    </div>
                  </div>
                </div>

                {/* Add Qualification Button */}
                <AddButton
                  onClick={addEducationalExperience}
                  label={"Add Qualification"}
                />
              </div>

              {/* Upload Document Picture */}
              <div className="col-span-1 flex flex-col justify-center items-center">
                <h1 className="text-neutral-600 text-[19px] font-medium font-['Nunito'] mb-1">
                  Proof Document
                </h1>
                <span className="text-center text-zinc-500 text-[12px] font-medium font-['Nunito'] leading-[10.99px]">
                  Upload your degree or certificate of completion.
                  <br />
                  Our team will verify your document
                </span>
                <div
                  className="w-52 h-52 2xl:w-72 2xl:h-72 flex flex-col items-center justify-center ring-1 ring-neutral-300 rounded-3xl bg-neutral-200 cursor-pointer my-4"
                  onDragOver={handleDragOver}
                  onDrop={handleEducationDrop}
                  onClick={() => {
                    const fileInput =
                      document.querySelector('input[type="file"]');
                    fileInput.click();
                  }}
                >
                  {educationalDocument ? (
                    <img
                      src={educationalDocument}
                      alt="Profile"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <>
                      {proofDocSVG(140, 140)}
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
                  onChange={handleEducationFileChange}
                />
              </div>
            </div>

            <Button onClick={handleNextStep02} label="Next Step" />
          </div>
        </>
      )}

      {/* Professional Experiences  */}
      {stage === 3 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Professional Experience
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Enter your latest experience
            </div>
            <div className="tracking-tight grid grid-cols-3 mt-8 ml-10 mb-4">
              <div className="col-span-3">
                {/* Input Container */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {/* Company Name */}
                  <div>
                    <Label htmlFor={"company"} children={"Company Name"} />
                    <div className="mt-1">
                      <TextInput
                        id="company"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <Label htmlFor={"position"} children={"Your Position"} />
                    <div className="mt-1">
                      <TextInput
                        id="position"
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* From & To Input */}
                  <div className="relative flex">
                    {/* From */}
                    <div className="mr-2 w-full flex-1">
                      <Label htmlFor={"experienceFromDate"} children={"From"} />
                      <div>
                        <DatePicker
                          id="experienceFromDate"
                          selected={experienceFromDate}
                          onChange={(date) => setExperienceFromDate(date)}
                          isClearable
                          placeholderText="mm/dd/yyyy"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                        />
                      </div>
                    </div>
                    {/* To */}
                    <div className="ml-2 w-full flex-1">
                      <Label htmlFor={"experienceToDate"} children={"To"} />
                      <div>
                        <DatePicker
                          id="experienceToDate"
                          selected={experienceToDate}
                          onChange={(date) => setExperienceToDate(date)}
                          isClearable
                          placeholderText="mm/dd/yyyy"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date Detail */}
                  <div className="flex items-end">
                    <h1 className="text-sm text-neutral-500">
                      Share your experience dates to enhance your chances,
                      especially if you possess more extensive experience.
                    </h1>
                  </div>

                  {/* Experience */}
                  <div className="col-span-2">
                    <div className="w-full flex justify-between mb-2">
                      <Label
                        htmlFor={"professionalExperience"}
                        children={" Tell us about your professional experience"}
                      />
                      <p className="text-xs md:text-sm text-neutral-400">
                        50 words minimum
                      </p>
                    </div>
                    <div className="mt-2">
                      <Textarea
                        rows={7}
                        name="professionalExperience"
                        id="professionalExperience"
                        value={professionalExperience}
                        onChange={(e) =>
                          setProfessionalExperience(e.target.value)
                        }
                        placeholder={`How did you do as an employee?\nWhat did you learn?\nWhat project did you work on?\n\nOther specific details regarding the position...`}
                        minLength={50}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Experience Button */}
              <AddButton
                onClick={addProfessionalExperience}
                label={"Add Experience"}
                className01={"!w-[65%]"}
              />
            </div>

            {/* Next Step Button */}
            <Button onClick={handleNextStep03} label="Next Step" />
          </div>
        </>
      )}

      {/* Slots and Schedules  */}
      {stage === 4 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Schedule and Slots
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Select the slots you're available at
            </div>
            <div className="tracking-tight grid grid-cols-3 mb-8">
              <div className="col-span-3">
                <div className="w-full flex items-center justify-end">
                  {/* Quater Buttons */}
                  <div className="mx-3">
                    <h1 className="text-[#575757] text-[16px] m-2">Quarter</h1>
                    <div className="flex justify-center items-center">
                      {[1, 2, 3, 4].map((quarter) => (
                        <div
                          key={quarter}
                          className={`px-2 flex justify-center items-center border-2 cursor-pointer ${
                            selectedQuarters === quarter
                              ? "bg-theme-blue !text-[#fff]"
                              : "bg-gray-200 !text-[#575757]"
                          } rounded-md ml-2`}
                          onClick={() => handleQuaters(quarter)}
                        >
                          {quarter}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Slot Container */}
                <div className="w-full">{SlotTable()}</div>
              </div>
            </div>
            {/* Next Step Button */}
            <Button onClick={handleNextStep04} label="Next Step" />
          </div>
        </>
      )}

      {/* Pricing  */}
      {stage === 5 && (
        <>
          <div className="relative w-full py-8 px-10 h-full">
            {/* Heading */}
            <h1 className="text-2xl text-neutral-700 tracking-tight font-light">
              Customized Pricing
            </h1>
            {/* Sub Heading */}
            <div className="text-sm text-neutral-400 whitespace-pre-line">
              Set Your Own Rates and Boost Your Earnings
            </div>
            <div className="tracking-tight grid grid-cols-3">
              <div className="col-span-3">
                <div className="w-full h-[80%] flex flex-col justify-center items-center m-[25px] p-16">
                  <div className="w-[16rem]">
                    <h1 className="text-gray-600 font-nunito text-2xl font-normal leading-110 tracking-tighter mb-1">
                      Slot Price
                    </h1>
                  </div>
                  <div className="w-[17rem] h-[6.125rem] flex-shrink-0 border border-gray-300 bg-gray-200 items-center flex rounded-[1.1875rem] p-2">
                    <div className="flex">
                      <span className="text-gray-500 font-nunito text-2xl font-normal leading-110 tracking-tighter m-2">
                        USD
                      </span>
                      <div className="w-[0.0625rem] h-[3.3125rem] bg-[#878787] mx-2"></div>
                    </div>
                    <div className="flex justify-between items-center w-[60%]">
                      <input
                        type="number"
                        inputMode="numeric"
                        className="resize-none p-2  border-0 bg-transparent text-gray-700 font-nunito text-4xl font-medium leading-110 tracking-tighter outline-none border-none border-transparent w-full mr-2 focus:ring-transparent"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <span className="text-gray-400 font-nunito text-3xl font-normal leading-110 tracking-tighter">
                        /-
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              label={
                loading ? (
                  <div className="flex">
                    <LodingButton name={"Submitting"} />
                  </div>
                ) : (
                  "Submit"
                )
              }
            />
          </div>
        </>
      )}

      {/* Seller Created  */}
      {stage === 6 && <SuccessAnimation />}

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

export default OnboardingForms;
