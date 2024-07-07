import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { server } from "../../server";

import { NavbarMainNavigation, Notifications } from "../../Static/Data";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosAlarm } from "react-icons/io";

// Function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarMain = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { seller, isSeller } = useSelector((state) => state.seller);

  const sellerId = seller ? seller._id : null;

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.get(`${server}/user/logout-user`);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const closeDropdowns = () => {
    setIsNotificationOpen(false);
  };

  const handleClick = () => {
    window.location.reload();

    window.location.href = isSeller ? `/seller/${sellerId}` : `/onboarding`;
  };

  return (
    <>
      <Disclosure as="header" className="bg-white shadow py-3">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-12">
              <div className="relative flex h-16 justify-between">
                <div className="flex w-full md:w-[60%] justify-between">
                  <div className="relative z-10 flex px-2 lg:px-0">
                    <Link to="/main">
                      <div className="flex flex-shrink-0 items-center">
                        <div className="scale-75">
                          <svg
                            width="174"
                            height="51"
                            viewBox="0 0 174 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="152" cy="25.5" r="22" fill="#4991FC" />
                            <path
                              d="M3.108 37.796C2.516 37.796 2.035 37.6603 1.665 37.389C1.31967 37.1177 1.11 36.76 1.036 36.316C0.962 35.8473 1.04833 35.3293 1.295 34.762L11.063 13.117C11.3837 12.4017 11.766 11.896 12.21 11.6C12.6787 11.2793 13.209 11.119 13.801 11.119C14.3683 11.119 14.874 11.2793 15.318 11.6C15.7867 11.896 16.1813 12.4017 16.502 13.117L26.307 34.762C26.5783 35.3293 26.677 35.8473 26.603 36.316C26.529 36.7847 26.3193 37.1547 25.974 37.426C25.6287 37.6727 25.1723 37.796 24.605 37.796C23.9143 37.796 23.3717 37.6357 22.977 37.315C22.607 36.9697 22.274 36.4517 21.978 35.761L19.573 30.174L21.571 31.469H5.957L7.955 30.174L5.587 35.761C5.26633 36.4763 4.93333 36.9943 4.588 37.315C4.24267 37.6357 3.74933 37.796 3.108 37.796ZM13.727 16.558L8.547 28.879L7.585 27.695H19.943L19.018 28.879L13.801 16.558H13.727ZM32.2322 44.456C31.4922 44.456 30.9249 44.2587 30.5302 43.864C30.1355 43.4693 29.9382 42.8897 29.9382 42.125V21.442C29.9382 20.6773 30.1355 20.0977 30.5302 19.703C30.9249 19.3083 31.4799 19.111 32.1952 19.111C32.9352 19.111 33.5025 19.3083 33.8972 19.703C34.2919 20.0977 34.4892 20.6773 34.4892 21.442V24.328L34.0822 23.218C34.4522 21.96 35.2045 20.9487 36.3392 20.184C37.4985 19.4193 38.8429 19.037 40.3722 19.037C41.9509 19.037 43.3322 19.4193 44.5162 20.184C45.7249 20.9487 46.6622 22.034 47.3282 23.44C47.9942 24.8213 48.3272 26.4863 48.3272 28.435C48.3272 30.359 47.9942 32.0363 47.3282 33.467C46.6622 34.873 45.7372 35.9583 44.5532 36.723C43.3692 37.4877 41.9755 37.87 40.3722 37.87C38.8675 37.87 37.5479 37.5 36.4132 36.76C35.2785 35.9953 34.5139 35.0087 34.1192 33.8H34.5632V42.125C34.5632 42.8897 34.3535 43.4693 33.9342 43.864C33.5395 44.2587 32.9722 44.456 32.2322 44.456ZM39.0772 34.355C39.9899 34.355 40.7915 34.133 41.4822 33.689C42.1729 33.245 42.7032 32.5913 43.0732 31.728C43.4679 30.84 43.6652 29.7423 43.6652 28.435C43.6652 26.4617 43.2459 24.994 42.4072 24.032C41.5685 23.0453 40.4585 22.552 39.0772 22.552C38.1645 22.552 37.3629 22.774 36.6722 23.218C35.9815 23.6373 35.4389 24.291 35.0442 25.179C34.6742 26.0423 34.4892 27.1277 34.4892 28.435C34.4892 30.3837 34.9085 31.8637 35.7472 32.875C36.5859 33.8617 37.6959 34.355 39.0772 34.355ZM54.4178 44.456C53.6778 44.456 53.1104 44.2587 52.7158 43.864C52.3211 43.4693 52.1238 42.8897 52.1238 42.125V21.442C52.1238 20.6773 52.3211 20.0977 52.7158 19.703C53.1104 19.3083 53.6654 19.111 54.3808 19.111C55.1208 19.111 55.6881 19.3083 56.0828 19.703C56.4774 20.0977 56.6748 20.6773 56.6748 21.442V24.328L56.2678 23.218C56.6378 21.96 57.3901 20.9487 58.5248 20.184C59.6841 19.4193 61.0284 19.037 62.5578 19.037C64.1364 19.037 65.5178 19.4193 66.7018 20.184C67.9104 20.9487 68.8478 22.034 69.5138 23.44C70.1798 24.8213 70.5128 26.4863 70.5128 28.435C70.5128 30.359 70.1798 32.0363 69.5138 33.467C68.8478 34.873 67.9228 35.9583 66.7388 36.723C65.5548 37.4877 64.1611 37.87 62.5578 37.87C61.0531 37.87 59.7334 37.5 58.5988 36.76C57.4641 35.9953 56.6994 35.0087 56.3048 33.8H56.7488V42.125C56.7488 42.8897 56.5391 43.4693 56.1198 43.864C55.7251 44.2587 55.1578 44.456 54.4178 44.456ZM61.2628 34.355C62.1754 34.355 62.9771 34.133 63.6678 33.689C64.3584 33.245 64.8888 32.5913 65.2588 31.728C65.6534 30.84 65.8508 29.7423 65.8508 28.435C65.8508 26.4617 65.4314 24.994 64.5928 24.032C63.7541 23.0453 62.6441 22.552 61.2628 22.552C60.3501 22.552 59.5484 22.774 58.8578 23.218C58.1671 23.6373 57.6244 24.291 57.2298 25.179C56.8598 26.0423 56.6748 27.1277 56.6748 28.435C56.6748 30.3837 57.0941 31.8637 57.9328 32.875C58.7714 33.8617 59.8814 34.355 61.2628 34.355ZM82.5603 37.87C80.6856 37.87 79.0576 37.4877 77.6763 36.723C76.295 35.9583 75.222 34.873 74.4573 33.467C73.6926 32.0363 73.3103 30.359 73.3103 28.435C73.3103 26.9797 73.52 25.6847 73.9393 24.55C74.3833 23.3907 75.0123 22.404 75.8263 21.59C76.6403 20.7513 77.6146 20.1223 78.7493 19.703C79.884 19.259 81.1543 19.037 82.5603 19.037C84.435 19.037 86.063 19.4193 87.4443 20.184C88.8256 20.9487 89.8986 22.034 90.6633 23.44C91.428 24.846 91.8103 26.511 91.8103 28.435C91.8103 29.8903 91.5883 31.1977 91.1443 32.357C90.725 33.5163 90.1083 34.5153 89.2943 35.354C88.4803 36.168 87.506 36.797 86.3713 37.241C85.2366 37.6603 83.9663 37.87 82.5603 37.87ZM82.5603 34.355C83.473 34.355 84.2746 34.133 84.9653 33.689C85.656 33.245 86.1863 32.5913 86.5563 31.728C86.951 30.84 87.1483 29.7423 87.1483 28.435C87.1483 26.4617 86.729 24.994 85.8903 24.032C85.0516 23.0453 83.9416 22.552 82.5603 22.552C81.6476 22.552 80.846 22.774 80.1553 23.218C79.4646 23.6373 78.922 24.291 78.5273 25.179C78.1573 26.0423 77.9723 27.1277 77.9723 28.435C77.9723 30.3837 78.3916 31.8637 79.2303 32.875C80.069 33.8617 81.179 34.355 82.5603 34.355ZM97.9217 37.759C97.1817 37.759 96.6143 37.537 96.2197 37.093C95.825 36.649 95.6277 36.0323 95.6277 35.243V21.664C95.6277 20.85 95.825 20.2333 96.2197 19.814C96.6143 19.37 97.1817 19.148 97.9217 19.148C98.6617 19.148 99.229 19.37 99.6237 19.814C100.043 20.2333 100.253 20.85 100.253 21.664V35.243C100.253 36.0323 100.055 36.649 99.6607 37.093C99.266 37.537 98.6863 37.759 97.9217 37.759ZM97.9217 15.707C97.0583 15.707 96.38 15.4973 95.8867 15.078C95.418 14.634 95.1837 14.0297 95.1837 13.265C95.1837 12.4757 95.418 11.8713 95.8867 11.452C96.38 11.0327 97.0583 10.823 97.9217 10.823C98.8097 10.823 99.488 11.0327 99.9567 11.452C100.425 11.8713 100.66 12.4757 100.66 13.265C100.66 14.0297 100.425 14.634 99.9567 15.078C99.488 15.4973 98.8097 15.707 97.9217 15.707ZM107.352 37.796C106.612 37.796 106.045 37.5987 105.65 37.204C105.256 36.7847 105.058 36.1927 105.058 35.428V21.442C105.058 20.6773 105.256 20.0977 105.65 19.703C106.045 19.3083 106.6 19.111 107.315 19.111C108.031 19.111 108.586 19.3083 108.98 19.703C109.375 20.0977 109.572 20.6773 109.572 21.442V23.958L109.165 23.033C109.708 21.7257 110.547 20.739 111.681 20.073C112.841 19.3823 114.148 19.037 115.603 19.037C117.059 19.037 118.255 19.3083 119.192 19.851C120.13 20.3937 120.833 21.22 121.301 22.33C121.77 23.4153 122.004 24.7967 122.004 26.474V35.428C122.004 36.1927 121.807 36.7847 121.412 37.204C121.018 37.5987 120.45 37.796 119.71 37.796C118.97 37.796 118.391 37.5987 117.971 37.204C117.577 36.7847 117.379 36.1927 117.379 35.428V26.696C117.379 25.29 117.108 24.2663 116.565 23.625C116.047 22.9837 115.233 22.663 114.123 22.663C112.767 22.663 111.681 23.0947 110.867 23.958C110.078 24.7967 109.683 25.919 109.683 27.325V35.428C109.683 37.0067 108.906 37.796 107.352 37.796ZM134.99 37.87C133.387 37.87 132.042 37.5987 130.957 37.056C129.896 36.5133 129.107 35.724 128.589 34.688C128.071 33.6273 127.812 32.32 127.812 30.766V22.885H125.888C125.296 22.885 124.84 22.737 124.519 22.441C124.198 22.1203 124.038 21.6887 124.038 21.146C124.038 20.5787 124.198 20.147 124.519 19.851C124.84 19.555 125.296 19.407 125.888 19.407H127.812V16.04C127.812 15.2753 128.009 14.6957 128.404 14.301C128.823 13.9063 129.403 13.709 130.143 13.709C130.883 13.709 131.45 13.9063 131.845 14.301C132.24 14.6957 132.437 15.2753 132.437 16.04V19.407H136.359C136.951 19.407 137.407 19.555 137.728 19.851C138.049 20.147 138.209 20.5787 138.209 21.146C138.209 21.6887 138.049 22.1203 137.728 22.441C137.407 22.737 136.951 22.885 136.359 22.885H132.437V30.507C132.437 31.691 132.696 32.579 133.214 33.171C133.732 33.763 134.571 34.059 135.73 34.059C136.149 34.059 136.519 34.022 136.84 33.948C137.161 33.874 137.444 33.8247 137.691 33.8C137.987 33.7753 138.234 33.874 138.431 34.096C138.628 34.2933 138.727 34.7127 138.727 35.354C138.727 35.8473 138.641 36.2913 138.468 36.686C138.32 37.056 138.036 37.315 137.617 37.463C137.296 37.5617 136.877 37.648 136.359 37.722C135.841 37.8207 135.385 37.87 134.99 37.87ZM147.551 37.87C145.503 37.87 143.962 37.2903 142.926 36.131C141.89 34.947 141.372 33.2203 141.372 30.951V13.45C141.372 12.6853 141.569 12.1057 141.964 11.711C142.358 11.3163 142.926 11.119 143.666 11.119C144.406 11.119 144.973 11.3163 145.368 11.711C145.787 12.1057 145.997 12.6853 145.997 13.45V30.729C145.997 31.8637 146.231 32.7023 146.7 33.245C147.193 33.7877 147.884 34.059 148.772 34.059C148.969 34.059 149.154 34.059 149.327 34.059C149.499 34.0343 149.672 34.0097 149.845 33.985C150.19 33.9357 150.424 34.0343 150.548 34.281C150.671 34.503 150.733 34.9717 150.733 35.687C150.733 36.3037 150.609 36.7847 150.363 37.13C150.116 37.4753 149.709 37.685 149.142 37.759C148.895 37.7837 148.636 37.8083 148.365 37.833C148.093 37.8577 147.822 37.87 147.551 37.87ZM157.306 44.456C156.763 44.456 156.319 44.308 155.974 44.012C155.628 43.7407 155.419 43.3707 155.345 42.902C155.295 42.4333 155.382 41.94 155.604 41.422L158.12 35.835V37.759L151.386 22.182C151.164 21.6393 151.09 21.1337 151.164 20.665C151.238 20.1963 151.46 19.8263 151.83 19.555C152.224 19.259 152.755 19.111 153.421 19.111C153.988 19.111 154.444 19.2467 154.79 19.518C155.135 19.7647 155.443 20.2457 155.715 20.961L160.71 33.43H159.6L164.706 20.924C164.977 20.2333 165.298 19.7647 165.668 19.518C166.038 19.2467 166.531 19.111 167.148 19.111C167.69 19.111 168.122 19.259 168.443 19.555C168.763 19.8263 168.961 20.1963 169.035 20.665C169.109 21.109 169.022 21.6023 168.776 22.145L159.785 42.68C159.464 43.3707 159.119 43.8393 158.749 44.086C158.379 44.3327 157.898 44.456 157.306 44.456Z"
                              fill="#393939"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="relative z-0 flex w-[90%] items-center justify-center px-2">
                    <div className="w-full sm:max-w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-main sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                  <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
                    onClick={toggleNotificationDropdown}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {isNotificationOpen && (
                    <div
                      className="fixed inset-0 z-20"
                      onClick={closeDropdowns}
                    ></div>
                  )}

                  {/* Notification dropdown */}
                  <Transition
                    as={Fragment}
                    show={isNotificationOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="absolute right-[18rem] top-[2.5rem] mt-2 w-[23rem] h-[25rem] origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="w-full bg-[#fff] h-[30px] rounded-t-md flex items-center border-b-2">
                        <BellIcon className="h-5 w-5 ml-[12px]" />
                        <h1 className="text-[15px] text-[#404145] font-[800] py-[12px] px-[8px]">
                          Notifications (1)
                        </h1>
                      </div>

                      {/* Content */}
                      <div className="w-full h-[80%] flex bg-gray-100 flex-col overflow-y-auto">
                        {Notifications.map((notification) => (
                          <div
                            key={notification.key}
                            className="max-h-[100px] flex py-8 px-2 bg-[#fff] text-[14px] gap-4 border-b-2"
                          >
                            <div className="flex items-center justify-center">
                              <div className="w-[60px] h-[60px] bg-theme-blue rounded-full text-[#fff] justify-center items-center flex border-2 text-[40px]">
                                <IoIosAlarm />
                              </div>
                            </div>
                            <div className="flex flex-col justify-center">
                              <p>{notification.message}</p>
                              <span className="text-[12px] text-[#b5b6ba]">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="w-full h-[7%] bg-[#fff] rounded-b-md flex items-center justify-end p-2 border-t-2">
                        <p className="text-[12px] text-neutral-400">
                          Keep the track of time!
                        </p>
                      </div>
                    </div>
                  </Transition>

                  <Link to={"/user/settings/meetingsandappointments"}>
                    <button
                      type="button"
                      className="relative flex-shrink-0 rounded-full bg-white p-1 mx-4 font-medium text-neutral-700 hover:text-neutral-500"
                    >
                      <p className="text-base">Meetings</p>
                    </button>
                  </Link>
                  <Link to="#" onClick={handleClick}>
                    <button
                      type="button"
                      className="relative flex-shrink-0 rounded-full bg-white p-1 font-bold text-theme-blue hover:text-text-light"
                    >
                      <p className="text-base tracking-tight">
                        {isSeller ? "Seller Profile" : "Start Offering"}
                      </p>
                    </button>
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-14 w-14 rounded-full object-cover"
                          src={user?.profilePicture?.url}
                          alt="Profile"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Items>
                          {({ active }) => (
                            <Link
                              to="/main"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-btn-bg"
                              )}
                            >
                              Home
                            </Link>
                          )}
                        </Menu.Items>

                        <Menu.Items>
                          {({ active }) => (
                            <Link
                              to="/user/settings/accountsettings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-btn-bg"
                              )}
                            >
                              Account Settings
                            </Link>
                          )}
                        </Menu.Items>

                        <Menu.Items>
                          {({ active }) => (
                            <Link
                              to="/seller/settings/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-btn-bg"
                              )}
                            >
                              Seller Settings
                            </Link>
                          )}
                        </Menu.Items>

                        <Menu.Items>
                          {({ active }) => (
                            <Link
                              onClick={Logout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:text-btn-bg"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Items>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel
              as="nav"
              className="lg:hidden z-0"
              aria-label="Global"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                {NavbarMainNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.profilePicture?.url}
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user && user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user && user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <Link to="#">Your Profile</Link>
                  </Disclosure.Button>

                  <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <Link to="#">Settings</Link>
                  </Disclosure.Button>

                  <Disclosure.Button
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    onClick={Logout}
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NavbarMain;
