import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Col, Form, Modal, Row, Container, Button, Fade, Dropdown } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { CreateBasketCouponAPI, getFindShopperByIdApi } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faWarning,faCaretUp, faSort, faAngleLeft, faAngleRight, faCheck,faUser, faEdit, faEye, faTimes, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { BasketDeal } from "../../assets/images/BasketDeal.png";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, previousDay } from "date-fns";
import { formateDates, CustomDatePicker, MomentDateAddOneWeek, AddToDays } from '../../Utils/Helpers/Public';
import moment from 'moment/moment';
import { getClientStoresAPI, getFindShopperAPI, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI } from '../redux/API';

const CreateBasketDealModal = ({
  show,
  handleClose,
  data
}) => {

  

  // groups,department,stores data:
  const getClientStoresData = useSelector((state) => state.getClientStoresData);
  const getClientStoresLoading = useSelector((state) => state.getClientStoresLoading);
  const getclientStoresMessage = useSelector((state) => state.getclientStoresMessage);

  const getProductCategoriesData = useSelector((state) => state.getProductCategoriesData);
  const getProductCategoriesMessage = useSelector(state => state.getProductCategoriesMessage);
  const getProductCategoriesLoading = useSelector(state => state.getProductCategoriesLoading);

  const getAllShopperGroupsData = useSelector(state => state.getAllShopperGroupsData);
  const getAllShopperGroupsLoading = useSelector(state => state.getAllShopperGroupsLoading);
  const getAllShopperGroupsMessage = useSelector(state => state.getAllShopperGroupsMessage);
  const [value, setValue] = useState(
    {
      "newsID": 0,
      "newsCategoryId": 0,
      "title": "",
      "details": "",
      "imagePath": "",
      "validFromDate": "",
      "expiresOn": "",
      "sendNotification": false,
      "customerId": 0,
      "createUserId": 0,
      "updateUserId": 0,
      "puiCode": "",
      "productId": 0,
      "amount": 0,
      "discountAmount": 0,
      "isDiscountPercentage": false,
      "ncrPromotionCode": "",
      "isItStoreSpecific": false,
      "manufacturerCouponId": "",
      "productQuantity": 0,
      "upSellProductId": 0,
      "upSellProductQuantity": 0,
      "isFeatured": false,
      "deleteFlag": false,
      "isItTargetSpecific": false,
      "otherDetails": "",
      "isRecurring": false,
      "mfgShutOffDate": "",
      "isDealOfTheWeek": false,
      "departmentId": "0",
      "isMajorDepartment": false,
      "storeId": "0",
      "pageNumber": 0,
      "pdfFileName": "",
      "clubId": 0,
      "userDetailId": 0,
      "clubMemberId": 0,
      "id": 0,
      "storeRouteId": "",
      "clientStoreId": 0,
      "news_Id": "0",
      "recurringStartDate": "",
      "recurringEndDate": "",
      "recurringTypeId": 0,
        "clubIds": "0",
       "groupNames": "",
       "clientStoreIds": "0"
    }
  );

  // const [value, setValue] = useState(
  //   {




  //     "newsID": 0,
  //     "newsCategoryId": data?.newsCategoryID ||0,
  //     "title": data?.title || "",
  //     "details": data?.details || "",
  //     "imagePath": "",
  //     "validFromDate": new Date(data?.validFromDate) || "",
  //     "expiresOn": new Date(data?.expiresOn) || "",
  //     "sendNotification": data?.sendNotification ||false,
  //     "customerId":data?.customerID || 0,
  //     "createUserId":data?.createUserID || 0,
  //     "updateUserId":data?.updateUserID || 0,
  //     "puiCode": data?.puiCode || "",
  //     "productId":data?.productId || 0,
  //     "amount": data?.amount ||0,
  //     "discountAmount": data?.discountAmount || 0,
  //     "isDiscountPercentage": data?.isDiscountPercentage || false,
  //     "ncrPromotionCode": data?.ncrPromotionCode ||"",
  //     "isItStoreSpecific":data?.isItStoreSpecific || false,
  //     "manufacturerCouponId":data?.manufacturerCouponId || "",
  //     "productQuantity":data?.productQuantity || 0,
  //     "upSellProductId":data?.upSellProductId || 0,
  //     "upSellProductQuantity":data?.upSellProductQuantity || 0,
  //     "isFeatured": data?.isFeatured ||false,
  //     "deleteFlag": false,
  //     "isItTargetSpecific":data?.isItTargetSpecific || false,
  //     "otherDetails": data?.otherDetails || "",
  //     "isRecurring": data?.isRecurring || false,
  //     "mfgShutOffDate":data?.mfgShutOffDate || "",
  //     "isDealOfTheWeek":data?.isDealOftheWeek|| false,
  //     "departmentId": "0",
  //     "isMajorDepartment": false,
  //     "storeId": "0",
  //     "pageNumber": 0,
  //     "pdfFileName": "",
  //     "clubId": 0,
  //     "userDetailId": 0,
  //     "clubMemberId": 0,
  //     "id": 0,
  //     "storeRouteId": "",
  //     "clientStoreId": 0,
  //     "news_Id": "0",
  //     "recurringStartDate": "",
  //     "recurringEndDate":"",
  //     "recurringTypeId": 0,
  //       "clubIds": "0",
  //      "groupNames": "",
  //      "clientStoreIds": "0"
  //   }
  // );



  // useEffect(() => {
  //   if (Object.keys(data)?.length > 0) {
  //     setValue({
  //       ...value,
  //       title: data?.title,
  //       details: data?.details,
  //       otherDetails: data?.otherDetails,
  //       validFromDate: new Date(data?.validFromDate),
  //       expiresOn: new Date(data?.expiresOn),
  //       recurringEndDate: AddToDays(data?.validFromDate, 7),
  //       newsCategoryId:data?.newsCategoryID,
  //       sendNotification:data?.sendNotification,
  //       customerId:data?.customerID,
  //       createUserId:data?.createUserID,
  //       updateUserId:data?.updateUserID,
  //       puiCode:data?.puiCode,
  //       productId:data?.productId,
  //       amount:data?.amount,
  //       discountAmount:data?.discountAmount,
  //       isDiscountPercentage:data?.isDiscountPercentage,
  //       ncrPromotionCode:data?.ncrPromotionCode,
  //       isItStoreSpecific:data?.isItStoreSpecific,
  //       manufacturerCouponId:data?.manufacturerCouponId,
  //       productQuantity:data?.productQuantity,
  //       upSellProductId:data?.upSellProductId,
  //       upSellProductQuantity:data?.upSellProductQuantity,
  //       isFeatured:data?.isFeatured,
  //       isItTargetSpecific:data?.isItTargetSpecific,
  //       isRecurring:data?.isRecurring,
  //       mfgShutOffDate:data?.mfgShutOffDate,
  //       isDealOfTheWeek:data?.isDealOftheWeek,
       

  //     });
  //   }
  // }, [data]);


  
  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setValue((prev) => {
        return {
          ...prev,
          title: data?.title,
          details: data?.details,
          otherDetails: data?.otherDetails,
          validFromDate: new Date(data?.validFromDate),
          expiresOn: new Date(data?.expiresOn),
          recurringEndDate: AddToDays(data?.validFromDate, 7),
          newsCategoryId:data?.newsCategoryID,
          sendNotification:data?.sendNotification,
          customerId:data?.customerID,
          createUserId:data?.createUserID,
          updateUserId:data?.updateUserID,
          puiCode:data?.puiCode,
          productId:data?.productId,
          amount:data?.amount,
          discountAmount:data?.discountAmount,
          isDiscountPercentage:data?.isDiscountPercentage,
          ncrPromotionCode:data?.ncrPromotionCode,
          isItStoreSpecific:data?.isItStoreSpecific,
          manufacturerCouponId:data?.manufacturerCouponId,
          productQuantity:data?.productQuantity,
          upSellProductId:data?.upSellProductId,
          upSellProductQuantity:data?.upSellProductQuantity,
          isFeatured:data?.isFeatured,
          isItTargetSpecific:data?.isItTargetSpecific,
          isRecurring:data?.isRecurring,
          mfgShutOffDate:data?.mfgShutOffDate,
          isDealOfTheWeek:data?.isDealOftheWeek,
        }
      })
    }
  }, [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientStoresAPI())
    dispatch(GetProductCategoriesAPI())
    dispatch(GetAllshoppersGroupsAPI("Veritra RSA", 0, 0))
  }, [dispatch]);

  console.log("d",getAllShopperGroupsData)

  const handleInput = (e, name) => {
    setValue((prev) => {
      return {
        ...prev,
        [name]: e.target.value
      }
    })
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [prviousStep,setPreviousStep] = useState(0);


  

  const handleSteps = (index) => {
    setPreviousStep(currentStep);
    setCurrentStep(index);
   
  }
  const steps = ["General", "Departments", "Groups", "Stores", "Store WeeklyAd Groups"];
 

  const [switchSavings, setSwitchSavings] = useState(false);
  const [switchDealOfWeek, setSwitchDealOfWeek] = useState(false);
  const [swithRecurring, setSwitchRecurring] = useState(false);
  const [switchMonthly, setSwitchMontly] = useState(false);
  const [isMajorDepartments, setIsMajorDepartments] = useState(false);

  // departments
  const [deptAll, setDeptAll] = useState(false);
  const [deptInclude, setDeptInclude] = useState(false);
  const [deptExclude, setDeptExclude] = useState(false);

  // groups switches:
  const [groupAll,setGroupAll] = useState(false);
  const [groupInclude,setGroupInclude] = useState(false);
  const [groupExclude,setGroupExclude] = useState(false);

  // store switches:
  const [storesAll,setStoresAll] =useState(false);
  const [storesInclude,setStoresInclude] = useState(false);
  const [storesExclude,setStoresExclude] = useState(false);

  const handleSwitches = (index) => {
    if (index === 1) {
      setSwitchSavings(prev => !prev);
    } else if (index === 2) {
      setSwitchDealOfWeek(prev => !prev);
      setValue({
        ...value,
        isDealOfTheWeek: true
      })
    } else if (index === 3) {
      setSwitchRecurring(prev => !prev);
      setValue({
        ...value,
        isRecurring: true
      })
    } else if (index === 4) {
      setSwitchMontly(prev => !prev)
    } else if (index === 5) {
      setIsMajorDepartments(prev => !prev);
      setValue({
        ...value,
        isMajorDepartment: true
      })
    } else if (index === 6) {
      setDeptAll(true);
    } else if (index === 7) {
      setDeptInclude(true)
    } else if (index === 8) {
      setDeptExclude(true);
    } else if(index === 9){
      setGroupAll(prev => !prev);
    }else if(index === 10){
      setGroupInclude(prev => !prev)
    } else if(index === 11) {
      setGroupExclude(prev => !prev)
    } else if (index === 12) {
      setStoresAll(prev => !prev);
    } else if (index === 13){
      setStoresInclude(prev => !prev);
    } else if(index === 14) {
      setStoresExclude(prev => !prev);
    }
  }
  const handelSwitch = (e) => {
    const element = e.currentTarget;
    element.classList.toggle('active')
  }

  // Image upload :


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setValue({
        ...value,
        imagePath: imgUrl
      });
    }
  }
  
  // Dept dropdown select:
  const [selectedDept, setSelectedDept] = useState(["All"]);
  const [deptDropdown, setDeptDropDown] = useState(false);

 

  const handleDeptDropDown = () => {
    setDeptDropDown(prev => !prev);
  }


  const handleSelectDepts = (item) => {
    if (item === "All") {
      setSelectedDept(["All"]);
    } else {
      let updateItem = selectedDept?.includes(item)
        ? selectedDept?.filter((i) => i != item)
        : [...selectedDept?.filter((i) => i !== "All"), item];
      setSelectedDept(updateItem);
    }
  }

  const handleRemoveDepts = (item) => {
    if (item === "All") {
      return setSelectedDept([]);
    } else {
      const updateItem = selectedDept?.filter((i) => i !== item);
      setSelectedDept(updateItem?.length > 0 ? updateItem : ["All"])
    }
  }
  
  // hover effects
  const [hoverIndex, setHoverIndex] = useState(null);
  const isDisabled = (item) => {
    return selectedDept?.includes(item);
  }
  const isStoreDisable = (item) => {
    return selectGroups?.includes(item)
  }
  const isStoresDisable = (item) => {
    return selectStores?.includes(item)
  }



  // select dept ids
  useEffect(() => {
    if (selectedDept?.includes("All")) {
      setValue({
        ...value,
        departmentId: "0"
      })
    } else if (Array.isArray(getProductCategoriesData)) {
      const selectId = Array.isArray(getProductCategoriesData) && getProductCategoriesData?.filter((item) => selectedDept?.includes(item.productCategoryName)).map((each) => each.productCategoryId).join(",");
      
      setValue({
        ...value,
        departmentId: selectId.toString()
      })
    }
  }, [selectedDept, getProductCategoriesData]);


  // GROUPS:
const [selectGroups,setSelectGroups] = useState(["All"]);
const [storeDropdown,setStoreDropdown] = useState(false);
const handleStoreDropDown =() => setStoreDropdown(prev => !prev);
const handleSelectGroups = (itemName) => {
  if(itemName === "All"){
    setSelectGroups(["All"]);
    setValue((prev) => {
      return {
        ...prev,
        ["clientStoreIds"]:"0"
      }
    })
  }else {
    let updateItem = selectGroups?.includes(itemName) 
     ? selectGroups?.filter((i) => i !== itemName)
     : [...selectGroups?.filter((i) => i !== "All"),itemName];
     setSelectGroups(updateItem);
  }
  
}

const handleRemoveStores = (itemName) => {
  if(itemName === "All"){
    setSelectGroups([]);
  }else{
    let updateItem = selectGroups?.filter((i) => i !== itemName);
    setSelectGroups(updateItem?.length > 0 ? updateItem : ["All"])
  }
}
// SELECT GROUPID,GROUPNAMES
let groupIds= [];
let groupNames = [];
const groupDetails = Array.isArray(getAllShopperGroupsData) && getAllShopperGroupsData?.filter((item) => selectGroups?.includes(item?.groupName)).map((each) => {
  
  groupIds.push(each?.groupID);
  groupNames.push(each?.groupName);
  return {ids:each?.groupID,groupName:each?.groupName}

});

useEffect(() => {
  let groupIds= [];
  let groupNames = [];
  const groupDetails = Array.isArray(getAllShopperGroupsData) && getAllShopperGroupsData?.filter((item) => selectGroups?.includes(item?.groupName)).map((each) => {
    
    groupIds.push(each?.groupID);
    groupNames.push(each?.groupName);
    return {ids:each?.groupID,groupName:each?.groupName}
  
  });
  if(selectGroups?.includes("All")) setValue({...value,clubIds:"0",groupNames:""})
   else if(Array.isArray(getAllShopperGroupsData))  setValue({
    ...value,
    clubIds:groupIds.join(","),
    groupNames:groupNames.join(",")
  })
//   const groupIDS=  Array.isArray(groupDetails)?.map((each,i) => each?.groupID).join(",");
// const groupName =Array.isArray(groupDetails)?.map((each,i) => each?.groupName).join(",");
  
},[selectGroups,getAllShopperGroupsData])

// STORES:
 const [selectStores,setSelectStores] = useState(["All"]);
 const [dropdownStore,setDropdownStore] = useState(false);
 const handleDropdownstores = () => {
  setDropdownStore(prev => !prev)
 }
 const handleSelectStores = (storeName) => {
  if(storeName === "All") {
    setSelectStores(["All"]);
  }else{
    let updateItem = selectStores?.includes(storeName)
    ? selectStores?.filter((i) => i !== storeName) 
    : [...selectStores?.filter((i) => i !== "All"),storeName];
    setSelectStores(updateItem);
  }
 }

 const removeSelectedStores = (storeName) => {
  if(storeName === "All") {
    setSelectStores([]);
  }else {
    let update = selectStores?.filter((i) => i !==storeName);
    setSelectStores(update?.length > 0 ? update : ["All"])
  }
 }
 console.log("select",selectStores);
 useEffect(() => {
  if(selectStores.includes("All")){
    setValue((prev) => {
      return {
        ...prev,
        ["clientStoreIds"]:"0"
      }
    })
  }
 },[selectStores])
useEffect(() => {
  if(selectStores === "All") {
    setValue({
      ...value,
      clientStoreIds:"0",
      storeRouteId:""
    })
  }else if(Array.isArray(getClientStoresData)){
const storeIds = Array.isArray(getClientStoresData) &&  getClientStoresData?.filter((item) => selectStores?.includes(item?.storeName)).map((each) => each?.clientStoreId).join(",");
const storeNames = Array.isArray(getClientStoresData) &&  getClientStoresData?.filter((item) => selectStores?.includes(item?.storeName)).map((each) => each?.storeName).join(",");

setValue({
  ...value,
  clientStoreIds:storeIds,
  storeRouteId:"LTE76HR8BTRLY7CS9VTJE7JXES"
})
  }
},[selectStores,getClientStoresData])
// STORES:

const [slideval,setSlideval] = useState("")
useEffect(() => {

    if(prviousStep == 0 && currentStep == 0  ){
     setSlideval("slide-right");
    } 
    else if(prviousStep > currentStep) {
      setSlideval("slide-right");
    } 
    else if(prviousStep < currentStep) {
      setSlideval("slide-left");
    } 
   
},[prviousStep,currentStep])


console.log("value",value);

 const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("")
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
    }, [successMsg]);
// create basket coupon:
const handleCreateCoupon = (e) => {
  e.preventDefault();
  dispatch(CreateBasketCouponAPI("Veritra RSA",value))
}

const handleNextsteps = (currentStep) => {
  if(currentStep == 0){
    if(value?.title === "")setErrorMsg("Please Enter Title");
    
    else if(value?.details === "") setErrorMsg("Please Enter Details")
    else if(value?.amount == 0) setErrorMsg("Please Enter Minimum Purchase Amount.");
    else if(value?.discountAmount == 0) setErrorMsg("Please Enter Customer Savings.");
    else if(value?.validFromDate === "") setErrorMsg("Please Enter ValidFromDate");
    else if(value?.expiresOn === "") setErrorMsg("Please Enter Expire Date.");
    else {
      setCurrentStep(currentStep + 1);
      setPreviousStep(currentStep);
      setSlideval("slide-left");
    }
  }
  if(currentStep == 1){
     if(value?.departmentId === "") setErrorMsg("Please Select Departments");
     else{
      setCurrentStep(currentStep + 1);
      setPreviousStep(currentStep);
      setSlideval("slide-left");
     }
  }

  if(currentStep == 2){
    if(value?.clubIds === "") setErrorMsg("Please Select Groups")
      else{
        setCurrentStep(currentStep + 1);
        setPreviousStep(currentStep);
        setSlideval("slide-left");
    }
  }
  if(currentStep == 3){
    if(value?.clientStoreIds == "") {
      setErrorMsg("Please Select Stores");
    }
    else {
        setCurrentStep(currentStep + 1);
        setPreviousStep(currentStep);
        setSlideval("slide-left");
    }
    
  }

}


// dropdownref outside click event
const dropdownRef = useRef(null); 
// groups
const groupDropDownRef = useRef(null);

const storesDropDownsRef = useState(null);
 useEffect(() => {
   let handler = (e) => {

    // Depts
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
      setDeptDropDown(false);
      console.log("dropdown ref",dropdownRef.current)
    }

    //Groups
    if(groupDropDownRef.current && !groupDropDownRef.current.contains(e.target)){
      setStoreDropdown(false);
    }

    // stores dropdownStore
   if(storesDropDownsRef.current && !storesDropDownsRef.current.contains(e.target)){
    setDropdownStore(false);
    
   }
   
   }
   document.addEventListener("mousedown",handler);
   return () => {
    document.removeEventListener("mousedown",handler)
   }
 });

 


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
          overflow: "auto"

        }}
      />

      <div className="modal-dialog" role="document"
        style={{
          zIndex: 1050,
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          width: "100%",
          top: 20,
          borderRadius: "0px",
          // transform: "translate(-50%, -50%)",

          // padding: "20px",
          // borderRadius: "8px"

        }}

      >
        <div className="modal-content"
          style={{
            width: "90vw",
            background: "#f3f3f3",
            overflow: "auto",
            maxHeight: "99vh",
            position: "relative",
            left: "-400px",
            padding: "15px"
          }}
        >
          <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height: "65px", border: "none", width: "100%", position: "relative", background: "#fff" }}>

            <h2 style={{ fontWeight: "400", gap: "5px", fontSize: "16px", display: "flex", alignItems: "center", color: "#505458" }}>
              {" Create "}

              <strong style={{ color: "#505458" }}> Basket</strong>
              {" Deal "}
            </h2>

            
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
          <div className="modal-body" style={{ width: "100%", position: "relative", padding: "12px", background: "#fff" }}>
            <div id="viewContent">
              <div className='widget' style={{ paddingLeft: "0px", padding: "0px" }}>
                <div className='widget-content' style={{ background: "#fff", padding: "12px", height: "700px" }}>
                  <div className='row'>
                    <div className='col-md-12 portlets'>
                      <div className=' animated fadeInDown'>
                        <div>
                          <ul className='easyWizardSteps'>
                            {
                              steps?.length > 0 &&
                              steps?.map((step, i) => {
                                return <li className={currentStep === i ? "current" : ""} onClick={() => handleSteps(i)}>
                                  <span className='wizard-header-num'>{i + 1}</span>
                                  <a href='javascript:void(0)' Id="step" className='wizard-header-link'>
                                    {step}
                                  </a>
                                </li>

                              })
                            }
                            
                          </ul>
                        </div>

                        {
                          currentStep === 0 &&
                          <div className= {`row ${slideval} `}  >
                            <div className='col-md-4'>
                              <div className='note' >
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Title
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <input type='text' className='form-control' placeholder='Title' style={{ width: "100%" }} value={value?.title} name="title" onChange={(e) => handleInput(e, "title")} />
                                </div>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Details
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <textarea cols={20} rows={2} style={{ height: "100px", width: "100%" }} placeholder='Details' className='form-control' value={value?.details} name="details" onChange={(e) => handleInput(e, "details")} >

                                  </textarea>
                                </div>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Other Details
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <textarea cols={20} rows={2} style={{ height: "100px", width: "100%" }} placeholder='Other Details' className='form-control' value={value?.otherDetails} name="otherDetails" onChange={(e) => handleInput(e, "otherDetails")} >

                                  </textarea>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div className='note'>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Minimum Purchase Amount
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <input type='text' className='form-control' placeholder='Minimum Purchase Amount' style={{ width: "100%" }} value={value?.amount} name="amount" onChange={(e) => handleInput(e, "amount")} />
                                </div>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Customer Savings
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <input type='text' className='form-control' placeholder='Customer Savings' style={{ width: "100%" }} value={value?.discountAmount} name="discountAmount" onChange={(e) => handleInput(e, "discountAmount")} />
                                </div>

                                <br />
                                <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "5px" }}>
                                  <div className='col-sm-3' style={{ paddingLeft: "0px" }}>
                                    <div className={`switchbtn ${switchSavings ? "active" : ""}`} onClick={(e) => handleSwitches(1)}>
                                      <div className='switch-handlebtn'></div>
                                    </div>
                                  </div>
                                  <div className='col-sm-9' style={{ paddingLeft: "0px", marginLeft: "-30px", textAlign: "start", paddingTop: "-15px" }}>
                                    <span>% Savings</span>
                                  </div>
                                </div>
                                <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "-15px" }}>
                                  <div className='col-sm-3' style={{ paddingLeft: "0px" }}>
                                    <div className={`switchbtn ${switchDealOfWeek ? "active" : ""}`} onClick={(e) => handleSwitches(2)}>
                                      <div className='switch-handlebtn'></div>
                                    </div>
                                  </div>
                                  <div className='col-sm-9' style={{ paddingLeft: "0px", marginLeft: "-30px", textAlign: "start", paddingTop: "-5px" }}>
                                    <span>Deal of Week</span>
                                  </div>
                                </div>
                                <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "-5px" }}>
                                  <div className='col-sm-3' style={{ paddingLeft: "0px" }}>
                                    <div className={`switchbtn ${swithRecurring ? "active" : ""}`} onClick={(e) => handleSwitches(3)}>
                                      <div className='switch-handlebtn'></div>
                                    </div>
                                  </div>
                                  <div className='col-sm-9' style={{ paddingLeft: "0px", marginLeft: "-30px", textAlign: "start", paddingTop: "-5px" }}>
                                    <span>Recurring(Daily)</span>
                                  </div>
                                </div>
                                <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "5px" }}>
                                  <div className='col-sm-3' style={{ paddingLeft: "0px" }}>
                                    <div className={`switchbtn ${switchMonthly ? "active" : ""}`} onClick={(e) => handleSwitches(4)}>
                                      <div className='switch-handlebtn'></div>
                                    </div>
                                  </div>
                                  <div className='col-sm-9' style={{ paddingLeft: "0px", marginLeft: "-30px", textAlign: "start", paddingTop: "5px" }}>
                                    <span>Monthly Deal</span>
                                  </div>
                                </div>

                                {
                                  swithRecurring &&
                                  <div className='form-group' style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "flex" }}>
                                      Recurring ends on
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    {/* <input type='text' className='form-control' placeholder='Recurring ends on' style={{width:"100%"}} /> */}
                                    <DatePicker
                                      selected={value?.recurringEndDate}
                                      onChange={(date) => {
                                        setValue((prev) => {
                                          let d = formateDates(date)
                                          return {
                                            ...prev,
                                            ["recurringEndDate"]: d

                                          }
                                        });

                                      }}

                                      timeFormat='HH:mm'
                                      dateFormat={"MM/dd/yyyy h:mm aa"}
                                      timeIntervals={15}
                                      customInput={<CustomDatePicker placeholder="Recurring ends on" />}
                                    />
                                  </div>
                                }
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div className='note'>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    Offer Valid From
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  {/* <input type='text' className='form-control' placeholder='Offer Valid From' style={{width:"100%"}} /> */}
                                  {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
         // showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MM/dd/yyyy h:mm aa"
          customInput={<CustomDatePicker />}
        /> */}
                                  <DatePicker
                                    selected={value?.validFromDate}
                                    onChange={(date) => {
                                      setValue((prev) => {
                                        let d = formateDates(date)
                                        return {
                                          ...prev,
                                          ["validFromDate"]: d

                                        }
                                      });

                                    }}

                                    timeFormat='HH:mm'
                                    dateFormat={"MM/dd/yyyy h:mm aa"}
                                    timeIntervals={15}
                                    customInput={<CustomDatePicker placeholder="Minimum Purchase Amount" />}
                                  />

                                </div>
                                <div className='form-group' style={{ marginBottom: "15px" }}>
                                  <label style={{ display: "flex" }}>
                                    To
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  {/* <input type='text' className='form-control' placeholder='To' style={{width:"100%"}} /> */}
                                  <DatePicker
                                    selected={value?.expiresOn}
                                    onChange={(date) => {
                                      setValue((prev) => {
                                        let d = formateDates(date)
                                        return {
                                          ...prev,
                                          ["expiresOn"]: d

                                        }
                                      });

                                    }}

                                    timeFormat='HH:mm'
                                    dateFormat={"MM/dd/yyyy h:mm aa"}
                                    timeIntervals={15}
                                    customInput={<CustomDatePicker placeholder="Minimum Purchase Amount" />}
                                  />
                                </div>

                                <div className="form-group">
                                  <label style={{ display: "flex" }}>Image Upload</label>
                                  <br />
                                  <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                                    <a
                                      style={{ background: "#ABB7B7", color: "#fff", padding: "10px", width: "100px", }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("fileInput").click();
                                      }}
                                    >
                                      {"Select file"}

                                    </a>
                                    <img src="https://s3.amazonaws.com/rsaqa/SpecialsImages/BasketDeal.png" style={{ width: "75px", height: "75px", marginLeft: "8px" }} />
                                  </div>

                                  <input id="fileInput" title='Select File' style={{ display: "none" }} name="file" type='file' onChange={(e) => {
                                    handleFileUpload(e);
                                  }} />
                                  <br />
                                  <br />


                                </div>
                                <label style={{ textAlign: "start" }}>Note: The maximum allowable image size must not exceed 250KB.</label>

                              </div>
                            </div>
                          </div>
                        }

                        {
                          currentStep === 1 &&
                          <div>
                              <section className={`${slideval}`} style={{ float: "left", width: "1132px",height:"270px" }}>

<div className={`slide ${currentStep === 1 ? "active" :"inactive"}`}> 
<div className='row' style={{ marginBottom: "10px" }}>
  <div className='col-sm-6 offset-3'>
    <div className='form-group'>
      <div className='row'>
        <div className='col-sm-3'>
          <div style={{right:"-18px"}} className={`switchbtn ${isMajorDepartments ? "active" : ""}`} onClick={(e) => handleSwitches(5)}>
            <div className='switch-handlebtn'></div>
          </div>
        </div>
        <div className='col-sm-5' style={{ paddingTop: "5px",marginLeft:"-100px" }}>
          <span >User Major Departments</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div className='row'>
  <div className='col-sm-1' style={{ width: "120px" }}>
    <label>Departments

    </label>
    <span style={{ color: "red" }}>*</span>
  </div>
  <div className='col-sm-2'>
    <div className='form-group' style={{ marginBottom: "10px" }}>
      <div className='row'>
        <div className='col-sm-5'>
          <div className={`switchbtn ${deptAll ? "active" : ""}`} onClick={(e) => handleSwitches(6)}>
            <div className='switch-handlebtn'></div>
          </div>
        </div>
        <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-15px" }}>
          <span>All</span>
        </div>
      </div>
    </div>

    <div className='form-group' style={{ marginBottom: "10px" }}>
      <div className='row'>
        <div className='col-sm-2'>
          <div className={`switchbtn ${deptInclude ? "active" : ""}`} onClick={(e) => handleSwitches(7)}>
            <div className='switch-handlebtn'></div>
          </div>
        </div>
        <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
          <span>Include</span>
        </div>
      </div>
    </div>

    <div className='form-group' style={{ marginBottom: "10px" }}>
      <div className='row'>
        <div className='col-sm-2'>
          <div className={`switchbtn ${deptExclude ? "active" : ""}`} onClick={(e) => handleSwitches(8)}>
            <div className='switch-handlebtn'></div>
          </div>
        </div>
        <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
          <span>Exclude</span>
        </div>
      </div>
    </div>
  </div>
  <div className='col-md-6'>
    <div className='row'>
      <div className='col-sm-11'>

        <div className='form-group'>
          <select id="departmentId" name="departmentId" value={selectedDept} style={{ display: "none" }}
           onChange={(e) => handleInput(e, "departmentId")}
          //  onBlur={() => setDeptDropDown(prev => !prev)}
          //   onFocus={() => setDeptDropDown(prev => !prev)}
           multiple>
            <option value={"All"}>All</option>
            {
              getProductCategoriesData?.length > 0 &&
              getProductCategoriesData?.map((each, i) => {
                return <option key={i} value={each?.productCategoryId}>{each?.productCategoryName}</option>
              })
            }
          </select>
          <div style={{ background: "#fff", border: "1px solid #ccc", width: "448px", height: "100px", overflow: "auto" }}
            onClick={() => handleDeptDropDown()}
            ref={dropdownRef}
          
          >
            <ul style={{ listStyle: "none", textDecoration: "none" }}>


              <li>
                <div className='' style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  alignItems: "center",
                  margin: "5px"

                }}>
                  {
                    selectedDept?.length > 0 ?

                      selectedDept?.map((each, i) => {
                        return <span key={i}
                          className='listitem'
                        >
                          {/* {each?.productCategoryName} */}
                          {each}
                          <FontAwesomeIcon icon={faTimes}
                            style={{ marginLeft: "5px", cursor: "pointer" }}

                            onClick={() => handleRemoveDepts(each)}
                          />
                        </span>
                      })

                      :
                      <>
                        {/* <span>
                                  {
                                    "All"
                                  }
                                <FontAwesomeIcon icon={faTimes}
                                    style={{marginLeft:"5px",cursor:"pointer"}}
                                    />
                                </span> */}
                        <input type='text'  className='selectItem' placeholder='Select Departments' style={{ outline: "none", border: "none" }} />
                      </>
                  }
                </div>
              </li>


            </ul>
            <div>

            </div>
          </div>
          {
            deptDropdown &&
            <div>
              <ul
                className='ul-list'
                ref={dropdownRef}
              // style={{
              //   listStyle:"none",
              //   textDecoration:"none",
              //   border:"1px solid #ccc",
              //   background:"#fff",
              //   padding:"0px",
              //   textAlign:"left",
              //   width:"448px",
              //   height:"150px",
              //   position:"absolute",
              //   zIndex:1000,
              //   overflow:"auto",
              //   margin:"0px"

              // }}
              >
                <li
                  style={{
                    padding: "5px 0px",
                    marginBottom: "0px",
                    background: isDisabled("All") && hoverIndex === "All" ? "#3875d7" : "#fff",
                    color: isDisabled("All") ? "#ddd" : hoverIndex === "All" ? "#fff" : "#444444",

                    pointerEvents: isDisabled("All") ? "none" : "auto",
                    cursor: isDisabled("All") ? "not-allowed" : "pointer",
                    transition: "all 0.3s"

                  }}

                  onClick={() => {
                    handleSelectDepts("All");
                    //if(selectedDept?.includes("All")) setHoverIndex(null)
                  }}
                >
                  All
                </li>


                {
                  getProductCategoriesData?.length > 0 &&
                  getProductCategoriesData?.map((each, i) => {
                    const disabled = isDisabled(each?.productCategoryName);
                    return <li key={i} id={each?.productCategoryId} value={each?.productCategoryId}
                      style={{
                        padding: "5px 0px",
                        marginBottom: "0px",
                        background: !disabled && !selectedDept.includes("All") && hoverIndex === i ? "#3875d7" : "#fff",
                        color: (disabled || selectedDept.includes("All")) ? "#ddd" : hoverIndex === i ? "#fff" : "#444444",

                        pointerEvents: disabled ? "none" : "auto",
                        cursor: disabled ? "not-allowed" : "pointer",
                        transition: "all 0.3s"

                      }}
                      onClick={(e) => {
                        handleSelectDepts(each?.productCategoryName)
                      }}
                      onMouseEnter={(e) => {
                        !disabled && setHoverIndex(i)
                        //  e.target.style.background = "#3875d7";
                        // e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        setHoverIndex(null)
                        // e.target.style.background ="#fff";
                        // e.target.style.color= "#444444"

                      }

                      }

                    >

                      {each?.productCategoryName}

                    </li>
                  })
                }




              </ul>
            </div>
          }
        </div>
      </div>
      <div className='col-sm-1'>

      </div>
    </div>
  </div>
</div>
</div>

</section>
                            </div>
                        
                        }
                         {
                          currentStep === 2 &&
                          <section    className={`${
                            slideval
                             }`} style={{ float: "left", width: "1132px" ,height:"250px"}}>
                        
                            <div className='row'>
                              <div className='col-sm-1' style={{ width: "120px" }}>
                                <label>Groups

                                </label>
                                <span style={{ color: "red" }}>*</span>
                              </div>
                              <div className='col-sm-2'>
                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-5'>
                                      <div className={`switchbtn ${groupAll ? "active" : ""}`} onClick={(e) => handleSwitches(9)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-15px" }}>
                                      <span>All</span>
                                    </div>
                                  </div>
                                </div>

                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-2'>
                                      <div className={`switchbtn ${groupInclude ? "active" : ""}`} onClick={(e) => handleSwitches(10)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
                                      <span>Include</span>
                                    </div>
                                  </div>
                                </div>

                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-2'>
                                      <div className={`switchbtn ${groupExclude ? "active" : ""}`} onClick={(e) => handleSwitches(11)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
                                      <span>Exclude</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='row'>
                                  <div className='col-sm-11'>

                                    <div className='form-group'>
                                      <select id="departmentId" name="departmentId" value={selectGroups} style={{ display: "none" }} onChange={(e) => handleInput(e, "departmentId")} multiple>
                                        <option value={"All"}>All</option>
                                        {
                                          getAllShopperGroupsData?.length > 0 &&
                                          getAllShopperGroupsData?.map((each, i) => {
                                            return <option key={i} value={each?.groupID}>{each?.groupName}</option>
                                          })
                                        }
                                      </select>
                                      <div style={{ background: "#fff", border: "1px solid #ccc", width: "448px", height: "100px", overflow: "auto" }}
                                        onClick={() => handleStoreDropDown()}
                                        ref = {groupDropDownRef}
                                       
                                      >
                                        <ul style={{ listStyle: "none", textDecoration: "none" }}>
                                       

                                          <li>
                                            <div className='' style={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              gap: "5px",
                                              alignItems: "center",
                                              margin: "5px"

                                            }}>
                                              {
                                               selectGroups?.length > 0 ?

                                                  selectGroups?.map((each, i) => {
                                                    return <span key={i}
                                                      className='listitem'
                                                    >
                                                      {/* {each?.productCategoryName} */}
                                                      {each}
                                                      <FontAwesomeIcon icon={faTimes}
                                                        style={{ marginLeft: "5px", cursor: "pointer" }}

                                                        onClick={() => handleRemoveStores(each)}
                                                      />
                                                    </span>
                                                  })

                                                  :
                                                  <>
                                                    {/* <span>
                                                              {
                                                                "All"
                                                              }
                                                            <FontAwesomeIcon icon={faTimes}
                                                                style={{marginLeft:"5px",cursor:"pointer"}}
                                                                />
                                                            </span> */}
                                                    <input className='selectItem' type='text' placeholder={!storeDropdown ? 'Select Groups' :""} style={{ outline: "none", border: "none" }} />
                                                  </>
                                              }
                                            </div>
                                          </li>


                                        </ul>
                                        <div>

                                        </div>
                                      </div>
                                      {
                                        storeDropdown &&
                                        <div>
                                          <ul
                                            className='ul-list'
                                            ref={groupDropDownRef}
                                          // style={{
                                          //   listStyle:"none",
                                          //   textDecoration:"none",
                                          //   border:"1px solid #ccc",
                                          //   background:"#fff",
                                          //   padding:"0px",
                                          //   textAlign:"left",
                                          //   width:"448px",
                                          //   height:"150px",
                                          //   position:"absolute",
                                          //   zIndex:1000,
                                          //   overflow:"auto",
                                          //   margin:"0px"

                                          // }}
                                          >
                                            <li
                                              style={{
                                                padding: "5px 0px",
                                                marginBottom: "0px",
                                                background: isStoreDisable("All") && hoverIndex === "All" ? "#3875d7" : "#fff",
                                                color: isStoreDisable("All") ? "#ddd" : hoverIndex === "All" ? "#fff" : "#444444",

                                                pointerEvents: isStoreDisable("All") ? "none" : "auto",
                                                cursor: isStoreDisable("All") ? "not-allowed" : "pointer",
                                                transition: "all 0.3s"

                                              }}

                                              onClick={() => {
                                                handleSelectGroups("All");
                                                //if(selectedDept?.includes("All")) setHoverIndex(null)
                                              }}
                                            >
                                              All
                                            </li>


                                            {
                                              getAllShopperGroupsData?.length > 0 &&
                                              getAllShopperGroupsData?.map((each, i) => {
                                                const disabled = isStoreDisable(each?.groupName);
                                                return <li key={i} id={each?.productCategoryId} value={each?.groupID}
                                                  style={{
                                                    padding: "5px 0px",
                                                    marginBottom: "0px",
                                                    background: !disabled && !selectGroups.includes("All") && hoverIndex === i ? "#3875d7" : "#fff",
                                                    color: (disabled || selectGroups.includes("All")) ? "#ddd" : hoverIndex === i ? "#fff" : "#444444",

                                                    pointerEvents: disabled ? "none" : "auto",
                                                    cursor: disabled ? "not-allowed" : "pointer",
                                                    transition: "all 0.3s"

                                                  }}
                                                  onClick={(e) => {
                                                    handleSelectGroups(each?.groupName)
                                                  }}
                                                  onMouseEnter={(e) => {
                                                    !disabled && setHoverIndex(i)
                                                    //  e.target.style.background = "#3875d7";
                                                    // e.target.style.color = "#fff";
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    setHoverIndex(null)
                                                    // e.target.style.background ="#fff";
                                                    // e.target.style.color= "#444444"

                                                  }

                                                  }

                                                >

                                                  {each?.groupName}

                                                </li>
                                              })
                                            }




                                          </ul>
                                        </div>
                                      }
                                    </div>
                                   
                                    <div className='form-group'>
                                    <span style={{color:"red" ,width:"448px",textAlign:"start",fontSize:"14px",display:"flex"}}>
                                      Important Note: Please be aware that is not possible to modify the assigned groups for this at a later time.
                                    </span>
                                    </div>
                                  </div>
                                  <div className='col-sm-1'>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        }
                         {
                          currentStep === 3 &&
                          <section  className={`${slideval}`} style={{ float: "left", width: "1132px" ,height:"300px"}}>
                        
                            <div className='row'>
                              <div className='col-sm-1' style={{ width: "120px" }}>
                                <label>Stores

                                </label>
                                <span style={{ color: "red" }}>*</span>
                              </div>
                              <div className='col-sm-2'>
                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-5'>
                                      <div className={`switchbtn ${storesAll ? "active" : ""}`} onClick={(e) => handleSwitches(12)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-15px" }}>
                                      <span>All</span>
                                    </div>
                                  </div>
                                </div>

                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-2'>
                                      <div className={`switchbtn ${storesInclude ? "active" : ""}`} onClick={(e) => handleSwitches(13)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
                                      <span>Include</span>
                                    </div>
                                  </div>
                                </div>

                                <div className='form-group' style={{ marginBottom: "10px" }}>
                                  <div className='row'>
                                    <div className='col-sm-2'>
                                      <div className={`switchbtn ${storesExclude ? "active" : ""}`} onClick={(e) => handleSwitches(14)}>
                                        <div className='switch-handlebtn'></div>
                                      </div>
                                    </div>
                                    <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px" }}>
                                      <span>Exclude</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='row'>
                                  <div className='col-sm-11'>

                                    <div className='form-group'>
                                      <select id="clientStoreId" name="clientStoreId" value={selectStores} style={{ display: "none" }} onChange={(e) => handleInput(e, "clientStoreId")} multiple>
                                        <option value={"All"}>All</option>
                                        {
                                          getClientStoresData?.length > 0 &&
                                          getClientStoresData?.map((each, i) => {
                                            return <option key={i} value={each?.clientStoreId}>{each?.storeName}</option>
                                          })
                                        }
                                      </select>
                                      <div style={{ background: "#fff", border: "1px solid #ccc", width: "448px", height: "100px", overflow: "auto" }}
                                        onClick={() => handleDropdownstores()}
                                        ref={storesDropDownsRef}
                                      >
                                        <ul style={{ listStyle: "none", textDecoration: "none" }}>


                                          <li>
                                            <div className='' style={{
                                              display: "flex",
                                              flexWrap: "wrap",
                                              gap: "5px",
                                              alignItems: "center",
                                              margin: "5px"

                                            }}>
                                              {
                                               selectStores?.length > 0 ?

                                               selectStores?.map((each, i) => {
                                                    return <span key={i}
                                                      className='listitem'
                                                    >
                                                      {/* {each?.productCategoryName} */}
                                                      {each}
                                                      <FontAwesomeIcon icon={faTimes}
                                                        style={{ marginLeft: "5px", cursor: "pointer" }}

                                                        onClick={() => removeSelectedStores(each)}
                                                      />
                                                    </span>
                                                  })

                                                  :
                                                  <>
                                                    {/* <span>
                                                              {
                                                                "All"
                                                              }
                                                            <FontAwesomeIcon icon={faTimes}
                                                                style={{marginLeft:"5px",cursor:"pointer"}}
                                                                />
                                                            </span> */}
                                                    <input className='selectItem' type='text' placeholder={!dropdownStore ? 'Select Stores' :""} style={{ outline: "none", border: "none" }} />
                                                  </>
                                              }
                                            </div>
                                          </li>


                                        </ul>
                                        <div>

                                        </div>
                                      </div>
                                      {
                                        dropdownStore &&
                                        <div>
                                          <ul
                                            className='ul-list'
                                           
                                              ref={storesDropDownsRef}     
                                         
                                          >
                                            <li
                                              style={{
                                                padding: "5px 0px",
                                                marginBottom: "0px",
                                                background: isStoreDisable("All") && hoverIndex === "All" ? "#3875d7" : "#fff",
                                                color: isStoreDisable("All") ? "#ddd" : hoverIndex === "All" ? "#fff" : "#444444",

                                                pointerEvents: isStoreDisable("All") ? "none" : "auto",
                                                cursor: isStoreDisable("All") ? "not-allowed" : "pointer",
                                                transition: "all 0.3s"

                                              }}

                                              onClick={() => {
                                                handleSelectStores("All")
                                                //if(selectedDept?.includes("All")) setHoverIndex(null)
                                              }}
                                             
                                            >
                                              All
                                            </li>

                                            {
                                              getClientStoresData?.length > 0 &&
                                              getClientStoresData?.map((each, i) => {
                                                const disabled = isStoresDisable(each?.storeName);
                                                return <li key={i} id={each?.clientStoreId} value={each?.clientStoreId}
                                                  style={{
                                                    padding: "5px 0px",
                                                    marginBottom: "0px",
                                                    background: !disabled && !selectStores.includes("All") && hoverIndex === i ? "#3875d7" : "#fff",
                                                    color: (disabled || selectStores.includes("All")) ? "#ddd" : hoverIndex === i ? "#fff" : "#444444",

                                                    pointerEvents: disabled ? "none" : "auto",
                                                    cursor: disabled ? "not-allowed" : "pointer",
                                                    transition: "all 0.3s"

                                                  }}
                                                  onClick={(e) => {
                                                    handleSelectStores(each?.storeName);
                                                  }}
                                                  onMouseEnter={(e) => {
                                                    !disabled && setHoverIndex(i)
                                                    //  e.target.style.background = "#3875d7";
                                                    // e.target.style.color = "#fff";
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    setHoverIndex(null)
                                                    // e.target.style.background ="#fff";
                                                    // e.target.style.color= "#444444"

                                                  }

                                                  }

                                                >

                                                  {each?.storeName}

                                                </li>
                                              })
                                            }




                                          </ul>
                                        </div>
                                      }
                                    </div>
                                   
                                   
                                  </div>
                                  <div className='col-sm-1'>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        }
                         {
                          currentStep === 4 &&
                          <section   className={`${slideval}`}style={{ float: "left", width: "1132px" ,height:"400px"}}>
                        
                            <div className='row'>
                             <div className="col-sm-3" >
                              <label  style={{textAlign:"left",display:"flex"}}>Stores WeeklyAd Group:</label>
                              <br />
                              <br />
                              <label style={{textAlign:"left",display:"flex"}}>Selection Clarification:</label>
                               <br />
                               <label style={{display:"flex",alignItems:"center",justifyContent:"start",textAlign:"left"}}> {' You may choose either "Stores" or "Store WeeklyAd Groups." Opting for "WeeklyAd Group" will reverse the store selection made in step 4(Stores)'} </label>
                             </div>
                             <div className='col-md-4'>
                                   <select className='form-control' style={{width:"325px",height:"150px"}} multiple={true}>
                                    <option value={"0"} selected>All WeeklyAd Groups</option>
                                   </select> 
                                   <br />
                                   <div style={{display:"flex"}}>
                                   <label style={{display:'inline'}}>Store Names:&nbsp;
                                    
                                  
                                    </label>
                                     <div style={{display:"flex",flexDirection:"column"}}>
                                     {
                                       selectStores?.length > 0 && !selectStores?.includes("All") &&
                                       selectStores?.map((each,i) => {
                                         return <span key={i} style={{display:"block",marginBottom:"10px",textAlign:"start"}}>{each}</span>
                                       })
                                     }
                                     </div>
                                   </div>
                                   
                            </div> 
                            </div>
                          </section>
                        }
                      </div>
                    </div>
                    <div className={slideval} style={{ padding: "10px", display: "flex" }}>

{currentStep !== 0 && (
  <button className='btnSearch' onClick={() =>
      {
        setPreviousStep(currentStep);
        setCurrentStep(currentStep - 1);
        setSlideval("slide-right");
      } 
   }>Back</button>
)}
{currentStep !== 4 ? <button style={{ marginLeft: "auto" }} onClick={() =>{
  //   setPreviousStep(currentStep);
  //  setCurrentStep(currentStep + 1);
  handleNextsteps(currentStep);
   //setSlideval("slide-left")
}} className='btnSearch' >Next</button> : <button className='btnSearch' style={{ marginLeft: "auto" }} onClick={(e) => handleCreateCoupon(e)}>Create Coupon</button>}

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

export default CreateBasketDealModal