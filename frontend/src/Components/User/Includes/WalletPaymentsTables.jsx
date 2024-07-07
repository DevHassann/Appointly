import React from "react";

import { Avatar, ConfigProvider, Space, Table } from "antd";
import { format } from "date-fns";

import { WPMeetingsTabledata, WalletsTabledata } from "../../../Static/Data";

const MeetingsTablecolumns = [
  // Invoice Attribute
  {
    title: "Invoice #",
    key: "invoice",
    dataIndex: "invoice",
    render: (_, record) => (
      <h1 className="text-[#212121]  text-[0.9125rem] font-extrabold leading-normal tracking-[-0.02813rem]">
        #{record.invoice}
      </h1>
    ),
  },
  // Date Attribute
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, record) => (
      <h1 className="text-[#212121] text-[0.975rem] font-normal leading-normal tracking-[-0.02813rem]">
        {format(new Date(record.timeFrom), "EEE, LLL dd yyyy")}
      </h1>
    ),
  },
  //   Seller Attribute
  {
    title: "Seller",
    dataIndex: "seller",
    key: "seller",
    render: (_, record) => (
      <div className="flex items-center">
        <Avatar size={40} src={record.profileImg} />
        <div className="ml-3">
          <div className="text-[0.9375rem] font-[700] leading-normal tracking-[-0.02438rem]">
            {record.seller}
          </div>
          <div className="text-neutral-500 text-[0.7125rem] font-[300] leading-normal tracking-[-0.015rem]">
            {record.profileName}
          </div>
        </div>
      </div>
    ),
  },
  // MeetingID Attribute
  {
    title: "Meeting ID",
    key: "meetingID",
    dataIndex: "meetingID",
    render: (_, record) => (
      <h1 className="text-[0.9375rem] font-medium leading-normal tracking-[-0.02813rem]">
        #{record.meetingID}
      </h1>
    ),
  },
  // Amount Attribute
  {
    title: "Amount",
    key: "amount",
    dataIndex: "amount",
    render: (_, record) => (
      <h1 className="text-[0.9375rem] font-[700] leading-normal tracking-[-0.02813rem]">
        ${record.amount}
      </h1>
    ),
  },
  // Status Attribute
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, record) => {
      let divStyle = {};
      let text = record.status;

      switch (record.status) {
        case "Canceled":
          divStyle = {
            backgroundColor: "#EB6B6B",
          };
          text = "Canceled";
          break;
        case "Scheduled":
          divStyle = {
            backgroundColor: "#FFCF87",
          };
          text = "Scheduled";
          break;
        case "Complete":
          divStyle = {
            backgroundColor: "#9FE7B3",
          };
          text = "Complete";
          break;
        default:
          // More Values if so
          break;
      }

      return (
        <Space size={4} direction="vertical">
          <div
            className="inline-flex px-[0.625rem] py-[0.1875rem] justify-center items-center gap-[0.1875rem] rounded-[20.625rem]"
            style={divStyle}
          >
            <h1 className="text-brown-600 text-[1rem] leading-normal font-[700] tracking-[-0.03rem]">
              {text}
            </h1>
          </div>
        </Space>
      );
    },
  },
];

const MeetingsTable = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSizeSM: 16,
              cellPaddingInlineSM: 24,
              headerColor: "rgb(0,0,0,0.6)",
            },
          },
        }}
      >
        <Table
          size="small"
          columns={MeetingsTablecolumns}
          dataSource={WPMeetingsTabledata}
          className="tracking-tight"
        />
      </ConfigProvider>
    </>
  );
};

const WalletsTablecolumns = [
  // Transaction ID Attribute
  {
    title: "Transaction ID",
    key: "transactionID",
    dataIndex: "transactionID",
    render: (_, record) => (
      <h1 className="text-[#212121]  text-[0.9125rem] font-extrabold leading-normal tracking-[-0.02813rem]">
        #{record.transactionID}
      </h1>
    ),
  },
  // Date Attribute
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, record) => (
      <h1 className="text-[#212121] text-[0.975rem] font-normal leading-normal tracking-[-0.02813rem]">
        {format(new Date(record.timeFrom), "EEE, LLL dd yyyy")}
      </h1>
    ),
  },
  //   Payment Channel Attribute
  {
    title: "Payment Channel",
    dataIndex: "paymentChannel",
    key: "paymentChannel",
    render: (_, record) => (
      <div className="flex items-center">
        {record.paymentChannel === "PayPal" ? (
          <>
            {PayPalIconSvg(20, 13)}
            <h1 className="text-[0.8125rem] font-[700] leading-normal tracking-[-0.02438rem] ml-2">
              {record.paymentChannel}
            </h1>
          </>
        ) : (
          <>
            {creditCardIconSvg(15, 12)}
            <h1 className="text-[0.8125rem] font-[700] leading-normal tracking-[-0.02438rem] ml-2">
              {record.paymentChannel}
            </h1>
          </>
        )}
      </div>
    ),
  },
  // Instrument Attribute
  {
    title: "Instrument",
    key: "instrument",
    dataIndex: "instrument",
    render: (_, record) => (
      <h1 className="text-[0.9375rem] font-[500] leading-normal tracking-[-0.02813rem]">
        {record.instrument}
      </h1>
    ),
  },
  // Amount Attribute
  {
    title: "Amount",
    key: "amount",
    dataIndex: "amount",
    render: (_, record) => (
      <h1 className="text-[0.9375rem] font-[700] leading-normal tracking-[-0.02813rem]">
        ${record.amount}
      </h1>
    ),
  },
];

const WalletsTable = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSizeSM: 16,
              cellPaddingInlineSM: 24,
              headerColor: "rgb(0,0,0,0.6)",
            },
          },
        }}
      >
        <Table
          size="small"
          columns={WalletsTablecolumns}
          dataSource={WalletsTabledata}
          className="tracking-tight"
        />
      </ConfigProvider>
    </>
  );
};

export { MeetingsTable, WalletsTable };

function PayPalIconSvg(height, width) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 65">
        <path
          id="Vector"
          d="M11.7745 5.30204H1.20387C1.05167 5.30204 0.905703 5.24157 0.798082 5.13395C0.69046 5.02633 0.629999 4.88037 0.629999 4.72817C0.629999 4.57597 0.69046 4.43 0.798082 4.32238C0.905703 4.21476 1.05167 4.1543 1.20387 4.1543H11.7745C11.9267 4.1543 12.0727 4.21476 12.1803 4.32238C12.2879 4.43 12.3484 4.57597 12.3484 4.72817C12.3484 4.88037 12.2879 5.02633 12.1803 5.13395C12.0727 5.24157 11.9267 5.30204 11.7745 5.30204Z"
          fill="#546E7A"
        />
        <path
          id="Vector_2"
          d="M4.60309 8.70144C4.52772 8.70147 4.45307 8.68666 4.38343 8.65784C4.31378 8.62902 4.25049 8.58677 4.19717 8.53349L0.797956 5.13465C0.693421 5.02642 0.635578 4.88146 0.636885 4.73099C0.638193 4.58053 0.698546 4.43659 0.804946 4.33019C0.911346 4.22379 1.05528 4.16344 1.20575 4.16213C1.35621 4.16082 1.50117 4.21867 1.60941 4.3232L5.00863 7.7228C5.08878 7.80306 5.14335 7.90527 5.16546 8.01652C5.18756 8.12777 5.17619 8.24308 5.1328 8.34788C5.08941 8.45268 5.01593 8.54227 4.92165 8.60533C4.82737 8.6684 4.71652 8.70211 4.60309 8.70221V8.70144Z"
          fill="#546E7A"
        />
        <path
          id="Vector_3"
          d="M2.7931 3.71317C2.67959 3.71315 2.56864 3.67947 2.47428 3.61638C2.37992 3.5533 2.30638 3.46365 2.26297 3.35877C2.21957 3.2539 2.20823 3.1385 2.23041 3.02718C2.25259 2.91587 2.30728 2.81362 2.38756 2.73339L4.19716 0.923787C4.3054 0.819252 4.45036 0.761409 4.60082 0.762717C4.75129 0.764025 4.89522 0.824378 5.00162 0.930778C5.10802 1.03718 5.16838 1.18111 5.16968 1.33158C5.17099 1.48204 5.11315 1.62701 5.00861 1.73524L3.19901 3.54522C3.1457 3.5985 3.08241 3.64076 3.01276 3.66958C2.94311 3.69839 2.86847 3.71321 2.7931 3.71317Z"
          fill="#FFCF4A"
        />
        <path
          id="Vector_4"
          d="M19.4261 9.345H8.85546C8.70326 9.345 8.5573 9.28454 8.44967 9.17692C8.34205 9.0693 8.28159 8.92333 8.28159 8.77113C8.28159 8.61894 8.34205 8.47297 8.44967 8.36535C8.5573 8.25773 8.70326 8.19727 8.85546 8.19727H19.4261C19.5783 8.19727 19.7243 8.25773 19.8319 8.36535C19.9395 8.47297 20 8.61894 20 8.77113C20 8.92333 19.9395 9.0693 19.8319 9.17692C19.7243 9.28454 19.5783 9.345 19.4261 9.345Z"
          fill="#546E7A"
        />
        <path
          id="Vector_5"
          d="M19.4261 9.34522C19.274 9.34518 19.1282 9.28478 19.0206 9.17726L15.6214 5.77766C15.5666 5.72472 15.5228 5.6614 15.4928 5.59139C15.4627 5.52137 15.4469 5.44607 15.4462 5.36987C15.4455 5.29367 15.4601 5.21811 15.4889 5.14758C15.5178 5.07705 15.5604 5.01298 15.6143 4.9591C15.6681 4.90522 15.7322 4.8626 15.8027 4.83375C15.8733 4.8049 15.9488 4.79038 16.025 4.79104C16.1012 4.7917 16.1765 4.80753 16.2465 4.83761C16.3166 4.86768 16.3799 4.9114 16.4328 4.96621L19.832 8.36581C19.9122 8.44609 19.9668 8.54833 19.9889 8.65962C20.011 8.77091 19.9996 8.88625 19.9561 8.99107C19.9127 9.09588 19.8392 9.18546 19.7448 9.2485C19.6505 9.31154 19.5396 9.34519 19.4261 9.34522Z"
          fill="#546E7A"
        />
        <path
          id="Vector_6"
          d="M16.0269 12.7438C15.9134 12.7438 15.8024 12.7101 15.7081 12.6471C15.6137 12.584 15.5402 12.4943 15.4968 12.3894C15.4534 12.2846 15.442 12.1692 15.4642 12.0579C15.4864 11.9465 15.5411 11.8443 15.6214 11.7641L17.431 9.95408C17.5387 9.84647 17.6847 9.78606 17.837 9.78613C17.9892 9.7862 18.1352 9.84675 18.2428 9.95446C18.3504 10.0622 18.4108 10.2082 18.4108 10.3605C18.4107 10.5127 18.3501 10.6587 18.2424 10.7663L16.4328 12.5759C16.3795 12.6292 16.3162 12.6714 16.2466 12.7002C16.1769 12.7291 16.1023 12.7439 16.0269 12.7438Z"
          fill="#FFCF4A"
        />
      </g>
    </svg>
  );
}

function creditCardIconSvg(height, width) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M12.4366 0H2.5C1.8372 0.000793929 1.20178 0.264441 0.73311 0.73311C0.264441 1.20178 0.000793929 1.8372 0 2.5V9.0078C0.000793929 9.6706 0.264441 10.306 0.73311 10.7747C1.20178 11.2434 1.8372 11.507 2.5 11.5078H12.4366C13.0994 11.507 13.7348 11.2434 14.2035 10.7747C14.6722 10.306 14.9358 9.6706 14.9366 9.0078V2.5C14.9358 1.8372 14.6722 1.20178 14.2035 0.73311C13.7348 0.264441 13.0994 0.000793929 12.4366 0ZM2.5 1H12.4366C12.8343 1.00042 13.2156 1.1586 13.4968 1.43981C13.778 1.72102 13.9362 2.10231 13.9366 2.5V3.1558H1V2.5C1.00042 2.10231 1.15859 1.72102 1.43981 1.43981C1.72102 1.1586 2.10231 1.00042 2.5 1ZM12.4366 10.5078H2.5C2.10231 10.5074 1.72102 10.3492 1.43981 10.068C1.15859 9.78678 1.00042 9.40549 1 9.0078V4.1558H13.9366V9.0078C13.9362 9.40549 13.778 9.78678 13.4968 10.068C13.2156 10.3492 12.8343 10.5074 12.4366 10.5078ZM12.5699 8.1694C12.5699 8.30201 12.5172 8.42918 12.4235 8.52295C12.3297 8.61672 12.2025 8.6694 12.0699 8.6694H10.8711C10.7385 8.6694 10.6113 8.61672 10.5175 8.52295C10.4238 8.42918 10.3711 8.30201 10.3711 8.1694C10.3711 8.03679 10.4238 7.90962 10.5175 7.81585C10.6113 7.72208 10.7385 7.6694 10.8711 7.6694H12.0699C12.2025 7.6694 12.3297 7.72208 12.4235 7.81585C12.5172 7.90962 12.5699 8.03679 12.5699 8.1694Z"
        fill="black"
      />
    </svg>
  );
}
