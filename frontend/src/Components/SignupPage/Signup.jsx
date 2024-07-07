import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Checkbox, DatePicker, Form, Input, Steps } from "antd";
import PhoneInput from "react-phone-input-2";
import { server } from "../../server";
import "react-phone-input-2/lib/style.css";

import ErrorMessage from "../ErrorMessage";
import PromptMessage from "../PromptMessage";

import Signup01 from "../../Assets/signup01.jpeg";
import Signup02 from "../../Assets/signup02.jpeg";
import Signup03 from "../../Assets/signup03.jpg";
import Signup04 from "../../Assets/signup04.jpg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import LodingButton from "../LodingButton";

const Signup = () => {
  const [current, setCurrent] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [viewPass, setViewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const [form] = Form.useForm();

  const handleNextStep = async () => {
    try {
      const values = await validateAndSubmitForm();
      if (values) {
        setCurrent(current + 1);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePrevStep = () => {
    setCurrent(current - 1);
  };

  const validateAndSubmitForm = () => {
    return new Promise((resolve, reject) => {
      form
        .validateFields()
        .then((values) => {
          resolve(values);
        })
        .catch((error) => {
          reject(new Error("Please fill in all required fields."));
        });
    });
  };

  //   Progressbar Steps
  const items = [
    {
      title: "Email",
    },
    {
      title: "Password",
    },
    {
      title: "Profile Details",
    },
    {
      title: "Profile Picture",
    },
  ];

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`${server}/user/create-user`, {
        email,
        password,
        name,
        username,
        phoneNumber,
        dateOfBirth,
        profilePicture,
      })
      .then((res) => {
        setSuccessMessage(res.data.message, "User Created Successfully.");
        setLoading(false);
        window.location.reload(true);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
        <div className="flex flex-col max-w-[600px] w-full mx-auto p-4 lg:p-11 h-screen">
          <div className="flex flex-col flex-1 justify-center gap-y-10">
            {/* Heading */}
            <div className="text-center relative">
              <h2 className="text-black text-xl md:text-2xl">
                {current === 0
                  ? "Join thousands of"
                  : current === 1
                  ? "Hire a Professional or be"
                  : current === 2
                  ? "Forget the hassle"
                  : "Be Part of"}
              </h2>
              <div className="rounded-full w-12 h-12 bg-theme-blue mx-auto mt-2 mb-2 absolute hidden md:flex md:top-8 md:right-32 lg:right-24 -z-10" />
              <h2 className="mainHeading text-3xl md:text-5xl z-50">
                {current === 0
                  ? "Professionals"
                  : current === 1
                  ? "the Professional"
                  : current === 2
                  ? "of Appointments"
                  : "Our Appointly Now"}
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex">
              <Steps
                responsive={false}
                progressDot
                current={current}
                items={items}
              />
            </div>

            {/* Steps */}
            <div>
              {current === 0 ? (
                <>
                  <Form form={form}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not a valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input
                        className="inputStyles"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="agreement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Should accept the agreement")
                                ),
                        },
                      ]}
                    >
                      <Checkbox className="font-thin text-lg">
                        Agree to our{" "}
                        <Link to="/register" className="text-theme-blue">
                          Terms and Conditions
                        </Link>{" "}
                        &{" "}
                        <Link to="/register" className="text-theme-blue">
                          Privacy policy
                        </Link>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <button
                        type="submit"
                        onClick={handleNextStep}
                        className="border rounded-xl px-6 py-2 mt-3 bg-theme-blue text-white text-xl"
                      >
                        Next
                      </button>
                    </Form.Item>
                  </Form>
                </>
              ) : current === 1 ? (
                <>
                  <Form form={form}>
                    <Form.Item
                      className="mb-12"
                      name="password"
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
                            "Password must not be greater then 16 characters long",
                        },
                        {
                          pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
                          message: "Password should be alphanumeric",
                        },
                      ]}
                    >
                      <div className="mt-0 relative">
                        <input
                          className="inputStyles"
                          type={viewPass ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {viewPass ? (
                          <EyeSlashIcon
                            onClick={() => setViewPass(!viewPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => setViewPass(!viewPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
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
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The new password that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <div className="mt-0 relative">
                        <input
                          className="inputStyles"
                          type={viewConfirmPass ? "text" : "password"}
                          placeholder="Confirm Password"
                        />
                        {viewPass ? (
                          <EyeSlashIcon
                            onClick={() => setViewConfirmPass(!viewConfirmPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                          />
                        ) : (
                          <EyeIcon
                            onClick={() => setViewConfirmPass(!viewConfirmPass)}
                            className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                    </Form.Item>

                    <div className="mb-2">
                      <h1 className="text-neutral-500 text-sm font-light">
                        Password must be 8 characters long and should contain
                        alphanumeric characters.
                      </h1>
                    </div>

                    <Form.Item>
                      <button
                        onClick={handlePrevStep}
                        className="border mr-3 rounded-xl px-6 py-2 mt-4 bg-neutral-400 text-white text-xl"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="border rounded-xl px-6 py-2 mt-4 bg-theme-blue text-white text-xl"
                        onClick={handleNextStep}
                      >
                        Next
                      </button>
                    </Form.Item>
                  </Form>
                </>
              ) : current === 2 ? (
                <>
                  <Form form={form}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <input
                        className="inputStyles"
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username",
                        },
                      ]}
                    >
                      <input
                        className="inputStyles"
                        type="text"
                        placeholder="User Name"
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Contact info",
                        },
                      ]}
                      style={{ marginBottom: "15px" }}
                    >
                      <PhoneInput
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

                    <Form.Item
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      <label
                        htmlFor="dateOfBirth"
                        className="text-base text-neutral-400 leading-3 font-semibold m-1"
                      >
                        Date of Birth :
                      </label>
                      <Form.Item
                        name="dateOfBirth"
                        id="dateOfBirth"
                        autoComplete="bday"
                        rules={[{ required: false }]}
                        style={{ marginTop: "5px" }}
                      >
                        <DatePicker
                          className="inputStyles"
                          picker="day"
                          value={dateOfBirth}
                          onChange={(date) => {
                            const dateOfBirthISOString = date.toISOString();
                            setDateOfBirth(dateOfBirthISOString);
                          }}
                        />
                      </Form.Item>
                    </Form.Item>

                    <Form.Item>
                      <button
                        onClick={handlePrevStep}
                        className="border mr-3 rounded-xl px-6 py-2 bg-neutral-400 text-white text-xl"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="border rounded-xl px-6 py-2 bg-theme-blue text-white text-xl"
                      >
                        Next
                      </button>
                    </Form.Item>
                  </Form>
                </>
              ) : (
                <>
                  <Form form={form}>
                    <Form.Item>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block h-24 w-24 rounded-full overflow-hidden">
                          {profilePicture ? (
                            <img
                              src={profilePicture}
                              alt="avatar"
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <UserCircleIcon className="h-24 w-24 text-neutral-300" />
                          )}
                        </span>
                        <label
                          htmlFor="file-input"
                          className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                          <span>Upload Your Profile Picture</span>
                          <input
                            type="file"
                            name="profile"
                            id="file-input"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileInputChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <button
                        onClick={handlePrevStep}
                        className="border mr-3 rounded-xl px-6 py-2 mt-4 bg-neutral-400 text-white text-xl"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="border rounded-xl px-6 py-2 mt-4 bg-theme-blue text-white text-xl"
                      >
                        {loading ? (
                          <div className="flex">
                            <LodingButton name={"Signing up"} />
                          </div>
                        ) : (
                          "Signup"
                        )}
                      </button>
                    </Form.Item>
                  </Form>
                </>
              )}
            </div>
          </div>

          {/* Already An User  */}
          <div className="flex-2">
            <h2 className="text-neutral-500 text-lg tracking-wide text-center md:text-start">
              Already have an Account.{" "}
              <Link to="/login" className="text-theme-blue">
                Sign In now
              </Link>
            </h2>
          </div>
        </div>

        {/* Side Image */}
        <div className="hidden lg:block lg:p-11 overflow-y-hidden">
          <img
            src={
              current === 0
                ? Signup01
                : current === 1
                ? Signup02
                : current === 2
                ? Signup03
                : Signup04
            }
            className=" h-full  w-full object-cover rounded-[3rem]"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
            alt="Banner"
          />
        </div>
      </div>

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

export default Signup;
