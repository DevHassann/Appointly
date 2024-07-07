import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { Avatar } from "antd";
import { Menu, Transition } from "@headlessui/react";

import { BellFilled } from "@ant-design/icons";
import { iconButtonStyles } from "../../Styles/Style";
import { BsPersonVcardFill } from "react-icons/bs";

import { server } from "../../server";

// Function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardNav = (prop) => {
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

  return (
    <>
      <div
        className="flex justify-between w-full px-8 py-5 border-b-2 bg-white border-neutral-200 tracking-tight"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        }}
      >
        <div className="flex justify-center flex-col gap-2">
          <h1 className="text-xl font-bold">
            Hey,{" "}
            <span className="text-theme-blue">{user?.name.toUpperCase()}</span>{" "}
            !
          </h1>
          <h1 className="text-base text-neutral-400 leading-3">
            {prop.page === "accountsettings"
              ? "Manage your personal information and preferences"
              : prop.page === "meetingsandappointments"
              ? "View and manage your upcoming meetings and appointments"
              : prop.page === "walletandpayments"
              ? "Manage your payment methods and view your transaction history"
              : prop.page === "accountownership"
              ? "Transfer account ownership or manage multiple accounts"
              : "Update your password and manage your security settings"}
          </h1>
        </div>

        <div className="flex items-center gap-4 mr-4">
          <BellFilled className={iconButtonStyles()} />
          <Link to={isSeller ? `/seller/${sellerId}` : `/onboarding`}>
            {isSeller ? (
              <>
                <span className="text-[25px] text-neutral-400">
                  <BsPersonVcardFill />
                </span>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="p-1 font-semibold text-theme-blue hover:text-text-light w-[100px] mr-6 ml-2"
                >
                  <p className="text-base tracking-tight">Start Offering</p>
                </button>
              </>
            )}
          </Link>

          <Menu as="div" className="relative flex-shrink-0">
            <div>
              <Menu.Button className="relative flex rounded-full bg-white">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Avatar size={60} src={user?.profilePicture?.url} />
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
                {/* Home */}
                <Menu.Items>
                  {({ active }) => (
                    <Link
                      to="/main"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Items>

                {/* Seller Account Setting */}
                <Menu.Items>
                  {({ active }) => (
                    <Link
                      to="/seller/settings/dashboard"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Seller Settings
                    </Link>
                  )}
                </Menu.Items>

                {/* Sign Out */}
                <Menu.Items>
                  {({ active }) => (
                    <Link
                      onClick={Logout}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </Link>
                  )}
                </Menu.Items>
              </Menu.Items>
            </Transition>
          </Menu>

          <span className="flex flex-col">
            <span className="font-semibold"> {user?.name.toUpperCase()}</span>
            <span className="text-neutral-400">{user?.email}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
