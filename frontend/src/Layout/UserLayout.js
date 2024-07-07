import React from 'react'

import UserDashLayout from "../Components/Partials/UserDashboardLayout";

const UserLayout = ({ children }) => {
    return (
        <UserDashLayout>
            <div className="tracking-tight">{children}</div>
        </UserDashLayout>
    )
}

export default UserLayout