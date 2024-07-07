import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ReactFlagsSelect from "react-flags-select";
import Select from "react-select";

import { customData, genderData } from "../../../Static/Data";
import { customStyles } from "../../../Styles/Style";
import { PiIdentificationBadgeFill } from "react-icons/pi";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerPersonalInformation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { seller } = useSelector((state) => state.seller);
  const [firstName, setFirstName] = useState(seller && seller.firstName);
  const [lastName, setLastName] = useState(seller && seller.lastName);
  const [gender, setGender] = useState(seller && seller.gender);
  const [country, setCountry] = useState(seller && seller.country);
  const [displayCountry, setDisplayCountry] = useState(null);

  // Country Data Handle
  const handleCountrySelect = (code, label) => {
    setDisplayCountry(code);
    setCountry(label);
  };

  useEffect(() => {
    if (seller && seller.country) {
      const countryValue = customData.find(
        (item) => item.label === seller.country
      )?.value;
      setDisplayCountry(countryValue || null);
    }
  }, [seller]);

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
          <div className="flex items-center bg-white w-full p-8">
            <div className="w-full">
              {/* Headings */}
              <div className="mb-8 border-b-[1px] flex justify-between items-center">
                <h2 className="text-2xl text-gray-500 border-gray-100">
                  Personal Information
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <PiIdentificationBadgeFill />
                </span>
              </div>

              {/* Input Containers */}
              <div className="flex flex-col gap-8">
                {/* Name Inputs */}
                <div className="flex">
                  <div className="w-1/2 pr-2">
                    <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                      Change your First Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="First Name"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-base font-semibold leading-5 text-neutral-700 mb-3">
                      Change your Last Name :
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 border-gray-300"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                  >
                    Change your Gender :
                  </label>
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

                {/* Country */}
                <div className="relative">
                  <label
                    htmlFor="country"
                    className="block text-base font-semibold leading-5 text-neutral-700 mb-3"
                  >
                    Change your Country :
                  </label>
                  <div className="mt-1">
                    <ReactFlagsSelect
                      selected={displayCountry}
                      onSelect={(code) =>
                        handleCountrySelect(
                          code,
                          customData.find((item) => item.value === code).label
                        )
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6"
                      placeholder="Select Country"
                      searchable
                      searchPlaceholder="Search your Country"
                    />
                  </div>
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

export default SellerPersonalInformation;
