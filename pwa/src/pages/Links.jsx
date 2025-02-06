import React, { useEffect } from "react";
//import $ from "jquery";

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
import Footer from "./footer";
const Links = () => {
  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  return (
    <div>
      <div className="bg-white bg-bottom-round">
        <div className="container page17 px-3">
          <div className="col-sm-12">
            <Link to="/Location">
              {FrenchLang === "true" ? "Emplacement" : "Location"}
            </Link>
            <br />
            <Link to="/Reset15">
              {FrenchLang === "true" ? "Réinitialiser" : "Reset"}
            </Link>
            <br />
            <Link to="/SandP">
              {FrenchLang === "true"
                ? "Assistance et confidentialité"
                : "Support and Privacy"}
            </Link>
            <br />
            <Link to="/ContactUs">
              {FrenchLang === "true" ? "Contactez-nous" : "Contact Us"}
            </Link>
            <br />

            {/* <Link to="/List">List</Link><br /> */}
            {/* <Link to="/Reaward">Reawards</Link><br /> */}
            {/* <Link to="/CoupensDetail">CoupensDetail</Link><br /> */}

            {/* <Link to="/Checkout">Check out</Link><br /> */}
            <Link to="/CardNew">
              {FrenchLang === "true" ? "Carte Nouveau" : "Card New"}
            </Link>
            <br />

            {/* <Link to="/Profile">Profile</Link> */}

            {/* <Link to="/Coupens">Coupens</Link> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Links;
