import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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

const footer = (props) => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  return (
    <>
      <div>
        <div className="fixed-bottom footer-bottom footer-bottom-height">
          <div id="navbarSupportedContent">
            <div className="stickey-bar">
              <div className="text-center footer-sticky-bar-item">
                {/* <Link to="/Coupens" className={`footer-text` }> */}
                <Link to="/Coupons" className="footer-text">
                  <div id="img1" className="card-f">
                    {props.name === "coupon" ? (
                      <img src={Icon2} alt="Card Back" />
                    ) : (
                      <img src={Icon1} alt="Card Back" />
                    )}
                    {/* <img  src={Icon1} alt="Card Back"/> */}
                    <img src={Icon2} className="img-top-f" alt="Card Front" />
                  </div>
                  <p className="font-weight-bold footer-img-text">
                    {FrenchLang === "true" ? "Bons de réduction" : "Coupons"}
                  </p>
                </Link>
              </div>

              <div className="text-center footer-sticky-bar-item">
                <Link to="/Reward" className="footer-text">
                  <div className="card-f">
                    {props.name === "reaward" ? (
                      <img src={Icon4} alt="Card Back" />
                    ) : (
                      <img src={Icon3} alt="Card Back" />
                    )}
                    <img src={Icon4} className="img-top-f" alt="Card Front" />
                  </div>
                  <p className="font-weight-bold footer-img-text">
                    {FrenchLang === "true" ? "Récompenses" : "Rewards"}
                  </p>
                </Link>
              </div>

              <div className="text-center footer-sticky-bar-item">
                <Link
                  to={{ pathname: "/list", state: "list" }}
                  className="footer-text"
                >
                  <div className="card-f">
                    {props.name === "list" ? (
                      <img id="img3" src={Icon6} alt="Card Back" />
                    ) : (
                      <img id="img3" src={Icon5} alt="Card Back" />
                    )}
                    <img src={Icon6} className="img-top-f" alt="Card Front" />
                  </div>
                  <p className="font-weight-bold footer-img-text">
                    {FrenchLang === "true"
                      ? "Coupons coupés"
                      : "Clipped Coupons"}
                  </p>
                </Link>
              </div>

              <div className="text-center footer-sticky-bar-item">
                <Link
                  to={{ pathname: "/cardinfo", state: "card" }}
                  className="footer-text"
                >
                  <div className="card-f">
                    {props.name === "card_info" ? (
                      <img id="img4" src={Icon8} alt="Card Back" />
                    ) : (
                      <img id="img4" src={Icon7} alt="Card Back" />
                    )}
                    {/* <img id="img4" src={Icon7} alt="Card Back" /> */}
                    <img src={Icon8} className="img-top-f" alt="Card Front" />
                  </div>
                  <p className="font-weight-bold">
                    {FrenchLang === "true" ? "Carte" : "Card"}
                  </p>
                </Link>
              </div>

              <div className="text-center footer-sticky-bar-item">
                <Link to="/Profile" className="footer-text">
                  <div className="card-f">
                    {props.name === "profile" ? (
                      <img id="img5" src={Icon10} alt="Card Back" />
                    ) : (
                      <img id="img5" src={Icon9} alt="Card Back" />
                    )}
                    {/* <img id="img5" src={Icon9} alt="Card Back" /> */}
                    <img src={Icon10} className="img-top-f" alt="Card Front" />
                  </div>
                  <p className="font-weight-bold">
                    {FrenchLang === "true" ? "Compte" : "Account"}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default footer;
