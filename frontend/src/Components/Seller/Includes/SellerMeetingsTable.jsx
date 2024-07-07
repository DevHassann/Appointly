import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Avatar, ConfigProvider, Space, Table } from "antd";
import { format } from "date-fns";

import { getSellerMeetings } from "../../../Store/Actions/meeting";
import { getAnyUser } from "../../../Store/Actions/user";

import {
  SellerCancelMeetingModalBox,
  SellerJoinMeetingModalBox,
} from "../../ModalBoxes";
import Loader from "../../Loader";
import EmptyDataLoader from "../../EmptyDataLoader";

const SellerMeetingsTable = () => {
  const { seller } = useSelector((state) => state.seller);
  const { sellerMeetings } = useSelector((state) => state.meeting);

  const dispatch = useDispatch();
  const sellerId = seller?._id;
  const [meetingTableData, setMeetingTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSellerMeetings(sellerId));
  }, [dispatch, sellerId]);

  useEffect(() => {
    if (sellerMeetings.length > 0) {
      const fetchSellerData = async () => {
        const userIds = sellerMeetings.map((meeting) => meeting.userId);

        try {
          const usersData = await Promise.all(
            userIds.map((userId) => dispatch(getAnyUser(userId)))
          );

          const updatedMeetingTableData = sellerMeetings.map(
            (meeting, index) => {
              const userData = usersData[index].payload;

              return {
                key: meeting._id,
                with: userData.name,
                profileEmail: userData.email,
                profileImg: userData.profilePicture?.url,
                day: meeting.meetingDay,
                timeFrom: meeting.meetingStartTime,
                timeTo: meeting.meetingEndTime,
                createdAt: meeting.createdAt,
                formattedDate: format(
                  new Date(meeting.createdAt),
                  "LLL dd, yyyy"
                ),
                zoomLink: meeting.zoomMeetingLink,
              };
            }
          );

          const filteredMeetingTableData = updatedMeetingTableData.filter(
            (item) => item !== null
          );
          setMeetingTableData(filteredMeetingTableData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching seller data:", error);
          setLoading(false);
        }
      };

      fetchSellerData();
    }
  }, [sellerMeetings, dispatch]);

  // Customization
  const columns = [
    {
      title: "With",
      dataIndex: "with",
      key: "with",
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar size={45} src={record.profileImg} />
          <div className="ml-3">
            <div className="text-xl font-semibold leading-4">{record.with}</div>
            <div className="text-neutral-500 text-sm leading-3 mt-1">
              {record.profileEmail}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div>
          <h1 className="">{record.day}</h1>
          <h1 className="text-lg leading-4">{record.formattedDate}</h1>
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <h1 className="text-lg">
          {record.timeFrom} - {record.timeTo}
        </h1>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={4} direction="vertical">
          <SellerJoinMeetingModalBox
            sellerName={record.with}
            dataLink={record.zoomLink}
          />
          <SellerCancelMeetingModalBox />
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (sellerMeetings.length === 0) {
    return (
      <>
        <EmptyDataLoader />
      </>
    );
  }

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
          columns={columns}
          dataSource={meetingTableData}
          className="tracking-tight"
        />
      </ConfigProvider>
    </>
  );
};

export default SellerMeetingsTable;
