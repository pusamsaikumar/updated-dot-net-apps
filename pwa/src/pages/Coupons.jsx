import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import Cardskeleton2 from "../pages/Skeleton2";
import Sidebar from "./Sidebar";
import Barside from "../assets/img/Icons/Icons/Icon-17.png";

import RedL from "../assets/img/Icons/Icons/sm-barcode.png";

import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";

import LPin from "../assets/img/Icons/Icons/Lpin.png";
import Footer from "../pages/footer";
import { Url } from "./url";

const Coupons = (props) => {
  const history = useHistory();
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const { id } = useParams();
  // console.log("my id is ", id);

  const [state, setState] = useState();
  const [timeleft, setTimeLeft] = useState();

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token")
      ? localStorage.getItem("Shopping_token")
      : localStorage.getItem("Guest_token");

    fetch(`${short_link}/coupons/${id}`, {
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
        // console.log(data);
        // console.log(data.message[0].ImagePath);
        // console.log(data.message[0].CustomerName);
        // console.log("time left is ", data.message[0].ExpiresOn);
        // console.log("the data of the coupons is ", data);
        setState(data);
        var a = data.message[0].ExpiresOn;
        var b = a.substr(6, 13);
        var c = parseInt(b);
        var d = c - Date.now();
        var minsday = 1000 * 3600 * 24;
        var expirydate = d / minsday;
        var e = parseInt(expirydate);
        // console.log(e);
        setTimeLeft(e);
      })
      .catch((err) => {
        console.log(
          "error is arise in useEffect in coupons section and the err is ",
          err
        );
      });
  }, []);

  async function add_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/addtolist`, {
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
          // console.log(data);
          resolve(data);
        })
        .catch((err) => {
          // console.log(err);
          reject(err);
        });
    });
  }

  function remove_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/removetolist`, {
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

  function republished() {
    var token = localStorage.getItem("Shopping_token")
      ? localStorage.getItem("Shopping_token")
      : localStorage.getItem("Guest_token");
    fetch(`${short_link}/coupons/${id}`, {
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
        // console.log(data);
        // console.log(data.message[0].ImagePath);
        // console.log(data.message[0].CustomerName);
        // console.log("time left is ", data.message[0].ExpiresOn);
        setState(data);
      })
      .catch((err) => {
        console.log("error os coming");
      });
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
      <div className="bg-white bg-bottom-round" style={{ overflowY: "scroll" }}>
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center head-icon ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center prev-icon">
              <Link
                to={{ pathname: "/coupons", value: "department" }}
                className="text-decoration-none"
              >
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </Link>
            </div>

            <div
              className="col-sm-11-my17 text-center "
              style={{ width: "100%" }}
            >
              <h5 className=" signin1-h1-top  mb-0">
                {!state ? <h3>...</h3> : <h3>{props.location.state}</h3>}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12">
              <hr className="mt-2" />

              <div className=" row " style={{ display: "none" }}>
                <div className="col-sm-12">
                  <div className="input-group mb-3 shadow">
                    <input
                      type="text"
                      className="form-control border-right-0"
                      placeholder="Enter keyword  to search"
                      style={{ height: "47px", width: "70%" }}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className=" input-group-append border-left-0">
                      <span
                        className="input-group-text bg-white p-1 border-left-0 "
                        id="basic-addon2"
                      >
                        <img
                          src={RedL}
                          alt=""
                          style={{
                            objectFit: "cover",
                            height: "80%",
                            width: "30px",
                          }}
                          className=" mr-2"
                        />
                        <i
                          className="fa fa-search pr-1"
                          style={{ fontSize: "18px" }}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tabs-2" role="tabpanel">
                <div className="row px-3">
                  {!state ? (
                    <>
                      {" "}
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                      <Cardskeleton2 />
                      <Cardskeleton2 />{" "}
                    </>
                  ) : (
                    <>
                      {state.message.map((item, i) => {
                        return (
                          <div className="col-sm-12 mt-2 mb-1" key={i}>
                            <div className=" card-hori-t">
                              <div className="row department-coupon">
                                <div
                                  onClick={() => {
                                    history.push({
                                      pathname: "/CouponsDetail",
                                      state: item,
                                      value: "departmentdata",
                                      id: id,
                                      name: props.location.state,
                                    });
                                  }}
                                  className="col-sm-5-my-C px-0"
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
                                          {item.PLUCode === "100%" ? (
                                            <>
                                              {FrenchLang === "true"
                                                ? "Gratuite"
                                                : "Free"}
                                            </>
                                          ) : (
                                            <>
                                              {FrenchLang === "true"
                                                ? "Sauvegarder"
                                                : "Save"}{" "}
                                              {item.PLUCode}
                                            </>
                                          )}
                                        </small>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-sm-7-my-C card-img-right">
                                  <div className="p-3">
                                    <div
                                      className="mb-3"
                                      onClick={() => {
                                        history.push({
                                          pathname: "/CouponsDetail",
                                          state: item,
                                          value: "departmentdata",
                                          id: id,
                                          name: props.location.state,
                                        });
                                      }}
                                    >
                                      <p className="float-right mb-0">
                                        <small className="text-danger">
                                          {agent(item)}{" "}
                                          {FrenchLang === "true"
                                            ? "Jours restants"
                                            : "days left"}
                                        </small>
                                      </p>
                                      <br />
                                      <p className=" List-card-img-right-p1 mt-1">
                                        {item.Title.substr(0, 30)}
                                      </p>
                                      <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray all-coupons-desc">
                                        {item.Details}
                                      </p>
                                    </div>

                                    {!item.IsInCart ? (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          add_to_list(item)
                                            .then((data) => {
                                              // console.log(
                                              //   typeof data.message.ErrorMessage
                                              //     .ErrorCode
                                              // );
                                              if (
                                                data.message.ErrorMessage
                                                  .ErrorCode === 1
                                              ) {
                                                // console.log(
                                                //   "now republished is going to execute"
                                                // );
                                                republished();
                                              }
                                            })
                                            .catch((err) => console.log(err));
                                        }}
                                        type="button"
                                        className="btn add-list-btn mt-3 w-30"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path></g></svg>{FrenchLang === "true"
                                          ? "Agrafe"
                                          : "Clip"}
                                      </button>
                                    ) : (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          remove_to_list(item).then((data) => {
                                            // console.log(
                                            //   "data i received is ",
                                            //   data.message
                                            // );
                                            // console.log(
                                            //   "typeof ",
                                            //   typeof data.message
                                            // );
                                            if (data.message === 1) {
                                              // console.log(
                                              //   "now republished is going to execute"
                                              // );
                                              republished();
                                            }
                                          });
                                        }}
                                        type="button"
                                        className="btn remove-list-btn mt-3 w-30"
                                      >
                                       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"></path></svg> {FrenchLang === "true"
                                          ? "Déclipser"
                                          : "Unclip"}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
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

export default Coupons;
