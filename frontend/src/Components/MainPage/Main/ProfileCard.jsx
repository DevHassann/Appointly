import React from "react";
import { Link } from "react-router-dom";

import Ratings from "../../Ratings";

const ProfileCard = ({ data }) => {
  const daysWithSlots = data.slotsAvailability
    .filter((day) => day.slot.length > 0)
    .map((day) => day.day.trim());

  const getAbbreviatedDay = (fullDay) => {
    const daysMap = {
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
      Saturday: "Sat",
      Sunday: "Sun",
    };

    return daysMap[fullDay] || fullDay;
  };

  return (
    <>
      <Link to={`/seller/${data._id}`}>
        <div className="relative overflow-hidden grid grid-rows-2 p-5 pb-2 bg-white drop-shadow-md shadow-text-main/10 ring-1 ring-neutral-200 max-w-full h-[100%] rounded-lg gap-y-6 transition-transform hover:scale-[1.01] hover:cursor-pointer">
          <img
            src={data.professionalImage.url}
            width={30}
            height={30}
            className="w-full h-48 rounded-lg object-cover"
            style={{ objectPosition: "0% 10%" }}
            alt=""
          ></img>
          <div className="text-xs">
            <div>
              <div className="leading-7 text-4xl whitespace-nowrap max-w-[99%] text-ellipsis">
                {data.firstName} {data.lastName}
              </div>
              <div className="text-xs text-neutral-700 mt-1">
                {data.country}
              </div>
            </div>
            <div className="text-base font-bold mb-2 mt-1">
              {data.professionalSkill}
            </div>
            <div>
              <div className="flex w-3/4 justify-between text-sm">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((fullDay, i) => (
                  <div
                    key={i}
                    className={`${
                      daysWithSlots.includes(fullDay.trim())
                        ? "text-neutral-700"
                        : "text-neutral-300"
                    } whitespace-nowrap`}
                  >
                    {getAbbreviatedDay(fullDay)}
                  </div>
                ))}
              </div>
              <div className="mt-2 mb-7">
                {data.languagesSpoken.map((language, i) => (
                  <span
                    key={i}
                    className="mr-2 ring-1 ring-neutral-500 rounded-full px-1"
                  >
                    {language}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 w-full">
                <div>
                  <div className="flex mb-1">
                    {<Ratings rating={data.rating} />}
                  </div>
                  <div className="text-[10px] text-neutral-600">
                    <span className="font-bold">{data.rating}</span>{" "}
                    <span className="font-light">
                      ({data.reviews.length}) reviews
                    </span>
                  </div>
                </div>
                <div className="font-light flex items-end text-[9px] 2xl:text-[12px] justify-center">
                  <span className="font-semibold">{"24"} Slots </span>/ Week
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex flex-col items-center justify-center text-4xl text-right bottom-0 right-0 px-4 py-2 bg-[#38b2f8] text-white rounded-tl-2xl">
            <span className="text-right">
              <div className="font-bold">${data.price}</div>
              <div className="text-sm leading-3">/slot</div>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileCard;
