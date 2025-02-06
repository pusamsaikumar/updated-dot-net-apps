import React, { useEffect , useState} from "react";
//import $ from "jquery";

import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";
import ImageP from "../assets/img/Icons/Icons/privacypolicy.png";
import ImageT from "../assets/img/Icons/Icons/termsandcondition.png";
import prev from "../assets/img/Icons/Icons/prev.png";
import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";
import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Footer from "../pages/footer";
import phoneimage from "../assets/img/phoneimage2.png";
import Sidebar from "./Sidebar";
const ContactUs = () => {
  const history = useHistory();
  const FrenchLang = localStorage.getItem("FrenchLanguage");
  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])

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
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              {/* <p className="mb-0"><Link to="/" className="text-decoration-none"><img src={Barside} className="Barside" alt="" /></Link></p> */}
              {localStorage.getItem("Shopping_token") ? (
                <Sidebar />
              ) : (
                <div className=" text-center" style={{ width: "100%" }}>
                  <Link to="/" className="">
                    <img
                      src={prev}
                      width="30%"
                      alt=""
                      className="backOrHomebutton"
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Contactez-nous et mentions légales"
                  : "Contact Us & Legal"}
              </h5>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />

              <div className="row">
                <div className="col-sm-12">
                  <div
                    onClick={() => {
                      history.push("/contactresult");
                    }}
                    className="btn-light  p-3 contact-card  mt-2 "
                  >
                    <p className="mb-0">
                      <span>
                        <img
                          src={phoneimage}
                          alt=""
                          className="Contact-cardimg-sm"
                        />
                      </span>
                      <span className="contact-card-mid-info">
                        {FrenchLang === "true" ? "Contact" : "Contact"}
                      </span>
                      <i
                        className="fa fa-angle-right float-right"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>

                  {/* <div onClick={()=>{history.push("/Faq")}} className="btn-light  p-3 contact-card  mt-2 ">
                                        <p className="mb-0"><span><img src={ImageR} alt="" className="Contact-cardimg-sm" /></span><span className="contact-card-mid-info">FAQ</span><i className="fa fa-angle-right float-right" aria-hidden="true"></i></p>
                                    </div> */}

                  <div
                    onClick={() => {
                      history.push({
                        pathname: "/Privacypolicy",
                        name: "contactus",
                      });
                    }}
                    className="btn-light  p-3 contact-card  mt-2 "
                  >
                    <p className="mb-0">
                      <span>
                        <img
                          src={ImageP}
                          alt=""
                          className="Contact-cardimg-sm"
                        />
                      </span>
                      <span className="contact-card-mid-info">
                        {FrenchLang === "true"
                          ? "politique de confidentialité"
                          : "Privacy Policy"}
                      </span>
                      <i
                        className="fa fa-angle-right float-right"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      history.push({
                        pathname: "/Termsandcondition",
                        name: "contactus",
                      });
                    }}
                    className="btn-light  p-3 contact-card  mt-2 "
                  >
                    <p className="mb-0">
                      <span>
                        <img
                          src={ImageT}
                          alt=""
                          className="Contact-cardimg-sm"
                        />
                      </span>
                      <span className="contact-card-mid-info">
                        {FrenchLang === "true"
                          ? "Termes et conditions"
                          : "Terms and Conditions"}
                      </span>
                      <i
                        className="fa fa-angle-right float-right"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="btn-light  p-3 contact-card  mt-2 "
                  >
                    <p className="mb-0">
                      <span>
                        <img
                          src={ImageQ}
                          alt=""
                          className="Contact-cardimg-sm"
                        />
                      </span>
                      <span className="contact-card-mid-info">
                        {FrenchLang === "true" ? "Abonnement" : "Subscription"}
                      </span>
                      <i
                        className="fa fa-angle-right float-right"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div
                    style={{ display: "none" }}
                    onClick={() => {
                      history.push("/Chatwithus");
                    }}
                    className="btn-light  p-3 contact-card  mt-2 "
                  >
                    <p className="mb-0">
                      <span>
                        <img
                          src={ImageC}
                          alt=""
                          className="Contact-cardimg-big-sm"
                        />
                      </span>
                      <span className="contact-card-mid-info">
                        {FrenchLang === "true"
                          ? "Discute avec nous"
                          : "Chat with us"}
                      </span>
                      <i
                        className="fa fa-angle-right float-right"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
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

export default ContactUs;
