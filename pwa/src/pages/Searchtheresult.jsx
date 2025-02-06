import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import prev from "../assets/img/Icons/Icons/prev.png";
import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";
import LPin from "../assets/img/Icons/Icons/Lpin.png";
import RedL from "../assets/img/Icons/Icons/sm-barcode.png";
import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import Cardskeleton2 from "../pages/Skeleton2";
import Footer from "../pages/footer";
import { Url } from "./url";

const Searchresult = () => {
  const history = useHistory();
  const short_link = Url();
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  const [searchvalue, setsearchvalue] = useState("");
  const [searcheddata, setsearcheddata] = useState("");
  const [portercard, setPortercard] = React.useState("");

  useEffect(() => {
    if (!history.location.value) history.push("/coupons");

    // if (!localStorage.getItem("Shopping_token")) history.push("/");

    let a = history.location.value;
    let b;

    if (a !== undefined) b = a.charCodeAt(0);

    let token = localStorage.getItem("Shopping_token")
      ? localStorage.getItem("Shopping_token")
      : localStorage.getItem("Guest_token");
    let searchcode;
    let searchvalue;
    let flag = 0;

    if (b >= 48 && b <= 57) {
      console.log("it's a number");
      flag = 1;
    } else {
      console.log("it's a word");
      flag = 2;
    }

    if (flag === 1) searchcode = "U";
    else searchcode = "N";

    searchvalue = a;

    console.log("the searchcode is ", searchcode);
    console.log("the searchvalue is ", searchvalue);

    //    fetch(`${short_link}/search`,{
    fetch(`${short_link}/searchcoupen`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        searchcode: searchcode,
        searchvalue: searchvalue,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("the searched data is ", data);
        console.log("the searched item is ", data.message.Specials);
        setsearcheddata(data);
      })
      .catch((err) => {
        console.log("the error is arise and the error is ", err);
      });
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("Shopping_token");
    fetch(`${short_link}/getclientgeneralinfo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token ? token : process.env.REACT_APP_GUEST_TOKEN,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPortercard(data.message.ClientGeneralInfo.ClientLogo);
      });
  }, []);

  function add_to_list(item) {
    return new Promise((resolve, reject) => {
      // fetch(`${short_link}/addtolist`,{
      fetch(`${short_link}/addtolist`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: item,
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  function remove_to_list(item) {
    return new Promise((resolve, reject) => {
      fetch(`${short_link}/removetolist`, {
        // fetch('/removetolist',{
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: item.SSNewsId,
          token: localStorage.getItem("Shopping_token"),
          subdomain: localStorage.getItem("subdomain"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  function republished() {
    let a = history.location.value;
    let b;

    if (a !== undefined) b = a.charCodeAt(0);

    let token = localStorage.getItem("Shopping_token");
    let searchcode;
    let searchvalue;
    let flag = 0;

    if (b >= 48 && b <= 57) {
      console.log("it's a number");
      flag = 1;
    } else {
      console.log("it's a word");
      flag = 2;
    }

    if (flag === 1) searchcode = "U";
    else searchcode = "N";

    searchvalue = a;

    console.log("the searchcode is ", searchcode);
    console.log("the searchvalue is ", searchvalue);

    fetch(`${short_link}/searchcoupen`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        searchcode: searchcode,
        searchvalue: searchvalue,
        subdomain: localStorage.getItem("subdomain"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("the searched data is ", data);
        setsearcheddata(data);
      })
      .catch((err) => {
        console.log("the error is arise and the error is ", err);
      });
  }

  function searchthedata() {
    let len = searchvalue;

    if (len === undefined) window.alert("please enter more than 2 character");
    else if (len.length >= 3)
      history.push({ pathname: "/search", value: searchvalue });
    else window.alert("please enter more than 2 character");
  }

  function givetheanswer() {
    console.log(searcheddata);
  }

  // function findthedata(item)
  // {
  //     console.log(item);
  //     console.log(item.ProductImage);
  //     var mydeals = JSON.parse(localStorage.getItem("mydelas"));
  //     var allcoupons = JSON.parse(localStorage.getItem("allcoupons"))
  //     console.log("length of mydeals is",mydeals.length);
  //     console.log("length of all coupens is ",allcoupons.length)
  //     console.log("mydeals[0] image is",mydeals[0].ImagePath);

  //     for(let i=0;i<mydeals.length;i++)
  //     {
  //         if(item.ProductId === mydeals[i].SSNewsId)
  //         {
  //             console.log("the data is matched in mydeals ",mydeals[i])
  //         }
  //     }

  //     for(let i=0;i<allcoupons.length;i++)
  //     {
  //         if(item.ProductId === allcoupons[i].SSNewsId)
  //         {
  //             console.log("the data is matched in all coupens ",allcoupons[i])
  //         }
  //     }

  //     console.log("mydeals is ",mydeals);
  //     console.log("all coupons is ",allcoupons);
  // }

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
    <div>
      <div
        className="bg-white bg-bottom-round"
        // style={{ overflow: "auto" }}
      >
        <div className="container page17">
          <div
            className={`row mt-3 mb-2 align-items-center ${
              isSticky ? "sticky-menu" : ""
            }`}
          >
            <div className="text-center prev-icon">
              <Link to="/Coupons">
                <img
                  src={prev}
                  width="30%"
                  alt=""
                  className="backOrHomebutton"
                />
              </Link>
            </div>

            <div
              className="col-sm-9-my17-C text-center "
              style={{ width: "100%" }}
            >
              <img
                src={portercard}
                alt="logo"
                height={30}
                width="auto"
                className="bannerImage"
              />
            </div>

            <div className="col-sm-3-my17-C text-right d-none ">
              <a
                className="text-dark fw500"
                data-toggle="modal"
                data-target="#exampleModal1"
              >
                {" "}
                <img
                  src={LPin}
                  alt=""
                  height={20}
                  width={14}
                  className="mr-1"
                />
                <span className="d-none" style={{ fontSize: "12px" }}>
                  {FrenchLang === "true" ? "Broche de magasin" : "Store pin"}
                </span>
              </a>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12">
              <hr className="mt-2" />

              <div style={{ display: "none" }} className="row px-4">
                <div
                  className="input-group mb-1 shadow"
                  style={{ flexWrap: "nowrap" }}
                >
                  <input
                    value={searchvalue}
                    onChange={(e) => {
                      setsearchvalue(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder={
                      FrenchLang === "true"
                        ? "Entrez le mot-clé pour rechercher"
                        : "Enter keyword to search"
                    }
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-prepend search-wrapper">
                    <span className="input-group-text bg-white border-0">
                      <img
                        src={RedL}
                        alt=""
                        style={{ objectFit: "cover", width: "30px" }}
                      />
                      <i
                        onClick={() => {
                          searchthedata();
                        }}
                        className="fa fa-search pr-1 pl-3"
                        style={{ fontSize: "18px" }}
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => {
                  givetheanswer();
                }}
              >
                <center>
                  <h5>{FrenchLang === "true" ? "Résultats de la recherche" : "Search Results"}</h5>
                </center>
              </div>

              {/* --------------------------------------------------------------------- */}
              <div className="tab-pane" id="tabs-2" role="tabpanel">
                <div className="row px-3">
                  <div className="col-sm-12 mt-2 mb-1">
                    {/* --------------------------------------------- */}

                    {!searcheddata ? (
                      <>
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                        <Cardskeleton2 />
                      </>
                    ) : searcheddata.message.Specials === null ||
                      searcheddata.message.Specials.length === 0 ? (
                      <h4 style={{ fontSize: "14px" }}>
                        {FrenchLang === "true"
                          ? "Aucun résultat trouvé"
                          : "NO Result Found"}
                      </h4>
                    ) : (
                      searcheddata.message.Specials.map((item, i) => {
                        return (
                          <div className=" card-hori-t" key={i}>
                            <div
                              className="row coupon-single-items"
                              style={{
                                borderRadius: "9px",
                              }}
                            >
                              <div
                                className="col-sm-5-my-C px-0"
                                onClick={() => {
                                  history.push({
                                    pathname: "/CouponsDetail",
                                    state: item,
                                    value: "search",
                                    name: history.location.value,
                                  });
                                }}
                              >
                                <div className="reward-card-img-outer-left-C reward-card-img-outer-left coupon-items">
                                  <img
                                    src={item.ImagePath}
                                    alt=""
                                    className="reward-card-img-left"
                                  />

                                  {/* <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2"> 1.00 $</small></p> */}
                                </div>
                              </div>

                              <div className="col-sm-7-my-C card-img-right">
                                <div>
                                  <div
                                    onClick={() => {
                                      history.push({
                                        pathname: "/CouponsDetail",
                                        state: item,
                                        value: "search",
                                        name: history.location.value,
                                      });
                                    }}
                                  >
                                    {/* <p className="float-right mb-0"><small className="text-danger">6 Days Left</small></p> */}
                                    <br />
                                    <p
                                      className=" List-card-img-right-p1 mt-1 mb-1"
                                      style={{ color: "black" }}
                                    >
                                      {item.ProductName}
                                    </p>
                                    <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray all-coupons-desc">
                                      {item.Details}
                                    </p>
                                  </div>
                                  {item.IsInCart === false ? (
                                    <button
                                      onClick={() => {
                                        console.log("hello");
                                        add_to_list(item).then((data) => {
                                          //the function is fully correct
                                          console.log(
                                            "data i received from add_to_list is ",
                                            data
                                          ); // the details which i get in searched is not enough so that
                                          if (
                                            data.message.ErrorMessage
                                              .ErrorCode === 1
                                          ) {
                                            // indirectly some data is missing to call addtolist API
                                            console.log(
                                              "now republished () is going to call"
                                            );
                                            republished();
                                          }
                                        });
                                      }}
                                      style={{ borderRadius: "0.4rem" }}
                                      type="button"
                                      className="btn add-list-btn mt-3 w-30"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                      >
                                        <g fill="none">
                                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                          <path
                                            fill="currentColor"
                                            d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                                          ></path>
                                        </g>
                                      </svg>{" "}
                                      {FrenchLang === "true"
                                        ? "Agrafe"
                                        : "Clip"}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        console.log("bye");
                                        remove_to_list(item).then((data) => {
                                          console.log(
                                            "data.message is ",
                                            data.message
                                          );
                                          if (data.message === 1) {
                                            republished("mydeals");
                                          }
                                        });
                                      }}
                                      style={{ borderRadius: "0.4rem" }}
                                      type="button"
                                      className="btn remove-list-btn w-30 mt-3"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                      >
                                        <path
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="32"
                                          d="M400 256H112"
                                        ></path>
                                      </svg>{" "}
                                      {FrenchLang === "true"
                                        ? "Déclipser"
                                        : "Unclip"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    {/* <div className=" card-hori-t">
                                            <div className="row" style={{borderRadius:"9px",marginBottom:"2px"}}>

                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2"> 1.00 $</small></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-7-my-C bg-light card-img-right " style={{fontSize:"16px",position:"relative",top:"19px"}}>
                                                    <div style={{padding:"1px",paddingLeft:"11px"}}>
                                                        
                                                        <div >
                                                            <p className="float-right mb-0"><small className="text-danger">6 Days Left</small></p>
                                                            <br />
                                                            <p className=" List-card-img-right-p1 mt-1 mb-1" style={{color:"black"}}>Lorem 10...</p>
                                                            <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray" >this is a small details...</p>
                                                        </div>
                                                        <button style={{borderRadius:"0.4rem"}} type="button" className="btn btn-danger w-100 mt-3">Danger</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                    {/* ------------------------------------------------------ */}
                  </div>
                </div>
              </div>
              {/* ----------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
      <Footer name="coupon" />
    </div>
  );
};

export default Searchresult;
