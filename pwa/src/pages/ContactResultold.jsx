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
  const short_link = Url();
  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    // fetch(`${short_link}/contactus`,{
    fetch(`${short_link}/getclientgeneralinfo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        subdomain: localStorage.getItem("subdomain"),
        // ClientAppName:"String content",
        // ClientId:2147483647,
        // StoreGroupId:2147483647,
        // StoreId:2147483647
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data of getclientstore is ", data.message);
        setstate(data);
      });
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
        // style={{ overflow: "auto", height: "100vh", borderRadius: "0px" }}
      >
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/ContactUs">
                <img src={prev} width="30%" alt="" className="backOrHomebutton"/>
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">Contact Us</h5>
            </div>
          </div>

          <div style={{ margin: "10%" }}>
            {}
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? (
                <img src={state.message.ClientGeneralInfo.ClientLogo} />
              ) : (
                ""
              )}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.WelcomeTextHeading : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.AddressLine1 : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.AddressLine2 : ""}
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="text-center" style={{ marginTop: "2%" }}>
                {state ? state.message.ClientGeneralInfo.City : ""} ,
              </p>
              <p
                className="text-center"
                style={{ marginTop: "2%", marginLeft: "5px" }}
              >
                {state ? state.message.ClientGeneralInfo.State : ""}
              </p>
              <p
                className="text-center"
                style={{ marginTop: "2%", marginLeft: "6px" }}
              >
                {state ? state.message.ClientGeneralInfo.ZipCode : ""}
              </p>
            </div>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.StorePhoneNumber : ""}
            </p>
            <br />
            <br />
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.StoreEmail : ""}
            </p>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.ClientProfile : ""}
            </p>

            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.StoreTimingLable : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.StoreTimings : ""}
            </p>
            <p className="text-center" style={{ marginTop: "2%" }}>
              {state ? state.message.ClientGeneralInfo.SupportEmail : ""}
            </p>
            <br />
            <p className="text-center" style={{ marginTop: "2%" }}>
              <a href={state ? state.message.ClientGeneralInfo.WebSiteURL : ""}>
                {state ? state.message.ClientGeneralInfo.WebSiteURL : ""}
              </a>
            </p>
            <div>
              {!state ? (
                <></>
              ) : (
                state.message.SocialMediaSettings.map((item, i) => {
                  if (i != 2 && item.ImageURL != "" && item.Value != "")
                    // if(i!=2 && item.ImageURL!="")
                    return (
                      <NavLink to={item.Value} key={i}>
                        <div
                          key={i}
                          style={{ width: "33%", display: "inline-block" }}
                        >
                          <center>
                            <img src={item.ImageURL} />
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
