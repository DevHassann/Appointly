import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { DatePicker, Form, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import { loadUser, updateUserInformation } from "../../../Store/Actions/user";
import { clearErrors, clearMessages } from "../../../Store/Reducers/user";
import { server } from "../../../server";

import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";
import LodingButton from "../../LodingButton";

import { RiSettings3Fill } from "react-icons/ri";

const UserAccountSettings = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState(user && user.email);
  const [name, setName] = useState(user && user.name);
  const [username, setUsername] = useState(user && user.username);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(
    user && user.dateOfBirth ? new Date(user.dateOfBirth) : null
  );
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch();

  const handleUserInfo = () => {
    try {
      setLoading(true);
      dispatch(clearErrors());
      dispatch(clearMessages());

      dispatch(
        updateUserInformation(email, username, dateOfBirth, name, phoneNumber)
      ).then(() => {
        setLoading(false);
        setSuccessMessage("User Information Updated Successfully!");
        dispatch(loadUser());
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log("Selected file:", file);
      setProfilePicture(fileUrl);
    }
  };

  const handleUserProfilePicture = async () => {
    if (profilePicture) {
      console.log("Uploading profile picture:", profilePicture);
      setLoadingImage(true);

      try {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);

        const response = await axios.put(
          `${server}/user/update-profilePicture`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setLoadingImage(false);
        setSuccessMessage(response.data.message);
        setProfilePicture(null);
        dispatch(loadUser());
      } catch (error) {
        setLoadingImage(false);
        setErrorMessage(error.response.data.message);
      }
    }
  };

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
                  Profile Account Settings
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <RiSettings3Fill />
                </span>
              </div>

              <div className="flex flex-col gap-8">
                <div
                  className="p-4 bg-white rounded-lg flex items-center justify-between"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                >
                  <div className="flex items-center">
                    <label htmlFor="image">
                      <input
                        type="file"
                        accept="image/*"
                        id="image"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <img
                        src={profilePicture || user?.profilePicture?.url}
                        alt="Profile"
                        className="w-[60px] h-[60px] rounded-full mx-3 cursor-pointer object-cover"
                      />
                    </label>
                    <p className="text-neutral-700 text-[16px] ml-2">
                      Upload new profile photo
                    </p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-[20%] flex justify-center items-center"
                    onClick={handleUserProfilePicture}
                  >
                    {loadingImage ? (
                      "Updating..."
                    ) : (
                      <>{profilePicture ? "Confrim" : "Update"}</>
                    )}
                  </button>
                </div>

                <div
                  className="p-4 rounded-lg bg-white"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                >
                  <Form>
                    <Form.Item>
                      <label
                        htmlFor="name"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Change your Name :
                      </label>
                      <Input
                        className="inputStyles mt-2"
                        type="name"
                        name="name"
                        placeholder="Your Name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <label
                        htmlFor="username"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Change your Username :
                      </label>
                      <Input
                        className="inputStyles mt-2"
                        type="username"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <label
                        htmlFor="tel"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Change your Phone Number :
                      </label>
                      <PhoneInput
                        name="phoneNumber"
                        id="phoneNumber"
                        autoComplete="tel"
                        enableSearch
                        containerClass="border border-gray-300 w-full rounded-xl"
                        placeholder="Phone Number"
                        inputStyle={{
                          border: "none",
                          outline: "none",
                          paddingBottom: 28,
                          paddingTop: 28,
                          width: "100%",
                          appearance: "none",
                          backgroundColor: "rgb(243, 244, 246)",
                          borderRadius: "12px",
                          fontWeight: 400,
                        }}
                        buttonStyle={{
                          border: "none",
                          outline: "none",
                          background: "none",
                          padding: 5,
                          marginRight: 80,
                        }}
                        disableSearchIcon
                        country={"us"}
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <label
                        htmlFor="email"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Change your Email :
                      </label>
                      <Input
                        className="inputStyles mt-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <label
                        htmlFor="dateOfBirth"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Change your Date of Birth :
                      </label>
                      <DatePicker
                        className="inputStyles mt-2"
                        picker="day"
                        value={dateOfBirth ? moment(dateOfBirth) : null}
                        onChange={(date, dateString) => {
                          setDateOfBirth(date);
                        }}
                      />
                    </Form.Item>

                    <Form.Item>
                      {/* User Info Update button  */}
                      <button
                        onClick={handleUserInfo}
                        className="border rounded-lg px-6 py-2 mt-2 bg-theme-blue text-white text-xl w-full flex justify-center items-center"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <LodingButton name={"Updating"} />
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>
                    </Form.Item>
                  </Form>
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

export default UserAccountSettings;
