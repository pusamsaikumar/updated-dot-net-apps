import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetAllshoppersGroupsAPI, DownloadShoppersAPI } from '../redux/API';
import { Spinner } from 'react-bootstrap';
import LoaderModal from '../Models/LoaderModal';
import { Link, useLocation } from 'react-router-dom';

const AllShopperGroups = ({

    handleDropdown, open, clientName, setOpen,  isEnlarged 
}) => {

    // GROUP ID:
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const groupId = searchParams.get("GroupId");
    const userId = 0;

    console.log("groupId",groupId);


     const dispatch = useDispatch();
    const getAllShopperGroupsData = useSelector(state => state.getAllShopperGroupsData);
    const getAllShopperGroupsLoading = useSelector(state => state.getAllShopperGroupsLoading);
    const getAllShopperGroupsMessage = useSelector(state => state.getAllShopperGroupsMessage);
    // sorting ,filter,searching 
    const [searchTerm, setSearchTerm] = useState("");
    const [filterData, setFilterData] = useState( getAllShopperGroupsData || []);
    const [isCon,setIsCon] = useState(false);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortTerm, setSortTerm] = useState({
        key: "", direction: "asc"
    });
  

    // search term filtered 
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
       setCurrentPage(1);
        handleSearchFilter(e.target.value);

    }

    const handleSearchFilter = (searchTermValue) => {
        if (!searchTermValue) {
            setFilterData(getAllShopperGroupsData);
            return;
        }

        const filter = getAllShopperGroupsData?.filter(item => {
            return Object.values(item).some((val) => {

                const valueToSearch = val != null ? val.toString().toLowerCase() : '';
                return valueToSearch.includes(searchTermValue.toLowerCase());
            });
        });
        setFilterData(filter);
    }



    
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

        // return <FontAwesomeIcon icon={faSort}  style={{color:"#65BBD6",marginLeft:"5px"}} />
        return <FontAwesomeIcon icon={faCaretDown} style={{ color: "#65BBD6", marginLeft: "5px" }} />
    }


// get all shoppers groups data:
// useEffect(() => {
//  if(clientName == "Veritra RSA") {
//     dispatch(GetAllshoppersGroupsAPI(clientName,0,0))
//  }
// },[dispatch,clientName]);
console.log("data",getAllShopperGroupsData);


// Pagination:
useEffect(() => {
    setFilterData(sortedData);
}, [filterData]);

useEffect(()=>{
if(getAllShopperGroupsMessage === "Successful"){
    let updatedData = getAllShopperGroupsData;
    setFilterData(updatedData);
}
},[getAllShopperGroupsData,getAllShopperGroupsMessage])

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

const handlePageSize =(e)=>{
    setCurrentPage(1);
    setItemsPerPage(parseInt(e.target.value))
}


let totalEntries = getAllShopperGroupsData?.length || 0;

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

const downloadShopper = (each) => {
    if(clientName && each){
        dispatch(DownloadShoppersAPI(clientName,each?.groupName,each?.groupID))
    }
 
}

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
console.log("current items",currentItems);
  return (
   <>
     <div className='right side-menu'>

</div>
<div className='content-page style-gg'
  style={{
    height: "100vh",
    marginLeft: isEnlarged ? "50px" : "240px", 
    // width: isEnlarged ? "calc(100% - 240px)":"",

    //height: "100%",
    overflowY:"auto"

  }}>
  <div className='content' style={{

    maxHeight: "auto",
    padding: "10px",
    outline: "none",
    overflowY:"auto"
    


  }}>
        <div>
            <h1 style={{color:"#505458"}}>
                &nbsp;
                <span>All Shopper Groups</span>
            </h1>
        </div>
       {
        getAllShopperGroupsMessage === "Successful" &&
        <>
          <div style={{background:"#fff",padding:"15px"}}>
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: '5px' }}>
                                    <div>
                                        <label>
                                            <select onChange={(e) => {
                                                handlePageSelect(e);
                                                handlePageSize(e);
                                            }}
                                                style={{ width: "65px", height: "30.8px", marginRight: "5px", textAlign: "center",border:"1px solid #ddd" }}
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
                                                handleSort("groupName");
                                                sortHandler("groupName");
                                            }


                                            }>Group Name
                                                {handleSortIcon("groupName")}

                                            </th>

                                            <th onClick={() => {
                                                handleSort("groupDetails");
                                               sortHandler("groupDetails");
                                            }} > Group Details
                                             {handleSortIcon("groupDetails")}</th>
                                            <th onClick={() => {
                                                handleSort("createdOn");
                                                sortHandler("createdOn");
                                            }
                                            }> Created Date 
                                             {handleSortIcon("createdOn")}</th>
                                            
                                            <th onClick={() => {
                                                handleSort("totalShoppers");
                                                sortHandler("totalShoppers");
                                            }

                                            }>
                                                Total Shoppers
                                                 {handleSortIcon("totalShoppers")}</th>
                                            


                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            getAllShopperGroupsData.length > 0 ? <>

                                                {
                                                    
                                                    //getAllShopperGroupsData?.map((each, i) => {
                                                        currentItems?.map((each, i) => {

                                                       
                                                        return <tr key={i}>
                                                           
                                                            <td>
                                                                <Link to={`/shoppers/ShopperGroupAnalysisTimeLine?GroupId=${each?.groupID}`}
                                                                  state={{
                                                                    groupMessage:each?.topicARN
                                                                  }}
                                                                >
                                                                {each?.groupName}
                                                                </Link>
                                                            </td>
                                                            <td>{each?.groupDetails}</td>
                                                            <td>{each?.createdOn}</td>
                                                            <td>{each?.totalShoppers}</td>
                                                           

                                                            
                                                            
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
                                                                        <ul className='dropdown-menu' id="table-drop" role="menu" style={{  display : "block", right: "0px", left: "auto", width: "160px" }}>
                                                                            <li>
                                                                                <a href="#"
                                                                                    onClick={() => {


                                                                                        
                                                                                    }}
                                                                                >
                                                                                    Analysis
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#"
                                                                                    onClick={
                                                                                        () => {

                                                                                    downloadShopper(each);
                                                                                           
                                                                                        }
                                                                                    }
                                                                                >
                                                                                    Download Shoppers
                                                                                </a>
                                                                            </li>
                                                                            

                                                                        </ul>


                                                                    }
                                                                  
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
        </>
       }
      
    </div>
    </div>
    {
        getAllShopperGroupsLoading == true &&
        <LoaderModal show={true} /> 
    }
   </>
  )
}

export default AllShopperGroups