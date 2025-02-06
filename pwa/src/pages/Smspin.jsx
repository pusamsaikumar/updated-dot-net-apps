import React, { useEffect , useState} from "react";

import Sidebar from "./Sidebar"; //import $ from "jquery";

import { Link } from "react-router-dom";
import MainImg from "../assets/img/reset15.png";
import prev from "../assets/img/Icons/Icons/prev.png";

const EmailPin = () => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflow: "auto", height: "100vh", borderRadius: "0px" }}
      >
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/Forgot">
                <img src={prev} width="30%" alt="" className="backOrHomebutton" />
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Définir un nouveau code PIN"
                  : "Set New PIN"}
              </h5>
            </div>
          </div>

          <div style={{ margin: "10% 0 2%" }}>
            <center>
              <img src={MainImg} style={{ height: "29vh" }} />
            </center>
          </div>
      <div
        className="p-4 mt-4">
        <div className="row ">
          <div className="col-sm-12">
            <p className="text-center bg-light-st pin2-sm notification-text">
              {FrenchLang === "true"
                ? "Votre code PIN sera envoyé à votre adresse e-mail associée à votre compte. Veuillez entrer l'adresse e-mail et cliquez sur Envoyer le code PIN."
                : "Your PIN will be sent to your email address associated with your account. Kindly enter the email address and click on Send PIN."}
            </p>
            <div className="">
              <form className="reset-form mt-5 ">
                <div className="form-group">
                  <label for="exampleInputEmail1">
                    {FrenchLang === "true"
                      ? "Entrez le numéro de téléphone"
                      : "Enter Phone Number "}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  />
                </div>
                <Link
                  to="/Signin2"
                  type="button"
                  className="btn theme-btn w-100 fw100 mt-4 py-2"
                >
                  {FrenchLang === "true" ? "Envoyer le NIP" : "Send PIN"}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

    </div>
  );
};

export default EmailPin;
