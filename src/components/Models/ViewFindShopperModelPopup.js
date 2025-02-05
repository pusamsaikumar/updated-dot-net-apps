import React, { useEffect,useState } from 'react';
import { Col, Form, Modal, Row, Container, Button } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFindShopperByIdApi } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


// ViewFindShopperModelPopup.js


const ViewFindShopperModelPopup = ({ 
  show,
   handleClose,
   clientName,
   userDetailId,
   getClientStoresData,
   getFindShopperDetailsData,
   getFindShopperDetailsMessage,
   getFindShopperDetailsLoading 
  }) => {



const dispatch = useDispatch();


const  matchStore = Array.isArray(getClientStoresData) ? getClientStoresData?.find(store => store.clientStoreId === getFindShopperDetailsData?.clientStoreId) : undefined;
const storeName = matchStore?.storeName;



  return (
    <div className={`modal ${show === true ? "show" : ""}`} style={{ display: show ? "block" : "none", outline: "none" }}>
      <div
        className="modal-backdrop"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#000",
          zIndex: 1040,
          opacity: 0.2

        }}
      />
      
      <div className="modal-dialog" role="document"
        style={{
          zIndex: 1050,
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          width: "600px",
          top: 20,
          borderRadius: "0px"
          // transform: "translate(-50%, -50%)",

          // padding: "20px",
          // borderRadius: "8px"
        }}

      >
        <div className="modal-content" style={{ width: "700px" ,background:"#f3f3f3" }}>
          <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height:"65px",borderBottom: "1px solid #e5e5e5", width: "700px", position: "relative" }}>

            <h2 style={{fontWeight:"400",fontSize:"16px",display:"flex",alignItems:"center"}}>
              <FontAwesomeIcon icon={faUser} style={{color:"#505458",marginRight:"5px"}} ></FontAwesomeIcon>
              <span style={{color:"#505458"}}>{"Shopper Details"}</span>
              <strong style={{color:"#505458"}}> &nbsp;View</strong>
            </h2>
            <button type="button" className='close' onClick={handleClose}
              style={{
                color: "#ccc",
                border: "none",
                outline: "none",
                background: "#fff",
                position:'absolute',
                top:"10px",
                right:"10px"
              }}
            >
              <span aria-hidden="true" style={{ color: "#ccc", border: "none", outline: "none" }}>×</span>
            </button>
                    

{/* 
            <button type="button" className='close' onClick={handleClose}
              style={{
                color: "#ccc",
                border: "none",
                outline: "none",
                background: "#fff",
                position:'absolute',
                top:"10px",
                right:"10px"
              }}
            >
              <span aria-hidden="true" style={{ color: "#ccc", border: "none", outline: "none" }}>×</span>
            </button>
            <h2 style={{
              margin:"10px 0px",
              fontSize:"30px",
              fontWeight:"300",
              fontFamily:"Open Sans",
              color:"#505458",
              height:"35px"
              }}>View <strong>Shopper</strong> Details</h2> */}

          </div>
          <div className="modal-body" style={{ width: "700px", position: "relative", padding: "12px" ,background:"#f3f3f3" }}>
            <div id="viewContent">
              <div className='widget' style={{padding:"0px"}}>
                <div className='widget-content' style={{  background:"#fff",padding:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"start"}}>
                    <h2 >
                      <span style={{textAlign:"start"}}>
                      <storng>General</storng> &nbsp;Info
                      </span>
                     

                    </h2>
                  </div>
     {
      getFindShopperDetailsData && Object.keys(getFindShopperDetailsData)?.length > 0  ?
     
      <>
      
      <Row style={{ margin: "10px" }}>
                    <Col xs={12} md={6} >
                    
                      <div className=''>
                        <dt className='label' style={{width:"140px",textAlign:"start"}}>
                            Email
                        </dt>
                        <dd>
                        {getFindShopperDetailsData?.email}
                        </dd>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      
                      <div className=''>
                      <dt className='label' style={{width:"140px",textAlign:"start"}}>
                            Member Number
                        </dt>
                        <dd>
                        {getFindShopperDetailsData?.barCodeValue}
                        </dd>
                      </div>
                    </Col>
                  </Row>

                  <Row style={{ margin: "10px" }}>
                    <Col xs={12} md={6} >
                     
                        <div className=''>
                        <dt className='label' style={{width:"140px",textAlign:"start"}}>
                            Phone Number
                        </dt>
                        <dd>
                        {getFindShopperDetailsData?.mobile}
                        </dd>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                     
                        <div className=''>
                        <dt className='label' style={{width:"140px",textAlign:"start"}}>
                           Zip Code
                        </dt>
                        <dd>
                        {getFindShopperDetailsData?.zipCode}
                        </dd>
                      </div>
                    </Col>
                  </Row>

                  <Row style={{ margin: "10px" }}>
                    <Col xs={12} md={6} >
                     
                      <div className=''>
                      <dt className='label' style={{width:"140px",textAlign:"start"}}>
                            First Name
                        </dt>
                        <dd>
                        {getFindShopperDetailsData?.firstName}
                        </dd>
                      </div>
                    </Col>
                    <Col xs={12} md={6} >
                     
                     <div className=''>
                     <dt className='label' style={{width:"140px",textAlign:"start"}}>
                           Last Name
                       </dt>
                       <dd>
                       {getFindShopperDetailsData?.lastName}
                       </dd>
                     </div>
                   </Col>
                  </Row>
                  <Row style={{ margin: "10px" }}>
                    <Col xs={12} md={6} >
                     

                      <div className=''>
                      <dt className='label' style={{width:"140px",textAlign:"start"}}>
                       Sign Up Date
                       </dt>
                       <dd>
                       {getFindShopperDetailsData?.signUpDate?.slice(0,10)}
                       </dd>
                     </div>
                    </Col>
                    <Col xs={12} md={6} >
                    <div className=''>
                    <dt className='label' style={{width:"140px",textAlign:"start"}}>
                       Stores
                       </dt>
                       <dd>
                       {storeName}
                       </dd>
                     </div>
                     

                   
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={{ span: 3, offset: 9 }}>
                      <Form.Group style={{ marginTop: "20px" ,marginLeft:"10px"}}>
                        <div style={{ display: "flex", alignItems: "center",gap:"30px", minHeight:"35px"}}>
                          <button  className='btncancel' onClick={handleClose}>Cancel</button>
                          {/* <button  className= 'btnSave' > {" Save  "}  </button> */}

                         
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

      </>
      :
      <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
      <Spinner animation="border" variant="success" />
      </div>
     }





                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewFindShopperModelPopup;
