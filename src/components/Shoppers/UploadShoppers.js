import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI, UploadShoppersGroupsAPI } from '../redux/API';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import LoaderModal from '../Models/LoaderModal';
import { TabPane } from 'react-bootstrap';
import { GetAdvancedShopperSearchReducer } from '../redux/Reducer';
import * as XLSX from "xlsx";

const UploadShoppers = (
    {
        handleDropdown, open, clientName, setOpen, isEnlarged 
    }
) => {
    const [value,setValue] = useState({
        "file":"",
        "groupName":""
    })
   const [shopperDrop,setShopperDrop] = useState(true);
      const dropDownRef = useRef(null);
    
      const handleDrop = () => {
       //setShopperDrop(!shopperDrop);
       setShopperDrop((prev) => {
           if(prev && dropDownRef.current){
               dropDownRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
           }
           return !prev;
   
               })
      }
      const [data,setData] = useState();
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            setValue((prev) => {
                return {
                    ...prev,
                    ["file"]:file
                }
            })
             console.log("file",file)
            // if (file) {
            //   const reader = new FileReader();
            //   reader.onload = (e) => {
            //     const binaryStr = e.target.result;
            //     const workbook = XLSX.read(binaryStr, { type: "binary" });
          
            //     // Assuming the first sheet
            //     const sheetName = workbook.SheetNames[0];
            //     const worksheet = workbook.Sheets[sheetName];
          
            //     // Convert sheet to JSON
            //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            //     setData(jsonData);
            //   };
            //   reader.readAsBinaryString(file);
            // }
          };
          const getAllShopperGroupsData = useSelector(state => state.getAllShopperGroupsData);
              const getAllShopperGroupsLoading = useSelector(state => state.getAllShopperGroupsLoading);
              const getAllShopperGroupsMessage = useSelector(state => state.getAllShopperGroupsMessage);
              
   const  uploadShopperData = useSelector(state => state.uploadShopperData);
   const uploadShopperLoading = useSelector(state => state.uploadShopperLoading);
   const uploadShopperMessage = useSelector(state => state.uploadShopperMessage);


              const dispatch = useDispatch();
              
                  useEffect(() => {
                     
                      dispatch(GetAllshoppersGroupsAPI("Veritra RSA", 0, 0))
                  }, [dispatch]);
                console.log("groups",getAllShopperGroupsData);
                console.log("data",data);
                // Copy from file:
                useEffect(()=>{
                  const selectedUPCS = data?.length > 2 ? 
                 data?.slice(1)?.map((each) => each).join(",") 
                :  data?.length === 2 ? data[0] :"";
                const input = selectedUPCS.split(',').filter(item => item.trim() !== '').join(',');
                console.log("input",input)
                setValue((prev) => {
                  return {
                    ...prev,
                   // ["file"]:selectedUPCS
                   ["file"]:input
                  }
                })
                },[data]);
                console.log("value",value)
                const handleInput = (e,name) => {
                    setValue((prev) => {
                        return {
                            ...prev,
                            [name]:e.target.value
                        }
                    })
                }
            const handleSubmit =(e) => {
                e.preventDefault();
                if(value?.file === "" ){
                    setErrorMsg("Please select file.")
                }else if(value?.groupName === ""){
                    setErrorMsg("Please select group name.")
                }else{
                    setErrorMsg("");
                    dispatch(UploadShoppersGroupsAPI(clientName,value));
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
           if(uploadShopperMessage === "Successful"){
            setSuccessMsg("Shopper group created successfully.")
           }
          else if(uploadShopperMessage !="" && uploadShopperMessage != "Successful" ){
            setErrorMsg("Something went wrong. Please try again.")
           }else{
            setSuccessMsg("");
            setErrorMsg("")
           }
        },[uploadShopperMessage])
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
                        <div className='row'> 
                            <div className='col-md-12'  style={{background:"#fff"}}>
                            <div>
                        <div style={{float:"left",width:"500px" }}>
                           <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                           <h2 style={{ color: "#5B5B5B", fontSize: "16px" ,padding:"4px 13px",fontWeight:"400"}}>
                               ADD SHOPPERS TO GROUP
                            </h2>
                            <div>
                                <FontAwesomeIcon icon={faAngleDown} onClick={() => handleDrop()}  style={{color:"#ccc",cursor:"pointer"}} />
                            </div>
                           </div>
                           <div style={{padding:"15px",display:shopperDrop === true ? "":"none"}}>
                            <div className='row'>
                              <div className='col-sm-12'>
                              {" Click "}
                               <a href='#'>
                               here

                               </a>
                                { " for sample excel to add shoppers to group "}
                              </div>
                            </div>
                            <br />
                            <br />
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                <label>Select file</label>
                                            </td>
                                            <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                            <div className="form-group">
  
  <a 
  style={{background:"#ABB7B7",color:"#fff",padding:"10px",width:"100%",marginTop:"15px"}}
   onClick={(e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
   }}
  >
  {"Select file"}
  
  </a>
  <input id="fileInput" title='Select File' style={{display:"none"}} name="file" type='file' onChange={(e) => {
    handleFileUpload(e)
}} />
</div>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                        <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                <label>
                                                    Choose Group
                                                </label>
                                            </td>
                                            <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                <select className='form-control' value={value?.groupName} name="groupName" 
                                                    onChange={(e) => handleInput(e,"groupName")}
                                                >
                                                    <option>Select Group</option>
                                                    {
                                                        getAllShopperGroupsData?.length > 0 &&
                                                        getAllShopperGroupsData?.map((each,i) => {
                                                            return <option key={i} value={each?.groupName}>{each?.groupName}</option>
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                                <br />
                                               <button type='button' className='btn btn-success' 
                                                onClick={(e) => handleSubmit(e)}
                                               >
                                                   <FontAwesomeIcon icon={faSave} />
                                                   {" Add Shoppers to group"}
                                               </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                            </div>
                           </div>
                        </div>
                        </div>
                            </div>
                        </div>
                     
                      
    
                         
                                             
    
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
                                                {
                                                   ( uploadShopperLoading === true || getAllShopperGroupsLoading === true) &&
                                                   <LoaderModal show={true} />
                                                }
    
    </>
  )
}

export default UploadShoppers