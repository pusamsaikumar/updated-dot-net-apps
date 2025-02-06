//there is a file card_info.jsx which is similar to the list.jsx

import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";
import Cardskeleton2 from "../pages/Skeleton2";
import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";
import ImageCamera from "../assets/img/Icons/Icons/cameraI.jpg";
import dummy from "../assets/img/dummyproduct.png";
import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import RedL from "../assets/img/Icons/Icons/sm-barcode.png";
import CameraPopup from "../components/CameraPopup";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Footer from "../pages/footer";

import { Url } from "./url";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";

const List = (props) => {
  const [state, setState] = useState();
  const [state2, setState2] = useState();
  const [name, setName] = useState();
  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState();
  const webRef = useRef(null);
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [portercard, setPortercard] = React.useState("");
  const [phone, setPhoneNumber] = useState("");

  const history = useHistory();
  const short_link = Url();

  const [active, setActive] = useState("active");
  const [active2, setActive2] = useState("active");

  const [searchdata, setsearchdata] = useState("");
  const [savesearchdata, setsavesearchdata] = useState([]);
  const [isShoppingList, setIsShoppingList] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("add"))
      setsavesearchdata(localStorage.getItem("add").split(","));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Shopping_token")) {
      const data = JSON.parse(localStorage.getItem("data"));

      setPhoneNumber(
        data.mobilenumber ? data.mobilenumber : data.username.split("@")[0]
      );
    }
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/cart`, {
      // fetch('/cart',{
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
        console.log("the data of cart is ", data);
        //console.log(data.message[0].ImagePath)
        setState(data);
      })
      .catch((err) => {
        console.log("err is arise in cart and the error is", err);
      });

    fetch(`${short_link}/card`, {
      // fetch('/card',{
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
        setState2(data);
        setName(
          JSON.parse(localStorage.getItem("data")).firstname +
            " " +
            JSON.parse(localStorage.getItem("data")).lastname
        );
      })
      .catch((err) => console.log("err is arise in card"));
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

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  function captureImage() {
    setImage(webRef.current.getScreenshot());
    console.log(webRef.current.getScreenshot());
  }

  const searchtheresult = (e) => {
    let len = searchdata;
    if (len === undefined)
      window.alert(
        FrenchLang === "true"
          ? "veuillez entrer un mot-clé pour rechercher"
          : "please enter keyword to search"
      );
    else if (len.length >= 3)
      history.push({ pathname: "/search", value: searchdata });
    else
      window.alert(
        FrenchLang === "true"
          ? "veuillez entrer un mot-clé pour rechercher"
          : "please enter keyword to search"
      );
  };

  function fun() {
    var a = document.getElementById("search");
    // a.style.display = "block";
  }

  function fun2() {
    var a = document.getElementById("search");
    // a.style.display = "none";
  }

  function addthedata() {
    if (searchdata.length <= 2) {
      window.alert(
        FrenchLang === "true"
          ? "entrez plus de 2 personnage"
          : "enter more than 2 character"
      );
      return;
    }
    localStorage.setItem("add", [...savesearchdata, searchdata]);
    setsavesearchdata((olditem) => {
      return [...olditem, searchdata];
    });
    setsearchdata("");
  }

  function clearthelist() {
    var token = localStorage.getItem("Shopping_token");
    console.log("the state is ", state);
    console.log("the token is ", token);
    console.log("the length os the item is ", state.message.length);
    let i;
    for (i = 0; i < state.message.length; i++) {
      var a = state.message[i].OfferId;
      fetch(`${short_link}/clearlist`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerid: a,
          token: token,
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("the error is arise and the error is ", err);
        });
    }
    //document.getElementById("tabs-1").style.display = "none";
    //  var a = document.getElementById("tabs-1");
    //  console.log("the value inside the tabs-1 is ",a);

    var a = document.getElementsByClassName("colsm123");
    for (let i = 0; i < a.length; i++) a[i].style.display = "none";
    var b = document.getElementsByClassName("parent1");
    for (let i = 0; i < b.length; i++) b[i].style.display = "none";
    localStorage.removeItem("add");
    setsavesearchdata([]);
  }

  function remove_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/removetolist`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: item.OfferId,
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data of remove to list is ", data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  function republished() {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/cart`, {
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
        console.log("the data of cart is ", data);
        setState(data);
        // M.toast({
        //   html:
        //     FrenchLang === "true"
        //       ? "Panier supprimé avec succès"
        //       : "Cart Remove Successfully",
        //   classes: "#c62828 red darken-3",
        // });
      })
      .catch((err) => {
        console.log("err is arise in cart and the error is", err);
      });
  }

  function removethedata(item) {
    // console.log(item);
    setsavesearchdata((olditem) => {
      return olditem.filter((i) => {
        if (i !== item) return i;
      });
    });
    var item1 = localStorage.getItem("add");
    var item2 = item1.split(",");
    var item3 = item2.filter((i) => {
      if (i !== item) return i;
    });
    localStorage.setItem("add", item3);
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

  return (
    <div style={{ background: "#343a40" }}>
      {check_the_user()}
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflowY: "scroll" }}
      >
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center justify-content-between list-main-title head-icon justify-content-between ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center">
              <Sidebar />
            </div>
            <div className="text-center head-list-title">
              <h5 className=" signin1-h1-top mb-0">
                {FrenchLang === "true" ? "Coupons coupés" : "Clipped Coupons"}
              </h5>
            </div>
            <div>
              <Link
                className="sign-out-btn"
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
                    marginRight: "5px",
                  }}
                  src={Icon10}
                  alt=""
                  // className="sidepanel-texts-img"
                />
                <span className="sign-out-head">
                  {" "}
                  {FrenchLang === "true" ? "se déconnecter" : "Signout"}{" "}
                </span>
              </Link>
            </div>

            {/* {isShoppingList && (
              <div onClick={clearthelist} className="text-center clear-list">
                <a className="text-dark fw500">
                  {FrenchLang === "true" ? "Effacer la liste" : "Clear List"}
                </a>
              </div>
            )} */}
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />

              {/* <div id="search" className=" row px-3">
                <div className="col-sm-11-LSB" style={{ width: "100%" }}>
                  <div className="input-group px-3 mb-1 shadow list-search">
                    <input
                      id="searchvalue"
                      value={searchdata}
                      onChange={(e) => {
                        setsearchdata(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          searchtheresult(e);
                        }
                      }}
                      type="text"
                      className="form-control"
                      placeholder={
                        FrenchLang === "true"
                          ? "Entrez le nom de l'élément"
                          : "Enter Item Name "
                      }
                      style={{
                        width: "65%",
                        height: "47px",
                        fontFamily: "Arial, FontAwesome",
                      }}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className=" input-group-append border-0">
                      <span
                        className="input-group-text bg-white p-1 border-0"
                        id="basic-addon2"
                      >
                        <i
                          onClick={(e) => {
                            searchtheresult(e);
                          }}
                          className="fa fa-search pr-1 pl-3 mr-3"
                          style={{ fontSize: "18px" }}
                          aria-hidden="true"
                        ></i>

                        <button
                          onClick={addthedata}
                          type="button"
                          className="btn list-search-add"
                        >
                          {FrenchLang === "true" ? "Ajouter" : "Add"}
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}

              <div>
                {/* {render_list()} */}
                <ul className="nav nav-tab mt-2 mb-2" role="tablist">
                  <li
                    onClick={() => {
                      fun();
                      setIsShoppingList(true);
                    }}
                    className="nav-item w-50"
                  >
                    <a
                      className="nav-link active text-center  tab-name"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                    >
                      <small>
                        {FrenchLang === "true"
                          ? "Coupons coupés"
                          : "Clipped Coupons"}
                      </small>
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      fun2();
                      setIsShoppingList(false);
                    }}
                    className="nav-item w-50"
                  >
                    <a
                      className="nav-link text-center  tab-name"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                    >
                      <small>
                        {FrenchLang === "true" ? "Vérifier" : "Check Out"}
                      </small>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="row" id="parent">
                      {!state ? (
                        <>
                          <Cardskeleton2 />
                          <Cardskeleton2 />
                          <Cardskeleton2 />
                        </>
                      ) : (
                        <>
                          {state.message.map((item, i) => {
                            return (
                              <div
                                className="col-sm-12 colsm123 list-product-wrap"
                                key={i}
                                style={{
                                  width: "95%",
                                  marginLeft: "auto",
                                }}
                              >
                                <div className="px-1">
                                  <div className="row m-0 mt-3 list-items">
                                    <div className="list-product-img col-sm-2-my px-0">
                                      <div className="List-card-img-outer-left">
                                        <img
                                          src={item.ImagePath}
                                          alt=""
                                          className="card-img-left"
                                        />
                                      </div>
                                    </div>
                                    <div className="list-desc col-sm-10-my bg-light List-card-img-right">
                                      <div className="p-3">
                                        <p className=" List-card-img-right-p1">
                                          {item.ProductName}
                                        </p>
                                        <br />
                                        {/* <p className="mb-0 List-card-img-right-p2 text-dark mb-2 all-coupons-desc">
                                          {item.Details}
                                        </p> */}
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            remove_to_list(item).then(
                                              (data) => {
                                                console.log(
                                                  "data.message is ",
                                                  data.message
                                                );
                                                if (data.message === 1) {
                                                  republished();
                                                }
                                              }
                                            );
                                            console.log("hello");
                                          }}
                                          type="button"
                                          className="btn remove-list-btn list-btn mt-3"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                          >
                                            <path
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="32"
                                              d="M400 256H112"
                                            ></path>
                                          </svg>
                                          {FrenchLang === "true"
                                            ? "Déclipser"
                                            : "Unclip"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}

                      {/* ----------------------this will appear when user click on the add button ------------------------------------------- */}

                      {savesearchdata.map((item, i) => {
                        return (
                          <div
                            key={i}
                            style={{ height: "16vh" }}
                            className="parent1"
                          >
                            <div
                              className="col-sm-12"
                              style={{ padding: "0px" }}
                            >
                              <div className="px-1">
                                <div className="row m-0 mt-3 list-items">
                                  <div className="list-product-img col-sm-2-my px-0">
                                    <div className="List-card-img-outer-left">
                                      <img
                                        src={dummy}
                                        alt=""
                                        className="card-img-left"
                                      />
                                    </div>
                                  </div>
                                  <div className="list-desc col-sm-10-my bg-light List-card-img-right">
                                    <div className="p-3">
                                      <p className=" List-card-img-right-p1">
                                        {item}
                                      </p>
                                      <button
                                        onClick={() => {
                                          removethedata(
                                            document.getElementsByClassName(
                                              "ohno"
                                            )[i].innerHTML
                                          );
                                        }}
                                        type="button"
                                        className="btn btn-danger"
                                      >
                                        {FrenchLang === "true"
                                          ? "Retirer de la liste"
                                          : "Remove From List"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* ----------------------------------------------------------------- */}
                    </div>
                  </div>

                  {/* ------------------------------------------------------- */}
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="row list-user-info">
                      <div className="col-12 p-0 text-center" id="tabs-2">
                        <img
                          style={{ margin: "auto", marginBottom: "2%" }}
                          src={portercard}
                          alt=""
                          height={80}
                          width="auto"
                          className=""
                        />
                        <div className="col-sm-12 list-user">
                          <h4>
                            Your Phone Number : <span>{phone}</span>
                          </h4>

                          <p>
                            Enter your phone number at checkout to redeem the
                            coupons and rewards
                          </p>
                          {/* <h5 className="fw600 mb-2">
                            {name ? name : "Username"}
                          </h5>
                          <p className="mb-1" style={{ marginTop: "5px" }}>
                            <small
                              className="fw600"
                              style={{ fontSize: "17px" }}
                            >
                              {!state2 ? <></> : state2.message.MemberNumber}
                            </small>
                          </p>
                          <p
                            style={{ marginTop: "10px" }}
                            className="text-uppercase mb-1"
                          >
                            <small
                              style={{ fontSize: "13px", fontWeight: "500px" }}
                            >
                              {FrenchLang === "true"
                                ? "Scannez ce code-barres à la caisse"
                                : "Scan this barcode at checkout"}
                            </small>
                          </p>
                          <div>
                            {!state2 ? (
                              <Cardskeleton2 />
                            ) : (
                              <img
                                src={state2.message.BarCodeUrl}
                                className="checkout-barcode-CN card-info"
                                alt=""
                              />
                            )}
                          </div>
                          <h6
                            className="text-dark fw600 mt-5"
                            style={{ fontSize: "large", display: "none" }}
                          >
                            {FrenchLang === "true" ? "Bravo!" : "Congrats!"}
                          </h6>
                          <h6
                            className="text-dark fw600"
                            style={{ fontSize: "large", display: "none" }}
                          >
                            {FrenchLang === "true"
                              ? "Vous avez économisé"
                              : "You have saved"}
                          </h6>
                          <div
                            className="px-5"
                            style={{ marginTop: "-8%", display: "none" }}
                          >
                            <Link
                              to="/Register1"
                              type="button"
                              className="btn btn-outline-success w-100 mt-5"
                              style={{
                                fontSize: "17px",
                                paddingTop: "7%",
                                paddingBottom: "12%",
                              }}
                            >
                              <h5 className="fw600">$100.00</h5>
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------------------------------------------------------- */}
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setCamera(false);
            }}
            style={{
              maxHeight: "100%",
              background: "rgba(255, 255, 255, 0)",
            }}
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content modal-content-message rounded-lg-15"
                style={{ marginTop: "50%", padding: "0px" }}
              >
                <div className="modal-body p-0 ">
                  {camera ? (
                    <CameraPopup
                      webRef={webRef}
                      captureImage={captureImage}
                      setCamera={setCamera}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="list" />
    </div>
  );
};

export default List;
