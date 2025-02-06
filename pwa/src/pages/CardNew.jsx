import React, { useEffect, useState } from "react";
//import $ from "jquery";

import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";

import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Footer from "../pages/footer";
import Sidebar from "./Sidebar";
import Cardskeleton2 from "../pages/Skeleton2";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import { Url } from "./url";

const Checkout = () => {
  const history = useHistory();
  const [name, setName] = React.useState();
  const [state, setState] = React.useState();
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [portercard, setPortercard] = React.useState("");

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/card`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("barcode is ", data.message.BarCodeUrl);
        localStorage.setItem(
          "menberNumber",
          JSON.stringify(data.message.MemberNumber)
        );
        localStorage.setItem("barcode", data.message.BarCodeUrl);
        setState(data);
        setName(JSON.parse(localStorage.getItem("data")).firstname);
      })
      .catch((err) => console.log("err is arise in card"));
  }, []);

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll < 25) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/getclientgeneralinfo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token ? token : process.env.REACT_APP_GUEST_TOKEN,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPortercard(data.message.ClientGeneralInfo.ClientLogo);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      {check_the_user()}
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center head-icon ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center prev-icon">
              {/* <p className="mb-0"><Link to="/" className="text-decoration-none"><img src={Barside} className="Barside" alt="" /></Link></p> */}
              <Sidebar />
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Carte" : "Card"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2 mb-5">
              <hr className="mt-2" />

              <div className="row text-center">
                <div className="col-sm-12">
                  <img
                    src={portercard}
                    alt=""
                    height={60}
                    width={50}
                    className="mt-4"
                  />
                  <p className="mb-1 mt-3">
                    <small className="fw600">
                      {!state ? <></> : state.message.MemberNumber}
                    </small>
                  </p>
                  <h5 className="text-danger fw600 mb-3">
                    {name ? name : "Username"}
                  </h5>
                  <p className="text-uppercase mb-1">
                    <small className="fw600">
                      {FrenchLang === "true"
                        ? "Scannez ce code-barres à la caisse"
                        : "Scan this barcode at checkout"}
                    </small>
                  </p>
                  <div>
                    {!state ? (
                      <Cardskeleton2 />
                    ) : (
                      <img
                        src={state.message.BarCodeUrl}
                        className="checkout-barcode-CN checkout-barcode-CN card-info"
                        alt=""
                      />
                    )}
                  </div>
                  <h6 className="text-dark fw600 mt-5">
                    {FrenchLang === "true" ? "Bravo!" : "Congrats!"}
                  </h6>

                  <h6 className="text-dark fw600">
                    {FrenchLang === "true"
                      ? "Vous avez économisé"
                      : "You have saved"}
                  </h6>
                  <div className="px-5">
                    <Link
                      to="/Register1"
                      type="button"
                      className="btn theme-btn fw100 mt-4 py-2"
                      style={{
                        fontSize: "17px",
                      }}
                    >
                      <h5 className="fw600">$100.00</h5>
                    </Link>
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
