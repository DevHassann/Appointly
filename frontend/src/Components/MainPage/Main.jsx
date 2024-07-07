import React, { useState } from "react";
import { useSelector } from "react-redux";

import { availableLanguages } from "../../Static/Data";

import NavbarMain from "../Partials/NavbarMain";
import CategoryNavigation from "./Main/CategoryNavigation";
import ProfileCard from "./Main/ProfileCard";
import ProfileFilter from "./Main/ProfileFilter";
import Loader from "../Loader";
import NotFoundLoader from "../NotFoundLoader";

const fullDayName = (abbreviatedDay) => {
  const daysMapping = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  return daysMapping[abbreviatedDay] || abbreviatedDay;
};

const Main = () => {
  const { allSellers } = useSelector((state) => state.seller);

  const [filteredGender, setFilteredGender] = useState("All");
  const [filteredPriceRange, setFilteredPriceRange] = useState([0, 500]);
  const [filteredLanguages, setFilteredLanguages] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sort, setSort] = useState(1);
  const [selectedQuarters, setSelectedQuarters] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleGenderChange = (selectedGender) => {
    setFilteredGender(selectedGender);
  };

  const handlePriceChange = (selectedPriceRange) => {
    setFilteredPriceRange(selectedPriceRange);
  };

  const handleLanguageChange = (selectedLanguages) => {
    setFilteredLanguages(selectedLanguages);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  const handleAvailabilityChange = (quarters, days) => {
    setSelectedQuarters(quarters);
    setSelectedDays(days);
  };

  const isTimeSlotInQuarter = (timeSlot, selectedQuarter) => {
    const [startHour, endHour] = selectedQuarter.value
      .split("-")
      .map((time) => parseInt(time, 10));

    // Parse the time slot
    const [slotHour, slotMinute] = timeSlot
      .split(":")
      .map((time) => parseInt(time, 10));

    // Compare the time slot with the selected quarter's time range
    if (startHour <= slotHour && slotHour < endHour) {
      return true; // The time slot is within the selected quarter
    } else if (startHour === slotHour && slotMinute === 0) {
      return true; // The time slot starts exactly at the beginning of the selected quarter
    } else if (endHour === slotHour && slotMinute === 0) {
      return true; // The time slot ends exactly at the end of the selected quarter
    }

    return false; // The time slot is outside the selected quarter
  };

  const filteredSellers =
    allSellers && allSellers.length > 0
      ? allSellers
          .filter((seller) => {
            // Gender filter
            const genderFilter =
              filteredGender === "All" || seller.gender === filteredGender;

            // Price range filter
            const priceFilter =
              seller.price >= filteredPriceRange[0] &&
              seller.price <= filteredPriceRange[1];

            // Language filter
            const languageFilter =
              filteredLanguages.length === 0 ||
              filteredLanguages.every(
                (selected, index) =>
                  !selected ||
                  seller.languagesSpoken.includes(availableLanguages[index])
              );

            // Availability filter
            const availabilityFilter =
              (selectedQuarters.length === 0 && selectedDays.length === 0) ||
              (selectedQuarters.length > 0 &&
                selectedQuarters.every((selectedQuarter) => {
                  return seller.slotsAvailability.some((day) => {
                    const slots = day.slot.map(
                      (timeSlot) => timeSlot && timeSlot.toLowerCase()
                    );
                    return (
                      day.day &&
                      day.day.toLowerCase() ===
                        selectedQuarter.value.toLowerCase() &&
                      slots.length > 0 &&
                      slots.some((timeSlot) =>
                        isTimeSlotInQuarter(timeSlot, selectedQuarter)
                      )
                    );
                  });
                })) ||
              (selectedDays.length > 0 &&
                selectedDays.every((selectedDay) => {
                  return seller.slotsAvailability.some(
                    (day) =>
                      day.day &&
                      day.day.toLowerCase() ===
                        fullDayName(selectedDay).toLowerCase() &&
                      day.slot.length > 0 &&
                      day.slot.some(
                        (timeSlot) =>
                          selectedQuarters.length === 0 ||
                          selectedQuarters.some((selectedQuarter) =>
                            isTimeSlotInQuarter(timeSlot, selectedQuarter)
                          )
                      )
                  );
                }));

            return (
              genderFilter &&
              priceFilter &&
              languageFilter &&
              availabilityFilter
            );
          })
          .sort((a, b) => {
            switch (sort) {
              case 1:
                return 0;
              case 2: // Newest
                return new Date(b.createdAt) - new Date(a.createdAt);
              case 3: // Top Rated
                return b.rating - a.rating;
              default:
                return 0;
            }
          })
      : [];

  return (
    <>
      {allSellers == null ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <NavbarMain />
          <CategoryNavigation />
          <div className="w-full flex justify-center my-4">
            <ProfileFilter
              onGenderChange={handleGenderChange}
              onPriceChange={handlePriceChange}
              onLanguageChange={handleLanguageChange}
              onSortChange={handleSortChange}
              onAvailabilityChange={handleAvailabilityChange}
            />
          </div>
          <div className="relative mx-9 mt-10 mb-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-start">
              <span className="bg-white pr-2 text-sm text-gray-500">
                {filteredSellers.length} Professional Available
              </span>
            </div>
          </div>
          {filteredSellers.length === 0 ? (
            <>
              <NotFoundLoader />
            </>
          ) : (
            <>
              <div className="px-14 py-3 grid grid-cols-4 gap-x-7 2xl:gap-10">
                {filteredSellers.map((seller, index) => (
                  <ProfileCard data={seller} key={index} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Main;
