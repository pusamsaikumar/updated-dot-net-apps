import React, { useEffect , useState} from "react";
import Footer from "../pages/footer";
import Sidebar from "./Sidebar";
import prev from "../assets/img/Icons/Icons/prev.png";
import { useHistory } from "react-router-dom";
import { Url } from "./url";

const Privacypolicy = () => {
  const history = useHistory();
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const [url, seturl] = React.useState("");

  useEffect(() => {
    // fetch('/getlink',{
    fetch(`${short_link}/getlink`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientappname: process.env.REACT_APP_CLIENT_NAME,
        clientid: process.env.REACT_APP_CLIENT_ID,
        storegroupid: process.env.REACT_APP_STORE_GROUP_ID,
        storeid: 1,
        subdomain: process.env.REACT_APP_SUBDOMAIN,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ", data);
        console.log(data.message.SocialMediaSettings[4].Value);
        seturl(data.message.SocialMediaSettings[3].Value);
        console.log(data.message.SocialMediaSettings[3].Value);
      })
      .catch((err) => {
        console.log("error is arise and the error is ", err);
      });
  }, []);

  console.log("history is ", history);

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
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className={`row mt-3 mb-2 align-items-center ${isSticky ? 'sticky-menu' : ''}`} >
            {history.location.name === "contactus" ? (
              <div
                onClick={() => {
                  history.push("/ContactUs");
                }}
                className="text-center prev-icon"
              >
                <img src={prev} width="30%" alt="" />
              </div>
            ) : (
              <div
                onClick={() => {
                  history.goBack();
                }}
                className="text-center prev-icon"
              >
                <img src={prev} width="30%" alt="" />
              </div>
            )}

            <div className="col-sm-11-my17 text-center head-title">
              <h5 className=" signin1-h1-top  mb-0">
                {FrenchLang === "true"
                  ? "politique de confidentialité"
                  : "Privacy Policy"}
              </h5>
            </div>
          </div>

          <div className="mt-4" style={{}}>
            <iframe
              src={url}
              style={{ width: "100%", height: "81vh" }}
              title="Iframe Example"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacypolicy;
