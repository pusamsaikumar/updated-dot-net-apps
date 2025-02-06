import React, { useEffect , useState } from "react";
import Footer from "../pages/footer";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";

const Forgot = () => {
  const history = useHistory();
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
    <div style={{ backgroundColor: "rgb(52, 58, 64)" }}>
      {/* <h5>Hello</h5> */}
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center ${isSticky ? 'sticky-menu' : ''}`} >
            <div className="text-center prev-icon">
              <Link to="/Signin2">
                <img src={prev} width="30%" alt="" className="backOrHomebutton"/>
              </Link>
            </div>
            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "Definir un nouveau mot de passe"
                  : "Set New Password"}
              </h5>
            </div>
          </div>

          <div style={{ marginTop: "15%" }}>
            <div>
              <button
                type="button"
                onClick={() => {
                  history.push("/Emailpin");
                }}
                className="btn reset-btn w-100"
              >
                {FrenchLang === "true"
                  ? "Envoie moi un email"
                  : "Send Me Email"}
              </button>
            </div>
            {/* <div>
                        <button type="button" onClick={()=>history.push('/Smspin')} className="btn btn-danger danger_btn">Send Me Text</button>
                        </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forgot;
