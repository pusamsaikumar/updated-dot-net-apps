import React, { useEffect, useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUsers, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye, faWarning, faRightLong, faCheck, faPlus, faAngleDown, faArrowUpFromGroundWater } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getClientStoresAPI, getFindShopperAPI, getFindShopperByIdApi, GetUserClipsAndRedemptionsDatesAPI, getUserRewardCouponsAPI, userHistoryAPI, getUserBasketTransactionAPI, getFindShopperPaginationAPI, getUserGroupsAPI, getUserAvailableGroupsAPI, GetProductCategoriesAPI } from '../redux/API';
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
import { toBeRequired } from '@testing-library/jest-dom/matchers';


const TopShoppers = ({
    clientName, isEnlarged
}) => {

    const getClientStoresData = useSelector((state) => state.getClientStoresData);
    const getClientStoresLoading = useSelector((state) => state.getClientStoresLoading);
    const getclientStoresMessage = useSelector((state) => state.getclientStoresMessage);

   const getProductCategoriesData = useSelector((state) => state.getProductCategoriesData);
   const  getProductCategoriesMessage  = useSelector( state => state.getProductCategoriesMessage);
   const getProductCategoriesLoading = useSelector(state => state.getProductCategoriesLoading);
    const getTopShoppersData = useSelector(state => state.getTopShoppersData);
    const getTopShoppersMessage = useSelector(state => state.getTopShoppersMessage);
    const getTopShoppersLoading = useSelector(state => state.getTopShoppersLoading);

    const dispatch = useDispatch();
    const [value, setValue] = useState( {
         
            fromDate:"",
            toDate:"",
            noOfRecords:"",
            storeId:0,
            orderByDirection:"",
            departmentId:0
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
                fromDate: pastDay.toISOString().split('T')[0],
                toDate: currentDate.toISOString().split('T')[0]
            }
        }
        const { fromDate, toDate } = getPastCurrentDate();
        setValue({
            ...value,
            ["fromDate"]: fromDate,
            ["toDate"]: toDate
        })

    }, [])
    // useEffect(()=>{
    //     if(clientName === "Veritra RSA"){
    //         dispatch(getClientStoresAPI(clientName))
    //         dispatch(GetProductCategoriesAPI(clientName))
    //     }
       
    // },[dispatch,clientName])
    // useEffect(() => {
    //        // dispatch(getClientStoresAPI(clientName))
    //        // dispatch(GetProductCategoriesAPI(clientName))
    //     }, [dispatch]);
    
        useEffect(() => {
           dispatch(getClientStoresAPI())
            dispatch(GetProductCategoriesAPI())
        }, [dispatch]);
    
    console.log("value", value);

    const [toggleDrop,setToggleDrop] = useState(true);
    const handleToggleDropDown = () => {
        setToggleDrop(!toggleDrop)
    }

    const handleInput =(e,name) => {
        setValue({
            ...value,
            [name]:e.target.value
        })
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
                                             onChange={(e) => handleInput(e,"fromDate")}
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
                                            onChange={(e) => handleInput(e,"toDate")}
                                            style={{ width: "153px" }} />
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <div className='form-group'>
                                            <label>Shoppers count</label>
                                            <select id="noOfRecords" name="noOfRecords" value={value?.noOfRecords}
                                             onChange={(e) => handleInput(e,"noOfRecords")}
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
                                            <select id="orderByDirection" name="orderByDirection" value={value?.orderByDirection} 
                                            onChange={(e) => handleInput(e,"orderByDirection")}
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
                                            <select id="departmentId" value={value?.departmentId} name="departmentId"
                                            onChange={(e) => handleInput(e,"departmentId")}
                                            style={{ width: "143px" }} >
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
                                            <label>Stores</label>
                                            <select id="userCount" name="userCount" style={{ width: "153px", display: "block" }} >
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
                                    <br />
                                    <div className='col-sm-1'>
                                        <label>&nbsp;</label>
                                        <button className='btnSearch' style={{ width: "87px", display: "block" }} >Reset</button>

                                    </div>
                                    <div className='col-sm-1'>
                                        <label>&nbsp;</label>
                                        <button className='btnCancel' style={{ width: "87px", display: "block" }} >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                            <button className='btnSearch' style={{ width: "220px" }}    >
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
                                        display:toggleDrop ? "block" :"none",
                                    
                                      }}
                                    >
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <label className='itemLabel'>
                                                            {"Show "}
                                                            <select
                                                                className='itemSelect'
                                                                style={{ width: "65px", height: "30.8px", textAlign: "center" }}
                                                            >
                                                                <option value={"10"}>10</option>
                                                                <option value={"25"}>25</option>
                                                                <option value={"50"}>50</option>
                                                                <option value={"100"}>100</option>
                                                            </select>
                                                            {"entries"}
                                                        </label>
                                                    </div>
                                                    <div style={{ textAlign: "end" }}>
                                                        <button className="" style={{ background: "black", color: "#FFFFFF" }}>Download</button>
                                                    </div>
                                                    <div className='' style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                                        <label style={{marginRight:"-15px"}} >Search:
                                                            <input type="search"  name={""} value={""} onChange={(e) => {
                                                                //  handleSearch(e);

                                                            }} />

                                                        </label>

                                                    </div>
                                                    <div>
                                                        <table className='table table-bordered table-stripped table-hover' cellSpacing={"0"}>
                                                            <thead>
                                                                <tr>
                                                                    <th>First Name</th>
                                                                    <th>Last Name</th>
                                                                     <th>Email</th>
                                                                     <th>Preferred Store</th>
                                                                     <th>Amount</th>
                                                                     <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                            </tbody>
                                                        </table>
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

            </div>
        </>
    )
}


export default TopShoppers