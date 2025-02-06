import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar"; //import $ from "jquery";

import { Link } from "react-router-dom";
import M from "materialize-css";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Image1 from "../assets/img/Icons/Icons/msg.png";
import Cross from "../assets/img/Icons/Icons/delete_button.png";

import Image2 from "../assets/img/Icons/Icons/imageC2.png";
import Image3 from "../assets/img/Icons/Icons/imageC3.png";
import Image4 from "../assets/img/Icons/Icons/imageC4.png";

import Imageb1 from "../assets/img/Icons/Icons/bagde-hero.png";

import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import RedL from "../assets/img/Icons/Icons/sm-barcode.png";

import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";

import LPin from "../assets/img/Icons/Icons/Lpin.png";
import Footer from "../pages/footer";
import Cardskeleton2 from "../pages/Skeleton2";
import { Url } from "./url";

const Messages = () => {
  const [message, setmessage] = useState();
  const [messageid, setmessageid] = useState({});
  const [state, setstate] = useState(true);
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    var customerid = localStorage.getItem("customerid");
    fetch(`${short_link}/getClientMessage`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        customerid: customerid,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data of message is ", data);

        if (data.message.ErrorMessage.ErrorCode === 1) {
          setmessage(data);
        } else {
          console.log("NO Message to Display");
          setmessage(data);
        }
      })
      .catch((err) => {
        console.log("err is arise in get message");
      });
  }, [state]);

  function deletemessage() {
    var token = localStorage.getItem("Shopping_token");
    var id = messageid.id;
    fetch(`${short_link}/deletemessage`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        messageid: id,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message.ErrorMessage.ErrorCode === 1) {
          M.toast({
            html:
              FrenchLang === "true"
                ? "Supprimé avec succès..."
                : "successfully Deleted ...",
            classes: "#43a047 green darken-1",
          });
          setstate(!state);
        } else
          M.toast({
            html:
              FrenchLang === "true"
                ? "Une erreur s'est produite lors de la suppression d'un message"
                : "Some error is occured during deleting a message",
            classes: "#c62828 red darken-3",
          });
      })
      .catch((err) => {
        console.log("err is come and the error is ", err);
      });
  }

  return (
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className="row mt-3 mb-2 align-items-center">
            <div className="col-sm-1-my17 ">
              <Sidebar />
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">Messages</h5>
            </div>
          </div>

          <div className="row ">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />
              <div className="container-fluid">
                <div className="row    scroll-inner ">
                  <div className="col-sm-12 mt-3">
                    {!message ? (
                      <>
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                      </>
                    ) : (
                      message.message.GetClientMessages.map((item, i) => {
                        return (
                          <Link
                            onClick={() => {
                              setmessageid({
                                id: item.MessageId,
                                detail: item.Details,
                                title: item.Title,
                              });
                            }}
                            href=""
                            className="text-decoration-none "
                            data-toggle="modal"
                            data-target="#exampleModal"
                            key={i}
                          >
                            <div className="row">
                              <div className="circle-outer p-1 my-auto">
                                <img
                                  src={Image1}
                                  alt=""
                                  className="circle-inner"
                                />
                              </div>

                              {/* <div style={{padding:"5%"}} className="w-75 "> */}

                              <div style={{ width: "86%", padding: "5%" }}>
                                {" "}
                                {/*  i simply remove the w-75 class */}
                                <p className="my-auto text-dark mb-0">
                                  <small
                                    style={{ color: "blue" }}
                                    className="font-weight-bold"
                                  >
                                    {item.Title.substr(0, 70)}...
                                  </small>
                                </p>
                                <p className="text-dark font12-message mb-0">
                                  {item.Details.substr(0, 100)}...
                                </p>
                              </div>
                              <span className=" font12-message bg-light-st mt-1 d-none">
                                7:30 AM
                              </span>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/*---------------------------------- modal box ---------------------------------- */}

              <div
                style={{
                  maxHeight: "100%",
                  background: "rgba(255, 255, 255, 0)",
                }}
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog"
                  role="document"
                  style={{ position: "relative", top: "31%" }}
                >
                  <div
                    className="modal-content modal-content-message "
                    style={{ padding: "0px", borderRadius: "25px" }}
                  >
                    <div className="modal-body">
                      <div className="text-center">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <p className=" ">
                          <small>{messageid.title}</small>
                        </p>
                      </div>
                      <p className="font12-message-model ">
                        {messageid.detail}
                      </p>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        onClick={deletemessage}
                        type="button"
                        className="btn btn-outline-danger py-0 w-25 text-center"
                        id="modal1"
                        data-dismiss="modal"
                      >
                        {FrenchLang === "true" ? "Supprimer" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------END OF MODAL BOX---------------------------- */}
            </div>
          </div>
        </div>
      </div>
      <Footer name="profile" />
    </div>
  );
};

export default Messages;
