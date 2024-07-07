import React from "react";
import { useSelector } from "react-redux";

import { BsPersonVideo } from "react-icons/bs";

import SellerMeetingsTable from "../Includes/SellerMeetingsTable";
import Loader from "../../Loader";

const SellerMeetingsAndAppointments = () => {
  const { seller } = useSelector((state) => state.seller);

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
          <div className="h-screen p-4 bg-white">
            <div className="flex w-full justify-between items-center px-6 border-b-[1px] border-neutral-200">
              <h1 className="text-neutral-700 text-3xl">Meetings</h1>

              <span className="text-[40px] m-4 text-neutral-600">
                <BsPersonVideo />
              </span>
            </div>
            <div
              className="p-4 my-4 border-2 rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
            >
              <SellerMeetingsTable />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SellerMeetingsAndAppointments;
