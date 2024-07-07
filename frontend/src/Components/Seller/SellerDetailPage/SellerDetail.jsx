import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import moment from "moment";
import { format, parseISO } from "date-fns";

import { fakeDataSlot, ratingsAndReviews } from "../../../Static/Data";
import { daysOfWeek, quartersData } from "../../../Static/Data";
import RatingsStars from "../../RatingStars";

import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { SiGithub } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import Empty from "../../../Assets/empty.svg";
import ReviewsAnimation from "./ReviewsAnimation";

const SellerDetail = ({ data }) => {
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [selectedQuarters, setSelectedQuarters] = useState(1);
  const [selectedSlotsByDay, setSelectedSlotsByDay] = useState({});
  const [result, setResult] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const { seller } = useSelector((state) => state.seller);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (seller && seller._id) {
      setIsCurrentUser(id === seller._id);
    }
  }, [id, seller]);

  const handleQuarters = (num) => {
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

  const handleSlotSelection = (day, slot) => {
    const daySlots = selectedSlotsByDay[day] || [];
    const newSelectedSlotsByDay = {
      ...selectedSlotsByDay,
      [day]: daySlots.includes(slot)
        ? daySlots.filter((selectedSlot) => selectedSlot !== slot)
        : [...daySlots, slot],
    };
    setSelectedSlotsByDay(newSelectedSlotsByDay);

    const updatedSelectedSlots = Object.keys(newSelectedSlotsByDay).map(
      (selectedDay) => {
        return {
          day: selectedDay,
          slot: newSelectedSlotsByDay[selectedDay],
        };
      }
    );

    setSelectedSlots(updatedSelectedSlots);
  };

  const SlotTable = () => {
    return daysOfWeek.map((day, index) => {
      const currentDate = moment().add(index, "days").format("MMM DD");

      const dayData = data.slotsAvailability.find((item) => item.day === day);

      if (dayData) {
        const filteredSlots = dayData.slot.filter((time) => {
          const quarter = getQuarter(moment(time, "hh:mm A"));
          return selectedQuarters === quarter;
        });

        if (filteredSlots.length > 0) {
          return (
            <div
              className="flex w-full items-center border-b-2 py-4"
              key={index}
            >
              <div className="w-[130px]">
                <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
                  {dayData.day}
                </h2>
                <p className="text-[#575757] text-[0.8125rem]">{currentDate}</p>
              </div>
              <div className={`grid grid-cols-3 max-w-full flex-2`}>
                {dayData.slot
                  .filter((time) => {
                    const quarter = getQuarter(moment(time, "hh:mm A"));
                    return selectedQuarters === quarter;
                  })
                  .map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className={`${
                        selectedSlotsByDay[day] &&
                        selectedSlotsByDay[day].includes(time)
                          ? "bg-theme-blue text-[#fff]"
                          : "bg-gray-200"
                      } text-center rounded-lg shadow-lg mx-4 flex my-3 p-3 cursor-pointer`}
                      onClick={() => handleSlotSelection(day, time)}
                    >
                      <p>{time}</p>
                    </div>
                  ))}
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="flex w-full items-center border-b-2 py-4"
              key={index}
            >
              <div className="w-[130px]">
                <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
                  {dayData.day}
                </h2>
                <p className="text-[#575757] text-[0.8125rem]">{currentDate}</p>
              </div>
              <div className="flex-2">
                <p className="text-[#575757] text-[1.3125rem] font-semibold">
                  Slot not available in this quarter of the day
                </p>
              </div>
            </div>
          );
        }
      } else {
        return null;
      }
    });
  };

  const SelectedSlotsSection = () => {
    const pricePerSlot = data.price;
    const selectedSlotsCount = Object.values(selectedSlotsByDay).reduce(
      (acc, slots) => acc + slots.length,
      0
    );
    const totalFees = selectedSlotsCount * pricePerSlot;

    // Creating Order
    const userId = user._id;
    const sellerId = id;
    let totalPrice = 0;

    selectedSlots.forEach((selectedSlot) => {
      totalPrice += selectedSlot.slot.length * data.price;
    });

    const selectedSlotsString = JSON.stringify(selectedSlots);

    return (
      <div
        className="w-[32rem] h-[80%] rounded-[28px] bg-[#F5F5F5] p-10 shadow-md"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        {selectedSlotsCount === 0 ? (
          <>
            <div className="h-[27rem] w-full">
              <img src={Empty} className="w-full h-full" alt="Empty" />
            </div>
          </>
        ) : (
          <>
            <div className="border-b-[1px] border-[#575757] mb-6">
              <h1 className="text-[20px] text-[#575757] font-normal">
                Selected Slots
              </h1>
            </div>
            <div id="slotsContainer" className="h-[12rem] overflow-y-scroll">
              {Object.keys(selectedSlotsByDay).map((day) => (
                <div key={day} className="mb-3 mx-[5px]">
                  <h1 className="text-[#434343] text-[16px] font-bold mb-2">
                    {day}
                  </h1>
                  {selectedSlotsByDay[day].map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white text-[18px] tracking-tighter px-3 py-3 rounded-[12px] mb-3"
                      style={{
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <p>{slot}</p>
                      <i
                        className="text-theme-blue cursor-pointer"
                        onClick={() => handleRemoveSlot(day, slot)}
                      >
                        <AiFillCloseCircle />
                      </i>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 mb-2 px-5 tracking-tighter">
              <div className="w-full flex items-center justify-between font-light text-[15px] text-[#434343] leading-[101.9%] tracking-[-0.525px]">
                <h1 className="w-14">Slots</h1>
                <span className="h-[1px] w-[50%] bg-neutral-400"></span>
                <h1 className="w-14 text-right ">{selectedSlotsCount}</h1>
              </div>

              <div className="w-full flex items-center justify-between font-light text-[15px] text-[#434343] leading-[101.9%] tracking-[-0.525px] mt-2">
                <h1 className="w-14">Fees</h1>
                <span className="h-[1px] w-[50%] bg-neutral-400"></span>
                <h1 className="w-14 text-right">${totalFees}</h1>
              </div>
              <div className="h-[1px] w-full bg-neutral-400 my-1 mt-6"></div>

              <div className="w-full flex items-center justify-between text-[19px] font-medium text-[#434343] leading-[101.9%] tracking-[-0.665px]">
                <h1 className="w-14 my-4">Fees</h1>
                <h1 className="w-14 text-right my-4">${totalFees}</h1>
              </div>
            </div>
            <Link
              to={{
                pathname: "/booknow",
                search: `?userId=${userId}&sellerId=${sellerId}&totalPrice=${totalPrice}&selectedSlots=${selectedSlotsString}&pricePerSlot=${pricePerSlot}`,
              }}
            >
              <button
                type="button"
                className="rounded-full bg-btn-bg w-full py-2 text-xl font-semibold text-[#fff] shadow-sm hover:bg-btn-bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Book Now
              </button>
            </Link>
          </>
        )}
      </div>
    );
  };

  const handleRemoveSlot = (day, slot) => {
    const updatedSlotsByDay = { ...selectedSlotsByDay };
    updatedSlotsByDay[day] = updatedSlotsByDay[day].filter(
      (selectedSlot) => selectedSlot !== slot
    );

    if (updatedSlotsByDay[day].length === 0) {
      delete updatedSlotsByDay[day];
    }

    setSelectedSlotsByDay(updatedSlotsByDay);

    const updatedSelectedSlots = Object.keys(updatedSlotsByDay).map(
      (selectedDay) => {
        return {
          day: selectedDay,
          slot: updatedSlotsByDay[selectedDay],
        };
      }
    );

    setSelectedSlots(updatedSelectedSlots);
  };

  const getQuarter = (time) => {
    const hour = time.hours();
    if (hour >= 0 && hour < 6) {
      return 1;
    } else if (hour >= 6 && hour < 12) {
      return 2;
    } else if (hour >= 12 && hour < 18) {
      return 3;
    } else {
      return 4;
    }
  };

  return (
    <>
      <div className="flex w-full gap-x-4 2xl:gap-x-10 px-20 2xl:px-32 pt-12 2xl:pt-24">
        <div className="w-full flex flex-col gap-y-8 2xl:gap-y-14">
          {/* Information Section */}
          <div className="flex mb-6 border-b-2 border-b-neutral-300 pb-8">
            <div>
              <img
                src={data.professionalImage.url}
                className="rounded-full object-cover w-[230px] h-[180px]"
                alt="profile"
              />
            </div>
            <div className="w-full flex flex-col justify-between ml-10">
              <div className="w-full flex justify-between">
                <h1 className="text-black font-nunito text-[50px] font-bold leading-[1]">
                  {data.firstName} {data.lastName}
                </h1>
                <div className="flex w-[30%] justify-between">
                  {data.socialMediaProfiles &&
                    data.socialMediaProfiles.instagram && (
                      <Link to={data.socialMediaProfiles.instagram}>
                        <i className="text-[25px] text-[#d62976]">
                          <RiInstagramFill />
                        </i>
                      </Link>
                    )}
                  {data.socialMediaProfiles &&
                    data.socialMediaProfiles.facebook && (
                      <Link to={data.socialMediaProfiles.facebook}>
                        <i className="text-[25px] text-[#3b5998]">
                          <FaFacebookSquare />
                        </i>
                      </Link>
                    )}
                  {data.socialMediaProfiles &&
                    data.socialMediaProfiles.twitter && (
                      <Link to={data.socialMediaProfiles.twitter}>
                        <i className="text-[25px] text-[#00acee]">
                          <GrTwitter />
                        </i>
                      </Link>
                    )}
                  {data.socialMediaProfiles &&
                    data.socialMediaProfiles.linkedin && (
                      <Link to={data.socialMediaProfiles.linkedin}>
                        <i className="text-[25px] text-[#0077b5]">
                          <FaLinkedin />
                        </i>
                      </Link>
                    )}
                  {data.socialMediaProfiles &&
                    data.socialMediaProfiles.github && (
                      <Link to={data.socialMediaProfiles.github}>
                        <i className="text-[25px] text-[#171515]">
                          <SiGithub />
                        </i>
                      </Link>
                    )}
                </div>
              </div>
              <h1 className="text-xl mb-2 text-neutral-500">
                {data.professionalEmail}
              </h1>
              <h3 className="text-black font-nunito text-[30px] font-semibold leading-normal">
                {data.professionalSkill}
              </h3>
              <h6 className="text-[#393939] font-nunito text-[21px] font-medium leading-normal">
                {data.educationExperiences[0].qualification} in{" "}
                {data.educationExperiences[0].subject}
              </h6>
              <div className="flex justify-between items-end">
                <div
                  className={`flex items-end ${
                    isCurrentUser ? "w-[25%]" : "w-[40%]"
                  } justify-between`}
                >
                  <div className="flex flex-col items-center mr-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 0C7.16338 0 0 7.16346 0 16C0 24.8365 7.16338 32 16 32C24.8365 32 32 24.8365 32 16C32 7.16346 24.8365 0 16 0ZM14.3424 29.6153C11.3067 29.2518 8.49792 27.8928 6.30246 25.6975C3.71215 23.1072 2.28569 19.6632 2.28569 16C2.28569 12.7023 3.44231 9.58277 5.56269 7.10315C5.61731 7.75831 5.75215 8.46069 5.71762 8.96277C5.59146 10.7932 5.41085 11.9387 6.48223 13.4829C6.89962 14.0844 7.00215 14.9466 7.20531 15.6428C7.404 16.3238 8.19777 16.6811 8.74523 17.1007C9.84977 17.9475 10.9065 18.9318 12.0777 19.6772C12.8507 20.1691 13.3335 20.4138 13.1072 21.3571C12.9251 22.1157 12.8742 22.583 12.4818 23.2588C12.362 23.4651 12.9338 24.791 13.1242 24.9813C13.7009 25.558 14.2732 26.0871 14.9019 26.6063C15.8766 27.4116 14.8072 28.458 14.3424 29.6153ZM25.6975 25.6975C23.7257 27.6692 21.2591 28.9656 18.5778 29.4729C18.9578 28.5332 19.6344 27.6983 20.262 27.2143C20.8079 26.7931 21.4917 25.9828 21.7768 25.3411C22.0618 24.7002 22.4392 24.1445 22.8212 23.5552C23.3647 22.7168 21.4813 21.4524 20.871 21.1874C19.4976 20.5912 18.4638 19.7866 17.2432 18.9278C16.3736 18.3159 14.6081 19.2473 13.6263 18.8188C12.2816 18.2316 11.1738 17.2114 10.0049 16.3312C8.79877 15.4228 8.85708 14.3638 8.85708 13.0237C9.80185 13.0585 11.1458 12.7622 11.7731 13.522C11.971 13.7618 12.6515 14.8329 13.1071 14.4523C13.4792 14.1413 12.8313 12.8947 12.7062 12.6016C12.3212 11.7005 13.5834 11.349 14.2295 10.7379C15.0725 9.94069 16.881 8.69038 16.7381 8.11892C16.5952 7.54746 14.9285 5.92838 13.9497 6.181C13.803 6.21885 12.5115 7.57308 12.2619 7.78554C12.2685 7.34354 12.2752 6.90162 12.2819 6.45962C12.2862 6.18054 11.7613 5.89408 11.7857 5.71408C11.8472 5.25915 13.1135 4.43354 13.4285 4.07123C13.2078 3.93331 12.4548 3.28646 12.2268 3.38138C11.675 3.61138 11.0518 3.76985 10.4999 3.99977C10.4999 3.80838 10.4767 3.62862 10.449 3.45108C11.5603 2.95946 12.7326 2.61919 13.9344 2.43938L15.0178 2.87477L15.7827 3.78254L16.5461 4.56969L17.2134 4.78469L18.2733 3.78508L18 3.07146V2.43C20.0962 2.73446 22.0757 3.51646 23.8094 4.72231C23.4992 4.75008 23.1584 4.79569 22.7738 4.84462C22.615 4.75077 22.4112 4.70815 22.2381 4.64285C22.7405 5.723 23.2645 6.78823 23.7968 7.85408C24.3655 8.99262 25.6271 10.2138 25.8486 11.4157C26.1097 12.8323 25.9285 14.1191 26.0714 15.7858C26.2089 17.3908 27.8809 19.2144 27.8809 19.2144C27.8809 19.2144 28.653 19.4774 29.2951 19.3858C28.6965 21.7537 27.4695 23.9253 25.6975 25.6975Z"
                        fill="#FFBB55"
                      />
                    </svg>
                    <h2 className="text-sm mt-1">{data.country}</h2>
                  </div>
                  <div className="flex flex-col items-center mx-2">
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 32 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.9753 12.4133C32.1352 11.601 31.4957 10.6263 30.6963 10.6263L21.5834 9.32661L17.4266 0.878821C17.2667 0.553906 17.1068 0.391448 16.7871 0.22899C15.9877 -0.258382 15.0284 0.066533 14.5488 0.878821L10.5519 9.32661L1.43889 10.6263C0.95926 10.6263 0.639507 10.7887 0.47963 11.1136C-0.159877 11.7635 -0.159877 12.7382 0.47963 13.3881L7.03457 19.8864L5.43581 29.1464C5.43581 29.4713 5.43581 29.7963 5.59568 30.1212C6.07531 30.9335 7.03457 31.2584 7.83396 30.771L15.9877 26.3847L24.1414 30.771C24.3013 30.9335 24.621 30.9335 24.9408 30.9335C25.1006 30.9335 25.1006 30.9335 25.2605 30.9335C26.0599 30.771 26.6994 29.9587 26.5395 28.984L24.9408 19.7239L31.4957 13.2256C31.8155 13.0631 31.9753 12.7382 31.9753 12.4133Z"
                        fill="#FFBB55"
                      />
                    </svg>
                    <h2 className="text-sm mt-1">{data.rating}/5</h2>
                  </div>
                  <div className="flex flex-col items-center ml-2">
                    <svg
                      width="30"
                      height="33"
                      viewBox="0 0 30 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.7622 25.4107L25.2497 17.4825C26.1731 15.7572 26.6542 13.8228 26.6484 11.8583C26.6484 8.71329 25.4204 5.69708 23.2345 3.47322C21.0487 1.24935 18.084 0 14.9926 0C11.9013 0 8.93664 1.24935 6.75076 3.47322C4.56487 5.69708 3.33685 8.71329 3.33685 11.8583C3.33112 13.8228 3.81217 15.7572 4.73555 17.4825L0.223091 25.4107C0.0766627 25.6687 -0.000288506 25.9614 8.12826e-07 26.2594C0.000290132 26.5573 0.0778094 26.8499 0.224738 27.1076C0.371667 27.3654 0.582809 27.5791 0.836861 27.7273C1.09091 27.8755 1.37889 27.9529 1.67174 27.9517H6.45061L8.88168 32.1191C8.96363 32.2572 9.06456 32.3827 9.1814 32.4918C9.49008 32.7945 9.90161 32.9644 10.3303 32.9661H10.5634C10.8148 32.9311 11.055 32.8381 11.2657 32.6942C11.4764 32.5504 11.6519 32.3594 11.779 32.136L14.9926 26.5118L18.2063 32.1868C18.3352 32.4071 18.5116 32.5947 18.7222 32.7356C18.9327 32.8764 19.172 32.9668 19.4219 33H19.655C20.0894 33.0026 20.5077 32.8324 20.8205 32.5256C20.9325 32.4228 21.028 32.3027 21.1036 32.1699L23.5347 28.0025H28.3136C28.607 28.0037 28.8955 27.926 29.1499 27.7773C29.4043 27.6285 29.6155 27.414 29.7622 27.1555C29.9178 26.892 30 26.5905 30 26.2831C30 25.9757 29.9178 25.6741 29.7622 25.4107ZM10.3137 28.0025L8.83173 25.4784C8.6858 25.228 8.4789 25.02 8.23099 24.8746C7.98308 24.7292 7.70252 24.6513 7.41638 24.6483H4.53573L6.91685 20.4471C8.55653 22.0546 10.6231 23.1382 12.8613 23.5641L10.3137 28.0025ZM14.9926 20.3285C13.346 20.3285 11.7363 19.8318 10.3672 18.901C8.99808 17.9703 7.93097 16.6474 7.30083 15.0997C6.67068 13.552 6.50581 11.8489 6.82705 10.2058C7.1483 8.56279 7.94123 7.05354 9.10558 5.86896C10.2699 4.68438 11.7534 3.87767 13.3684 3.55084C14.9834 3.22402 16.6574 3.39175 18.1787 4.03284C19.7 4.67394 21.0003 5.75958 21.9151 7.1525C22.8299 8.54543 23.3182 10.1831 23.3182 11.8583C23.3182 14.1047 22.4411 16.2592 20.8797 17.8477C19.3184 19.4361 17.2007 20.3285 14.9926 20.3285ZM22.5689 24.6483C22.2828 24.6513 22.0022 24.7292 21.7543 24.8746C21.5064 25.02 21.2995 25.228 21.1536 25.4784L19.6716 28.0025L17.1406 23.5133C19.371 23.0786 21.4299 21.996 23.0685 20.3963L25.4496 24.5975L22.5689 24.6483Z"
                        fill="#FFBB55"
                      />
                    </svg>
                    <h2 className="text-sm mt-1">{data.level}</h2>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h1 className="text-[47px] font-semibold leading-[1]">
                    ${data.price}
                  </h1>
                  <h1 className="text-[20px] font-normal leading-[1]">/slot</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Slots Section*/}
          {isCurrentUser ? (
            <>
              <div className="px-4">
                <div className="profileContainer">
                  <h1 className="text-[#000] text-[25px] font-semibold border-b-2">
                    Your Slot Schedule
                  </h1>
                  {/* Slots */}
                  <div className="w-full">
                    {data.slotsAvailability.map(
                      (dayData, index) =>
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
                            <div
                              className={`grid grid-cols-4 max-w-full flex-2`}
                            >
                              {dayData.slot.map((time, timeIndex) => (
                                <div
                                  key={timeIndex}
                                  className="bg-gray-200 text-center rounded-lg shadow-lg mx-4 flex my-3 p-3"
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
              </div>
            </>
          ) : (
            <>
              <div className="px-4">
                <div className="profileContainer">
                  <h1 className="text-[#000] text-[25px] font-semibold border-b-2">
                    Find your Slot
                  </h1>
                  <div className="w-full flex items-center justify-end mt-6">
                    {/* Quarters Button */}
                    <div className="mx-3">
                      <h1 className="text-[#575757] text-[16px] m-2">
                        Quarter
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
                            onClick={() => handleQuarters(quarter)}
                          >
                            {quarter}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Slots */}
                  <div className="w-full">{SlotTable()}</div>
                </div>
              </div>
            </>
          )}

          {/* Education Section */}
          <div className="px-4">
            <div className="profileContainer">
              <h1 className="text-[#000] text-[25px] font-semibold border-b-2">
                Education
              </h1>
              {data.educationExperiences.map((education, i) => (
                <div
                  className={`my-3 pb-4 ${
                    i < data.educationExperiences.length - 1 ? "border-b-2" : ""
                  }`}
                  key={i}
                >
                  <h1 className="text-[18px] font-semibold">
                    {education.institution}
                  </h1>
                  <h1 className="text-[25px]">
                    {education.qualification} in {education.subject}
                  </h1>
                  <div className="text-[#434343] text-[14px] font-normal flex my-5">
                    <h1 className="mr-2">
                      {format(
                        parseISO(education.educationalFromDate),
                        "dd LLL yyyy"
                      )}
                    </h1>
                    -
                    <h1 className="ml-2">
                      {format(
                        parseISO(education.educationalToDate),
                        "dd LLL yyyy"
                      )}
                    </h1>
                  </div>
                  <p className="text-black text-[14px] text-justify w-[95%]">
                    {education.educationalExperience}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Section */}
          <div className="px-4">
            <div className="profileContainer">
              <h1 className="text-[#000] text-[25px] font-semibold border-b-2">
                Professional Experiences
              </h1>
              {data.professionalExperiences.map((pro, i) => (
                <div
                  className={`my-3 pb-4 ${
                    i < data.professionalExperiences.length - 1
                      ? "border-b-2"
                      : ""
                  }`}
                  key={i}
                >
                  <h1 className="text-[18px] font-semibold">{pro.company}</h1>
                  <h1 className="text-[25px]">{pro.position}</h1>
                  <div className="ext-[#434343] text-[14px] font-normal flex my-5">
                    <h1 className="mr-2">
                      {format(parseISO(pro.experienceFromDate), "dd LLL yyyy")}
                    </h1>{" "}
                    -
                    <h1 className="ml-2">
                      {format(parseISO(pro.experienceToDate), "dd LLL yyyy")}
                    </h1>
                  </div>
                  <p className="text-black text-[14px] text-justify w-[95%]">
                    {pro.professionalExperience}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings Section */}
          <div className="px-4">
            <div className="profileContainer">
              <h1 className="text-[#000] text-[25px] font-semibold border-b-2">
                Ratings and Reviews ({data.reviews.length})
              </h1>
              <div className="overflow-hidden pt-4">
                {data && data.reviews.length === 0 ? (
                  <>
                    <ReviewsAnimation />
                  </>
                ) : (
                  <>
                    Reviews...
                    {/* <ul className="divide-y divide-gray-200">
                      {ratingsAndReviews?.map((data, i) => (
                        <li key={i} className="flex py-4 ">
                          <img
                            className="w-12 h-12 rounded-full object-cover mr-4"
                            src={data?.avatar}
                            alt="User avatar"
                          />
                          <div className="flex-1">
                            <div className="flex gap-5 text-xl font-bold text-black  mb-3">
                              <h3>{data?.name}</h3>
                              <RatingsStars rating={data?.stars} />
                              <h3 className="text-[17px] text-[#474747]">{`${data?.stars}/5`}</h3>
                            </div>
                            <p className="text-gray-600 text-[16px] text-justify w-[95%]">
                              {`"${data?.text}"`}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul> */}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="px-4">
            <div className="profileContainer">
              <h1 className="ext-[#000] text-[25px] font-semibold border-b-2">
                About
              </h1>
              <h1 className="py-4 text-black text-base text-justify w-[95%]">
                {data.about}
              </h1>
            </div>
          </div>
        </div>

        {/* Selected Slot Section */}
        {!isCurrentUser && <SelectedSlotsSection />}
      </div>
    </>
  );
};

export default SellerDetail;
