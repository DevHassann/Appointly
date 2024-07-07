import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  SellerMeetingsTable,
  SellerWalletsTable,
} from "../Includes/SellerWalletPaymentsTables";
import { SellerPaymentModalBox } from "../../ModalBoxes";
import Loader from "../../Loader";

const SellerWalletAndPayments = () => {
  const { seller } = useSelector((state) => state.seller);
  const [selectedTab, setSelectedTab] = useState("Meetings");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      {seller == null ? (
        <>
          <div className="p-4">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <div className="p-4 bg-white mb-4">
            <div className="px-6">
              {/* Heading & Button */}
              <div className="w-full flex justify-between items-center py-[0.6875rem] px-[0.9375rem] border-b border-gray-300 my-5 ml-4">
                <h1 className="text-neutral-700 text-3xl">Wallet & Payments</h1>
                <SellerPaymentModalBox />
              </div>

              {/* Boxes */}
              <div className="flex gap-19">
                {/* Box 01 */}
                <div
                  className="w-[12.875rem] px-[1.5625rem] py-[1.1875rem] flex flex-col justify-center items-start gap-[0.0625rem] rounded-[1.0625rem] bg-[#4991FC] ml-7"
                  style={{ boxShadow: "0px 31px 33px -30px #4991FC" }}
                >
                  <p className="text-white text-opacity-60 text-[0.875rem] font-[400] leading-normal tracking-[-0.02625rem]">
                    Available Balance
                  </p>
                  <p className="text-[#fff] text-[2.6875rem] font-[700] leading-[100.5%] tracking-[-0.08063rem]">
                    $2,000
                  </p>
                </div>
                {/* Box 02 */}
                <div
                  className="w-[12.875rem] px-[1.5625rem] py-[1.1875rem] flex flex-col justify-center items-start gap-[0.0625rem] rounded-[1.0625rem] bg-[#fff] ml-10"
                  style={{
                    boxShadow: "0px 6px 33px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <p className="text-[#949494] text-[0.875rem] font-[400] leading-normal tracking-[-0.02625rem]">
                    Amount Spent
                  </p>
                  <p className="text-[#6C6C6C] text-[2.6875rem] font-[700] leading-[100.5%] tracking-[-0.08063rem]">
                    $2588
                  </p>
                </div>
                {/* Box 03 */}
                <div
                  className="w-[12.875rem] px-[1.5625rem] py-[1.1875rem] flex flex-col justify-center items-start gap-[0.0625rem] rounded-[1.0625rem] bg-[#fff] ml-10"
                  style={{
                    boxShadow: "0px 6px 33px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <p className="text-[#949494] text-[0.875rem] font-[400] leading-normal tracking-[-0.02625rem]">
                    Added Amount
                  </p>
                  <p className="text-[#6C6C6C] text-[2.6875rem] font-[700] leading-[100.5%] tracking-[-0.08063rem]">
                    $3780
                  </p>
                </div>
                {/* Box 04 */}
                <div
                  className="w-[12.875rem] px-[1.5625rem] py-[1.1875rem] flex flex-col justify-center items-start gap-[0.0625rem] rounded-[1.0625rem] bg-[#fff] ml-10"
                  style={{
                    boxShadow: "0px 6px 33px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <p className="text-[#949494] text-[0.875rem] font-[400] leading-normal tracking-[-0.02625rem]">
                    Total Meetings Booked
                  </p>
                  <p className="text-[#6C6C6C] text-[2.6875rem] font-[700] leading-[100.5%] tracking-[-0.08063rem]">
                    56
                  </p>
                </div>
              </div>

              {/* Heading 02 & Table Switch Button */}
              <div className="w-full flex justify-between items-center mx-5 mt-10 mb-6">
                {/* Heading02 */}
                <div className="flex flex-col">
                  <h1 className="text-[#393939] text-[1.3125rem] font-[700] leading-normal tracking-[-0.03938rem]">
                    Payment History
                  </h1>
                  <p className="text-[#808080] text-[0.8125rem] font-[400] leading-normal tracking-[-0.02438rem]">
                    View the history of transactions
                  </p>
                </div>
                {/* Table Button */}
                <div className="ml-auto space-y-2 mr-20">
                  <div className="flex">
                    <div
                      className="flex mx-3"
                      onClick={() => handleTabClick("Meetings")}
                    >
                      <div
                        className={`w-4 h-4 shrink-0 rounded-[0.25rem] ${
                          selectedTab === "Meetings"
                            ? "bg-[#4991FC]"
                            : "bg-[#D9D9D9]"
                        } cursor-pointer`}
                      />
                      <span className="text-[#575757] text-[0.7875rem] font-[500] leading-normal tracking-[-0.02063rem] mx-1">
                        Meetings
                      </span>
                    </div>
                    <div
                      className="flex"
                      onClick={() => handleTabClick("Wallets")}
                    >
                      <div
                        className={`w-4 h-4 shrink-0 rounded-[0.25rem] ${
                          selectedTab === "Wallets"
                            ? "bg-[#4991FC]"
                            : "bg-[#D9D9D9]"
                        } cursor-pointer`}
                      />
                      <span className="text-[#575757] text-[0.7875rem] font-[500] leading-normal tracking-[-0.02063rem] mx-1">
                        Wallets
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-4 border-2 rounded-lg"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                {selectedTab === "Meetings" && <SellerMeetingsTable />}
                {selectedTab === "Wallets" && <SellerWalletsTable />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SellerWalletAndPayments;
