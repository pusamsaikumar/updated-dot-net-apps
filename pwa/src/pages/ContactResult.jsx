import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Sidebar from "./Sidebar"; //import $ from "jquery";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import MainImg from "../assets/img/reset15.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import { Url } from "./url";

const ContactResult = () => {
  const [state, setstate] = useState();
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const short_link = Url();
  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    // fetch(`${short_link}/contactus`,{
    fetch(`${short_link}/getlink`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientappname: process.env.REACT_APP_CLIENT_NAME,
        clientid: process.env.REACT_APP_CLIENT_ID,
        storegroupid: process.env.REACT_APP_STORE_GROUP_ID,
        storeid: localStorage.getItem("storeId"),
        subdomain: process.env.REACT_APP_SUBDOMAIN,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data of getclientstore is ", data);
        if (data.message.ErrorMessage.ErrorCode === 1) {
          setstate(data);
        } else {
          setstate("");
        }
      });
  }, []);

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      if (!localStorage.getItem("Guest_token")) history.push("/Signin2");
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {check_the_user()}
      <div
        className="bg-white bg-bottom-round"
        style={{ overflow: "auto", height: "100vh", borderRadius: "0px" }}
      >
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/ContactUs">
                <img src={prev} width="30%" alt="" className="backOrHomebutton"/>
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Contactez-nous" : "Contact Us"}
              </h5>
            </div>
          </div>

          <div style={{ margin: "10%" }}>
            {}
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? (
                <img src={state.message.CompanySettings.ClientLogo} />
              ) : (
                ""
              )}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.WelcomeTextHeading : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.AddressLine1 : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.AddressLine2 : ""}
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="text-center" style={{ marginTop: "2%" }}>
                {state ? state.message.CompanySettings.City : ""}
              </p>
              <p
                className="text-center"
                style={{ marginTop: "2%", marginLeft: "5px" }}
              >
                {state ? state.message.CompanySettings.State : ""}
              </p>
              <p
                className="text-center"
                style={{ marginTop: "2%", marginLeft: "6px" }}
              >
                {state ? state.message.CompanySettings.ZipCode : ""}
              </p>
            </div>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.StorePhoneNumber : ""}
            </p>
            <br />
            <br />
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.StoreEmail : ""}
            </p>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.ClientProfile : ""}
            </p>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.StoreTimingLable : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.StoreTimings : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.CompanySettings.SupportEmail : ""}
            </p>
            <br />
            <p className="text-center" style={{ marginTop: "2%" }}>
              <a href={state ? state.message.CompanySettings.WebSiteURL : ""}>
                {state ? state.message.CompanySettings.WebSiteURL : ""}
              </a>
            </p>
            <div>
              {!state ? (
                <>
                  <div style={{ display: "block", width: "100%" }}>
                    <p className="text-center" style={{ marginTop: "2%" }}>
                      {FrenchLang === "true"
                        ? "Coordonnées manquantes.."
                        : "Contact Info missing.."}
                    </p>
                  </div>
                </>
              ) : (
                state.message.SocialMediaSettings.map((item, i) => {
                  if (i !== 2 && item.ImageURL !== "" && item.Value !== "")
                    // if(i!=2 && item.ImageURL!="")
                    return (
                      <NavLink to={item.Value} key={i}>
                        <div
                          key={i}
                          style={{ width: "33%", display: "inline-block" }}
                        >
                          <center>
                            <img src={item.ImageURL} alt="" />
                            <p style={{ color: "black" }}>{item.Title}</p>
                          </center>
                        </div>
                      </NavLink>
                    );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactResult;
