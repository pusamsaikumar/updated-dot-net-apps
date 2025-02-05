import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI, GetSearchAndCountAPI, GetSearchAndCreateAPI } from '../redux/API';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import LoaderModal from '../Models/LoaderModal';
import { TabPane } from 'react-bootstrap';
import { GetAdvancedShopperSearchReducer } from '../redux/Reducer';

const BylastDatePurchase = ({
    handleDropdown, open, clientName, setOpen,  isEnlarged
}) => {
    const [value,setValue] = useState( {
        minDays:"0",
        maxDays:"0",
        groupName:""
    });

  const  getSearchAndCountData = useSelector(state => state.getSearchAndCountData);
  const  getSearchAndCountMessage = useSelector(state => state.getSearchAndCountMessage);
  const  getSearchAndCountLoading = useSelector(state => state.getSearchAndCountLoading);

  const getSearchAndCreateGroupMessage = useSelector(state => state.getSearchAndCreateGroupMessage);


  
console.log("valu",value)


    const dispatch = useDispatch();
    const handleInput = (e,name) => {
        setValue((prev) => {
            return {
                ...prev,
                [name]:e.target.value
            }
        })
    }
    const handleSearchAndCount = (e) => {
        e.preventDefault();
      
       if(value?.minDays === "0"){
        setErrorMsg("Entered value must be 1 or more than 1.")
    }
    else if(value?.maxDays === "0"){
        setErrorMsg("Entered value must be 1 or more than 1.")
    }
        else{
            setErrorMsg("");
            dispatch(GetSearchAndCountAPI(value,clientName))
        }
    }
    const handleSearchAndCreate = (e) => {
        e.preventDefault();
        if(value?.maxDays === "0" || value?.minDays === "0"){
            setErrorMsg("Entered value must be 1 or more than 1.")
        }else{
            dispatch(GetSearchAndCreateAPI(value,clientName))
        }
        
    }
    // Notifications:
     const [errorMsg, setErrorMsg] = useState("");
        const [successMsg, setSuccessMsg] = useState("")
        const [showNotificationError, setShowNotificationError] = useState(false);
        const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);
    
    
    
        const handleNoficationError = () => {
            setErrorMsg("");
            setShowNotificationError(false);
        }
        const handleNotificationSuccess = () => {
            setShowNotificationSuccess(false);
        }
        useEffect(() => {
            if (errorMsg) {
                setShowNotificationError(true);
                const timer = setTimeout(() => {
                    setShowNotificationError(false);
                }, 10000);
                return () => clearTimeout(timer);
            }
        }, [errorMsg])
    
        useEffect(() => {
            if (successMsg) {
                setShowNotificationSuccess(true);
                const timer = setTimeout(() => {
                    setShowNotificationSuccess(false)
                }, 10000);
                return () => clearTimeout(timer);
            }
        }, [successMsg]);

        useEffect(()=>{
           if(getSearchAndCreateGroupMessage === "Successful"){
            setSuccessMsg("Shopper group created successfully.")
           }
          else if(getSearchAndCreateGroupMessage !="" && getSearchAndCreateGroupMessage != "Successful" ){
            setErrorMsg("Something went wrong. Please try again.")
           }else{
            setSuccessMsg("");
            setErrorMsg("")
           }
        },[getSearchAndCreateGroupMessage])
    
  return (
    <>
     <div className='right side-menu'> 

</div>
<div className='content-page style-gg' style={{ height: "100vh", marginLeft: isEnlarged ? "50px" : "240px" }}>
    <div className='content' style={{


        padding: "10px",
        outline: "none",
        // overflowY:"auto"

        //    marginLeft:isEnlarged ? "0px" :"0px"
        // background: "#f3f3f3"
        // backgroundColor: "#f9f9f9"
    }}>
         <div style={{ height: "53px" }}>
                                <h1 style={{ color: "#505458", fontSize: "24px" }}>
                                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                                    <span>Search Based On Nummber Of Days Since Last Purchase</span>
                                </h1>
                            </div>
                            <div style={{ color: "#FFFFFF" }}>
                                <div className='row' >
                                    <div className='col-sm-12' >
                                        <div className='widgetH'>
                                            <div className='' style={{ padding: "15px" }}>
        
                                                <table className='table table-bordered table-stripped ' style={{ clear: "both", width: "750px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td width={"20%"}>
                                                                <a href='#' >Last Shopped</a>
                                                            </td>
                                                            <td width={"40%"} style={{ textAlign: "left" }}>
                                                                <label style={{ fontWeight: "600" }}>
                                                                    {"Between "}
                                                                    <input type="text"  
                                                                    name="minDays"
                                                                    value={value?.minDays}
                                                                    onChange={(e) => {
                                                                        handleInput(e,"minDays")
                                                                    }}
                                                                    minLength={"3"}
                                                                    style={{width:"100px",padding:"6px 12px",fontSize:"14px",borderRadius:"4px",border:"1px solid #ccc",color:"#555",backgroundColor:"#fff",lineHeight:"1.42857143"}}
                                                                    />
                                                                    {" and "}
                                                                    <input type="text" 
                                                                     name="maxDays"
                                                                     value={value?.maxDays}
                                                                     onChange={(e) => {
                                                                         handleInput(e,"maxDays")
                                                                     }}
                                                                    style={{width:"100px",padding:"6px 12px",fontSize:"14px",borderRadius:"4px",border:"1px solid #ccc",color:"#555",backgroundColor:"#fff",lineHeight:"1.42857143"}}
                                                                    
                                                                    />
                                                                    {" Days ago"}
                                                                </label>
                                                            </td>
                                                        </tr>
        
                                                        <tr>
                                                            <td width={"20%"}>
                                                                <a href='#' >Enter Group Name</a>
                                                            </td>
                                                            <td width={"40%"} style={{ textAlign: "left",marginLeft:"10px" }}>
                                                            <input type="text"  
                                                                    minLength={"99"}
                                                                    placeholder='Group Name'
                                                                    name="groupName"
                                                                     value={value?.groupName}
                                                                     onChange={(e) => {
                                                                         handleInput(e,"groupName")
                                                                     }}
                                                                    style={{width:"100%",padding:"6px 12px",fontSize:"14px",border:"1px solid #ccc",color:"#555",backgroundColor:"#fff",lineHeight:"1.42857143"}}
                                                                    />
                                                            </td>
                                                        </tr>
                                                        
                                                      
                                                     
                                                    </tbody>
                                                </table>
                                                <div className='row'>
                                                <br />
                                                <div>
                                                    <div style={{float:"left",marginLeft:"20px"}}>
                                                        <button type='button' className='btn btn-success' onClick={(e) => handleSearchAndCount(e)} >Search and Show Count</button>
                                                    </div>
                                                    <div style={{float:"left",marginLeft:"80px"}}>
                                                        <button type='button' className='btn btn-success' onClick={(e) => handleSearchAndCreate(e)} >Search and Create Group</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                              {
                                getSearchAndCountMessage !="" &&
                                <div className='row'>
                                <div className='col-sm-12'>
                                { " Your query returned  "}
                                <span style={{color:"#0088cc",fontSize:"15px",fontStyle:"italic"}}>

                                  {
                                      getSearchAndCountData?.length > 0 ? 
                                      <>
                                      {
                                          getSearchAndCountData?.map((each,i) => 
                                            <span key={i}>{each?.totalShoppers}</span>
                                          )
                                      }
                                      </>
                                      :
                                      <>
                                      {"0"}
                                      </>
                                  }
                                </span>
                                {" shoppers"}    
                              </div>                                   
                             </div> 
                              }                                       
                            </div>
        </div>
        </div>
        <>
        {
             getSearchAndCountLoading  === true &&
            <LoaderModal show={true} />
        }
        </>
           {
                                    errorMsg != "" && showNotificationError === true &&
                                    // <div style={{top:"-40px",right:"10px",position:"absolute",margin:"5px",zIndex:"1px",height:"52x",zIndex:"1000"}}>
        
                                    <div style={{ color: "#fff", background: "#FFC052", margin: "5px", padding: "5px", display: "flex", position: "fixed", alignItems: "center", top: "0", right: "0", zIndex: "1000" }}
                                        onClick={handleNoficationError}
                                    >
                                        <FontAwesomeIcon icon={faWarning} style={{ fontSize: "35px" }} />
        
                                        <span style={{ color: "#fff", background: "#FFC052", fontSize: "15px" }} >
        
        
                                            {errorMsg}
                                        </span>
                                    </div>
        
                                    // </div>
                                }
        
                                {
                                    successMsg != "" && showNotificationSuccess === true &&
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
        
    </>
  )
}

export default BylastDatePurchase