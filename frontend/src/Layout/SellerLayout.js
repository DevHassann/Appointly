import React from 'react'

import SellerDashLayout from "../Components/Partials/SellerDashLayout";

const SellerLayout = ({ children }) => {
    return (
        <SellerDashLayout>
            <div className="tracking-tight">{children}</div>
        </SellerDashLayout>
    )
}

export default SellerLayout