import React from "react";

import "../../../Styles/SellerSettings.css";
import css from "../../../Styles/SellerSettingDashboard.module.css";

import { cardsData, groupNumber } from "../../../Static/SellerProfileData";

import Orders from "../Includes/Order";
import Statistics from "../Includes/Statistics";

const SellerDashboard = () => {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Dashboard</span>
          </div>
          <div className={css.cards}>
            {cardsData.map((card, index) => (
              <div key={index} className={css.card}>
                <div className={css.cardHead}>
                  <span>{card.title}</span>
                  <span>+{card.change}</span>
                </div>

                <div className={css.cardAmount}>
                  <span>$</span>
                  <span>{groupNumber(card.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Statistics />
      </div>

      <Orders />
    </div>
  );
};

export default SellerDashboard;
