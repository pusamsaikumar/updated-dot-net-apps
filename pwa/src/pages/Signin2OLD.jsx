import React, { useState, useEffect } from "react";
import M from "materialize-css";
//import $ from "jquery";
import "../my.css";
import { Link, useHistory } from "react-router-dom";

import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import MainImg from "../assets/img/signin2.png";
import { Url } from "./url";

const Signin2 = () => {
  const short_link = Url();
  const history = useHistory();
  const [portercard, setPortercard] = React.useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState(false);
  const [password, setPassword] = useState("");
  localStorage.setItem("subdomain", "portersthriftway");
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])
  var flag = 0;
  function handledata(e) {
    if (flag === 0) {
      e.preventDefault();
      function UIdistort() {
        var w = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        var h = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        "html, body".css({ width: w, height: h });
      }
      if (!email) {
        // M.toast({html: 'Please Enter the email',classes:"#c62828 red darken-3"})
        var a = document.getElementById("exampleInputEmail1");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1500);
        return;
      }
      if (!password) {
        // M.toast({html: 'Please Enter the password',classes:"#c62828 red darken-3"})
        var a = document.getElementById("exampleInputPassword");
        a.style.backgroundColor = "#ead2d2";
        a.style.transition = "all 1s";
        setTimeout(() => {
          a.style.backgroundColor = "white";
        }, 1000);
        return;
      }

      //we set the value of flag is 1 now sign in button is disabled
      // metaViewport = document.querySelector("meta[name=viewport]")
      // metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
      flag = 1;

      // try{
      //  const res = await fetch(`${short_link}/signin`,{
      fetch(`${short_link}/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${short_link}`,
        },
        body: JSON.stringify({
          email,
          password,
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //const data = await res.json();
          console.log(data);
          console.log(
            "client store ID is = ",
            data.data.ErrorMesasge.ErrorCode
          );
          console.log(data.data.UserToken);

          //after getting a data we set the flag = 0;
          flag = 0;

          if (data.data.ErrorMesasge.ErrorCode === 1) {
            localStorage.setItem("photo", data.data.iPhoneHomeImage);
            localStorage.setItem("Shopping_token", data.data.UserToken);
            localStorage.setItem("customerid", data.data.CustomerId);

            localStorage.setItem(
              "data",
              JSON.stringify({
                firstname: data.data.FirstName,
                lastname: data.data.LastName,
                zipcode: data.data.ZipCode,
                mobilenumber: data.data.MobileNumber,
                username: data.data.Username,
                store: data.data.ClientStoreName,
                storeid: data.data.ClientStoreId,
              })
            );

            if (data.data.ClientStoreId > 0) {
              M.toast({
                html:
                  FrenchLang === "true"
                    ? "Connecté avec succès"
                    : "successfully Logged in",
                classes: "#43a047 green darken-1",
              });
              history.push("/Coupons");
            }
          } else {
            M.toast({
              html:
                FrenchLang === "true"
                  ? "Les informations d'identification invalides"
                  : "Invalid Credentials",
              classes: "#c62828 red darken-3",
            });
            return;
          }
          //}
        })
        .catch((err) => {
          flag = 0;
          console.log("error is coming ... ");
          M.toast({
            html:
              FrenchLang === "true"
                ? "Les informations d'identification invalides"
                : "Invalid Credentials",
            classes: "#c62828 red darken-3",
          });
          console.log(err);
        });
    }
  }

  function check_user() {
    if (localStorage.getItem("Shopping_token")) {
      history.push("/Coupons");
    }
  }

  function fun() {
    console.log("hello");
    if (!state) {
      document.getElementById("exampleCheck1").checked = true;
      setState(true);
    } else {
      document.getElementById("exampleCheck1").checked = false;
      setState(false);
    }
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
        setPortercard(data.message.ClientGeneralInfo.ClientLogo);
      });
  }, []);

  return (
    <div>
      {check_user()}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            {/* <img src={MainImgSmall} alt="" srcset="" className="MainImgSmall-s1 mt-3" height={"38px"}/>
                        <img src={MainImg} alt="" srcset="" className="MainImg-s1 " /> */}
            <img
              src={portercard}
              alt=""
              className="MainImgSmall-s1 mt-3"
              height={"38px"}
            />
            <img src={MainImg} alt="" className="MainImg-s1 " />
          </div>
        </div>
      </div>
      {/* <div>Sign In</div> */}
      <div
        className=" p-4 mt-3"
        style={{
          position: "absolute",
          bottom: "0",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -0.3rem 1rem rgba(0,0,0,.15)",
        }}
      >
        <h2
          className="font-weight-bold signin1-h3 mt-3 "
          style={{ textAlign: "center" }}
        >
          {FrenchLang === "true" ? "S'identifier" : "Sign In"}
        </h2>
        <div className="row ">
          <div className="col-sm-12">
            <div className="">
              <form className="signin2-form">
                <div className="form-group">
                  {/* <label for="exampleInputEmail1" style={{fontStyle:"normal"}}>Email </label> */}
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ fontStyle: "normal" }}
                  >
                    {FrenchLang === "true" ? "E-mail" : "Email"}{" "}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={FrenchLang === "true" ? "E-mail" : "Email"}
                  />
                </div>
                <div className="form-group">
                  {/* <label for="exampleInputEmail1" style={{fontStyle:"normal"}}>Password</label> */}
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{ fontStyle: "normal" }}
                  >
                    {FrenchLang === "true" ? "Mot de passe" : "Password"}{" "}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputPassword"
                    aria-describedby="emailHelp"
                    placeholder={
                      FrenchLang === "true" ? "Mot de passe" : "Password"
                    }
                  />
                </div>
                <div className="row">
                  <div className="col-sm-6 col">
                    <div className="form-check">
                      <input
                        style={{ opacity: "1", pointerEvents: "all" }}
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={(e) => {
                          setState(e.target.checked);
                        }}
                      />

                      {/* <p onClick={fun} className="si2-green text-decoration-none" for="exampleCheck1">Remember me</p> */}
                      <p
                        onClick={fun}
                        className="si2-green text-decoration-none"
                        htmlFor="exampleCheck1"
                      >
                        {FrenchLang === "true"
                          ? "Souviens-toi de moi"
                          : "Remember me"}
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 col">
                    <p className="float-right">
                      <a
                        onClick={() => {
                          history.push("/Setnewpin");
                        }}
                        href=""
                        className="si2-green text-decoration-none"
                      >
                        {FrenchLang === "true"
                          ? "Mot de passe oublié"
                          : "Forgot Password"}
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-12 bottom-btn-font mt-2">
            <Link onClick={handledata} to="">
              <button type="button" className="btn btn-success w-100 mt-3">
                {FrenchLang === "true" ? "S'identifier" : "Sign In"}
              </button>
            </Link>
          </div>
          <div className="col-sm-12 text-center mt-3 ">
            <p>
              {FrenchLang === "true" ? "Nouvel utilisateur ?" : "New User ?"}{" "}
              <span>
                <Link
                  to="/Register1"
                  className="text-decoration-none text-red fw500"
                >
                  {FrenchLang === "true"
                    ? "Inscrivez-vous ici"
                    : "Register Here"}
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin2;
