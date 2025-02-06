import React, { useState, useEffect } from "react";
import M from "materialize-css";
//import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import MainImg from "../assets/img/signin2.png";
import DealofTheWeek from "../assets/img/dealoftheweek.png";
import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";

import { Url } from "./url";
import "../my.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Signin2 = () => {
  const short_link = Url();
  const history = useHistory();
  const [portercard, setPortercard] = React.useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [state, setState] = useState(false);
  const [password, setPassword] = useState("");
  localStorage.setItem("subdomain", process.env.REACT_APP_SUBDOMAIN);
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = React.createRef();
  const your_recaptcha_site_key = "6LfuSe0UAAAAAPpN6U1CpCIDQm3dV9SWIkrOX0Iv";

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])
  var flag = 0;
  function handledata(e) {
    if (flag === 0) {
      e.preventDefault();
      if (!phoneNumber) {
        M.toast({
          html: "Please Enter the Phone Number",
          classes: "#c62828 red darken-3",
        });
        var a = document.getElementById("exampleInputEmail1");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1500);
        return;
      }
      if (phoneNumber && phoneNumber.length < 10) {
        M.toast({
          html: "Please Enter the valid Phone Number",
          classes: "#c62828 red darken-3",
        });
        var a = document.getElementById("exampleInputEmail1");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1500);
        return;
      }

      if (!password) {
        M.toast({
          html: "Please Enter the password",
          classes: "#c62828 red darken-3",
        });
        var a = document.getElementById("exampleInputPassword");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1000);
        return;
      }

      if (!recaptchaValue) {
        M.toast({
          html: "The captcha field is required.",
          classes: "#c62828 red darken-3",
        });
        var a = document.getElementById("exampleInputPassword");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1000);
        return;
      }
      //we set the value of flag is 1 now sign in button is disabled
      flag = 1;

      // try{
      //  const res = await fetch(`${short_link}/signin`,{
      fetch(
        //`${short_link}/signin`,
        `${process.env.REACT_APP_LOGIN_BACKEND_MAIN_URL}/LogInWithPhoneNumber`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": `${short_link}`,
            domainname: process.env.REACT_APP_SUBDOMAIN,
          },
          body: JSON.stringify({
            // phoneNumber,
            // password,
            // subdomain: localStorage.getItem("subdomain"),

            CustomerId: 1,
            DeviceId: 1,
            DeviceInfo: "",
            DeviceRegistrationId: "",
            MobileModel: "",
            MobileNumber: phoneNumber,
            MobileOS: "",
            MobileOSVersion: "",
            Password: password,
            UserName: "",
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //const data = await res.json();
          // console.log(data);
          // console.log("client store ID is = ", data.ErrorMesasge.ErrorCode);
          // console.log(data.UserToken);

          //after getting a data we set the flag = 0;
          flag = 0;

          if (data.ErrorMesasge.ErrorCode === 1) {
            localStorage.setItem("photo", data.iPhoneHomeImage);
            localStorage.setItem("Shopping_token", data.UserToken);
            localStorage.setItem("customerid", data.CustomerId);
            localStorage.setItem("userDetailId", data.UserDetailId);
            localStorage.setItem(
              "data",
              JSON.stringify({
                firstname: data.FirstName,
                lastname: data.LastName,
                zipcode: data.ZipCode,
                mobilenumber: data.MobileNumber,
                username: data.Username,
                store: data.ClientStoreName,
                storeid: data.ClientStoreId,
              })
            );

            if (data.ClientStoreId > 0) {
              M.toast({
                html:
                  FrenchLang === "true"
                    ? "Connexion réussie, veuillez patienter pendant le chargement de la page..."
                    : "Login successful, please wait while loading page...",
                classes: "#43a047 green darken-1",
              });
              history.push("/Coupons");
            }
          } else {
            M.toast({
              html: data.ErrorMesasge.ErrorDetails,
              classes: "#c62828 red darken-3",
            });
            return;
          }
          //}
        })
        .catch((err) => {
          flag = 0;
          console.log("error is coming ... ");
          M.toast({
            html:
              FrenchLang === "true"
                ? "Les informations d'identification invalides"
                : "Invalid Credentials",
            classes: "#c62828 red darken-3",
          });
          console.log(err);
        });
    }
  }

  function check_user() {
    if (localStorage.getItem("Shopping_token")) {
      history.push("/Coupons");
    }
  }

  function fun() {
    console.log("hello");
    if (!state) {
      document.getElementById("exampleCheck1").checked = true;
      setState(true);
    } else {
      document.getElementById("exampleCheck1").checked = false;
      setState(false);
    }
  }

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

  const onChangeReCaptcha = (value) => {
    setRecaptchaValue(value);
    setCaptchaError("");
  };

  return (
    <div>
      {check_user()}
      <div className="container" style={{ zIndex: "-1" }}>
        <div className="sign-in-wrapper">
          <div
            className={`col-sm-12 text-center sign-in-image ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            {/* <img src={MainImgSmall} alt="" srcset="" className="MainImgSmall-s1 mt-3" height={"38px"}/>
                        <img src={MainImg} alt="" srcset="" className="MainImg-s1 " /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="text-center prev-icon">
                <Link to="/" className="text-decoration-none">
                  <img
                    src={prev}
                    width="30%"
                    alt=""
                    className="backOrHomebutton"
                  />
                </Link>
              </div>
              <img
                src={portercard}
                alt=""
                className="MainImgSmall-s1 mt-3 mb-4"
                height="15%"
                style={{ margin: "auto" }}
              />
            </div>
          </div>
          <div className="sign-in-image-wrapper">
            <img src={MainImg} alt="" className="mt-5" />
          </div>
          <div className="mt-3">
            <h2 className="title" style={{ textAlign: "center" }}>
              {FrenchLang === "true" ? "S'identifier" : "Sign In"}
            </h2>
            <div className="row col-md-6 col-12 m-auto">
              <div className="p-0 col-sm-12">
                <div className="">
                  <form className="signin2-form sign-in-form">
                    <div className="form-group">
                      {/* <label for="exampleInputEmail1" style={{fontStyle:"normal"}}>Email </label> */}
                      <label
                        className="lable-title"
                        htmlFor="exampleInputEmail1"
                        style={{ fontStyle: "normal" }}
                      >
                        {/* {FrenchLang === "true" ? "E-mail" : "Email"}{" "} */}
                        {FrenchLang === "true"
                          ? "Numéro de téléphone"
                          : "Phone Number"}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                          if (!isNaN(e.target.value))
                            setPhoneNumber(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true"
                            ? "Entrez le numéro de téléphone à 10 chiffres"
                            : "Enter 10 digit phone number"
                        }
                        style={{ color: "black" }}
                        maxLength={10}
                        minLength={10}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handledata(e);
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      {/* <label for="exampleInputEmail1" style={{fontStyle:"normal"}}>Password</label> */}
                      <label
                        className="lable-title"
                        htmlFor="exampleInputEmail1"
                        style={{ fontStyle: "normal" }}
                      >
                        {FrenchLang === "true" ? "Épingle" : "PIN"}
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          if (!isNaN(e.target.value))
                            setPassword(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputPassword"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true"
                            ? "Entrez le code PIN à 4 chiffres"
                            : "Enter 4 digit PIN"
                        }
                        minLength={4}
                        maxLength={4}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handledata(e);
                          }
                        }}
                      />
                    </div>
                    <div className="row password-tab">
                      <div className="col-sm-6 col-12">
                        {/* <div className="form-check form-check-label">
                          <input
                            style={{ opacity: "1", pointerEvents: "all" }}
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            onChange={(e) => {
                              setState(e.target.checked);
                            }}
                          />

                          <p
                            onClick={fun}
                            className="si2-green"
                            htmlFor="exampleCheck1"
                          >
                            {FrenchLang === "true"
                              ? "Souviens-toi de moi"
                              : "Remember me"}
                          </p>
                        </div> */}
                      </div>
                      <div className="col-sm-6 col-12">
                        {/* <p className="float-right"><a onClick={() => { history.push('/Forgot') }} href="" className="si2-green text-decoration-none">Forgot Password</a></p> */}
                        <p className="forgot-password">
                          <span
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              M.toast({
                                html: "Please contact customer service for resetting PIN.",
                                classes: "#c62828 red darken-3",
                              })
                            }
                          >
                            {/* <Link to="/Forgot" className="si2-green"> */}
                            {FrenchLang === "true"
                              ? "Épingle oublié ? ?"
                              : "Forgot Pin?"}
                            {/* </Link> */}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="recaptcha-wrap">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={your_recaptcha_site_key}
                        onChange={onChangeReCaptcha}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-sm-12 bottom-btn-font p-0">
                <Link onClick={handledata} to="" className="sign-in-button ">
                  <button type="button" className="btn w-100 mt-4 theme-btn">
                    {FrenchLang === "true" ? "S'identifier" : "Sign In"}
                  </button>
                </Link>
              </div>
              <div className="col-sm-12 text-center mt-3 register-user">
                <p>
                  {FrenchLang === "true"
                    ? "Nouvel utilisateur ?"
                    : "New User ?"}
                  {"    "}

                  <span>
                    <Link to="/Register1" className="fw500">
                      {FrenchLang === "true"
                        ? "Inscrivez-vous ici"
                        : "Register Here"}
                    </Link>
                  </span>
                </p>
              </div>
            </div>
            {/* <div className="col-sm-12 mt-3 register-user-items">
              <h6 className="fw500 home-sign-title">
                {" "}
                {FrenchLang === "true" ? "Offre de la semaine" : "Deal Of Week"}
              </h6>
              <div>
                <div style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <div className=" card-hori-t">
                    <div className="deal-week-wrapper">
                      <div className="row">
                        <div className="col-sm-5-my-C px-0 coupon-items">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "200px" }}
                            />

                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                              <p className="float-right mb-0 p-2 mobile-title-tag">
                                <small className="text-danger">
                                  6{" "}
                                  {FrenchLang === "true"
                                    ? "jours restants"
                                    : "days left"}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C card-img-right">
                          <div>
                            <p className="float-right mb-0 p-2 deal-week-coupon-title">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <p className=" List-card-img-right-p1 mt-1 mb-1">
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 p-0"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <button
                              // to="/Register1"
                              type="button"
                              className="btn add-list-btn mt-3 w-30"
                              onClick={() => {
                                if (localStorage.getItem("Shopping_token"))
                                  history.push("/Reward");
                                else setShowLoginModal(true);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g fill="none">
                                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                                  ></path>
                                </g>
                              </svg>
                              {FrenchLang === "true"
                                ? "Ajouter à la liste"
                                : "Add To List"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div>Sign In</div> */}
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2 className="sign-in-notification" style={{ textAlign: "center" }}>
            {FrenchLang === "true"
              ? "Veuillez vous connecter pour accéder à cette page"
              : "Please Sign in to access this page"}
          </h2>
          <button
            className="close-btn"
            onClick={() => setShowLoginModal(false)}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <i
              className="fa fa-times"
              style={{ fontSize: "22px" }}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              history.push("/signin2");
              setShowLoginModal(false);
            }}
            className="btn btn-danger"
          >
            {FrenchLang === "true" ? "S'identifier" : "Sign in"}
          </button>
          <button
            onClick={() => setShowLoginModal(false)}
            className="btn btn-secondary"
          >
            {FrenchLang === "true" ? "Annuler" : "Cancel"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Signin2;
