import React from "react";

import { BsStack } from "react-icons/bs";

import { groupNumber, ordersData } from "../../../Static/SellerProfileData";
import OrdersPieChart from "./OrdersPieChart";

import css from "../../../Styles/SellerDashboardOrders.module.css";

const Orders = () => {
  return (
    <div className={`${css.container} theme-container`}>
      <div className={css.head}>
        <span className="text-[#fff] text-[2rem]">
          <BsStack />
        </span>
        <span>Appointments today</span>
      </div>

      <div className={`grey-container ${css.stat}`}>
        <span>Amount</span>
        <span>$ {groupNumber(4560)}</span>
      </div>

      <div className={css.orders}>
        {ordersData.map((order, index) => (
          <div key={index} className={css.order}>
            <div>
              <span>{order.name}</span>
              <span>$ {order.change}</span>
            </div>
            <div>
              <span>{order.type}</span>
              <span>Items: {order.items}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={css.orderChart}>
        <span>Split by orders</span>
        <hr className="mt-2 border-[1.5px]"/>
        <OrdersPieChart />
      </div>
    </div>
  );
};

export default Orders;
