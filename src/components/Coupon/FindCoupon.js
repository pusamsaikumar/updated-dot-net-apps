import { faTags } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from "react-bootstrap";

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetNewsCategoriesAPI, FindCouponsAPI } from '../redux/API';
import { Spinner } from 'react-bootstrap';
import ViewFindShopperModelPopup from '../Models/ViewFindShopperModelPopup';
import EditFindShopperModal from '../Models/EditFindShopperModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { Link } from 'react-router-dom';
import LoaderModal from '../Models/LoaderModal';
import ViewCouponModal from '../Models/ViewCouponModal';
import CustomPaginationDataTable from '../../Utils/Helpers/CustomPaginationDataTable';
import CreateBasketDealModal from '../Models/CreateBasketDealModal';

const FindCoupon = (
    {
        handleDropdown, open, clientName, setOpen,  isEnlarged 
    }
    
) => {
   
   const getNewsCategoriesData  = useSelector(state => state.getNewsCategoriesData);
   const getNewsCategoriesMessage  = useSelector(state => state.getNewsCategoriesMessage);
   const getNewsCategoriesLoading = useSelector(state => state.getNewsCategoriesLoading);
    
   const getFindCouponsData = useSelector(state => state.getFindCouponsData);
   const getFindCouponsMessage = useSelector(state => state.getFindCouponsMessage);
   const getFindCouponsLoading = useSelector(state => state.getFindCouponsLoading);

    
    const dispatch = useDispatch();



     const [value,setValue] = useState({
        newsCategoryId:"0",
        valid:"",
        expires:"",
        pass:""
     });

     // default Dates:
      useEffect(() => {
             const getPastCurrentDate = () => {
                 const today = new Date();
                 const dayOfWeek = today.getDay();
     
                 // cal past day of week
                 const pastDay = new Date(today);
                 pastDay.setDate(today.getDate() - 15);
     
                 // cal current date 
                 const currentDate = new Date(today);
                 currentDate.setDate(pastDay.getDate()  - 1);
     
                 return {
                     fromDate: pastDay?.toISOString()?.split('T')[0],
                     toDate: currentDate?.toISOString()?.split('T')[0]
                 }
             }
             const { fromDate, toDate } = getPastCurrentDate();


             if(value?.valid===""){
                setValue({
                    ...value,
                    ["valid"]: fromDate,
                  
                })
             } else if(value?.expires === "") {
                setValue({
                    ...value,
                
                    ["expires"]: toDate
                })
             }
     
     
         }, [value]);
    const handleInput = (e,name) => {
        setValue((prev) => {
            return {
                ...prev,
                [name]:e.target.value
            }
        })
    };

  // CONVERT DATE FORMAT:
  const convertToMMddyyyystringFormat = (value) => {

    if (!value) {
        return "";
    }

    var parts = value.split("/");
    if (parts.length !== 3) {
        return "";
    }

   // return `${parts[1]}/${parts[2]}/${parts[0]}`;
   return `${parts[2]}/${parts[1]}/${parts[0]}`;
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
    
            // useEffect(()=>{
            //    if(getSearchAndCreateGroupMessage === "Successful"){
            //     setSuccessMsg("Shopper group created successfully.")
            //    }
            //   else if(getSearchAndCreateGroupMessage !="" && getSearchAndCreateGroupMessage != "Successful" ){
            //     setErrorMsg("Something went wrong. Please try again.")
            //    }else{
            //     setSuccessMsg("");
            //     setErrorMsg("")
            //    }
            // },[getSearchAndCreateGroupMessage])
     useEffect(() => {
        dispatch(GetNewsCategoriesAPI(clientName))
     },[dispatch])
    
     const handleSearchResults = (e) => {
        e.preventDefault();
        if(value?.newsCategoryId === "0") {
            setErrorMsg("Please select coupon type.")
        }else{
            setErrorMsg("");
            dispatch(FindCouponsAPI(clientName,value));
        }
     }

// PAGINATION:

  // sorting ,filter,searching 
    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState(getFindCouponsData || []);

    const [sortTerm, setSortTerm] = useState({
        key: "", direction: "asc"
    });


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        //setPage(1)
        handleSearchFilter(e.target.value);

    }

    const handleSearchFilter = (searchTermValue) => {
        if (!searchTermValue) {
            setFilterData(getFindCouponsData);
            return;
        }

        const filter = getFindCouponsData?.filter(item => {
            return Object.values(item).some((val) => {

                const valueToSearch = val != null ? val.toString().toLowerCase() : '';
                return valueToSearch.includes(searchTermValue.toLowerCase());
            });
        });
        setFilterData(filter);
    }



    useEffect(() => {
        if (getFindCouponsMessage === "Successful") {
            let updatedata = getFindCouponsData;
            setFilterData(updatedata);

        }
    }, [getFindCouponsData, getFindCouponsMessage]);

   
 
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
    let totalPage = Math.ceil(filterData?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    let pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }


    let totalEntries = getFindCouponsData?.length || 0;

    let filteredEntries = filterData?.length || 0;

    const displayMessage = searchTerm != ""
        ? `Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= filteredEntries ? indexOfLastItem : filteredEntries} of ${filteredEntries} entries (filtered from ${totalEntries} total entries)`
        : `Showing ${indexOfFirstItem + 1} to ${indexOfLastItem <= totalEntries ? indexOfLastItem : totalEntries} of ${totalEntries} entries`;

    //   // Generate pagination buttons based on total pages
    //    totalPage = Math.ceil(filteredEntries / itemsPerPage);

    //   for (let i = 1; i <= totalPage; i++) {
    //       pageNumbers.push(i);
    //   }

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
            setCurrentPage(1)
            //  setFilterData(getFindShopperData)
            //  setItemPerPage(totalRecords);
        }
        else {
            setItemsPerPage(e.target.value);
            setCurrentPage(1);
            // setItemPerPage(e.target.value);

        }
        //setPage(1)
    }

 // MODALS:
 const [showView,setShowView] = useState(false);
 const [viewData,setViewData] = useState([]);
  const [showCoupon,setShowCoupon] = useState(false);
  const [couponData,setCouponData] = useState([]);

 const handleClose = () => {
    setShowView(false);
    setOpen(null)
 }
 const handleOpen=(each)=>{
    setShowView(true);
    setViewData(each);
    setOpen(null)
 }
 
 const handleCouponOpen = (each) => {
    setCouponData(each);
    setShowCoupon(true);
    setOpen(null);

 }
 const handleCouponClose = () => {
   // setCouponData();
    setShowCoupon(false);
    setOpen(null);

 }

 // dropdown :
        const [opendrop,setOpenDrop] = useState(null);
        const handleDrop = (index) => {
         setOpenDrop((prev) => {
           return  prev === index ? null : index;
         })
        }
// handleDropdown click on outside
const dropRef = useRef(null);
useEffect(() => {
    const handleClickOutside = (e) => {
        if(dropRef.current && !dropRef.current.contains(e.target)) {
            setOpen(null);
        }
      
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
        document.removeEventListener("mousedown",handleClickOutside);
    }
},[])

 const columnList = [
    { name: "Image", selector: ((row) => row.imagePath), sortable: true, cell: row => <img src={row.imagePath} alt="" style={{width:"30px",height:"30px"}} /> },
     { name: "Title", selector:(row => row.title), sortable: true },
     { name: "Details", selector: (row => row.details), sortable: true },  
     { name: "Valid From", selector: (row =>convertToMMddyyyystringFormat(row.validFromDate.slice(0,10)) ), sortable: true },
     { name: "Expires On", selector:(row => convertToMMddyyyystringFormat(row.expiresOn.slice(0,10))), sortable: true },
     { name: "Redeems", selector: (row => row.redeemCount), sortable: true },
     { name: "Clips", selector: (row => row.clipsCount), sortable: true },
     { 
        name: "Actions", 
        button: true, 
        cell: (row, index) => (
          <div className="btn-group" style={{position:"relative",unicodeBidi:"normal"}} 
          ref={dropRef}
          >
            <button
              className="btn btn-success dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}
              onClick={() => handleDropdown(index)}
             
            >
              <FontAwesomeIcon icon={faCog} />
            </button>
    
            {/* Dropdown menu */}
            {open === index && (
              <ul
              //ref={dropRef}
                className="dropdown-menu actionDropDown"
                style={{
                    display: "block",

                    position: "absolute !important",
                    unicodeBidi:"normal",
                    right: "0px",
                    left: "auto",
                    width: "160px",
                    zIndex: "1050 !important",
                    maxHeight:"300px",
                    overflowY: "auto",
                    top: "30px",
                    boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)"
                   
                  }}
              >
                <li>
                  <a href="#" onClick={() =>
                    // handleOpen(row)
                     {
                        setViewData(row);
                        setOpenDrop(null);
                        setShowView(true);
                     }
                     
                     }>View</a>
                </li>
                <li>
                  <a href="#" onClick={() =>  handleCouponOpen(row)} >Copy Coupon</a>
                </li>
               
                <li>
                  <a href="#">Remove From Coupon</a>
                </li>
                
              </ul>
            )}
            <ViewCouponModal show={showView} handleClose={handleClose} data={viewData} />
            <CreateBasketDealModal show={showCoupon} handleClose={handleCouponClose} data={couponData} />
          </div>
        ) ,
       ignoreRowClick: true, // Prevent row click event when clicking buttons
       allowOverflow: true, // Prevents overflow issues
        
      },
    // {
    //     name: "Actions",
    //     cell: (row,index) => (
    //       <div>
    //         <DropdownButton
    //           id={`dropdown-${row.newsID}`}
    //           title={<FontAwesomeIcon icon={faCog} />}
    //           variant="success"
    //         >
    //           {/* <Dropdown.Item
    //             onClick={() => {
    //               setViewData(row);
    //               setShowView(true);
    //             }}
    //           >
    //             View
    //           </Dropdown.Item> */}
    //           <Dropdown.Item
    //             onClick={() => {
    //              handleCouponOpen(row)
    //             //setCouponData(row);
    //             // setShowCoupon(true);
    //             }}
    //           >
    //             Copy From Coupon
    //           </Dropdown.Item>
    //           <Dropdown.Item>Remove From Coupon</Dropdown.Item>
    //         </DropdownButton>
  
    //         {/* Modals */}
    //         {showView && viewData && (
    //           <ViewCouponModal show={showView} handleClose={handleClose} data={viewData} />
    //         )}
    //         {showCoupon && couponData && (
    //           <CreateBasketDealModal show={showCoupon} handleClose={handleCouponClose} data={couponData} />
    //         )}
    //       </div>
    //     ),
    //     button: true,
    //     ignoreRowClick: true,
    //     allowOverflow: true,
    //   },
    
 ]

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
            <h1 style={{ color: "#505458", fontSize: "24px" }}>
                                        <FontAwesomeIcon icon={faTags} style={{ marginRight: "5px" }} />
                                        <span>Find Coupons</span>
                                    </h1>
                                    <div> 
                                       

                                       
                                    </div>
                                {/* <input type='password' name="pass" value={value?.pass} onChange={(e) => {
                                        const val = e.target.value;
                                        const regex = /^[a-zA-Z0-9]*$/;  // VALIDATE NUMBERS AND CHARACTERS ONLY NO SPECIAL CHARS....
                                        if(regex.test(val)) {
                                          setValue((prev) => {
                                            return {
                                                ...prev,
                                                ["pass"]:val
                                            }
                                          })
                                        }
                                }} /> */}
        </div>
        <div className='row'>
        <div className='col-sm-12'>
           <div className="widget" > 
              <div className='widget-content'style={{padding:"20px 0px"}} >
                  <div>
                  <div className='row'>
                <div className='col-sm-12'>
                      <div className='col-sm-3' style={{width:"300px",marginLeft:"15px"}}>
                           <div   className='form-group'>
                            <label>Coupon Types</label>
                            <select value={value?.newsCategoryId} name="newsCategoryId" 
                             onChange={(e) => handleInput(e,"newsCategoryId")}
                            >
                                <option value={"0"}>Select Coupon</option>
                                {
                                    getNewsCategoriesData?.length > 0 &&
                                    getNewsCategoriesData?.map((each,i) => {
                                        return <option key={i} value={each?.newsCategoryId}>{each?.categoryName}</option>
                                    })
                                }
                            </select>
                           </div>
                      </div>
                      <div className='col-sm-3' style={{width:"140px",marginLeft:"15px"}}>
                           <div   className='form-group'>
                            <label>Valid From</label>
                            <input type='date' name="valid" value={value?.valid} onChange={(e) => handleInput(e,"valid")} />
                           </div>
                      </div>
                      <div className='col-sm-3' style={{width:"140px",marginLeft:"15px"}}
                       
                      >
                           <div   className='form-group'>
                            <label>Expires On</label>
                            <input type='date'   name="expires" value={value?.expires} onChange={(e) => handleInput(e,"expires")} />
                           </div>
                      </div>
                      <div className='col-sm-2'  style={{marginLeft:"25px"}}>
                           <div className='form-group'>
                            <label>&nbsp;</label>
                            <br />
                            <button type='button' className=' form-control input-group-sm btn btn-success' onClick={(e) =>  handleSearchResults(e)} style={{width:"180px"}}>Search</button>
                           </div>
                      </div>
                      <div>

                      </div>
                </div>
            </div>
                  </div>
              </div>
           </div>
        </div>
        </div>
        {
            getFindCouponsMessage !="" &&
            <div style={{ marginTop: "20px", background: "#fff", padding: "10px" }}>
                                <div
                                style={{marginBottom:"5px"}}
                                    >
                                    <p><strong style={{ color: "#5B5B5B" }}>Search</strong> results</p>
                                   
                                    {getFindCouponsMessage !="" && getFindCouponsMessage != "Successful" &&
                                       <p style={{color: "#5B5B5B" ,display:"block"}} > {getFindCouponsMessage}</p>
                                    }
                                </div>
                                {
                                    getFindCouponsData?.length > 0 && 
                                    <>   
                                    <div style={{
                                         maxHeight:"100%",
                                      
                                         transition:"max-height 0.3s ease"
         
                                    }}>
                                    <CustomPaginationDataTable data={ getFindCouponsData} columns={columnList} />
                                    </div>
                                    <div style={{
                                        display:"none",
                                        maxHeight:"100%",
                                      
                                        transition:"max-height 0.3s ease"
        
                                       }}>
                                        
                                       <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: '5px' }}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <label>
                                                    <select onChange={(e) => {
                                                        handlePageSelect(e);
                                                     //   handlePageSize(e);
                                                    }}
                                                     className=''
                                                        style={{ width: "65px", height: "30.8px", marginRight: "5px", textAlign: "center",border:"1px solid #ccc" }}
                                                    // value={itemPerPage}
                                                    >
        
                                                        <option value="5">5</option>
                                                        <option value={"10"}>10</option>
                                                        <option vlaue={"25"}>25</option>
                                                        <option value={filterData?.length}>All</option>
                                                    </select>
                                                    records per page
                                                </label>
                                            </div>
                                            <div style={{ marginRight: "15px" }} className='table-filter'>
                                                <label>Search:
                                                    <input type="search" name={searchTerm} value={searchTerm} onChange={(e) => {
                                                        handleSearch(e);
        
                                                    }} />
        
                                                </label>
        
                                            </div>
                                        </div>
                                        <table className='table table-bordered table-stripped table-hover'>
                                            <thead>
        
                                                <tr>
                                                  
                                                    <th onClick={() => {
                                                        handleSort("imagePath");
                                                       // sortHandler("email");
                                                    }
        
        
                                                    }>Image
                                                        {handleSortIcon("imagePath")}
        
                                                    </th>
        
                                                    <th onClick={() => {
                                                        handleSort("title");
                                                       // sortHandler("title");
                                                    }} >Title {handleSortIcon("title")}</th>
                                                    <th 
                                                        style={{width:"30%"}}
                                                      onClick={() => {
                                                        handleSort("details");
                                                       // sortHandler("details");
                                                    }
                                                    }>Details {handleSortIcon("details")}</th>
                                                    <th onClick={() => {
                                                        handleSort("validFromDate");
                                                      //  sortHandler("validFromDate");
                                                    }
        
                                                    }>Valid From {handleSortIcon("validFromDate")}</th>
                                                    <th onClick={() => {
                                                        handleSort("expiresOn");
                                                       // sortHandler("expiresOn");
                                                    }
                                                    }>Expires On{handleSortIcon("expiresOn")}</th>

                                                    <th onClick={() => {
                                                        //handleSort("firstName");
                                                       // sortHandler("firstName");
                                                    }
        
                                                    }>Redeems {handleSortIcon("redeems")}</th>
                                                    <th onClick={() => {
                                                        handleSort("clips");
                                                      //  sortHandler("clips");
                                                    }}>Clips {handleSortIcon("clips")}</th>
        
                                                  
                                                    <th>Actions</th>
        
                                                </tr>
                                            </thead>
                                            <tbody>
        
                                                {
                                                    getFindCouponsData?.length > 0 ? <>
        
                                                        {
                                                            // getFindShopperData?.map((each,i) => {
                                                            currentItems?.map((each, i) => {
                                                              
        
                                                                
        
                                                                return <tr key={i}>
                                                                    <td style={{textAlign:"center"}}>
                                                                        <img src={each?.imagePath}style={{width:"30px",height:"30px"}} />
                                                                    </td>
                                                                    <td>
                                                                        {each?.title}
                                                                    </td>
                                                                    <td>{each?.details}</td>
                                                                    <td>{convertToMMddyyyystringFormat(each?.validFromDate)}</td>
                                                                    <td>{convertToMMddyyyystringFormat(each?.expiresOn)}</td>
                                                                    <td>{each?.redeemCount}</td>

                                                                    <td>{each?.clipsCount}</td>
                                                                   
                                                                    {/* <td>{convertToMMddyyyystringFormat(each?.signUpDate?.slice(0, 10))}</td> */}
                                                                    
                                                                    <td style={{
                                                                        textAlign: "center"
                                                                    }}>
        
        
                                                                        <div className='btn-group'>
                                                                            <button className='btn btn-success  dropdown-toggle'
                                                                                data-toggle="dropdown"
                                                                                aria-expanded="true"
                                                                                style={{ display: 'flex', alignItems: "center", justifyContent: "center", margin: "auto center" }}
                                                                                onClick={() => handleDropdown(i)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faCog} />
        
        
                                                                            </button>
                                                                            {
                                                                                open === i &&
                                                                                <ul className='dropdown-menu' id="table-drop" role="menu" 
                                                                             //  style={{ display: (showModal === true || editModal === true) ? "" : "block", right: "0px", left: "auto", width: "160px" }}
                                                                                 style={{display:"block",right: "0px", left: "auto", width: "160px"}}
                                                                                >
                                                                                    <li>
                                                                                        <a href="#"
                                                                                            onClick={() => {
        
                                                                                               handleOpen(each)
                                                                                              
                                                                                            }}
                                                                                        >
                                                                                            View
                                                                                        </a>
                                                                                    </li>
                                                                                  
                                                                                    <li>
                                                                                        <a href="#"
                                                                                            onClick={
                                                                                                () => {
        
                                                                                            handleCouponOpen(each)
                                                                                                 
                                                                                                }
                                                                                            }
                                                                                        >
                                                                                            Copy From Coupon
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#"
                                                                                            onClick={
                                                                                                () => {
        
        
                                                                                                 
                                                                                                }
                                                                                            }
                                                                                        >
                                                                                            Remove From Coupon
                                                                                        </a>
                                                                                    </li>
                                                                                  
        
        
                                                                                </ul>
        
        
                                                                            }
                                                                            <>
        
                                                                            <>
                                                                    <ViewCouponModal show={showView} handleClose={handleClose} data={viewData} />
                                                                    <CreateBasketDealModal show={showCoupon} handleClose={handleCouponClose} data={couponData} />
                                                                    </> 
                                                                            </>
                                                                        </div>
                                                                    </td>
                                                                  
                                                                </tr>

                                                            })
                                                        }
        
        
                                                    </> : <>
                                                        <tr>
                                                            <td colSpan={6} style={{ textAlign: "center" }}>
                                                                Find shopper not found.
                                                            </td>
                                                        </tr>
                                                    </>
                                                }
        
        
                                            </tbody>
                                        </table>
                                       
        
        
                                        <div >
        

                                            <div>
                                               
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

                                    </>
                                 
                                }
                            </div>
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
                                        {
                                            (getFindCouponsLoading === true || getNewsCategoriesLoading === true) &&
                                            <LoaderModal show={true} />
                                        }
   </>
  )
}

export default FindCoupon