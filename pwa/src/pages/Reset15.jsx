import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Sidebar from "./Sidebar"; //import $ from "jquery";

import { Link, useHistory } from "react-router-dom";
import Footer from "../pages/footer";
import MainImg from "../assets/img/reset15.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import { Url } from "./url";

const Resetpin = () => {
  const history = useHistory();
  const [pin, setpin] = useState("");
  const [cpin, setcpin] = useState("");
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const short_link = Url();

  function handledata() {
    var pin = document.getElementById("exampleInputEmail2");
    var cpin = document.getElementById("exampleInputEmail3");
    var currentpin = document.getElementById("exampleInputEmail1");

    if (!currentpin.value) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Veuillez entrer le mot de passe actuel"
            : "Please enter Current Password ",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (!pin.value) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Veuillez entrer le mot de passe"
            : "Please enter Password",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (!cpin.value) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Veuillez entrer Confirmer le mot de passe"
            : "Please enter Confirm Password",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (pin.value.length < 6 || pin.value.length > 12) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "La longueur du mot de passe doit être comprise entre 6 et 12 caractères"
            : "Password length must be between 6 and 12 characters",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (pin.value !== cpin.value) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Le mot de passe et les mots de passe de confirmation ne correspondent pas"
            : "Password and confirmPasswords are not matching",
        classes: "#c62828 red darken-3",
      });
      return;
    } else {
      fetch(`${short_link}/ChangePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserToken: localStorage.getItem("Shopping_token").split('"').join(""),
          NewPassword: pin.value,
          CustomerId: localStorage.getItem("customerid"),
          OldPassword: currentpin.value,
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          M.toast({
            html: data.message.ErrorMessage.ErrorDetails,
            classes: "#43a047 red darken-1",
          });
          if (data.message.ErrorMessage.ErrorCode == 1) {
            history.push("/Coupons");
          }
        });
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflow: "auto" }}
      >
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/Profile">
                <img src={prev} width="30%" alt="" className="backOrHomebutton"/>
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Changer le mot de passe"
                  : "Change Password"}
              </h5>
            </div>
          </div>

          <div style={{ margin: "10%" }}>
            <center>
              <img src={MainImg} style={{ height: "29vh" }} alt="" />
            </center>
          </div>
        </div>

        <div
          className="  p-4 mt-4"
          style={{
            borderRadius: "25px 25px 0 0",
            marginRight: "0px",
            boxShadow: "0 -0.3rem 1rem rgba(0,0,0,.15)",
          }}
        >
          <div className="row ">
            <div className="col-sm-12">
              <div className="">
                <form className="reset-form mt-5 ">
                  <div className="form-group">
                    <label for="exampleInputEmail1">
                      {FrenchLang === "true"
                        ? "Mot de passe actuel*"
                        : "Current Password*"}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={
                        FrenchLang === "true"
                          ? "Mot de passe actuel"
                          : "Current Password"
                      }
                      required
                      minLength={4}
                      maxLength={12}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail2">
                      {FrenchLang === "true"
                        ? "Nouveau mot de passe*"
                        : "New Password*"}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      placeholder={
                        FrenchLang === "true"
                          ? "Nouveau mot de passe"
                          : "New Password"
                      }
                      required
                      minLength={6}
                      maxLength={12}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail3">
                      {FrenchLang === "true"
                        ? "Confirmez le mot de passe*"
                        : "Confirm Password*"}{" "}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail3"
                      aria-describedby="emailHelp"
                      placeholder={
                        FrenchLang === "true"
                          ? "Confirmez le mot de passe"
                          : "Confirm Password"
                      }
                      required
                      minLength={6}
                      maxLength={12}
                    />
                  </div>
                  <button
                    onClick={() => {
                      handledata();
                    }}
                    type="button"
                    className="btn btn-success w-100 fw100 mt-4 py-2"
                  >
                    {FrenchLang === "true"
                      ? "réinitialiser le mot de passe"
                      : "Reset Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="profile" />
    </div>
  );
};

export default Resetpin;
