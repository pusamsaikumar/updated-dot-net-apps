import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import MainImg from "../assets/img/signin1.png";
import Icon1 from "../assets/img/Icons/Icons/Icon-01.png";

import Icon2 from "../assets/img/Icons/Icons/Icon-06.png";

import Icon3 from "../assets/img/Icons/Icons/Icon-02.png";
import Icon4 from "../assets/img/Icons/Icons/Icon-07.png";

import Icon5 from "../assets/img/Icons/Icons/Icon-03.png";
import Icon6 from "../assets/img/Icons/Icons/Icon-08.png";

import Icon7 from "../assets/img/Icons/Icons/Icon-04.png";
import Icon8 from "../assets/img/Icons/Icons/Icon-09.png";

import Icon9 from "../assets/img/Icons/Icons/Icon-05.png";
import Icon10 from "../assets/img/Icons/Icons/Icon-10.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Footer from "../pages/footer";
import RedL from "../assets/img/Icons/Icons/red.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import Sidebar from "./Sidebar";
import ReactModal from "react-modal";
import RewardDetailsUPC from "./RewardDetailsUPC";

const RewardDetails = () => {
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [pointrewardDetailsData, setPointRewardDetailsData] = useState({
    QualifiedRewardTiers: [],
    RewardDetails: [],
  });

  useEffect(() => {
    if (!history.location.state) history.push("/Reward");
  }, []);

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    }
    if (!history.location.state) history.push({ pathname: "/Reward" });
    else {
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

  useEffect(() => {
    const Shopping_token = localStorage.getItem("Shopping_token");
    fetch(
      `${
        process.env.REACT_APP_LOGIN_BACKEND_MAIN_URL
      }/GetQualifiedRewardTiersV2/${Shopping_token}/${localStorage
        .getItem("menberNumber")
        .split('"')
        .join("")}/${history.location.state.LMRewardId}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          domainname: process.env.REACT_APP_SUBDOMAIN,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPointRewardDetailsData({
          ...pointrewardDetailsData,
          QualifiedRewardTiers: data.QualifiedRewardTiers,
          RewardDetails: data.RewardDetails,
        });
      })
      .catch((err) => console.log("err- GetQualifiedRewardTiersV2", err));
  }, []);

  return (
    <div style={{ background: "#343a40" }}>
      {check_the_user()}
      <div className="bg-white bg-bottom-round" style={{ overflowY: "scroll" }}>
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center head-icon ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div
              onClick={() => {
                history.push({ pathname: "/Reward" });
              }}
              className="text-center prev-icon"
            >
              {/* <Sidebar /> */}
              <img src={prev} width="30%" alt="" className="backOrHomebutton" />
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Détails de la récompense"
                  : "Reward Details"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2 mb-0" />
              <div className="col-sm-12 px-0 reward-image-desc">
                <div>
                  <center className="reward-image-wrap">
                    <img
                      style={{ width: "auto" }}
                      src={
                        history.location.state
                          ? history.location.state.ImageUrl
                          : ""
                      }
                      alt=""
                      className="img-bagde-hero"
                    />
                  </center>
                </div>
                <div className="reward-desc">
                  <p className="reward-detail-title">
                    {history.location.state ? history.location.state.Title : ""}
                  </p>
                  {history.location.state?.IsPointsBased && (
                    <>
                      <p>{history.location.state.PurchasedAmountString}</p>
                      <p>{history.location.state.RewardPurchasedAmountText}</p>
                    </>
                  )}
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {!history.location.state ? (
                  <></>
                ) : history.location.state.RewardDetails === "" ? (
                  <></>
                ) : (
                  <>
                    {history.location.state?.IsPointsBased ? (
                      <h3 className="reward-detail-sub-title">
                        Rewards Options
                      </h3>
                    ) : (
                      <div
                        className="rewatd-detail-title"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          boxSizing: "border-box",
                          padding: "0.5rem",
                        }}
                      >
                        <h5 className="m-0">
                          {FrenchLang === "true"
                            ? "DÉTAILS SUPPLÉMENTAIRES"
                            : "ADDITIONAL DETAILS"}
                        </h5>
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "16px",
                        margin: "10px 0px",
                        textAlign: "justify",
                      }}
                    >
                      {history.location.state
                        ? history.location.state.RewardDetails
                        : ""}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "10px 0px",
                        wordBreak: "break-all",
                        textAlign: "justify",
                      }}
                    >
                      {history.location.state?.ValidUPCs}
                    </p>
                  </>
                )}
                {history.location.state.IsPointsBased && (
                  <>
                    {pointrewardDetailsData?.QualifiedRewardTiers?.map(
                      (eachRewardTier) => (
                        <div className="reward-card-detail">
                          <div className="reward-detail-img">
                            <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                              <img
                                src={eachRewardTier.TierImageUrl}
                                alt=""
                                className="reward-card-img-left"
                              />
                            </div>
                            <div className="reward-detail-desc card-img-right">
                              <p>{eachRewardTier.PointsRequiredString}</p>
                              <p>{eachRewardTier.TierTitleDesc}</p>
                            </div>
                          </div>
                          <div className="reward-view-btn">
                            <a
                              href=""
                              data-toggle="modal"
                              data-target="#rewardDetailsUPC"
                            >
                              view Details
                            </a>
                          </div>
                          <RewardDetailsUPC eachRewardTier={eachRewardTier} />
                        </div>
                      )
                    )}
                  </>
                )}

                <p
                  style={{
                    fontSize: "12px",
                    margin: "10px 0px",
                    textAlign: "justify",
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="reaward" />
    </div>
  );
};

export default RewardDetails;
