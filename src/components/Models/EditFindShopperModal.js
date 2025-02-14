import React, { useEffect,useState } from 'react';
import { Col, Form, Modal, Row, Container, Button } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFindShopperByIdApi, updateFindShopperAPI } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
const EditFindShopperModal = ({
  show,
  handleClose,
  clientName,
  userDetailId,
  getClientStoresData,
  getFindShopperDetailsData,
  getFindShopperDetailsMessage,
  getFindShopperDetailsLoading,
  searchValue,
  setSuccessMsg,
  setShowNotificationError,
}) => {
 
  const dispatch = useDispatch();


  const  matchStore = Array.isArray(getClientStoresData) ? getClientStoresData?.find(store => store.clientStoreId === getFindShopperDetailsData?.clientStoreId) : undefined;
  const storeName = matchStore?.storeName;
 const [value,setValue] = useState({
  "email": "",
  "memberNumber": "",
  "phoneNumber": "",
  "zipCode": "",
  "clientStoreId": "",
  "firstName": "",
  "lastName": "",
  "signUpDate": "",
  "stores":""
});


const handleInput = (e,name) => {
  setValue((prev) => {
    return {
      ...prev,
      [name]:e.target.value
    }
  })
} 
 useEffect(() => {
  if(getFindShopperDetailsData && Object?.keys(getFindShopperDetailsData)?.length > 0){
    setValue({
      email: getFindShopperDetailsData?.email,
      memberNumber:getFindShopperDetailsData?.barCodeValue,
      phoneNumber:getFindShopperDetailsData?.mobile,
      zipCode:getFindShopperDetailsData?.zipCode,
      stores:storeName,
      clientStoreId:getFindShopperDetailsData?.clientStoreId,
      firstName:getFindShopperDetailsData?.firstName,
      lastName:getFindShopperDetailsData?.lastName,
      signUpDate : getFindShopperDetailsData?.signUpDate?.slice(0,10)
      
    })
  }
 },[getFindShopperDetailsData]);

const handleSubmit =(e) => {
  e.preventDefault();
  dispatch(updateFindShopperAPI(clientName,userDetailId,value,searchValue));
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
            top: 20,
            borderRadius: "0px"
            // transform: "translate(-50%, -50%)",
  
            // padding: "20px",
            // borderRadius: "8px"
          }}
  
        >
          <div className="modal-content" style={{ width: "600px" }}>
            <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height:"85px",borderBottom: "1px solid #e5e5e5", width: "600px", position: "relative" }}>
  
  
  
  
  
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
                }}>Edit <strong>Shopper</strong> Details</h2>
  
            </div>
            <div className="modal-body" style={{ width: "600px", position: "relative", padding: "12px" }}>
              <div id="viewContent">
                <div className='widget'>
                  <div className='widget-content'>
       {
         getFindShopperDetailsData && Object.keys(getFindShopperDetailsData)?.length > 0  ?
        //getFindShopperDetailsData  ?
        <>
        
        <Row style={{ marginBottom: "15px" }}>
                      <Col xs={12} md={6} >
                        <Form.Group controlId="Email" className='custom-form-group'>
                          <Form.Label>Email
  
  
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            disabled={true}
                            value={value.email}
                            required
                            onChange={(e) => handleInput(e,"email")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The Email field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="MemberNumber" className='custom-form-group'>
                          <Form.Label>Member Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="memberNumber"
                            placeholder="Member Number"
                            value={value.memberNumber}
                            required
                            onChange={(e) => handleInput(e,"memberNumber")}
                            disabled={true}
                          />
                          <Form.Control.Feedback type="invalid">
                            The Member Number field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row style={{ marginBottom: "15px" }}>
                      <Col xs={12} md={6} >
                        <Form.Group controlId="PhoneNumber" className='custom-form-group'>
                          <Form.Label>Phone Number
  
  
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={value.phoneNumber}
                            required
                            onChange={(e) => handleInput(e,"phoneNumber")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The Phone Number field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="ZipCode" className='custom-form-group'>
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            placeholder="Zip Code"
                            value={value.zipCode}
                            required
                            onChange={(e) => handleInput(e,"zipCode")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The ZipCode field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Row style={{ marginBottom: "15px" }}>
                      <Col xs={12} md={6} >
                        <Form.Group controlId="FirstName" className='custom-form-group'>
                          <Form.Label>First Name
  
  
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={value.firstName}
                            required
                            onChange={(e) => handleInput(e,"firstName")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The First Name field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="LastName" className='custom-form-group'>
                          <Form.Label>Last Name
  
  
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={value.lastName}
                            required
                            onChange={(e) => handleInput(e,"lastName")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The Last Name field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "15px" }}>
                      <Col xs={12} md={6} >
                        <Form.Group controlId="SignUpDate" className='custom-form-group'>
                          <Form.Label>Sign Up Date
  
  
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="signUpDate"
                            placeholder="Sign Up Date"
                            value={value.signUpDate}
                            required
                            onChange={(e) => handleInput(e,"signUpDate")}
                          />
                          <Form.Control.Feedback type="invalid">
                            The Sign Up Date field is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6} >
  
                        {/* <Form.Group controlId="Stores">
    <Form.Label>Select Stores</Form.Label>
    <Form.Select  name="Stores" value={"My Stores"}>
    <option value={""}>Select Stores</option>
    <option value={""}>My Stores</option>
    <option value={""}>Akins Foods</option>
    </Form.Select>
  </Form.Group> */}
  
                        <div className='custom-form-group'>
                          <label>Stores</label>
                          <select
                            style={{ width: "239.2px", borderRadius: "4px" }}
                          
                            name="stores"
                            value={value.stores}
                            required
                            onChange={(e) =>{
                              const selectStores = getClientStoresData?.find((store) => store.storeName === e.target.value);
                              handleInput(e, "stores");
                              setValue((prev) => {
                                  return {
                                      ...prev,
                                      ["clientStoreId"]: selectStores?.clientStoreId
                                  }
                              })
                            } }
                            >
                              <option value={""}>Select Store</option>
                           {
                            getClientStoresData?.length > 0 &&
                            getClientStoresData?.map((each,i) => {
                              return <option value={each.storeName} id={each?.clientStoreId} key={i}>{each?.storeName}</option>
                            })
                           }
                           
                          
                          </select>
                        </div>
  
                      </Col>
                    </Row>
  
                    <Row>
                      <Col xs={12} md={{ span: 5, offset: 6 }}>
                        <Form.Group style={{ marginTop: "20px" ,marginLeft:"10px"}}>
                          <div style={{ display: "flex", alignItems: "center",gap:"30px", minHeight:"35px"}}>
                            <button  className='btncancel' onClick={handleClose}>Cancel</button>
                            <button  type="submit" className= 'btnSave' onClick={(e) =>{
                              handleSubmit(e);
                              handleClose();
                              setSuccessMsg("Shopper details updated successfully.");
                              setShowNotificationError(true);
                            } } > {" Save  "}  </button>
  
                           
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
  
        </>
        :
        <>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <Spinner animation="border" variant="success" />
        </div>
        </>
       }
  
  
  
  
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    );
}

export default EditFindShopperModal