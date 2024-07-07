import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SellerDetail from "../../../Components/Seller/SellerDetailPage/SellerDetail";
import NavbarMain from "../../../Components/Partials/NavbarMain";
import Footer from "../../../Components/Partials/Footer";
import Loader from "../../../Components/Loader";

const SellerDetailPage = () => {
  const { allSellers } = useSelector((state) => state.seller);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allSellers && allSellers.find((i) => i._id === id);
    setData(data);
  }, [allSellers]);

  return (
    <>
      {data == null ? (
        <>
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        </>
      ) : (
        <>
          <NavbarMain />
          <SellerDetail data={data} />
          <Footer />
        </>
      )}
    </>
  );
};

export default SellerDetailPage;
