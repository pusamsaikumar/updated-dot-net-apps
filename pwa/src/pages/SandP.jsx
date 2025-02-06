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
const SandP = () => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])

  return (
    <div>
      <div className="bg-white bg-bottom-round">
        <div className="container page17 px-3">
          <div className="row mt-3">
            <div className="text-center">
              <p className="mb-0">
                <Link to="/" className="text-decoration-none">
                  <img src={Barside} className="Barside" alt="" />
                </Link>
              </p>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Assistance et confidentialité"
                  : "Support and Privacy"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />
              <p>
                {FrenchLang === "true"
                  ? "Vous disposez d'une gamme de contrôles pour gérer votre confidentialité à travers les services de Google. Pour trouver des réponses à de nombreuses questions courantes sur la confidentialité et vos données dans les produits et services de Google, sélectionnez une option ci-dessous ou visitez notre"
                  : "You have a range of controls to manage your privacy across Google's services. To find answers to many common questions about privacy and your data in Google's products and services, select an option below or visit our"}{" "}
                <a href="">
                  {FrenchLang === "true"
                    ? "politique de confidentialité"
                    : "Privacy Policy"}
                </a>
                .
              </p>
              <p className="mt-4">
                {FrenchLang === "true"
                  ? "Remarque : Cet article ne traite pas des problèmes techniques ou des problèmes"
                  : "Note: This article doesn't address technical problems or issues"}
                {FrenchLang === "true"
                  ? "sans rapport avec la confidentialité des données. Si vous rencontrez des problèmes techniques, rendez-vous sur"
                  : "unrelated to data privacy. If you have technical issues, visit"}{" "}
                <a href="">
                  {FrenchLang === "true"
                    ? "notre centre d'aide et nos forums d'assistance"
                    : "our help center and support forums"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SandP;
