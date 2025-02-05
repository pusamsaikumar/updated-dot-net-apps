import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI, GetAllshoppersGroupsAPI, GetAdvancedShopperSearchAPI } from '../redux/API';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import LoaderModal from '../Models/LoaderModal';
import { TabPane } from 'react-bootstrap';
import { GetAdvancedShopperSearchReducer } from '../redux/Reducer';

const AdvancedSearchShopper = (
    {
        handleDropdown, open, clientName, setOpen, isEnlarged
    }
) => {


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

    const getShoppersAdvancedSearchData = useSelector(state => state.getShoppersAdvancedSearchData);
    const getShoppersAdvancedSearchLoading =  useSelector(state => state.getShoppersAdvancedSearchLoading);
    const getShoppersAdvancedSearchMessage =  useSelector(state => state.getShoppersAdvancedSearchMessage);

   console.log("get advance",getShoppersAdvancedSearchData)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClientStoresAPI())
        dispatch(GetProductCategoriesAPI())
        dispatch(GetAllshoppersGroupsAPI("Veritra RSA", 0, 0))
    }, [dispatch]);


    // selected storeNames
    const [selectedStore,setSelectedStore] = useState(["All"]);
    const [dropDownstore,setDropDownstore] = useState(false);

    // handleselect items
    const handleSelect = (item) => {
        if(item === "All"){
           setSelectedStore(["All"])
           
        }else{
            const updateItem = selectedStore?.includes(item)
            ? selectedStore?.filter((i) => i !== item)
            :[...selectedStore?.filter((i) => i !== "All"),item]
            setSelectedStore(updateItem)
        }
    }

    // remove items
    const removeSelectedStores = (item) => {
        if(item === "All") {
            return setSelectedStore([]);
        }else{
            const updateItem = selectedStore?.filter((i) => i !== item);
            setSelectedStore(updateItem?.length > 0 ? updateItem : ["All"])
        }
       
    }


    // for Groups:
    
    // selected storeNames
    const [selectedGroups,setSelectedGroups] = useState(["All"]);
    const [dropDownGroups,setDropDownGroups] = useState(false);

    // handleselect items
    const handleSelectGroups = (item) => {
        if(item === "All"){
           setSelectedGroups(["All"])
           
        }else{
            const updateItem = selectedGroups?.includes(item)
            ? selectedGroups?.filter((i) => i !== item)
            :[...selectedGroups?.filter((i) => i !== "All"),item]
            setSelectedGroups(updateItem)
        }
    }

    // remove items
    const removeSelectedGroups = (item) => {
        if(item === "All") {
            return setSelectedGroups([]);
           
        }else{
            const updateItem = selectedGroups?.filter((i) => i !== item);
            setSelectedGroups(updateItem?.length > 0 ? updateItem : ["All"])
        }
       
    }



    
    // values 
    const [value, setValue] = useState({
        memberNumber: "0",
        transactionFrom: "",
        transactionTo: "",
        minSpend: 1,
        maxSpend: 100,
        clubId: "0",
        groupName:"",
        minBasketCount: 1,
        maxBasketCount: 100,
        storeId: "0",
        storeName:"",

        minReedemCount: 0,
        maxRedeemCount: 100,
        departmentId:"0",
        departmentName:"",
        isCreatedGroup: false


    });
    console.log("val",value)
    const [selectedStoreId,setSelectedStoreId] = useState("0");
    const [selectedStoreName,setSelectedStoreName] = useState("empty");
    const [selectedGroupId,setSelectedGroupId] = useState("0");
    const [selectedGroupName,setSelectedGroupName] = useState("empty");

    const [selectedDeptId,setSelectedDeptId] = useState("0");
    const [selectedDeptName,setSelectedDeptName] = useState("empty");
    useEffect(() => {
        if(getClientStoresData?.length > 0 ){
            setSelectedStoreId("0");
            setSelectedStoreName("All");
        }
        if(getAllShopperGroupsData?.length > 0) {
            setSelectedGroupId("0");
            setSelectedGroupName("All");
        }
        if(getProductCategoriesData){
            setSelectedDeptId("0");
            setSelectedDeptName("All");
        }
    },[getClientStoresData,getAllShopperGroupsData,getProductCategoriesData])


    // departments:
      // selected storeNames
      const [selectedDeptsList,setSelectedDeptsList] = useState(["All"]);
      const [dropDownDepts,setDropDownDepts] = useState(false);
  
      // handleselect items
      const handleSelectDepts = (item) => {
          if(item === "All"){
            setSelectedDeptsList(["All"])
             
          }else{
              const updateItem = selectedDeptsList?.includes(item)
              ? selectedDeptsList?.filter((i) => i !== item)
              :[...selectedDeptsList?.filter((i) => i !== "All"),item]
              setSelectedDeptsList(updateItem)
          }
      }
  
      // remove items
      const removeSelectedDepts = (item) => {
          if(item === "All") {
              return setSelectedDeptsList([]);
          }else{
              const updateItem = selectedDeptsList?.filter((i) => i !== item);
              setSelectedDeptsList(updateItem?.length > 0 ? updateItem : ["All"])
          }
         
      }
 

      // get product details :
      const getDeptDetails = (selectedDeptsList,getProductCategoriesData) => {
  
        let storeIds = [];
        let storeNames = [];
       
    
        
        const res = selectedDeptsList?.length > 0 &&  
        selectedDeptsList?.map((productName) => {
            if(productName === "All"){
                storeIds?.push("0");
                storeNames?.push("All")
                return {id:"0",name:"All"}
            }
            const store = getProductCategoriesData?.length > 0 && getProductCategoriesData?.find((item) => item.productCategoryName === productName);
            if(store){
                storeIds?.push(store?.productCategoryId
                );
                storeNames?.push(store?.productCategoryName
                );
               
                return {id:store.productCategoryId
                    ,name:store?.productCategoryName
                }
            }
            return null;
          } ).filter(item => item !== null)
          const storeIdstring = storeIds?.join(",");
          const storeNamestring = storeNames?.join(",");
    
          
       
          return {
            id: storeIdstring,name:storeNamestring
          }
       
      }
    
      useEffect(() => {
        const {id,name} = getDeptDetails(selectedDeptsList,getProductCategoriesData);
        setValue((prev) => {
            return {
                ...prev,
                ["departmentId"]:id,
                ["departmentName"]:name
                
            }
        })

      },[selectedDeptsList,getProductCategoriesData])


  // const selected storeDetaisl:

  const getStoreDetails = (selectedStore,getClientStoresData) => {
  
    let storeIds = [];
    let storeNames = [];
   

    
    const res = selectedStore?.length > 0 &&  
      selectedStore?.map((storeName) => {
        if(storeName === "All"){
            storeIds?.push("0");
            storeNames?.push("All")
            return {id:"0",name:"All"}
        }
        const store = getClientStoresData?.length > 0 && getClientStoresData?.find((item) => item.storeName === storeName);
        if(store){
            storeIds?.push(store?.clientStoreId);
            storeNames?.push(store?.storeName);
           
            return {id:store.clientStoreId,name:store?.storeName}
        }
        return null;
      } ).filter(item => item !== null)
      const storeIdstring = storeIds?.join(",");
      const storeNamestring = storeNames?.join(",");

      
   
      return {
        id: storeIdstring,name:storeNamestring
      }
   
  }

 
useEffect(() => {
  const {id,name} =  getStoreDetails(selectedStore,getClientStoresData);
  setValue((prev) => {
    return {
        ...prev,
        ["storeId"]:id,
        ["storeName"]:name
    }
  })

},[selectedStore,getClientStoresData]);

 // selected group details :
 const getGroupDetails = (selectedGroups,getAllShopperGroupsData) => {
  
    let storeIds = [];
    let storeNames = [];
   

    
    const res = selectedGroups?.length > 0 &&  
    selectedGroups?.map((storeName) => {
        if(storeName === "All"){
            storeIds?.push("0");
            storeNames?.push("All")
            return {id:"0",name:"All"}
        }
        const store = getAllShopperGroupsData?.length > 0 && getAllShopperGroupsData?.find((item) => item.groupName === storeName);
        if(store){
            storeIds?.push(store?.groupID);
            storeNames?.push(store?.groupName);
           
            return {id:store.groupID,name:store?.groupNameName}
        }
        return null;
      } ).filter(item => item !== null)
      const storeIdstring = storeIds?.join(",");
      const storeNamestring = storeNames?.join(",");

      
   
      return {
        id: storeIdstring,name:storeNamestring
      }
   
  }


useEffect(() => {
const {id,name} = getGroupDetails(selectedGroups,getAllShopperGroupsData);
setValue((prev) => {
   return {
       ...prev,
       ["clubId"]:id,
       ["groupName"]:name
   }
}
)
},[selectedGroups,getAllShopperGroupsData])


    const handleInupt = (e, name) => {
        // setValue({
        //     ...value,
        //     [name]:e.target.value
        // })
        setValue((prev) => {
            return {
                ...prev,
                [name]: e.target.value
            }
        })
    }
    const [editableOpen, setEditableOpen] = useState(null);
    const handleEditable = (name) => {
        setEditableOpen(name);
    }
    const handleEditableClose = (e) => {
        e.preventDefault();
        setEditableOpen(null)
    }

    const handleCancel = () => {
        setValue({
            memberNumber: "0",
            transactionFrom: "",
            transactionTo: "",
            minSpend: 1,
            maxSpend: 100,
            clubId: "0",
            minBasketCount: 0,
            maxBasketCount: 0,
            storeId: "0",
            storeName:"",
    
            minReedemCount: "",
            maxRedeemCount: "0",
            isCreatedGroup: false
    
    
        });
        setEditableOpen(null);
        //handleEditableClose(e)
    }
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
            ["transactionFrom"]: fromDate,
            ["transactionTo"]: toDate
        })


    }, []);


    // handleSUBMIT SEARCH:
    const handleSumbitSearch = (e) => {
        e.preventDefault();
        dispatch(GetAdvancedShopperSearchAPI(value));
    }


    // TOAST NOTIFICATION:
      
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
            }, [successMsg])

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


        const [createShopperModal, setCreateShopperModal] = useState(false);
            const handleCreateShopperOpen = () => {
                if (getShoppersAdvancedSearchData?.length !== 0) {
                    setCreateShopperModal(true);
                    setShowNotificationError(false);
                } else {
                    setShowNotificationError(true);
                    setErrorMsg("Please select atleast one shopper.");
        
                }
        
            };
        
            const handleCreateShopperClose = () => {
                setCreateShopperModal(false);
            };
            // sorting ,filter,searching 
            const [searchTerm, setSearchTerm] = useState("");
            const [filterData, setFilterData] = useState(getShoppersAdvancedSearchData || []);
        
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
                    setFilterData(getShoppersAdvancedSearchData);
                    return;
                }
        
                const filter = getShoppersAdvancedSearchData?.filter(item => {
                    return Object.values(item).some((val) => {
        
                        const valueToSearch = val != null ? val.toString().toLowerCase() : '';
                        return valueToSearch.includes(searchTermValue.toLowerCase());
                    });
                });
                setFilterData(filter);
            }
        
        
        
            useEffect(() => {
                if (getShoppersAdvancedSearchMessage === "Successful") {
                    let updatedata = getShoppersAdvancedSearchData;
                    setFilterData(updatedata);
        
                }
            }, [getShoppersAdvancedSearchData, getShoppersAdvancedSearchMessage]);
        
        
        
            // Pagination:  const [filerData,setFilterData] = useState(getTopShoppersData || []);
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
        
        
            let totalEntries = getShoppersAdvancedSearchData?.length || 0;
        
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
                            <span>Advanced Shopper Search</span>
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
                                                        <a href='#' >Avg Spend</a>
                                                    </td>
                                                    <td width={"40%"} style={{ textAlign: "left" }}>
                                                        <label style={{ fontWeight: "600" }}>
                                                            {"Between $"}
                                                            <a href='#' id="minSpend" className='editable editable-click'
                                                                onClick={() => handleEditable("minSpend")}
                                                                style={{ display: editableOpen === "minSpend" && "none" }}
                                                            >
                                                                {
                                                                    value?.minSpend
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "minSpend" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        // id="minSpend"
                                                                                        name="minSpend"
                                                                                        value={value?.minSpend}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => {
                                                                                            setValue({
                                                                                                ...value,
                                                                                                ["minSpend"]: e.target.value

                                                                                            });
                                                                                            //handleInupt(e,"minSpend")
                                                                                        }

                                                                                        }
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) =>
                                                                                            setEditableOpen(null)
                                                                                            //handleEditableClose(e)
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                            {" and $"}

                                                            <a id="maxSpend" className='editable editable-click'
                                                                onClick={() => handleEditable("maxSpend")}
                                                                style={{ display: editableOpen === "maxSpend" && "none" }}
                                                            >
                                                                {
                                                                    value?.maxSpend
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "maxSpend" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        id="maxSpend"
                                                                                        name="maxSpend"
                                                                                        value={value?.maxSpend}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => handleInupt(e, "maxSpend")}
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) => {
                                                                                            setEditableOpen(null);
                                                                                            // handleEditableClose(e)}
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td width={"20%"}>
                                                        <a href='#' >Transaction Dates</a>
                                                    </td>
                                                    <td width={"40%"} style={{ textAlign: "left" }}>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ paddingLeft: "0px", paddingRight: "15px" }}>
                                                                        <label style={{ fontWeight: "600" }}>Between</label>
                                                                    </td>
                                                                    <td style={{ paddingLeft: "0px", paddingRight: "15px" }}>
                                                                        <input type='date' id="transactionFrom" name="transactionFrom" value={value?.transactionFrom} className='form-control' placeholder='From Date'
                                                                            onChange={(e) => handleInupt(e, "transactionFrom")}
                                                                            style={{ width: "150px" }}
                                                                        />
                                                                    </td>
                                                                    <td style={{ paddingLeft: "0px", paddingRight: "15px" }}>
                                                                        <label style={{ fontWeight: "600" }}>and</label>
                                                                    </td>
                                                                    <td style={{ paddingLeft: "0px", paddingRight: "15px" }}>
                                                                        <input type='date' id="transactionTo" name="transactionTo" value={value?.transactionTo} className='form-control' placeholder='To Date'
                                                                            onChange={(e) => handleInupt(e, "transactionTo")}
                                                                            style={{ width: "150px" }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td width={"20%"}>
                                                        <a href='#' >Stores</a>
                                                    </td>
                                                    <td width={"40%"} style={{ textAlign: "left" }}>
                                                        <label style={{ fontWeight: "600" }}>

                                                            <a href='#' id="storeId" className='editable editable-click'
                                                                onClick={() => handleEditable("storeId")}
                                                                style={{ display: editableOpen === "storeId" && "none" }}
                                                            >
                                                                {
                                                                   (value?.storeName ==="" || selectedStore.length ===0) ? "empty" :value?.storeName
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "storeId" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>

                                                                                    <div >
                                                                                    <select
        id="storeId"
        name="storeId"
        className="form-control"
        style={{ display: "none" }}
        multiple
        value={selectedStore}
        onChange={(e) => {
            //handleInupt(e,"storeId")
        //    console.log("op",e.target.value)

        } }
      >
        <option key="All" value="All">
          All
        </option>
        {  getClientStoresData?.length > 0 &&  getClientStoresData.map((option) => (
          <option key={option.clientStoreId} 
        //  value={option.storeName}
          value={option.clientStoreId} 
        
          >
            {option.storeName}
          </option>
        ))}
      </select>

      {/* Dropdown */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          minWidth: "200px",
          padding: "5px",
          position: "relative",
          minHeight:"35px"
        }}
        onClick={() => setDropDownstore(!dropDownstore)}
      >
        {/* Selected Items */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {  selectedStore?.length > 0 && 
          selectedStore?.map((item, index) => (
            <span
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                display: "inline-block",
                background: "#f0f0f0",
                borderRadius: "4px",
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  cursor:  "pointer" ,
                  marginRight: "5px",
                }}
                onClick={(e) => {
                  //e.stopPropagation();
                  removeSelectedStores(item);
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Options */}
      {dropDownstore && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "5px 0",
            border: "1px solid #ccc",
            background: "#fff",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
          }}
        >
         {

            !selectedStore?.includes("All") &&
             <li
             key="All"
             value={"0"}
             style={{
               padding: "5px 10px",
               cursor: "pointer",
               background: selectedStore?.includes("All") ? "#e6f7ff" : "#fff",
               display:selectedStore?.includes("All") ? "none" : "block",
             }}
             onClick={() => handleSelect("All")}
           >
             All
           </li>
         }
          {getClientStoresData?.length > 0 && 
          
          
          getClientStoresData?.map((option) => (
            <li
           //  value={option.storeName}
          value={option.clientStoreId} 
              key={option.clientStoreId}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                background: selectedStore?.includes(option.storeName) ? "#e6f7ff" : "#fff",
                display:selectedStore?.includes(option?.storeName) ? "none":"block" 
              }}
              onClick={() => {
                        handleSelect(option?.storeName);
                     //   handleSelectStoreIds(option?.clientStoreId)
            }
              } 
            >
              {option.storeName}
            </li>
          ))}
        </ul>
      )}

                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) =>
                                                                                           {
                                                                                            handleCancel();
                                                                                           }
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>

                                                        </label>
                                                    </td>
                                                </tr>
                                                
                                                 {/* groups */}
                                              
                                                <tr>
                                                    <td width={"20%"}>
                                                    <a href='#' >Groups</a>
                                                    </td>
                                                    <td width={"40%"} style={{textAlign:"left"}}>
                                                        <label style={{fontWeight:"600"}}>
                                                        <a href='#' id={"clubId"} className='editable editable-click'
                                                         onClick={() => {
                                                            handleEditable("clubId")
                                                         }}
                                                         style={{display:editableOpen === "clubId" && "none"}}
                                                        >
                                                        {
                                                                   (value?.groupName ==="" || selectedGroups.length ===0) ? "empty" :value?.groupName
                                                                }    
                                                        </a>      
                                                        <span className='editable-container editable-inline' style={{display: editableOpen === "clubId" ? "inline-block" :"none"}}>
                                                            <div>
                                                                <div style={{display:"none"}}></div>
                                                                <form className='form-inline editableform'>
                                                                     <div className='form-group control-group'>
                                                                        <div>
                                                                            <div className='editable-input' style={{position:"relative"}}>
                                                                                <div>
                                                                                    <select
                                                                                     id="clubId"
                                                                                     name="clubId"
                                                                                     style={{display:"none"}} 
                                                                                     multiple
                                                                                     value={selectedGroups}
                                                                                     onChange={(e) => {

                                                                                     }}
                                                                                     >
                                                                                        <option key="All" value={"All"}>All</option>
                                                                                        {
                                                                                            getAllShopperGroupsData?.length > 0 && 
                                                                                            getAllShopperGroupsData?.map((option,i) => {
                                                                                                return <option key={value?.groupID} value={option?.groupName}>{option?.groupName}</option>
                                                                                            })
                                                                                        }

                                                                                    </select>
                                                                                    {/* Dropdown */}
                                                                                    <div
                                                                                     style={{
                                                                                        background:"#fff",
                                                                                        border:"1px solid #ccc",
                                                                                        minWidth:"200px",
                                                                                        padding:"5px",
                                                                                        position:'relative',
                                                                                        minHeight:"34px"
                                                                                     }}

                                                                                     onClick={() => setDropDownGroups(!dropDownGroups)}
                                                                                    >
                                                                                        {/* display selected items over  */}
                                                                                        <div
                                                                                            style={{display:"flex",flexWrap:"wrap", gap:"5px"}}
                                                                                        >
                                                                                          {
                                                                                            selectedGroups?.length > 0 &&
                                                                                            selectedGroups?.map((item,index) => {
                                                                                                return  <span
                                                                                                    key={index}
                                                                                                    style={{
                                                                                                       border:"1px solid #ccc",
                                                                                                       padding:"3px",
                                                                                                       display:"inline-block",
                                                                                                       background:"#f0f0f0",
                                                                                                       borderRadius:"2px"
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon 
                                                                                                     icon={faTimes}
                                                                                                     style={{
                                                                                                        cursor:"pointer",
                                                                                                        marginRight:"5px",
                                                                                                        

                                                                                                     }}
                                                                                                     onClick={(e) => {
                                                                                                        //e.stopPropagation();
                                                                                                        removeSelectedGroups(item);                   

                                                                                                     }}
                                                                                                    />

                                                                                                   {item}
                                                                                                </span>
                                                                                            })
                                                                                          }
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* Groups options */}
                                                                                    {
                                                                                        dropDownGroups && 
                                                                                        (
                                                                                            <ul 
                                                                                             style={{
                                                                                                listStyle:"none",
                                                                                                margin:0,
                                                                                                border:"1px solid #ccc",
                                                                                                background:"#fff",
                                                                                                padding:"5px 0px",
                                                                                                width:"100%",
                                                                                                zIndex:1000,
                                                                                                position:"absolute",
                                                                                                maxHeight:"200px",
                                                                                                overflow:"auto"

                                                                                             }}
                                                                                            > 
                                                                                            {
                                                                                                !selectedGroups?.includes("All") &&
                                                                                                <li key={"All"}
                                                                                                    value={"0"}
                                                                                                    style={{
                                                                                                        padding:"5px 10px",
                                                                                                        cursor:"pointer",
                                                                                                        background:selectedGroups?.includes("All") ? "#e6f7ff" : "#fff",
                                                                                                        display:selectedGroups?.includes("All") ? "none" :"block"
                                                                                                    }}
                                                                                                    onClick={() => {
                                                                                                        handleSelectGroups("All")
                                                                                                    }}
                                                                                                >
                                                                                                All 
                                                                                         </li>
                                                                                            }
                                                                                              
                                                                                             {
                                                                                                getAllShopperGroupsData?.length > 0 &&
                                                                                                getAllShopperGroupsData?.map((option) => {
                                                                                                 return   <li key={option?.groupID}
                                                                                                    value={option?.groupName}
                                                                                                   
                                                                                                    style={{
                                                                                                        padding:"5px 10px",
                                                                                                        cursor:"pointer",
                                                                                                        background:selectedGroups?.includes(option?.groupName) ? "#e6f7ff" : "#fff",
                                                                                                        display:selectedGroups?.includes(option?.groupName) ? "none" :"block"
                                                                                                    }}
                                                                                                    onClick={() => {
                                                                                                        handleSelectGroups(option?.groupName)
                                                                                                    }}
                                                                                                >
                                                                                               {
                                                                                                option?.groupName
                                                                                               }
                                                                                         </li>
                                                                                                })
                                                                                             }
                                                                                            </ul>
                                                                                        )
                                                                                    
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className='editable-buttons'>
                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                        onClick={(e) => handleEditableClose(e)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='btn btn-sm btncancel editable-cancel'
                                        onClick={(e) => {
                                            handleCancel();
                                        }
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                                                                        </div>
                                                                        <div style={{display:"none"}}></div>
                                                                    </div>   
                                                                </form>
                                                            </div>
                                                        </span>                          

                                                        </label>
                                                    </td>
                                                </tr>
                                                {/* Deparments */}
                                                <tr>
                                                    <td width={"20%"}>
                                                    <a href='#' >Departments</a>
                                                    </td>
                                                    <td width={"40%"} style={{textAlign:"left"}}>
                                                        <label style={{fontWeight:"600"}}>
                                                        <a href='#' id={"departmentId"} className='editable editable-click'
                                                         onClick={() => {
                                                            handleEditable("departmentId")
                                                         }}
                                                         style={{display:editableOpen === "departmentId" && "none"}}
                                                        >
                                                        {
                                                                   (value?.departmentName ==="" || selectedDeptsList.length ===0) ? "empty" :value?.departmentName
                                                                }    
                                                        </a>      
                                                        <span className='editable-container editable-inline' style={{display: editableOpen === "departmentId" ? "inline-block" :"none"}}>
                                                            <div>
                                                                <div style={{display:"none"}}></div>
                                                                <form className='form-inline editableform'>
                                                                     <div className='form-group control-group'>
                                                                        <div>
                                                                            <div className='editable-input' style={{position:"relative"}}>
                                                                                <div>
                                                                                    <select
                                                                                     id="departmentId"
                                                                                     name="departmentId"
                                                                                     style={{display:"none"}} 
                                                                                     multiple
                                                                                     value={selectedDeptsList}
                                                                                     onChange={(e) => {

                                                                                     }}
                                                                                     >
                                                                                        <option key="All" value={"All"}>All</option>
                                                                                        {
                                                                                            getProductCategoriesData?.length > 0 && 
                                                                                            getProductCategoriesData?.map((option,i) => {
                                                                                                return <option key={value?.productCategoryId} value={option?.productCategoryName}>{option?.productCategoryName}</option>
                                                                                            })
                                                                                        }

                                                                                    </select>
                                                                                    {/* Dropdown */}
                                                                                    <div
                                                                                     style={{
                                                                                        background:"#fff",
                                                                                        border:"1px solid #ccc",
                                                                                        minWidth:"200px",
                                                                                        padding:"5px",
                                                                                        position:'relative',
                                                                                        minHeight:"34px"
                                                                                     }}

                                                                                     onClick={() => setDropDownDepts(!dropDownDepts)}
                                                                                    >
                                                                                        {/* display selected items over  */}
                                                                                        <div
                                                                                            style={{display:"flex",flexWrap:"wrap", gap:"5px"}}
                                                                                        >
                                                                                          {
                                                                                            selectedDeptsList?.length > 0 &&
                                                                                            selectedDeptsList?.map((item,index) => {
                                                                                                return  <span
                                                                                                    key={index}
                                                                                                    style={{
                                                                                                       border:"1px solid #ccc",
                                                                                                       padding:"3px",
                                                                                                       display:"inline-block",
                                                                                                       background:"#f0f0f0",
                                                                                                       borderRadius:"2px"
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon 
                                                                                                     icon={faTimes}
                                                                                                     style={{
                                                                                                        cursor:"pointer",
                                                                                                        marginRight:"5px",
                                                                                                        

                                                                                                     }}
                                                                                                     onClick={(e) => {
                                                                                                        //e.stopPropagation();
                                                                                                        removeSelectedDepts(item);                   

                                                                                                     }}
                                                                                                    />

                                                                                                   {item}
                                                                                                </span>
                                                                                            })
                                                                                          }
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* Groups options */}
                                                                                    {
                                                                                        dropDownDepts && 
                                                                                        (
                                                                                            <ul 
                                                                                             style={{
                                                                                                listStyle:"none",
                                                                                                margin:0,
                                                                                                border:"1px solid #ccc",
                                                                                                background:"#fff",
                                                                                                padding:"5px 0px",
                                                                                                width:"100%",
                                                                                                zIndex:1000,
                                                                                                position:"absolute",
                                                                                                maxHeight:"200px",
                                                                                                overflow:"auto"

                                                                                             }}
                                                                                            > 
                                                                                            {
                                                                                                !selectedDeptsList?.includes("All") &&
                                                                                                <li key={"All"}
                                                                                                    value={"0"}
                                                                                                    style={{
                                                                                                        padding:"5px 10px",
                                                                                                        cursor:"pointer",
                                                                                                        background:selectedDeptsList?.includes("All") ? "#e6f7ff" : "#fff",
                                                                                                        display:selectedDeptsList?.includes("All") ? "none" :"block"
                                                                                                    }}
                                                                                                    onClick={() => {
                                                                                                        handleSelectDepts("All")
                                                                                                    }}
                                                                                                >
                                                                                                All 
                                                                                         </li>
                                                                                            }
                                                                                              
                                                                                             {
                                                                                                getProductCategoriesData?.length > 0 &&
                                                                                                getProductCategoriesData?.map((option) => {
                                                                                                 return   <li key={option?.productCategoryId}
                                                                                                    value={option?.productCategoryName}
                                                                                                   
                                                                                                    style={{
                                                                                                        padding:"5px 10px",
                                                                                                        cursor:"pointer",
                                                                                                        background:selectedDeptsList?.includes(option?.productCategoryName) ? "#e6f7ff" : "#fff",
                                                                                                        display:selectedDeptsList?.includes(option?.productCategoryName) ? "none" :"block"
                                                                                                    }}
                                                                                                    onClick={() => {
                                                                                                        handleSelectDepts(option?.productCategoryName)
                                                                                                    }}
                                                                                                >
                                                                                               {
                                                                                                option?.productCategoryName
                                                                                               }
                                                                                         </li>
                                                                                                })
                                                                                             }
                                                                                            </ul>
                                                                                        )
                                                                                    
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className='editable-buttons'>
                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                        onClick={(e) => handleEditableClose(e)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className='btn btn-sm btncancel editable-cancel'
                                        onClick={(e) => {
                                            handleCancel();
                                        }
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                                                                        </div>
                                                                        <div style={{display:"none"}}></div>
                                                                    </div>   
                                                                </form>
                                                            </div>
                                                        </span>                          

                                                        </label>
                                                    </td>
                                                </tr>
                                                {/* baskets */}
                                                <tr>
                                                    <td width={"20%"}>
                                                        <a href='#' >No.of Baskets</a>
                                                    </td>
                                                    <td width={"40%"} style={{ textAlign: "left" }}>
                                                        <label style={{ fontWeight: "600" }}>
                                                            {"Between "}
                                                            <a href='#' id="minBasketCount" className='editable editable-click'
                                                                onClick={() => handleEditable("minBasketCount")}
                                                                style={{ display: editableOpen === "minBasketCount" && "none" }}
                                                            >
                                                                {
                                                                    value?.minBasketCount
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "minBasketCount" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        // id="minBasketCount"
                                                                                        name="minBasketCount"
                                                                                        value={value?.minBasketCount}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => {
                                                                                            setValue({
                                                                                                ...value,
                                                                                                ["minBasketCount"]: e.target.value

                                                                                            });
                                                                                            //handleInupt(e,"minBasketCount")
                                                                                        }

                                                                                        }
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) =>
                                                                                            setEditableOpen(null)
                                                                                            //handleEditableClose(e)
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                            {" and "}

                                                            <a id="maxBasketCount" className='editable editable-click'
                                                                onClick={() => handleEditable("maxBasketCount")}
                                                                style={{ display: editableOpen === "maxBasketCount" && "none" }}
                                                            >
                                                                {
                                                                    value?.maxBasketCount
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "maxBasketCount" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        id="maxBasketCount"
                                                                                        name="maxBasketCount"
                                                                                        value={value?.maxBasketCount}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => handleInupt(e, "maxBasketCount")}
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) => {
                                                                                            setEditableOpen(null);
                                                                                            // handleEditableClose(e)}
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                                {/* Redeemptions */}
                                                <tr>
                                                    <td width={"20%"}>
                                                        <a href='#' >No.of Redeemptions</a>
                                                    </td>
                                                    <td width={"40%"} style={{ textAlign: "left" }}>
                                                        <label style={{ fontWeight: "600" }}>
                                                            {"Between "}
                                                            <a href='#' id="minReedemCount" className='editable editable-click'
                                                                onClick={() => handleEditable("minReedemCount")}
                                                                style={{ display: editableOpen === "minReedemCount" && "none" }}
                                                            >
                                                                {
                                                                    value?.minReedemCount
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "minReedemCount" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        // id="minReedemCountt"
                                                                                        name="minReedemCount"
                                                                                        value={value?.minReedemCount}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => {
                                                                                            setValue({
                                                                                                ...value,
                                                                                                ["minReedemCount"]: e.target.value

                                                                                            });
                                                                                            //handleInupt(e,"minReedemCount")
                                                                                        }

                                                                                        }
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) =>
                                                                                            setEditableOpen(null)
                                                                                            //handleEditableClose(e)
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                            {" and "}

                                                            <a id="maxRedeemCount" className='editable editable-click'
                                                                onClick={() => handleEditable("maxRedeemCount")}
                                                                style={{ display: editableOpen === "maxRedeemCount" && "none" }}
                                                            >
                                                                {
                                                                    value?.maxRedeemCount
                                                                }
                                                            </a>

                                                            <span className='editable-container editable-inline' style={{ display: editableOpen === "maxRedeemCount" ? "inline-block" : "none" }}>
                                                                <div>
                                                                    <div style={{ display: "none" }}></div>
                                                                    <form className='form-inline editableform'>
                                                                        <div className='form-group control-group' >
                                                                            <div className=''>
                                                                                <div className='editable-input' style={{ position: "relative" }}>
                                                                                    <input
                                                                                        type='text'
                                                                                        id="maxRedeemCount"
                                                                                        name="maxRedeemCount"
                                                                                        value={value?.maxRedeemCount}
                                                                                        className='form-control input-sm' style={{ width: "100%", paddingRight: "24px" }}
                                                                                        onChange={(e) => handleInupt(e, "maxRedeemCount")}
                                                                                    />
                                                                                    <span className='clear-input-x' style={{ display: "none" }}>x</span>
                                                                                </div>
                                                                                <div className='editable-buttons'>
                                                                                    <button className='btn btn-sm btnok editable-submit' style={{ color: "white" }}
                                                                                        onClick={(e) => handleEditableClose(e)}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCheck} />
                                                                                    </button>
                                                                                    <button className='btn btn-sm btncancel editable-cancel'
                                                                                        onClick={(e) => {
                                                                                            setEditableOpen(null);
                                                                                            // handleEditableClose(e)}
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faTimes} />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ display: "none" }}></div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </span>
                                                        </label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                       <div className='row'>
                                        <div className='col-sm-12'>
                                             <div style={{textAlign:"end"}}>
                                                <button className='btn btn-success' type="submit" onClick={(e) => handleSumbitSearch(e)}>Search</button>
                                            </div>                                               
                                        </div>

                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     
                                         {
                                             getShoppersAdvancedSearchMessage!= "" &&
                                             <div className='row' style={{ marginTop: "25px", marginRight: "5px", marginLeft: "5px", background: "#FFFFFF", padding: "15px" }}>
                                                 <div className='col-sm-12'>
                                                     <div className=''>
                                                         <div className=''>
                                                             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                 <h2 style={{ color: "#505458" }}>
                                                                     <strong>Search</strong>
                                                                     {" Results"}
                                                                 </h2>
                                                                 <div>
                                                                     <button className='btnSearch' style={{ width: "220px" }}
                                                                         onClick={handleCreateShopperOpen}
                                                                     >
                                                                         <FontAwesomeIcon icon={faPlus} /> &nbsp;
                                                                         Create Shopper Group
                                                                     </button>
                                                                     <FontAwesomeIcon icon={faAngleDown} className='openShopper' onClick={() => 
                                                                       handleToggleDropDown()
                                                                        } 
                                                                        />
                     
                                                                 </div>
                                                             </div>
                                                             <div
                                                               
                                                                 style={{
                                                                     //  overflow: "hidden",
                     
                                                                     //height: toggleDrop ? "auto" : "0",
                     
                                                                     //transition: "opacity  5s ease, height 5s ease",
                                                                     display: toggleDrop ? "block" : "none",
                     
                                                                 }}
                                                             >
                                                                 {
                                                                     getShoppersAdvancedSearchData?.length > 0 ?
                                                                         <>
                                                                             <div>
                                                                                 <div>
                                                                                     <div>
                                                                                         <div>
                                                                                             <label className='itemLabel'>
                                                                                                 {"Show "}
                                                                                                 <select
                                                                                                     onChange={(e) => handlePageSelect(e)}
                                                                                                     className='itemSelect'
                                                                                                     style={{ width: "65px", height: "30.8px", textAlign: "center" }}
                                                                                                 >
                                                                                                     <option value={"5"}>5</option>
                                                                                                     <option value={"10"}>10</option>
                                                                                                     <option value={"25"}>25</option>
                                                                                                     <option value={"50"}>50</option>
                                                                                                     <option value={"100"}>100</option>
                                                                                                 </select>
                                                                                                 {"entries"}
                                                                                             </label>
                                                                                         </div>
                                                                                         <div style={{ textAlign: "end" }}>
                                                                                             <button className="" style={{ background: "black", color: "#FFFFFF" }}
                                                                                               onClick={() => dispatch(DownloadTopShoppersAPI(clientName,value))}
                                                                                             >Download</button>
                                                                                         </div>
                                                                                         <div className='' style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                                                                             <label style={{ marginRight: "-15px" }} >Search:
                                                                                                 <input type="search" name={searchTerm} value={searchTerm} onChange={(e) => {
                                                                                                     handleSearch(e);
                     
                                                                                                 }} />
                     
                                                                                             </label>
                     
                                                                                         </div>
                                                                                         <div>
                                                                                             {
                                                                                                 getShoppersAdvancedSearchData?.length > 0 &&
                                                                                                 <>
                                                                                                     <table className='table table-bordered table-stripped table-hover' cellSpacing={"0"}>
                                                                                                         <thead>
                                                                                                             <tr>
                     
                                                                                                                 <th onClick={() => {
                                                                                                                     handleSort("firstName");
                                                                                                                     sortHandler("firstName");
                                                                                                                 }
                     
                     
                                                                                                                 }>First Name
                                                                                                                     {handleSortIcon("firstName")}
                     
                                                                                                                 </th>
                     
                                                                                                                 <th onClick={() => {
                                                                                                                     handleSort("lastName");
                                                                                                                     sortHandler("lastName");
                                                                                                                 }
                     
                     
                                                                                                                 }>Last Name
                                                                                                                     {handleSortIcon("lastName")}
                     
                                                                                                                 </th>
                     
                     
                                                                                                                 <th onClick={() => {
                                                                                                                     handleSort("userName");
                                                                                                                     sortHandler("userName");
                                                                                                                 }
                     
                     
                                                                                                                 }>Email        
                                                                                                                     {handleSortIcon("userName")}
                     
                                                                                                                 </th>

                                                                                                                 <th onClick={() => {
                                                                                                                     handleSort("loyaltyid");
                                                                                                                     sortHandler("loyaltyid");
                                                                                                                 }
                     
                     
                                                                                                                 }>Member Number
                                                                                                                     {handleSortIcon("loyalyti")}
                     
                                                                                                                 </th>
                     
                                                                                                                 <th onClick={() => {
                                                                                                                     handleSort("preferredStore");
                                                                                                                     sortHandler("preferredStore");
                                                                                                                 }
                     
                     
                                                                                                                 }>Preferred Store
                                                                                                                     {handleSortIcon("preferredStore")}
                     
                                                                                                                 </th>
                                                                                                                 {/* <th onClick={() => {
                                                                                                                     handleSort("avgTrAmount");
                                                                                                                     sortHandler("avgTrAmount");
                                                                                                                 }
                     
                     
                                                                                                                 }>Amount
                                                                                                                     {handleSortIcon("avgTrAmount")}
                     
                                                                                                                 </th> */}
                     
                     
                                                                                                                 <th></th>
                                                                                                             </tr>
                                                                                                         </thead>
                                                                                                         <tbody>
                                                                                                             {
                                                                                                                 //getTopShoppersData?.map((each,i) => {
                                                                                                                 currentItems?.map((each, i) => {
                                                                                                                     return <tr key={i}>
                                                                                                                         <td>{each?.firstName}</td>
                                                                                                                         <td>{each?.lastName}</td>
                                                                                                                         <td>{each?.userName}</td>
                                                                                                                         <td>{each?.loyaltyid}</td>
                                                                                                                         <td>{each?.preferredStore}</td>
                                                                                                                         {/* <td>${each?.avgTrAmount}</td> */}
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
                                                                                                                                             <Link to={`/shoppers/shoppertransaction?userId=${each?.userDetailId}`}
                                                                                                                                                 state={{
                                                                                                                                                     userDetailId: each?.
                                                                                                                                                     userDetailId,
                                                                                                                                                     retailerName: clientName,
                                                                                                                                                     shopperData: each
                                                                                                                                                 }}
                     
                                                                                                                                             >
                                                                                                                                                 <a
                                                                                                                                                     onClick={() => {
                                                                                                                                                         // setOpen(null);
                                                                                                                                                         dispatch(userHistoryAPI(each?.
                                                                                                                                                            userDetailId, clientName));
                                                                                                                                                         dispatch(GetUserClipsAndRedemptionsDatesAPI(each?.
                                                                                                                                                            userDetailId));
                                                                                                                                                         dispatch(getUserRewardCouponsAPI(each?.
                                                                                                                                                            userDetailId));
                                                                                                                                                         dispatch(getUserBasketTransactionAPI(each?.
                                                                                                                                                            userDetailId, clientName))
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
                                                                                             }
                     
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         </>
                                                                         :
                                                                         <>
                                                                             <div>
                                                                                 <div>
                                                                                     <div>
                     
                                                                                         <div className='' >
                                                                                             <p style={{ color: "#505458" }}>No shoppers found</p>
                     
                                                                                         </div>
                     
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         </>
                                                                 }
                     
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         }    

                </div>

            </div>

            <>
                {
                    getShoppersAdvancedSearchLoading === true &&
                    <LoaderModal show={true} />
                }
            </>
            <CreateShopperGroup
                show={createShopperModal}
                handleClose={handleCreateShopperClose}
                selectedItem={getShoppersAdvancedSearchData}
                clientName={clientName}
                successMsg={setSuccessMsg}

                setShowNotificationError={setShowNotificationSuccess} />
        </>
        
    )
}

export default AdvancedSearchShopper