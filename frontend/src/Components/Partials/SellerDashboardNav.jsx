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

const SellerDashboardNav = (prop) => {
  const { seller } = useSelector((state) => state.seller);

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
            <span className="text-theme-blue">
              {seller?.firstName.toUpperCase()} {seller?.lastName.toUpperCase()}
            </span>{" "}
            !
          </h1>
          <h1 className="text-base text-neutral-400 leading-3">
            {prop.page === "dashboard"
              ? "Monitor your account progress and performance metrics"
              : prop.page === "personal-information"
              ? "Review and update your personal profile details"
              : prop.page === "professional-information"
              ? "Manage your professional profile"
              : prop.page === "meetingsandappointments"
              ? "Schedule and manage appointments with clients"
              : prop.page === "educationandqualification"
              ? "Manage your educational credentials and certifications"
              : prop.page === "price-management"
              ? "Set and adjust your service rates and pricing packages"
              : prop.page === "professional-experiences"
              ? "Add and edit your professional experience and career highlights"
              : prop.page === "slotsandscheduels"
              ? "Configure your availability and schedule appointments"
              : "Track your earnings and transaction history"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <BellFilled className={iconButtonStyles()} />
          <Link to={`/seller/${sellerId}`}>
            <span className="text-[25px] text-neutral-400">
              <BsPersonVcardFill />
            </span>
          </Link>

          <Menu as="div" className="relative flex-shrink-0">
            <div>
              <Menu.Button className="relative flex rounded-full bg-white">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Avatar size={60} src={seller?.professionalImage?.url} />
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

                {/* Account Setting */}
                <Menu.Items>
                  {({ active }) => (
                    <Link
                      to="/user/settings/accountsettings"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Account Settings
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
            <span className="font-semibold">
              {" "}
              {seller?.firstName.toUpperCase()} {seller?.lastName.toUpperCase()}
            </span>
            <span className="text-neutral-400">
              {seller?.professionalEmail}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default SellerDashboardNav;
