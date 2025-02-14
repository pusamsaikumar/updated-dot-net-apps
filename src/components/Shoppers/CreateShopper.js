import { faUser,faSave,faWarning,faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShopperAPI, GetRolesAPI, GetUserTypesAPI } from '../redux/API';
import LoaderModal from '../Models/LoaderModal';

const CreateShopper = ({
    clientName,
    isEnlarged
}) => {

    const  getUserTypesData = useSelector((state) => state. getUserTypesData);
    const getUserTypesLoading = useSelector((state) => state.getUserTypesLoading);
    const getRolesData = useSelector((state) => state.getRolesData);
    const getRolesLoading = useSelector((state) => state.getRolesLoading);
    
    
    const dispatch = useDispatch();

    const [successMsg,setSuccessMsg] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const [showErrorNotification,setShowErrorNotification] = useState(false);
    const [showSuccessNotification,setShowSuccessNotification] = useState(false);

   const createShopperData  = useSelector((state) => state.createShopperData);
   const createShopperMessage = useSelector(state => state.createShopperMessage);
   const createShopperLoading  = useSelector(state => state.createShopperLoading)

    const handleNotificationError = () => {
        setShowErrorNotification(false);
    }
    const handleNotificationSuccess = () => {
        setShowSuccessNotification(false);
    }

    const [value,setValue] = useState({
        "userName": "",
        "password": "",
        "confirmPassword": "",
        "firstName": "",
        "lastName": "",
        "userTypeId": "",
        "zipCode":"",
        "mobile": "",
        "roleName": "",
        "isActive":false
      });

      const handleInput =(e,name) => {
        setValue((prev) => {
            return {
                ...prev,
                [name] :e.target.value
            }
        })
      }
      const handleSumbmit = (e) => {
        e.preventDefault();
        console.log("value",value);
        if(
            value.userName.trim() === "" ||
            value.zipCode.trim() === "" ||
            value.password.trim() === "" ||
            value.confirmPassword.trim() === "" ||
            value?.firstName.trim() === "" ||
            value?.lastName.trim() === "" ||
            value?.userTypeId.trim() === "" ||
            value?.roleName.trim() === "" 
        ){
            setShowErrorNotification(true);
            setErrorMsg("Please fill required field details.")
        } else if(value?.password !== value?.confirmPassword){
            setShowErrorNotification(true);
            setErrorMsg("Passwords do not match. Please try again.")
        }else{
            dispatch(createShopperAPI(clientName,value))
        }
      }

       useEffect(() => {
            if(createShopperData === "Successful"){
                    setSuccessMsg("Successfully saved create shopper details.");
                    setShowSuccessNotification(true);
            }else{
                setErrorMsg(createShopperMessage);
                setShowErrorNotification(true);
            }
       },[successMsg,createShopperMessage,createShopperData])
      useEffect(()=>{
           
                if(clientName === "Veritra RSA"){
                    dispatch(GetUserTypesAPI(clientName));
                    dispatch(GetRolesAPI(clientName));
                }
            
      },[clientName]);

       const handleCheckBoxChange =(e) => {
        let isChecked = e.target.checked;
        if(isChecked){
            setValue({
                ...value,
                ["isActive"]:true
            })
        } else{
            setValue({
                ...value,
                ["isActive"]:false
            })
        }

       }
   
  return (
  <>
  <div className='right side-menu'>

</div>  
<div className='content-page style-gg' style={{ height: "100vh", marginLeft: isEnlarged ? "50px" : "240px"}}>
    <div className='content' >
       <div className='' >
       <h1 style={{display:"flex",color:"#505458",fontSize:"24px",marginRight:"5px"}}>
        
           <FontAwesomeIcon  icon={faUser} style={{color:"#505458",width:"19px",height:"25px",marginRight:"5px" }}/> 
           <span>Create Shopper</span>
        
        </h1>
        {
                            errorMsg != "" && showErrorNotification === true &&
                            // <div style={{top:"-40px",right:"10px",position:"absolute",margin:"5px",zIndex:"1px",height:"52x",zIndex:"1000"}}>

                            <div style={{ color: "#fff", background: "#FFC052", margin: "5px", padding: "5px", display: "flex", position: "fixed", alignItems: "center", top: "0", right: "0", zIndex: "1000" }}
                                onClick={ handleNotificationError}
                            >
                                <FontAwesomeIcon icon={faWarning} style={{ fontSize: "35px" }} />

                                <span style={{ color: "#fff", background: "#FFC052", fontSize: "15px" }} >


                                    {errorMsg}
                                </span>
                            </div>

                            // </div>
                        }

                        {
                            successMsg != "" && showSuccessNotification === true &&
                            // <div style={{top:"-40px",right:"10px",position:"absolute",margin:"5px",zIndex:"1px",height:"52x",zIndex:"1000"}}>

                            <div
                                style={{
                                    color: "#FFFFFF",
                                    background: "#FFC052",
                                    margin: "5px",
                                    padding: "5px",
                                    display: "flex",
                                    position: "fixed",
                                    alignItems: "center",
                                    top: "0",
                                    right: "0",
                                    zIndex: "1000",
                                    backgroundColor: "#68C39F",
                                    borderColor: "#68C39F",
                                    border: "1px solid #68C39F"



                                }}
                                onClick={handleNotificationSuccess}
                            >
                                <FontAwesomeIcon icon={faCheck} style={{ fontSize: "15px", marginRight: "10px", fontWeight: "500" }} />

                                <span style={{ color: "#FFFFFF", background: "#68C39F", fontSize: "15px" }} >

                                    {successMsg}
                                </span>
                            </div>

                            // </div>
                        }

       </div>
       <div className='row'>
       <div className='col-sm-12'>
        <div className='widget' style={{position:"relative" ,background:"#fff", color:"#5B5B5B",marginBottom:"20px"}}>  
            <div className='widget-content padding' style={{padding:"20px 0px"}}>
                <div className='row'>
                    <div className='col-sm-5' style={{background:"#fff"}}>
                       <div className='row'>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>UserName
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='User Name' 
                                    value={value?.userName} 
                                    name="userName" 
                                    onChange={(e) => {
                                        handleInput(e,"userName");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>Password
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                        type='text' 
                                        className='form-control valid'
                                        placeholder='Password'
                                        value={value?.password} 
                                        name="password" 
                                        onChange={(e) => {
                                            handleInput(e,"password");
                                        }}
                                        />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>First Name
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='First Name' 
                                    value={value?.firstName} 
                                    name="firstName"
                                    onChange={(e) => {
                                        handleInput(e,"firstName");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>User Access Type
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <select 
                                    className='form-control' 
                                    id = {value?.userTypeId} 
                                    value={value?.userTypeId} 
                                    name="userTypeId"
                                    onChange={(e) => {
                                        handleInput(e,"userTypeId");
                                    }}
                                    >
                                        <option value={""}>Select User Access Type</option>
                                        {
                                             getUserTypesData?.length > 0 &&
                                             <>
                                             {
                                                 getUserTypesData?.map((each,i) => {
                                                    return <option value={each?.id}>{each?.userType}</option>
                                                 })
                                             }
                                             </> 
                                        }
                                        {/* <option>Client Web</option>
                                        <option>Client Mobile</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>Role
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <select
                                     className='form-control'
                                     id={value?.roleName}
                                     name="roleName"
                                     onChange={(e)=>{
                                            handleInput(e,"roleName");
                                     }} 
                                    
                                    >
                                        <option>Select Role</option>
                                        {/* <option>AccountingManager</option>
                                        <option>ClientAdmin</option>
                                        <option>ClientUser</option>
                                        <option>CustomerService</option>
                                        <option>ITManager</option>
                                        <option>LoyalityManager</option>
                                        <option>PromotionManager</option> */}
                                        {
                                            getRolesData?.length > 0 && (
                                                <>
                                                 {
                                                    getRolesData?.map((each,i) => {
                                                        return <option key={each?.id} value={each?.roleName}>{each?.roleName}</option>
                                                    })
                                                 }
                                                </>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className='col-sm-5' style={{marginLeft:"-187px"}}>
                    <div className='row'>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>Zip Code
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='Zip Code' 
                                    value={value?.zipCode} 
                                    name="zipCode" 
                                    onChange={(e) => {
                                        handleInput(e,"zipCode");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label> Confirm Password
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='Confirm Password' 
                                    value={value?.confirmPassword} 
                                    name="confirmPassword"
                                    onChange={(e) => {
                                        handleInput(e,"confirmPassword");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>Last Name
                                        <span style={{color:"red"}}>*</span>
                                    </label>
                                    <input 
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='Last Name' 
                                    value={value?.lastName} 
                                    name="lastName" 
                                    onChange={(e) => {
                                        handleInput(e,"lastName");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"15px"}}>
                                <div className='form-group'>
                                    <label>Phone
                                        {/* <span style={{color:"red"}}>*</span> */}
                                    </label>
                                    <input  
                                    type='text' 
                                    className='form-control valid' 
                                    placeholder='Phone Number' 
                                    value={value?.mobile} 
                                    name="mobile" 
                                    onChange={(e) => {
                                        handleInput(e,"mobile");
                                    }}
                                    />
                                </div>
                            </div>
                            <div className='col-sm-7' style={{marginBottom:"20px"}}>
                            <div className='form-group' style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}}>
                                    <input 
                                    
                                    type="checkbox" 
                                    checked={value?.isActive}
                                    style={{width:"30px",height:"30px" }}
                                     onChange={(e) => {
                                        handleCheckBoxChange(e)
                                     }}
                                    />
                                    <input type='hidden' 
                                    className='form-control valid'  
                                    value={value?.isActive} name="isActive"
                                     onChange={(e) => {
                                        handleInput(e,"isActive");
                                     }}
                                    />
                                    <label>Is Active</label>
                                </div>
                            </div>
                            <div className='row'>
                            <div className='col-sm-12' style={{marginBottom:"15px"}}>
                                <div className='form-group' style={{marginLeft:"200px"}}>
                                <button  className='btn btn-success' onClick={(e) => {
                                    handleSumbmit(e);
                                }} >
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
    </div>
</div>
{
    (
        //clientName != "Veritra RSA" ||
        getRolesLoading === true ||
    getUserTypesLoading == true) && <LoaderModal show={true} />
}
  </>
  )
}

export default CreateShopper