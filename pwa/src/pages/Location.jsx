import React, { useEffect, useState } from "react";
//import $ from "jquery";
import Cardskeleton2 from "../pages/Skeleton2";
import { Link, useHistory } from "react-router-dom";
import MainImg from "../assets/img/signin1.png";
import Icon1 from "../assets/img/Icons/Icons/Icon-01.png";
import phoneimage from "../assets/img/phoneimage.png";
import Icon2 from "../assets/img/Icons/Icons/Icon-06.png";

import Icon3 from "../assets/img/Icons/Icons/Icon-02.png";
import Icon4 from "../assets/img/Icons/Icons/Icon-07.png";

import Icon5 from "../assets/img/Icons/Icons/Icon-03.png";
import Icon6 from "../assets/img/Icons/Icons/Icon-08.png";

import Icon7 from "../assets/img/Icons/Icons/Icon-04.png";
import Icon8 from "../assets/img/Icons/Icons/Icon-09.png";

import Icon9 from "../assets/img/Icons/Icons/Icon-05.png";
import Icon10 from "../assets/img/Icons/Icons/Icon-10.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Footer from "../pages/footer";
import RedL from "../assets/img/Icons/Icons/red.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import Sidebar from "./Sidebar";
import { Url } from "./url";

const Location = () => {
  const [storename, setStoreName] = useState("");
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const history = useHistory();
  const short_link = Url();

  useEffect(() => {
    fetch(`${short_link}/getclientstore2`, {
      //    fetch('/getclientstore2',{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data i get is ", data);
        setStoreName(data);
      });
  }, []);

  function move(item) {
    console.log("hello");
    history.push({ pathname: "/locationdetail", state: item });
    // history.push({pathname:"/demo2",state:item})
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflow: "auto" }}
      >
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              {localStorage.getItem("Shopping_token") ? (
                <Sidebar />
              ) : (
                <div className="text-center prev-icon" style={{ width: "100%" }}>
                  <Link to="/" className="text-decoration-none">
                    <img
                      src={prev}
                      width="30%"
                      alt=""
                      className="backOrHomebutton"
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Emplacements" : "Locations"}
              </h5>
            </div>
          </div>

          <div className="row page17-p" style={{ overflow: "auto" }}>
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />

              <div className=" row px-3  d-none">
                <div className="col-sm-11-LSB">
                  <div
                    className="bg-white input-group location-input-group  input-group-L mb-3"
                    style={{ borderRadius: "0px", width: "118%" }}
                  >
                    <div className=" input-group-prepend ">
                      <span
                        className="input-group-text border-right-0"
                        id="basic-addon1"
                        style={{ borderRadius: "0px" }}
                      >
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </span>
                      {/* <input type="text" class="form-control border-left-0 " placeholder="Zip code or City" aria-label="Username" aria-describedby="basic-addon1" />       */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          FrenchLang === "true"
                            ? "Entrez le mot-clé pour rechercher"
                            : "Enter keyword to search"
                        }
                        aria-describedby="basic-addon2"
                      />
                    </div>
                    {/* <input type="text" class="form-control border-left-0 " placeholder="Zip code or City" aria-label="Username" aria-describedby="basic-addon1" /> */}
                  </div>
                </div>

                <div className="col-sm-1-LSB" style={{ marginTop: "1%" }}>
                  <img
                    src={RedL}
                    alt=""
                    className="RedL"
                    style={{ position: "relative", right: "14%" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {!storename ? (
                    <>
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                    </>
                  ) : (
                    storename.message.GetClientStores?.map((item, i) => {
                      return (
                        <div
                          className="bg-light rounded-lg p-3 L-card mt-2"
                          key={i}
                        >
                          <h5 className="fw500 mb-1 location-title">
                            {item.AddressLine1}
                          </h5>
                          <p className="mb-1">
                            <small className="mb-0 fw500 location-title">
                              {item.City}, {item.StateName}, {item.ZipCode}
                            </small>
                          </p>
                          <div style={{ display: "flex", margin: "2% 0%" }}>
                            {/* <img src={phoneimage} width="20px" style={{marginRight:"3%"}}/> */}
                            <p style={{ margin: "0 1% 0 0" }}>
                              {FrenchLang === "true"
                                ? "Téléphone :"
                                : "Phone :"}
                            </p>
                            <p
                              className="fw500 mb-0 phone-L"
                              style={{ color: "blue" }}
                            >
                              ({item.StorePhoneNumber.substr(0, 3)}){" "}
                              {item.StorePhoneNumber.substr(3, 3)}-
                              {item.StorePhoneNumber.substr(6, 4)}
                            </p>
                            {localStorage.getItem("Shopping_token") && (
                              <img
                                onClick={() => {
                                  move(item);
                                }}
                                alt=""
                                src={prev}
                                style={{
                                  width: "10px",
                                  height: "20px",
                                  position: "absolute",
                                  right: "30px",
                                  transform: "rotateY(180deg)",
                                }}
                              />
                            )}
                          </div>
                          <span>
                            {FrenchLang === "true" ? "Heures" : "Hours"}
                          </span>
                          <p style={{ margin: "0" }}>{item.StoreTimings}</p>
                        </div>
                      );
                    })
                  )}
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

export default Location;
