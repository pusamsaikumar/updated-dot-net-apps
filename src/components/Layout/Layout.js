
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';


import { BrowserRouter,Routes ,Route } from "react-router-dom";
import SelectQuery from "../SelectQuery/SelectQuery";
import ViewReward from "../Reward/ViewReward/ViewReward";
import FindMemberNumberReward from "../Reward/FindMemberNumberReward/FindMemberNumberReward";
import FindShoppers from "../Shoppers/FindShoppers";
import ShopperTransaction from "../Shoppers/ShopperTransaction";
import Header from "../Header/Header";
import { useDispatch,useSelector } from "react-redux";
import { getClientNames,getClientStoresAPI, getFindShopperAPI,GetAllshoppersGroupsAPI } from "../redux/API";
import CreateShopper from '../Shoppers/CreateShopper';
import AllShopperGroups from '../Shoppers/AllShopperGroups';
import ShopperGroupAnalysisTimeLine from '../Shoppers/ShopperGroupAnalysisTimeLine';
import PreDefinedShopper from '../Shoppers/PreDefinedShopper';
import TopShoppers from '../Shoppers/TopShoppers';
import TopShopper from '../Shoppers/TopShopper';
import AdvancedSearchShopper from '../Shoppers/AdvancedSearchShopper';
import ProductShopperSearch from '../Shoppers/ProductShopperSearch';
import BylastDatePurchase from '../Shoppers/BylastDatePurchase';
import UploadShoppers from '../Shoppers/UploadShoppers';
import FindCoupon from '../Coupon/FindCoupon';
import CreateCoupon from '../Coupon/CreateCoupon';



const Layout = () => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [clientNames,setClientNames] = useState([]);
 const getcleintNamesdata = useSelector((state) => state.getcleintNamesdata)
    const dispatch = useDispatch();

    // Toggle function to change the state
    const toggleMenu = () => {
      setIsEnlarged(!isEnlarged);
    };
    
    const [retailerName, setRetailerName] = useState("");
    const handleRetailerName =(e)=> {
     setRetailerName(e.target.value);
    }
   
    //   useEffect(()=> {
    //     if(( typeof getcleintNamesdata === 'object'  && Object?.keys(getcleintNamesdata)?.length === 0) ){
    //         dispatch(getClientNames());
          
    //     }
   
    //   },[dispatch])

    useEffect(()=>{
        dispatch(getClientNames());
    },[])
   
    useEffect(() => {
        if(retailerName === "Veritra RSA") {
           dispatch(GetAllshoppersGroupsAPI(retailerName,0,0))
        }
       },[dispatch,retailerName]);

      // dropdown :
       const [open,setOpen] = useState(null);
       const handleDropdown = (index) => {
        setOpen((prev) => {
          return  prev === index ? null : index;
        })
       }


       // shopper Transaction pagination:
       
    const getFindShopperData = useSelector(state => state.getFindShopperData);
    const getFindShopperMessage = useSelector(state => state.getFindShopperMessage);
    const getFindShopperLoading = useSelector(state => state.getFindShopperLoading);

    const getClientStoresData = useSelector((state) => state.getClientStoresData);
    const getClientStoresLoading = useSelector((state) => state.getClientStoresLoading);
    const getclientStoresMessage = useSelector((state) => state.getclientStoresMessage);
       // sorting ,filter,searching 
    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState(getFindShopperData || []);

    const [sortTerm, setSortTerm] = useState({
        key: "", direction: "asc"
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        handleSearchFilter(e.target.value);
    }

    const handleSearchFilter = (searchTermValue) => {
        if (!searchTermValue) {
            setFilterData(getFindShopperData);
            return;
        }
        const filter = getFindShopperData?.filter(item => {
            return Object.values(item).some((val) => {
                return val.toString().toLowerCase().includes(searchTermValue.toString()) ||
                    val.toString().toUpperCase().includes(searchTermValue.toString()) ||
                    val.toString().includes(searchTermValue.toString())
            })
        });
        setFilterData(filter);

    }
    useEffect(() => {
        if (getFindShopperMessage === "Successful") {
            let updatedata = getFindShopperData;
            setFilterData(updatedata);
        }
    }, [getFindShopperData, getFindShopperMessage]);


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





    useEffect(() => {
        setFilterData(sortedData);
    }, [filterData]);

    // Pagination:
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filterData)
        ? filterData.slice(indexOfFirstItem, indexOfLastItem)
        : [];
    const totalPages = Math.ceil(filterData?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // sorting data result: for all filtere data:
    const sortedData = Array.isArray(filterData) ? filterData.sort((a, b) => {
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

    // Sorting based current selected items:


    const handlePageSelect = (e) => {
        if (e.target.value == "All") {
            setItemsPerPage(currentItems?.length);
        }
        else {
            setItemsPerPage(e.target.value)
        }
    }


    const totalEntries = getFindShopperData?.length || 0;
    const convertToMMddyyyystringFormat = (val) => {
        if (!val) {
          return '';  
        }
      
        
        const splitVal = val.split("-");
        
        
        if (splitVal.length !== 3) {
          return '';  
        }
      
        const [yyyy, mm, dd] = splitVal;
      
        
        return `${mm}/${dd}/${yyyy}`;
      };
      

      // 65500.00 to 6,55,00
      const formatNumbers = (number) => {
        if(!number) {
            return ;
        }
        const integer = Math.floor(number);
        return new Intl.NumberFormat("en-US").format(number)
      }
      
    return (
      <>
     <div id="wrapper" className={isEnlarged ? "enlarged" : "force"} 
       
     >
        <Header
        toggleMenu={toggleMenu} 
        isEnlarged = {isEnlarged} 
        handleRetailerName = {handleRetailerName}
        retailerName={retailerName}
        setRetailerName = {setRetailerName}
         getcleintNamesdata ={ getcleintNamesdata}
          />
    
      </div>
      <BrowserRouter>
      
      <Routes>
        <Route path="/support/cleintaccess" element={<SelectQuery clientName={retailerName} isEnlarged = {isEnlarged}  />} />
        <Route path="/reward/viewreward" element ={<ViewReward clientName={retailerName}         isEnlarged = {isEnlarged}  />} />
        <Route path="/reward/findmemberrewards"  element = {<FindMemberNumberReward clientName={retailerName}         isEnlarged = {isEnlarged}  />} />
        <Route path="/shoppers/findshoppers" element = {<FindShoppers handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}  />} />
        <Route path="/shoppers/shoppertransaction" element = {
          <ShopperTransaction 
              clientName={retailerName}
            //   handleSort={handleSort}
            //   handleSortIcon = {handleSortIcon}
              convertToMMddyyyystringFormat ={convertToMMddyyyystringFormat}
              isEnlarged = {isEnlarged} 
              formatNumbers = {formatNumbers}
          
          />} />
          <Route path='/shoppers/createShopper' element={<CreateShopper     clientName={retailerName} isEnlarged={ isEnlarged} />} />
          <Route path="/shoppers/ShopperGroupsList"  element={<AllShopperGroups handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}  />} />
          <Route path="/shoppers/ShopperGroupAnalysisTimeLine"  element={<ShopperGroupAnalysisTimeLine   clientName={retailerName} isEnlarged={ isEnlarged}/>} />
          <Route path="/shopper/AutomatedGroups" element={<PreDefinedShopper  clientName={retailerName} isEnlarged={ isEnlarged} />} />
          {/* <Route path='/shopper/TopShopper' element={<TopShoppers  clientName={retailerName} isEnlarged={ isEnlarged} />} /> */}
          <Route path='/shopper/TopShopper' element={<TopShopper handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}   />} />
          <Route path="/shopper/AdvanceSearch" element={<AdvancedSearchShopper handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}  />} />
          <Route path="/shopper/ProductShopperSearch" element={<ProductShopperSearch handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged} />} />
          <Route path="/shopper/ByLastPurchaseDate" element={<BylastDatePurchase handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}  />} />
          <Route path="/shopper/UploadShoppers" element={<UploadShoppers handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged}  />} />
          <Route path='/Coupons/FindCoupon' element = {<FindCoupon handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged} />} />
          <Route path="/Coupon/CreateCoupon" element={<CreateCoupon  handleDropdown={handleDropdown} open={open} clientName={retailerName} setOpen={setOpen}  isEnlarged = {isEnlarged} />} />
       </Routes>
      </BrowserRouter>
      </>
      
     
    );
}

export default Layout