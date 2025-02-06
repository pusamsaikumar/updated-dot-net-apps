import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Sidebar from "./Sidebar"; //import $ from "jquery";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MainImg from "../assets/img/reset15.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import { Url } from "./url";

const EmailPin = () => {
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const history = useHistory();
  const [state, setState] = useState(
    localStorage.getItem("Shopping_token")
      ? JSON.parse(localStorage.getItem("data")).username
      : ""
  );
  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])

  function sendpin() {
    if (!state) {
      var a = document.getElementById("exampleInputEmail1");
      a.style.backgroundColor = "#ead2d2";
      a.style.transition = "all 1s";
      setTimeout(() => {
        a.style.backgroundColor = "white";
      }, 1500);
      return;
    }
    fetch(`${short_link}/ForgotPasswordV2`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message.ErrorMessage.ErrorCode === 1) {
          M.toast({
            html:
              FrenchLang === "true"
                ? "Le nouveau mot de passe est envoyé par e-mail à votre adresse e-mail, veuillez vérifier votre e-mail"
                : "New Password is emailed to your Email Address,   Please Check your E-mail",
            classes: "#43a047 green darken-1",
          });
          history.push("/Signin2");
        }
        if (data.message.ErrorMessage.ErrorCode === -1) {
          M.toast({
            html: data.message.ErrorMessage.ErrorDetails,
            classes: "#c62828 red darken-3",
          });
          history.push("/Signin2");
        }
      })
      .catch((err) => {
        console.log("err is arise in sendpin()");
      });
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
      <div
        className="email-pin-wrapper"
        style={{ overflow: "auto", borderRadius: "0px" }}
      >
        <div className="container page17 height-page-wrapper">
          <div className={`row mt-3 ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/Forgot">
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Definir un nouveau mot de passe"
                  : "Set New Password"}
              </h5>
            </div>
          </div>

          <div style={{ margin: "10% 0 2%" }}>
            <center>
              <img src={MainImg} style={{ height: "30vh" }} />
            </center>
          </div>
          <div className="email-pin-wrap  p-4 mt-0">
            <div className="row ">
              <div className="col-sm-12">
                <p className="text-center bg-light-st pin2-sm notification-text">
                  {FrenchLang === "true"
                    ? "Votre mot de passe sera envoyé à votre adresse e-mail associée à Votre compte. Veuillez entrer l'adresse e-mail et cliquez sur EnvoyerMot de passe."
                    : "Your Password will be sent to your email address associated with your account. Kindly enter the email address and click on Request Temporary Password."}
                </p>
                <div className="">
                  <form className="reset-form mt-5 ">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="lable-title">
                        {FrenchLang === "true"
                          ? "Entrer l'adresse e-mail"
                          : "Enter Email Address"}{" "}
                      </label>
                      <input
                        type="email"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="sign-in-button bottom-btn-font">
                      <button
                        onClick={sendpin}
                        type="button"
                        className="btn theme-btn w-100 fw100 mt-4 py-2"
                      >
                        {FrenchLang === "true"
                          ? "Envoyer le mot de passe"
                          : "Request Temporary Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPin;
