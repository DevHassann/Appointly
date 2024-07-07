import React, { useState } from "react";
import Lottie from "react-lottie";

import { Button, Modal } from "antd";

import animationData from "../Assets/Animations/Animation - 1698510151392.json";
import PayPalLogo from "../Assets/PayPalLogo.jpg";
import CreditCard from "../Assets/CreditCardLogo.jpg";
import Logo from "../Assets/Logo.jpg";

// Modal Box For Joining Meeting
const JoinMeetingModalBox = ({ sellerName, dataLink }) => {
  const [modal2Open, setModal2Open] = useState(false);

  const okButtonStyles = {
    backgroundColor: "#4991FC",
    color: "white",
    border: "none",
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleContinue = () => {
    setModal2Open(false);
    window.location.href = dataLink;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModal2Open(true)}
        className="text-center active:scale-95 transition-all cursor-pointer bg-theme-blue hover:bg-[#4178cc] text-white font-bold text-base py-1 w-40 rounded-xl"
      >
        Join Meeting
      </Button>
      <Modal
        title={
          <span className="flex items-center justify-center">
            <Lottie
              options={defaultOptions}
              width={30}
              height={50}
              style={{ margin: "0" }}
            />
            <h1 className="text-lg font-bold">Joining Meeting</h1>
          </span>
        }
        open={modal2Open}
        onOk={handleContinue}
        onCancel={() => setModal2Open(false)}
        closable={false}
        okButtonProps={{ style: okButtonStyles }}
        okText="Continue"
        centered
      >
        <p className="font-light text-base my-3">
          You are about to join a meeting with{" "}
          <span className="font-bold text-theme-blue">{sellerName}</span>. Now
          you will be redirected to the Zoom meeting page.
        </p>
        <p>Are you sure?</p>
      </Modal>
    </>
  );
};

// Modal Box For Canceling Meeting
const CancelMeetingModalBox = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showConfirm = () => {
    if (isModalVisible) {
      return;
    }

    setIsModalVisible(true);

    Modal.confirm({
      title: "Warning",
      content: (
        <p>
          Cancelling this meeting might cause some charges. Are you sure you
          want to continue?
        </p>
      ),
      centered: true,
      closable: false,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setIsModalVisible(false);
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  };

  return (
    <>
      <Button
        type="danger"
        onClick={showConfirm}
        className="text-center active:scale-95 transition-all cursor-pointer bg-red-500 hover:bg-[#dd3333] text-white font-bold text-base py-1 w-40 rounded-xl"
      >
        Cancel
      </Button>
    </>
  );
};

// Modal Box For Payment Method
const PaymentModalBox = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(1);
  const [credentials, setCredentials] = useState({});

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === "paypal") {
      const paypalCredentials = {
        email: credentials.email,
        password: credentials.password,
      };
      setCredentials(paypalCredentials);
    } else if (selectedOption === "credit-card") {
      const creditCardCredentials = {
        cardNumber: credentials.cardNumber,
        expirationDate: credentials.expirationDate,
        cvv: credentials.cvv,
      };
      setCredentials(creditCardCredentials);
    }

    setPrevStep(step);
    setStep(2);
  };

  const closeModal = () => {
    setModal2Open(false);
  };

  const renderContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div
            className={`border border-gray-100 rounded-md p-10 flex items-center shadow-md ${
              selectedOption === "paypal" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              handleOptionClick("paypal");
            }}
          >
            <img
              alt=""
              src={PayPalLogo}
              width={50}
              height={50}
              className="-ml-8"
            />
            <span className="ml-4 text-lg font-semibold">Pay with PayPal</span>
            <input
              type="radio"
              id="paypal"
              name="paymentOption"
              className="ml-auto"
              checked={selectedOption === "paypal"}
              onChange={() => handleOptionClick("paypal")}
            />
          </div>
          <div
            className={`border border-gray-100 rounded-md p-10 flex items-center shadow-md ${
              selectedOption === "credit-card" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              handleOptionClick("credit-card");
            }}
          >
            <img
              alt=""
              src={CreditCard}
              width={50}
              height={50}
              className="-ml-8"
            />
            <span className="ml-4 text-lg font-semibold">
              Pay with Credit Card
            </span>
            <input
              type="radio"
              id="credit-card"
              name="paymentOption"
              className="ml-auto"
              checked={selectedOption === "credit-card"}
              onChange={() => handleOptionClick("credit-card")}
            />
          </div>
        </div>
      );
    } else if (step === 2) {
      if (selectedOption === "paypal") {
        return (
          <div>
            <img
              alt=""
              src={PayPalLogo}
              width={50}
              height={50}
              className="left-0 right-0 m-auto"
            />
            <h2 className="text-lg font-semibold mb-2">PayPal Credentials:</h2>
            <div className="rounded-md border border-gray-300 p-2 mb-4">
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="rounded-md border border-gray-300 p-2">
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <button className="w-full bg-blue-500 text-white rounded-md py-2 mt-4">
              Pay Now
            </button>
          </div>
        );
      } else if (selectedOption === "credit-card") {
        return (
          <div>
            <img
              alt=""
              src={CreditCard}
              width={50}
              height={50}
              className="left-0 right-0 m-auto mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">
              Credit Card Credentials:
            </h2>
            <div className="rounded-md border border-gray-300 p-2 mb-2">
              <input
                type="text"
                placeholder="Card Number"
                value={credentials.cardNumber}
                onChange={(e) =>
                  setCredentials({ ...credentials, cardNumber: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 rounded-md border border-gray-300 p-2 mr-2">
                <input
                  type="text"
                  placeholder="Expiration Date"
                  value={credentials.expirationDate}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      expirationDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="w-1/2 rounded-md border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="CVV"
                  value={credentials.cvv}
                  onChange={(e) =>
                    setCredentials({ ...credentials, cvv: e.target.value })
                  }
                  className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white rounded-md py-2 mt-4">
              Pay Now
            </button>
          </div>
        );
      }
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModal2Open(true)}
        className="w-45 h-[2.5rem] px-4 py-2 flex justify-center items-center rounded-lg bg-blue-500 shadow-md text-white text-lg font-semibold hover:bg-blue-600 mr-20"
      >
        Payment Methods
      </Button>
      <Modal centered open={modal2Open} footer={null} closable={false}>
        <div className="max-w-md mx-auto p-4 rounded-lg">
          <div className="max-w-md mx-auto p-4 rounded-lg">
            {step === 1 && (
              <>
                <div className="flex items-center mb-4">
                  <img
                    alt=""
                    src={Logo}
                    width={50}
                    height={50}
                    className="-ml-7 mt-1"
                  />
                  <h2 className="text-2xl font-bold ml-4">
                    Change your payment method
                  </h2>
                </div>
                <p className="-mt-10 p-5 ml-8">
                  Update your plan payment details
                </p>
              </>
            )}
            {renderContent()}
            <div className="mt-6">
              {step === 1 && (
                <button
                  className="w-full bg-blue-500 text-white rounded-md py-2"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
              <button
                className="w-full bg-gray-300 text-gray-700 rounded-md py-2 mt-2"
                onClick={() => {
                  setStep(prevStep);
                  closeModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Seller Modal Box For Joining Meeting
const SellerJoinMeetingModalBox = ({ sellerName, dataLink }) => {
  const [modal2Open, setModal2Open] = useState(false);

  const okButtonStyles = {
    backgroundColor: "#4991FC",
    color: "white",
    border: "none",
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleContinue = () => {
    setModal2Open(false);
    window.location.href = dataLink;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModal2Open(true)}
        className="text-center active:scale-95 transition-all cursor-pointer bg-theme-blue hover:bg-[#4178cc] text-white font-bold text-base py-1 w-40 rounded-xl"
      >
        Join Meeting
      </Button>
      <Modal
        title={
          <span className="flex items-center justify-center">
            <Lottie
              options={defaultOptions}
              width={30}
              height={50}
              style={{ margin: "0" }}
            />
            <h1 className="text-lg font-bold">Joining Meeting</h1>
          </span>
        }
        open={modal2Open}
        onOk={handleContinue}
        onCancel={() => setModal2Open(false)}
        closable={false}
        okButtonProps={{ style: okButtonStyles }}
        okText="Continue"
        centered
      >
        <p className="font-light text-base my-3">
          You are about to join a meeting with{" "}
          <span className="font-bold text-theme-blue">{sellerName}</span>. Now
          you will be redirected to the Zoom meeting page.
        </p>
        <p>Are you sure?</p>
      </Modal>
    </>
  );
};

// Seller Modal Box For Canceling Meeting
const SellerCancelMeetingModalBox = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showConfirm = () => {
    if (isModalVisible) {
      return;
    }

    setIsModalVisible(true);

    Modal.confirm({
      title: "Warning",
      content: (
        <p>
          Cancelling this meeting might cause some charges. Are you sure you
          want to continue?
        </p>
      ),
      centered: true,
      closable: false,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setIsModalVisible(false);
      },
      onCancel() {
        setIsModalVisible(false);
      },
    });
  };

  return (
    <>
      <Button
        type="danger"
        onClick={showConfirm}
        className="text-center active:scale-95 transition-all cursor-pointer bg-red-500 hover:bg-[#dd3333] text-white font-bold text-base py-1 w-40 rounded-xl"
      >
        Cancel
      </Button>
    </>
  );
};

// Seller Modal Box For Payment Method
const SellerPaymentModalBox = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(1);
  const [credentials, setCredentials] = useState({});

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === "paypal") {
      const paypalCredentials = {
        email: credentials.email,
        password: credentials.password,
      };
      setCredentials(paypalCredentials);
    } else if (selectedOption === "credit-card") {
      const creditCardCredentials = {
        cardNumber: credentials.cardNumber,
        expirationDate: credentials.expirationDate,
        cvv: credentials.cvv,
      };
      setCredentials(creditCardCredentials);
    }

    setPrevStep(step);
    setStep(2);
  };

  const closeModal = () => {
    setModal2Open(false);
  };

  const renderContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div
            className={`border border-gray-100 rounded-md p-10 flex items-center shadow-md ${
              selectedOption === "paypal" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              handleOptionClick("paypal");
            }}
          >
            <img
              alt=""
              src={PayPalLogo}
              width={50}
              height={50}
              className="-ml-8"
            />
            <span className="ml-4 text-lg font-semibold">Pay with PayPal</span>
            <input
              type="radio"
              id="paypal"
              name="paymentOption"
              className="ml-auto"
              checked={selectedOption === "paypal"}
              onChange={() => handleOptionClick("paypal")}
            />
          </div>
          <div
            className={`border border-gray-100 rounded-md p-10 flex items-center shadow-md ${
              selectedOption === "credit-card" ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              handleOptionClick("credit-card");
            }}
          >
            <img
              alt=""
              src={CreditCard}
              width={50}
              height={50}
              className="-ml-8"
            />
            <span className="ml-4 text-lg font-semibold">
              Pay with Credit Card
            </span>
            <input
              type="radio"
              id="credit-card"
              name="paymentOption"
              className="ml-auto"
              checked={selectedOption === "credit-card"}
              onChange={() => handleOptionClick("credit-card")}
            />
          </div>
        </div>
      );
    } else if (step === 2) {
      if (selectedOption === "paypal") {
        return (
          <div>
            <img
              alt=""
              src={PayPalLogo}
              width={50}
              height={50}
              className="left-0 right-0 m-auto"
            />
            <h2 className="text-lg font-semibold mb-2">PayPal Credentials:</h2>
            <div className="rounded-md border border-gray-300 p-2 mb-4">
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="rounded-md border border-gray-300 p-2">
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <button className="w-full bg-blue-500 text-white rounded-md py-2 mt-4">
              Pay Now
            </button>
          </div>
        );
      } else if (selectedOption === "credit-card") {
        return (
          <div>
            <img
              alt=""
              src={CreditCard}
              width={50}
              height={50}
              className="left-0 right-0 m-auto mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">
              Credit Card Credentials:
            </h2>
            <div className="rounded-md border border-gray-300 p-2 mb-2">
              <input
                type="text"
                placeholder="Card Number"
                value={credentials.cardNumber}
                onChange={(e) =>
                  setCredentials({ ...credentials, cardNumber: e.target.value })
                }
                className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 rounded-md border border-gray-300 p-2 mr-2">
                <input
                  type="text"
                  placeholder="Expiration Date"
                  value={credentials.expirationDate}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      expirationDate: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="w-1/2 rounded-md border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="CVV"
                  value={credentials.cvv}
                  onChange={(e) =>
                    setCredentials({ ...credentials, cvv: e.target.value })
                  }
                  className="w-full p-2 rounded-md border-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white rounded-md py-2 mt-4">
              Pay Now
            </button>
          </div>
        );
      }
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModal2Open(true)}
        className="w-45 h-[2.5rem] px-4 py-2 flex justify-center items-center rounded-lg bg-blue-500 shadow-md text-white text-lg font-semibold hover:bg-blue-600 mr-20"
      >
        Payment Methods
      </Button>
      <Modal centered open={modal2Open} footer={null} closable={false}>
        <div className="max-w-md mx-auto p-4 rounded-lg">
          <div className="max-w-md mx-auto p-4 rounded-lg">
            {step === 1 && (
              <>
                <div className="flex items-center mb-4">
                  <img
                    alt=""
                    src={Logo}
                    width={50}
                    height={50}
                    className="-ml-7 mt-1"
                  />
                  <h2 className="text-2xl font-bold ml-4">
                    Change your payment method
                  </h2>
                </div>
                <p className="-mt-10 p-5 ml-8">
                  Update your plan payment details
                </p>
              </>
            )}
            {renderContent()}
            <div className="mt-6">
              {step === 1 && (
                <button
                  className="w-full bg-blue-500 text-white rounded-md py-2"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
              <button
                className="w-full bg-gray-300 text-gray-700 rounded-md py-2 mt-2"
                onClick={() => {
                  setStep(prevStep);
                  closeModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Delete Account Modal
const DeleteAccount = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Button
        className="rounded-[1.5rem] bg-red-500 hover:bg-red-400 hover:!text-[#fff] !border-none transition-all duration-500 ease-in-out text-white h-[40px] w-[25%]"
        onClick={showModal}
      >
        Delete Account
      </Button>
      <Modal
        title="Are you sure you want to delete your Account ?"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>
          Field to ass gmail, then check if email is valid and if email is valid
          make delete button clickable
        </p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

// Disable Account Modal
const DisableAccount = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const okButtonStyles = {
    backgroundColor: "#4991FC",
    color: "white",
    border: "none",
  };

  return (
    <>
      <Button
        className="rounded-[1.5rem] bg-theme-blue hover:bg-blue-400 hover:!text-[#fff] !border-none transition-all duration-500 ease-in-out text-white h-[35px] w-[20%]"
        onClick={showModal}
      >
        Disable
      </Button>
      <Modal
        title="Disable your Account"
        open={open}
        onOk={hideModal}
        okButtonProps={{ style: okButtonStyles }}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
        closable={false}
      >
        <p>Are you sure you want to disable your account ?</p>
        <p className="text-neutral-400 text-[0.875rem]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
          adipisci ratione architecto cumque asperiores ipsum veniam. Provident
          sequi sint magnam id illo vitae aperiam autem! Sequi, laborum
          suscipit. Rem, deserunt.
        </p>
      </Modal>
    </>
  );
};

export {
  JoinMeetingModalBox,
  CancelMeetingModalBox,
  PaymentModalBox,
  SellerJoinMeetingModalBox,
  SellerCancelMeetingModalBox,
  SellerPaymentModalBox,
  DeleteAccount,
  DisableAccount,
};
