import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";
import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Sidebar from "./Sidebar";
import ImgcardHero from "../assets/img/Icons/Icons/bagde-hero.png";
import Footer from "./footer";
import { Url } from "./url";
import Modal from "react-modal";

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

const CoupensDetail = (props) => {
  const history = useHistory();
  const short_link = Url();
  console.log("my second data is ", props.location.value);
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // useEffect(() => {
  //   // if (!history.location.state) history.push("/coupons");
  //   console.log("hello world");
  //   console.log("props is ", props);
  //   console.log("history is ", history);
  //   console.log(
  //     "our data is ",
  //     history.location.state ? history.location.state.PLUCode : ""
  //   );
  //   console.log("our state is ", state);
  // }, []);

  const [state, setState] = React.useState(
    history.location.state
      ? !history.location.state.IsInCart
        ? FrenchLang === "true"
          ? "Agrafe"
          : "Clip"
        : FrenchLang === "true"
        ? "Déclipser"
        : "Unclip"
      : ""
  );

  function remove_to_list() {
    fetch(`${short_link}/removetolist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: history.location.state.SSNewsId,
        token: localStorage.getItem("Shopping_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("data.message is ", data.message);
        if (data.message === 1) {
          console.log("data is removed from the cart");
          setState(
            FrenchLang === "true" ? "Agrafe" : "Clip"
          );
        } else console.log("err is arise in remove from the cart");
      })
      .catch((err) => {
        console.log("err is coming ");
      });
  }

  function add_to_list() {
    console.log("add_to_list() is now executed ...");
    fetch(`${short_link}/addtolist`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: history.location.state,
        token: localStorage.getItem("Shopping_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(
          "data.message.ErrorMessage.ErrorCode is ",
          data.message.ErrorMessage.ErrorCode
        );
        if (data.message.ErrorMessage.ErrorCode === 1) {
          console.log("cart is saved successfully");
          setState(
            FrenchLang === "true" ? "Déclipser" : "Unclip"
          );
        } else {
          console.log("cart is not saved successfully");
        }
      })
      .catch((err) => {
        console.log("err is coming in add_to_list() please check ");
      });
  }

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  console.log(history.location.state);

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

  return (
    <div style={{ background: "#343a40" }}>
      {/* {check_the_user()} */}
      <div
        className="bg-white bg-bottom-round coupon-description"
        // style={{ overflowY: "scroll" }}
      >
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center head-icon ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            {props.location.value === "search" ? (
              <div
                onClick={() => {
                  history.push({
                    pathname: `/search`,
                    value: props.location.name,
                  });
                }}
                className="text-center prev-icon"
              >
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </div>
            ) : props.location.value === "departmentdata" ? (
              <div
                onClick={() => {
                  history.push({
                    pathname: `/Coupons/${history.location.id}`,
                    state: props.location.name,
                  });
                }}
                className="text-center prev-icon"
              >
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  history.push({
                    pathname: "/Coupons",
                    value: props.location.value,
                  });
                }}
                className="text-center prev-icon"
              >
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </div>
            )}
            {/* <div onClick={()=>{history.push({pathname:'/Coupens',value:props.location.value})}} className="text-center">
                            <img src={prev} width="44%"/>
                        </div> */}
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Détails du coupon" : "Coupon Details"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2 ">
              <hr className="mt-2 mb-0" />
              <div className="coupon-desc-wrap">
                <div className="col-sm-12 px-0 mt-3">
                  <div className="bg-red bagde-top-hero coupon-sale-tag">
                    <h6 className="text-white p-2 text-center">
                      {history.location.state
                        ? history.location.state.PLUCode === "100%"
                          ? "Free"
                          : `Save ${history.location.state.PLUCode}`
                        : ""}
                    </h6>
                  </div>
                  <div>
                    <center>
                      <img
                        style={{ width: "auto" }}
                        src={
                          history.location.state
                            ? history.location.state.ImagePath
                            : ""
                        }
                        alt=""
                        className="img-bagde-hero"
                      />
                    </center>
                  </div>
                </div>
                <div className="col-sm-12 mt-4 text-center">
                  {state === "Clip" ? (
                    <button
                      onClick={() => {
                        if (localStorage.getItem("Shopping_token")) {
                          add_to_list();
                        } else {
                          setShowLoginModal(true);
                        }
                      }}
                      type="button"
                      className="btn add-list-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path></g></svg>
                      {FrenchLang === "true"
                        ? "Agrafe"
                        : "Clip"}
                    </button>
                  ) : (
                    <button
                      onClick={remove_to_list}
                      type="button"
                      className="btn remove-list-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"></path></svg>
                      {FrenchLang === "true"
                        ? "Déclipser"
                        : "Unclip"}
                    </button>
                  )}
                  {/* <button onClick={()=>{
                                        if(state==='Clip')
                                            add_to_list();
                                        else
                                            remove_to_list();
                                        }} type="button" class="btn btn-success mt-3 py-2 " style={{width:"70%"}}>{state}</button> */}
                  <hr />
                </div>
              </div>
              <div className="row">
                {/* <div className="col-sm-12 mt-2 text-center">
                                    <button onClick={()=>{
                                        if(state==='Clip')
                                            add_to_list();
                                        else
                                            remove_to_list();
                                        }} type="button" class="btn btn-success mt-3 py-2 " style={{width:"70%"}}>{state}</button>
                                    <hr />
                                </div> */}
                <div className="col-sm-12 mt-4">
                  <h5>
                    {history.location.state
                      ? history.location.state.ProductName
                      : ""}
                  </h5>
                  <h5 className="coupon-price">
                    {FrenchLang === "true" ? "Sauvegarder" : "Save"}{" "}
                    {history.location.state
                      ? history.location.state.PLUCode
                      : ""}
                  </h5>
                  <p className="mb-0 desc-location">
                    <small className="text-secondary-light-gray ">
                      {history.location.state
                        ? history.location.state.Details.substr(0, 120)
                        : ""}
                    </small>
                  </p>
                  <h5 className="desc-exp">
                    <span>
                      {FrenchLang === "true" ? "Expire le" : "Expires On"}:{" "}
                    </span>
                    &nbsp;
                    {history.location.state?.ExpiresOnDateString}
                  </h5>
                </div>
                {/* <div className="col-sm-12 mt-2 text-center">
                                    <button onClick={()=>{
                                        if(state==='Clip')
                                            add_to_list();
                                        else
                                            remove_to_list();
                                        }} type="button" class="btn btn-success mt-3 py-2 " style={{width:"70%"}}>{state}</button>
                                    <hr />
                                </div> */}
                <div className="col-sm-12">
                  <div className="dec-wrap">
                    <p className="mb-0 text-left disclaimer-text">
                      <small className="fw500">
                        {FrenchLang === "true"
                          ? "Clause de non-responsabilité"
                          : "Disclaimer"}
                      </small>
                    </p>
                    <p className="mt-3 mb-3 description">
                      <small>
                        {history.location.state
                          ? history.location.state.Details
                          : ""}
                      </small>
                    </p>
                  </div>
                </div>
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
            <h2
              className="sign-in-notification"
              style={{ textAlign: "center" }}
            >
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
      <Footer />
    </div>
  );
};

export default CoupensDetail;
