
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Col, Form, Modal, Row, Container, Button, Fade, Dropdown } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { CreateBasketCouponAPI, CreateBasketCouponAPID, CreateUPCCouponAPI, getFindShopperByIdApi, GetProductDetailsUPCsAPI } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTags, faBars, faCog, faCaretDown, faWarning, faCaretUp, faSearch, faSort, faAngleLeft, faAngleRight, faCheck, faUser, faEdit, faEye, faTimes, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { BasketDeal } from "../../assets/images/BasketDeal.png";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, previousDay } from "date-fns";
import { formateDates, CustomDatePicker, MomentDateAddOneWeek, AddToDays } from '../../Utils/Helpers/Public';
import moment from 'moment/moment';
import { getClientStoresAPI, getFindShopperAPI, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI } from '../redux/API';
import LoaderModal from '../Models/LoaderModal';
import UploadUPCFile from '../Models/UploadUPCFile';
import { Prev } from 'react-bootstrap/esm/PageItem';


const CreateCoupon = ({
  handleDropdown, open, clientName, setOpen, isEnlarged
}) => {


  const [couponSlidOpen, setCouponSlidOpen] = useState(true);
  // select coupons
  const [selectCoupon, setSelectCoupon] = useState(null);
<<<<<<< HEAD
 
  const [steps, setSteps] = useState(["General", "Departments", "Groups", "Stores", "Store WeeklyAd Groups"]);
const [couponName, setCouponName] = useState([]);
//const [selectCoupon, setSelectCoupon] = useState(null);

  const handleSelectCoupon = (item) => {
  setSelectCoupon(( prev )=> {
    let newCoupon = prev !== item ? item : null;
    if(newCoupon === "UPC Promotion"){
      setSteps(["General", "Choose Products", "Groups", "Stores", "Store WeeklyAd Groups"]);
      setCouponName(["UPC","Promotion"])
    }else if( newCoupon === "Free Item"){
      setSteps(["General", "Choose Free Item", "Groups", "Stores", "Store WeeklyAd Groups"]);
      setCouponName(["FREE ITEM WITH ADDITIONAL PURCHASE"])
    }else if(newCoupon === "Cross Sell"){
      setSteps(["General", "Choose Products","Choose Reward Products", "Groups", "Stores", "Store WeeklyAd Groups"]);
      setCouponName(["CROSS SELL","Promotion"])
    }else{
      setSteps(["General", "Departments", "Groups", "Stores", "Store WeeklyAd Groups"]);
      setCouponName([]);
    }
    return newCoupon;
  });

   }


=======
  const handleSelectCoupon = (item) => {
    setSelectCoupon(selectCoupon !== item ? item : null);
  }
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1

  // set coupon section slide open
  const [sectionSlideOpen, setSectionSlideOpen] = useState(true);
 

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
      "validFromDate": formateDates(new Date()) || "",
      "expiresOn": formateDates(new Date(new Date().setDate(new Date().getDate() + 7))) || "",
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
      "manufacturerCouponId": "0",
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
      "recurringStartDate": formateDates(new Date()) || "",
      "recurringEndDate": new Date(new Date().setDate(new Date().getDate() + 7)) || "",
      "recurringTypeId": 0,
      "clubIds": "0",
      "groupNames": "",
      "clientStoreIds": "0",
      couponLimit:1,
      maxCouponAmount:0,
      productCode: "",
      productName: "",
      productCategoryId: "0",
      isMajorDepartment: true,
      UPC: "",
      NoOfCoupons: "0",
      //  FromDate:"",
      //  ToDate:"",
      selectAll: false
    }
  );


  useEffect(() => {
      if(selectCoupon === "Basket Deals") {
        setValue((prev) => ({...prev,newsCategoryId:"3"}))
      }
      if(selectCoupon === "UPC Promotion"){
        setValue((prev) => ({...prev,newsCategoryId:"5"}))
      }
<<<<<<< HEAD
      if(selectCoupon === "Free Item") {
        setValue(prev => ({...prev,newsCategoryId:8}))
      }
      if(selectCoupon === "Cross Sell"){
        setValue((prev) => ({...prev,newsCategoryId:7}))
      }
=======
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
  },[selectCoupon])



  //  validateNumners only
  const validNumbers = (e) => {
    let reqex = /^[0-9]+$/;
    if(reqex.test(e.tartget.value)) setValue((prev) => {
      return {
        ... prev,
        ["maxCouponAmount"]:e.target.value
      }
    });
    
  }

  const validateNaNNumbers=(e) => {
    if(!isNaN(e.target.value)) {
      setValue(prev => ({...prev,maxCouponAmount:e.target.value}))
    } 
  }


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientStoresAPI())
    dispatch(GetProductCategoriesAPI())
    dispatch(GetAllshoppersGroupsAPI("Veritra RSA", 0, 0))
  }, [dispatch]);

 

  const handleInput = (e, name) => {
    setValue((prev) => {
      return {
        ...prev,
        [name]: e.target.value
      }
    })
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [prviousStep, setPreviousStep] = useState(0);




  const handleSteps = (index) => {
    setPreviousStep(currentStep);
    setCurrentStep(index);

  }
<<<<<<< HEAD

  console.log("udpated steps: ",steps);
  console.log("udpate couponHeader",couponName);


=======
  const [steps, setSteps] = useState(["General", "Departments", "Groups", "Stores", "Store WeeklyAd Groups"]);
  useEffect(() => {
    if (selectCoupon === "UPC Promotion") {
      if (Array.isArray(steps)) {
        setSteps((prev) => {
          let update = [...prev];
          update[1] = "Choose Products";
          return update;
        })
      }
    } else {
      setSteps(["General", "Departments", "Groups", "Stores", "Store WeeklyAd Groups"])
    }
  }, [selectCoupon])
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1


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
  const [groupAll, setGroupAll] = useState(false);
  const [groupInclude, setGroupInclude] = useState(false);
  const [groupExclude, setGroupExclude] = useState(false);

  // store switches:
  const [storesAll, setStoresAll] = useState(false);
  const [storesInclude, setStoresInclude] = useState(false);
  const [storesExclude, setStoresExclude] = useState(false);

  // use Multiple transaction:
  const [useMultipleTran, setUseMultipleTran] = useState(false);

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
    } else if (index === 9) {
      setGroupAll(prev => !prev);
    } else if (index === 10) {
      setGroupInclude(prev => !prev)
    } else if (index === 11) {
      setGroupExclude(prev => !prev)
    } else if (index === 12) {
      setStoresAll(prev => !prev);
    } else if (index === 13) {
      setStoresInclude(prev => !prev);
    } else if (index === 14) {
      setStoresExclude(prev => !prev);
    } else if (index === 15) {
      setUseMultipleTran(prev => !prev)
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
  const [selectGroups, setSelectGroups] = useState(["All"]);
  const [storeDropdown, setStoreDropdown] = useState(false);
  const handleStoreDropDown = () => setStoreDropdown(prev => !prev);
  const handleSelectGroups = (itemName) => {
    if (itemName === "All") {
      setSelectGroups(["All"]);
      setValue((prev) => {
        return {
          ...prev,
          ["clientStoreIds"]: "0"
        }
      })
    } else {
      let updateItem = selectGroups?.includes(itemName)
        ? selectGroups?.filter((i) => i !== itemName)
        : [...selectGroups?.filter((i) => i !== "All"), itemName];
      setSelectGroups(updateItem);
    }

  }

  const handleRemoveStores = (itemName) => {
    if (itemName === "All") {
      setSelectGroups([]);
    } else {
      let updateItem = selectGroups?.filter((i) => i !== itemName);
      setSelectGroups(updateItem?.length > 0 ? updateItem : ["All"])
    }
  }
  // SELECT GROUPID,GROUPNAMES
  let groupIds = [];
  let groupNames = [];
  const groupDetails = Array.isArray(getAllShopperGroupsData) && getAllShopperGroupsData?.filter((item) => selectGroups?.includes(item?.groupName)).map((each) => {

    groupIds.push(each?.groupID);
    groupNames.push(each?.groupName);
    return { ids: each?.groupID, groupName: each?.groupName }

  });

  useEffect(() => {
    let groupIds = [];
    let groupNames = [];
    const groupDetails = Array.isArray(getAllShopperGroupsData) && getAllShopperGroupsData?.filter((item) => selectGroups?.includes(item?.groupName)).map((each) => {

      groupIds.push(each?.groupID);
      groupNames.push(each?.groupName);
      return { ids: each?.groupID, groupName: each?.groupName }

    });
    if (selectGroups?.includes("All")) setValue({ ...value, clubIds: "0", groupNames: "" })
    else if (Array.isArray(getAllShopperGroupsData)) setValue({
      ...value,
      clubIds: groupIds.join(","),
      groupNames: groupNames.join(",")
    })
    //   const groupIDS=  Array.isArray(groupDetails)?.map((each,i) => each?.groupID).join(",");
    // const groupName =Array.isArray(groupDetails)?.map((each,i) => each?.groupName).join(",");

  }, [selectGroups, getAllShopperGroupsData])

  // STORES:
  const [selectStores, setSelectStores] = useState(["All"]);
  const [dropdownStore, setDropdownStore] = useState(false);
  const handleDropdownstores = () => {
    setDropdownStore(prev => !prev)
  }
  const handleSelectStores = (storeName) => {
    if (storeName === "All") {
      setSelectStores(["All"]);
    } else {
      let updateItem = selectStores?.includes(storeName)
        ? selectStores?.filter((i) => i !== storeName)
        : [...selectStores?.filter((i) => i !== "All"), storeName];
      setSelectStores(updateItem);
    }
  }

  const removeSelectedStores = (storeName) => {
    if (storeName === "All") {
      setSelectStores([]);
    } else {
      let update = selectStores?.filter((i) => i !== storeName);
      setSelectStores(update?.length > 0 ? update : ["All"])
    }
  }
 
  useEffect(() => {
    if (selectStores.includes("All")) {
      setValue((prev) => {
        return {
          ...prev,
          ["clientStoreIds"]: "0"
        }
      })
    }
  }, [selectStores])
  useEffect(() => {
    if (selectStores === "All") {
      setValue({
        ...value,
        clientStoreIds: "0",
        storeRouteId: ""
      })
    } else if (Array.isArray(getClientStoresData)) {
      const storeIds = Array.isArray(getClientStoresData) && getClientStoresData?.filter((item) => selectStores?.includes(item?.storeName)).map((each) => each?.clientStoreId).join(",");
      const storeNames = Array.isArray(getClientStoresData) && getClientStoresData?.filter((item) => selectStores?.includes(item?.storeName)).map((each) => each?.storeName).join(",");

      setValue({
        ...value,
        clientStoreIds: storeIds,
        storeRouteId: "LTE76HR8BTRLY7CS9VTJE7JXES"
      })
    }
  }, [selectStores, getClientStoresData])
  // STORES:

  const [slideval, setSlideval] = useState("")
  useEffect(() => {

    if (prviousStep == 0 && currentStep == 0) {
      setSlideval("slide-right");
    }
    else if (prviousStep > currentStep) {
      setSlideval("slide-right");
    }
    else if (prviousStep < currentStep) {
      setSlideval("slide-left");
    }

  }, [prviousStep, currentStep])

<<<<<<< HEAD
  console.log("current select coupon: ",selectCoupon)
=======

>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
  console.log("value", value);
 
 const  createBasketCouponData  = useSelector(state => state.createBasketCouponData);
 const createBasketCouponMessage = useSelector(state => state.createBasketCouponMessage);
 const createBasketCouponLoading = useSelector(state => state.createBasketCouponLoading);
 const createUPCCouponData = useSelector(state => state.createUPCCouponData);
 const createUPCCouponLoading = useSelector(state => state.createUPCCouponLoading);
 const createUPCCouponMessage = useSelector(state => state.createUPCCouponMessage);
  

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

  //  showing notifications Api Status:
  useEffect(() => {
    if(createUPCCouponMessage === "Successful") setSuccessMsg("Successfully create upc coupon.")
    else if(createUPCCouponMessage !== "" && createUPCCouponMessage !== "Successful") setErrorMsg(createUPCCouponMessage)
  },[createUPCCouponMessage])

   
  // create basket coupon:
  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if(selectCoupon == "Basket Deals") dispatch(CreateBasketCouponAPID("Veritra RSA", value));
    if(selectCoupon == "UPC Promotion") dispatch(CreateUPCCouponAPI("Veritra RSA", value));
    
  }

  const handleNextsteps = (currentStep) => {
    if (currentStep == 0) {
      if (value?.title === "") setErrorMsg("Please Enter Title");

      else if (value?.details === "") setErrorMsg("Please Enter Details")
      else if (value?.amount == 0) setErrorMsg("Please Enter Minimum Purchase Amount.");
      else if (value?.discountAmount == 0) setErrorMsg("Please Enter Customer Savings.");
      else if (value?.validFromDate === "") setErrorMsg("Please Enter ValidFromDate");
      else if (value?.expiresOn === "") setErrorMsg("Please Enter Expire Date.");
      else {
        setCurrentStep(currentStep + 1);
        setPreviousStep(currentStep);
        setSlideval("slide-left");
      }
    }
    if (currentStep == 1) {
      if (value?.departmentId === "") setErrorMsg("Please Select Departments");
      else {
        setCurrentStep(currentStep + 1);
        setPreviousStep(currentStep);
        setSlideval("slide-left");
      }
    }

    if (currentStep == 2) {
      if (value?.clubIds === "") setErrorMsg("Please Select Groups")
      else {
        setCurrentStep(currentStep + 1);
        setPreviousStep(currentStep);
        setSlideval("slide-left");
      }
    }
    if (currentStep == 3) {
      if (value?.clientStoreIds == "") {
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDeptDropDown(false);
     
      }

      //Groups
      if (groupDropDownRef.current && !groupDropDownRef.current.contains(e.target)) {
        setStoreDropdown(false);
      }

      // stores dropdownStore
      if (storesDropDownsRef.current && !storesDropDownsRef.current.contains(e.target)) {
        setDropdownStore(false);

      }

    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  });


  // upc section:



  const getProductDetailsData = useSelector(state => state.getProductDetailsData);
  const getProductDetailsMessage = useSelector(state => state.getProductDetailsMessage);
  const getProductDetailsLoading = useSelector(state => state.getProductDetailsLoading);
  const handleSearchUPC = (e) => {
    e.preventDefault();
    dispatch(GetProductDetailsUPCsAPI(value));
  }

  // upc pagination:

  const [isCon, setIsCon] = useState(false);

  const handleSort = (key) => {

    setIsCon(!isCon);
    let direction = "asc";
    if (sortTerm.key === key && sortTerm.direction === "asc") {
      direction = "desc"
    } else if (sortTerm.key === key && sortTerm.direction === "desc") {
      direction = "asc"
    }

    setSortTerm({ key, direction });

  }

  // handleSort icons 
  const handleSortIcon = (key) => {

    if (sortTerm.key === key) {
      return sortTerm.direction === "asc" ?
        <FontAwesomeIcon icon={faCaretUp} style={{ color: "#65BBD6", marginLeft: "5px" }} />
        : <FontAwesomeIcon icon={faCaretDown} style={{ color: "#65BBD6", marginLeft: "5px" }} />
    }

    // return <FontAwesomeIcon icon={faSort}  style={{color:"#0078d4",marginLeft:"5px"}} />
    return <FontAwesomeIcon icon={faCaretDown} style={{ color: "#65BBD6", marginLeft: "5px" }} />
  }



  const [pageNo, setPageNo] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortHandler = (column) => {

    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'desc';
    const sortData = [...filterData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "desc" ? 1 : -1;
      return 0;
    })
    setFilterData(sortData);
    setSortColumn(column);
    setSortDirection(direction);

    //   dispatch(getFindShopperPaginationAPI(clientName,value,page,itemPerPage,setTotalRecords,sortColumn,direction,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata))

  }
  // sorting ,filter,searching 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(getProductDetailsData || []);

  const [sortTerm, setSortTerm] = useState({
    key: "", direction: "asc"
  });


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    //  setPage(1)
    handleSearchFilter(e.target.value);
    setCurrentPage(1);

  }

  const handleSearchFilter = (searchTermValue) => {
    if (!searchTermValue) {
      setFilterData(getProductDetailsData);
      return;
    }

    const filter = getProductDetailsData?.filter(item => {
      return Object.values(item).some((val) => {

        const valueToSearch = val != null ? val.toString().toLowerCase() : '';
        return valueToSearch.includes(searchTermValue.toLowerCase());
      });
    });
    setFilterData(filter);
  }



  useEffect(() => {
    if (getProductDetailsMessage === "Successful") {
      let updatedata = getProductDetailsData;
      setFilterData(updatedata);

    }
  }, [getProductDetailsData, getProductDetailsMessage]);
  // Pagination:  const [filerData,setFilterData] = useState(getTopShoppersData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filterData)
    ? filterData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  let totalPage = Math.ceil(filterData?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  let pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }


  let totalEntries = getProductDetailsData?.length || 0;

  let filteredEntries = filterData?.length || 0;

  const displayMessage = searchTerm != ""
    ? `Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= filteredEntries ? indexOfLastItem : filteredEntries} of ${filteredEntries} entries (filtered from ${totalEntries} total entries)`
    : `Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= totalEntries ? indexOfLastItem : totalEntries} of ${totalEntries} entries`;



   // sorting data result: for all filtere data:
             const sortData = Array.isArray(filterData) ? filterData.sort((a, b) => {
                 if (sortTerm.key) {
                     if (a[sortTerm.key] > b[sortTerm.key]) {
                         return sortTerm.direction === "asc" ? 1 : -1;
                     }
                     else if (a[sortTerm.key] < b[sortTerm.key]) {
                         return sortTerm.direction === "asc" ? -1 : 1;
                     }
         
         
                 }
                 return 0;
         
             }) : [];
         
         
             useEffect(() => {
                 setFilterData(sortData);
             }, [filterData]);
         

  // UPLOAD UPC FILE MODEL:
  const [show,setShow] = useState(false);
  const handleOpen = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const [selectedItem, setSelectedItem] = useState([]);
  const handleSelectedItems = (each) => {
    
  setSelectedItem((prev) => {
      let alreadySelected = prev?.some((item) => item.productId === each?.productId);
      return alreadySelected ? prev.filter((item) => item.productId !== each?.productId) : [...prev,each];
  })
  }

  useEffect(() => {
    let selectedUPc = selectedItem?.length > 1 ?
    selectedItem?.map((each) => each?.productCode).join(",")
    : selectedItem?.length === 1 ? selectedItem[0]?.productCode :"";
    // let productNames = selectedItem?.length > 1 ?
    // selectedItem?.map((each) => each?.productName).join(",")
    // : selectedItem?.length === 1 ? selectedItem[0]?.productName :"";
    let productNames = selectedItem?.length > 0 ? selectedItem[0]?.productName :"";
    setValue((prev) => {
      return {
        ...prev,
        ["UPC"]:selectedUPc,
        ["productName"]:productNames
      }
    })
  },[selectedItem]);
  const [data,setData] = useState([]);

 useEffect(()=>{
   const selectedUPCS = data?.length > 2 ? 
  data?.slice(1)?.map((each) => each).join(",") 
 :  data?.length === 2 ? data[0] :"";
 setValue((prev) => {
   return {
     ...prev,
     ["UPC"]:selectedUPCS
   }
 })
 },[data])


  

  return (
    <>
      <div className='right side-menu'>

      </div>
      <div className='content-page style-gg' style={{ height: "100vh", marginLeft: isEnlarged ? "50px" : "240px" }}>
        <div className='content' style={{


          padding: "10px",
          outline: "none",
          overflowY:"auto"

          //    marginLeft:isEnlarged ? "0px" :"0px"
          // background: "#f3f3f3"
          // backgroundColor: "#f9f9f9"
        }}>
          <div className='page-heading' >
            <h1 style={{ color: "#505458", fontSize: "24px", marginTop: "15px" }}>
              <FontAwesomeIcon icon={faTags} style={{ marginRight: "5px" }} />
              <span>Create Coupon</span>
            </h1>
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
                      
          <div className='widget-header'>
            <div>
              <h2 onClick={() => setCouponSlidOpen(!couponSlidOpen)} style={{ cursor: "pointer", padding: "10px", pointerEvents: 'auto' }}>
                <strong>Coupon</strong>
                {" Types"}
              </h2>
            </div>
            <div className={`widget-content pading slide-content ${couponSlidOpen ? "slide-in" : "slide-up"}`} style={{ overflow: "hidden" }}>
              <div className=''>
                <div className='' style={{ padding: "15px" }}>

                  <div className='row'>
                    <div className='col-sm-2'>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <input type='radio' checked={selectCoupon === "Basket Deal" ? true : false} onChange={() => {
                            handleSelectCoupon("Basket Deal");
                            setCurrentStep(0);
                          }} />
                        </div>
                        <span>Basket Deal</span>
                      </div>
                    </div>

                    <div className='col-sm-2'>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <input type='radio' checked={selectCoupon === "UPC Promotion" ? true : false} onChange={() => {
                            handleSelectCoupon("UPC Promotion");
                            setCurrentStep(0);
                          }} />
                        </div>
                        <span>UPC Promotion</span>
                      </div>
                    </div>

                    <div className='col-sm-3'>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <input type='radio' checked={selectCoupon === "Free Item" ? true : false} onChange={() => {
                            handleSelectCoupon("Free Item");
                            setCurrentStep(0);
                          }} />
                        </div>
                        <span>Free Item with Additional Purchase</span>
                      </div>
                    </div>

                    <div className='col-sm-2'>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <input type='radio' checked={selectCoupon === "Cross Sell" ? true : false} onChange={() => {
                            handleSelectCoupon("Cross Sell");
                            setCurrentStep(0);
                          }
                          } />
                        </div>
                        <span>Cross Sell Promotion</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='' style={{ marginTop: "20px", height: "auto" }}>

            {
              selectCoupon === "Basket Deal" &&
              <div className='widget-header'>
                <div >
                  <h2
                    onClick={() => {
                     
                      setSectionSlideOpen(prev => !prev);
                    }}
                    style={{ cursor: "pointer", padding: "10px", pointerEvents: "auto" }}>
                    {"Create "} <strong>Basket</strong>
                    {" Deal"}
                  </h2>
                </div>
                <div className={`widget-content pading section_slide_content ${sectionSlideOpen ? "section_in" : "section_up"} `}>
                  <div id="">
                    <div className='widget-header' style={{ paddingLeft: "0px", padding: "0px" }}>
                      <div className='' style={{ background: "#fff", padding: "12px", height: "700px" }}>
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
                                <div className={`row ${slideval} `}  >
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
                                                ["expiresOn"]: d,
                                                ["recurringEndDate"]: d

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
                                  <section className={`${slideval}`} style={{ float: "left", width: "1132px", height: "270px" }}>

                                    <div className={`slide ${currentStep === 1 ? "active" : "inactive"}`}>
                                      <div className='row' style={{ marginBottom: "10px" }}>
                                        <div className='col-sm-6 offset-3'>
                                          <div className='form-group'>
                                            <div className='row'>
                                              <div className='col-sm-3'>
                                                <div style={{ right: "-18px" }} className={`switchbtn ${isMajorDepartments ? "active" : ""}`} onClick={(e) => handleSwitches(5)}>
                                                  <div className='switch-handlebtn'></div>
                                                </div>
                                              </div>
                                              <div className='col-sm-5' style={{ paddingTop: "5px", marginLeft: "-70px" }}>
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
                                              <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-20px" }}>
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
                                              <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                              <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                                              <input type='text' className='selectItem' placeholder='Select Departments' style={{ outline: "none", border: "none" }} />
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
                                <section className={`${slideval
                                  }`} style={{ float: "left", width: "1132px", height: "250px" }}>

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
                                          <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-20px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                              ref={groupDropDownRef}

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
                                                          <input className='selectItem' type='text' placeholder={!storeDropdown ? 'Select Groups' : ""} style={{ outline: "none", border: "none" }} />
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
                                            <span style={{ color: "red", width: "448px", textAlign: "start", fontSize: "14px", display: "flex" }}>
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
                                <section className={`${slideval}`} style={{ float: "left", width: "1132px", height: "300px" }}>

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
                                          <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-20px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                                          <input className='selectItem' type='text' placeholder={!dropdownStore ? 'Select Stores' : ""} style={{ outline: "none", border: "none" }} />
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
                                <section className={`${slideval}`} style={{ float: "left", width: "1132px", height: "400px" }}>

                                  <div className='row'>
                                    <div className="col-sm-3" >
                                      <label style={{ textAlign: "left", display: "flex" }}>Stores WeeklyAd Group:</label>
                                      <br />
                                      <br />
                                      <label style={{ textAlign: "left", display: "flex" }}>Selection Clarification:</label>
                                      <br />
                                      <label style={{ display: "flex", alignItems: "center", justifyContent: "start", textAlign: "left" }}> {' You may choose either "Stores" or "Store WeeklyAd Groups." Opting for "WeeklyAd Group" will reverse the store selection made in step 4(Stores)'} </label>
                                    </div>
                                    <div className='col-md-4'>
                                      <select className='form-control' style={{ width: "325px", height: "150px" }} multiple={true}>
                                        <option value={"0"} selected>All WeeklyAd Groups</option>
                                      </select>
                                      <br />
                                      <div style={{ display: "flex" }}>
                                        <label style={{ display: 'inline' }}>Store Names:&nbsp;


                                        </label>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                          {
                                            selectStores?.length > 0 && !selectStores?.includes("All") &&
                                            selectStores?.map((each, i) => {
                                              return <span key={i} style={{ display: "block", marginBottom: "10px", textAlign: "start" }}>{each}</span>
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
                              <button className='btnSearch' onClick={() => {
                                setPreviousStep(currentStep);
                                setCurrentStep(currentStep - 1);
                                setSlideval("slide-right");
                              }
                              }>Back</button>
                            )}
                            {currentStep !== 4 ? <button style={{ marginLeft: "auto" }} onClick={() => {
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
            }

            {
<<<<<<< HEAD
              (selectCoupon == "UPC Promotion" || selectCoupon === "Free Item"  ||selectCoupon === "Cross Sell")&&
=======
              selectCoupon == "UPC Promotion" &&
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
              <div style={{background:"#fff"}} >
                <div >
                  <h2
                    onClick={() => {
                    
                      setSectionSlideOpen(prev => !prev);
                    }}
<<<<<<< HEAD
                    style={{ cursor: "pointer", padding: "10px", pointerEvents: "auto" ,color:"#5B5B5B"}}>
                    {"Create "} {
                      couponName?.length > 1 ? (<> 
                      <strong style={{color:"#5B5B5B"}}>{couponName[0]}</strong>{" "} 
                      {couponName[1]}
                      </>) :
                      <strong style={{color:"#5B5B5B"}}>
                        {
                          couponName[0]
                        }
                      </strong>
                      }
                  
=======
                    style={{ cursor: "pointer", padding: "10px", pointerEvents: "auto" }}>
                    {"Create "} <strong>UPC</strong>
                    {" Promotion"}
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                  </h2>
                </div>
                <div className={`widget-content pading section_slide_content ${sectionSlideOpen ? "section_in" : "section_up"} `} >
                <div className='' style={{ paddingLeft: "0px", padding: "0px" }}>
                      <div className='' style={{ background: "#fff", padding: "12px", }}>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className=' animated fadeInDown'>
                              <div>
                                <ul className='easyWizardSteps'>
                                  {
                                    steps?.length > 0 &&
                                    steps?.map((step, i) => {
                                      return <li key={i} className={currentStep === i ? "current" : ""} onClick={() => handleSteps(i)}>
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
                                <div className={`row ${slideval} `}  >
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
                                      {switchSavings &&
                                        <div className='form-group' style={{ marginBottom: "20px", gap: "-15px" }}>
                                          <label>Maximum Coupon Amount (per Redemption)</label>
                                          <input type='text' name="maxCouponAmount" value={value?.maxCouponAmount} placeholder='Coupon Max Value' className='form-control' style={{ width: "100%" }}
                                           onChange={(e) =>{
                                            validateNaNNumbers(e);
                                           
                                           //validNumbers(e);
                                            // handleInput(e,"maxCouponAmount");
                                           }
                                                            
                                           }
                                          />
                                          <label>Note: When "zero" is entered into the "Maximum Coupon Amount" field, the system will disregard the maximum coupon amount condition. Consequently, the coupon will be applied based on the calculated percentage value of the item.</label>
                                        </div>
                                      }
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
                                      <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "-5px" }}>
                                        <div className='col-sm-3' style={{ paddingLeft: "0px" }}>
                                          <div className={`switchbtn ${switchMonthly ? "active" : ""}`} onClick={(e) => handleSwitches(4)}>
                                            <div className='switch-handlebtn'></div>
                                          </div>
                                        </div>
                                        <div className='col-sm-9' style={{ paddingLeft: "0px", marginLeft: "-30px", textAlign: "start", paddingTop: "5px" }}>
                                          <span>Monthly Deal</span>
                                        </div>
                                      </div>

                                      <div className='form-group' style={{ display: "flex", gap: "20px" }}>
                                        <div style={{ width: "100px" }}>
                                          <label>Coupon Limt</label>
                                          <select id="couponLimit" name="couponLimit" value={value?.couponLimit} onChange={(e) => handleInput(e,"couponLimit") }>
                                            <option value={"0"}>0</option>
                                            <option value={"1"}>1</option>
                                            <option value={"2"}>2</option>
                                            <option value={"2"}>3</option>
                                            <option value={"2"}>4</option>
                                            <option value={"2"}>5</option>
                                            <option value={"2"}>6</option>
                                            <option value={"2"}>7</option>
                                            <option value={"2"}>8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>

                                          </select>
                                        </div>
                                        <div className='form-group' style={{ marginBottom: "20px", display: "flex", gap: "5px", width: "200px" }}>
                                          <div className='col-sm-3' style={{}}>
                                            <br />
                                            <div className={`switchbtn ${useMultipleTran ? "active" : ""}`} onClick={(e) => handleSwitches(15)}>
                                              <div className='switch-handlebtn'></div>
                                            </div>
                                          </div>
                                          <div className='col-sm-9' style={{ paddingLeft: "0px", width: "200px", textAlign: "start", paddingTop: "-15px" }}>
                                            <br />
                                            <span>Use In Multiple Transactions</span>
                                          </div>
                                        </div>
                                      </div>



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
                                                ["expiresOn"]: d,
                                                ["recurringEndDate"]: d

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
<<<<<<< HEAD
                           
=======
                                // <section className={`row ${slideval}`}>

                                //   <div className={`slide ${currentStep === 1 ? "active" : "inactive"}`}>
                                   
                                //   </div>

                                // </section>
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                                <div className={`row ${slideval}`} style={{marginBottom:"10px"}}>
                                <div className='col-md-4'>
                                  <div>
                                    <span>Select UPCs</span>
                                    <div style={{ textAlign: "right", marginTop: "-30px" }}>
                                      <button type='button' className='btnCancel' onClick={() => handleOpen()} >Copy From File</button>
                                    </div>
                                    <span>You can either enter multiple UPCs separated by commas or copy them from an excel file.
                                    </span>
                                    <div className='note'>
                                      <div className='row'>
                                        <div className='col-sm-12'>
                                          <div className='form-group'>
                                            <textarea maxLength={2000} className='form-control'
                                             name='UPC' value={value?.UPC} onChange={(e) => {
                                              handleInput(e,"UPC");
                                             }} 
                                            style={{ height: "370px", width: "100%" }
                                                
                                            }></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                                <div className='col-md-8'>
                                  <div className='row'>
<<<<<<< HEAD
                                    <span>Search and add {selectCoupon === "Cross Sell" ? "Products" : "UPCs"} to coupon</span>
=======
                                    <span>Search and add UPCs to coupon</span>
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                                  </div>

                                  <div className='note' style={{ paddingTop: "10px", width: "800px" }}>
                                    <div className='row'>
                                      <div className='col-sm-12' style={{ paddingRight: "0px" }}>
                                        <div className='col-sm-4 ' style={{ marginLeft: "0px" }}>
                                          <div className='form-group'>
                                            <label>Departments</label>
                                            <select className='' style={{ width: "233px" }}
                                              id="productCategoryId"
                                              name='productCategoryId'
                                              value={value?.productCategoryId}
                                              onChange={(e) => {
                                                handleInput(e, "productCategoryId");
                                              }}
                                            >
                                              <option value>select Department</option>
                                              <option value={"0"}>All</option>
                                              {
                                                getProductCategoriesData?.length > 0 &&
                                                getProductCategoriesData?.map((each, i) => {
                                                  return <option key={each?.productCategoryId} value={each?.productCategoryId}>
                                                    {each?.productCategoryName}
                                                  </option>
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                        <div className='col-sm-4' style={{ marginLeft: "-15px" }}>
                                          <div className='form-group'>
                                            <label>UPC</label>
                                            <input name="productCode" className='form-control' placeholder='UPC' style={{ width: "233px", display: "block" }}
                                              value={value?.productCode}
                                              onChange={(e) => {
                                                handleInput(e, "productCode")
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className='col-sm-4 ' style={{ marginLeft: "-15px" }}>
                                          <div className='form-group'>
                                            <label>Product Name</label>
                                            <input name="productName" className='form-control' placeholder='Product Name' style={{ width: "233px" }}
                                              value={value?.productName}
                                              onChange={(e) => {
                                                handleInput(e, "productName")
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className='col-sm-1 ' style={{ marginLeft: "-60px", paddingLeft: "40px" }}>
                                          <label>&nbsp;</label>
                                          <button className='btn btn-success' style={{ paddingRight: "20px" }}
                                            onClick={(e) => {
                                              handleSearchUPC(e)
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faSearch} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    {
                                      getProductDetailsMessage !== "" &&
                                      <>
                                        {
                                          getProductDetailsMessage === "Successful" && getProductDetailsData?.length > 0 ?
                                            <div style={{marginTop:"10px"}}>
                                              <table className='table table-bordered table-stripped table-hover' cellSpacing={"0"}>
                                                <thead>
                                                  <tr>
                                                    <th></th>

                                                    <th onClick={() => {
                                                      handleSort("productName");
                                                      sortHandler("productName");
                                                    }


                                                    }>Product Name
                                                      {handleSortIcon("productName")}

                                                    </th>

                                                    <th onClick={() => {
                                                      handleSort("productCategoryName");
                                                      sortHandler("productCategoryName");
                                                    }


                                                    }>DepartMent
                                                      {handleSortIcon("productCategoryName")}

                                                    </th>


                                                    <th onClick={() => {
                                                      handleSort("productCode");
                                                      sortHandler("productCode");
                                                    }


                                                    }>UPC
                                                      {handleSortIcon("productCode")}

                                                    </th>



                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {
                                                    //getTopShoppersData?.map((each,i) => {
                                                    currentItems?.map((each, i) => {
                                                      return <tr key={i}>
                                                        <td>
                                                          <input
                                                            type="checkbox"
                                                            checked={selectedItem.some((item) => item.productId === each?.productId)}
                                                            onChange={() => {
                                                              handleSelectedItems(each);
                                                              // handleRemoveRow(each?.userDetailId)
                                                            }
                                                            }
                                                          />
                                                        </td>
                                                        <td>{each?.productName}</td>
                                                        <td>{each?.productCategoryName}</td>
                                                        <td>{each?.productCode}</td>

                                                      </tr>
                                                    })
                                                  }
                                                </tbody>
                                              </table>
                                              <div >

                                                <div>
                                                  {/* <p>{`Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} 
                                                                                                                                                                                      to ${Math.min(currentPage * itemsPerPage, totalEntries)} 
                                                                                                                                                                              of ${totalEntries} entries`}</p> */}
                                                  {/* <p>{`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= totalEntries ? indexOfLastItem : totalEntries} of ${totalEntries} entries`}</p> */}
                                                  <p>{displayMessage}</p>
                                                </div>

                                                <div className='pagination'
                                                  style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}

                                                >
                                                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='btnPrev'>
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                  </button>

                                                  {pageNumbers.length > 10 ? (
                                                    <>
                                                      {currentPage > 3 && <button className="inActivePage" onClick={() => handlePageChange(1)}>1</button>}
                                                      {currentPage > 4 && <span className="inActivePage">...</span>}
                                                      {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, pageNumbers.length)).map((number) => (
                                                        <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                          {number}
                                                        </button>
                                                      ))}
                                                      {currentPage < pageNumbers.length - 3 && <span className='inActivePage'>...</span>}
                                                      {currentPage < pageNumbers.length - 2 && <button className="inActivePage" onClick={() => handlePageChange(pageNumbers.length)}>{pageNumbers.length}</button>}
                                                    </>
                                                  ) : (
                                                    pageNumbers.map((number) => (
                                                      <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                        {number}
                                                      </button>
                                                    ))
                                                  )}

                                                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage} className='btnNext'>
                                                    <FontAwesomeIcon icon={faAngleRight} />
                                                  </button>
                                                </div>

                                              </div>
                                            </div>
                                            :
                                            <div>
                                              <span>No products found</span>
                                            </div>
                                        }
                                      </>
                                    }

                                  </div>
                                </div>
                              </div>
                             

                              }
<<<<<<< HEAD
                             
                             {
                                (currentStep === (selectCoupon === "Cross Sell" ? 2 : null)) &&
                           
                                <div className={`row ${slideval}`} style={{marginBottom:"10px"}}>
                                <div className='col-md-4'>
                                  <div>
                                    <span>Select UPCs</span>
                                    <div style={{ textAlign: "right", marginTop: "-30px" }}>
                                      <button type='button' className='btnCancel' onClick={() => handleOpen()} >Copy From File</button>
                                    </div>
                                    <span>You can either enter multiple UPCs separated by commas or copy them from an excel file.
                                    </span>
                                    <div className='note'>
                                      <div className='row'>
                                        <div className='col-sm-12'>
                                          <div className='form-group'>
                                            <textarea maxLength={2000} className='form-control'
                                             name='UPC' value={value?.UPC} onChange={(e) => {
                                              handleInput(e,"UPC");
                                             }} 
                                            style={{ height: "370px", width: "100%" }
                                                
                                            }></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                                <div className='col-md-8'>
                                  <div className='row'>
                                    <span>Search and Add Reward Products to Coupon</span>
                                  </div>

                                  <div className='note' style={{ paddingTop: "10px", width: "800px" }}>
                                    <div className='row'>
                                      <div className='col-sm-12' style={{ paddingRight: "0px" }}>
                                        <div className='col-sm-4 ' style={{ marginLeft: "0px" }}>
                                          <div className='form-group'>
                                            <label>Departments</label>
                                            <select className='' style={{ width: "233px" }}
                                              id="productCategoryId"
                                              name='productCategoryId'
                                              value={value?.productCategoryId}
                                              onChange={(e) => {
                                                handleInput(e, "productCategoryId");
                                              }}
                                            >
                                              <option value>select Department</option>
                                              <option value={"0"}>All</option>
                                              {
                                                getProductCategoriesData?.length > 0 &&
                                                getProductCategoriesData?.map((each, i) => {
                                                  return <option key={each?.productCategoryId} value={each?.productCategoryId}>
                                                    {each?.productCategoryName}
                                                  </option>
                                                })
                                              }
                                            </select>
                                          </div>
                                        </div>
                                        <div className='col-sm-4' style={{ marginLeft: "-15px" }}>
                                          <div className='form-group'>
                                            <label>UPC</label>
                                            <input name="productCode" className='form-control' placeholder='UPC' style={{ width: "233px", display: "block" }}
                                              value={value?.productCode}
                                              onChange={(e) => {
                                                handleInput(e, "productCode")
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className='col-sm-4 ' style={{ marginLeft: "-15px" }}>
                                          <div className='form-group'>
                                            <label>Product Name</label>
                                            <input name="productName" className='form-control' placeholder='Product Name' style={{ width: "233px" }}
                                              value={value?.productName}
                                              onChange={(e) => {
                                                handleInput(e, "productName")
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className='col-sm-1 ' style={{ marginLeft: "-60px", paddingLeft: "40px" }}>
                                          <label>&nbsp;</label>
                                          <button className='btn btn-success' style={{ paddingRight: "20px" }}
                                            onClick={(e) => {
                                              handleSearchUPC(e)
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faSearch} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    {
                                      getProductDetailsMessage !== "" &&
                                      <>
                                        {
                                          getProductDetailsMessage === "Successful" && getProductDetailsData?.length > 0 ?
                                            <div style={{marginTop:"10px"}}>
                                              <table className='table table-bordered table-stripped table-hover' cellSpacing={"0"}>
                                                <thead>
                                                  <tr>
                                                    <th></th>

                                                    <th onClick={() => {
                                                      handleSort("productName");
                                                      sortHandler("productName");
                                                    }


                                                    }>Product Name
                                                      {handleSortIcon("productName")}

                                                    </th>

                                                    <th onClick={() => {
                                                      handleSort("productCategoryName");
                                                      sortHandler("productCategoryName");
                                                    }


                                                    }>DepartMent
                                                      {handleSortIcon("productCategoryName")}

                                                    </th>


                                                    <th onClick={() => {
                                                      handleSort("productCode");
                                                      sortHandler("productCode");
                                                    }


                                                    }>UPC
                                                      {handleSortIcon("productCode")}

                                                    </th>



                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {
                                                    //getTopShoppersData?.map((each,i) => {
                                                    currentItems?.map((each, i) => {
                                                      return <tr key={i}>
                                                        <td>
                                                          <input
                                                            type="checkbox"
                                                            checked={selectedItem.some((item) => item.productId === each?.productId)}
                                                            onChange={() => {
                                                              handleSelectedItems(each);
                                                              // handleRemoveRow(each?.userDetailId)
                                                            }
                                                            }
                                                          />
                                                        </td>
                                                        <td>{each?.productName}</td>
                                                        <td>{each?.productCategoryName}</td>
                                                        <td>{each?.productCode}</td>

                                                      </tr>
                                                    })
                                                  }
                                                </tbody>
                                              </table>
                                              <div >

                                                <div>
                                                  {/* <p>{`Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} 
                                                                                                                                                                                      to ${Math.min(currentPage * itemsPerPage, totalEntries)} 
                                                                                                                                                                              of ${totalEntries} entries`}</p> */}
                                                  {/* <p>{`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= totalEntries ? indexOfLastItem : totalEntries} of ${totalEntries} entries`}</p> */}
                                                  <p>{displayMessage}</p>
                                                </div>

                                                <div className='pagination'
                                                  style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}

                                                >
                                                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='btnPrev'>
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                  </button>

                                                  {pageNumbers.length > 10 ? (
                                                    <>
                                                      {currentPage > 3 && <button className="inActivePage" onClick={() => handlePageChange(1)}>1</button>}
                                                      {currentPage > 4 && <span className="inActivePage">...</span>}
                                                      {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, pageNumbers.length)).map((number) => (
                                                        <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                          {number}
                                                        </button>
                                                      ))}
                                                      {currentPage < pageNumbers.length - 3 && <span className='inActivePage'>...</span>}
                                                      {currentPage < pageNumbers.length - 2 && <button className="inActivePage" onClick={() => handlePageChange(pageNumbers.length)}>{pageNumbers.length}</button>}
                                                    </>
                                                  ) : (
                                                    pageNumbers.map((number) => (
                                                      <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                        {number}
                                                      </button>
                                                    ))
                                                  )}

                                                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage} className='btnNext'>
                                                    <FontAwesomeIcon icon={faAngleRight} />
                                                  </button>
                                                </div>

                                              </div>
                                            </div>
                                            :
                                            <div>
                                              <span>No products found</span>
                                            </div>
                                        }
                                      </>
                                    }

                                  </div>
                                </div>
                              </div>
                             

                              }

                              
                              
                              {
                                 (currentStep === (selectCoupon === "Cross Sell" ? 3 : 2)) 
                                 &&
=======
                              {
                                currentStep === 2 &&
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                                <section className={`${slideval
                                  }`} style={{ float: "left", width: "1132px", height: "250px" }}>

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
                                          <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-20px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                              ref={groupDropDownRef}

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
                                                          <input className='selectItem' type='text' placeholder={!storeDropdown ? 'Select Groups' : ""} style={{ outline: "none", border: "none" }} />
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
                                            <span style={{ color: "red", width: "448px", textAlign: "start", fontSize: "14px", display: "flex" }}>
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
<<<<<<< HEAD
                               (currentStep === (selectCoupon === "Cross Sell" ? 4 : 3))  &&
=======
                                currentStep === 3 &&
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                                <section className={`${slideval}`} style={{ float: "left", width: "1132px", height: "300px" }}>

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
                                          <div className='col-sm-2' style={{ paddingTop: "5px", marginLeft: "-20px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                          <div className='col-sm-5' style={{ paddingTop: "5px", width: "120px", marginLeft: "25px" }}>
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
                                                          <input className='selectItem' type='text' placeholder={!dropdownStore ? 'Select Stores' : ""} style={{ outline: "none", border: "none" }} />
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
<<<<<<< HEAD
                               (currentStep === (selectCoupon === "Cross Sell" ? 5 : 4))  &&
=======
                                currentStep === 4 &&
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                                <section className={`${slideval}`} style={{ float: "left", width: "1132px", height: "400px" }}>

                                  <div className='row'>
                                    <div className="col-sm-3" >
                                      <label style={{ textAlign: "left", display: "flex" }}>Stores WeeklyAd Group:</label>
                                      <br />
                                      <br />
                                      <label style={{ textAlign: "left", display: "flex" }}>Selection Clarification:</label>
                                      <br />
                                      <label style={{ display: "flex", alignItems: "center", justifyContent: "start", textAlign: "left" }}> {' You may choose either "Stores" or "Store WeeklyAd Groups." Opting for "WeeklyAd Group" will reverse the store selection made in step 4(Stores)'} </label>
                                    </div>
                                    <div className='col-md-4'>
                                      <select className='form-control' style={{ width: "325px", height: "150px" }} multiple={true}>
                                        <option value={"0"} selected>All WeeklyAd Groups</option>
                                      </select>
                                      <br />
                                      <div style={{ display: "flex" }}>
                                        <label style={{ display: 'inline' }}>Store Names:&nbsp;


                                        </label>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                          {
                                            selectStores?.length > 0 && !selectStores?.includes("All") &&
                                            selectStores?.map((each, i) => {
                                              return <span key={i} style={{ display: "block", marginBottom: "10px", textAlign: "start" }}>{each}</span>
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
                          <div className={slideval} style={{  display: "flex", height: "auto",marginBottom:"10px" }}>

                            {currentStep !== 0 && (
                              <button className='btnSearch' onClick={() => {
                                setPreviousStep(currentStep);
                                setCurrentStep(currentStep - 1);
                                setSlideval("slide-right");
                              }
                              }>Back</button>
                            )}
<<<<<<< HEAD
                            {(currentStep !== (selectCoupon === "Cross Sell" ? 5 : 4)) ? <button style={{ marginLeft: "auto" }} onClick={() => {
=======
                            {currentStep !== 4 ? <button style={{ marginLeft: "auto" }} onClick={() => {
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
                              //   setPreviousStep(currentStep);
                              //  setCurrentStep(currentStep + 1);
                              handleNextsteps(currentStep);
                              //setSlideval("slide-left")
                            }} className='btnSearch' >Next</button> : <button className='btnSearch' style={{ marginLeft: "auto" }}
                             onClick={(e) =>
                            //   dispatch(CreateUPCCouponAPI("Veritra RSA",value));
                               handleCreateCoupon(e)
                             }>Create Coupon</button>}

                          </div>
                        </div>






                      </div>
                    </div>
                </div>
              </div>
            }
<<<<<<< HEAD
           
           
=======
            {
              selectCoupon == "Free Item" &&
              <div className='widget-header'>
                <div className='row'>
                  Free Item
                </div>
              </div>
            }
            {
              selectCoupon == "Cross Sell" &&
              <div className='widget-header'>
                <div className='row'>
                  Cross Sell
                </div>
              </div>
            }
>>>>>>> b5a13253cac9e70aed709e2e1487adb7ac4c73c1
          </div>
        </div>

      </div>
      <>
       {
        getProductDetailsLoading === true && 
        <LoaderModal show={true} />
       }
       <UploadUPCFile show={show} handleclose={handleClose} data={data} setData={setData} />
      </>

    </>
  )
}

export default CreateCoupon