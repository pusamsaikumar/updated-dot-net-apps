import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI, GetTopShoppersAPI, DownloadTopShoppersAPI } from '../redux/API';
import CreateShopperGroup from '../Models/CreateShopperGroup';
import LoaderModal from '../Models/LoaderModal';
const TopShopper = (
    {
        clientName, handleDropdown, open, setOpen, isEnlarged
    }
) => {
    const getClientStoresData = useSelector((state) => state.getClientStoresData);
    const getClientStoresLoading = useSelector((state) => state.getClientStoresLoading);
    const getclientStoresMessage = useSelector((state) => state.getclientStoresMessage);

    const getProductCategoriesData = useSelector((state) => state.getProductCategoriesData);
    const getProductCategoriesMessage = useSelector(state => state.getProductCategoriesMessage);
    const getProductCategoriesLoading = useSelector(state => state.getProductCategoriesLoading);
    const getTopShoppersData = useSelector(state => state.getTopShoppersData);
    const getTopShoppersMessage = useSelector(state => state.getTopShoppersMessage);
    const getTopShoppersLoading = useSelector(state => state.getTopShoppersLoading);



    console.log("getTopShopper", getTopShoppersData)
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("")
    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);


    // const getPastDate = (today) => {

    //     const dayOfWeek = today?.getDay();

    //     // cal past day of week
    //     const pastDay = new Date(today);
    //     pastDay.setDate(today?.getDate() - 7);

    //     // cal current date 
    //     const currentDate = new Date(today);
    //     currentDate.setDate(pastDay?.getDate() + 7);

    //     // return {
    //     //     fromDate: pastDay?.toISOString()?.split('T')[0],
    //     //     toDate: currentDate?.toISOString()?.split('T')[0]
    //     // }

    //     return pastDay?.toISOString()?.split('T')[0];
    // }
    // const getCurrentDate = (today) => {

    //     const dayOfWeek = today?.getDay();

    //     // cal past day of week
    //     const pastDay = new Date(today);
    //     pastDay.setDate(today?.getDate() - 7);

    //     // cal current date 
    //     const currentDate = new Date(today);
    //     currentDate.setDate(pastDay?.getDate() + 7);

    //     // return {
    //     //     fromDate: pastDay?.toISOString()?.split('T')[0],
    //     //     toDate: currentDate?.toISOString()?.split('T')[0]
    //     // }
    //     return currentDate?.toISOString()?.split('T')[0];
    // }

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

    const [value, setValue] = useState({

        fromDate: "",
        toDate: "",
        noOfRecords: 50,
        storeId: 0,
        orderByDirection: "ASC",
        departmentId: 0
    });
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
            ["fromDate"]: fromDate,
            ["toDate"]: toDate
        })


    }, []);




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

    useEffect(() => {
        dispatch(getClientStoresAPI())
        dispatch(GetProductCategoriesAPI())
    }, [dispatch]);

    console.log("value", value);

    const [toggleDrop, setToggleDrop] = useState(true);
    const handleToggleDropDown = () => {
        setToggleDrop(!toggleDrop)
    }

    const handleInput = (e, name) => {
        setValue({
            ...value,
            [name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(GetTopShoppersAPI(clientName, value));
    }
    const handleReset = () => {
        setValue({

            fromDate: "",
            toDate: "",
            noOfRecords: "",
            storeId: 0,
            orderByDirection: "",
            departmentId: 0
        })
    }
    console.log("value", value);
    const [createShopperModal, setCreateShopperModal] = useState(false);
    const handleCreateShopperOpen = () => {
        if (getTopShoppersData?.length !== 0) {
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
    const [filterData, setFilterData] = useState(getTopShoppersData || []);

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
            setFilterData(getTopShoppersData);
            return;
        }

        const filter = getTopShoppersData?.filter(item => {
            return Object.values(item).some((val) => {

                const valueToSearch = val != null ? val.toString().toLowerCase() : '';
                return valueToSearch.includes(searchTermValue.toLowerCase());
            });
        });
        setFilterData(filter);
    }



    useEffect(() => {
        if (getTopShoppersMessage === "Successful") {
            let updatedata = getTopShoppersData;
            setFilterData(updatedata);

        }
    }, [getTopShoppersData, getTopShoppersMessage]);



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


    let totalEntries = getTopShoppersData?.length || 0;

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
    // const handlePageSize = (e) => {

    //     setPage(1);
    //     //    if(e.target.value === "All"){
    //     //     setItemPerPage(filterData.length)
    //     //    }
    //     setItemPerPage(parseInt(e.target.value));
    //     setTotalPage(Math.ceil(filterdata?.length / parseInt(e.target.value)));
    //     // fetchPagination();
    //     //  dispatch(getFindShopperPaginationAPI(clientName,value,1,parseInt(e.target.value),setTotalRecords,sortColumn,sortDirection,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata))

    // }

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
                    <div>
                        <h1 style={{ color: "#505458", fontSize: "24px" }}>
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "5px" }} />
                            <span>Top/Bottom Shopppers</span>
                        </h1>
                    </div>
                    <div className='row' style={{ marginTop: "25px", marginRight: "5px", marginLeft: "5px" }}>
                        <div className='col-sm-12'>
                            <div className='row' style={{ background: "#FFFFFF", paddingTop: "20px", paddingBottom: "0px", paddingLeft: "15px", paddingRight: "15px" }}>
                                <div className='col-sm-12' style={{ marginBottom: "10px" }}>
                                    <div className='col-sm-2'  >
                                        <div className='form-group'>
                                            <label>From Date</label>
                                            <input type='date'
                                                style={{ width: "153px" }}
                                                value={value?.fromDate}
                                                name="fromDate"
                                                onChange={(e) => handleInput(e, "fromDate")}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>To Date</label>
                                            <br />
                                            <input type='date'
                                                value={value?.toDate}
                                                name="toDate"
                                                onChange={(e) => handleInput(e, "toDate")}
                                                style={{ width: "153px" }} />
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>Shoppers count</label>
                                            <select id="noOfRecords" name="noOfRecords" value={value?.noOfRecords}
                                                onChange={(e) => handleInput(e, "noOfRecords")}
                                                style={{ width: "153px" }} >
                                                <option value={"50"}>50</option>
                                                <option value={"100"}>100</option>
                                                <option value={"200"}>200</option>
                                                <option value={"300"}>300</option>
                                                <option value={"400"}>400</option>
                                                <option value={"500"}>500</option>
                                                <option value={"1000"}>1000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>Top/bottom</label>
                                            <select id="orderByDirection" name="orderByDirection"
                                                value={value?.orderByDirection}
                                                onChange={(e) => handleInput(e, "orderByDirection")}
                                                style={{ width: "153px" }} >
                                                <option value={"ASC"}>Top</option>
                                                <option value={"DESC"}>Bottom</option>

                                            </select>
                                            <br />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-sm-12'>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>Department</label>
                                            <select id="departmentId" name="departmentId"
                                                value={value?.departmentId}
                                                onChange={(e) => handleInput(e, "departmentId")}
                                                style={{ width: "143px" }} >
                                                <option value={"0"}>Choose Department</option>
                                                {
                                                    getProductCategoriesData?.length > 0 &&
                                                    <>
                                                        {
                                                            getProductCategoriesData?.map((each, i) => {
                                                                return <option value={each?.productCategoryId} >
                                                                    {
                                                                        each?.productCategoryName
                                                                    }
                                                                </option>
                                                            })
                                                        }
                                                    </>

                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>Stores</label>
                                            <select id="storeId" name="storeId"
                                                value={value?.storeId}
                                                onChange={(e) => handleInput(e, "storeId")}
                                                style={{ width: "153px", display: "block" }} >
                                                <option value={"0"}>Choose stores</option>
                                                {
                                                    getClientStoresData?.length > 0 &&
                                                    <>
                                                        {
                                                            getClientStoresData?.map((each, i) => {
                                                                return <option value={each?.clientStoreId} >
                                                                    {
                                                                        each?.storeName
                                                                    }
                                                                </option>
                                                            })
                                                        }
                                                    </>

                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='col-sm-1'>
                                        <label>&nbsp;</label>
                                        <button className='btnSearch' style={{ width: "87px", display: "block" }}
                                            onClick={() => handleReset()}
                                        >Reset</button>

                                    </div>
                                    <div className='col-sm-1'>
                                        <label>&nbsp;</label>
                                        <button className='btnCancel'
                                            onClick={(e) => handleSubmit(e)}
                                            style={{ width: "87px", display: "block" }} >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        getTopShoppersMessage != "" &&
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
                                                <FontAwesomeIcon icon={faAngleDown} className='openShopper' onClick={() => handleToggleDropDown()} />

                                            </div>
                                        </div>
                                        <div
                                            //className={!toggleDrop && "animate__animated animate__fadeInUp"} style={{display:toggleDrop ? "block" :"none"}}
                                            // className={`${
                                            //     toggleDrop
                                            //       ? "animate__animated animate__fadeInUp"
                                            //       : "animate__animated animate__fadeOutDown"
                                            //   }`}
                                            style={{
                                                //  overflow: "hidden",

                                                //height: toggleDrop ? "auto" : "0",

                                                //transition: "opacity  5s ease, height 5s ease",
                                                display: toggleDrop ? "block" : "none",

                                            }}
                                        >
                                            {
                                                getTopShoppersData?.length > 0 ?
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
                                                                            getTopShoppersData?.length > 0 &&
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
                                                                                                handleSort("storename");
                                                                                                sortHandler("storename");
                                                                                            }


                                                                                            }>Preferred Store
                                                                                                {handleSortIcon("storename")}

                                                                                            </th>
                                                                                            <th onClick={() => {
                                                                                                handleSort("totalbasketamount");
                                                                                                sortHandler("totalbasketamount");
                                                                                            }


                                                                                            }>Amount
                                                                                                {handleSortIcon("totalbasketamount")}

                                                                                            </th>


                                                                                            <th></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {
                                                                                            //getTopShoppersData?.map((each,i) => {
                                                                                            currentItems?.map((each, i) => {
                                                                                                return <tr key={i}>
                                                                                                    <td>{each?.firstname}</td>
                                                                                                    <td>{each?.lastname}</td>
                                                                                                    <td>{each?.username}</td>
                                                                                                    <td>{each?.storename}</td>
                                                                                                    <td>${each?.totalbasketamount}</td>
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
                                                                                                                        <Link to={`/shoppers/shoppertransaction?userId=${each?.userdetailid}`}
                                                                                                                            state={{
                                                                                                                                userDetailId: each?.userdetailid,
                                                                                                                                retailerName: clientName,
                                                                                                                                shopperData: each
                                                                                                                            }}

                                                                                                                        >
                                                                                                                            <a
                                                                                                                                onClick={() => {
                                                                                                                                    // setOpen(null);
                                                                                                                                    dispatch(userHistoryAPI(each?.userdetailid, clientName));
                                                                                                                                    dispatch(GetUserClipsAndRedemptionsDatesAPI(each?.userdetailid));
                                                                                                                                    dispatch(getUserRewardCouponsAPI(each?.userdetailid));
                                                                                                                                    dispatch(getUserBasketTransactionAPI(each?.userdetailid, clientName))
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
                    getTopShoppersLoading === true &&
                    <LoaderModal show={true} />
                }
            </>
            <CreateShopperGroup
                show={createShopperModal}
                handleClose={handleCreateShopperClose}
                selectedItem={getTopShoppersData}
                clientName={clientName}
                successMsg={setSuccessMsg}

                setShowNotificationError={setShowNotificationSuccess} />
        </>
    )
}

export default TopShopper