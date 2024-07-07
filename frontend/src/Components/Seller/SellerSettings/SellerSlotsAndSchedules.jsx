import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import moment from "moment";

import { daysOfWeek, fakeDataSlot, quartersData } from "../../../Static/Data";
import { IoCalendarNumberSharp } from "react-icons/io5";

import LodingButton from "../../LodingButton";
import ErrorMessage from "../../ErrorMessage";
import PromptMessage from "../../PromptMessage";
import Loader from "../../Loader";

const SellerSlotsAndSchedules = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(0);

  const { seller } = useSelector((state) => state.seller);
  const [result, setResult] = useState([]);
  const [selectedQuarters, setSelectedQuarters] = useState(1);
  const [selectedSlotsByDay, setSelectedSlotsByDay] = useState({});

  // Quaters Button
  const handleQuaters = (num) => {
    setSelectedQuarters(num);
  };

  // Slots
  useEffect(() => {
    const { startTime, endTime } = quartersData[selectedQuarters - 1];

    function intervals(startString, endString) {
      const start = moment(startString, "hh:mm A");
      const end = moment(endString, "hh:mm A");
      const timeSlots = [];

      while (start < end) {
        const slotStart = start.format("hh:mm A");
        start.add(1, "hour");
        const slotEnd = start.format("hh:mm A");
        timeSlots.push(`${slotStart} - ${slotEnd}`);
      }

      setResult(timeSlots);
    }

    intervals(startTime, endTime);
  }, [selectedQuarters]);

  // Slot Section Function
  const handleSlotSelection = (day, slot) => {
    const daySlots = selectedSlotsByDay[day] || [];
    if (daySlots.includes(slot)) {
      setSelectedSlotsByDay((prevSelectedSlotsByDay) => {
        const newSelectedSlotsByDay = {
          ...prevSelectedSlotsByDay,
          [day]: daySlots.filter((selectedSlot) => selectedSlot !== slot),
        };

        return newSelectedSlotsByDay;
      });
    } else {
      setSelectedSlotsByDay((prevSelectedSlotsByDay) => {
        const newSelectedSlotsByDay = {
          ...prevSelectedSlotsByDay,
          [day]: [...daySlots, slot],
        };

        return newSelectedSlotsByDay;
      });
    }
  };

  // Slot Table
  const slotTable = () => {
    return daysOfWeek.map((day, index) => (
      <div className="flex w-full items-center border-b-2 py-4" key={index}>
        <div className="w-[130px]">
          <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
            {day}
          </h2>
          <p className="text-[#575757] text-[0.8125rem]">
            {moment().format("MMM DD")}
          </p>
        </div>
        <div className="grid grid-cols-6 max-w-full flex-2">
          {result.map((time, timeIndex) => {
            const isSelected =
              selectedSlotsByDay[day] && selectedSlotsByDay[day].includes(time);

            const isFakeDataSlot =
              fakeDataSlot[day] && fakeDataSlot[day].includes(time);

            return (
              <div
                key={timeIndex}
                className={`${
                  isSelected
                    ? "bg-theme-blue text-[#fff]"
                    : "bg-gray-200 selectedBoxShadow"
                } ${
                  isFakeDataSlot ? "bg-orange-500 text-[#fff]" : ""
                } text-center rounded-lg shadow-lg mx-4 flex my-3 p-3 cursor-pointer`}
                onClick={() => handleSlotSelection(day, time)}
              >
                <p>{time}</p>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  // Component Switch
  const ComponentSwitch = (num) => {
    setSelectedComponent(num);
  };

  const displaySchedule = () => {
    return (
      <div className="px-4">
        {/* Slots */}
        <div className="w-full">
          {seller.slotsAvailability.map(
            (dayData, index) =>
              // Check if there are slots available for the day
              dayData.slot.length > 0 && (
                <div
                  key={index}
                  className="flex w-full items-center border-b-2 py-4"
                >
                  {/* Day and Date */}
                  <div className="w-[130px]">
                    <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
                      {dayData.day}
                    </h2>
                    <p className="text-[#575757] text-[0.8125rem]">
                      {moment().format("MMM DD")}
                    </p>
                  </div>
                  {/* Time Slots */}
                  <div className={`grid grid-cols-4 max-w-full flex-2`}>
                    {dayData.slot.map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="bg-orange-500 text-[#fff] text-center rounded-lg shadow-lg mx-4 flex my-3 p-3"
                      >
                        <p>{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    );
  };

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
          <div className="flex items-center w-full p-8 bg-white">
            <div className="w-full">
              {/* Headings */}
              <div className="mb-8 border-b-[1px] flex justify-between items-center">
                <h2 className="text-2xl text-gray-500 border-gray-100">
                  Slots & Schedules
                </h2>

                <span className="text-[40px] m-4 text-neutral-600">
                  <IoCalendarNumberSharp />
                </span>
              </div>

              {/* Switch Button */}
              <div className="w-full flex items-center">
                <div
                  className={`mr-2 p-2 rounded-xl text-[20px] relative inline-block cursor-pointer font-semibold underlineAnimation ${
                    selectedComponent === 0 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(0)}
                >
                  Update Your Slot
                </div>
                <div className="w-[2px] h-7 mx-2 bg-gray-500"></div>
                <div
                  className={`ml-2 p-2 rounded-xl text-[20px] relative inline-block cursor-pointer font-semibold underlineAnimation02 ${
                    selectedComponent === 1 ? "underlineAnimationActive" : ""
                  }`}
                  onClick={() => ComponentSwitch(1)}
                >
                  Your Current Slots
                </div>
              </div>

              {selectedComponent === 0 && (
                <>
                  <div className="p-4">
                    <div className="tracking-tight grid grid-cols-3 mb-8">
                      <div className="col-span-3">
                        <div className="w-full flex items-center justify-end">
                          {/* Quater Buttons */}
                          <div className="mx-3">
                            <h1 className="text-[#575757] text-[16px] m-2">
                              Quarters
                            </h1>
                            <div className="flex justify-center items-center">
                              {[1, 2, 3, 4].map((quarter) => (
                                <div
                                  key={quarter}
                                  className={`px-2 flex justify-center items-center border-2 cursor-pointer ${
                                    selectedQuarters === quarter
                                      ? "bg-theme-blue !text-[#fff]"
                                      : "bg-gray-200 !text-[#575757]"
                                  } rounded-md ml-2`}
                                  onClick={() => handleQuaters(quarter)}
                                >
                                  {quarter}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Slot Container */}
                        <div className="w-full">{slotTable()}</div>
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="w-full flex items-center justify-end mt-8">
                      <button className="bg-blue-500 text-white w-[20%] px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        {loading ? (
                          <div className="flex">
                            <LodingButton name={"Updating"} />
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {selectedComponent === 1 && (
                <>
                  <div className="p-4">{displaySchedule()}</div>
                </>
              )}
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

export default SellerSlotsAndSchedules;
