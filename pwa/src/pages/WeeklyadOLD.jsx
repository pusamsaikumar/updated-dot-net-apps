import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ImgC1 from "../assets/img/Icons/Icons/ImgC1.png";
import ImgC2 from "../assets/img/Icons/Icons/ImgC2.png";
import ImgC3 from "../assets/img/Icons/Icons/ImgC3.png";

import Footer from "../pages/footer";
import Sidebar from "./Sidebar";
import Cardskeleton2 from "../pages/Skeleton2";
import { Url } from "./url";

const Weeklyadd = () => {
  const history = useHistory();
  const short_link = Url();
  console.log("the history of the demo is ", history);

  const [state, setstate] = useState();

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token")
      ? localStorage.getItem("Shopping_token")
      : localStorage.getItem("Guest_token");
    fetch(`${short_link}/weeklyadd`, {
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
        console.log("data of weekly add is ", data);
        if (data.message.ErrorMessage.ErrorCode === 1) {
          setstate(data);
        } else {
          setstate("");
        }
      })
      .catch((err) => {
        console.log("the error is arise and the error is ", err);
      });
  }, []);

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  return (
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      {check_the_user()}
      <div
        className="bg-white bg-bottom-round"
        style={{ overflow: "hidden" }}
      >
        <div className="container page17">
          <div className="row mt-3 mb-2 align-items-center">
            <div className="text-center prev-icon">
              <Sidebar />
            </div>

            <div className="col-sm-11-my17 text-center ">
              <h3 className=" signin1-h1-top  mb-0">Weekly Ad</h3>
            </div>
          </div>

          <div
            style={{ width: "100%", height: "80vh", boxSizing: "border-box" }}
          >
            <div style={{ display: "flex", overflow: "auto" }}>
              {!state ? (
                <>
                  {" "}
                  <div style={{ display: "block", width: "100%" }}>
                    <p style={{ position: "centre" }}>
                      No Weekly ads, Come back later..
                    </p>
                  </div>
                </>
              ) : (
                state.message.GalleryItems.map((item, i) => {
                  return (
                    <img
                      src={item.URL}
                      alt="Advertisement"
                      style={{ height: "78vh", width: "100%" }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer name="fhb" />
    </div>
  );
};

export default Weeklyadd;
