import React, { useEffect } from "react";
import Footer from "../pages/footer";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import "../my.css";

const Privacypolicy = () => {
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  function fun() {
    var node = document.createElement("P");
    var data = document.getElementById("mytext").value;
    var textnode = document.createTextNode(data);
    node.appendChild(textnode);
    node.classList.add("t1");
    document.getElementById("chat_area").appendChild(node);
    document.getElementById("mytext").value = "";
  }

  return (
    <div>
      {check_the_user()}
      <div
        className="bg-white bg-bottom-round p1"
        style={{ overflow: "auto" }}
      >
        <div className="container page17">
          <div className="row mt-3 mb-2 align-items-center">
            <div
              className="col-sm-1-my17 text-center"
              style={{ backgroundColor: "white" }}
            >
              <Link to="/Contactus">
                <img src={prev} width="30%" alt="" />
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center ">
              <h5 className=" signin1-h1-top  mb-0" style={{ color: "white" }}>
                {FrenchLang === "true" ? "Discute avec nous" : "Chat with us"}
              </h5>
            </div>
          </div>

          <div style={{ marginTop: "15%", height: "78vh", maxWidth: "400px" }}>
            <div
              id="chat_area"
              style={{
                overflow: "auto",
                height: "78%",
                backgroundColor: "beige",
                padding: "5%",
                boxSizing: "border-box",
                borderRadius: "25px   25px 0px 0px",
                marginBottom: "2%",
              }}
            ></div>

            <div
              style={{
                height: "20%",
                backgroundColor: "#ffb700b5",
                padding: "5%",
                boxSizing: "border-box",
                borderRadius: "0px 0px 25px 25px",
              }}
            >
              <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
                <div style={{ margin: "0px", padding: "0px", height: "60%" }}>
                  <textarea type="textarea" id="mytext" />
                </div>

                <div>
                  <button
                    onClick={fun}
                    type="button"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    {FrenchLang === "true" ? "Envoyer" : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacypolicy;
