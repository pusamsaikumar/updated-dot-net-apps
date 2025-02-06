//Sir ki file hai yhe

import React, { useEffect, useState, useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useHistory } from "react-router-dom";
import Cardskeleton from "../pages/Skeleton";
import Cardskeleton2 from "../pages/Skeleton2";
import M from "materialize-css";
import prev from "../assets/img/Icons/Icons/prev.png";
import Webcam from "react-webcam";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Image1 from "../assets/img/Icons/Icons/imageC1.png";
import gif from "../assets/img/image.gif";
import Image2 from "../assets/img/Icons/Icons/imageC2.png";
import Image3 from "../assets/img/Icons/Icons/imageC3.png";
import Image4 from "../assets/img/Icons/Icons/imageC4.png";

import Imageb1 from "../assets/img/Icons/Icons/bagde-hero.png";

import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import RedL from "../assets/img/Icons/Icons/sm-barcode.png";
import Detailofcoupon from "./CoupensDetail";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";

import LPin from "../assets/img/Icons/Icons/Lpin.png";
import Footer from "../pages/footer";
import CoupensDetail from "./CoupensDetail";
import Sidebar from "./Sidebar";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Url } from "./url";
import CameraPopup from "../components/CameraPopup";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";

const Coupens = () => {
  const history = useHistory();
  const short_link = Url();
  const webRef = useRef(null);
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [portercard, setPortercard] = React.useState("");

  const [state, setState] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [flag, setFlag] = useState(false);
  const [storename, setStoreName] = useState();
  const [storename2, setStorename2] = useState(
    localStorage.getItem("Shopping_token")
      ? JSON.parse(localStorage.getItem("data")).store
      : localStorage.getItem("storename1")
      ? localStorage.getItem("storename1")
      : "select store"
  );
  const [itemisincart, setitemisincart] = useState(false);
  const [changestorename, setchangestorename] = useState(
    "Select preferred store"
  );

  const [section1, setsection1] = useState("");
  const [section2, setsection2] = useState("");
  const [section3, setsection3] = useState("");
  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState();

  // var myarray = [];

  const [arr, setarr] = useState();
  const [arr2, setarr2] = useState();
  const [searchvallue, setsearchvallue] = useState();
  const [storeIndex, setStoreIndex] = useState();

  // console.log("history.location.value is = ", history.location.value);

  useEffect(() => {
    if (localStorage.getItem("Shopping_token")) {
      if (history.location.value === "all coupons") {
        setsection2("active");
        setsection1("");
        setsection3("");
      } else if (history.location.value === "department") {
        setsection2("");
        setsection3("active");
        setsection1("");
      } else {
        setsection1("active");
        setsection2("");
        setsection3("");
      }
    } else {
      setsection1("");
      setsection2("active");
      setsection3("");
    }
  }, []);

  // console.log("section 2 is ", section2);
  // console.log("section 1 is ", section1);
  // console.log("section 3 is ", section3);

  useEffect(() => {
    setTimeout(onchangethedata, 2000);
  }, []);

  const onchangethedata = () => {
    // console.log("onChange the data is executed");
    if (localStorage.getItem("Shopping_token"))
      if (history.location.value === "department") call_department();
      else if (history.location.value === "all coupons") call_allcoupons();
      else call_mydeals();
    else call_allcoupons();
  };

  useEffect(() => {
    fetch(`${short_link}/getclientstore`, {
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
        setStoreName(data);
      });
  }, []);

  useEffect(() => {
    // fetch(`${short_link}/coupons`,{
    // // fetch('/coupons',{
    //     method:"post",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         token:localStorage.getItem("Shopping_token")
    //     })
    // }).then(res=>res.json())
    // .then(data=>{
    //     console.log("data of All Coupons is " ,data);
    //         // localStorage.setItem("allcoupons",JSON.stringify(data.message));
    //         setState(data);
    //         var a = data.message[0].ExpiresOn;
    //         var b = a.substr(6,13);
    //         var c = parseInt(b);
    //         var d = c - Date.now();
    //         var minsday = 1000*3600*24;
    //         var expirydate = (d/minsday);
    //         var e = parseInt(expirydate);
    //     console.log(e);
    //     setarr(e);
    // }).catch(err=>{console.log("err is arise in /coupons in setState() and the error is ",err)});
    // fetch(`${short_link}//mydeals`,{
    //     // fetch('/mydeals',{
    //     method:"post",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         token:localStorage.getItem("Shopping_token")
    //     })
    // }).then(res=>res.json())
    // .then(data=>{
    //     console.log("data of mydeals is ",data);
    //     // localStorage.setItem("mydelas",JSON.stringify(data.message))
    //     console.log("the length of mydeal is ",data.message.length)
    //     setState2(data);
    //     //console.log(data.message[0].ExpiresOn);
    //         var a = data.message[0].ExpiresOn;
    //         var b = a.substr(6,13);
    //         var c = parseInt(b);
    //         var d = c - Date.now();
    //         var minsday = 1000*3600*24;
    //         var expirydate = (d/minsday);
    //         var e = parseInt(expirydate);
    //     console.log(e);
    //     setarr2(e);
    // })
    // .catch(err=>console.log("err is arise in setstate2 and the error is ",err))
    // var token = localStorage.getItem('Shopping_token');
    // fetch(`${short_link}//getdepartment`,{
    //     method:"post",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         token:token
    //     })
    // }).then(res=>res.json())
    // .then(data=>{
    //     console.log("data os the departments is ",data);
    //     setState3(data);
    // }).catch(err=>{
    //     console.log("err is arise in setstae3() and the error is ",err);
    // })
  }, []);

  function call_mydeals() {
    // console.log("call_mydeals is executed");
    fetch(`${short_link}/mydeals`, {
      // fetch('/mydeals',{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("Shopping_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data of mydeals is ", data);
        // localStorage.setItem("mydelas",JSON.stringify(data.message))
        // console.log("the length of mydeal is ", data.message.length);

        setState2(data);
        //console.log(data.message[0].ExpiresOn);
        var a = data.message[0].ExpiresOn;
        var b = a.substr(6, 13);
        var c = parseInt(b);
        var d = c - Date.now();
        var minsday = 1000 * 3600 * 24;
        var expirydate = d / minsday;
        var e = parseInt(expirydate);
        // console.log(e);
        setarr2(e);
      })
      .catch((err) =>
        console.log("err is arise in setstate2 and the error is ", err)
      );
  }

  function call_allcoupons() {
    // console.log("call_allcoupons is executed");
    fetch(`${short_link}/coupons`, {
      // fetch('/coupons',{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("Shopping_token")
          ? localStorage.getItem("Shopping_token")
          : localStorage.getItem("Guest_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data of All Coupons is ", data);
        // localStorage.setItem("allcoupons",JSON.stringify(data.message));
        setState(data);
        var a = data.message[0].ExpiresOn;
        var b = a.substr(6, 13);
        var c = parseInt(b);
        var d = c - Date.now();
        var minsday = 1000 * 3600 * 24;
        var expirydate = d / minsday;
        var e = parseInt(expirydate);

        // console.log(e);
        setarr(e);
      })
      .catch((err) => {
        console.log(
          "err is arise in /coupons in setState() and the error is ",
          err
        );
      });
  }

  function call_department() {
    // console.log("call_department is executed");
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/getdepartment`, {
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
        // console.log("data os the departments is ", data);
        setState3(data);
      })
      .catch((err) => {
        console.log("err is arise in setstae3() and the error is ", err);
      });
  }

  function pushthepage(ans) {
    if (ans !== "Filter") history.push(ans);
  }

  async function sort_the_data(value) {
    // console.log("sort() is running");
    // console.log("value of arr and arr2 is ", arr, arr2);
    if (value === "Brand") {
      var dummy = state;
      //await console.log("dummy is " ,dummy);
      await setState();
      await dummy.message.sort(function (a, b) {
        // return a.SSNewsId - b.SSNewsId;
        if (a.ProductName < b.ProductName) return -1;
        if (a.ProductName > b.ProductName) return 1;
        return 0;
      });
      //await console.log("after sorting the dummy data is ",dummy);
      await setState(dummy);
      //console.log("the state which come ",state);

      var dummy = state2;
      //await console.log("second dummy is" ,dummy);
      await setState2();
      await dummy.message.sort(function (a, b) {
        if (a.ProductName < b.ProductName) return -1;
        if (a.ProductName > b.ProductName) return 1;
        return 0;
      });
      //await console.log("after sort the second dummy is ",dummy);
      await setState2(dummy);
      //console.log("the state2 which come is ",state2);
    }

    if (value === "price-range") {
      var dummy = state;
      //await console.log("dummy is " ,dummy);
      await setState();
      await dummy.message.sort(function (a, b) {
        return a.SSNewsId - b.SSNewsId;
      });

      await setState(dummy);

      var dummy = state2;
      // await console.log("second dummy is", dummy);
      setState2();
      await dummy.message.sort(function (a, b) {
        return a.SSNewsId - b.SSNewsId;
      });
      // await console.log("after sort the second dummy is ", dummy);
      await setState2(dummy);
      // console.log("the state2 which come is ", state2);
    }
  }

  function add_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/addtolist`, {
        // fetch('/addtolist',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: item,
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("data in add to list is ", data);
          resolve(data);
        })
        .catch((err) => {
          // console.log("err in add to list is ", err);
          reject(err);
        });
    });
  }

  function remove_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/removetolist`, {
        // fetch('/removetolist',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: item.SSNewsId,
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          resolve(data);
        })
        .catch((err) => {
          // console.log(err);
          reject(err);
        });
    });
  }

  function republished(value) {
    //this function is generally used when some user clicked on Add to list then this () again call the api and get the data
    if (value === "mydeals") {
      //setState2();
      fetch(`${short_link}/mydeals`, {
        // fetch('/mydeals',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("setState2 state is updated the data is ", data);
          setState2(data);
        })
        .catch((err) =>
          console.log(
            "err is arise in republished function inside mydeals section and the error is  ",
            err
          )
        );
    }

    if (value === "allcoupons") {
      // setState();
      fetch(`${short_link}/coupons`, {
        // fetch('/coupons',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("Shopping_token")
            ? localStorage.getItem("Shopping_token")
            : localStorage.getItem("Guest_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(
          //   "data of the republished of all coupons section is ",
          //   data
          // );
          setState(data);
        })
        .catch((err) =>
          console.log(
            "err is arise in republished function inside allcoupons section and the error is  ",
            err
          )
        );
    }
  }

  function agent(item) {
    var a = item.ExpiresOn;
    var b = a.substr(6, 13);
    var c = parseInt(b);
    var d = c - Date.now();
    var minsday = 1000 * 3600 * 24;
    var expirydate = d / minsday;
    var e = parseInt(expirydate);
    // console.log("the time is ", e);
    return e;
  }

  const renderlist = (item, i) => {
    return (
      <Link
        to={{ pathname: "/CouponsDetail", state: item, value: "mydeals" }}
        className="coupon-items"
        key={i}
      >
        <div>
          <div className="coupon-tag-wrapper">
            <div className="time-tag">
              <p
                className="badge-overlay square-R d-none"
                style={{ textAlign: "center" }}
              ></p>
              <p className="badge-overlay square-W">
                <small>
                  {agent(item) === 0
                    ? "Expires today"
                    : `${agent(item)}
                   days left`}
                </small>
              </p>
            </div>
            <div className="coupon-sale-tag">
              {item.PLUCode === "100%" ? (
                <small>{FrenchLang === "true" ? "Gratuite" : "Free"}</small>
              ) : (
                <small>
                  {FrenchLang === "true" ? "Sauvegarder" : "Save"}{" "}
                  {item.PLUCode[item.PLUCode.length - 1] == "0" &&
                  item.PLUCode[item.PLUCode.length - 2] == "0"
                    ? item.PLUCode.substr(0, 2)
                    : item.PLUCode}
                </small>
              )}
            </div>
          </div>
          <div
            // style={{ maxWidth: "140px", width: "140px" , minHeight: "140px"}}
            className="Coupen-badge-sm-card-img-outer has-badge coupon-img-wrap"
          >
            <img
              src={item.ImagePath}
              className="Coupen-badge-sm-card-img-inner"
            />
          </div>
        </div>
        <div>
          <div className="card-body p-0">
            {/* <p style={{color:"black",height:"30px"}} className="mb-0 List-card-img-right-p2-C-sm-C text-secondary-light-gray">{item.Details.substr(0,10)}...</p> */}
            <p className="coupon-price-title List-card-img-right-p1 mb-0 text-dark">
              {item.Title.length < 50
                ? item.Title
                : `${item.Title.substr(0, 50)}..`}
            </p>
            {/* <p
              style={{ color: "black", marginTop: "10px" }}
              className="mb-0 List-card-img-right-p2-C-sm-C text-secondary-light-gray coupon-title-desc"
            >
              {item.Details.length < 50
                ? item.Details
                : `${item.Details.substr(0, 50)}...`}
            </p> */}
            {item.IsInCart ? (
              <button
                style={{ borderRadius: "0.4rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  remove_to_list(item).then((data) => {
                    // console.log("data.message is ", data.message);
                    if (data.message === 1) {
                      republished("mydeals");
                    }
                  });
                }}
                type="button"
                className="btn remove-list-btn w-100 mt-3"
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
                  />
                </svg>
                {FrenchLang === "true" ? "Déclipser" : "Unclip"}
              </button>
            ) : (
              <button
                style={{ borderRadius: "0.4rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  add_to_list(item).then((data) => {
                    // console.log("data i received from add_to_list is ", data);
                    if (data.message.ErrorMessage.ErrorCode === 1) {
                      // console.log("now republished () is going to call");
                      republished("mydeals");
                    } else if (data.message.ErrorMessage.ErrorCode === -1) {
                      M.toast({
                        html: `${data.message.ErrorMessage.ErrorDetails}`,
                        classes: "#c62828 red darken-3",
                      });
                      // console.log(data.message.ErrorMessage.ErrorDetails);
                    }
                  });
                  // console.log("bye");
                }}
                type="button"
                className="btn add-list-btn w-100 mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                    />
                  </g>
                </svg>
                {FrenchLang === "true" ? "Agrafe" : "Clip"}
              </button>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const renderlist2 = (item, i) => {
    return (
      <Link
        style={{ boxShadow: "none", margin: "10px" }}
        to={{ pathname: "/CouponsDetail", state: item, value: "mydeals" }}
        className="coupon-items"
        key={i}
      >
        <div>
          <div
            style={{ maxWidth: "150px", width: "150px" }}
            className="Coupen-badge-sm-card-img-outer has-badge"
          >
            <div
              style={{
                textAlign: "center",
                background: "#E51E26",
                color: "white",
              }}
            >
              {item.PLUCode === "100%" ? (
                <small>{FrenchLang === "true" ? "Gratuite" : "Free"}</small>
              ) : (
                <small>
                  {FrenchLang === "true" ? "Sauvegarder" : "Save"}{" "}
                  {item.PLUCode[item.PLUCode.length - 1] == "0" &&
                  item.PLUCode[item.PLUCode.length - 2] == "0"
                    ? item.PLUCode.substr(0, 2)
                    : item.PLUCode}
                </small>
              )}
            </div>
            <img
              src={item.ImagePath}
              className="Coupen-badge-sm-card-img-inner"
            />
            <p
              className="badge-overlay square-R d-none"
              style={{ textAlign: "center" }}
            ></p>
            <p className="badge-overlay square-W">
              <small>
                {arr2} {FrenchLang === "true" ? "Jours restants" : "days left"}
              </small>
            </p>
          </div>
        </div>
        <div>
          <div className="card-body p-0">
            {/* <p style={{color:"black",height:"30px"}} className="mb-0 List-card-img-right-p2-C-sm-C text-secondary-light-gray">{item.Details.substr(0,10)}...</p> */}
            <p className="List-card-img-right-p1 mb-0 text-dark">
              {item.Title.substr(0, 30)}..
            </p>
            <p
              style={{ color: "black", marginTop: "10px" }}
              className="mb-0 List-card-img-right-p2-C-sm-C text-secondary-light-gray"
            >
              {item.Details.substr(0, 18)}...
            </p>
            {item.IsInCart ? (
              <button
                style={{ borderRadius: "0.4rem", fontSize: "12px" }}
                onClick={(e) => {
                  e.preventDefault();
                  remove_to_list(item).then((data) => {
                    // console.log("data.message is ", data.message);
                    if (data.message === 1) {
                      republished("mydeals");
                    }
                  });
                }}
                type="button"
                className="btn remove-list-btn w-100 mt-3"
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
                  />
                </svg>
                {FrenchLang === "true" ? "Déclipser" : "Unclip"}{" "}
              </button>
            ) : (
              <button
                style={{ borderRadius: "0.4rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  add_to_list(item).then((data) => {
                    // console.log("data i received from add_to_list is ", data);
                    if (data.message.ErrorMessage.ErrorCode === 1) {
                      console.log("now republished () is going to call");
                      republished("mydeals");
                    }
                  });
                  // console.log("bye");
                }}
                type="button"
                className="btn add-list-btn w-100 mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                    />
                  </g>
                </svg>
                {FrenchLang === "true" ? "Agrafe" : "Clip"}
              </button>
            )}
          </div>
        </div>
      </Link>
    );
  };

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      if (!localStorage.getItem("Guest_token")) history.push("/Signin2");
    } else {
    }
  }

  function changepreferedstore() {
    fetch(`${short_link}/storeid`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: changestorename,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data is ", data);
        // console.log("id is ", data.message[0].ClientStoreId);

        const firstname = JSON.parse(localStorage.getItem("data")).firstname;
        const lastname = JSON.parse(localStorage.getItem("data")).lastname;

        fetch(`${short_link}/changedprefferedstore`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ClientStoreId: data.message[0].ClientStoreId,
            FirstName: firstname,
            LastName: lastname,
            UserToken: localStorage.getItem("Shopping_token"),
            subdomain: localStorage.getItem("subdomain"),
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            // console.log("result is ", result);
            if (result.message.ErrorMessage.ErrorCode === 1) {
              // console.log("executed");
              const ans = JSON.parse(localStorage.getItem("data"));
              // console.log("ans is ", ans);
              setStorename2(data.message[0].ClientStoreName);
              localStorage.setItem(
                "data",
                JSON.stringify({
                  firstname: ans.firstname,
                  lastname: ans.lastname,
                  zipcode: ans.zipcode,
                  mobilenumber: ans.phone,
                  store: data.message[0].ClientStoreName,
                  storeid: data.message[0].ClientStoreId,
                  username: ans.username,
                })
              );
            }
          })
          .catch((err) => {
            console.log(
              "err is arise inside the changedpreferedstore() and the err is ",
              err
            );
          });
      })
      .catch((err) => {
        console.log(
          "err is arise in changepreferredstore() in /storeid and the error is ",
          err
        );
      });
  }

  const searchtheresult = (e) => {
    let len = searchvallue;

    if (len === undefined)
      window.alert(
        FrenchLang === "true"
          ? "veuillez entrer un mot-clé pour rechercher"
          : "please enter keyword to search"
      );
    else if (len.length >= 3)
      history.push({ pathname: "/search", value: searchvallue });
    else
      window.alert(
        FrenchLang === "true"
          ? "veuillez entrer un mot-clé pour rechercher"
          : "please enter keyword to search"
      );
  };

  function changethebackground(e) {
    var a = document.getElementsByClassName("parent");
    for (let i = 0; i < a.length; i++) {
      a[i].style.backgroundColor = "white";
    }
    e.target.style.backgroundColor = "#ece6e6";
    // console.log("e.target.value is ", e.target.innerHTML);
    //console.log(e);

    // setTimeout(()=>{
    //     e.target.style.backgroundColor="white";
    //     e.target.style.transition="all 0.2s"
    // },200)
  }

  function captureImage() {
    setImage(webRef.current.getScreenshot());
    // console.log(webRef.current.getScreenshot());
  }

  function handleRefresh() {
    return new Promise((resolve, reject) => {
      call_allcoupons();
      setTimeout(() => {
        resolve(2);
      }, 3000);
    });
  }

  function handleRefresh2() {
    return new Promise((resolve, reject) => {
      call_mydeals();
      setTimeout(() => {
        resolve(2);
      }, 2500);
    });
  }

  function handleRefresh3() {
    return new Promise((resolve, reject) => {
      call_department();
      setTimeout(() => {
        resolve(2);
      }, 2500);
    });
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
        setPortercard(data.message?.ClientGeneralInfo?.ClientLogo);
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

  return (
    <div style={{ background: "#343a40" }}>
      {check_the_user()}
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflowY: "scroll" }}
      >
        <div className="container page17">
          <div
            className={`row mt-3 coupon-head  ${isSticky ? "sticky-menu" : ""}`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-1-my17-C">
              {localStorage.getItem("Shopping_token") ? (
                <Sidebar />
              ) : (
                <div className="text-center" style={{ width: "100%" }}>
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
            <div className="col-sm-9-my17-C text-center ">
              <img
                src={portercard}
                alt="logo"
                height={30}
                width="auto"
                className="bannerImage"
              />
            </div>

            <div className="col-sm-3-my17-C text-right">
              {!localStorage.getItem("Shopping_token") ? (
                <p style={{ display: "none" }}>
                  {FrenchLang === "true" ? "se déconnecter" : "Signout"}{" "}
                </p>
              ) : (
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
              )}
            </div>

            {/* <!-- Modal --> */}
            {/* <div style={{ maxHeight:"100%", background: "rgba(255, 255, 255, 0)"}} className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div
              style={{
                maxHeight: "100%",
                background: "rgba(255, 255, 255, 0)",
              }}
              className="modal fade"
              id="exampleModal1"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog scanner-box" role="document">
                <div
                  className="modal-content modal-content-message rounded-lg-15"
                  style={{ margin: "auto", padding: "0px" }}
                >
                  <div className="modal-body p-0 ">
                    <p className="bg-danger text-white text-center py-3 rounded-lg-15-lrt">
                      {changestorename}
                    </p>
                    <ul className="list-group list-group-flush px-3 text-center">
                      {storename ? (
                        <>
                          {storename.message.map((item, i) => {
                            return (
                              <li
                                onClick={(e) => {
                                  setchangestorename(item);
                                  changethebackground(e);
                                  setStoreIndex(i + 1);
                                }}
                                className="list-group-item border-top-0 parent"
                                key={i}
                              >
                                {item}
                              </li>
                            );
                          })}
                          <div className="text-center px-3 mb-3 mt-1">
                            <button
                              onClick={() => {
                                // console.log(changestorename);
                                if (!localStorage.getItem("Shopping_token")) {
                                  localStorage.setItem(
                                    "storename1",
                                    changestorename
                                  );
                                  window.location.reload();
                                } else {
                                  changepreferedstore();
                                  localStorage.setItem("storeId", storeIndex);
                                }
                              }}
                              type="button"
                              className="btn add-list-btn py-1 w-100"
                              data-dismiss="modal"
                            >
                              {FrenchLang === "true" ? "Sauvegarder" : "Save"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <li className="list-group-item border-top-0">
                            <a
                              href=""
                              className="text-decoration-none text-dark"
                            >
                              Big Bazaar{" "}
                              {FrenchLang === "true" ? "Magasin" : "Store"}
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------------------End Of Modal 1 --------------------------------*/}

            {/* ------------------------Modal 2-------------------------------------------------- */}

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
              <div className="modal-dialog  modal-warap" role="document">
                <div
                  className="modal-content modal-content-message rounded-lg-15 modal-box"
                  style={{ margin: "auto", padding: "0px" }}
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

            {/* -------------------------------End Of MODAL 2----------------------------------------- */}
          </div>
          <div className="location-wrap" style={{ textAlign: "center" }}>
            <a
              className="text-dark fw500"
              data-toggle="modal"
              data-target="#exampleModal1"
            >
              {" "}
              <img
                src={LPin}
                alt=""
                height={20}
                width={14}
                className="mr-2 pin-icon"
              />
              <span
                className=""
                style={{ fontSize: "18px" }}
                title={storename2}
              >
                {storename2?.length > 6 ? `${storename2}` : storename2}
              </span>
            </a>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12">
              <hr className="mt-2" />
              <div className="row search-wrap">
                <div
                  className="input-group mb-1 shadow coupon-search"
                  style={{ flexWrap: "nowrap" }}
                >
                  <input
                    value={searchvallue}
                    onChange={(e) => {
                      setsearchvallue(e.target.value);
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
                        ? "Entrez le mot-clé pour rechercher"
                        : "Enter keyword to search"
                    }
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white border-0">
                      {/* <img
                        onClick={() => {
                          setCamera(true);
                        }}
                        data-toggle="modal"
                        data-target="#exampleModal2"
                        src={RedL}
                        alt=""
                        style={{ objectFit: "cover", width: "30px" }}
                      /> */}
                      <i
                        onClick={(e) => {
                          searchtheresult(e);
                        }}
                        className="fa fa-search pr-1 pl-3"
                        style={{ fontSize: "20px" }}
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <ul className="nav nav-tab" role="tablist">
                  {localStorage.getItem("Shopping_token") && (
                    <li
                      onClick={() => {
                        call_mydeals();
                      }}
                      className="nav-item w-33"
                    >
                      <a
                        className={`nav-link text-center tab-name ${section1}`}
                        data-toggle="tab"
                        href="#tabs-1"
                        role="tab"
                      >
                        <small>
                          {FrenchLang === "true" ? "Mes offres" : "My Deals"}
                        </small>
                      </a>
                    </li>
                  )}

                  <li
                    onClick={() => {
                      call_allcoupons();
                    }}
                    className="nav-item w-33"
                  >
                    <a
                      className={`nav-link text-center tab-name ${section2}`}
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                    >
                      <small>
                        {FrenchLang === "true"
                          ? "Tous les coupons"
                          : "All Coupons"}
                      </small>
                    </a>
                  </li>
                  {localStorage.getItem("Shopping_token") && (
                    <li
                      onClick={() => {
                        call_department();
                      }}
                      className="nav-item w-33"
                    >
                      <a
                        className={`nav-link text-center tab-name ${section3}`}
                        data-toggle="tab"
                        href="#tabs-3"
                        role="tab"
                      >
                        <small>
                          {FrenchLang === "true"
                            ? "Départements"
                            : "Departments"}
                        </small>
                      </a>
                    </li>
                  )}
                </ul>
                <hr className="my-0" />
                <div>
                  <div style={{ display: "none" }} className="row sortf2">
                    <div className="col-sm-6 col mt-1">
                      <select
                        className="form-control border-0 w-62"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          sort_the_data(e.target.value);
                        }}
                      >
                        <option select="selected">
                          {FrenchLang === "true" ? "Trier" : "Sort"}
                        </option>
                        <option value="Brand">
                          {FrenchLang === "true" ? "Marque" : "Brand"}
                        </option>
                        <option value="price-range">
                          {FrenchLang === "true"
                            ? "Échelle des prix"
                            : "Price Range"}
                        </option>
                        <option value="Discount">
                          {FrenchLang === "true" ? "Rabais" : "Discount"}
                        </option>
                      </select>
                    </div>
                    <div className="col-sm-6 col">
                      <select
                        className="form-control border-0 w-62 float-right"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          pushthepage(e.target.value);
                        }}
                      >
                        {!state3 ? (
                          <option select="selected">
                            {FrenchLang === "true" ? "Filtre" : "Filter"}
                          </option>
                        ) : (
                          <>
                            <option select="selected">
                              {FrenchLang === "true" ? "Filtre" : "Filter"}
                            </option>
                            {state3.message?.map((item, i) => {
                              return (
                                <option
                                  value={`/coupons/${item.ProductCategoryId}`}
                                  key={i}
                                >
                                  {item.ProductCategoryName}
                                </option>
                              );
                            })}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="tab-content tab-content-items">
                  {/* <div class="tab-pane active" id="tabs-1" role="tabpanel"> */}
                  <div
                    className={`tab-pane ${section1}`}
                    id="tabs-1"
                    role="tabpanel"
                  >
                    <PullToRefresh onRefresh={handleRefresh2}>
                      {/* --------------------------------------------------------------------- */}

                      <div
                        style={{ overflowX: "auto" }}
                        className="coupon-main-items"
                      >
                        <div className="coupon-items-wrapper">
                          {!state2 ? (
                            <>
                              <Cardskeleton2 />
                              <Cardskeleton2 />
                              <Cardskeleton2 />
                              <Cardskeleton2 />
                            </>
                          ) : (
                            <>
                              {state2.message.map((item, i) => {
                                if (i < state2.message.length / 2)
                                  return renderlist(item, i);
                              })}
                            </>
                          )}
                          {/* <div className="coupon-items-wrapper"> */}
                          {state2 &&
                            state2.message.map((item, i) => {
                              if (i > state2.message.length / 2) {
                                return renderlist(item, i);
                              }
                              return null;
                            })}
                          {/* </div> */}
                        </div>
                        {!state2 && (
                          <div className="coupon-load-img">
                            <img src={gif} style={{ width: "auto" }} />
                          </div>
                        )}
                        <></>
                      </div>
                      {/* <div className="coupon-items-wrapper"
                          // style={{
                          //   display: "flex",
                          //   marginTop: "10px",
                          //   marginBottom: "10px",
                          //   position: "relative",
                          // }}
                        >
                          {!state2 ? (
                            <>
                              <img src={gif} style={{ width: "auto" }} />
                            </>
                          ) : (
                            <>
                              {state2.message.map((item, i) => {
                                if (i > state2.message.length / 2)
                                  return renderlist(item, i);
                              })}
                            </>
                          )}
                        </div> */}

                      {/* --------------------------------------------------------------------- */}

                      {/* <div className="row scroll-inner4 mb-0">
                                            <div className="col-sm-12">
                                                <div class="row"> */}
                      {/* <div class="container mt-4">
                                                        <div class="scroll">
                                                            {
                                                                !state2 ?   <>
                                                                            <Cardskeleton2 /><Cardskeleton2 /><Cardskeleton2 />
                                                                            </>
                                                                            :
                                                                    <>
                                                                    {
                                                                        state2.message.map((item,i)=>{
                                                                            if(i<6)
                                                                                return(renderlist(item,i))
                                                                        })
                                                                    }
                                                                    </>                           
                                                            }
                                                        </div>
                                                    </div> */}
                      {/* </div>

                                            </div>
                                        </div> */}
                    </PullToRefresh>
                  </div>
                  {/* <div class="tab-pane " id="tabs-2" role="tabpanel"> */}
                  <div
                    className={`tab-pane ${section2}`}
                    id="tabs-2"
                    role="tabpanel"
                  >
                    <div className="row px-3 coupon-scroll all-coupon-item">
                      <PullToRefresh onRefresh={handleRefresh}>
                        {!state ? (
                          <>
                            <Cardskeleton2 />
                            <Cardskeleton2 />
                            <Cardskeleton2 />
                          </>
                        ) : (
                          <div style={{ overflowY: "auto", height: "100%" }}>
                            {state.message.map((item, i) => {
                              if (i < 251 && i > 0)
                                return (
                                  <div
                                    className="col-sm-12 mt-2 mb-1 coupon-card"
                                    key={i}
                                  >
                                    <div className="card-hori-t">
                                      <div
                                        className="row coupon-single-items"
                                        style={{
                                          borderRadius: "9px",
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            history.push({
                                              pathname: "/CouponsDetail",
                                              state: item,
                                              value: "all coupons",
                                            });
                                          }}
                                          className="col-sm-5-my-C px-0 coupon-items"
                                        >
                                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                            <img
                                              src={item.ImagePath}
                                              alt=""
                                              className="reward-card-img-left"
                                            />
                                            <div>
                                              <p className="bg-danger coupen-middle-card-bagde">
                                                <small className="text-white pl-2">
                                                  {item.PLUCode}{" "}
                                                  {FrenchLang === "true"
                                                    ? "Désactivé"
                                                    : "Off"}
                                                </small>
                                              </p>
                                              <p className="float-right mb-0 p-2 mobile-title-tag">
                                                <small className="text-danger">
                                                  {agent(item)}{" "}
                                                  {FrenchLang === "true"
                                                    ? "Jours restants"
                                                    : "Days Left"}
                                                </small>
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className="col-sm-7-my-C card-img-right "
                                          style={{
                                            fontSize: "16px",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            className="card-list"
                                            style={{
                                              padding: "1px",
                                              paddingLeft: "11px",
                                            }}
                                          >
                                            <div
                                              onClick={() => {
                                                history.push({
                                                  pathname: "/CouponsDetail",
                                                  state: item,
                                                  value: "all coupons",
                                                });
                                              }}
                                            >
                                              <p className="float-right mb-0 deal-week-coupon-title">
                                                <small className="text-danger">
                                                  {agent(item)}{" "}
                                                  {FrenchLang === "true"
                                                    ? "Jours restants"
                                                    : "Days Left"}
                                                </small>
                                              </p>
                                              {item.ProductName !== "" && (
                                                <p
                                                  className=" List-card-img-right-p1 mt-1"
                                                  style={{ color: "#343a40" }}
                                                >
                                                  {console.log("item", item)}
                                                  {item.ProductName?.substr(
                                                    0,
                                                    30
                                                  )}
                                                  ...
                                                </p>
                                              )}
                                              <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray all-coupons-desc">
                                                {item.Details}
                                              </p>
                                            </div>
                                            {item.IsInCart ? (
                                              <button
                                                style={{
                                                  borderRadius: "0.4rem",
                                                }}
                                                onClick={(e) => {
                                                  remove_to_list(item)
                                                    .then((data) => {
                                                      // console.log(data);
                                                      if (data.message === 1) {
                                                        republished(
                                                          "allcoupons"
                                                        );
                                                      }
                                                    })
                                                    .catch((err) => {
                                                      // console.log(
                                                      //   "err is arise in add_to_list() in promise section the err is",
                                                      //   err
                                                      // );
                                                    });
                                                }}
                                                type="button"
                                                className="btn remove-list-btn mt-3 w-30"
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
                                                  />
                                                </svg>
                                                {FrenchLang === "true"
                                                  ? "Déclipser"
                                                  : "Unclip"}
                                              </button>
                                            ) : (
                                              <button
                                                onClick={(e) => {
                                                  if (
                                                    localStorage.getItem(
                                                      "Shopping_token"
                                                    )
                                                  ) {
                                                    add_to_list(item)
                                                      .then((data) => {
                                                        // console.log(
                                                        //   "data i received is ",
                                                        //   data.message
                                                        //     .ErrorMessage
                                                        //     .ErrorCode
                                                        // );
                                                        if (
                                                          data.message
                                                            .ErrorMessage
                                                            .ErrorCode === 1
                                                        ) {
                                                          republished(
                                                            "allcoupons"
                                                          );
                                                        } else if (
                                                          data.message
                                                            .ErrorMessage
                                                            .ErrorCode === -1
                                                        ) {
                                                          M.toast({
                                                            html: `${data.message.ErrorMessage.ErrorDetails}`,
                                                            classes:
                                                              "#c62828 red darken-3",
                                                          });
                                                          // console.log(
                                                          //   data.message
                                                          //     .ErrorMessage
                                                          //     .ErrorDetails
                                                          // );
                                                        }
                                                      })
                                                      .catch((err) => {
                                                        console.log(
                                                          "err is arise in add_to_list() in promise section and the error is ",
                                                          err
                                                        );
                                                      });
                                                  } else {
                                                    history.push("/signin2");
                                                  }
                                                }}
                                                style={{
                                                  borderRadius: "0.4rem",
                                                }}
                                                type="button"
                                                className="btn add-list-btn mt-3 w-30"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="1em"
                                                  height="1em"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <g fill="none">
                                                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                    <path
                                                      fill="currentColor"
                                                      d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                                                    />
                                                  </g>
                                                </svg>
                                                {FrenchLang === "true"
                                                  ? "Agrafe"
                                                  : "Clip"}
                                              </button>
                                            )}
                                            {/* <button style={{borderRadius:"8px"}} onClick={(e)=>{
                                                                                                            e.preventDefault();
                                                                                                            if(!item.IsInCart)
                                                                                                            {
                                                                                                                add_to_list(item).then(data=>{
                                                                                                                console.log("data i received is ",data.message.ErrorMessage.ErrorCode);
                                                                                                                if(data.message.ErrorMessage.ErrorCode === 1)
                                                                                                                {
                                                                                                                    republished('allcoupons');
                                                                                                                }
                                                                                                            }).catch(err=>{console.log("err is arise in add_to_list() in promise section and the error is ",err)});
                                                                                                                
                                                                                                            }
                                                                                                            else
                                                                                                            {
                                                                                                                remove_to_list(item).then(data=>console.log(data));
                                                                                                                
                                                                                                            }
                                                                                                            }} type="button" class="btn btn-outline-success w-100 mt-3 pt-0 pb-1" >
                                                                                                                {
                                                                                                                    item.IsInCart   ? <small>Remove From List</small>
                                                                                                                                    : <small>Add To List</small>
                                                                        
                                                                                                                }
                                                                                                        </button> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                        )}
                      </PullToRefresh>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${section3}`}
                    id="tabs-3"
                    role="tabpanel"
                  >
                    <div className="row px-3 ">
                      {!state3 ? (
                        <>
                          <Cardskeleton />
                          <Cardskeleton />
                          <Cardskeleton />
                          <Cardskeleton />
                          <Cardskeleton />
                          <Cardskeleton />
                        </>
                      ) : (
                        <>
                          <PullToRefresh onRefresh={handleRefresh3}>
                            <div className="row">
                              {state3.message?.map((item, i) => {
                                if (item.NoOfCoupons == 0) {
                                  return "";
                                } else {
                                  return (
                                    <div
                                      className="col-md-6 col-12 mt-3"
                                      key={i}
                                    >
                                      <div className="department-items-wrapper">
                                        <Link
                                          to={{
                                            pathname:
                                              "/coupons/" +
                                              item.ProductCategoryId,
                                            state: item.ProductCategoryName,
                                            value: "department",
                                          }}
                                          className="text-decoration-none "
                                          onClick={() => {
                                            // console.log(item.ProductCategoryId);
                                          }}
                                        >
                                          <div className="d-flex justify-content-between align-items-center">
                                            <div className="coupon-circle circle-outer">
                                              <div className="coupon-img">
                                                <img
                                                  src={item.DepartmentImageUrl}
                                                  alt=""
                                                  className="circle-inner"
                                                />
                                              </div>
                                              <p className="my-auto text-dark coupon-dep-text">
                                                <span className="">
                                                  {item.ProductCategoryName}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="department-title-wrap">
                                              <p className="my-auto">
                                                <span className=" text-danger department-items">
                                                  ({item.NoOfCoupons})
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </PullToRefresh>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="coupon" />
    </div>
  );
};

export default Coupens;
