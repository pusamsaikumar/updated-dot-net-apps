import React, { useEffect , useState } from "react";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import M from "materialize-css";
import locationicon from "../assets/img/locationpin.png";
import { Url } from "./url";

const Locationdetail = () => {
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  const short_link = Url();
  console.log(history);

  useEffect(() => {
    if (!history.location.state) history.push("/location");
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("Shopping_token"))
      if (!localStorage.getItem("Guest_token")) history.push("/Signin2");
  }, []);

  function changestore() {
    console.log("hello world");

    const firstname = JSON.parse(localStorage.getItem("data"))?.firstname;
    const lastname = JSON.parse(localStorage.getItem("data"))?.lastname;
    const id = history.location.state.ClientStoreId;

    fetch(`${short_link}/changedprefferedstore`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ClientStoreId: id,
        FirstName: firstname,
        LastName: lastname,
        UserToken: localStorage.getItem("Shopping_token")
          ? localStorage.getItem("Shopping_token")
          : localStorage.getItem("Guest_token"),
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result is ", result);
        if (result.message.ErrorMessage.ErrorCode === 1) {
          console.log("executed");
          const ans = JSON.parse(localStorage.getItem("data"));
          console.log("ans is ", ans);
          // setStorename2(data.message[0].ClientStoreName)
          localStorage.setItem(
            "data",
            JSON.stringify({
              firstname: ans.firstname,
              lastname: ans.lastname,
              zipcode: ans.zipcode,
              mobilenumber: ans.phone,
              store: history.location.state.ClientStoreName,
              storeid: id,
              username: ans.username,
            })
          );
          M.toast({
            html:
              FrenchLang === "true"
                ? "Votre magasin préféré a bien été modifié"
                : "Your preffered store is changed successfully",
            classes: "#43a047 green darken-1",
          });
        }
      })
      .catch((err) => {
        M.toast({
          html:
            FrenchLang === "true"
              ? "Quelque chose s'est mal passé"
              : "Something Went Wrong",
          classes: "#c62828 red darken-3",
        });
        console.log(
          "err is arise inside the changedpreferedstore() and the err is ",
          err
        );
      });
  }

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      if (!localStorage.getItem("Guest_token")) history.push("/Signin2");
    } else {
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
    <div>
      {check_the_user()}
      <div style={{height:"100vh"}} className="location-detail">
        <div
          className="bg-white"
          style={{ overflow: "auto", borderRadius: "0px"}}
        >
          <div className="container page17 text-center">
            <div className={`row mt-3 ${isSticky ? 'sticky-menu' : ''}`} >
              <div className="text-center prev-icon">
                {/* <div
          style={{ width: "100%" }}></div> */}
                <Link to="/location">
                  <img src={prev}  width="30%" alt="" className="backOrHomebutton" />
                </Link>
              </div>
              <div className="col-sm-11-my17 text-center head-title">
                <h5 className=" signin1-h1-top  mb-0">
                  {history.location.state ? history.location.state.City : ""}
                </h5>
              </div>
            </div>
            <br />

              <img src={locationicon} style={{ height: "300px" }} />
      <h3
        onClick={() => {
          changestore();
        }}
        className="location-title"
        style={{ textAlign: "center", color: "#9e3a3ad6" }}
      >
        {FrenchLang === "true" ? "CRÉER MON MAGASIN" : "MAKE MY STORE"}
      </h3>
            <h5 style={{textAlign: "left" }}>
            <span class="location-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z"></path><circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3"></circle></svg></span>{history.location.state
                ? history.location.state.AddressLine1
                : ""}
            </h5>
            <h5 style={{ textAlign: "left" }}>
            <span class="phone-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611"></path></svg></span>
              {FrenchLang === "true" ? "Téléphone" : "Phone"}:
              {history.location.state ? (
                 <h5 style={{ display: "inline-block"}}>
                  ({history.location.state.StorePhoneNumber.substr(0, 3)}){" "}
                  {history.location.state.StorePhoneNumber.substr(3, 3)}-
                  {history.location.state.StorePhoneNumber.substr(6, 4)}
                </h5>
              ) : (
                ""
              )}
            </h5>
            <h5 style={{ textAlign: "left"}}>
            <span class="clock-icon"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"></circle><rect x="9" y="4" width="1" height="7"></rect><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625"></path></svg></span>{FrenchLang === "true" ? "Heures" : "Hours"}:
            </h5>
            <h5 style={{ textAlign: "left"}}>
              {history.location.state
                ? history.location.state.StoreTimings
                : ""}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locationdetail;

{
  /* ------------------------------------------------------------------------*/
}
