import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI } from '../redux/API';
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


const FindShoppers = ({ clientName, handleDropdown, open, setOpen, isEnlarged }) => {

    const getFindShopperPaginationData = useSelector(state => state.getFindShopperPaginationData);



    const getFindShopperData = useSelector(state => state.getFindShopperData);
    const getFindShopperMessage = useSelector(state => state.getFindShopperMessage);
    const getFindShopperLoading = useSelector(state => state.getFindShopperLoading);

    const getClientStoresData = useSelector((state) => state.getClientStoresData);
    const getClientStoresLoading = useSelector((state) => state.getClientStoresLoading);
    const getclientStoresMessage = useSelector((state) => state.getclientStoresMessage);


    const updateFindShopperData = useSelector((state) => state.updateFindShopperData);
    const updateFindShopperMessage = useSelector((state) => state.updateFindShopperMessage);
    const updateFindShopperLoading = useSelector((state) => state.updateFindShopperLoading);

    const getFindShopperDetailsData = useSelector(state => state.getFindShopperDetailsData);
    const getFindShopperDetailsLoading = useSelector(state => state.getFindShopperDetailsLoading);
    const getFindShopperDetailsMessage = useSelector(state => state.getFindShopperDetailsMessage);
    const getUserClipsAndRedemptionData = useSelector(state => state.getUserClipsAndRedemptionData);
    const getUserClipsAndRedemptionMessage = useSelector(state => state.getUserClipsAndRedemptionMessage);
    const getUserClipsAndRedemptionLoading = useSelector(state => state.getUserClipsAndRedemptionLoading);
    const userHistoryData = useSelector(state => state.userHistoryData);

    const addGroupsLoading = useSelector(state => state.addGroupsLoading);


    const dispatch = useDispatch();
    const [value, setValue] = useState({
        "email": "",
        "memberNumber": "",
        "phoneNumber": "",
        "zipCode": "",
        "stores": "",
        "clientStoreId": "",
        "firstName": "",
        "lastName": "",
        "signUpFromDate": "",
        "signUpToDate": ""

    });
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

    const resetHandle = (e) => {
        e.preventDefault();
        setValue({
            "email": "",
            "memberNumber": "",
            "phoneNumber": "",
            "zipCode": "",
            "stores": "",
            "clinetStoreId": "",
            "firstName": "",
            "lastName": "",
            "signUpFromDate": "",
            "signUpToDate": ""

        });
        setErrorMsg("");
    }
    const handleInput = (e, name) => {
        setValue((prev) => {
            return {
                ...prev,
                [name]: e.target.value
            }
        })
    }

    const [loaderModal, setLoaderModal] = useState(false);

    const handleLoaderOpen = () => {

    }
    const handleLoaderClose = () => {

    }
    const handleFindShopperSearch = (e) => {

        e.preventDefault();

        if (
            value.email.trim() === "" &&
            value.memberNumber.trim() === "" &&
            value.phoneNumber.trim() === "" &&
            value.zipCode.trim() === "" &&
            value.stores.trim() === "" &&
            value.firstName.trim() === "" &&
            value.lastName.trim() === "" &&
            value.signUpFromDate.trim() === "" &&
            value.signUpToDate.trim() === ""

        ) {
            setShowNotificationError(true);
            setErrorMsg("Please enter any one of the search criteria");
            setLoaderModal(false);
        }
        // else if (
        //     (value.signUpFromDate.trim() !== "" && value.signUpToDate.trim() === "") ||
        //     (value.signUpToDate.trim() !== "" && value.signUpFromDate.trim() === "")
        // ) {
        //     setErrorMsg("Please enter both signUpFromDate and signUpToDate fields.");
        // } 

        else {
            setErrorMsg("");
            dispatch(getFindShopperAPI(clientName, value));
            fetchPagination();
            setLoaderModal(true);
            setShowNotificationError(false);
        }

    }


    const fetchPagination = () => {
        dispatch(getFindShopperPaginationAPI(clientName, value, page, itemPerPage, setTotalRecords, sortColumn, sortDirection, setTotalPage, setTotalEntrie, setPageNo, setPage, setData, setFilterdata))

    }



    // PAGINATION API from backend:
    const [data, setData] = useState([]);
    const [filterdata, setFilterdata] = useState([])

    const [page, setPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(null);
    const [totalItemsPages, setTotalItemsPages] = useState(null);
    const [totalPageno, setTotalPage] = useState(0);
    const [totalEntrie, setTotalEntrie] = useState(0);
    const [pageNo, setPageNo] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');





    const sortHandler = (column) => {

        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'desc';
        const sortData = [...filterdata].sort((a, b) => {
            if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
            if (a[column] > b[column]) return direction === "desc" ? 1 : -1;
            return 0;
        })
        setFilterdata(sortData);
        setSortColumn(column);
        setSortDirection(direction);

        //   dispatch(getFindShopperPaginationAPI(clientName,value,page,itemPerPage,setTotalRecords,sortColumn,direction,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata))

    }


    // onchage pageSize 
    const handlePageSize = (e) => {

        setPage(1);
        //    if(e.target.value === "All"){
        //     setItemPerPage(filterData.length)
        //    }
        setItemPerPage(parseInt(e.target.value));
        setTotalPage(Math.ceil(filterdata?.length / parseInt(e.target.value)));
        // fetchPagination();
        //  dispatch(getFindShopperPaginationAPI(clientName,value,1,parseInt(e.target.value),setTotalRecords,sortColumn,sortDirection,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata))

    }
    // page change
    const pageChangeHandler = (pageVal) => {


        //  dispatch(getFindShopperPaginationAPI(clientName,value,pageVal,itemPerPage,setTotalRecords,sortColumn,sortDirection,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata))


        setPage(pageVal);



    }



    useEffect(() => {
        // Dispatch only when page, itemPerPage, sortColumn, or sortDirection changes
        dispatch(getFindShopperPaginationAPI(
            clientName,
            value,
            page,
            itemPerPage,
            setTotalRecords,
            sortColumn,
            sortDirection,
            setTotalPage,
            setTotalEntrie,
            setPageNo,
            setPage,
            setData,
            setFilterdata
        ));
    }, [page, itemPerPage, sortColumn, sortDirection]);







    const paginationData = filterdata?.slice((page - 1) * itemPerPage, page * itemPerPage);


    useEffect(() => {
        dispatch(getClientStoresAPI(clientName))
    }, [dispatch]);

    const convertToMMddyyyystringFormat = (value) => {

        if (!value) {
            return "";
        }

        var parts = value.split("-");
        if (parts.length !== 3) {
            return "";
        }

        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }



    // sorting ,filter,searching 
    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState(getFindShopperData || []);

    const [sortTerm, setSortTerm] = useState({
        key: "", direction: "asc"
    });


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(1)
        handleSearchFilter(e.target.value);

    }

    const handleSearchFilter = (searchTermValue) => {
        if (!searchTermValue) {
            setFilterData(getFindShopperData);
            return;
        }

        const filter = getFindShopperData?.filter(item => {
            return Object.values(item).some((val) => {

                const valueToSearch = val != null ? val.toString().toLowerCase() : '';
                return valueToSearch.includes(searchTermValue.toLowerCase());
            });
        });
        setFilterData(filter);
    }



    useEffect(() => {
        if (getFindShopperMessage === "Successful") {
            let updatedata = getFindShopperData;
            setFilterData(updatedata);

        }
    }, [getFindShopperData, getFindShopperMessage]);

    const getFindShopperPaginationMessage = useSelector(state => state.getFindShopperPaginationMessage);
    useEffect(() => {
        if (getFindShopperPaginationMessage === "Successful") {
            let update = getFindShopperPaginationData;
            setFilterdata(update)
        }

    }, [getFindShopperPaginationData, getFindShopperPaginationMessage]);

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
                <FontAwesomeIcon icon={faCaretUp} style={{ color: "#0078d4", marginLeft: "5px" }} />
                : <FontAwesomeIcon icon={faCaretDown} style={{ color: "#0078d4", marginLeft: "5px" }} />
        }

        // return <FontAwesomeIcon icon={faSort}  style={{color:"#0078d4",marginLeft:"5px"}} />
        return <FontAwesomeIcon icon={faCaretDown} style={{ color: "#0078d4", marginLeft: "5px" }} />
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


    let totalEntries = getFindShopperData?.length || 0;

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



    // Models:
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [showAddPoints, setShowAddPoints] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [groupModal, setGroupModal] = useState(false);
    
    const [userDetailId, setUserDetailId] = useState(null);
    const [selectedViewShopper, setSelectedViewShopper] = useState(null);
    const [selectedEditShopper, setSelectedEditShopper] = useState(null);
    const [selectedAddPoints, setSelectedAddPoints] = useState(null);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const [selectedGroups,setSelectedGroups] = useState(null);
    const [loading, setLoading] = useState(false);

    const [createShopperModal, setCreateShopperModal] = useState(false);

    const getUserGroupsLoading = useSelector((state) => state.getUserGroupsLoading);
    const getUserAvailableGroupsLoading = useSelector(state => state.getUserAvailableGroupsLoading)
    

    const handleGroupsOpen = (each) => {
        setGroupModal(true);
        setOpen(null);
        setSelectedGroups(each);
        dispatch(getUserGroupsAPI(clientName,each?.userDetailId));
        dispatch(getUserAvailableGroupsAPI(clientName,each?.userDetailId));
        
    }
    const handleGroupsClose = () => {
        setGroupModal(false);
        setOpen(null);
        setSelectedGroups(null)
    }

    const handleDeleteOpen = (each) => {
        setDeleteModal(true);
        setSelectedDelete(each)
        setOpen(null);
    }
    const handleDeleteClose = () => {
        setDeleteModal(false);
        setSelectedDelete(null);
        setOpen(null);
    }
    const handleOpenPoints = () => {
        setShowAddPoints(true);
        setOpen(null)
    }
    const handleClosePoints = () => {
        setShowAddPoints(false);
        setOpen(null)
    }
      
    
    

    const editModalOpen = (each) => {


        // if(userDetailId != each?.userDetailId){
        //     setUserDetailId(each?.userDetailId);
        //    setSelectedEditShopper(each)

        //    // dispatch(getFindShopperByIdApi(clientName,id))
        // }
        setSelectedEditShopper(each)
        setEditModal(true);


    }

    const editModalClose = () => {
        setEditModal(false);
        setOpen(null)
    }

    const handleOpen = (each) => {
        // if(userDetailId != each?.userDetailId){
        //     setUserDetailId(each?.userDetailId);

        //     //dispatch(getFindShopperByIdApi(clientName,id))
        // }
        setSelectedViewShopper(each);
        setShowModal(true);

        //setOpen(null);
    }

    const handleClose = () => {
        setShowModal(false);

        setOpen(null);
    }

    const handlecloseDropdown = () => {
        setOpen(null);
    }


    useEffect(() => {
        dispatch(getFindShopperByIdApi(clientName, userDetailId));
        dispatch(GetUserClipsAndRedemptionsDatesAPI());
    }, [dispatch, userDetailId]);




    const deleteUserLoading = useSelector(state => state.deleteUserLoading);
    const saveUserPointsLoading = useSelector(state => state.saveUserPointsLoading)

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
            const alreadySelected = prev.some((item) => item.userDetailId === each?.userDetailId);
            return alreadySelected
                ? prev.filter((item) => item.userDetailId !== each?.userDetailId)
                : [...prev, each];
        });
    }

    const handleRemoveRow = (userDetailId) => {
        setSelectedItem((prev) => prev.filter((item) => item.userDetailId !== userDetailId));
    };
    useEffect(() => {
        //setSelectAll(selectedItem.length === filterData.length &&  filterData.length > 0)


        if (selectedItem.length === 0) {
            setSelectAll(false);
        } else if (selectedItem.length === filterData.length) {
            setSelectAll(true);
        }

    }, [selectedItem, filterData]);

    // create shopper group model

    const handleCreateShopperOpen = () => {
        if(selectedItem.length !== 0){
            setCreateShopperModal(true);
            setShowNotificationError(false);
        }else{
            setShowNotificationError(true);
            setErrorMsg("Please select atleast one shopper.");
            
        }
       
    };

    const handleCreateShopperClose = () => {
        setCreateShopperModal(false);
    };


    console.log("selectedItem", selectedItem);
    console.log("fileretdata", filterData)


    //   useEffect(() => {
    //     dispatch(getFindShopperPaginationAPI(clientName,value,page,itemPerPage,setTotalRecords,setTotalItemsPages,sortColumn,sortDirection,setTotalPage,setTotalEntrie,setPageNo))

    //   },[page,itemPerPage])


    //   const totalNoPages = Math.ceil(totalRecords/itemPerPage)

    //  const noOfPagesNumber = Array.from({length:totalNoPages},((_,i) => i+1));


    //  console.log("page numbers",totalNoPages);


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

    return (
        <>
            <ToastContainer />
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


                    <>

                        <label style={{ display: "flex", alignItems: "center" }}>
                            <FontAwesomeIcon icon={faUser} className="faAngledown" style={{ fontSize: "24px" }} />
                            <span style={{ fontSize: "24px" }}>Find Shopper</span>
                        </label>

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

                        <div style={{ padding: "10px", margin: "20px", background: "#fff" }}>
                            <div className='row' style={{ marginBottom: "15px" }}>

                                <div className='col-2'>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input type="email" placeholder='Email' value={value.email} name="email" onChange={(e) => handleInput(e, "email")} />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <label>Member Number</label>
                                    <input type="text" placeholder='Member Number' value={value.memberNumber} name="memberNumber" onChange={(e) => handleInput(e, "memberNumber")} />
                                </div>
                                <div className='col-2'>
                                    <label>Phone Number</label>
                                    <input type="text" placeholder='Phone Number' value={value.phoneNumber} name="phoneNumber" onChange={(e) => handleInput(e, "phoneNumber")} />
                                </div>
                                <div className='col-2'>
                                    <label>ZipCode</label>
                                    <input type="text" placeholder='ZipCode' value={value.zipCode} name="zipCode" onChange={(e) => handleInput(e, "zipCode")} />
                                </div>
                                <div className='col-4'>
                                    <label>Stores</label>
                                    <select
                                        style={{ display: "block" }}
                                        value={value.stores}
                                        name="stores"
                                        onChange={(e) => {
                                            const selectStores = getClientStoresData?.find((store) => store.storeName === e.target.value);
                                            handleInput(e, "stores");
                                            setValue((prev) => {
                                                return {
                                                    ...prev,
                                                    ["clientStoreId"]: selectStores?.clientStoreId.toString() || ""
                                                }
                                            })
                                        }}>
                                        <option value={""}>Select Stores</option>
                                        {
                                            getClientStoresData?.length > 0 &&
                                            getClientStoresData?.map((val, i) => {
                                                return <option value={val.storeName} key={i} id={val.clientStoreId} >{val.storeName}</option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className='col-12'>

                                <div className='row'>
                                    <div className='col-2'>
                                        <div className='form-group'>
                                            <label>First Name</label>
                                            <input type="text" placeholder='First Name' value={value.firstName} name="firstName" onChange={(e) => handleInput(e, "firstName")} />
                                        </div>
                                    </div>
                                    <div className='col-2'>
                                        <label>Last Name</label>
                                        <input type="text" placeholder='Last Name' value={value.lastName} name="lastName" onChange={(e) => handleInput(e, "lastName")} />
                                    </div>
                                    <div className='col-2'>
                                        <label>Sign Up From Date</label>
                                        <input type="date" placeholder='Sign Up From Date' style={{ width: "100%" }} value={value.signUpFromDate} name="signUpFromDate" onChange={(e) => handleInput(e, "signUpFromDate")} />
                                    </div>
                                    <div className='col-2'>
                                        <label>Sign Up To Date</label>
                                        <input type="date" placeholder='Sign Up To Date' style={{ width: "100%" }} value={value.signUpToDate} name="signUpToDate" onChange={(e) => handleInput(e, "signUpToDate")} />
                                    </div>
                                    <div className='col-4'>
                                        <div className='col-2"'>
                                            <label></label>
                                            <div style={{ marginLeft: "30px" }}>
                                                <button className='btnSearch' style={{ marginRight: "20px" }} onClick={(e) => resetHandle(e)}>Reset</button>
                                                <button className='btnCancel' onClick={(e) => handleFindShopperSearch(e)}>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {
                            getFindShopperMessage === "Successful" &&
                            <div style={{ marginTop: "20px", background: "#fff", padding: "10px" }}>
                                <div
                                style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}
                                    >
                                    <p><strong style={{ color: "#5B5B5B" }}>Search</strong> results</p>
                                    <div>
                                        <button className='btnSearch' style={{width:"220px"}}    onClick={handleCreateShopperOpen}>
                                            <FontAwesomeIcon icon={faPlus} /> &nbsp;
                                            Create Shopper Group
                                        </button>
                                            <FontAwesomeIcon icon={faAngleDown} className='openShopper' onClick={() => handleDrop()}
                                            
                                            />
                                    </div>
                                   
                                </div>
                               <div style={{
                                display: shopperDrop === true ? "" :"none",
                                maxHeight:"100%",
                              
                                transition:"max-height 0.3s ease"

                               }}>
                                
                               <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: '5px' }}>
                                    <div>
                                        <label>
                                            <select onChange={(e) => {
                                                handlePageSelect(e);
                                                handlePageSize(e);
                                            }}
                                             className='form-control'
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
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={() => handleSelectAll()}
                                                /> All
                                            </th>
                                            <th onClick={() => {
                                                handleSort("email");
                                                sortHandler("email");
                                            }


                                            }>Email
                                                {handleSortIcon("email")}

                                            </th>

                                            <th onClick={() => {
                                                handleSort("barCodeValue");
                                                sortHandler("barCodeValue");
                                            }} >Member Number {handleSortIcon("barCodeValue")}</th>
                                            <th onClick={() => {
                                                handleSort("mobile");
                                                sortHandler("mobile");
                                            }
                                            }>Phone Number {handleSortIcon("mobile")}</th>
                                            <th onClick={() => {
                                                handleSort("zipCode");
                                                sortHandler("zipCode");
                                            }

                                            }>ZipCode {handleSortIcon("zipCode")}</th>
                                            <th onClick={() => {
                                                handleSort("clientStoreId");
                                                sortHandler("clientStoreId");
                                            }
                                            }>Stores {handleSortIcon("clientStoreId")}</th>
                                            <th onClick={() => {
                                                handleSort("firstName");
                                                sortHandler("firstName");
                                            }

                                            }>First Name {handleSortIcon("firstName")}</th>
                                            <th onClick={() => {
                                                handleSort("lastName");
                                                sortHandler("lastName");
                                            }}>Last Name {handleSortIcon("lastName")}</th>

                                            <th onClick={() => {
                                                handleSort("signUpDate");
                                                sortHandler("signUpDate");
                                            }}>Sign Up Date {handleSortIcon("signUpDate")}</th>


                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            getFindShopperData?.length > 0 ? <>

                                                {
                                                    // getFindShopperData?.map((each,i) => {
                                                    currentItems?.map((each, i) => {
                                                        //   paginationData?.map((each,i) => {
                                                        // filterdata?.map((each,i) => {

                                                        const matchedStore = getClientStoresData?.length > 0 && getClientStoresData?.find(store => store.clientStoreId === each?.clientStoreId);

                                                        //         const filteredStores = handleFilterStores(searchTerm);
                                                        //    const matchedStores = filteredStores?.find(store => store.clientStoreId === each?.clientStoreId);

                                                        //    const store = getClientStoresData?.find(store => 
                                                        //     store.clientStoreId === each?.clientStoreId && store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
                                                        //   );
                                                        return <tr key={each?.userDetailId}>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedItem.some((item) => item.userDetailId === each?.userDetailId)}
                                                                    onChange={() => {
                                                                        handleSelectedItems(each);
                                                                        // handleRemoveRow(each?.userDetailId)
                                                                    }
                                                                    }
                                                                />
                                                            </td>
                                                            <td>{each?.email}</td>
                                                            <td>{each?.barCodeValue}</td>
                                                            <td>{each?.mobile}</td>
                                                            <td>{each?.zipCode}</td>
                                                            <td>

                                                                {
                                                                    matchedStore?.storeName
                                                                    //  matchedStore ? matchedStore.storeName : ''
                                                                    //  store ? store.storeName :""
                                                                }


                                                            </td>


                                                            <td>{each?.firstName}</td>
                                                            <td>{each?.lastName}</td>
                                                            <td>{convertToMMddyyyystringFormat(each?.signUpDate?.slice(0, 10))}</td>
                                                            {/* <td>
                                                                <div className='btn btn-group'>
                                                                  <button style={{border:"none",outline:"none"}}>
                                                                    <FontAwesomeIcon icon={faEye} title='View' fontSize={15} />
                                                                  </button>
                                                                  <button style={{border:"none",outline:"none"}}>
                                                                  <FontAwesomeIcon icon={faEdit}  title='Edit'fontSize={15} />
                                                                  </button>
                                                                </div>
                                                            </td> */}
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
                                                                        <ul className='dropdown-menu' id="table-drop" role="menu" style={{ display: (showModal === true || editModal === true) ? "" : "block", right: "0px", left: "auto", width: "160px" }}>
                                                                            <li>
                                                                                <a href="#"
                                                                                    onClick={() => {


                                                                                        handleOpen(each);
                                                                                    }}
                                                                                >
                                                                                    View
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#"
                                                                                    onClick={
                                                                                        () => {


                                                                                            editModalOpen(each);
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
                                                                                        userDetailId: each?.userDetailId,
                                                                                        retailerName: clientName,
                                                                                        shopperData: each
                                                                                    }}

                                                                                >
                                                                                    <a
                                                                                        onClick={() => {
                                                                                            // setOpen(null);
                                                                                            dispatch(userHistoryAPI(each?.userDetailId, clientName));
                                                                                            dispatch(GetUserClipsAndRedemptionsDatesAPI(each?.userDetailId));
                                                                                            dispatch(getUserRewardCouponsAPI(each?.userDetailId));
                                                                                            dispatch(getUserBasketTransactionAPI(each?.userDetailId, clientName))
                                                                                        }}
                                                                                    >Transactions</a>
                                                                                </Link>
                                                                                {/* <a href="/shoppers/shoppertransaction"
                                                                                onClick={() => handleTransactions(each)}
                                                                                >
                                                                                    Transactions
                                                                                </a> */}
                                                                            </li>
                                                                            <li>
                                                                                <a href='#'
                                                                                    onClick={() => {
                                                                                        handleGroupsOpen(each)
                                                                                    }}
                                                                                > Groups
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href='#'
                                                                                    onClick={() => {
                                                                                        handleDeleteOpen(each)
                                                                                    }}
                                                                                >
                                                                                    Delete
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href='#'
                                                                                    onClick={() => {
                                                                                        handleOpenPoints();
                                                                                        setSelectedAddPoints(each)
                                                                                    }}
                                                                                >
                                                                                    Add Points
                                                                                </a>
                                                                            </li>


                                                                        </ul>


                                                                    }
                                                                    <>

                                                                        <ViewFindShopperModelPopup
                                                                            show={showModal}
                                                                            handleClose={handleClose}
                                                                            clientName={clientName}
                                                                            userDetailId={selectedViewShopper?.userDetailId}
                                                                            getClientStoresData={getClientStoresData}
                                                                            //getFindShopperDetailsData = {getFindShopperDetailsData}
                                                                            getFindShopperDetailsData={selectedViewShopper}
                                                                            getFindShopperDetailsMessage={getFindShopperDetailsMessage}
                                                                            getFindShopperDetailsLoading={getFindShopperDetailsLoading}
                                                                        />
                                                                        <EditFindShopperModal
                                                                            show={editModal}
                                                                            clientName={clientName}
                                                                            handleClose={editModalClose}
                                                                            userDetailId={selectedEditShopper?.userDetailId}
                                                                            getClientStoresData={getClientStoresData}
                                                                            // getFindShopperDetailsData = {getFindShopperDetailsData}
                                                                            getFindShopperDetailsData={selectedEditShopper}
                                                                            getFindShopperDetailsMessage={getFindShopperDetailsMessage}
                                                                            getFindShopperDetailsLoading={getFindShopperDetailsLoading}
                                                                            searchValue={value}
                                                                            setSuccessMsg={setSuccessMsg}
                                                                            setShowNotificationError={setShowNotificationSuccess}
                                                                        />
                                                                        <AddPointsModal
                                                                            show={showAddPoints}
                                                                            handleClose={handleClosePoints}
                                                                            setShow={setShowAddPoints}
                                                                            member={selectedAddPoints}
                                                                            successMsg={setSuccessMsg}
                                                                            clientName={clientName}
                                                                            setShowNotificationError={setShowNotificationSuccess}
                                                                            searchValue={value}
                                                                        />
                                                                        <DeleteModal
                                                                            show={deleteModal}
                                                                            handleClose={handleDeleteClose}
                                                                            selectedDelete={selectedDelete}
                                                                            successMsg={setSuccessMsg}
                                                                            clientName={clientName}
                                                                            setShowNotificationError={setShowNotificationSuccess}
                                                                            searchValue={value}
                                                                        />
                                                                        {
                                                                            getUserAvailableGroupsLoading === false && 
                                                                            <GroupsModal
                                                                            show={groupModal}
                                                                            handleClose={handleGroupsClose}
                                                                            clientName = {clientName}
                                                                            selectedGroups = {selectedGroups}
                                                                              successMsg={setSuccessMsg}
                                                                              setShowNotificationError={setShowNotificationSuccess}
                                                                        />
                                                                        }
                                                                       
                                                                         
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
                            </div>
                        }

                        {
                           
                            (typeof getFindShopperData === 'object' && Object.keys(getFindShopperData).length === 0 && getFindShopperMessage !== "Successful" && getFindShopperMessage !== "Bad Request." && getFindShopperMessage !== "" && getFindShopperLoading === false)
                            && (
                                <div
                                    style={{
                                        padding: '20px',
                                        background: "#fff",
                                        margin: "20px"
                                    }}>
                                    <p><strong style={{ color: "#5B5B5B" }}>Search</strong> results</p>
                                    <p style={{ color: "#5B5B5B" }}>{getFindShopperMessage}</p>
                                </div> 
                            )
                        }
                        {
                            ((getFindShopperLoading === true) || (updateFindShopperLoading === true || saveUserPointsLoading === true || deleteUserLoading === true || getUserAvailableGroupsLoading === true || addGroupsLoading === true)) &&
                            <LoaderModal show={loaderModal} getFindShopperData={getFindShopperData} handleClose={handleLoaderClose} />

                        }



<CreateShopperGroup 
show={createShopperModal} 
handleClose={handleCreateShopperClose} 
selectedItem = {selectedItem} 
clientName={clientName}
successMsg={setSuccessMsg}

setShowNotificationError={setShowNotificationSuccess}

/>
                         
                    </>

                </div>
            </div>
        </>
    )
}

export default FindShoppers