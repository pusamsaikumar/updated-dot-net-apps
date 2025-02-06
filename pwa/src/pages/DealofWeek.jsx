import React, { useEffect } from "react";

import Sidebar from "./Sidebar"; //import $ from "jquery";

import { Link } from "react-router-dom";

import Barside from "../assets/img/Icons/Icons/Icon-17.png";
import Image1 from "../assets/img/Icons/Icons/imageC1.png";

import Image2 from "../assets/img/Icons/Icons/imageC2.png";
import Image3 from "../assets/img/Icons/Icons/imageC3.png";
import Image4 from "../assets/img/Icons/Icons/imageC4.png";

import Imageb1 from "../assets/img/Icons/Icons/bagde-hero.png";

import Imgcard1 from "../assets/img/Icons/Icons/cameraI.jpg";
import RedL from "../assets/img/Icons/Icons/sm-barcode.png";

import MainImgSmall from "../assets/img/Icons/Icons/smallimgicon.png";

import LPin from "../assets/img/Icons/Icons/Lpin.png";
import Footer from "../pages/footer";
const DealOfWeek = () => {
  const FrenchLang = localStorage.getItem("FrenchLanguage");

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  // }, [])

  return (
    <div>
      <div className="bg-white bg-bottom-round">
        <div className="container page17">
          <div className="row mt-3 mb-2 align-items-center">
            <div className="col-sm-1-my17-C text-center ">
              <Sidebar />
            </div>
            <div className="col-sm-9-my17-C text-center ">
              <img
                src={MainImgSmall}
                alt=""
                height={30}
                width={40}
                className="ml-5"
              />
            </div>

            <div className="col-sm-3-my17-C text-right ">
              <a
                href=""
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
                <span style={{ fontSize: "12px" }}>
                  {FrenchLang === "true" ? "Nom du magasin" : "Store name"}
                </span>
              </a>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content modal-content-message rounded-lg-15">
                <div className="modal-body p-0 ">
                  <p className="bg-danger text-white text-center py-3 rounded-lg-15-lrt">
                    {FrenchLang === "true"
                      ? "Sélectionnez votre magasin"
                      : "Select your store"}
                  </p>
                  <ul className="list-group list-group-flush px-3 text-center">
                    <li className="list-group-item border-top-0">
                      <a href="" className="text-decoration-none text-dark">
                        D Mart {FrenchLang === "true" ? "Magasin" : "Store"}
                      </a>
                    </li>
                    <li className="list-group-item border-top-0">
                      <a href="" className="text-decoration-none text-dark">
                        Big Bazaar {FrenchLang === "true" ? "Magasin" : "Store"}
                      </a>
                    </li>
                    <li className="list-group-item border-top-0">
                      <a href="" className="text-decoration-none text-dark">
                        Best Prize {FrenchLang === "true" ? "Magasin" : "Store"}
                      </a>
                    </li>
                    <li className="list-group-item border-top-0">
                      <a href="" className="text-decoration-none text-dark">
                        Reliance {FrenchLang === "true" ? "Magasin" : "Store"}
                      </a>
                    </li>
                  </ul>
                  <div className="text-center px-3 mb-3 mt-1">
                    <button
                      type="button"
                      className="btn btn-success py-1 w-100"
                      data-dismiss="modal"
                    >
                      {FrenchLang === "true" ? "Sauvegarder" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row page17-p">
            <div className="col-sm-12 py-2">
              <hr className="mt-2" />

              <div className=" row ">
                <div className="col-sm-12">
                  <div className="input-group mb-3 shadow">
                    <input
                      type="text"
                      className="form-control border-right-0"
                      placeholder="Enter keyword  to search"
                      style={{ height: "47px", width: "70%" }}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div className=" input-group-append border-left-0">
                      <span
                        className="input-group-text bg-white p-1 border-left-0 "
                        id="basic-addon2"
                      >
                        <img
                          src={RedL}
                          alt=""
                          className=" mr-2"
                          style={{ height: "80%", width: "30px" }}
                        />
                        <i
                          className="fa fa-search pr-1"
                          style={{ fontSize: "18px" }}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="mb-1 mt-2 text-center fw600">
                {" "}
                {FrenchLang === "true" ? "Offre de la semaine" : "Deal Of Week"}
              </h6>
              <div>
                <div className="row px-3 scroll-inner2 mt-2">
                  <div
                    className="col-sm-12"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    <div className=" card-hori-t">
                      <div className="row ">
                        <div className="col-sm-5-my-C px-0">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "auto" }}
                            />
                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C bg-light card-img-right ">
                          <div style={{ paddingLeft: "8%" }}>
                            <p className="float-right mb-0">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <br />
                            <p
                              style={{ paddingTop: "7%" }}
                              className=" List-card-img-right-p1 mt-1 mb-1"
                            >
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 text-secondary-light-gray"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <Link
                              to="/Register1"
                              type="button"
                              style={{ marginTop: "11%" }}
                              className="btn btn-outline-success w-100 mb-0 py-0 "
                            >
                              <small>
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </small>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-sm-12"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    <div className=" card-hori-t">
                      <div className="row ">
                        <div className="col-sm-5-my-C px-0">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "auto" }}
                            />
                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C bg-light card-img-right ">
                          <div style={{ paddingLeft: "8%" }}>
                            <p className="float-right mb-0">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <br />
                            <p
                              style={{ paddingTop: "7%" }}
                              className=" List-card-img-right-p1 mt-1 mb-1"
                            >
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 text-secondary-light-gray"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <Link
                              to="/Register1"
                              type="button"
                              style={{ marginTop: "11%" }}
                              className="btn btn-outline-success w-100 mb-0 py-0 "
                            >
                              <small>
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </small>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-sm-12"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    <div className=" card-hori-t">
                      <div className="row ">
                        <div className="col-sm-5-my-C px-0">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "auto" }}
                            />
                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C bg-light card-img-right ">
                          <div style={{ paddingLeft: "8%" }}>
                            <p className="float-right mb-0">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <br />
                            <p
                              style={{ paddingTop: "7%" }}
                              className=" List-card-img-right-p1 mt-1 mb-1"
                            >
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 text-secondary-light-gray"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <Link
                              to="/Register1"
                              type="button"
                              style={{ marginTop: "11%" }}
                              className="btn btn-outline-success w-100 mb-0 py-0 "
                            >
                              <small>
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </small>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-sm-12"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    <div className=" card-hori-t">
                      <div className="row ">
                        <div className="col-sm-5-my-C px-0">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "auto" }}
                            />
                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C bg-light card-img-right ">
                          <div style={{ paddingLeft: "8%" }}>
                            <p className="float-right mb-0">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <br />
                            <p
                              style={{ paddingTop: "7%" }}
                              className=" List-card-img-right-p1 mt-1 mb-1"
                            >
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}{" "}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 text-secondary-light-gray"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <Link
                              to="/Register1"
                              type="button"
                              style={{ marginTop: "11%" }}
                              className="btn btn-outline-success w-100 mb-0 py-0 "
                            >
                              <small>
                                {" "}
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </small>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-sm-12"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    <div className=" card-hori-t">
                      <div className="row ">
                        <div className="col-sm-5-my-C px-0">
                          <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                            <img
                              src={Imgcard1}
                              alt=""
                              className="reward-card-img-left"
                              style={{ height: "auto" }}
                            />
                            <div>
                              <p className="bg-danger coupen-middle-card-bagde">
                                <small className="text-white pl-2">
                                  {FrenchLang === "true"
                                    ? "Sauvegarder"
                                    : "Save"}{" "}
                                  $1.00
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-7-my-C bg-light card-img-right ">
                          <div style={{ paddingLeft: "8%" }}>
                            <p className="float-right mb-0">
                              <small className="text-danger">
                                6{" "}
                                {FrenchLang === "true"
                                  ? "jours restants"
                                  : "days left"}
                              </small>
                            </p>
                            <br />
                            <p
                              style={{ paddingTop: "7%" }}
                              className=" List-card-img-right-p1 mt-1 mb-1"
                            >
                              {FrenchLang === "true"
                                ? "Offre de la semaine Café gratuit"
                                : "Deal of the week free Coffee"}
                            </p>
                            <p
                              style={{ paddingTop: "2%" }}
                              className="mb-0 List-card-img-right-p2 text-secondary-light-gray"
                            >
                              Lorem ipsum dolor sit amet{" "}
                            </p>
                            <Link
                              to="/Register1"
                              type="button"
                              style={{ marginTop: "11%" }}
                              className="btn btn-outline-success w-100 mb-0 py-0 "
                            >
                              <small>
                                {FrenchLang === "true"
                                  ? "Ajouter à la liste"
                                  : "Add To List"}
                              </small>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" style={{height:"auto"}}/>
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div style={{paddingLeft:"8%"}}>
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p style={{paddingTop:"7%"}} className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p style={{paddingTop:"2%"}} className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" style={{marginTop:"11%"}} className="btn btn-outline-success w-100 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" style={{height:"auto"}}/>
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div style={{paddingLeft:"8%"}}>
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p style={{paddingTop:"7%"}} className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p style={{paddingTop:"2%"}} className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" style={{marginTop:"11%"}} className="btn btn-outline-success w-100 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
                  {/* <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
                  {/* <div className="col-sm-12 mt-2 mb-1">
                                        <div className=" card-hori-t">
                                            <div className="row ">
                                                <div className="col-sm-5-my-C px-0">
                                                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                                                        <img src={Imgcard1} alt="" className="reward-card-img-left" />
                                                        <div>
                                                            <p className="bg-danger coupen-middle-card-bagde"><small className="text-white pl-2">Save $1.00</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7-my-C bg-light card-img-right ">
                                                    <div className="p-3">
                                                        <p className="float-right mb-0"><small className="text-danger">6 days left</small></p>
                                                        <br />
                                                        <p className=" List-card-img-right-p1 mt-1 mb-1">Deal of the week free Coffee</p>
                                                        <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray">Lorem ipsum dolor sit amet </p>
                                                        <Link to="/Register1" type="button" className="btn btn-outline-success w-100 mt-3 mb-0 py-0 " ><small>Add To List</small></Link>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
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

export default DealOfWeek;
