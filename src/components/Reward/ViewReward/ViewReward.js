import React ,{useState,useEffect}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Form,Button, Table, Spinner } from 'react-bootstrap';
import { getLmRewardsAPI } from '../../redux/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faBars,faCog,faCaretDown ,faCaretUp ,faSort,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';
import LoaderModal from '../../Models/LoaderModal';

const ViewReward = ({clientName,isEnlarged}) => {
    
    const [selectQuery,setSelectQuery] = useState("");
    const getLMRewardData = useSelector(state => state.getLMRewardData);
    const getLMRewardMessage  = useSelector(state => state.getLMRewardMessage);
    const getLMRewardLoading = useSelector(state => state.getLMRewardLoading);
    const getclientNamesMessage = useSelector(state => state.getclientNamesMessage);

   

    const dispatch = useDispatch();
  
   
   
    useEffect(()=> {
        if(getclientNamesMessage === "Successful"){
            dispatch(getLmRewardsAPI(clientName))
        }
      
    },[dispatch,clientName])
   
    
    const [open,setOpen] = useState(null);
    const handleDropdown = (index) => {

      setOpen(
       prev => {
        return prev === index ? null : index
       }
      );
   
    }
     // sorting ,filter,searching 
     const [searchTerm,setSearchTerm] = useState("");
     const [filterData ,setFilterData] = useState(getLMRewardData || []);

     const  [sortTerm,setSortTerm] = useState({
        key:"",direction:"asc"
    });

    const handleSearch = (e) => {
       setSearchTerm(e.target.value);
       handleSearchFilter(e.target.value);
   }

    const handleSearchFilter = (searchTermValue) => {
        if(!searchTermValue) {
            setFilterData(getLMRewardData);
            return ;
        }
       const filter = getLMRewardData?.filter(item => {
           return Object.values(item).some((val) => {
               return val.toString().toLowerCase().includes(searchTermValue.toString())  || 
               val.toString().toUpperCase().includes(searchTermValue.toString()) ||
               val.toString().includes(searchTermValue.toString())
           })
       });
       setFilterData(filter);

    }
     useEffect(() => {
       if(getLMRewardMessage === "Successful"){
        let updatedata = getLMRewardData;
        setFilterData(updatedata);
       }
     },[getLMRewardData,getLMRewardMessage ]);

     
     const [isCon,setIsCon] = useState(false);
   
     const handleSort =(key) => {
 
        setIsCon(!isCon);
         let direction = "asc";
         if(sortTerm.key === key && sortTerm.direction === "asc"){
               direction = "desc"
         }else if(sortTerm.key === key && sortTerm.direction === "desc"){
             direction ="asc"
         }

         setSortTerm({key,direction});
         
     }
 

     // handleSort icons 
      const handleSortIcon = (key) => {
        
        if(sortTerm.key === key) {
            return sortTerm.direction === "asc" ? 
            <FontAwesomeIcon icon={faCaretUp} style={{color:"#0078d4",marginLeft:"5px"}} />
            : <FontAwesomeIcon icon = {faCaretDown }  style={{color:"#0078d4",marginLeft:"5px"}} />
        }

        // return <FontAwesomeIcon icon={faSort}  style={{color:"#0078d4",marginLeft:"5px"}} />
        return <FontAwesomeIcon icon={faCaretDown}  style={{color:"#0078d4",marginLeft:"5px"}} />
      }
    
 
    

    // sorting data result
    const sortedData =  Array.isArray(filterData) ? filterData.sort((a,b) => {
        if(sortTerm.key){
            if(a[sortTerm.key] > b[sortTerm.key]){
                return sortTerm.direction === "asc" ? 1 : -1;
            }
            else if(a[sortTerm.key] < b[sortTerm.key]){
                return sortTerm.direction === "asc" ? -1 :1;
            }

           
        }
        return 0;
      
    }) : [];

    useEffect(() => {
    setFilterData(sortedData);
    },[filterData]);
    
   // Pagination:
   const [currentPage,setCurrentPage] = useState(1);
   const [itemsPerPage,setItemsPerPage] = useState(1);
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
  for(let i=1; i <=totalPages;i++){
    pageNumbers.push(i);
  }

  const handlePageSelect = (e) => {
    if(e.target.value === "All"){
        setItemsPerPage(getLMRewardData?.length)
    }else{
        setItemsPerPage(e.target.value)
    }
   
    

  }


  return (
    
    <>
     <div className='right side-menu'>
       
       </div>
       <div className='content-page style-gg'  style={{ height: "100vh", marginLeft:isEnlarged ? "50px" :"240px"}}>
                <div className='content' style={{
                    overflowY: "auto",
                    maxHeight: "100%",
                    padding: "10px",
                   outline:"none",
                  
                //    marginLeft:isEnlarged ? "0px" :"0px"
                    // background: "#f3f3f3"
                    // backgroundColor: "#f9f9f9"
                }}>
            <> 
        
            <div>
                <h2 style={{textAlign:"center",color:"green"}}>My Rewards</h2>
            </div>
        {
            getLMRewardMessage === "Successful" && getLMRewardData !=null   ?
            
            <>
             <div style={{marginTop:"20px"}}>
                <div style={{display:'flex' ,alignItems:"center",justifyContent:"space-between",marginBottom:'5px'}}>
                    <div>
                        <label>
                            <select onChange={(e) => handlePageSelect(e)} style={{width:"65px" ,height:"30.8px",marginRight:"5px",textAlign:"center"}}>
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>All</option>
                            </select>
                            records per page
                        </label>
                    </div>
                     <div style={{marginRight:"15px"}} className='table-filter'>
                        <label>Search:
                        <input type="search" name={searchTerm} value={searchTerm} onChange={handleSearch} />

                        </label>
                     
                     </div>
                </div>
               
                {/* <Table striped bordered hover size="sm"> */}
                   <table className='table table-bordered table-stripped table-hover'>
                   <thead>
                            <tr>
                                {/* {getLMRewardData?.length > 0 && 
                                Object?.keys(getLMRewardData[0])?.reverse().map((val,i) => {
                                    return <th key={i}>{val}</th>
                                })
                                } */}
                                <th onClick={() => handleSort("imageURL")}>Image 
                                    {handleSortIcon("imageURL")}
                                   
                                    </th>
                                <th onClick={() => handleSort("title")}> 
                                    Title 
                                    {
                                        handleSortIcon("title")
                                    }
                                 
                                    </th>
                                <th onClick={() => handleSort("rewardTitle")}>
                                    Reward Title
                                    {
                                        handleSortIcon("rewardTitle")
                                    }
                                </th>
                                <th>Issued</th>
                                <th>Redeemed</th>
                                <th>IsPointsBased</th>
                                <th onClick={() => handleSort("validFrom")}>Valid From
                                {
                                        handleSortIcon("validFrom")
                                    }
                                 </th>
                                <th onClick={() => handleSort("expiresOn")}>Expires On 
                                 {
                                    handleSortIcon("expiresOn")
                                 }
                                 </th>
                                <th></th>
                            </tr>
                    </thead>
                    <tbody>
                             {/* {
                                getLMRewardData?.length > 0 && (
                                    getLMRewardData?.map((data,i) => {
                                        return <tr key={i}>
                                        {
                                           Object?.values(data)?.length > 0 ? (<>
                                         {
                                               Object.values(data).map((item,j) => {
                                                if (typeof item === 'string' && item.includes('https')) {
                                                    return (
                                                       <>
                                                        <td key={j}>
                                                            <img src={item} alt="img" style={{ width: '40px', height: '40px' }} />
                                                        </td>
                                                       
                                                       </>
                                                    );
                                                } else {
                                                    return <>
                                                    <td key={j}>{item}</td>
                                                   
                                                    </>
                                                }
                                              
                                            })
                                         }
                                          <td style={{
                                            textAlign:"center"
                                          }}> 
                                          
                                    
                                                        <div className='btn-group'>
                                                            <button className='btn btn-success  dropdown-toggle' 
                                                             data-toggle = "dropdown"
                                                             aria-expanded = "true"
                                                             style={{display:'flex',alignItems:"center",justifyContent:"center",margin:"auto center"}}
                                                             onClick={() => handleDropdown(i)}
                                                            >
                                                                <FontAwesomeIcon icon={faCog} />
                                                              
                                                                
                                                            </button>
                                                           {
                                                            open === i && 
                                                            <ul className='dropdown-menu' id="table-drop" role="menu" style={{display:"block",right:"0px",left:"auto",width:"160px"}}>
                                                            <li>
                                                                <a href="#">
                                                                    Option one
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Option two
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Option three
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Option four
                                                                </a>
                                                            </li>

                                                        </ul>
                                                           }
                                                        </div>
                                                    </td>
                                           </>) : (<>
                                           <td style={{textAlign:"center"}}>
                                           No records found...
                                           </td>
                                           </>)
                                        }
                                        </tr>
                                    })
                                )
                            }  */}

                           {
                            // getLMRewardData?.length > 0 ? (<>
                            // filterData?.length > 0 ? (<>
                            currentItems?.length > 0 ? (<>
                            
                                {
                                    // getLMRewardData?.map((each,i) => {
                                       // filterData?.map((each,i) => {
                                        currentItems?.map((each,i) => {
                                           
                                        return <tr key = {i}>
                                            <td>
                                            <img src={each.imageURL} alt="img" style={{ width: '40px', height: '40px' }} />
                                               </td>
                                            <td>{each.title}</td>
                                            <td>{each.rewardTitle}</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>{each.isPointsBased.toString()}</td>
                                            <td>{each.validFrom}</td>
                                            <td>{each.expiresOn}</td>
                                            <td style={{
                                            textAlign:"center"
                                          }}> 
                                          
                                    
                                                        <div className='btn-group'>
                                                            <button className='btn btn-success  dropdown-toggle' 
                                                             data-toggle = "dropdown"
                                                             aria-expanded = "true"
                                                             style={{display:'flex',alignItems:"center",justifyContent:"center",margin:"auto center"}}
                                                             onClick={() => handleDropdown(i)}
                                                            >
                                                                <FontAwesomeIcon icon={faCog} />
                                                              
                                                                
                                                            </button>
                                                           {
                                                            open === i && 
                                                            <ul className='dropdown-menu' id="table-drop" role="menu" style={{display:"block",right:"0px",left:"auto",width:"160px"}}>
                                                            <li>
                                                                <a href="#">
                                                                    View
                                                                </a>
                                                            </li>
                                                          

                                                        </ul>
                                                           }
                                                        </div>
                                                    </td>
                                        </tr>
                                    })
                                }
                            </>) :(<tr>
                                <td colSpan={6} style={{textAlign:"center"}}>
                                    No Records Found.
                                </td>
                            </tr>)
                           }
                    </tbody>
                   </table>
                {/* </Table> */}

                {
                    getLMRewardData === undefined && getLMRewardMessage === "Successful" && <p style={{textAlign:"center"}}>Records Not Found</p>
                }

<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div>

    </div>
               <div className='pagination'>
                     <button onClick={() => handlePageChange(currentPage -1)} disabled= {currentPage === 1} className='btnPrev'>
                      <FontAwesomeIcon icon={faAngleLeft} />
                     </button>
                     {
                        pageNumbers?.map((number,i) => {
                            return <button onClick={() => handlePageChange(number)} className= {currentPage === number ? 'activePage' :"inActivePage"} >{number}</button>
                        })
                     }
                     <button onClick={() => handlePageChange(currentPage + 1)} disabled = {currentPage === totalPages} className='btnNext'>
                     <FontAwesomeIcon icon={faAngleRight} />
                     </button>
                </div>
</div>
              
             </div>
            </>
            : <>
               <div style={{marginTop:"20px" , display:"flex",alignContent:"center",justifyContent:"center"}}>
                 {
                    getLMRewardLoading === true && <LoaderModal show={"true"} />
                 }
               </div>
            </>
        } 

       <>
        {
        getLMRewardMessage !== "Successful" &&  getLMRewardMessage != true && getLMRewardMessage !="" && 
        <p style={{color:"red",textAlign:"center"}}>{getLMRewardMessage}</p>
        
       } 
       </>
       {/* <>
       {
        getLMRewardLoading === true && 
        <LoaderModal show={"true"} />
       }
       </> */}
     
    </>

            </div>
       </div>
    </>
  )
}

export default ViewReward
