import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import M from "materialize-css";
import L from "leaflet";
import locationicon from "../assets/img/locationpin.png";
import { render } from "@testing-library/react";
import data from "./Polygon.js";

const Locationdetail = () => {
  const history = useHistory();
  console.log("data os polygon is ", data);
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  useEffect(() => {
    if (!history.location.state) history.push("/location");
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("Shopping_token")) history.push("/Signin2");
  }, []);

  function changestore() {
    const firstname = JSON.parse(localStorage.getItem("data")).firstname;
    const lastname = JSON.parse(localStorage.getItem("data")).lastname;
    const id = history.location.state.ClientStoreId;
  }

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  function getthecordinate() {
    return data;
  }

  function success(position) {
    console.log("this is a user current position ", position);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);

    let mapoption = {
      center: [51.505, -0.09],
      zoom: 2,
    };

    // create a map
    var map = L.map("map", mapoption);

    //create a tile layer
    let layer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    //add layer to the map
    layer.addTo(map);

    // let markableoption = {
    //     title:"my location",
    //     clickable:true,
    //     draggable:true
    // }

    //Now work on the marker
    // let marker = L.marker([lat,long],markableoption);
    // marker.addTo(map);

    var circle = L.circle([51.508, -0.11], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 1000,
    });
    circle.addTo(map);

    var polygon = L.polygon(
      [
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ],
      { color: "red", fillColor: "#f03", fillOpacity: 0.5 }
    );
    polygon.addTo(map);

    var list = getthecordinate();
    var poly = L.geoJSON(list);
    poly.addTo(map);
  }

  function error(e) {
    console.log("Unable to fetch the location the error code is ", e);
  }

  window.addEventListener("load", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("geo location is not supported by your browser");
    }
  });

  return (
    <div>
      {check_the_user()}
      <div style={{ backgroundColor: "rgb(52, 58, 64)", height: "91vh" }}>
        <div
          className="bg-white bg-bottom-round"
          style={{ overflow: "auto", borderRadius: "0px", height: "100vh" }}
        >
          <div className="container page17 text-center">
            <div className="row mt-3">
              <div className="text-center">
                <Link to="/location">
                  <img src={prev} width="30%" alt="" />
                </Link>
              </div>
              <div className="col-sm-11-my17 text-center ">
                <h5 className=" signin1-h1-top  mb-0">
                  {history.location.state ? history.location.state.City : ""}
                </h5>
              </div>
            </div>
            <br />

            {/* <h5 style={{textAlign:"center",margin:"2rem"}}>{history.location.state?history.location.state.AddressLine1:""}</h5>
                    <h5 style={{textAlign:"center",margin:"3%"}}>Phone :{history.location.state?<h5 style={{display:"inline-block",marginLeft:"2%"}}>({history.location.state.StorePhoneNumber.substr(0,3)}) {history.location.state.StorePhoneNumber.substr(3,3)}-{history.location.state.StorePhoneNumber.substr(6,4)}</h5>:""}</h5> */}
            {/* <img src={locationicon} style={{height:"400px"}}/> */}
            <div id="map" style={{ height: "600px" }}></div>
            <h5 style={{ textAlign: "left", margin: "3%", marginLeft: "6%" }}>
              Hours :
            </h5>
            <h5 style={{ textAlign: "center", margin: "3%" }}>
              {history.location.state
                ? history.location.state.StoreTimings
                : ""}
            </h5>
          </div>
        </div>
      </div>
      <h3
        onClick={() => {
          changestore();
        }}
        className="mt-4"
        style={{ textAlign: "center", color: "#9e3a3ad6" }}
      >
        {FrenchLang === "true" ? "CRÉER MON MAGASIN" : "MAKE MY STORE"}
      </h3>
    </div>
  );
};

export default Locationdetail;
