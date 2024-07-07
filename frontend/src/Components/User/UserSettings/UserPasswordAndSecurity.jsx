import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Form } from "antd";
import { server } from "../../../server";

import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";
import LodingButton from "../../LodingButton";

import { RiLockPasswordFill } from "react-icons/ri";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const UserPasswordAndSecurity = () => {
  const { user } = useSelector((state) => state.user);
  const [viewPass, setViewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);
  const [viewOldPass, setViewOldPass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios
      .put(
        `${server}/user/change-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccessMessage(res.data.success);
        setLoading(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      });
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
                  Password & Security
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <RiLockPasswordFill />
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
                  <Form>
                    <Form.Item className="mb-10" name="oldPassword">
                      <div className="mt-0 relative">
                        <label
                          htmlFor="oldPassword"
                          className="text-base text-neutral-400 leading-3 font-semibold m-1"
                        >
                          Enter your Old Password :
                        </label>
                        <input
                          className="inputStyles mt-2"
                          type={viewOldPass ? "text" : "password"}
                          placeholder="Old Password"
                          id="oldPassword"
                          name="oldPassword"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {viewOldPass ? (
                          <EyeSlashIcon
                            onClick={() => setViewOldPass(!viewOldPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => setViewOldPass(!viewOldPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </Form.Item>

                    <Form.Item
                      className="mb-10"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        {
                          max: 16,
                          message:
                            "Password must not be greater than 16 characters long",
                        },
                        {
                          pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
                          message: "Password should be alphanumeric",
                        },
                      ]}
                    >
                      <div className="mt-0 relative">
                        <label
                          htmlFor="newPassword"
                          className="text-base text-neutral-400 leading-3 font-semibold m-1"
                        >
                          Enter your New Password :
                        </label>
                        <input
                          className="inputStyles mt-2"
                          type={viewPass ? "text" : "password"}
                          placeholder="New Password"
                          id="newPassword"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {viewPass ? (
                          <EyeSlashIcon
                            onClick={() => setViewPass(!viewPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => setViewPass(!viewPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      dependencies={["password"]}
                      className="mb-8"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },

                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The new password that you entered does not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <div className="mt-0 relative">
                        <label
                          htmlFor="confirm"
                          className="text-base text-neutral-400 leading-3 font-semibold m-1"
                        >
                          Confirm your Password :
                        </label>
                        <input
                          className="inputStyles mt-2"
                          type={viewConfirmPass ? "text" : "password"}
                          placeholder="Confirm Password"
                          id="confirm"
                          name="confirm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {viewConfirmPass ? (
                          <EyeSlashIcon
                            onClick={() => setViewConfirmPass(!viewConfirmPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => setViewConfirmPass(!viewConfirmPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-[70%] -translate-y-1/2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <button
                        onClick={passwordChangeHandler}
                        className="border rounded-lg px-6 py-2 mt-2 bg-theme-blue text-white text-xl w-full flex justify-center items-center"
                      >
                        {loading ? (
                          <div className="flex">
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

export default UserPasswordAndSecurity;
