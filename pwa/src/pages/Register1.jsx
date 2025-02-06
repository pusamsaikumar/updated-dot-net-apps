import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
//import $ from "jquery";
import prev from "../assets/img/Icons/Icons/prev.png";
import { Link } from "react-router-dom";
import MainImg from "../assets/img/signin2.png";
import { Url } from "./url";
import ReCAPTCHA from "react-google-recaptcha";

const Register1 = () => {
  const short_link = Url();
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [cpin, setCpin] = useState("");
  const [state, setState] = useState(false);
  const [storename, setStoreName] = useState();
  const [preferredstore, setPreferredstore] = useState("");
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const [portercard, setPortercard] = React.useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = React.createRef();
  const your_recaptcha_site_key = "6LfuSe0UAAAAAPpN6U1CpCIDQm3dV9SWIkrOX0Iv";

  var flag = 0;
  localStorage.setItem("subdomain", process.env.REACT_APP_SUBDOMAIN); //this variable helps not to make dublicate Users

  useEffect(() => {
    if (localStorage.getItem("dfn"))
      //dummy first name
      setFirstname(localStorage.getItem("dfn"));
    if (localStorage.getItem("dln"))
      //dummy last name
      setLastname(localStorage.getItem("dln"));
    if (localStorage.getItem("dpn"))
      //dummy phone number
      setPhonenumber(localStorage.getItem("dpn"));
    if (localStorage.getItem("dzc"))
      //dummy zip code
      setZipcode(localStorage.getItem("dzc"));
    if (localStorage.getItem("de"))
      // dummy email
      setEmail(localStorage.getItem("de"));
  }, []);

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
        // console.log("data i get is ", data);
        setStoreName(data);
      });
  }, []);

  useEffect(() => {
    if (storename?.message?.length == 1)
      setPreferredstore(storename.message[0]);
  }, [storename?.message?.length]);

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

  function setData(e) {
    if (
      !firstname ||
      !lastname ||
      !zipcode ||
      !pin ||
      !cpin ||
      !preferredstore ||
      preferredstore === "Prefered Stores" ||
      !email
    ) {
      if (!firstname) {
        M.toast({
          html:
            FrenchLang === "true"
              ? "Entrez votre prénom s'il vous plait ."
              : "Please enter your First Name .",
          classes: "#c62828 red darken-3",
        });
        return;
      } else if (!lastname) {
        M.toast({
          html:
            FrenchLang === "true"
              ? "Veuillez entrer votre nom de famille ."
              : "Please enter your Last Name .",
          classes: "#c62828 red darken-3",
        });
        return;
      }
      // else if (!zipcode) {
      //   M.toast({
      //     html:
      //       FrenchLang === "true"
      //         ? "S'il vous plait, entrer votre code postal ."
      //         : "Please enter your Zip code .",
      //     classes: "#c62828 red darken-3",
      //   });
      //   return;
      // }
      else if (!preferredstore || preferredstore === "Prefered Stores") {
        M.toast({
          html:
            FrenchLang === "true"
              ? "Veuillez sélectionner votre magasin préféré ."
              : "Please select preferredstore .",
          classes: "#c62828 red darken-3",
        });
        return;
      }
      // else if (!email) {
      //   M.toast({
      //     html:
      //       FrenchLang === "true"
      //         ? "Veuillez saisir un e-mail ."
      //         : "Please enter email .",
      //     classes: "#c62828 red darken-3",
      //   });
      //   return;
      // }
      else if (phonenumber.length !== 10) {
        M.toast({
          html: "Enter a valid mobile number",
          classes: "#c62828 red darken-3",
        });
        return;
      } else if (!pin) {
        M.toast({
          html:
            FrenchLang === "true"
              ? "S'il vous plait entrez votre mot de passe ."
              : "Please enter your PIN .",
          classes: "#c62828 red darken-3",
        });
        return;
      } else if (!cpin) {
        M.toast({
          html:
            FrenchLang === "true"
              ? "Veuillez ressaisir le mot de passe."
              : "Please re-enter PIN .",
          classes: "#c62828 red darken-3",
        });
        return;
      }
    }
    // if (zipcode.length !== 5) {
    //   console.log(firstname.length);
    //   M.toast({
    //     html:
    //       FrenchLang === "true"
    //         ? "Entrez un code postal à 5 ​​chiffres"
    //         : "Enter a 5 digit Zip Code",
    //     classes: "#c62828 red darken-3",
    //   });
    //   return;
    // }

    if (pin.length < 4) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Entrez un code PIN à 4 chiffres"
            : "Enter a 4 digit PIN",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (state === false) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Veuillez accepter les termes et conditions en cliquant sur la case à cocher."
            : "Please agree terms and conditions by clicking the checkbox.",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (!recaptchaValue) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Veuillez accepter les termes et conditions en cliquant sur la case à cocher."
            : "The captcha field is required.",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    if (pin !== cpin) {
      M.toast({
        html:
          FrenchLang === "true"
            ? "Confirmer que le mot de passe ne correspond pas"
            : "Confirm PIN is not Matching",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    if (flag === 0) {
      flag = 1; //Now This part of code is not executed more than one time

      fetch(`${short_link}/storeid`, {
        //fetch('/storeid',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: preferredstore,
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((result) => result.json())
        .then((data2) => {
          console.log("data is ", data2);
          console.log("id is ", data2.message[0].ClientStoreId);

          fetch(
            // `${short_link}/Register1`,
            `${process.env.REACT_APP_LOGIN_BACKEND_MAIN_URL}/RegisterWithPhoneNumber`,
          
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                domainname: process.env.REACT_APP_SUBDOMAIN,
              },
              body: JSON.stringify({
                // firstname,
                // lastname,
                // phonenumber,
                // zipcode,
                // preferredstore,
                // email,
                // pin,
                // storeid: data2.message[0].ClientStoreId,
                // subdomain: localStorage.getItem("subdomain"),
                ClientStoreId: data2.message[0].ClientStoreId,
                CustomerId: 1,
                DeviceId: 1,
                DeviceType: "",
                ExistingMemberNumber: "String content",
                FirstName: firstname,
                LastName: lastname,
                Password: pin,
                PhoneNumber: phonenumber,
                UserName: "",
                UserRoleName: "",
                UserTypeId: 1,
                ZipCode: zipcode,
              }),
            }
          )
            .then((data) => data.json())
            .then((res) => {
              // console.log(res);
              // console.log(res.ErrorMessage.ErrorCode);

              if (res.ErrorMessage.ErrorCode == 1) {
                M.toast({
                  html:
                    FrenchLang === "true"
                      ? "Utilisateur enregistré avec succès, veuillez vous connecter maintenant"
                      : "User Registered successfull, Please login now",
                  classes: "#43a047 green darken-1",
                });
                localStorage.removeItem("dfn");
                localStorage.removeItem("dln");
                localStorage.removeItem("dpn");
                localStorage.removeItem("dzc");
                localStorage.removeItem("de");
                history.push("/Signin2");
              } else if (res.ErrorMessage.ErrorCode == -1) {
                flag = 0;
                M.toast({
                  html: res.ErrorMessage.ErrorDetails,
                  classes: "#c62828 red darken-3",
                });
                return;
              } else {
                flag = 0;
                M.toast({
                  html:
                    FrenchLang === "true"
                      ? "Quelque chose ne va pas "
                      : "Something is wrong ",
                  classes: "#c62828 red darken-3",
                });
                return;
              }
            })
            .catch((err) => {
              M.toast({
                html:
                  FrenchLang === "true"
                    ? "Quelque chose ne va pas ..."
                    : "Something is wrong ...",
                classes: "#c62828 red darken-3",
              });
              console.log("error is arise in setData() the error is ", err);
              flag = 0;
            });
        });
    } // end of If command
  }

  function move() {
    history.push("/Signin2");
  }

  function fun() {
    console.log(state);
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

  function adddummydata() {
    localStorage.setItem("dfn", firstname);
    localStorage.setItem("dln", lastname);
    localStorage.setItem("dpn", phonenumber);
    localStorage.setItem("dzc", zipcode);
    localStorage.setItem("de", email);
  }

  const onChangeReCaptcha = (value) => {
    setRecaptchaValue(value);
    setCaptchaError("");
  };

  return (
    <div>
      <div className="container">
        <div className={`mt-3 register-title ${isSticky ? "sticky-menu" : ""}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-center prev-icon">
              <Link to="/" className="text-decoration-none">
                {/* <p><Link to="/Signin2" className="text-decoration-none"><i style={{margin:"-5px"}} className="fa fa-angle-left fa-angle-left-reg" aria-hidden="true">
                        </i></Link></p> */}
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </Link>
            </div>
            <img
              src={portercard}
              alt=""
              className="MainImgSmall-s1 mt-3 mb-4"
              height="15%"
              style={{ margin: "auto" }}
            />
          </div>
        </div>
        <div className="mt-5 col-sm-11-my head-title text-center">
          <h3 className="signin1-h1 ">
            {FrenchLang === "true" ? "Enregistrer" : "Register"}
          </h3>
        </div>
      </div>
      <div className="register1-page p-4 mt-2 col-xl-6 col-12 m-auto">
        <div className="row ">
          <div className="col-sm-12">
            <div className="">
              <form className="register1-form">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {" "}
                        {FrenchLang === "true" ? "Prénom" : "First Name"}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true" ? "Prénom" : "First Name"
                        }
                        value={firstname}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {" "}
                        {FrenchLang === "true" ? "Nom de famille" : "Last Name"}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        value={lastname}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true" ? "Nom de famille" : "Last Name"
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {FrenchLang === "false"
                          ? "Magasins préféré"
                          : "Prefered Store"}{" "}
                      </label>
                      <select
                        style={{ color: "black" }}
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          setPreferredstore(e.target.value);
                        }}
                      >
                        <option default selected>
                          {FrenchLang === "false"
                            ? "Magasins préférés"
                            : "Prefered Stores"}
                        </option>
                        {storename ? (
                          storename.message?.length == 1 ? (
                            <>
                              <option default selected>
                                {storename.message[0]}
                              </option>
                            </>
                          ) : (
                            <>
                              {storename.message.map((item, i) => {
                                return (
                                  <option style={{ width: "100%" }} key={i}>
                                    {item}
                                  </option>
                                );
                              })}
                            </>
                          )
                        ) : (
                          <>
                            <option default selected>
                              {FrenchLang === "true"
                                ? "Magasins préférés"
                                : "Prefered Stores"}
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        {" "}
                        {FrenchLang === "true" ? "Code postal" : "Zip Code"}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        value={zipcode}
                        onChange={(e) => {
                          if (!isNaN(e.target.value))
                            setZipcode(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true" ? "Code postal" : "Zip Code"
                        }
                        maxLength={5}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="form-group">
                  <label for="exampleInputEmail1" className="required">
                    {" "}
                    {FrenchLang === "true" ? "Adresse e-mail" : "Email Address"}
                  </label>
                  <input
                    style={{ color: "black" }}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={
                      FrenchLang === "true" ? "Adresse e-mail" : "Email Address"
                    }
                  />
                </div> */}
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {" "}
                        {FrenchLang === "true"
                          ? "Numéro de téléphone"
                          : "Phone Number"}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        value={phonenumber}
                        onChange={(e) => {
                          if (!isNaN(e.target.value))
                            setPhonenumber(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true"
                            ? "Numéro de téléphone"
                            : "Phone Number"
                        }
                        maxLength={10}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {" "}
                        {FrenchLang === "true" ? "Épingle" : "PIN"}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="password"
                        value={pin}
                        onChange={(e) => {
                          if (!isNaN(e.target.value)) setPin(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="4 digit PIN"
                        maxLength={4}
                        minLength={4}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 col-12">
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="required">
                        {FrenchLang === "true"
                          ? "Confirmer le code PIN"
                          : "Confirm PIN"}{" "}
                      </label>
                      <input
                        style={{ color: "black" }}
                        type="password"
                        value={cpin}
                        onChange={(e) => {
                          if (!isNaN(e.target.value)) setCpin(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={
                          FrenchLang === "true"
                            ? "Confirmer le code PIN"
                            : "Confirm PIN"
                        }
                        maxLength={4}
                        minLength={4}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="form-check px-3 mt-3 ml-0"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        style={{
                          opacity: "1",
                          transform: "scale(1.5)",
                          transformOrigin: "0 bottom",
                          pointerEvents: "all",
                        }}
                        value={state}
                        onChange={(e) => {
                          setState(e.target.checked);
                        }}
                        onClick={fun}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setData(e);
                          }
                        }}
                      />
                      <label
                        onClick={fun}
                        className="form-check-label font-weight-light checkout-label policy-lable"
                        style={{ opacity: "0.8", marginLeft: "10px" }}
                        htmlFor="exampleCheck1"
                      >
                        {FrenchLang === "true"
                          ? "Acceptez notre"
                          : "I Agree to our"}
                        <Link
                          onClick={adddummydata}
                          to="/Termsandcondition"
                          className="text-decoration-none"
                        >
                          {" "}
                          {FrenchLang === "true"
                            ? "Termes et conditions"
                            : "Term's & Conditions"}{" "}
                        </Link>
                        {FrenchLang === "true" ? "et" : "and"}
                        <Link
                          onClick={adddummydata}
                          to="/Privacypolicy"
                          className="text-decoration-none"
                        >
                          {" "}
                          {FrenchLang === "true"
                            ? "politique de confidentialité"
                            : "Privacy Policy"}
                        </Link>
                        .
                      </label>
                    </div>
                  </div>
                </div>
                <div className="recaptcha-wrap">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={your_recaptcha_site_key}
                    onChange={onChangeReCaptcha}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-12 bottom-btn-font mt-2">
            <div className="register-button">
              <button
                type="button"
                className="btn theme-btn w-100 mt-3"
                onClick={setData}
              >
                {FrenchLang === "true" ? "Enregistrer" : "Register"}
              </button>
              <button
                type="button"
                className="btn cancel-border w-100 mt-3"
                onClick={move}
              >
                {FrenchLang === "true" ? "Annuler" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register1;
