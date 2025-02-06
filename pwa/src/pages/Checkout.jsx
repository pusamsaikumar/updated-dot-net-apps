import React, { useEffect } from "react";
//import $ from "jquery";

import { Link } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";

import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Footer from "../pages/footer";
const Checkout = () => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])

  return (
    <div>
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className="row mt-3 mb-2 align-items-center">
            <div className="text-center prev-icon">
              <p className="mb-0">
                <Link to="/" className="text-decoration-none">
                  <img src={Barside} className="Barside" alt="" />
                </Link>
              </p>
            </div>
            <div className="col-sm-11-my17 text-center ">
              <h5 className=" signin1-h1  mb-0">
                {FrenchLang === "true" ? "Vérifier" : "Checkout"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />

              <div className="row px-4 " style={{ marginTop: "40%" }}>
                <div className="col-sm-12 text-center">
                  <h2 className="text-red my-3">
                    {FrenchLang === "true" ? "MEMBRE" : "MEMBER"} #:5887456
                  </h2>
                  <div>
                    <img src={Barcodes} className="checkout-barcode" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
