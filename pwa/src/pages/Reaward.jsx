import React, { useState, useEffect } from "react";
//import $ from "jquery";

import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";
import Cardskeleton2 from "../pages/Skeleton2";
import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";
import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import M from "materialize-css";
import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import Sidebar from "./Sidebar";
import Footer from "./footer";
import { Url } from "./url";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";

const Reaward = () => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [phone, setPhoneNumber] = useState("");

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])
  const [state, setState] = React.useState();
  const [membernumber, setmembernumber] = React.useState("------");

  const history = useHistory();
  const short_link = Url();

  useEffect(() => {
    if (localStorage.getItem("Shopping_token")) {
      const data = JSON.parse(localStorage.getItem("data"));

      setPhoneNumber(
        data.mobilenumber ? data.mobilenumber : data.username.split("@")[0]
      );
    }
  }, []);

  useEffect(() => {
    const Shopping_token = localStorage.getItem("Shopping_token");
    fetch(
      `${process.env.REACT_APP_LOGIN_BACKEND_MAIN_URL}/GetLMRewardsV2/${Shopping_token}`,
      {
        method: "POST",
        headers: { domainname: process.env.REACT_APP_SUBDOMAIN },
      }
    )
      .then((res) => console.log("L2Rewards", res))
      .catch((err) => console.log("err", err));
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/myRewards`, {
      //  fetch('/myRewards',{
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
        console.log("data of my reward is ", data);
        if (data.message.ErrorMessage.ErrorCode === -1) {
          M.toast({
            html:
              FrenchLang === "true"
                ? "Il n'y a actuellement aucune récompense"
                : "Currently there is no reward",
            classes: "#c62828 red darken-3",
          });
          console.log(data.message.LMRewards);
          setState(data);
        } else {
          setState(data);
        }
      })
      .catch((err) => {
        console.log("err is come in rewards section the error is ", err);
      });
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/card`, {
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
        setmembernumber(data.message.MemberNumber);
      })
      .catch((err) => console.log("err is arise in card"));
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
            className={`row mt-3 mb-2 align-items-center head-icon justify-content-between ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center">
              <Sidebar />
              {/* <p className="mb-0"><Link to="/" className="text-decoration-none"><img src={Barside} className="Barside" alt="" /></Link></p> */}
            </div>
            <div className="text-center coupon-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Mes récompenses" : "My Rewards"}
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
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2 ">
              <hr className="mt-2" />

              <div className="col-sm-12">
                <p className="text-red text-center">
                  {FrenchLang === "true" ? "Membre fidélité" : "Loyalty member"}{" "}
                  #: {phone ? phone : "----"}
                </p>
              </div>
              <div className="row">
                {!state ? (
                  <>
                    <Cardskeleton2 />
                  </>
                ) : (
                  <>
                    {
                      state.message.LMRewards === null ? (
                        <div style={{ display: "none" }}>hello</div>
                      ) : (
                        state.message.LMRewards.map((item, i) => {
                          var a = parseInt(item.PurchasedQty);
                          var b = parseInt(item.BuyQtyAmount);
                          var percent = (a / b) * 100;
                          var quant = parseInt((a / b) * 10);

                          setTimeout(() => {
                            var c = document.getElementsByClassName("parent1");
                            if (
                              c.length > 0 &&
                              a > 0 &&
                              item.RewardTypeId === 1
                            ) {
                              for (let i = 0; i < a; i++) {
                                c[i].checked = true;
                              }
                            }
                          }, 2000);

                          return (
                            <div
                              className="col-sm-12 mt-2 mb-1"
                              key={item.RewardTypeId}
                            >
                              <div className="px-3 card-hori-t">
                                <div className="row reward-single-items align-items-center">
                                  <div className="col-sm-5-my-C px-0">
                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                      <img
                                        src={item.ImageUrl}
                                        alt=""
                                        className="reward-card-img-left"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-7-my-C card-img-right">
                                    <div>
                                      <p className="mb-0 card-img-right-p1-R">
                                        {item.Title}
                                      </p>
                                      <div>
                                        {item.RewardTypeId === 2 &&
                                        !item.IsPointsBased ? (
                                          <div
                                            className=""
                                            style={{
                                              position: "relative",
                                            }}
                                          >
                                            <progress
                                              id="progress-bar"
                                              value={Math.max(
                                                item.RoundedPurchasedAmount,
                                                20
                                              )}
                                              max={item.BuyQtyAmount}
                                              style={{
                                                width: "100%",
                                                height: "5rem",
                                              }}
                                            ></progress>
                                            <span
                                              style={{
                                                position: "absolute",
                                                left: `${Math.max(
                                                  100 -
                                                    (((item.BuyQtyAmount -
                                                      item.RoundedPurchasedAmount) /
                                                      item.BuyQtyAmount) *
                                                      100) /
                                                      2,
                                                  10
                                                )}%`,
                                                top: "50%",
                                                transform:
                                                  "translate(-50%, -50%)",
                                                color: "#000000", // Change color according to your preference
                                                zIndex: "1",
                                              }}
                                            >
                                              {item.BuyQtyAmount -
                                                item.RoundedPurchasedAmount}
                                            </span>
                                            <span
                                              style={{
                                                position: "absolute",
                                                left: `${Math.max(
                                                  ((item.RoundedPurchasedAmount /
                                                    item.BuyQtyAmount) *
                                                    100) /
                                                    2,
                                                  3
                                                )}%`,
                                                top: "50%",
                                                transform:
                                                  "translate(-50%, -50%)",
                                                color: "#000000", // Change color according to your preference
                                                zIndex: "1",
                                              }}
                                            >
                                              {item.RoundedPurchasedAmount}
                                            </span>
                                          </div>
                                        ) : item.RewardTypeId === 1 ? (
                                          <div
                                            id="parent"
                                            style={{
                                              display: "flex",
                                              marginTop: "20px",
                                              marginBottom: "20px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {[...Array(item.BuyQtyAmount)].map(
                                              (index) => (
                                                <input
                                                  key={index}
                                                  className="parent1 reward-radio"
                                                  type="radio"
                                                  style={{
                                                    position: "relative",
                                                    opacity: "1",
                                                    marginRight: "5px",
                                                  }}
                                                />
                                              )
                                            )}
                                          </div>
                                        ) : (
                                          item.IsPointsBased &&
                                          item.RewardTypeId === 2 && (
                                            <div>
                                              <p>
                                                {
                                                  item?.PointsBasedRewardPointsToDollarInfo
                                                }
                                              </p>
                                              <h4 className="amount-text">
                                                {item?.PurchasedAmountString} -{" "}
                                                {
                                                  item?.RewardPurchasedAmountText
                                                }
                                              </h4>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <div className="reward-range-bar">
                                        <div style={{ display: "none" }}>
                                          <p className="mb-0 text-left">
                                            <small
                                              className="font-weight-bold text-secondary-light-gray"
                                              style={{
                                                color: "black",
                                              }}
                                            >
                                              {item.BuyQtyAmount}
                                            </small>
                                          </p>
                                        </div>
                                        <div className="reward-view-btn">
                                          <Link
                                            to={{
                                              pathname: "/RewardDetails",
                                              state: item,
                                            }}
                                            className="text-decoration-none fw500 card-img-right-p2-R text-red"
                                          >
                                            {FrenchLang === "true"
                                              ? "Voir les détails"
                                              : "View Details"}
                                          </Link>
                                        </div>
                                      </div>

                                      {/* code of a progress bar */}
                                      {/* <div class="progress">        
                                                                                    <div class="progress-bar" role="progressbar" style={{width: "80%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">500000</div>
                                                                                </div> */}

                                      {/* code of the  */}
                                      {/* <div style={{display:"flex",marginTop:"4%",marginLeft:"9%"}}>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                    <input type="radio" id="css" name="fav_language" value="CSS" style={{position:"relative",opacity:"1",marginRight:"5%"}}/>
                                                                                </div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ); //end of return
                        })
                      ) //end of map
                    }{" "}
                    {/* end of the echmascript tag */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="reaward" />
    </div>
  );
};

export default Reaward;
