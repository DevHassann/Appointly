import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { server } from "../../server";

import ErrorMessage from "../ErrorMessage.jsx";
import PromptMessage from "../PromptMessage.jsx";
import LodingButton from "../LodingButton";

import { BsCalendar2DateFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import creditCardLogo from "../../Assets/CreditCard.png";
import paypalLogo from "../../Assets/PayPalLogo.jpg";

const BookNow = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState("credit_card");
  const [cardNumber, setCardNumber] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const userId = queryParams.get("userId");
  const sellerId = queryParams.get("sellerId");
  const totalPrice = queryParams.get("totalPrice");
  const selectedSlotsString = queryParams.get("selectedSlots");
  const pricePerSlot = queryParams.get("pricePerSlot");
  const paymentMethod = "PayPal";

  // String to Array
  const selectedSlots = JSON.parse(selectedSlotsString);

  // Total Slot Calculation
  const totalSlots = selectedSlots.reduce(
    (total, day) => total + day.slot.length,
    0
  );

  // Handiling Payments
  const handleChange = (event) => {
    setPaymentMethods(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const limitedValue = numericValue.slice(0, 15);
    const formattedValue = limitedValue.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  console.log(selectedSlots);

  // API
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios
      .post(
        `${server}/order/create-order`,
        {
          userId,
          sellerId,
          selectedSlots,
          totalPrice,
          paymentMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setSuccessMessage(res.data.message);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        {/* Slots Data */}
        <div className="flex-[2] p-4">
          <div className="flex flex-col w-full bg-white mt-10 p-2">
            {/* Heading */}
            <div className="flex w-full justify-between items-center my-4 py-4 px-6 border-b-[1px] border-neutral-200">
              <div className="text-neutral-700 text-3xl flex items-center gap-4">
                <div className="w-[60px] h-[60px] bg-theme-blue rounded-full text-[#fff] flex items-center justify-center p-2">
                  <BsCalendar2DateFill />
                </div>
                <p>Slots Time</p>
              </div>
            </div>
            {/* Slots */}
            {selectedSlots.map((day, index) =>
              day.slot.map((slot, slotIndex) => (
                <div
                  key={`slot-${index}-${slotIndex}`}
                  className="grid grid-cols-12 items-center border-b-2 p-4 px-12"
                >
                  {/* Index */}
                  <p className="bg-orange-400 rounded-full h-[30px] w-[30px] flex items-center justify-center">
                    {slotIndex + 1}
                  </p>

                  {/* Day */}
                  <div className="col-span-3">
                    <h2 className="text-[#575757] text-[1.3125rem] font-semibold">
                      {day.day}
                    </h2>
                    <p className="text-[#575757] text-[0.8125rem]">Nov 23</p>
                  </div>

                  <div className="w-[3px] h-[40px] bg-black"></div>

                  {/* Slot Time */}
                  <div className="col-span-6">
                    <p>{slot}</p>
                  </div>

                  {/* Delete Slot */}
                  <div className="text-xl cursor-pointer w-full flex justify-end hover:text-red-600 transition-all duration-500 ease-in-out">
                    <FaTrash />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Invoice */}
        <div className="flex-[1] p-4">
          <div
            className="max-w-md mx-auto p-8 bg-white rounded-2xl mt-10 border-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
          >
            {/* Heading */}
            <h1 className="text-2xl font-bold mb-4 text-black">
              Payment Information
            </h1>

            {/* Recipt Box */}
            <div className="flex flex-col mt-4 mx-auto max-w-2xl">
              <div className="bg-theme-blue border-2 rounded-2xl p-4">
                <div className="items-center pb-2 mb-3">
                  <h3 className="text-lg font-semibold text-white border-b-2 border-white">
                    Order Summary
                  </h3>
                </div>
                <ul className="flex flex-col space-y-2 gap-2">
                  <li className="flex justify-between items-center">
                    <span className="text-white">Subtotal :</span>
                    <span className="text-white font-medium">
                      ${totalPrice}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-white">Estimated Amount :</span>
                    <span className="text-white font-medium">
                      {totalSlots} x ${pricePerSlot}
                    </span>
                  </li>
                  <li className="flex flex-col space-y-1 border-t-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Total :</span>
                      <span className="text-white font-medium">
                        ${totalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-white">
                      (Inclusive of all taxes)
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-center gap-6 my-5">
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id="credit_card"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethods === "credit_card"}
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="credit_card"
                  className={`cursor-pointer flex items-center p-4 gap-4 rounded-md ${
                    paymentMethods === "credit_card"
                      ? "bg-theme-blue !text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span>Credit Card</span>
                  <img
                    src={creditCardLogo}
                    alt="Credit Card Logo"
                    className="h-6"
                  />
                </label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethods === "paypal"}
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="paypal"
                  className={`cursor-pointer flex items-center p-4 gap-4 rounded-md ${
                    paymentMethods === "paypal"
                      ? "bg-theme-blue !text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span>PayPal</span>
                  <img src={paypalLogo} alt="PayPal Logo" className="h-6" />
                </label>
              </div>
            </div>

            {paymentMethods === "credit_card" && (
              <div className="mt-8 border-t-2 pt-8 w-full">
                <label
                  htmlFor="cardName"
                  className="block text-base font-medium leading-5 text-neutral-700 m-1"
                >
                  Name on Card :
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="John Doe"
                  className="mb-4 w-full p-2 rounded-lg border-theme-blue focus:ring-2 focus:ring-inset focus:ring-theme-blue"
                />

                <label
                  htmlFor="cardNumber"
                  className="block text-base font-medium leading-5 text-neutral-700 m-1"
                >
                  Card Number :
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="16"
                  className="mb-4 w-full p-2 rounded-lg border-theme-blue focus:ring-2 focus:ring-inset focus:ring-theme-blue"
                />

                <div className="flex mb-4 gap-2 w-full">
                  <div>
                    <label
                      htmlFor="expirationDate"
                      className="block text-base font-medium leading-5 text-neutral-700 m-1"
                    >
                      Expiration Date :
                    </label>
                    <input
                      type="month"
                      id="expirationDate"
                      placeholder="MM/YYYY"
                      className="flex-1 p-2 rounded-lg border-theme-blue focus:ring-2 focus:ring-inset focus:ring-theme-blue"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-base font-medium leading-5 text-neutral-700 m-1"
                    >
                      CVV :
                    </label>
                    <input
                      type="password"
                      id="cvv"
                      placeholder="123"
                      maxLength="3"
                      className="p-2 border rounded-lg border-theme-blue focus:ring-2 focus:ring-inset focus:ring-theme-blue w-[100%]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethods === "paypal" && (
              <div className="mt-8 border-t-2 pt-8">
                <label
                  htmlFor="paypalEmail"
                  className="block text-base font-medium leading-5 text-neutral-700 m-1"
                >
                  PayPal Email Address :
                </label>
                <input
                  type="email"
                  id="paypalEmail"
                  placeholder="john.doe@example.com"
                  className="mb-4 w-full p-2 rounded-lg border-theme-blue focus:ring-2 focus:ring-inset focus:ring-theme-blue"
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full rounded-md bg-theme-blue mt-8 px-7 py-2 text-lg font-bold text-white shadow-sm hover:bg-theme-blue/90 focus-visible:outline focus-visible:outline-2 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LodingButton name={"Booking"} />
                </div>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error message component */}
      <ErrorMessage
        open={errorMessage !== ""}
        setOpen={() => setErrorMessage("")}
        heading="Error"
        message={errorMessage}
      />

      {/* Success message component */}
      <PromptMessage
        open={successMessage !== ""}
        setOpen={() => setSuccessMessage("")}
        heading="Success"
        message={successMessage}
      />
    </>
  );
};

export default BookNow;
