import React, { useState } from "react";
import { useSelector } from "react-redux";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { GiCash } from "react-icons/gi";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerPriceManagement = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(0);

  const { seller } = useSelector((state) => state.seller);
  const [price, setPrice] = useState("");

  // Component Switch
  const ComponentSwitch = (num) => {
    setSelectedComponent(num);
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
                  Price Management
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <GiCash />
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
                  Your Wallet
                </div>
                <div className="w-[2px] h-7 mx-2 bg-gray-500"></div>
                <div
                  className={`ml-2 p-2 rounded-xl text-[20px] relative inline-block cursor-pointer font-semibold underlineAnimation02 ${
                    selectedComponent === 1 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(1)}
                >
                  Update Pricing Details
                </div>
              </div>

              {selectedComponent === 0 && (
                <>
                  <div className="p-4">Wallet Details and Graph etc</div>
                </>
              )}

              {selectedComponent === 1 && (
                <>
                  <div className="p-4">
                    <div className="w-full my-8 mb-12 flex items-center justify-center gap-[10%]">
                      <div
                        className="w-[230px] h-[300px] bg-[#4991FC] text-white rounded-2xl flex items-center flex-col justify-center"
                        style={{ boxShadow: "0px 31px 33px -30px #4991FC" }}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <i className="text-white w-[20px] h-[20px]">
                            <CheckCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-white rounded-3xl ml-2"></div>
                        </div>

                        <div className="flex items-center justify-center mb-2">
                          <i className="text-white w-[20px] h-[20px]">
                            <CheckCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-white rounded-3xl ml-2"></div>
                        </div>

                        <div className="flex items-center justify-center mb-2">
                          <i className="text-white w-[20px] h-[20px]">
                            <CheckCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-white rounded-3xl ml-2"></div>
                        </div>

                        <div className=" text-gray-500 font-nunito text-2xl font-normal leading-110 tracking-tighter m-2 bg-neutral-100 w-[180px] h-[90px] p-4 rounded-lg flex items-center justify-center mt-6 flex-col shadow-lg">
                          Current Price
                          <span className="text-black font-bold">
                            $ {seller && seller.price}
                          </span>
                        </div>
                      </div>

                      <div
                        className="w-[230px] h-[300px] bg-[#4991FC] text-white rounded-2xl flex items-center flex-col justify-center"
                        style={{ boxShadow: "0px 31px 33px -30px #4991FC" }}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <i className="text-white w-[20px] h-[20px]">
                            <CheckCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-white rounded-3xl ml-2"></div>
                        </div>

                        <div className="flex items-center justify-center mb-2">
                          <i className="text-white w-[20px] h-[20px]">
                            <CheckCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-white rounded-3xl ml-2"></div>
                        </div>

                        <div className="flex items-center justify-center mb-2">
                          <i className="text-neutral-400 w-[20px] h-[20px]">
                            <XCircleIcon />
                          </i>
                          <div className="w-[100px] h-[15px] bg-neutral-400 rounded-3xl ml-2"></div>
                        </div>

                        <div className="flex mt-6 border-1 rounded-lg p-5 bg-neutral-100 mx-3">
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
                              className="resize-none p-2  border-0 bg-transparent text-gray-700 font-nunito text-2xl font-medium leading-110 tracking-tighter outline-none border-none border-transparent w-full mr-2 focus:ring-transparent"
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

                    {/* Update Button */}
                    <div className="w-[90%] flex items-center justify-end mt-15">
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

export default SellerPriceManagement;
