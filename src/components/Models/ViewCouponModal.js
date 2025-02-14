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
import {BasketDeal} from "../../assets/images/BasketDeal.png";
import { AddToDays, dateFormateTimeAndDate } from '../../Utils/Helpers/Public';


const ViewCouponModal = ({
    show,
    handleClose,
    data
}) => {
    

  
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
               opacity: 0.2,
               overflow:"auto"
     
             }}
           />
           
           <div className="modal-dialog" role="document"
             style={{
               zIndex: 1050,
               // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
               width: "600px",
               top: 20,
               borderRadius: "0px",
               // transform: "translate(-50%, -50%)",
     
               // padding: "20px",
               // borderRadius: "8px"
              
             }}
     
           >
             <div className="modal-content" 
             style={{ width: "700px" ,
                background:"#f3f3f3",
                overflow:"auto",
                maxHeight:"99vh"
                }}
             >
               <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height:"65px",border:"none", width: "700px", position: "relative" }}>
     
                 <h2 style={{fontWeight:"400",fontSize:"16px",display:"flex",alignItems:"center"}}>
                   <FontAwesomeIcon icon={faUser} style={{color:"#505458",marginRight:"5px"}} ></FontAwesomeIcon>
                   
                   <strong style={{color:"#505458"}}> &nbsp;View Coupn Details</strong>
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
                   <div className='widget' style={{paddingLeft:"0px",padding:"0px"}}>
                     <div className='widget-content' style={{  background:"#fff",padding:"12px"}}>
                       <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                    <label>Image</label>
                                    <br />
                                    <span><img src={`https://s3.amazonaws.com/rsaqa/SpecialsImages/BasketDeal.png`} style={{width:"50px",height:"50px"}} /></span>
                          </div>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Title</label>
                                <br />
                                <span>{data?.title}</span>
                          </div>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Details</label>
                                <br />
                                <span>{data?.details}</span>
                          </div>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Discount Value</label>
                                <br />
                                <span>{data?.discountAmount}</span>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                        <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Offer StartDate</label>
                                <br />
                                <span>{dateFormateTimeAndDate(data?.validFromDate)}</span>
                          </div>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Offer EndDate</label>
                                <br />
                                <span>{dateFormateTimeAndDate(data?.expiresOn)}</span>
                          </div>
                          <div className='form-group' style={{textAlign:"start",marginBottom:"10px"}}>
                                <label>Min. Purchase Amount</label>
                                <br />
                                <span>0</span>
                          </div>
                        </div>
                       </div>
         
     
     
     
     
     
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
     
  )
}

export default ViewCouponModal