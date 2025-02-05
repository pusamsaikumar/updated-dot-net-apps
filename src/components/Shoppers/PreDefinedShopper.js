import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faTags } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, preDefinedShopperGroupByZipcodesListDataAPI, PreDefinedShopperGroupsByLastShoppedDateAPI, PreDefinedShopperGroupsByUPCListAPI } from '../redux/API';
import { Spinner } from 'react-bootstrap';
import ViewFindShopperModelPopup from '../Models/ViewFindShopperModelPopup';
import EditFindShopperModal from '../Models/EditFindShopperModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopperTransaction from './ShopperTransaction';
import { Link } from 'react-router-dom';
import LoaderModal from '../Models/LoaderModal';
import AddPointsModal from '../Models/AddPointsModal';
import DeleteModal from '../Models/DeleteModal';
import GroupsModal from '../Models/GroupsModal';
import { faUpDown } from '@fortawesome/free-solid-svg-icons/faUpDown';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import { getUserLMRewardswithMemberNumberReducer } from '../redux/Reducer';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

const  PreDefinedShopper =({
    clientName, isEnlarged
}) => {


    const dispatch = useDispatch();
    const [showLoader,setShowLoader] = useState(false);
    // handle selected groups
const [showZipCode,setShowZipCode] = useState(false);

const [showGroup,setShowGroup] = useState(true);

    const [selectGroup,setSelectGroup] = useState("");
    const handleZipcode =() => {
        setShowZipCode((prev) => !prev)
    }
    const handleGroups =(e) => {
        setShowGroup(false);
        setSelectGroup(e.target.value);
        setShowZipCode(true);
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false)
        }, 300);

    }
    const handleShowGroups = () => {
        setShowGroup(!showGroup)
    }

    // nofication for error , success
    const [errorMsg,setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);



    const handleNoficationError = () => {
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
    }, [successMsg])


// last shopper 
const [value,setValue] = useState({

    // zipcodes
    zipcodes:"",

    // last shopper
    groupName:"",
    lastDays:"",

    // products bought:
    productGroupName:"",
    productUPCs:"",
    productNoOfTimesBought:"0",
    productDuringLast:""
});

const [productValue,setProductValue] = useState({
    productGroupName:"",
    productUPCs:"",
    productNoOfTimesBought:"0",
    productDuringLast:""
});

const handleProductsInput = (e,name) => {
    setProductValue({
        ...value,
        [name]:e.target.value
    })
}

console.log("product val",productValue);

const handleInput = (e,name) => {
    setValue({
        ...value,
        [name]:e.target.value
    })
}
console.log("lost value",value);

// handle submit zipcode
const handleSubmitZipcodes = (e) => {
    e.preventDefault();
    dispatch(preDefinedShopperGroupByZipcodesListDataAPI(clientName,value));
    setShowNotificationSuccess(true);
    setSuccessMsg("Created zipcode groups successfully");
   
    
}

const handleSubmitLastShopped =(e)=>{
    e.preventDefault();
    dispatch(PreDefinedShopperGroupsByLastShoppedDateAPI(clientName,value));
    setShowNotificationSuccess(true);
    setSuccessMsg("Created lost shopped groups successfully");
}

const handleSubmitUpcs =(e) => {
    e.preventDefault();
    dispatch(PreDefinedShopperGroupsByUPCListAPI(clientName,value));
    setShowNotificationSuccess(true);
    setSuccessMsg("Created UPCs groups successfully");
}
return (
    <>
         <div className='right side-menu'>

</div>
<div className='content-page style-gg' style={{ height: "100vh", marginLeft: isEnlarged ? "50px" : "240px"}}>
    <div className='content' style={{


        padding: "10px",
        outline: "none",
        // overflowY:"auto"

        //    marginLeft:isEnlarged ? "0px" :"0px"
        // background: "#f3f3f3"
        // backgroundColor: "#f9f9f9"
    }}>

        <div>
            <h1 style={{color:"#505458"}}>
                <FontAwesomeIcon  icon={faTags}/>
                &nbsp;
                <span>Pre-Defined Groups</span>
            </h1>
        </div>
        <div style={{marginTop:"15px",background:"#FFFFFF",padding:"10px"}}>
            <div
             
               onClick={handleShowGroups} 

              
                >
                <h2><strong>Group Types</strong></h2>
            </div>
       

<div className='row'>
              <div className='col-sm-12'>
                <div className='row'>
                    <div className='col-sm-12' >
                        <div className='row' style={{padding:"5px",display:showGroup ? "block":"none"}}>
                            <div className='col-sm-2' style={{display:"flex",alignItems:"center",paddingBottom:"10px"}}>
                                <input 
                                type="radio" 
                                style={{width:"22px",height:"22px",marginRight:"5px"}}
                                name="zipcode"
                                value={"zipcode"}
                                checked={selectGroup === "zipcode"}
                                onClick={(e) => handleGroups(e)}
                                />
                                <span>Zipcode</span>
                            </div>
                            <div className='col-sm-2' style={{display:"flex",alignItems:"center",paddingBottom:"10px"}}>
                            <input 
                                type="radio" 
                                style={{width:"22px",height:"22px",marginRight:"5px"}}
                                name="lostShopper"
                                value={"lostShopper"}
                                checked={selectGroup === "lostShopper"}
                                onClick={(e) => handleGroups(e)}
                                />
                                <span>Lost Shoppers</span>
                            </div>
                            <div className='col-sm-2'style={{display:"flex",alignItems:"center",paddingBottom:"10px"}}>
                            <input 
                                type="radio" 
                                style={{width:"22px",height:"22px",marginRight:"5px"}}
                                name="productBrought"
                                value={"productBrought"}
                                checked={selectGroup === "productBrought"}
                                onClick={(e) => handleGroups(e)}
                                />
                                <span>Products Bought</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          
          
        </div>
        <br />
        {
            selectGroup === "zipcode"  && (
                <>
                   <div style={{
                    background:"#FFFFFF",
                    padding:"10px",
                     animation: "fadeInUp 0.9s",
                    // transform: "translateY(-5px)",
                }} 


                   // className={selectGroup === "zipcode"  && "animate__animated animate__fadeInUp" }
                    
                     >
                <div style={{color:"#5B5B5B",background:"#FFFFFF",padding:"10px",fontWeight:"400"}}
                    onClick={()=>  {
                        handleZipcode();
                      
                    }}
                >
                    <h2>Zipcode</h2>
                </div>
                <br />
                <div 
                  className={`${showZipCode ? "animate__animated animate__fadeInDown" :"animate__animated animate__fadeInUp"}`}
                  style={{
                    display: showZipCode || !showZipCode ? "block" : "none",
                    overflow: "hidden",
                    transition: "all 0.3s",
                }}
                >
                   {
                    showZipCode &&
                    <div className='row'>
                    <div className='col-md-12'>
                        <div 
                        
                        >
                            <section>
                                <div className='row'>
                                    <div className='col-md-4' style={{width:"500px",marginLeft:"50px"}}>
                                            <div className='note'>
                                               <div className='form-group'>
                                                    <label>
                                                        Enter Zipcode
                                                        <span style={{color:"red"}}>*</span>
                                                        <textarea rows={"10"} cols={"40"} className='form-control'style={{width:"460px",marginTop:"5px",marginBottom:"20px"}}
                                                        placeholder='Paste/Enter 5 digit postal codes seperated by comma (no spaces)'
                                                        value ={value?.zipcodes} name="zipcodes" onChange={(e) => handleInput(e,"zipcodes")}
                                                        ></textarea>
                                                    </label>
                                               </div>
                                               <div className='form-group'>
                                                <button type='button' onClick={(e) =>  handleSubmitZipcodes(e)} className='btn btn-success' style={{marginLeft:"5px"}}> 
                                                    <FontAwesomeIcon icon={faFloppyDisk} style={{marginRight:"5px"}} />
                                                    Create
                                                    </button>
                                               </div>
                                            </div>
                                        </div>                
                                </div>
                            </section>
                        </div>
                    </div>
                </div>    
                   }
                </div>
            </div>
                </>
            )
        }

{
            selectGroup === "lostShopper"  && (
                <>
                   <div style={{
                    background:"#FFFFFF",
                    padding:"10px",
                     animation: "fadeInUp 0.9s",
                    // transform: "translateY(-5px)",
                }} 


                  // className={selectGroup === "zipcode"  && "animate__animated animate__fadeInUp" }
                    
                     >
                <div style={{color:"#5B5B5B",background:"#FFFFFF",padding:"10px",fontWeight:"400"}}
                    onClick={()=>  {
                        handleZipcode();
                      
                    }}
                >
                    <h2>Lost Shoppers</h2>
                </div>
                <br />
                <div 
                  className={`${showZipCode ? "animate__animated animate__fadeInDown" :"animate__animated animate__fadeInUp"}`}
                  style={{
                    display: showZipCode || !showZipCode ? "block" : "none",
                    overflow: "hidden",
                    transition: "all 0.3s",
                }}
                >
                   {
                    showZipCode &&
                    <div className='row'>
                    <div className='col-md-12'>
                        <div 
                        
                        >
                            <section>
                                <div className='row'>
                                    <div className='col-md-4' style={{width:"500px",marginLeft:"50px"}}>
                                            <div className='note'>
                                               <div className='form-group'>
                                                    <label>
                                                        Group Name
                                                        <span style={{color:"red"}}>*</span>
                                                        <input type="text" className='form-control' name="groupName" value = {value.groupName} style={{width:"465px",padding:"6px 12px"}} placeholder='Enter Group Name' onChange={(e) => handleInput(e,"groupName")} />
                                                    </label>
                                               </div>
                                               <br />
                                               <div className='form-group'>
                                               <label>
                                                        Not Shopped In
                                                        <span style={{color:"red"}}>*</span>
                                              </label>
                                              <table>
                                                <tbody>
                                                   <tr>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio' value={"7"}  name="lastDays" onChange={(e) => {
                                                            handleInput(e,"lastDays");
                                                            // setValue({
                                                            //     ...value,
                                                            //     ["lastDays"]:e.target.value
                                                            // })
                                                        }} style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 7 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio'   value={"14"} name="lastDays"  onChange={(e) => {
                                                            handleInput(e,"lastDays");
                                                            // setValue({
                                                            //     ...value,
                                                            //     ["lastDays"]:e.target.value
                                                            // })
                                                        }}  style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 14 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio'  value={"30"} name="lastDays" onChange={(e) => {
                                                           handleInput(e,"lastDays");
                                                           // setValue({
                                                           //     ...value,
                                                           //     ["lastDays"]:e.target.value
                                                           // })
                                                        }}  style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 30 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio'  value={"90"} name="lastDays" onChange={(e) => {
                                                            handleInput(e,"lastDays");
                                                            // setValue({
                                                            //     ...value,
                                                            //     ["lastDays"]:e.target.value
                                                            // })
                                                        }}  style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 90 Days"}
                                                        <br />
                                                    </td>
                                                   </tr>
                                                </tbody>
                                              </table>
                                               </div>
                                               <br />
                                               <br />
                                               <div className='form-group'>
                                                <button type='button' onClick={(e) =>  handleSubmitLastShopped(e) } className='btn btn-success' style={{marginLeft:"5px"}}> 
                                                    <FontAwesomeIcon icon={faFloppyDisk} style={{marginRight:"5px"}} />
                                                    Create
                                                    </button>
                                               </div>
                                            </div>
                                        </div>                
                                </div>
                            </section>
                        </div>
                    </div>
                </div>    
                   }
                </div>
            </div>
                </>
            )
        }


{
            selectGroup === "productBrought"  && (
                <>
                   <div style={{
                    background:"#FFFFFF",
                    padding:"10px",
                     animation: "fadeInUp 0.9s",
                    // transform: "translateY(-5px)",
                }} 


                   // className={   selectGroup === "productBrought"   && "animate__animated animate__fadeInUp" }
                    
                     >
                <div style={{color:"#5B5B5B",background:"#FFFFFF",padding:"10px",fontWeight:"400"}}
                    onClick={()=>  {
                        handleZipcode();
                      
                    }}
                >
                    <h2>Products Bought</h2>
                </div>
                <br />
                <div 
                  className={`${showZipCode ? "animate__animated animate__fadeInDown" :"animate__animated animate__fadeInUp"}`}
                  style={{
                    display: showZipCode || !showZipCode ? "block" : "none",
                    overflow: "hidden",
                    transition: "all 0.3s",
                }}
                >
                   {
                    showZipCode &&
                    <div className='row'>
                    <div className='col-md-12'>
                        <div 
                        
                        >
                            <section>
                                <div className='row'>
                                    <div className='col-md-4' style={{width:"500px",marginLeft:"50px"}}>
                                            <div className='note'>
                                            <div className='form-group'>
                                                    <label>
                                                        Group Name
                                                        <span style={{color:"red"}}>*</span>
                                                        <input type='text' className='form-control' value={productValue?.productGroupName} name="productGroupName" onChange={(e) =>{
                                                             handleInput(e,"productGroupName");
                                                             handleProductsInput(e,"productGroupName")
                                                        }} style={{width:"465px",padding:"6px 12px"}} placeholder='Enter Group Name' />
                                                    </label>
                                               </div>
                                               <br />
                                               <div className='form-group'>
                                                    <label>
                                                        UPCs
                                                        <span style={{color:"red"}}>*</span>
                                                        <textarea rows={"10"} cols={"40"} className='form-control'style={{width:"460px",marginTop:"5px",marginBottom:"20px"}}
                                                        placeholder='Enter UPCs by comma seperated (no spaces)'
                                                        value={value?.productUPCs} name="productUPCs" onChange={(e) => handleInput(e,"productUPCs")}
                                                        ></textarea>
                                                    </label>
                                               </div>
                                            
                                               <div className='form-group'>
                                                    <label>
                                                        No Of Times Bought
                                                    </label>
                                                    <span style={{color:"red"}} >*</span>
                                                    <select className='form-select' style={{width:"100px",height:"30px"}} 
                                                      value={value?.productNoOfTimesBought} name="productNoOfTimesBought" onChange={(e) => handleInput(e,"productNoOfTimesBought")}
                                                    >
                                                        <option value={"0"}>None</option>  
                                                        <option value={"1"}>1-3</option>   
                                                        <option value={"2"}>4-6</option>   
                                                        <option value={"3"}>7-10</option>                                                 
                                                    </select>
                                               </div>
                                               <br />
                                               <div className='form-group'>
                                               <label>
                                                       During Last
                                                        <span style={{color:"red"}}>*</span>
                                              </label>
                                              <table>
                                                <tbody>
                                                   <tr>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio' value={"7"}  name="productDuringLast" onChange={(e) => {
                                                            handleInput(e,"productDuringLast");
                                                            setValue({
                                                                ...value,
                                                                ["productDuringLast"]:e.target.value
                                                            })
                                                        }} style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 7 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio' value={"14"}  name="productDuringLast" onChange={(e) => {
                                                            handleInput(e,"productDuringLast");
                                                            setValue({
                                                                ...value,
                                                                ["productDuringLast"]:e.target.value
                                                            })
                                                        }} style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 14 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio' value={"30"}  name="productDuringLast" onChange={(e) => {
                                                            handleInput(e,"productDuringLast");
                                                            setValue({
                                                                ...value,
                                                                ["productDuringLast"]:e.target.value
                                                            })
                                                        }} style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 30 Days"}
                                                        <br />
                                                    </td>
                                                    <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                        <input type='radio' value={"90"}  name="productDuringLast" onChange={(e) => {
                                                            handleInput(e,"productDuringLast");
                                                            setValue({
                                                                ...value,
                                                                ["productDuringLast"]:e.target.value
                                                            })
                                                        }} style={{width:"25px",height:"25px",verticalAlign:"inherit"}} />
                                                        {" 90 Days"}
                                                        <br />
                                                    </td>
                                                   </tr>
                                                </tbody>
                                              </table>
                                               </div>
                                               <br />
                                             
                                               <div className='form-group'>
                                                <button type='button' onClick={(e) => handleSubmitUpcs(e)} className='btn btn-success' style={{marginLeft:"5px"}}> 
                                                    <FontAwesomeIcon icon={faFloppyDisk} style={{marginRight:"5px"}} />
                                                    Create
                                                    </button>
                                               </div>
                                            </div>
                                        </div>                
                                </div>
                            </section>
                        </div>
                    </div>
                </div>    
                   }
                </div>
            </div>
                </>
            )
        }
     
        </div>
        </div>

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

<LoaderModal show={showLoader} />
      
    </>
)
}

export default PreDefinedShopper;