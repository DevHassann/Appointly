import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Avatar, ConfigProvider, Space, Table } from "antd";
import { format } from "date-fns";

import { getUserMeetings } from "../../../Store/Actions/meeting";
import { getAnySeller } from "../../../Store/Actions/seller";

import { CancelMeetingModalBox, JoinMeetingModalBox } from "../../ModalBoxes";
import Loader from "../../Loader";
import EmptyDataLoader from "../../EmptyDataLoader";

const MeetingsTable = () => {
  const { user } = useSelector((state) => state.user);
  const { userMeetings } = useSelector((state) => state.meeting);

  const dispatch = useDispatch();
  const userId = user?._id;
  const [meetingTableData, setMeetingTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserMeetings(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userMeetings.length > 0) {
      const fetchSellerData = async () => {
        const sellerIds = userMeetings.map((meeting) => meeting.sellerId);

        try {
          const sellersData = await Promise.all(
            sellerIds.map((sellerId) => dispatch(getAnySeller(sellerId)))
          );

          const updatedMeetingTableData = userMeetings.map((meeting, index) => {
            const sellerData = sellersData[index].payload;

            return {
              key: meeting._id,
              with: `${sellerData.firstName} ${sellerData.lastName}`,
              profileName: sellerData.professionalSkill,
              profileImg: sellerData.professionalImage?.url,
              day: meeting.meetingDay,
              timeFrom: meeting.meetingStartTime,
              timeTo: meeting.meetingEndTime,
              amount: sellerData.price,
              createdAt: meeting.createdAt,
              formattedDate: format(
                new Date(meeting.createdAt),
                "LLL dd, yyyy"
              ),
              zoomLink: meeting.zoomMeetingLink,
            };
          });

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
  }, [userMeetings, dispatch]);

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
              {record.profileName}
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
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (_, record) => <div className="text-lg">${record.amount}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={4} direction="vertical">
          <JoinMeetingModalBox
            sellerName={record.with}
            dataLink={record.zoomLink}
          />
          <CancelMeetingModalBox />
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (userMeetings.length === 0) {
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

export default MeetingsTable;
