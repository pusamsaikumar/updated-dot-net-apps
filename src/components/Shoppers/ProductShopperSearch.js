import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI, GetProductDetailsUPCsAPI, GetShopperDetailsUPCsAPI } from '../redux/API';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import LoaderModal from '../Models/LoaderModal';
import { TabPane } from 'react-bootstrap';
import { GetAdvancedShopperSearchReducer } from '../redux/Reducer';
import Switch from 'react-switch';
import * as XLSX from "xlsx";
import UploadUPCFile from '../Models/UploadUPCFile';

const ProductShopperSearch = (
    {
        handleDropdown,open,clientName, setOpen ,isEnlarged 
    }
) => {

      const getProductCategoriesData = useSelector((state) => state.getProductCategoriesData);
      const getProductCategoriesMessage = useSelector(state => state.getProductCategoriesMessage);
      const getProductCategoriesLoading = useSelector(state => state.getProductCategoriesLoading);
      
      const getProductDetailsData = useSelector(state => state.getProductDetailsData);
      const getProductDetailsMessage = useSelector(state => state.getProductDetailsMessage);
      const getProductDetailsLoading = useSelector(state => state.getProductDetailsLoading);
      
      const getFindShopperByUPCsData = useSelector(state => state.getFindShopperByUPCsData);
      const getFindShopperByUPCsLoading = useSelector(state => state.getFindShopperByUPCsLoading);
      const getFindShopperByUPCsMessage =  useSelector(state => state.getFindShopperByUPCsMessage);

 
const [value,setValue] = useState(
  {
        productCode:"",
        productName:"",
        productCategoryId:"0",
        isMajorDepartment:true,
            UPC:"",
        NoOfCoupons:"0",
        FromDate:"",
        ToDate:"",
        selectAll:false


    }
);

// default Dates:
 useEffect(() => {
        const getPastCurrentDate = () => {
            const today = new Date();
            const dayOfWeek = today.getDay();

            // cal past day of week
            const pastDay = new Date(today);
            pastDay.setDate(today.getDate() - 7);

            // cal current date 
            const currentDate = new Date(today);
            currentDate.setDate(pastDay.getDate() + 7);

            return {
                fromDate: pastDay?.toISOString()?.split('T')[0],
                toDate: currentDate?.toISOString()?.split('T')[0]
            }
        }
        const { fromDate, toDate } = getPastCurrentDate();
        setValue({
            ...value,
            ["FromDate"]: fromDate,
            ["ToDate"]: toDate
        })


    }, []);
const handleToggle = (e,name) => {
  setValue((prev) => {
    return {
      ...prev,
      [name]:e

    }
  })
}

const handleInput = (e,name) => {
  setValue((prev) => {
    return {
      ...prev,
      [name]:e.target.value
    }
  })
};


       
          const dispatch = useDispatch();
      
          useEffect(() => {
            
              dispatch(GetProductCategoriesAPI())
             
          }, [dispatch]);

        const handleSearchUPC = (e) => {
          e.preventDefault();
          dispatch(GetProductDetailsUPCsAPI(value));
        }

        const handleUPClistSearch = (e) => {
          e.preventDefault();
          dispatch(GetShopperDetailsUPCsAPI(clientName,value))
        }


          // PAGINATION:
   
   
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
   
       
   
       const [toggleDrop, setToggleDrop] = useState(true);
       const handleToggleDropDown = () => {
           setToggleDrop(!toggleDrop)
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
       
       
           useEffect(() => {
               setFilterData(sortedData);
           }, [filterData]);
       
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


  
           const [filterdata,setFilterdata] = useState(getFindShopperByUPCsData || [])
   // pagination for UPCLIST START
   useEffect(() => {
    if (getFindShopperByUPCsMessage === "Successful") {
        let updatedata = getFindShopperByUPCsData;
        setFilterdata(updatedata);

    }
}, [getFindShopperByUPCsData, getFindShopperByUPCsMessage]);

 
           // Pagination:  const [filerData,setFilterData] = useState(getTopShoppersData || []);
           const [currentPages, setCurrentPages] = useState(1);
           const [itemsPerPages, setItemsPerPages] = useState(10);
           const indexOfLastItems = currentPages * itemsPerPages;
           const indexOfFirstItems = indexOfLastItems - itemsPerPages;
           const currentItemslist = Array.isArray(filterdata)
               ? filterdata.slice(indexOfFirstItems, indexOfLastItem)
               : [];
           let totalPages = Math.ceil(filterdata?.length / itemsPerPage);
       
           const handlePageChanges = (pageNumber) => {
               setCurrentPages(pageNumber);
           }
           let pageNumbersl = [];
           for (let i = 1; i <= totalPages; i++) {
               pageNumbersl.push(i);
           }
       
       
           let totalEntrie = getFindShopperByUPCsData?.length || 0;
       
           let filteredEntrie = filterdata?.length || 0;
       
           const displayMessages = searchTerm != ""
               ? `Showing ${indexOfFirstItems + 1} to ${indexOfLastItems <= filteredEntrie ? indexOfLastItems : filteredEntrie} of ${filteredEntrie} entries (filtered from ${totalEntrie} total entries)`
               : `Showing ${indexOfFirstItems + 1} to ${indexOfLastItems <= totalEntrie ? indexOfLastItems : totalEntrie} of ${totalEntrie} entries`;
       
           //   // Generate pagination buttons based on total pages
           //    totalPage = Math.ceil(filteredEntries / itemsPerPage);
       
           //   for (let i = 1; i <= totalPage; i++) {
           //       pageNumbers.push(i);
           //   }
       
           // sorting data result: for all filtere data:
           const sortData = Array.isArray(filterdata) ? filterdata.sort((a, b) => {
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
       
   // 
// check box start
    // check box functionality
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        const selectedAll = !selectAll;
        setSelectAll(selectedAll);
        setSelectedItem(selectedAll ? filterData.map((item) => item) : [])

    }
    const handleSelectedItems = (each) => {
        // setSelectedItem((prev) => {
        //  return   prev.some((item) => item.userDetailId === each?.userDetailId) 
        //  ? prev.filter((item) => item.userDetailId != each?.userDetailId) : 
        //  [...prev,each]
        // })

        setSelectedItem((prev) => {
            const alreadySelected = prev.some((item) => item.productId === each?.productId);
            return alreadySelected
                ? prev.filter((item) => item.productId !== each?.productId)
                : [...prev, each];
        });
    }

    const handleRemoveRow = (userDetailId) => {
        setSelectedItem((prev) => prev.filter((item) => item.productId !== userDetailId));
    };
    useEffect(() => {
        //setSelectAll(selectedItem.length === filterData.length &&  filterData.length > 0)


        if (selectedItem.length === 0) {
            setSelectAll(false);
        } else if (selectedItem.length === filterData.length) {
            setSelectAll(true);
        }

    }, [selectedItem, filterData]);
// check box end


// select productCodes
useEffect(()=>{
  const selectedUPCS = selectedItem?.length > 1 ? 
 selectedItem?.map((each) => each?.productCode).join(",") 
:  selectedItem?.length === 1 ? selectedItem[0]?.productCode :"";
setValue((prev) => {
  return {
    ...prev,
    ["UPC"]:selectedUPCS
  }
})
},[selectedItem]);
const [data, setData] = useState([]);

// Copy from file:
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

// file upload:
const [show,setShow] = useState(false);


const handleOpen = () => {
  setShow(true)
}
const handleclose =() => {
  setShow(false)
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  }
};




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
                      <div className='page-heading'>
                          <h1 className='' style={{ color: "#505458", fontSize: "24px",fontWeight:"400"}}>
                              <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                              <span>Find shopper (by UPCs Purchased)</span>
                          </h1>
                      </div>
                      <div className='row'>
                        <div className='col 12'>
                            <div className='widget'>
                              <div className='widget-content' style={{padding:"20px"}}>
                                 <div>
                                    <div className='row'>
                                    <div className='col-sm-6 col-md-4 col-lg-2' >
                                             <div className='form-group' style={{marginBottom:"15px"}}>
                                                <label>From Date</label>
                                                <input placeholder='From Date' className='' type='date' name="FromDate" style={{width:"100%"}}
                                                 value={value?.FromDate}
                                                 onChange={(e) => {
                                                   handleInput(e,"FromDate")
                                                 }}
                                                />
                                             </div>
                                            </div>
                                            <div className='col-sm-6 col-md-4 col-lg-2' >
                                             <div className='form-group' style={{marginBottom:"15px"}}>
                                                <label>To Date</label>
                                                <input placeholder='From Date' className='' type='date' name="ToDate" style={{width:"100%"}}
                                                 value={value?.ToDate}
                                                 onChange={(e) => {
                                                   handleInput(e,"ToDate")
                                                 }}
                                                />
                                             </div>
                                            </div>  
                                    </div>
                                 </div>
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col 12'>
                            <div className='widget'>
                              <div className='widget-content' style={{padding:"20px"}}>
                                 <div>
                                    <div className='row'>
                                    <div className='col-sm-12 col-md-4 col-lg-4' >
                                             <div className='' style={{marginBottom:"15px"}}>
                                                <label style={{fontSize:"13px",fontWeight:"600"}}>Selected Products</label>
                                                <div style={{marginTop:"0px",textAlign:"left",paddingBottom:"0px",marginLeft:"270px"}}>
                                                    <button type='button' className='btn btn-success'>Clear</button>
                                               

                                                </div>
                                                <div style={{marginTop:"-35px",paddingBottom:"0px",textAlign:"right"}}> 
                                              
                                                <button type='button' className='btn btn-success'
                                                 onClick={() => handleOpen()}
                                                >
                                                  Copy from file</button>
                                               
                                             </div>
                                             <span style={{fontSize:"13px",color:"#5B5B5B"}}>Note: Enter UPCs seperated by comma.</span>
                                             <div className='note' style={{paddingTop:"5px",height:"400px"}}>
                                             <div className='row'>
                                             <div className='col-sm-12' >
                                                <div className='form-group'>
                                                <textarea className='form-control'
                                                 name="UPC" 
                                                 style={{height:"370px",overflow:"hidden",borderColor:"#ddd",border:"1px solid #ddd",width:"100%"}} 
                                                 value={value?.UPC}
                                                 onChange={(e) => {
                                                  handleInput(e,"UPC")
                                                 }}
                                                
                                                ></textarea>
                                                </div>
                                               </div>
                                             </div>
                                            
                                             </div>
                                             <div className='row' style={{paddingTop:"10px"}}>
                                              <div className='col-sm-12'>
                                                <button type='button' className='btn btn-success' 
                                                
                                                 onClick={(e) => handleUPClistSearch(e)}
                                                >Search Shoppers</button>
                                              </div>
                                             </div>
                                             {
                                              getFindShopperByUPCsMessage !="" &&  getFindShopperByUPCsMessage !="Successful" && 
                                                    <div className='row' style={{paddingTop:"10px"}}>
                                                    <div className='col-sm-12'>
                                                     <span>No shoppers found</span>
                                                    </div>
                                                   </div>
                                             }
                                             </div>
                                            
                                            </div>
                                            <div className='col-sm-12 col-md-8 col-lg-8' >
                                             <div className='form-group' style={{marginBottom:"15px"}}>
                                                <label style={{fontSize:"11px",fontWeight:"600"}}>Search Add Products</label>
                                                <div className='note' style={{paddingTop:"10px"}}>
                                                 <div className='row'>
                                                  <div className='col-sm-12' style={{paddingRight:"0px"}}>
                                                     <div className='col-sm-4 ' style={{marginLeft:"0px"}}>
                                                      <div className='form-group'>
                                                      <label>Departments</label>
                                                      <select className='' style={{width:"233px"}}
                                                      id="productCategoryId"
                                                      name='productCategoryId'
                                                      value={value?.productCategoryId}
                                                      onChange={(e)=> {
                                                        handleInput(e,"productCategoryId");
                                                      }}  
                                                      >
                                                        <option value={"0"}>select Department</option>
                                                        {
                                                          getProductCategoriesData?.length > 0 &&
                                                          getProductCategoriesData?.map((each,i) => {
                                                            return <option key={each?.productCategoryId} value={each?.productCategoryId}>
                                                                {each?.productCategoryName}
                                                            </option>
                                                          })
                                                        }
                                                      </select>
                                                      </div>
                                                    </div>   
                                                    <div className='col-sm-4'style={{marginLeft:"-15px"}}>
                                                    <div className='form-group'>
                                                      <label>UPC</label>
                                                      <input name="productCode" className='form-control' placeholder='UPC' style={{width:"233px",display:"block"}}
                                                       value={value?.productCode}
                                                       onChange={(e)=>{
                                                          handleInput(e,"productCode")
                                                       }}
                                                      />
                                                      </div> 
                                                    </div>   
                                                    <div className='col-sm-4 'style={{marginLeft:"-15px"}}>
                                                    <div className='form-group'>
                                                      <label>Product Name</label>
                                                      <input name="productName" className='form-control' placeholder='Product Name' style={{width:"233px"}}
                                                      value={value?.productName}
                                                      onChange={(e)=>{
                                                         handleInput(e,"productName")
                                                      }}
                                                      />
                                                      </div> 
                                                    </div>   
                                                    <div className='col-sm-1 'style={{marginLeft:"-60px",paddingLeft:"40px"}}>
                                                      <label>&nbsp;</label>
                                                      <button className='btn btn-success' style={{paddingRight:"20px"}}
                                                       onClick={(e) =>{
                                                        handleSearchUPC(e)
                                                       } }
                                                      >
                                                        <FontAwesomeIcon  icon={faSearch} />
                                                      </button>
                                                    </div>   
                                                  </div>
                                                 </div>

                                                 {
                                                getProductDetailsMessage !="" &&
                                                <>
                                                  <div className='row' style={{marginTop:"15px"}}>
                                                   <div className='col-sm-1'>
                                                    <Switch
                                                     name="selectAll"
                                                     checked={value?.selectAll}
                                                     onChange={(e) => {
                                                      handleToggle(e,"selectAll")
                                                     }}
                                                    />
                                                  </div>  
                                                  <div className='col-sm-5'>
                                                   <span>Select All</span>
                                                  </div>                 
                                                </div>
                                                <div>
                                                   {
                                                    getProductDetailsData?.length > 0 ? 
                                                    <>
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
                                                    </>
                                                    :
                                                    <>
                                                      <span>No products found</span>
                                                    </>
                                                   }   
                                                </div>
                                                </>
                                               }
                                                </div>
                                             </div>
                                              
                                            </div>  

                                      <div className='col-sm-12'>
                                     {
                                      currentItemslist?.length > 0 &&

                                      <div>
                                      <>
                                                                                                                                       <table className='table table-bordered table-stripped table-hover' cellSpacing={"0"}>
                                                                                                                                           <thead>
                                                                                                                                               <tr>
                                                       
                                                                                                                                                   <th onClick={() => {
                                                                                                                                                       handleSort("firstname");
                                                                                                                                                       sortHandler("firstname");
                                                                                                                                                   }
                                                       
                                                       
                                                                                                                                                   }>First Name
                                                                                                                                                       {handleSortIcon("firstname")}
                                                       
                                                                                                                                                   </th>
                                                       
                                                                                                                                                   <th onClick={() => {
                                                                                                                                                       handleSort("lastname");
                                                                                                                                                       sortHandler("lastname");
                                                                                                                                                   }
                                                       
                                                       
                                                                                                                                                   }>Last Name
                                                                                                                                                       {handleSortIcon("lastname")}
                                                       
                                                                                                                                                   </th>
                                                       
                                                       
                                                                                                                                                   <th onClick={() => {
                                                                                                                                                       handleSort("username");
                                                                                                                                                       sortHandler("username");
                                                                                                                                                   }
                                                       
                                                       
                                                                                                                                                   }>Email        
                                                                                                                                                       {handleSortIcon("username")}
                                                       
                                                                                                                                                   </th>
                                  
                                                                                                                                             
                                                                                                                                    
                                                       
                                                                                                                                                   <th onClick={() => {
                                                                                                                                                       handleSort("preferredstore");
                                                                                                                                                       sortHandler("preferredstore");
                                                                                                                                                   }
                                                       
                                                       
                                                                                                                                                   }>Preferred Store
                                                                                                                                                       {handleSortIcon("preferredstore")}
                                                       
                                                                                                                                                   </th>
                                                                                                                                                   {/* <th onClick={() => {
                                                                                                                                                       handleSort("transactionamount");
                                                                                                                                                       sortHandler("transactionamount");
                                                                                                                                                   }
                                                       
                                                       
                                                                                                                                                   }>Amount
                                                                                                                                                       {handleSortIcon("transactionamount")}
                                                       
                                                                                                                                                   </th> */}
                                                       
                                                       
                                                                                                                                                   <th></th>
                                                                                                                                               </tr>
                                                                                                                                           </thead>
                                                                                                                                           <tbody>
                                                                                                                                               {
                                                                                                                                                   //getTopShoppersData?.map((each,i) => {
                                                                                                                                                  currentItemslist?.map((each, i) => {
                                                                                                                                                       return <tr key={i}>
                                                                                                                                                           <td>{each?.firstname}</td>
                                                                                                                                                           <td>{each?.lastname}</td>
                                                                                                                                                           <td>{each?.username}</td>
                                                                                                                                                         
                                                                                                                                                           <td>{each?.preferredstore}</td>
                                                                                                                                                           {/* <td>${each?.transactionamount}</td> */}
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
                                                                                                                                                                           style={{
                                                                                                                                                                               //display: (showModal === true || editModal === true) ? "" : "block", 
                                                                                                                                                                               display: "block",
                                                                                                                                                                               right: "0px", left: "auto", width: "160px"
                                                                                                                                                                           }}>
                                                                                                                                                                           <li>
                                                                                                                                                                               <a href="#"
                                                                                                                                                                                   onClick={() => {
                                                       
                                                       
                                                                                                                                                                                       //  handleOpen(each);
                                                                                                                                                                                   }}
                                                                                                                                                                               >
                                                                                                                                                                                   View
                                                                                                                                                                               </a>
                                                                                                                                                                           </li>
                                                                                                                                                                           <li>
                                                                                                                                                                               <a href="#"
                                                                                                                                                                                   onClick={
                                                                                                                                                                                       () => {
                                                       
                                                       
                                                                                                                                                                                           // editModalOpen(each);
                                                                                                                                                                                       }
                                                                                                                                                                                   }
                                                                                                                                                                               >
                                                                                                                                                                                   Edit
                                                                                                                                                                               </a>
                                                                                                                                                                           </li>
                                                                                                                                                                           <li
                                                                                                                                                                               onClick={() => setOpen(null)}
                                                                                                                                                                           >
                                                                                                                                                                               <Link to={`/shoppers/shoppertransaction?userId=${each?.userDetailid}`}
                                                                                                                                                                                   state={{
                                                                                                                                                                                       userDetailId: each?.
                                                                                                                                                                                       userDetailid,
                                                                                                                                                                                       retailerName: clientName,
                                                                                                                                                                                       shopperData: each
                                                                                                                                                                                   }}
                                                       
                                                                                                                                                                               >
                                                                                                                                                                                   <a
                                                                                                                                                                                       onClick={() => {
                                                                                                                                                                                           // setOpen(null);
                                                                                                                                                                                           dispatch(userHistoryAPI(each?.
                                                                                                                                                                                              userDetailid, clientName));
                                                                                                                                                                                           dispatch(GetUserClipsAndRedemptionsDatesAPI(each?.
                                                                                                                                                                                              userDetailid));
                                                                                                                                                                                           dispatch(getUserRewardCouponsAPI(each?.
                                                                                                                                                                                              userDetailid));
                                                                                                                                                                                           dispatch(getUserBasketTransactionAPI(each?.
                                                                                                                                                                                              userDetailid, clientName))
                                                                                                                                                                                       }}
                                                                                                                                                                                   >Transactions</a>
                                                                                                                                                                               </Link>
                                                                                                                                                                               {/* <a href="/shoppers/shoppertransaction"
                                                                                                                                    onClick={() => handleTransactions(each)}
                                                                                                                                    >
                                                                                                                                        Transactions
                                                                                                                                    </a> */}
                                                                                                                                                                           </li>
                                                       
                                                       
                                                       
                                                                                                                                                                       </ul>
                                                       
                                                       
                                                                                                                                                                   }
                                                       
                                                                                                                                                               </div>
                                                                                                                                                           </td>
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
                                                                                                                                               <p>{displayMessages}</p>
                                                                                                                                           </div>
                                                       
                                                                                                                                           <div className='pagination'
                                                                                                                                               style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                                                       
                                                                                                                                           >
                                                                                                                                               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='btnPrev'>
                                                                                                                                                   <FontAwesomeIcon icon={faAngleLeft} />
                                                                                                                                               </button>
                                                       
                                                                                                                                               {pageNumbersl.length > 10 ? (
                                                                                                                                                   <>
                                                                                                                                                       {currentPage > 3 && <button className="inActivePage" onClick={() => handlePageChanges(1)}>1</button>}
                                                                                                                                                       {currentPage > 4 && <span className="inActivePage">...</span>}
                                                                                                                                                       {pageNumbersl.slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, pageNumbersl.length)).map((number) => (
                                                                                                                                                           <button key={number} onClick={() => handlePageChanges(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                                                                                                                               {number}
                                                                                                                                                           </button>
                                                                                                                                                       ))}
                                                                                                                                                       {currentPage < pageNumbersl.length - 3 && <span className='inActivePage'>...</span>}
                                                                                                                                                       {currentPage < pageNumbersl.length - 2 && <button className="inActivePage" onClick={() => handlePageChanges(pageNumbersl.length)}>{pageNumbersl.length}</button>}
                                                                                                                                                   </>
                                                                                                                                               ) : (
                                                                                                                                                   pageNumbersl.map((number) => (
                                                                                                                                                       <button key={number} onClick={() => handlePageChanges(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
                                                                                                                                                           {number}
                                                                                                                                                       </button>
                                                                                                                                                   ))
                                                                                                                                               )}
                                                       
                                                                                                                                               <button onClick={() => handlePageChanges(currentPage + 1)} disabled={currentPage === totalPage} className='btnNext'>
                                                                                                                                                   <FontAwesomeIcon icon={faAngleRight} />
                                                                                                                                               </button>
                                                                                                                                           </div>
                                                       
                                                                                                                                       </div>
                                                                                                                                   </>
                                  </div>
                                     }
                                    
                                      </div>      
                                         
                                    </div>
                                  
                                 </div>
                              </div>
                            </div>
                        </div>
                      </div>

                    
                     
                     
                  </div>
  
              </div>

             
              <>
                {
                    getProductDetailsLoading === true &&
                    <LoaderModal show={true} />
                }
                <UploadUPCFile show={show} handleclose={handleclose} data={data} setData= {setData} />
            </>
            
  
  </>
  )
}

export default ProductShopperSearch