import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';


const CustomPaginationDataTableForProducts = (
    {
        data=[],
        columns =[],
        isEnableSearch=true,
        DefaultrowsPerPage=5

    }
) => {
     const [filterData,setFileterData] = useState(data);
        const [currentPage,setCurrentPage] = useState(1);
        const [rowsPerPage,setRowsPerPage] = useState(5);
        const [searchVal,setSearchVal] = useState("");
    
        useEffect(() => {
            setFileterData(data)
        },[data])
        // filterdata pagination:
        useEffect(() => {
            if(searchVal) {
                const filtered = Array.isArray(data)
                ? data.filter((item) =>
                    columns.some((column) => {
                        // Check if column.selector is a valid function
                        if (typeof column?.selector !== 'function') {
                            console.warn('Invalid selector for column:', column);
                            return false;
                        }
        
                        // Get the value from the column selector
                        const val = column.selector(item)?.toString()?.toLowerCase();
                        return val?.includes(searchVal?.toLowerCase());
                    })
                  )
                : [];
        
            setFileterData(filtered);
            setCurrentPage(1);
        
            }
            
        }, [data, columns, searchVal]);
        
       
        // Calculate data for row page:
        const firstIndexItem = (currentPage-1) * rowsPerPage;
        const lastIndexItem = firstIndexItem + rowsPerPage;
        const currentItems =  Array.isArray(filterData)
        ? filterData.slice(firstIndexItem, lastIndexItem)
        : [];
    
    
        
            
       
         // Total pages
        
         const totalPages = Math.ceil(filterData?.length / rowsPerPage);
       
        
       
      
        
         // PageNumbers:
        const pageNumbers = Array.from({length:totalPages},(_,i) => i+1);
    
        
         const handlePageChange = (page) => {
             setCurrentPage(Number(page))
           
         }
    console.log("pageNumber",pageNumbers ,"current page",currentPage,"current",currentItems)
        
        // change rows per page data:
        const handleRowsChangeData = (e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
        }
       // handlesearch
       const handleSearch=(e)=> {
        setSearchVal(e.target.value);
        setCurrentPage(1);
       // handlesearchFilter(e.target.value)
       }
       const handlesearchFilter = (searchVal) => {
        if(!searchVal){
            setFileterData(data)
            return
        }
        const filtered = Array.isArray(data)
        ? data?.filter((item) =>
            columns.some((column) => {
                // Ensure the selector is a valid function
                if (typeof column?.selector !== 'function') {
                    console.warn('Invalid selector for column:', column);
                    return false;
                }
    
                // Get the value from the column's selector
                const val = column?.selector(item)?.toString()?.toLowerCase();
                return val?.includes(searchVal.toLowerCase());
            })
          )
        : [];
            setFileterData(filtered);
            setCurrentPage(1);
       }
        // display message no of pages:
        const filterEntries = filterData?.length || 0; 
        const totalEntrie = data?.length || 0;
    
        const displayMessage = searchVal != ""
        ? `Showing ${firstIndexItem + 1} to ${lastIndexItem <= filterEntries ? lastIndexItem : filterEntries} of ${filterEntries} entries (filtered from ${totalEntrie} total entries)`
        : `Showing ${firstIndexItem + 1} to ${lastIndexItem<= totalEntrie ? lastIndexItem : totalEntrie} of ${totalEntrie} entries`;
    
    
        // const displayMessage = searchVal != "" 
        // ? `Showing ${firstIndexItem + 1} to ${lastIndexItem <= filterEntries ?  lastIndexItem : filterEntries} of ${filterEntries} entries (filtered from ${totalEntrie} total entries)  `  
        // : `Showing ${firstIndexItem + 1 } to ${lastIndexItem <= totalEntrie ? lastIndexItem : totalEntrie} of ${totalEntrie} entries` 
    
       
        // custom style 
        const customStyles = {
            table:{
                style:{
                    border:"1px solid #ddd",
                    overflow:"visible"
                }
            },
            headRow:{
                style:{
                    borderLeft:"1px solid #ddd"
                }
            },
            headCells:{
                style:{
                    borderLeft:"1px solid #ddd",
                    fontSize:"15px",
                    fontWeight:"600",
                    position: "relative",
                    color:"#5B5B5B",
                    padding: "8px",
                    "&:hover svg": {
                        visibility: "visible", // Ensures icons are visible
                    },
                    "& svg": {
                        visibility: "visible", // Always show sort icons
                    },
                }
            },
            rows:{
                style:{
                    borderLeft:"1px solid #ddd",
                    textAlign:"center"
                }
            },
            cells:{
                style:{
                    borderRight:"1px solid #ddd",
                    overflow:"visible"
                }
            }
        }
  return (
    <div>
         <div  className='dataTableContainer'  style={{position:"relative",overflow:"visible"}} >
      <DataTable
    
        columns={columns}
        data={currentItems}
        pagination = {false}
    //    pagination
    //     paginationComponent={() => (
    //         <div className='customPagination'>
            
    //         <span className='paginationMessage'>{displayMessage}</span>
          
    //    <div className='pagination'
    //    style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}
    //    >
    //      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='btnPrev'>
    //                                                  <FontAwesomeIcon icon={faAngleLeft} />
    //                                              </button>
         
    //                                              {pageNumbers.length > 10 ? (
    //                                                  <>
    //                                                      {currentPage > 3 && <button className="inActivePage" onClick={() => handlePageChange(1)}>1</button>}
    //                                                      {currentPage > 4 && <span className="inActivePage">...</span>}
    //                                                      {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, pageNumbers.length)).map((number) => (
    //                                                          <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
    //                                                              {number}
    //                                                          </button>
    //                                                      ))}
    //                                                      {currentPage < pageNumbers.length - 3 && <span className='inActivePage'>...</span>}
    //                                                      {currentPage < pageNumbers.length - 2 && <button className="inActivePage" onClick={() => handlePageChange(pageNumbers.length)}>{pageNumbers.length}</button>}
    //                                                  </>
    //                                              ) : (
    //                                                  pageNumbers.map((number) => (
    //                                                      <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'activePage' : "inActivePage"}>
    //                                                          {number}
    //                                                      </button>
    //                                                  ))
    //                                              )}
         
    //                                              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='btnNext'>
    //                                                  <FontAwesomeIcon icon={faAngleRight} />
    //                                              </button>
    //    </div>
    //   </div>
    //     )}
        customStyles={customStyles}
 
        highlightOnHover
         sortable
         
      />
    </div>
          
        {/* CUSTOM PAGINATION */}
        <div className='customPagination' style={{position:"relative",display:"inline !important",unicodeBidi:"normal"}}>
            
              <span className=''>{displayMessage}</span>
            
         <div className='pagination'
         style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}
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
           
                                                   <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='btnNext'>
                                                       <FontAwesomeIcon icon={faAngleRight} />
                                                   </button>
         </div>
        </div>
    </div>
  )
}

export default CustomPaginationDataTableForProducts