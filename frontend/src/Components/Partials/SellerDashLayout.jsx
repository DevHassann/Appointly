import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { platformLogo } from "../../Styles/Style";
import {
  FcBriefcase,
  FcCurrencyExchange,
  FcDocument,
  FcGraduationCap,
  FcMoneyTransfer,
  FcPlanner,
  FcPositiveDynamic,
  FcReading,
  FcWebcam,
} from "react-icons/fc";

import { Layout, Menu } from "antd";

import SellerDashboardNav from "./SellerDashboardNav";

const { Sider } = Layout;

const SellerDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.split("/settings/").pop();

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Layout>
        <Sider
          width={300}
          theme="light"
          trigger={null}
          collapsible
          collapsed={false}
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          }}
        >
          <div className="w-full h-9 py-14 flex items-center justify-center">
            <Link to="/main">{platformLogo()}</Link>
            <div className="text-base italic text-theme-blue ml-3 font-bold">
              Seller
            </div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FcPositiveDynamic size={25} />,
                onClick: () =>
                  handleMenuItemClick("/seller/settings/dashboard"),
                label: "Dashboard",
                style: { marginBottom: "15px" },
              },
              {
                key: "2",
                icon: <FcReading size={25} />,
                onClick: () =>
                  handleMenuItemClick("/seller/settings/personal-information"),
                label: "Personal Information",
                style: { marginBottom: "15px" },
              },
              {
                key: "3",
                icon: <FcDocument size={25} />,
                onClick: () =>
                  handleMenuItemClick(
                    "/seller/settings/professional-information"
                  ),
                label: "Professional Information",
                style: { marginBottom: "15px" },
              },
              {
                key: "4",
                icon: <FcWebcam size={25} />,
                onClick: () =>
                  handleMenuItemClick(
                    "/seller/settings/meetingsandappointments"
                  ),
                label: "Meetings & Appointments",
                style: { marginBottom: "15px" },
              },
              {
                key: "5",
                icon: <FcGraduationCap size={25} />,
                onClick: () =>
                  handleMenuItemClick(
                    "/seller/settings/educationandqualification"
                  ),
                label: "Education & Qualification",
                style: { marginBottom: "15px" },
              },
              {
                key: "6",
                icon: <FcMoneyTransfer size={25} />,
                onClick: () =>
                  handleMenuItemClick("/seller/settings/price-management"),
                label: "Price Management",
                style: { marginBottom: "15px" },
              },
              {
                key: "7",
                icon: <FcBriefcase size={25} />,
                onClick: () =>
                  handleMenuItemClick(
                    "/seller/settings/professional-experiences"
                  ),
                label: "Professional Experiences",
                style: { marginBottom: "15px" },
              },
              {
                key: "8",
                icon: <FcPlanner size={25} />,
                onClick: () =>
                  handleMenuItemClick("/seller/settings/slotsandscheduels"),
                label: "Slots & Schedules",
                style: { marginBottom: "15px" },
              },
              {
                key: "9",
                icon: <FcCurrencyExchange size={25} />,
                onClick: () =>
                  handleMenuItemClick("/seller/settings/walletandpayments"),
                label: "Wallet & Payments",
                style: { marginBottom: "15px" },
              },
            ]}
          />
        </Sider>
        <Layout>
          <SellerDashboardNav page={currentPage} />
          {children}
        </Layout>
      </Layout>
    </>
  );
};

export default SellerDashboardLayout;
