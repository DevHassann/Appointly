import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";

const ZoomMeeting = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  // Toggle camera function
  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  // Toggle microphone function
  const toggleMic = () => {
    setMicOn((prev) => !prev);
  };

  // Toggle speaker function
  const toggleSpeaker = () => {
    setSpeakerOn((prev) => !prev);
  };

  return (
    <>
      <div className="flex w-[100%] h-[100vh] bg-black">
        <div className="w-full h-full">
          {cameraOn ? (
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Video Call"
              className="h-[100vh] w-[100vw] object-cover absolute"
            />
          ) : (
            <div className="h-[100vh] w-[100vw] absolute bg-theme-blue flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1700839154423-83ea2246621b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-[200px] h-[200px] rounded-full"
              />
            </div>
          )}

          <div className="relative flex items-end justify-between w-[100%] h-[100vh]">
            <div className="flex-1"></div>

            {/* Button Option */}
            <div className="h-[40%] w-[35%] my-8 flex items-end justify-center gap-8">
              {/* Button 1 */}
              <div
                className="bg-gray-400 w-[50px] h-[50px] rounded-full mb-4 flex items-center justify-center cursor-pointer"
                onClick={toggleCamera}
              >
                <span className="text-[#fff] text-[30px]">
                  {cameraOn ? <FaVideo /> : <FaVideoSlash />}
                </span>
              </div>

              {/* Button 2 */}
              <div
                className="bg-gray-400 w-[50px] h-[50px] rounded-full mb-4 flex items-center justify-center cursor-pointer"
                onClick={toggleMic}
              >
                <span className="text-[#fff] text-[30px]">
                  {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </span>
              </div>

              {/* Button 3 */}
              <div
                className="bg-gray-400 w-[50px] h-[50px] rounded-full mb-4 flex items-center justify-center cursor-pointer"
                onClick={toggleSpeaker}
              >
                <span className="text-[#fff] text-[30px]">
                  {speakerOn ? <HiSpeakerWave /> : <HiSpeakerXMark />}
                </span>
              </div>

              {/* Button 4 */}
              <div className="bg-gray-400 w-[50px] h-[50px] rounded-full mb-4 flex items-center justify-center cursor-pointer">
                <Link to="/main">
                  <span className="text-red-600 text-[30px]">
                    <IoCall />
                  </span>
                </Link>
              </div>
            </div>

            {/* Reciver */}
            <div className="h-[35%] w-[30%] bg-blue-700 m-8 rounded-xl flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoomMeeting;
