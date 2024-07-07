import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "antd";

import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";
import LodingButton from "../../LodingButton";

import { FaHouseLock } from "react-icons/fa6";
import { DeleteAccount, DisableAccount } from "../../ModalBoxes";

const UserAccountOwnership = () => {
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {user == null ? (
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
                  Account Ownership & Authority
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <FaHouseLock />
                </span>
              </div>

              <div className="flex flex-col w-full rounded-xl">
                <div
                  className="p-4 rounded-lg bg-white"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                >
                  <div className="flex flex-col gap-4">
                    {/* Seller Details */}
                    <div className="flex gap-8 justify-center items-center border-b-2 w-full p-4">
                      <div className="flex flex-col w-[40%] gap-4 justify-center">
                        <div className="mb-[5rem]"></div>
                        <h1 className="text-2xl text-gray-500 border-gray-100">
                          Seller Account Details
                        </h1>
                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                      </div>
                      <div className="flex flex-col w-[60%] gap-6 justify-center">
                        <div className="w-full flex justify-end gap-4 border-b-2 p-4">
                          <div className="flex justify-center items-center">
                            <span className="flex flex-col items-end">
                              <span className="font-semibold">
                                {" "}
                                {seller?.firstName.toUpperCase()}{" "}
                                {seller?.lastName.toUpperCase()}
                              </span>
                              <span className="text-neutral-400">
                                {seller?.professionalEmail}
                              </span>
                            </span>
                          </div>
                          <div className="relative flex rounded-full bg-white">
                            <Avatar
                              size={60}
                              src={seller?.professionalImage?.url}
                            />
                          </div>
                        </div>

                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                      </div>
                    </div>

                    {/* Disable for Months */}
                    <div className="flex gap-8 justify-center items-center border-b-2 w-full p-4">
                      <div className="flex flex-col w-[40%] gap-2 justify-center">
                        <h1 className="text-2xl text-gray-500 border-gray-100 h-[35px]">
                          Disable your Account
                        </h1>
                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                      </div>
                      <div className="flex flex-col w-[60%] gap-8 justify-center">
                        <div className="h-[55px]"></div>
                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                        <div className="w-full flex items-center justify-start">
                          <DisableAccount />
                        </div>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="flex gap-8 justify-center items-center w-full p-4">
                      <div className="flex flex-col w-[40%] gap-2 justify-center">
                        <h1 className="text-2xl text-gray-500 border-gray-100 h-[35px]">
                          Delete Account
                        </h1>
                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                      </div>
                      <div className="flex flex-col w-[60%] gap-8 justify-center">
                        <div className="h-[55px]"></div>
                        <span className="text-base text-neutral-600 leading-6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere magni unde, iste cum odio iure sequi quos
                          odit ullam esse quam nam quae maxime placeat sint
                          omnis molestiae tempore voluptas.
                        </span>
                        <div className="w-full flex items-center justify-start">
                          <DeleteAccount />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default UserAccountOwnership;
