import React, { useState, useEffect } from "react";
import {
  browserName,
  isMobile,
  osName,
  isIOS,
  isAndroid,
} from "react-device-detect";
import { Link } from "react-router-dom";
import MainImg from "../assets/img/signin1.png";
import Icon1 from "../assets/img/Icons/Icons/Icon-11.png";
import { useHistory } from "react-router-dom";
import Icon2 from "../assets/img/Icons/Icons/Icon-12.png";
import Icon3 from "../assets/img/Icons/Icons/Icon-15.png";
import Icon4 from "../assets/img/Icons/Icons/Icon-13.png";
import Icon5 from "../assets/img/Icons/Icons/Icon-14.png";
import Icon6 from "../assets/img/Icons/Icons/Icon-16.png";
import Bgimg from "../assets/img/bg-image.jpg";
import TutorialPopUp from "../components/tutorialPopUp";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import Modal from "react-modal";
import Switch from "react-switch";
import Dummy from "../assets/img/dummy.png";
import { Url } from "./url";
// import AdSection from "./AdSection";
import DealofTheWeek from "../assets/img/dealoftheweek.png";
import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import DealOfWeek from "./DealofWeek";

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

const Signin1 = () => {
  console.log(`b-${browserName} M-${isMobile}, OS-${osName}`);
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [portercard, setPortercard] = React.useState("");
  const short_link = Url();

  const [lang, setLang] = useState({
    checked: localStorage.getItem("FrenchLanguage")
      ? localStorage.getItem("FrenchLanguage")
      : "",
  });

  useEffect(() => {
    localStorage.setItem("storeId", 1);
  }, []);

  function show_popup() {
    if (isAndroid && isMobile) {
      const isAndroidInStandaloneMode = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      if (!isAndroidInStandaloneMode) {
        console.log("Android or Windows device Not in Standalone mode");
        // return (
        //   <TutorialPopUp
        //     text="Install this application on your phone for on the go access to your rewards & coupons."
        //     text2="on top right corner and follow instructions"
        //     Image="https://raysapplemarket.s3.amazonaws.com/ClientImages/android-share-icon.png"
        //   />
        // );
      }
    } else if (isIOS && isMobile) {
      const isIOSStandaloneMode = () =>
        "standalone" in window.navigator && window.navigator.standalone;
      if (!isIOSStandaloneMode()) {
        console.log("Not in Standalone mode");
        // return (
        //   <TutorialPopUp
        //     text="Install this application on your phone for on the go access to your rewards & coupons."
        //     text2="then select 'Add to Home Screen'"
        //     Image="https://raysapplemarket.s3.amazonaws.com/ClientImages/ios-share-icon.png"
        //   />
        // );
      }
    }
  }
  function check_the_user() {
    if (localStorage.getItem("Shopping_token")) history.push("/Coupons");
    else {
    }
  }

  useEffect(() => {
    localStorage.setItem("Guest_token", "mobileguest");
    localStorage.setItem("subdomain", process.env.REACT_APP_SUBDOMAIN);
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
    <div>
      {show_popup()}
      {check_the_user()}
      <div
        className="bg-imgs1"
        style={{
          backgroundImage: `url(${Bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="overlay-white">
          <div className="container height-page-wrapper">
            <div className="col-md-11 col-12 m-auto">
              <div className="row">
                <div className="col-sm-12 text-center">
                  {/* <img src={MainImgSmall} alt="" srcset="" className="MainImgSmall-s2 mt-4" /> */}
                  <img
                    src={portercard}
                    alt=""
                    srcSet=""
                    className="MainImgSmall-s2 mt-4"
                    width="25%"
                  />
                  {localStorage.subdomain === "carrefourmarket" && (
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
                        <h4
                          style={{ marginRight: "10px", fontStyle: "normal" }}
                        >
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
                  )}
                  <div className="welcome-page">
                    <h2 className="font-weight-bold signin1-h2 mt-5 welcome-title">
                      {FrenchLang === "true" ? "Bienvenue" : "Welcome"}
                    </h2>
                    <p className="fw00 mt-2 mb-0 home-sub-title">
                      {FrenchLang === "true"
                        ? "Connectez-vous pour en savoir plus sur les économies numériques, les coupons et les récompenses pour les membres fidèles."
                        : "Sign in to learn more about digital savings, coupons, rewards for loyalty members."}
                    </p>
                    <div>
                      <div>
                        <div className="row user-btn bottom-btn-font">
                          <div className="col-6">
                            <Link to="/Register1" className="sign-in-button">
                              <button
                                to="/Register1"
                                type="button"
                                className="btn register-border w-100 mt-2"
                                style={{ textTransform: "none" }}
                              >
                                {FrenchLang === "true"
                                  ? "Nouvel utilisateur"
                                  : "New User"}
                              </button>
                            </Link>
                          </div>
                          <div className="col-6">
                            <Link to="/Signin2" className="sign-in-button">
                              <button
                                type="button"
                                className="btn w-100 mt-2 theme-btn"
                                style={{ textTransform: "none" }}
                              >
                                {FrenchLang === "true"
                                  ? "S'identifier"
                                  : "Sign In"}
                              </button>
                            </Link>
                          </div>
                          {/* <div className="col-sm-12 register-user-banner">
                      <div>
                        <h1 className="home-ad-title">Ad Section</h1>
                        <img
                          src={DealofTheWeek}
                          alt=""
                          style={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "40px",
                            padding: "0",
                          }}
                        />
                      </div>
                    </div> */}
                        </div>
                      </div>
                      {/* <div className="row mt-2 copiright-sec">
              <div>
                <Link
                  to="/Termsandcondition"
                  className="bottom-s1-link text-decoration-none"
                >
                  {FrenchLang === "true"
                    ? "Termes et conditions"
                    : "Terms and conditions"}
                </Link>
              </div>
              <div>
                <Link
                  to="/Privacypolicy"
                  className="bottom-s1-link text-decoration-none float-right"
                >
                  {FrenchLang === "true"
                    ? "politique de confidentialité"
                    : "Privacy Policy"}
                </Link>
              </div>
            </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="register-user">
                <h6 className="fw500 home-sign-title">
                  {" "}
                  {FrenchLang === "true"
                    ? "Offre de la semaine"
                    : "Deal Of Week"}
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
                          <div className="col-sm-7-my-C card-img-right ">
                            <div>
                              <p className="float-right mb-0 p-2 deal-week-coupon-title">
                                <small className="text-danger">
                                  6{" "}
                                  {FrenchLang === "true"
                                    ? "jours restants"
                                    : "days left"}
                                </small>
                              </p>
                              <p className="List-card-img-right-p1 mt-1">
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
                              <div
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
                                </svg>{" "}
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="items-card-wrapper">
                <div className="row btn-card-sm-s1 px-2 items-card-wrap">
                  <div className="col-sm-4 col px-2 text-center coupon-box">
                    <Link to="/coupons">
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div className="coupon-image">
                          <img src={Icon1} className="pic-icon" alt="" />
                        </div>
                          <p className="coupon-h-title">
                          {FrenchLang === "true"
                            ? "Bons de réduction"
                            : "Coupons"}
                        </p>
                      </div>
                    </Link>
                  </div> */}
              {/* <div className="col-s-m-4 col px-2 text-center">
                <Link to="/weeklyad">
                  <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                    <div>
                      <img src={Icon2} className="pic-icon" alt="" />
                      <p className="coupon-h-title">
                        {FrenchLang === "true"
                          ? "Annonce hebdomadaire"
                          : "Weekly Ad"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div> */}
              {/* <div className="col-sm-4 col px-2 text-center coupon-box">
                    <Link to="/Location">
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div>
                          <img src={Icon3} className="pic-icon" alt="" />
                          <p className="coupon-h-title">
                            {FrenchLang === "true"
                              ? "Emplacements"
                              : "Locations"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div> */}
              {/* <div className="col-sm-4 col px-2 text-center coupon-box">
                    <div
                      onClick={() => {
                        if (localStorage.getItem("Shopping_token"))
                          history.push("/Reward");
                        else setShowLoginModal(true);
                      }}
                    >
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div>
                          <img src={Icon5} className="pic-icon" alt="" />
                          <p className="coupon-h-title">
                            {FrenchLang === "true" ? "Récompenses" : "Rewards"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
              {/* <div className="col-sm-4 col px-2 text-center coupon-box">
                    <Link to="/ContactUs">
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div>
                          <img src={Icon6} className="pic-icon" alt="" />
                          <p className="coupon-h-title">
                            {FrenchLang === "true"
                              ? "Contactez-nous"
                              : "Contact Us"}
                          </p>
                        </div>
                      </div>
                    </Link> 
                  </div>*/}
              {/* </div> */}

              {/* <div className="row mt-2 btn-card-sm-s1 px-2 items-card-wrap"> */}
              {/* <div className="col-sm-4 col px-2 text-center coupon-box">
                  <Link to="/contactresult">
                    <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                      <div>
                        <img src={Icon4} className="pic-icon" alt="" />
                        <p className="coupon-h-title">
                          {FrenchLang === "true"
                            ? "À propos de nous"
                            : "About Us"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div> */}
              {/* <div className="col-sm-4 col px-2 text-center coupon-box">
                    <div
                      onClick={() => {
                        if (localStorage.getItem("Shopping_token"))
                          history.push("/Reward");
                        else setShowLoginModal(true);
                      }}
                    >
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div>
                          <img src={Icon5} className="pic-icon" alt="" />
                          <p className="coupon-h-title">
                            {FrenchLang === "true" ? "Récompenses" : "Rewards"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
              {/*  <div className="col-sm-4 col px-2 text-center coupon-box">
                    <Link to="/ContactUs">
                      <div className="coupon-image-wrapper border rounded-lg text-secondary-light-gray bg-white btn-ligh">
                        <div>
                          <img src={Icon6} className="pic-icon" alt="" />
                          <p className="coupon-h-title">
                            {FrenchLang === "true"
                              ? "Contactez-nous"
                              : "Contact Us"}
                          </p>
                        </div>
                      </div>
                    </Link> 
                  </div>*/}
              {/* </div> */}
              {/* </div> */}
              {/* <AdSection /> */}
            </div>
          </div>
        </div>
      </div>
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

export default Signin1;
