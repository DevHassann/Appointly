import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { server } from "../../server";

import ErrorMessage from "../ErrorMessage";
import PromptMessage from "../PromptMessage";
import LodingButton from "../LodingButton";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (email.trim() === "") {
      setErrorMessage("Please fill in your email address.");
      return;
    }

    try {
      const response = await axios.post(`${server}/user/forget-password`, {
        email,
      });

      if (response.status === 200) {
        setLoading(false);
        setSuccessMessage(response.data.message);
      } else {
        setLoading(false);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setErrorMessage(error.response.data.message);
      } else {
        setLoading(false);
        setErrorMessage("An error occurred while sending the reset request.");
      }
    }
  };

  return (
    <>
      <>
        <div className="flex flex-col justify-center h-screen">
          <form className="max-w-[500px] w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="mainHeading text-3xl pb-1 text-theme-blue">
                Forgot Password
              </h2>
              <p className="text-black text-lg mb-4">
                Enter your email to reset your password.
              </p>
            </div>

            <div className="py-2">
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-4 px-4 leading-tight focus:outline-none"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="border rounded-xl w-full mt-4 py-4 bg-theme-blue text-white text-xl flex justify-center items-center"
              onClick={handleResetPassword}
            >
              {loading ? (
                <div className="flex items-center justify-center ">
                  <LodingButton name={"Sending"} />
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="mt-4 text-center">
              <h2 className="text-neutral-500 text-lg">
                Remember your password?{" "}
                <Link to="/login" className="text-theme-blue">
                  Sign in
                </Link>
              </h2>
            </div>
          </form>
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
    </>
  );
};

export default ForgetPassword;
