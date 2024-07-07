import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { platformLogo } from "../../Styles/Style";
import {
  FcUnlock,
  FcPlanner,
  FcMoneyTransfer,
  FcSettings,
  FcApproval,
  FcCalculator,
} from "react-icons/fc";

import { Layout, Menu } from "antd";

import DashboardNav from "./DashboardNav";

const { Sider } = Layout;

const UserDashboardLayout = ({ children }) => {
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
              User
            </div>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <FcSettings size={25} />,
                onClick: () =>
                  handleMenuItemClick("/user/settings/accountsettings"),
                label: "Profile Account Setting",
                style: { marginBottom: "15px" },
              },
              {
                key: "2",
                icon: <FcUnlock size={25} />,
                onClick: () =>
                  handleMenuItemClick("/user/settings/passwordandsecurity"),
                label: "Password & Security",
                style: { marginBottom: "15px" },
              },
              {
                key: "3",
                icon: <FcPlanner size={25} />,
                onClick: () =>
                  handleMenuItemClick("/user/settings/meetingsandappointments"),
                label: "Meetings & Appointments",
                style: { marginBottom: "15px" },
              },
              {
                key: "4",
                icon: <FcCalculator size={25} />,
                onClick: () =>
                  handleMenuItemClick("/user/settings/walletandpayments"),
                label: "Wallet & Payments",
                style: { marginBottom: "15px" },
              },
              {
                key: "5",
                icon: <FcApproval size={25} />,
                onClick: () =>
                  handleMenuItemClick("/user/settings/accountownership"),
                label: "Account Ownership",
                style: { marginBottom: "15px" },
              },
            ]}
          />
        </Sider>
        <Layout>
          <DashboardNav page={currentPage} />
          {children}
        </Layout>
      </Layout>
    </>
  );
};

export default UserDashboardLayout;
