import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import { server } from "../../server";

import PromptMessage from "../PromptMessage";
import ErrorMessage from "../ErrorMessage";
import LodingButton from "../LodingButton";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canNavigateToLogin, setCanNavigateToLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { reset_token } = useParams();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Password does not match");
        return;
      }

      if (newPassword.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        return;
      }

      const response = await axios.post(
        `${server}/user/reset-password/${reset_token}`,
        { newPassword, confirmPassword },
        { withCredentials: true }
      );

      if (response.data.success) {
        setLoading(false);
        setSuccessMessage("Password reset successfully");
        setCanNavigateToLogin(true);
      } else {
        setLoading(false);
        setErrorMessage("Password reset failed");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (canNavigateToLogin) {
      navigate("/login");
    }
  }, [canNavigateToLogin, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center h-screen">
        <form className="max-w-[500px] w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="mainHeading text-3xl pb-1 text-theme-blue">
              Reset Password
            </h2>
            <p className="text-black text-lg mb-4">
              Enter your new password and confirm it.
            </p>
          </div>

          <div className="py-2">
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-4 px-4 leading-tight focus:outline-none"
              type="password"
              placeholder="New Password"
              id="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="py-2">
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-4 px-4 leading-tight focus:outline-none"
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="border rounded-xl w-full mt-4 py-4 bg-theme-blue text-white text-xl  flex justify-center items-center"
            onClick={handlePasswordReset}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LodingButton name={"Updating"} />
              </div>
            ) : (
              "Update Password"
            )}
          </button>

          <div className="mt-4 text-center">
            <h2 className="text-neutral-500 text-lg">
              Remember your password?{" "}
              <Link to="/signin" className="text-theme-blue">
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
  );
};

export default ResetPassword;
