import React, { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";

import { Slider, ConfigProvider, Radio, Checkbox } from "antd";

import { availableLanguages, days, quarters } from "../../../Static/Data";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ProfileFilter = ({
  onGenderChange,
  onPriceChange,
  onLanguageChange,
  onSortChange,
  onAvailabilityChange,
}) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [gender, setGender] = useState("All");
  const [languages, setLanguages] = useState([
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
  ]);
  const [sort, setSort] = useState(1);
  const [selectedQuarters, setSelectedQuarters] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    onGenderChange(gender);
    onPriceChange(priceRange);
    onLanguageChange(languages);
    onSortChange(sort);
    onAvailabilityChange(selectedQuarters, selectedDays);
  }, [gender, priceRange, languages, sort, selectedQuarters, selectedDays]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onPriceChange(value);
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    onGenderChange(selectedGender);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    onSortChange(selectedSort);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    const langIndex = availableLanguages.indexOf(selectedLanguage);

    if (langIndex !== -1) {
      const newLanguages = [...languages];
      newLanguages[langIndex] = !newLanguages[langIndex];
      setLanguages(newLanguages);
      onLanguageChange(newLanguages);
    }
  };

  const handleQuarterChange = (quarter) => {
    const isSelected = selectedQuarters.some((q) => q.id === quarter.id);

    if (isSelected) {
      setSelectedQuarters((prevSelectedQuarters) =>
        prevSelectedQuarters.filter((q) => q.id !== quarter.id)
      );
    } else {
      setSelectedQuarters((prevSelectedQuarters) => [
        ...prevSelectedQuarters,
        quarter,
      ]);
    }

    setSelectedQuarters((updatedQuarters) => {
      onAvailabilityChange(updatedQuarters, selectedDays);
      return updatedQuarters;
    });
  };

  const handleDayChange = (day) => {
    const isSelected = selectedDays.includes(day);

    if (isSelected) {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
    }

    setSelectedDays((updatedDays) => {
      onAvailabilityChange(selectedQuarters, updatedDays.map(fullDayName));
      return updatedDays;
    });
  };

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

  return (
    <div className="grid grid-cols-5 w-3/4 bg-neutral-50 ring-1 ring-neutral-300 rounded-md">
      {/* Quarters Filter */}
      <div className="p-4 mx-auto">
        <Popover className="relative text-xs">
          <Popover.Button className="flex items-center">
            <h2 className="font-normal">Availability</h2>
            <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 top-10 bg-white p-4 rounded-md drop-shadow-lg">
            <div className="grid grid-cols-4 w-60 text-sm gap-x-2 gap-y-1">
              <div className="col-span-4 border-b-[1px] border-neutral-400 text-neutral-500 pb-1 mb-2">
                Time of day or Quarter
              </div>
              {quarters.map((q) => (
                <div
                  key={q.id}
                  className={`text-base cursor-pointer px-1 hover:text-neutral-900 hover:ring-neutral-900 rounded-md ring-2 ${
                    selectedQuarters.some(
                      (selectedQuarter) => selectedQuarter.id === q.id
                    )
                      ? "text-black ring-neutral-900"
                      : "text-neutral-500 ring-neutral-300"
                  }`}
                  onClick={() => handleQuarterChange(q)}
                >
                  {q.value}
                </div>
              ))}
              <div className="col-span-4 border-b-[1px] border-neutral-400 text-neutral-500 pb-1 mb-2 mt-4">
                Day of the Week
              </div>
              <div className="col-span-4">
                <div className="w-full flex justify-between">
                  {days.map((day, i) => (
                    <div
                      key={i}
                      className={`text-sm hover:text-neutral-900 cursor-pointer leading-3 ${
                        selectedDays.includes(day)
                          ? "text-neutral-900"
                          : "text-neutral-500"
                      }`}
                      onClick={() => handleDayChange(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
        <div className="text-base font-semibold leading-3">
          {selectedQuarters.length > 0 || selectedDays.length > 0 ? (
            <>
              {selectedQuarters.length > 0 && (
                <>
                  {selectedQuarters.length} Quarters
                  {selectedDays.length > 0 && ", "}
                </>
              )}
              {selectedDays.length > 0 && `${selectedDays.length} Days`}
            </>
          ) : (
            "All"
          )}
        </div>
      </div>
      {/* Price Range */}
      <div className="p-4 mx-auto">
        <Popover className="relative text-xs">
          <Popover.Button className="flex items-center">
            <h2 className="font-normal">Price</h2>
            <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 top-10 bg-white p-4 rounded-md drop-shadow-lg">
            <div className="w-80">
              <ConfigProvider theme={{}}>
                <Slider
                  range
                  defaultValue={priceRange}
                  style={{ handleColor: "#666ff1" }}
                  onChange={handlePriceChange}
                  min={0}
                  max={500}
                  marks={{
                    0: "$0",
                    250: "$250",
                    500: "$500",
                  }}
                />
              </ConfigProvider>
            </div>
          </Popover.Panel>
        </Popover>
        <div className="text-base font-semibold leading-3 w-36">{`$${priceRange[0]} - $${priceRange[1]}`}</div>
      </div>
      {/* Gender Filter */}
      <div className="p-4 mx-auto">
        <Popover className="relative text-xs">
          <Popover.Button className="flex items-center">
            <h2 className="font-normal">Gender</h2>
            <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 top-10 bg-white p-4 rounded-md drop-shadow-lg">
            <Radio.Group
              defaultValue={gender}
              buttonStyle="solid"
              className="flex"
              onChange={handleGenderChange}
            >
              <Radio.Button value="All">All</Radio.Button>
              <Radio.Button value="Male">Male</Radio.Button>
              <Radio.Button value="Female">Female</Radio.Button>
            </Radio.Group>
          </Popover.Panel>
        </Popover>
        <div className="text-base font-semibold leading-3">{gender}</div>
      </div>
      {/* Languages Filter */}
      <div className="p-4 mx-auto">
        <Popover className="relative text-xs">
          <Popover.Button className="flex items-center">
            <h2 className="font-normal">Languages</h2>
            <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 top-10 bg-white p-4 rounded-md drop-shadow-lg w-[18rem]">
            {availableLanguages.map((lang, langId) => (
              <Checkbox
                key={langId}
                className="my-3"
                defaultChecked={langId === 0 ? true : false}
                disabled={langId === 0 ? true : false}
                checked={languages[langId]}
                value={lang}
                onChange={handleLanguageChange}
              >
                {lang}
              </Checkbox>
            ))}
          </Popover.Panel>
        </Popover>
        <div className="text-base font-semibold leading-3 w-44 whitespace-nowrap pb-2 overflow-x-hidden overflow-ellipsis">
          {availableLanguages.map(
            (l, i) => languages[i] && (i > 0 ? `, ${l}` : `${l}`)
          )}
        </div>
      </div>
      {/* Sortby Filter */}
      <div className="p-4 ">
        <Popover className="relative text-xs">
          <Popover.Button className="flex items-center">
            <h2 className="font-normal">Sort By</h2>
            <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 top-10 bg-white p-4 rounded-md drop-shadow-lg">
            <Radio.Group
              defaultValue={sort}
              buttonStyle="solid"
              className="flex"
              onChange={handleSortChange}
            >
              <Radio.Button value={1}>Relevance</Radio.Button>
              <Radio.Button value={2}>Newest</Radio.Button>
              <Radio.Button value={3} className="whitespace-nowrap">
                Top Rated
              </Radio.Button>
            </Radio.Group>
          </Popover.Panel>
        </Popover>
        <div className="text-base font-semibold leading-3">
          {sort === 1
            ? "Relevance"
            : sort === 2
            ? "Newest"
            : sort === 3
            ? "Top Rated"
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ProfileFilter;
