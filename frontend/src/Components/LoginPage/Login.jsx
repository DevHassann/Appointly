import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LoginCover from "../../Assets/loginCover.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

import ErrorMessage from "../ErrorMessage.jsx";
import PromptMessage from "../PromptMessage.jsx";
import LodingButton from "../LodingButton";

import { server } from "../../server";

const Login = () => {
  const [viewPass, setviewPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setSuccessMessage(res.data.message);
        navigate("/main");
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
        {/* Side Image */}
        <div className="hidden lg:block lg:p-11  overflow-y-hidden">
          <img
            src={LoginCover}
            className=" h-full  w-full object-cover rounded-[2rem]"
            alt="Banner"
          />
        </div>

        {/* Login Form */}
        <div className=" flex flex-col justify-center">
          <form
            className="max-w-[500px] w-full mx-auto  p-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-20">
              <div>
                <h2 className="mainHeading text-3xl text-center pb-1">
                  Appointly
                </h2>
                <h2 className="text-black text-xl text-center">
                  The Best way of hiring cosultants.
                </h2>
              </div>

              <div>
                <div className=" py-2">
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-4 px-4 leading-tight focus:outline-none"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className=" py-2">
                  <div className="mt-0 relative">
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-4 px-4 leading-tight focus:outline-none "
                      type={viewPass ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    {viewPass ? (
                      <EyeSlashIcon
                        onClick={() => setviewPass(!viewPass)}
                        className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setviewPass(!viewPass)}
                        className="w-4 text-neutral-600 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                {/* todo == Next Link  */}
                <Link to="/forgetpassword">
                  <h1 className="text-base text-right font-light text-theme-blue cursor-pointer">
                    Forget Password?
                  </h1>
                </Link>

                <button className="border rounded-xl w-full mt-8 py-4 bg-theme-blue text-white text-xl flex justify-center items-center">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <LodingButton name={"Signing In"} />
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <button
                  type="button"
                  className="border rounded-xl w-full my-4  py-4 hover:bg-theme-blue hover:text-white text-neutral-600 text-xl flex justify-center items-center gap-x-2 tracking-wide	"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </span>
                  Continue With Google
                </button>
              </div>

              <div className="">
                <h2 className="text-neutral-500 text-lg text-center tracking-wide">
                  Create An Account.{" "}
                  <Link to="/signup" className="text-theme-blue">
                    Sign Up now
                  </Link>
                </h2>
              </div>
            </div>
          </form>
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

export default Login;
