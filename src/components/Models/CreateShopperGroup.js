import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Container, Button } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { createShopperGroupsAPI, getFindShopperByIdApi } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faRemove, faSave } from '@fortawesome/free-solid-svg-icons';


const CreateShopperGroup = ({
  show,
  handleClose,
  selectedItem,
  clientName,
  successMsg,

setShowNotificationError
}) => {

  const dispatch = useDispatch();
  const [value,setValue] = useState({
    // "signfromdate": "",
    // "signuptodate": "",
    // "firstname": "",
    // "lastname": "",
    // "username": "",
    // "zipcode": "",
    // "storeid": 0,
    // "membernumber": "",
    "groupName": "",
    "description": ""
  });
  // useEffect(() => {
  //    if(selectedItem?.length > 0) {
  //      selectedItem.map((each,i) => {
  //       setValue((prev) => {
  //         return {
  //           ...prev,
  //           signfromdate:each?.signUpDate,
  //           signuptodate:each?.signUpDate,
  //           firstname:each?.firstName,
  //           lastname:each?.lastName,
  //           username:each?.email,
  //           zipcode:each?.zipCode,
  //           storeid:each?.clientStoreId,
  //           membernumber:each?.barCodeValue,
  //           groupName:value?.groupName,
  //           description:value?.description




  //         }
  //       })
  //      })
  //    }
  // },[selectedItem]);
  console.log("value",value)
  console.log("create modal", selectedItem);
  const  handleSubmit=(e)=>{
    
  if(selectedItem?.length > 0) {
    selectedItem?.map((each,i) => {
      // clientName,signFromToDate,signUpToDate,firstName,lastName,userName,zipCode,clientStoreId,memberNumber,value
      return dispatch(createShopperGroupsAPI(clientName,each?.signUpDate?.slice(0,10),each?.signUpDate?.slice(0,10),each?.firstName,each?.lastName,each?.email,each?.zipCode,each?.clientStoreId,each?.barCodeValue,value,each?.userDetailId))
    });
    successMsg("Successfully created findshopper group.");
    setShowNotificationError(true);
    handleClose();
  }
   
  }
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
            top:"-20px",
            borderRadius: "0px"
            // transform: "translate(-50%, -50%)",

            // padding: "20px",
            // borderRadius: "8px"
        }}

    >
        <div className="modal-content" style={{ width: "550px", background: "#fff", padding: "15px 40px 30px", position: "absolute", left: "0px", top: "0px" }}>
            <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height: "43px", width: "", border: "none", position: "relative", background: "#fff" }}>

                <div>
                    <h2 style={{ fontWeight: "400", fontSize: "16px", display: "flex", alignItems: "center" ,color:"#5B5B5B"}}>
                   
                        <span style={{ color: "#5B5B5B",fontSize:"16px", }}>{"Create"}
                          <strong style={{color:"#5B5B5B"}}> Shopper Group</strong>
                        </span>

                    </h2>
                    <button type="button" className='close' onClick={handleClose}
                        style={{
                            color: "#ccc",
                            border: "none",
                            outline: "none",
                            background: "#fff",
                            position: 'absolute',
                            top: "10px",
                            right: "10px"
                        }}
                    >
                        <span aria-hidden="true" style={{ color: "#ccc", border: "none", outline: "none" }}>×</span>
                    </button>
                </div>



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
            <div className="modal-body" style={{ width: "",marginTop:"-10px", position: "relative", padding: "15px", background: "#fff" }}>
                <div id="viewContent">
                    <div className='' style={{ padding: "0px" }}>
                        <div className='' style={{ background: "#fff", padding: "0px" }}>
                            <div >
                            <div className='row' style={{marginTop:"10px",marginBottom:"10px"}}>
                              <div className='col-sm-12'>
                                <div className='form-group'>
                                  <label>
                                    <b>Description</b>
                                    <span style={{color:"red"}}>*</span>
                                  </label>
                                  <textarea className='form-control input-group-sm' rows={2} cols={20} placeholder='Description' name='description'
                                  onChange={(e) => setValue({
                                    ...value,
                                    ["description"]:e.target.value
                                  })} 
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className='row' style={{marginTop:"20px",marginBottom:"10px"}}>
                            <div className='col-sm-6'>
                                <div className='form-group'>
                                  <label>
                                    <b>Group Name</b>
                                    <span style={{color:"red"}}>*</span>
                                  </label>
                                  <input className='form-control' name="groupName" type="text" placeholder='Group Name' onChange={(e) => setValue({
                                    ...value,
                                    ["groupName"]:e.target.value
                                  })} />
                                </div>
                              </div>
                            </div>
                            <div className='row' style={{marginTop:"20px",marginBottom:"10px"}}>
                              <div className='col-sm-12'>
                                <div className='form-group'>
                                  <label>
                                    <b>Selected Shopper Count</b>
                                    <br></br>
                                    <span style={{color:"#5B5B5B"}}>{selectedItem?.length}</span>
                                  </label>
                                  
                                </div>
                              </div>
                            </div>
                            <div className='row' style={{marginTop:"10px"}}>
                                             <div style={{textAlign:"end",gap:"5px"}}>
                                                <button  className='btn btn-light' style={{background:"#F0F0F0",padding:"6px 12px",marginRight:"5px",color:"#5B5B5B"}}
                                                onClick={handleClose}
                                                >
                                                    <FontAwesomeIcon icon={faRemove} style={{color:"#5B5B5B",fontSize:"13px",fontWeight:"300",marginRight:"3px"}} />
                                                    Cancel
                                                    </button>
                                                <button  className='btn btn-success'  onClick={(e) => handleSubmit(e)}>
                                                <FontAwesomeIcon icon={faSave}  style={{color:"#fff",fontSize:"13px",fontWeight:"300",marginRight:"3px"}} />
                                                    Save</button>
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

export default CreateShopperGroup