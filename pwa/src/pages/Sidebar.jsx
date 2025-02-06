import React, { useEffect, useState, useRef } from "react";

import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Sideprofile from "../assets/img/Icons/Icons/sideprofile-img.png";
import Icon1 from "../assets/img/Icons/Icons/Icon-11.png";
import Switch from "react-switch";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css";
import Icon2 from "../assets/img/Icons/Icons/Icon-12.png";
import Icon3 from "../assets/img/Icons/Icons/Icon-15.png";
import Home from "../assets/img/Icons/Icons/home.png";
import Icon4 from "../assets/img/Icons/Icons/Icon-13.png";
import Icon5 from "../assets/img/Icons/Icons/Icon-14.png";
import Icon6 from "../assets/img/Icons/Icons/Icon-16.png";
import Icon7 from "../assets/img/Icons/Icons/msg1.png";
import Icon8 from "../assets/img/Icons/Icons/SL.png";
import Icon9 from "../assets/img/Icons/Icons/card.png";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Dummy from "../assets/img/dummy.png";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
// import Barside from '../assets/img/Icons/Icons/Icon-17.png'

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Footer from "./footer";
import { Url } from "./url";

const Sidebar = () => {
  const short_link = Url();
  const history = useHistory();
  const [active, setActive] = React.useState("");
  const [barcode, setbarcode] = React.useState(
    localStorage.getItem("barcode")
      ? localStorage.getItem("barcode")
      : undefined
  );
  const [portercard, setPortercard] = React.useState("");

  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [lang, setLang] = useState({
    checked: localStorage.getItem("FrenchLanguage")
      ? localStorage.getItem("FrenchLanguage")
      : "",
  });

  const sidebarRef = useRef(null);
  useEffect(() => {
    // Close sidebar if clicked outside
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActive("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // useEffect(()=>{                                                     //DONT REMOVE THIS COMMENT                        //DONT REMOVE THIS COMMENT            //\\DONT REMOVE THIS COMMENT
  //     if(!localStorage.getItem("barcode"))                             //DONT REMOVE THIS COMMENT                      //DONT REMOVE THIS COMMENT            //  \\DONT REMOVE THIS COMMENT
  //     {                                                                 //DONT REMOVE THIS COMMENT                    //DONT REMOVE THIS COMMENT            //    \\DONT REMOVE THIS COMMENT
  //         fetch(`${short_link}/card`,{     //DONT REMOVE THIS COMMENT                  //DONT REMOVE THIS COMMENT            //      \\DONT REMOVE THIS COMMENT
  //         method:"get",                                                   //DONT REMOVE THIS COMMENT                //DONT REMOVE THIS COMMENT            //        \\DONT REMOVE THIS COMMENT
  //         headers:{                                                        //DONT REMOVE THIS COMMENT              //DONT REMOVE THIS COMMENT            //          \\DONT REMOVE THIS COMMENT
  //             "Content-Type":"application/json"                             //DONT REMOVE THIS COMMENT            //DONT REMOVE THIS COMMENT            //            \\DONT REMOVE THIS COMMENT
  //         }                                                                  //DONT REMOVE THIS COMMENT          //DONT REMOVE THIS COMMENT            //              \\DONT REMOVE THIS COMMENT
  //     }).then(res=>res.json())                                                //DONT REMOVE THIS COMMENT        //DONT REMOVE THIS COMMENT            //                \\DONT REMOVE THIS COMMENT
  //     .then(data=>{                                                            //DONT REMOVE THIS COMMENT      //DONT REMOVE THIS COMMENT
  //         console.log(data);                                                   //DONT REMOVE THIS COMMENT      \\DONT REMOVE THIS COMMENT
  //         console.log("barcode is ",data.message.BarCodeUrl);                 //DONT REMOVE THIS COMMENT        \\DONT REMOVE THIS COMMENT
  //         localStorage.setItem("barcode",data.message.BarCodeUrl);           //DONT REMOVE THIS COMMENT          \\DONT REMOVE THIS COMMENT
  //         setbarcode(data.message.BarCodeUrl)                               //DONT REMOVE THIS COMMENT            \\DONT REMOVE THIS COMMENT
  //     })                                                                   //DONT REMOVE THIS COMMENT              \\DONT REMOVE THIS COMMENT
  //     .catch(err=>console.log("err is arise in card"))                    //DONT REMOVE THIS COMMENT                \\DONT REMOVE THIS COMMENT
  //     }                                                                  //DONT REMOVE THIS COMMENT                  \\DONT REMOVE THIS COMMENT
  // },[])
  //DONT REMOVE THIS COMMENT                    \\DONT REMOVE THIS COMMENT
  useEffect(() => {
    setLang((prev) => {
      return {
        ...prev,
        checked:
          localStorage.getItem("FrenchLanguage") === "true" ? true : false,
      };
    });
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/getclientgeneralinfo`, {
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
        setPortercard(data.message?.ClientGeneralInfo?.ClientLogo);
      });
  }, []);

  return (
    <div>
      <div className="main">
        <div className="header-top">
          <button
            onClick={() => {
              setActive("open");
            }}
            className="button-nav"
          >
            <img
              style={{ width: "30px" }}
              src={Barside}
              className="Barside"
              alt=""
            />
          </button>
        </div>

        {/* <div className="navigation" id="navigation-demo" style={{width:"83%"}}> */}
        <div
          ref={sidebarRef}
          className={`navigation ${active}`}
          id="navigation-demo"
          style={{ height: "auto" }}
        >
          <nav>
            <div className="bg-light p-2 nav-top-wrapper">
              <div className="navigation-button nav-close-btn">
                <button
                  onClick={() => {
                    setActive("");
                    window.location.reload();
                  }}
                  className="button-nav"
                >
                  <i
                    className="fa  fa-times"
                    style={{ fontSize: "24px", fontWeight: "400" }}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              <div className="text-left d-flex align-items-center justify-content-center">
                {localStorage.getItem("Shopping_token") ? (
                  <img
                    src={portercard ? portercard : Dummy}
                    className="sidepanel-sidebar "
                    alt=""
                    style={{
                      width: "auto",
                      height: "70px",
                      borderRadius: "0px",
                    }}
                  />
                ) : (
                  <img
                    src={Sideprofile}
                    className="sidepanel-sidebar "
                    alt=""
                  />
                )}
                {/* <p className="font-weight-bold mt-2">User Name</p> */}
              </div>
              {localStorage.subdomain === "carrefourmarket" && (
                <p
                  className="user-info"
                  style={{
                    color: "black",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <label
                      htmlFor="material-switch"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4 style={{ marginRight: "10px", fontStyle: "normal" }}>
                        EN
                      </h4>
                      <Switch
                        checked={lang.checked}
                        onChange={(checked) => {
                          localStorage.setItem("FrenchLanguage", checked);
                          setLang({ checked });
                        }}
                        onColor="#fa8072"
                        onHandleColor="#FF0000"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                      />
                      <h4 style={{ marginLeft: "10px", fontStyle: "normal" }}>
                        FR
                      </h4>
                    </label>
                  </div>
                </p>
              )}
            </div>
            <div style={{ backgroundColor: "white" }}>
              <ul
                className="list-style-none side-bar-nav"
                style={{ display: "grid", textAlign: "initial" }}
              >
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Home}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Maison" : "Home"}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/Coupons");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon1}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Bons de réduction" : "Coupons"}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/WeeklyAd");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon2}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true"
                      ? "Annonce hebdomadaire"
                      : "Weekly Ad"}
                  </Link>
                </li> */}
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/Reward");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon5}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Récompenses" : "Rewards"}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/cardinfo");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon9}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Carte" : "Card"}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/List");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon8}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true"
                      ? "Coupons coupés"
                      : "Clipped Coupons"}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/Messages");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon7}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    Messages
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/Location");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon3}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Emplacements" : "Locations"}
                  </Link>
                </li> */}
                <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/Profile");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon4}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true" ? "Profil" : "Profile"}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => {
                      setActive("");
                      history.push("/ContactUs");
                    }}
                  >
                    <img
                      style={{ width: "34px", height: "34px" }}
                      src={Icon6}
                      alt=""
                      className="sidepanel-texts-img"
                    />
                    {FrenchLang === "true"
                      ? "Contactez-nous et mentions légales"
                      : "Contact Us & Legal"}
                  </Link>
                </li> */}
                {!localStorage.getItem("Shopping_token") ? (
                  <p style={{ display: "none" }}>
                    {FrenchLang === "true" ? "se déconnecter" : "Signout"}{" "}
                  </p>
                ) : (
                  <li>
                    <Link
                      onClick={() => {
                        localStorage.removeItem("data");
                        localStorage.removeItem("Shopping_token");
                        localStorage.removeItem("menberNumber");
                        localStorage.removeItem("barcode");
                        localStorage.removeItem("photo");
                        localStorage.removeItem("customerid");
                        localStorage.removeItem("add");
                        history.push("/");
                      }}
                    >
                      <img
                        style={{
                          opacity: "0.68",
                          width: "25px",
                          height: "25px",
                          marginLeft: "3%",
                        }}
                        src={Icon10}
                        alt=""
                        className="sidepanel-texts-img"
                      />
                      {FrenchLang === "true" ? "se déconnecter" : "Signout"}{" "}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
