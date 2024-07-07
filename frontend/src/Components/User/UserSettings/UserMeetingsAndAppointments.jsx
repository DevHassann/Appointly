import React from "react";

import { MdVideoCameraFront } from "react-icons/md";

import MeetingsTable from "../Includes/MeetingsTable";

const UserMeetingsAndAppointments = () => {
  return (
    <>
      <div className="h-screen p-4 bg-white">
        <div className="flex w-full justify-between items-center px-6 border-b-[1px] border-neutral-200">
          <h1 className="text-neutral-700 text-3xl">Meetings</h1>

          <span className="text-[40px] m-4 text-neutral-600">
            <MdVideoCameraFront />
          </span>
        </div>
        <div
          className="p-4 my-4 border-2 rounded-lg bg-white"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          }}
        >
          <MeetingsTable />
        </div>
      </div>
    </>
  );
};

export default UserMeetingsAndAppointments;
