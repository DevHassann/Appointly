import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { people, tabs } from "../../Static/Data";

import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/20/solid";

// Function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopProfessionals = () => {
  const [tabNo, settabNo] = useState(1);
  const [peopleFilter, setpeopleFilter] = useState([]);

  useEffect(() => {
    let temp = people.filter((p) => p.category === tabNo);
    setpeopleFilter(temp);
  }, [tabNo]);

  return (
    <div className="relative py-12 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 h-[90vh] overflow-y-scroll sm:overflow-y-hidden sm:h-fit">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Our Top Professionals
          </h2>
          <p className="mt-4 text-lg leading-8 text-text-light">
            We’re a dynamic group of individuals who are passionate about what
            we do.
          </p>
        </div>

        <div className="w-full flex justify-center mt-4 sm:mt-12 mb-8">
          <div className="block">
            <nav
              className="grid grid-cols-2 gap-3 sm:flex w-full sm:w-[38rem] "
              aria-label="Tabs"
            >
              {tabs.map((tab, i) =>
                tabNo === i ? (
                  <Link
                    key={tab.name}
                    className="cursor-pointer text-white bg-text-light ring-1 ring-text-light rounded-md py-4 text-sm font-semibold w-[10rem] text-center"
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </Link>
                ) : (
                  <Link
                    key={tab.name}
                    className="cursor-pointer text-text-light hover:bg-text-light/10 ring-1 ring-text-light rounded-md py-4 text-sm font-medium w-[10rem] text-center"
                    aria-current={tab.current ? "page" : undefined}
                    onClick={() => {
                      settabNo(i);
                    }}
                  >
                    {tab.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {peopleFilter.map((person) => (
            <li
              key={`${person.email}-${person.name}`}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8 pb-2">
                <img
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-sm text-gray-900 font-semibold">
                  {person.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">{person.title}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3 font-semibold text-3xl flex justify-center text-text-light">
                    <span className="font-light">$</span>
                    {person.amount}
                  </dd>
                  <div className="ml-1 flex items-end justify-center mt-3">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          person.ratings > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-neutral-500 text-xs ml-3">
                      {person.reviewCount} reviews
                    </span>
                  </div>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative hover:bg-text-secondary/10 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      View Profile
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative hover:bg-text-main group/btn hover:text-white inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon
                        className="h-5 w-5 group-hover/btn:text-white text-gray-400"
                        aria-hidden="true"
                      />
                      Book a Slot
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="absolute w-full"></div>
      </div>
    </div>
  );
};

export default TopProfessionals;
