import React from "react";

import UserLayout from "../../../Layout/UserLayout";
import UserMeetingsAndAppointments from "../../../Components/User/UserSettings/UserMeetingsAndAppointments";

const UserMeetingsAndAppointmentsPage = () => {
  return (
    <UserLayout>
      <UserMeetingsAndAppointments />
    </UserLayout>
  );
};

export default UserMeetingsAndAppointmentsPage;
