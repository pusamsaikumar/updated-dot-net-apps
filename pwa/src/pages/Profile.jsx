import React, { useEffect, useState } from "react";
//import $ from "jquery";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";

import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Footer from "../pages/footer";
import Sidebar from "./Sidebar";
import { Url } from "./url";
import Modal from "react-modal";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Checkout = () => {
  const history = useHistory();
  const short_link = Url();
  //const data = JSON.parse(localStorage.getItem("Shopping_token")===null?"":JSON.parse(localStorage.getItem("data")));
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [username, setusername] = useState("");
  const [store, setStore] = useState("");
  const [showModal, setShowModal] = useState(false);
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const [storename, setStoreName] = useState("");
  const [changethestore, setchangethestore] = useState("Select Store");
  const [membernumber, setmembernumber] = useState("");
  const [storeIdNum, setStoreIdNum] = useState();

  useEffect(() => {
    if (localStorage.getItem("Shopping_token")) {
      const data = JSON.parse(localStorage.getItem("data"));
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setPhoneNumber(
        data.mobilenumber ? data.mobilenumber : data.username.split("@")[0]
      );
      setZipCode(data.zipcode);
      setusername(data.username);
      setStore(data.store);
    }
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
        setStoreName(data);
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

  function changepreferedstore() {
    fetch(`${short_link}/storeid`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: store,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ", data);
        console.log("id is ", data.message[0].ClientStoreId);

        // const firstname = JSON.parse(localStorage.getItem("data")).firstname;
        // const lastname = JSON.parse(localStorage.getItem("data")).lastname;

        fetch(`${short_link}/changedprefferedstore`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ClientStoreId: data.message[0].ClientStoreId,
            FirstName: firstname,
            LastName: lastname,
            UserToken: localStorage.getItem("Shopping_token"),
            MobileNumber: phone,
            subdomain: localStorage.getItem("subdomain"),
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log("result after saving is ", result);
            if (result.message.ErrorMessage.ErrorCode === 1) {
              M.toast({
                html:
                  FrenchLang === "true"
                    ? "Les détails de l'utilisateur ont été mis à jour avec succès."
                    : "User details updated successfully.",
                classes: "#43a047 green darken-1",
              });
              setStore(data.message[0].ClientStoreName);
              localStorage.setItem(
                "data",
                JSON.stringify({
                  firstname: firstname,
                  lastname: lastname,
                  zipcode: zipcode,
                  mobilenumber: phone,
                  store: data.message[0].ClientStoreName,
                  storeid: data.message[0].ClientStoreId,
                  username: username,
                })
              );
            }
          })
          .catch((err) => {
            console.log(
              "err is arise inside the changedpreferedstore() and the err is ",
              err
            );
          });
      })
      .catch((err) => {
        console.log(
          "err is arise in changepreferredstore() in /storeid and the error is ",
          err
        );
      });
  }

  function changethebackground(e) {
    var a = document.getElementsByClassName("parent");
    for (let i = 0; i < a.length; i++) {
      a[i].style.backgroundColor = "white";
    }
    e.target.style.backgroundColor = "#ece6e6";
  }

  function deleteAccountHandler() {
    fetch(`${short_link}/DeleteUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        MemberNumber: localStorage.getItem("menberNumber").split('"').join(""),
        UserDetailId: localStorage.getItem("userDetailId"),
        UserToken: localStorage.getItem("Shopping_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message.ErrorMessage.ErrorCode == 1)
          M.toast({
            html:
              FrenchLang === "true"
                ? "Votre compte a été supprimé."
                : "Your account has been deleted.",
            classes: "#43a047 red darken-1",
          });
        localStorage.clear();
        sessionStorage.clear();
        history.push("/Signin2");
      })
      .catch((err) => {
        M.toast({
          html: err.message.message,
          classes: "#43a047 red darken-1",
        });
      });
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
            <div className="text-center">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true" ? "Profil" : "Profile"}
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
            <div className="col-md-10 col-sm-12 py-3 m-auto">
              {/* <hr className="mt-2" /> */}

              <div className="row m-auto">
                <div className="col-md-10 col-sm-12 m-auto">
                  <p className="text-red text-center mb-3">
                    {FrenchLang === "true"
                      ? "Membre fidélité"
                      : "Loyalty member"}{" "}
                    #: {phone ? phone : "----"}
                  </p>
                  {/*<p className="text-red text-center">MEMBER #: {membernumber?<p style={{display:"inline-block"}}>{membernumber}</p>:"-----"}</p>*/}
                  {/* <img
                    src={
                      localStorage.getItem("barcode")
                        ? localStorage.getItem("barcode")
                        : "----"
                    }
                    style={{
                      position: "relative",
                      left: "2%",
                      width: "100%",
                      height: "15%",
                    }}
                    className="List-checkout-barcode"
                    alt=""
                  /> */}

                  <div style={{ margin: "0px 2%" }}>
                    <form style={{ marginTop: "15px" }}>
                      <div
                        className="row profile-input"
                        style={{
                          marginTop: "22px",
                          marginLeft: "15px",
                        }}
                      >
                        <div className="col-md-5 col-sm-6 col-12">
                          <label style={{ fontStyle: "normal" }}>
                            {FrenchLang === "true" ? "Prénom" : "First Name"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // onChange={(e) => {
                            //   setFirstName(e.target.value);
                            // }}
                            disabled
                            value={firstname}
                            id="inputEmail4"
                            placeholder={
                              FrenchLang === "true" ? "Prénom" : "First Name"
                            }
                          />
                        </div>
                        <div className="col-md-5 col-sm-6 col-12">
                          <label style={{ fontStyle: "normal" }}>
                            {FrenchLang === "true"
                              ? "Nom de famille"
                              : "Last Name"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // onChange={(e) => {
                            //   setLastName(e.target.value);
                            // }}
                            disabled
                            value={lastname}
                            id="inputEmail4"
                            placeholder={
                              FrenchLang === "true"
                                ? "Nom de famille"
                                : "Last Name"
                            }
                          />
                        </div>
                      </div>

                      <div
                        className="row profile-input"
                        style={{
                          marginTop: "22px",
                          marginLeft: "15px",
                        }}
                      >
                        <div className="col-md-10 col-sm-12 col-12">
                          <label style={{ fontStyle: "normal" }}>
                            {FrenchLang === "true"
                              ? "Numéro de téléphone"
                              : "Phone Number"}
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled
                            // onChange={(e) => {
                            //   if (!isNaN(e.target.value))
                            //     setPhoneNumber(e.target.value);
                            // }}
                            value={phone}
                            id="inputEmail4"
                            placeholder={
                              FrenchLang === "true"
                                ? "Numéro de téléphone"
                                : "Phone Number"
                            }
                            maxLength={10}
                          />
                        </div>
                        {/* <div>
                          <label style={{ fontStyle: "normal" }}>
                            Zip Code
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={(e) => {
                              if (!isNaN(e.target.value))
                                setZipCode(e.target.value);
                            }}
                            value={zipcode}
                            id="inputEmail4"
                            placeholder="Zip code"
                            maxLength={5}
                          />
                        </div> */}
                      </div>

                      <div
                        className="row profile-input"
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        <div className="col-md-10 col-sm-12 col-12">
                          <label style={{ fontStyle: "normal" }}>
                            {FrenchLang === "true"
                              ? "Nom d'utilisateur"
                              : "User Name"}
                          </label>
                          <input
                            style={{ width: "100%" }}
                            value={username.split("@")[0]}
                            onChange={(e) => {}}
                            type="email"
                            disabled
                            // className="form-control"
                            id="inputEmail4"
                            placeholder="E-mail"
                          />
                        </div>

                        <a
                          href="#"
                          style={{
                            margin: "auto",
                            color: "red",
                            display: "none",
                          }}
                        >
                          {FrenchLang === "true" ? "Changement" : "Change"}
                        </a>
                      </div>
                      <div
                        className="row profile-input"
                        style={{
                          marginTop: "6px",
                        }}
                      >
                        <div className="col-md-10 col-sm-12 col-12">
                          <label style={{ fontStyle: "normal" }}>
                            {FrenchLang === "true" ? "Magasin" : "Store"}
                          </label>
                          <textarea
                            className="profile-store"
                            style={{ width: "100%" }}
                            value={store}
                            type="text"
                            // className="form-control"
                            id="inputEmail4"
                            placeholder="Please select your Preferred store"
                            disabled
                          />
                        </div>

                        {/* <Link onClick={()=>{console.log("you pressed me")}} href="#" style={{margin:"auto",color:"red"}}>Change</Link> */}
                        {/* <div
                          className="col-sm-3-my17-C text-center "
                          style={{ margin: "auto" }}
                        >
                          <a
                            className="text-dark fw500"
                            data-toggle="modal"
                            data-target="#exampleModal1"
                          >
                            <span style={{ fontSize: "14px", color: "red" }}>
                              {FrenchLang === "true" ? "Changement" : "Change"}
                            </span>
                          </a>
                        </div> */}
                      </div>

                      {/* -------------------Modal Box------------------------------ */}

                      {/* <div style={{ maxHeight:"100%", background: "rgba(255, 255, 255, 0)"}} className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
                      <div
                        style={{
                          maxHeight: "100%",
                          background: "rgba(255, 255, 255, 0)",
                        }}
                        className="modal fade"
                        id="exampleModal1"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div
                            className="modal-content modal-content-message rounded-lg-15"
                            style={{ marginTop: "50%", padding: "0px" }}
                          >
                            <div className="modal-body p-0 ">
                              <p className="bg-danger text-white text-center py-3 rounded-lg-15-lrt">
                                {changethestore}
                              </p>
                              <ul className="list-group list-group-flush px-3 text-center">
                                {storename ? (
                                  <>
                                    {storename.message.map((item, i) => {
                                      //console.log("item hai bhai ",item);
                                      return (
                                        <li
                                          key={i}
                                          id={i}
                                          onClick={(e) => {
                                            setchangethestore(item);
                                            changethebackground(e);
                                            setStoreIdNum(i + 1);
                                          }}
                                          className="list-group-item border-top-0 parent"
                                        >
                                          {item}
                                        </li>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <>
                                    <li className="list-group-item border-top-0">
                                      <a
                                        href=""
                                        className="text-decoration-none text-dark"
                                      >
                                        Big Bazaar{" "}
                                        {FrenchLang === "true"
                                          ? "Magasin"
                                          : "Store"}
                                      </a>
                                    </li>
                                  </>
                                )}
                              </ul>
                              <div className="text-center px-3 mb-3 mt-1">
                                <button
                                  onClick={() => {
                                    setStore(changethestore);
                                    localStorage.setItem("storeId", storeIdNum);
                                  }}
                                  type="button"
                                  className="btn btn-success py-1 w-100"
                                  data-dismiss="modal"
                                >
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* -------------------End of Modal Box------------------------------ */}
                      <div className="col-md-10 col-sm-12 bottom-btn-font mt-2 text-center">
                        {/* <button
                          onClick={() => {
                            if (phone.length == 10) changepreferedstore();
                            else
                              M.toast({
                                html: "Please enter 10 digit phone number.",
                                classes: "#43a047 green darken-1",
                              });
                          }}
                          type="button"
                          className="btn btn-success w-100 mt-3 pt-1 pb-1 "
                        >
                          <small>
                            {FrenchLang === "true" ? "Sauvegarder" : "Save"}
                          </small>
                        </button> */}
                        <div className="row mx-auto mb-2">
                          <div className="col-12  pl-0 pr-1">
                            {/* <button
                              onClick={() => {
                                history.push("/Reset15");
                              }}
                              type="button"
                              className="btn btn-outline-danger w-100 px-0 mt-2 py-0 text-center"
                            >
                              {FrenchLang === "true"
                                ? "Changer le mot de passe"
                                : "Change PASSWORD"}
                            </button> */}
                          </div>
                          {/* <div className="col pr-0 pl-1">
                            <button
                              type="button"
                              className="btn btn-outline-danger w-100 mt-2 py-0 text-center"
                            >
                              <small
                                className="fw600"
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
                                Sign out
                              </small>
                            </button>
                          </div> */}
                        </div>
                        {/* <button
                          onClick={() => setShowModal(true)}
                          type="button"
                          className="btn btn-outline-danger w-100 mt-2 py-0 text-center"
                        >
                          <i
                            className="fa fa-trash text-danger pr-2"
                            aria-hidden="true"
                          ></i>
                          {FrenchLang === "true"
                            ? "Supprimer le compte"
                            : "Delete Account"}
                        </button> */}
                      </div>
                      <br />
                      <h6 style={{ float: "left", display: "none" }}>
                        {FrenchLang === "true" ? "Soutien" : "Support"}
                      </h6>
                      <h6 style={{ float: "right", display: "none" }}>
                        {FrenchLang === "true"
                          ? "Juridique et confidentialité"
                          : "Legal And Privacy"}
                      </h6>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="profile" />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{FrenchLang === "true" ? "Es-tu sûr ?" : "Are you sure ?"}</h2>
          <button
            onClick={() => setShowModal(false)}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <i
              className="fa fa-times"
              style={{ fontSize: "24px" }}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <hr />
        <p>
          {FrenchLang === "true"
            ? "En supprimant le compte, vous perdrez tout votre historique et votre récompense points etc. Êtes-vous sûr de vouloir supprimer le compte ?"
            : "By deleting the account you will loose all your histroy and reward points etc. Are you sure you want to delete account ?"}
        </p>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            onClick={() => {
              deleteAccountHandler();
              setShowModal(false);
            }}
            className="btn btn-danger"
          >
            {FrenchLang === "true" ? "Confirmer" : "Confirm"}
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-secondary"
          >
            {FrenchLang === "true" ? "Annuler" : "Cancel"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
