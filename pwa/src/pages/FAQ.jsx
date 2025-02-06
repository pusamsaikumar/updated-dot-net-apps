import React, { useEffect , useState } from "react";
import M from "materialize-css";
import Sidebar from "./Sidebar"; //import $ from "jquery";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MainImg from "../assets/img/reset15.png";
import prev from "../assets/img/Icons/Icons/prev.png";

const FAQ = () => {
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
          <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/ContactUs">
                <img src={prev} width="30%" alt="" className="backOrHomebutton"/>
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">FAQ</h5>
            </div>
          </div>

          <div style={{ marginTop: "30%" }}>
            <p className="text-center">
              {FrenchLang === "true"
                ? "AUCUN CONTENU À AFFICHER"
                : "NO CONTENT TO DISPLAY"}
            </p>
          </div>
        </div>
      </div>
    </div>
    // <p style={{width:"100%",textAlign:"center",marginTop:"40%"}}>No Content to display</p>
  );
};

export default FAQ;
