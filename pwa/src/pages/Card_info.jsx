// //there is a file card_info.jsx which is similar to the list.jsx

// import React, { useEffect,useState } from 'react';

// import { Link } from 'react-router-dom';
// import ImageR from '../assets/img/Icons/Icons/image.png'
// import Cardskeleton2 from '../pages/Skeleton2';
// import ImageQ from '../assets/img/Icons/Icons/imageQ.png'
// import ImageC from '../assets/img/Icons/Icons/imagechat.png'
// import Barside from '../assets/img/Icons/Icons/Icon-17.png'

// import Imgcard1 from '../assets/img/Icons/Icons/cameraI.jpg'
// import RedL from '../assets/img/Icons/Icons/sm-barcode.png'

// import Barcodes from '../assets/img/Icons/Icons/checkoutbarcode.png'
// import Footer from '../pages/footer'
// const List = (props) => {

//     const [state,setState] = useState();
//     const [state2,setState2] = useState();
//     const [active,setActive] = useState();
//     const [active2,setActive2] = useState();
//     // useEffect(() => {
//     //     window.scrollTo(0, 0)
//     // }, [])
//     console.log(props.location.state);

//     useEffect(()=>{
//         fetch(`${short_link}/cart`,{
//             method:"post",
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }).then(res=>res.json())
//         .then(data=>{
//             console.log(data)
//             //console.log(data.message[0].ImagePath)
//             setState(data);
//         })
//         .catch(err=>{
//             console.log("err is arise in cart and the error is",err);
//         })

//         fetch(`${short_link}/card`,{
//             method:"get",
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }).then(res=>res.json())
//         .then(data=>{
//             console.log(data);
//             console.log("barcode is ",data.message.BarCodeUrl);
//             localStorage.setItem("menberNumber",JSON.stringify(data.message.MemberNumber));
//             localStorage.setItem("barcode",data.message.BarCodeUrl);
//             setState2(data);
//         })
//         .catch(err=>console.log("err is arise in card"))

//     },[])

//     function render_list()
//     {
//         if(props.location.state === 'list')
//         {
//             return(<ul class="nav nav-tab mt-2 mb-2" role="tablist">
//                 <li class="nav-item w-50">
//                     <a class="nav-link  active text-center" data-toggle="tab" href="#tabs-1" role="tab"><small>Shopping List</small></a>
//                 </li>
//                 <li class="nav-item w-50">
//                     <a class="nav-link text-center" data-toggle="tab" href="#tabs-2" role="tab"><small>Check Out</small></a>
//                 </li>
//             </ul>)
//         }
//         else{
//             return(<ul class="nav nav-tab mt-2 mb-2" role="tablist">
//                 <li class="nav-item w-50">
//                     <a class="nav-link  text-center" data-toggle="tab" href="#tabs-1" role="tab"><small>Shopping List</small></a>
//                 </li>
//                 <li class="nav-item w-50">
//                     <a class="nav-link text-center active" data-toggle="tab" href="#tabs-2" role="tab"><small>Check Out</small></a>
//                 </li>
//             </ul>)
//         }
//     }

//     return (
//         <div style={{background:"#343a40"}}>
//             <div className="bg-white bg-bottom-round" style={{overflowY:"scroll"}}>
//                 <div className="container page17">
//                     <div className="row mt-3">
//                         <div className="text-center">
//                             <p className="mb-0"><Link to="/" className="text-decoration-none"><img src={Barside} className="Barside" alt="" /></Link></p>
//                         </div>
//                         <div className="col-sm-9-my17 text-center ">

//                             <h5 className=" signin1-h1-top ml-5 mb-0">List</h5>
//                         </div>

//                         <div className="col-sm-3-my17 text-center ">
//                             <a href="" className="text-dark fw500 ">Clear List</a>
//                         </div>

//                     </div>

//                     <div className="row page17-p">
//                         <div className="col-sm-12 py-2">
//                             <hr className="mt-2" />

//                             <div className=" row px-3">
//                                 <div className="col-sm-11-LSB">
//                                     <div class="input-group mb-3 shadow">
//                                         <input type="text" class="form-control border-right-0" placeholder="&#xF002; Search" style={{ width:"75%",height: "47px", fontFamily: "Arial, FontAwesome" }} aria-label="Recipient's username" aria-describedby="basic-addon2" />
//                                         <div class=" input-group-append border-left-0">
//                                             <span class="input-group-text bg-white p-1 border-left-0" id="basic-addon2"><button type="button" class="btn btn-success">Add</button></span>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>

//                             <div>
//                                 {render_list()}
//                                 <div class="tab-content">
//                                     <div class="tab-pane" id="tabs-1" role="tabpanel">
//                                         <div className="row  scroll-inner2">

//                                                             {
//                                                                 !state ?   <>
//                                                                             <Cardskeleton2 /><Cardskeleton2 /><Cardskeleton2 />
//                                                                             </>
//                                                                           :
//                                                                     <>
//                                                                     {
//                                                                         state.message.map((item,i)=>{
//                                                                             return(<div className="col-sm-12 mt-2 mb-1 ">
//                                                                             <div className="px-3 card-hori-t">
//                                                                                 <div className="row ">
//                                                                                     <div className="col-sm-3-my px-0">
//                                                                                         <div className="List-card-img-outer-left">
//                                                                                             <img src={item.ImagePath} alt="" className="card-img-left" />
//                                                                                         </div>
//                                                                                     </div>
//                                                                                     <div className="col-sm-9-my bg-light List-card-img-right">
//                                                                                         <div className="p-3">
//                                                                                             <p className=" List-card-img-right-p1">{item.ProductName}</p>
//                                                                                             <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">{item.Details.substr(0,30)}...</p>
//                                                                                         </div>
//                                                                                     </div>

//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>)
//                                                                         })
//                                                                     }
//                                                                     </>
//                                                             }
//                                         </div>
//                                     </div>

//                                     <div class="tab-pane active" id="tabs-2" role="tabpanel">
//                                         <div className="row px-4 " style={{ marginTop: "25%" }}>
//                                             {
//                                                 !state2 ? <Cardskeleton2 />
//                                                         : <div className="col-sm-12 text-center">
//                                                                 <h3 className="text-red my-3">MEMBER #:{state2.message.MemberNumber}</h3>
//                                                                 <div className="mt-5">
//                                                                     <img src={state2.message.BarCodeUrl} className="List-checkout-barcode" alt="" />
//                                                                 </div>
//                                                             </div>
//                                             }

//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default List;

import React, { useEffect, useState } from "react";
//import $ from "jquery";

import { Link, useHistory } from "react-router-dom";
import ImageR from "../assets/img/Icons/Icons/image.png";
import Cardskeleton2 from "../pages/Skeleton2";
import ImageQ from "../assets/img/Icons/Icons/imageQ.png";
import ImageC from "../assets/img/Icons/Icons/imagechat.png";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Barcodes from "../assets/img/Icons/Icons/checkoutbarcode.png";
import Footer from "../pages/footer";

import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import Sidebar from "./Sidebar";
import { Url } from "./url";
import Icon10 from "../assets/img/Icons/Icons/imageC10.png";

const Checkout = () => {
  const history = useHistory();
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const [state, setState] = React.useState("");
  const [name, setName] = React.useState("");
  const [portercard, setPortercard] = React.useState("");
  const [phone, setPhoneNumber] = useState("");

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
        setState(data);
        setName(
          JSON.parse(localStorage.getItem("data")).firstname +
            " " +
            JSON.parse(localStorage.getItem("data")).lastname
        );
      })
      .catch((err) => console.log("err is arise in card"));
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/getclientgeneralinfo`, {
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
        setPortercard(data.message.ClientGeneralInfo.ClientLogo);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Shopping_token")) {
      const data = JSON.parse(localStorage.getItem("data"));

      setPhoneNumber(
        data.mobilenumber ? data.mobilenumber : data.username.split("@")[0]
      );
    }
  }, []);

  function check_the_user() {
    if (!localStorage.getItem("Shopping_token")) {
      history.push("/Signin2");
    } else {
    }
  }

  const handlePrint = () => {
    const printContent = document.getElementById("printableArea").innerHTML;
    const originalContent = document.body.innerHTML;

    const printArea = document.createElement("div");
    printArea.id = "printArea";
    printArea.style.position = "fixed";
    printArea.style.top = "0";
    printArea.style.left = "0";
    printArea.style.width = "100%";
    printArea.style.height = "100%";
    printArea.style.overflow = "auto";
    printArea.style.backgroundColor = "#fff";
    printArea.innerHTML = printContent;
    document.body.appendChild(printArea);

    window.print();

    document.body.removeChild(printArea);
  };

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
        // style={{ overflow: "auto" }}
      >
        <div className="container page17">
          <div
            className={`card-head row mt-3 mb-2 align-items-center head-icon justify-content-between ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center">
              <Sidebar />
            </div>
            <div className="text-center">
              <h5 className=" signin1-h1-top">
                {FrenchLang === "true" ? "Carte" : "Loyalty"}
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

          <div className="row page17-p card-info-main">
            <div className="col-sm-12">
              {/* <hr className="mt-2" /> */}

              <div className="row text-center mb-0">
                <div className="col-sm-12" id="printableArea">
                  <img src={portercard} alt="" className="MainImgSmall-s1" />
                  <img
                    src={MainImgSmall}
                    alt=""
                    height={40}
                    width="auto"
                    style={{ display: "none", margin: "auto" }}
                    className="mt-4"
                  />

                  <div className="card-user-info">
                    <h4>
                      Your Phone Number : <span>{phone}</span>
                    </h4>

                    <p>
                      Enter your phone number at checkout to redeem the coupons
                      and rewards
                    </p>
                  </div>

                  {/* <div className="card-user-info">
                    <p className="mb-1 mt-3">
                      <div className="card-loyalty-title">
                        your loyalty number
                      </div>
                      <small className="fw500" style={{ fontSize: "21px" }}>
                        {!state ? <></> : state.message.MemberNumber}
                      </small>
                    </p>
                    <h5 className="text fw500 mb-3">
                      {name ? name : "Username"}
                    </h5>
                  </div> */}

                  {/* <div style={{ marginTop: "4%" }}>
                    <p className="text-uppercase mb-1">
                      <small style={{ fontSize: "16px", fontWeight: "500px" }}>
                        {FrenchLang === "true"
                          ? "Scannez ce code-barres à la caisse"
                          : "Scan this barcode at checkout"}
                      </small>
                    </p>
                    <div>
                      {!state ? (
                        <Cardskeleton2 />
                      ) : (
                        <img
                          src={state.message.BarCodeUrl}
                          className="checkout-barcode-CN card-info"
                          alt=""
                        />
                      )}
                    </div>
                  </div> */}
                  {/* <div className="print-card-btn">
                    <button
                      type="button"
                      class="w-100  theme-btn"
                      onClick={handlePrint}
                    >
                      Print Card
                    </button>
                  </div> */}
                  {/* <h6 className="text-dark fw600 mt-5" style={{fontSize:"large"}}>Congrats!</h6>

                                    <h6 className="text-dark fw600" style={{fontSize:"large"}}>You have saved</h6>
                                    <div className="px-5" style={{marginTop:"-8%"}}>
                                        <Link to="/Register1" type="button" class="btn btn-outline-success w-100 mt-5" style={{fontSize:"17px",paddingTop:"7%",paddingBottom:"12%"}}><h5 className="fw600">$100.00</h5></Link>

                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="card_info" />
    </div>
  );
};

export default Checkout;
