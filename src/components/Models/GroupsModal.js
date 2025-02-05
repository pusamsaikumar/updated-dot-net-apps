import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Container, Button } from 'react-bootstrap';
import '../../Styles.css';
import '../../sites.css';
import '../../Toggle.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddAvailableGroupsAPI, getFindShopperByIdApi, getUserAvailableGroupsAPI, getUserGroupsAPI } from '../redux/API';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faRemove, faSave, faCancel, faWarning, faClose, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetcher } from 'react-router-dom';


// ViewFindShopperModelPopup.js


const GroupsModal = ({
    show,
    handleClose,
    clientName, 
    selectedGroups,
    successMsg,
    setShowNotificationError

}) => {


const userId =  typeof(selectedGroups) === "object"  ? selectedGroups?.userDetailId : 0;

const dispatch = useDispatch();
const getUserGroupsData = useSelector((state) => state.getUserGroupsData);
const getUserAvailableGroupsData = useSelector((state) => state.getUserAvailableGroupsData);
const getUserGroupsLoading = useSelector((state) => state.getUserGroupsLoading);
const getUserAvailableGroupsLoading = useSelector(state => state.getUserAvailableGroupsLoading)




const getUserNames = getUserGroupsData && getUserGroupsData?.map((each) => each?.name) 
const filteredAvailableGroups = getUserAvailableGroupsData && getUserAvailableGroupsData?.filter((group,index,self) => {
return !getUserNames.includes(group?.name) &&
self.findIndex(g => g.name === group.name) === index;
})

const [selectedUser,setSelectedUser] = useState([]);
const [removedUser,setRemovedUser] = useState([]);
const  [removeDropOpen,setRemoveDropOpen] = useState(false);
const [searchVal,setSearchVal] = useState("");

useEffect(() => {
  if(getUserGroupsData?.length > 0){
     setSelectedUser(getUserGroupsData?.map((each) => ({
        name:each?.name,
        clubId:each?.clubId
     })));
  }
},[getUserGroupsData])
const handleSelectedUsergroup = (e) => {
    // const options = Array.from(e.target.options);
    // const selected = options.filter(option => option.selected).map((option) =>({
    //     name:option.name,
    //     clubId:option.clubId
    // }));
    // setSelectedUser(selected)

};


const placeholder =  selectedUser?.length === 0 ? "Select some options" :"" ;

const isRemovedFromUser = (groupName) => {
    return selectedUser?.find((item) => item.name == groupName);
}
const handleRemoveSelectedUser = (groupName) => {

    // find to deleted group
    let removedGroup = selectedUser?.find((item) => item.name == groupName);
    if(removedGroup) {
 // filter remaining items 
 setSelectedUser((selectedUser?.filter((item) => item.name !== groupName)));
 setRemovedUser((prevRemoved) => {
     const isAlreadyRemoved = prevRemoved?.some((item) => item.name === groupName);
     if(!isAlreadyRemoved){
        return [...prevRemoved,removedGroup]
     }
     return [removedGroup];
 })
    }
    
   
}


let filterdata = searchVal === "" 
    ? getUserGroupsData 
    : getUserGroupsData?.filter((each) => {
        // Check if the name contains the search value (case insensitive)
        return each?.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase());
    });



// onfocus
const handleOnFocusDropDown = () => {
    setRemoveDropOpen(true);

}
const handleOnBlurDropDown = () => {
    //setRemoveDropOpen(false);
    setTimeout(() => {
        setRemoveDropOpen(false)
    }, 200);
}

const handleBacketToSelectedUser = (item) => {
 
  
    if (!selectedUser.some(user => user.clubId === item?.clubId)) {
      return   setSelectedUser([...selectedUser, {name:item?.name,clubId:item?.clubId }]);
      }
     
}




const [selectAvailGroup,setSelectAvailGroup] = useState([]);
const handleSelectedItems = (each) => {
    setSelectAvailGroup((prev) => {
        const alreadySelected = prev.some((item) => item.clubId === each?.clubId);

         return alreadySelected ?
                prev.filter((item) => item.clubId !== each?.clubId)
                : [...prev,each]
    });
}

const handleRemoveDrop = (e) => {
    var input = e.target.value;

    setSearchVal(input)
    
    

}
console.log("userID",userId);
const handleSubmitAvailableGroups =(e) => {
e.preventDefault();
   if(selectAvailGroup?.length > 0 && userId !== 0 && clientName != "" ) {
     selectAvailGroup?.map((each) => {
        return dispatch(AddAvailableGroupsAPI(clientName,userId,each?.clubId));
     });
   successMsg("Successfully added available shopper groups.")
   setShowNotificationError(true);
    handleClose();
   }
}


    return (
        <div className={`modal ${show === true ? "show" : ""}`} style={{ display: show ? "inline-block" : "none", outline: "none" }}>
            <div
                className="modal-backdrop"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "#000",
                    zIndex: 1040,
                    opacity: 0.2

                }}
            />

            <div className="modal-dialog" role="document"
                style={{
                    zIndex: 1050,
                    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    width: "600px",
                    top:"50px",
                    borderRadius: "0px"
                    // transform: "translate(-50%, -50%)",

                    // padding: "20px",
                    // borderRadius: "8px"
                }}

            >
                <div className="modal-content" style={{ width: "900px", background: "#f3f3f3f3", padding: "15px 40px 30px", position: "absolute", left: "0px", top: "0px" }}>
                    <div className="modal-header" style={{ padding: "15px", minHeight: "16.43px", height: "65px", width: "820px", border: "none", position: "relative", background: "#fff" }}>

                        <div>
                            <h2 style={{ fontWeight: "400", fontSize: "16px", display: "flex", alignItems: "center" }}>
                                <FontAwesomeIcon icon={faUser} style={{ color: "#505458", marginRight: "5px" }} ></FontAwesomeIcon>
                                <span style={{ color: "#505458" }}>{"Shopper Group Details"}</span>

                            </h2>
                            <button type="button" className='close' onClick={handleClose}
                                style={{
                                    color: "#ccc",
                                    border: "none",
                                    outline: "none",
                                    background: "#fff",
                                    position: 'absolute',
                                    top: "10px",
                                    right: "10px"
                                }}
                            >
                                <span aria-hidden="true" style={{ color: "#ccc", border: "none", outline: "none" }}>×</span>
                            </button>
                        </div>



                        {/* 
            <button type="button" className='close' onClick={handleClose}
              style={{
                color: "#ccc",
                border: "none",
                outline: "none",
                background: "#fff",
                position:'absolute',
                top:"10px",
                right:"10px"
              }}
            >
              <span aria-hidden="true" style={{ color: "#ccc", border: "none", outline: "none" }}>×</span>
            </button>
            <h2 style={{
              margin:"10px 0px",
              fontSize:"30px",
              fontWeight:"300",
              fontFamily:"Open Sans",
              color:"#505458",
              height:"35px"
              }}>View <strong>Shopper</strong> Details</h2> */}

                    </div>
                    <div className="modal-body" style={{ width: "820px", position: "relative", padding: "12px", background: "#fff" }}>
                        <div id="viewContent">
                            <div className='' style={{ padding: "0px" }}>
                                <div className='' style={{ background: "#fff", padding: "12px" }}>
                                    <div style={{position:"relative",top:"0px",left:"0px"}}>
                                        <div className='row'>
                                          {/* <div className='col-sm-12'>
                                            <div className='form-group' style={{textAlign:"start"}}>
                                                <label>User Groups</label>
                                                <select id="userGroup" name='userGroup' className='form-select' style={{width:"100%",outline:"none",border:"none",height:"34px",display:"none"}} multiple
                                                         onChange={(e) => handleSelectedUsergroup(e)}
                                                        >
                                                    {
                                                        getUserGroupsData?.length > 0 &&
                                                        getUserGroupsData?.map((each,i) => {
                                                            return <option key={i} value={each?.name} id={each?.clubId} selected>{each?.name}</option>
                                                        }) 
                                                    }
                                                </select>
                                               
                                                <div className='' style={{background:"#fff",border:"1px solid #ccc"}}>  
                                                    <ul className='' style={{listStyle:"none",textDecoration:"none",padding:"6px 12px",display:"block",height:"100%"}}>
                                                        <li className='' >
                                                        <div className=''  id="selectGroups" style={{width:"100%",outline:"none",border:"none",height:"100%",display:"block"}}>
                                                       {
                                                        selectedUser?.length > 0 &&
                                                        selectedUser?.map((each) => {
                                                            return <span  className='listitem'style={{
                                                                border: "1px solid #ccc",
                                                                marginRight: "5px",
                                                                padding: "5px",
                                                                display: "inline-block",
                                                              }}>
                                                                {each?.name}
                                                             <FontAwesomeIcon icon={faTimes} 
                                                              style={{ marginLeft: "5px", cursor: "pointer" }}
                                                             onClick={() => handleRemoveSelectedUser(each?.name)} 
                                                                
                                                                />
                                                            </span>
                                                           
                                                        })
                                                       }
                                                       <input type="text" style={{width:"auto"}} />
                                                </div>
                                                            <input type="text" placeholder='Select some options' className='deafult'autoComplete='off' style={{width:"100%",outline:"none",border:"none",height:"34px",display:"block"}} /> 
                                                        </li> 
                                                    </ul>
                                                </div>
                                            </div>
                                          </div> */}
                                          <div className='col-sm-12'>
                                            <div className='form-group' style={{textAlign:"start"}}>
                                                <label>User Groups</label>
                                                <select id="userGroup" name='userGroup' className='form-select' style={{width:"100%",outline:"none",border:"none",height:"34px",display:"none"}} multiple
                                                         onChange={(e) => handleSelectedUsergroup(e)}
                                                        >
                                                    {
                                                        getUserGroupsData?.length > 0 &&
                                                        getUserGroupsData?.map((each,i) => {
                                                            return <option key={i} value={each?.name} id={each?.clubId} selected>{each?.name}</option>
                                                        }) 
                                                    }
                                                </select>
                                               
                                                <div className='' style={{background:"#fff",border:"1px solid #ccc"}}>  
                                                    <ul className='' style={{listStyle:"none",textDecoration:"none",padding:"6px 12px",display:"block",height:"100%",margin:"0px"}}>
                                                        <li className='' >
                                                        <div className=''  id="selectGroups" 
                                                        style={{width:"100%",
                                                            outline:"none",
                                                            border:"none",
                                                            height:"100%",
                                                            display:"flex",
                                                            alignItems:"center",
                                                            flexWrap:"wrap",
                                                            gap:"5px"

                                                        }}>
                                                       {
                                                        selectedUser?.length > 0 &&
                                                        selectedUser?.map((each) => {
                                                            return <span  className='listitem'style={{
                                                                border: "1px solid #ccc",
                                                                marginRight: "5px",
                                                                padding: "5px",
                                                                display: "inline-block",
                                                               
                                                              
                                                              }}>
                                                                {each?.name}
                                                             <FontAwesomeIcon icon={faTimes} 
                                                              style={{ marginLeft: "5px", cursor: "pointer" }}
                                                             onClick={() => handleRemoveSelectedUser(each?.name)} 
                                                                
                                                                />
                                                            </span>
                                                           
                                                        })
                                                       }
                                                       <input  className='search' type="text" name="searchVal"
                                                        value={searchVal}
                                                          onFocus={() => handleOnFocusDropDown()}
                                                         onBlur={() => handleOnBlurDropDown()}
                                                        onChange={(e) => {
                                                        handleRemoveDrop(e);
                                                       // setRemoveDropOpen(true)

                                                    
                                                       }} placeholder={placeholder} style={{minWidth:"150px",border:'none',outline:"none",height:"100%",flex:"1",cursor:"pointer"}} />
                                                </div>
                                                            {/* <input type="text" placeholder='Select some options' className='deafult'autoComplete='off' style={{width:"100%",outline:"none",border:"none",height:"34px",display:"block"}} /> */}
                                                        </li> 
                                                    </ul>
                                                </div>
                                            </div>

                                            {
                                                searchVal != "" && filterdata?.length === 0 &&
                                                <>
                                                      <div className='' id="" style={{listStyle:"none" ,textDecoration:"none",background:"#f3f3f3",textAlign:"start",padding:"0px"}}>
                                                    
                                                      
                                                         
                                                                <span  style={{width:"790px",padding:"5px",color:"#777", background:"#F4F4F4",display:"list-item"}}>{`No matched results ${searchVal}`}</span>
                                                    
                                                    
                                                </div>
                                         
                                                </>
                                            }
                                            {
                                                // (removedUser?.length > 0 &&  removeDropOpen === true && searchVal === "") &&
                                                (removeDropOpen === true && filterdata?.length > 0 ) &&
                                                 <>
                                                      <ul className='' id="" style={{listStyle:"none" ,textDecoration:"none",background:"#f3f3f3",textAlign:"start",padding:"0px"}}>
                                                    {
                                                        //removedUser?.length > 0 && 
                                                        getUserGroupsData?.length > 0 &&
                                                        //removedUser?.map((each,i) => {
                                                          filterdata?.map((each,i) =>{
                                                            return <li key={i} 
                                                            className={isRemovedFromUser(each?.name) ? "btnstyleList active": "btnstyleList inactive"}
                                                            onMouseDown={( ) => {
                                                                handleBacketToSelectedUser(each);
                                                                setRemoveDropOpen(false);   
                                                                setSearchVal("")
                                                            }}
                                                            >
                                                                <span  className=''  
                                                                onClick={() => {
                                                                
                                                                    // handleBacketToSelectedUser(each);
                                                                    // setRemoveDropOpen(false);   
                                                                 }}

                                                                 style={{
                                                                    width:"790px",
                                                                    padding:"5px",
                                                                  
                                                                }} 
                                                            
                                                               
                                                                
                                                                >{each?.name}
                                                                </span>
                                                           
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                         
                                                 
                                                 </>
                                            }
                                       
                                             {/* <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Dropdown
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                        <a className="dropdown-item" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </div> */}

                                      
                                          </div>
                                        </div>
                                        <div className='row' style={{marginTop:"10px"}}>
                                            <div className='col-sm-12'>
                                            <div className='form-group' style={{textAlign:"start",width:"780px",height:"300px",overflow:"scroll"}}>
                                                <label>Available Shopper Groups</label>
                                                <table>
                                                    <tbody>
                                                        {
                                                            getUserAvailableGroupsData?.length > 0 &&
                                                           <>
                                                             {
                                                           // getUserAvailableGroupsData?.map((each,i) => {
                                                            filteredAvailableGroups?.map((each,i) => {
                                                                return <tr key={i} >
                                                                    <td>
                                                         <div style={{display:"flex",alignItems:"center",marginLeft:"5px" }}>
                                                         <input type='checkbox' 
                                                          style={{width:"20px",height:"20px",marginRight:"10px" ,
                                                            background:"#rgb(255, 255, 255)",
                                                            border: "2px solid #rgb(255, 255, 255)",
                                                            outline:"2px solid #rgb(255, 255, 255)"}} 
                                                           
                                                           checked= {selectAvailGroup?.some((item) => item.clubId === each?.clubId)}
                                                          
                                                           onChange={() => handleSelectedItems(each)}
                                                         />             
                                                            
                                                            <label style={{fontSize:"13px"}}>{each?.name}</label>
                                                          </div>
                                                              
                                                        </td>
                                                                </tr>
                                                            })
                                                             }
                                                           </>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>            
                                        </div>
                                        <div className='row' style={{marginTop:"10px"}}>
                                             <div style={{textAlign:"end",gap:"5px"}}>
                                                <button  className='btn btn-light' 
                                                style={{background:"#F0F0F0",padding:"6px 12px",marginRight:"5px",color:"#5B5B5B"}}
                                                 onClick={() => handleClose()}
                                                >
                                                    <FontAwesomeIcon 
                                                    icon={faRemove} style={{color:"#5B5B5B",fontSize:"13px",fontWeight:"300",marginRight:"3px"}} />
                                                    Cancel
                                                    </button>
                                                <button  className='btn btn-success' onClick={(e) => handleSubmitAvailableGroups(e)}>
                                                <FontAwesomeIcon icon={faSave}  style={{color:"#fff",fontSize:"13px",fontWeight:"300",marginRight:"3px"}} />
                                                    Save</button>
                                             </div>
                                        </div>
                                    </div>





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GroupsModal;