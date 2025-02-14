import React, { useEffect,useState } from 'react';
import { Col, Form, Modal, Row, Container, Button } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFindShopperByIdApi, updateFindShopperAPI } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';

const LoaderModal = ({
    show
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
            opacity: 0.5
  
          }}
        />
        <div className="modal-dialog" role="document"
          style={{
            zIndex: 1050,
             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            width: "550px",
            height:"150px",
            top: 200,
            borderRadius: "0px"
            // transform: "translate(-50%, -50%)",
  
            // padding: "20px",
            // borderRadius: "8px"
          }}
  
        >
             <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"550px",height:"150px", background:"#fff" }} >
          <img src='https://rsaqa.rsaamerica.com/Content/admin/ajax-loader.gif' style={{width:"31px",height:"31px"}} />
        </div>
          {/* <div className="modal-content" style={{ width: "550px" ,height:"150px"}}>
            
            <div className="modal-body" style={{ width: "550px", position: "relative", padding: "12px",height:"150px" }}>
              <div id="viewContent">
                <div className='widget'>
                  <div className='widget-content'>

                  <div style={{display:"flex",justifyContent:"center",textAlign:"center",width:"550px",height:"150px" }} >
          <img src='https://rsaqa.rsaamerica.com/Content/admin/ajax-loader.gif' style={{width:"31px",height:"31px"}} />
        </div>
   
  
  
  
  
  
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  )
}

export default LoaderModal