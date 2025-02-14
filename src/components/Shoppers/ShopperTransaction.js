import React, { useEffect, useState } from 'react';
import UserImage from "../../assets/images/UserImage.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCog, faCaretDown, faCaretUp, faSort, faAngleLeft, faAngleRight, faUser, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBasketTransactionAPI, GetUserClipsAndRedemptionsDatesAPI, getUserPurchasedCouponsAPI, getUserPurchasedProductsAPI, getUserRewardCouponsAPI, getUserRewardsAPI, userHistoryAPI } from '../redux/API';
import { useLocation, useParams } from 'react-router-dom';
import LoaderModal from '../Models/LoaderModal';

const ShopperTransaction = (
  {
    clientName,
    // handleSort,
    // handleSortIcon,
    convertToMMddyyyystringFormat,
    isEnlarged,
    formatNumbers


  }
) => {
  const [activeTab, setActiveTab] = useState("Timeline");
  
 
  // const { userId } = useParams();
   
  const location = useLocation();

 
  
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  //const userDetailId = location?.state?.userDetailId || userId;
  const userDetailId =  userId;
  const retailerName = location?.state?.retailerName;
 
  const [transaction, setTransaction] = useState({
    Userid:userDetailId,
    basketDataId:0,
    transactionMsg:""
  });


  const dispatch = useDispatch();
  const getUserClipsAndRedemptionData = useSelector(state => state.getUserClipsAndRedemptionData);
  const getUserClipsAndRedemptionLoading = useSelector(state => state.getUserClipsAndRedemptionLoading);
  const userRewardCouponsData = useSelector(state => state.userRewardCouponsData);
  const userRewardCouponsLoading = useSelector(state => state.userRewardCouponsLoading);

  const userHistoryData = useSelector(state => state.userHistoryData);
  const useHistoryLoading = useSelector(state =>state.useHistoryLoading);
  const getUserBasketTransactionsData = useSelector(state => state.getUserBasketTransactionsData);
  const getUserBasketTransactionsMessage = useSelector(state => state.getUserBasketTransactionsMessage);
  const getUserBasketTransactionsLoading = useSelector(state => state.getUserBasketTransactionsLoading);
 


  const key = getUserBasketTransactionsData.length > 0 && getUserBasketTransactionsData[0].dropDownKey ;
  const Name = getUserBasketTransactionsData.length > 0 && getUserBasketTransactionsData[0].dropDownName ;
  
  const [value, setValue] = useState({
    UserDetailID: 0,
    firstName: "",
    lastName: "",
    email: "",
    member: "",
    memberSince: "",
    totalSpent: 0,
    rank: 0,
    noOfBaskets: 0,
    avgBaskets: 0,
    clips: 0,
    redemptions: 0,
    basketDrop: { label: key, Name: Name }
  });




  useEffect(() => {
    if(getUserBasketTransactionsData?.length > 0) {
     // setTransaction(getUserBasketTransactionsData[0]?.dropDownKey);
     setTransaction({
      Userid:userDetailId,
      basketDataId:getUserBasketTransactionsData[0]?.basketDataId,
      transactionMsg:getUserBasketTransactionsData[0]?.dropDownKey
     })
      setValue({
        ...value,
        basketDrop:{label:getUserBasketTransactionsData[0]?.dropDownKey,Name:getUserBasketTransactionsData[0]?.dropDownName}
      
      })
    }
  },[dispatch,getUserBasketTransactionsData])

  // useEffect(() => {
  //   if(value?.basketDrop?.label &&clientName){
  //     dispatch(getUserPurchasedProductsAPI(value?.basketDrop?.label, clientName));
  //     dispatch(getUserPurchasedCouponsAPI(value?.basketDrop?.label, clientName))
  //   }
  

  // },[dispatch,value?.basketDrop?.label,clientName]);
 


 

  const getUserRecentPurchasedProductsData = useSelector((state) => state.getUserRecentPurchasedProductsData);
  const getUserRecentPurchasedProductsLoading = useSelector((state) => state.getUserRecentPurchasedProductsLoading)
  const getUserPurchasedCouponData = useSelector(state => state.getUserPurchasedCouponData);

  const getLMRewardsWithMemberNumberData = useSelector(state => state.getLMRewardsWithMemberNumberData);
  
  


  useEffect(() => {
    if (clientName && userDetailId) {
      dispatch(userHistoryAPI(userDetailId, clientName));
      dispatch(GetUserClipsAndRedemptionsDatesAPI(userDetailId));
      dispatch(getUserRewardCouponsAPI(userDetailId));
      dispatch(getUserBasketTransactionAPI(userDetailId, clientName))
    }
  }, [dispatch, clientName, userDetailId])



  useEffect(()=> {
    if(value.member && clientName){
      dispatch(getUserRewardsAPI(value.member,clientName))
    }
    
  },[dispatch,,value.member,clientName])


  useEffect(() => {
    if (userHistoryData && Array.isArray(userHistoryData) && userHistoryData.length > 0 && clientName !== "") {
      const firstEntry = userHistoryData[0]; // Simplify by using a variable for the first item

      setValue({
        UserDetailID: firstEntry?.userDetailId || 0,
        firstName: firstEntry?.firstName || "",
        lastName: firstEntry?.lastName || "",
        email: firstEntry?.userName || "",
        member: firstEntry?.barcodeValue
          || "",
        totalSpent: firstEntry?.totalAmount || 0,
        rank: firstEntry?.userRank || 0,
        memberSince: firstEntry?.createdDate?.slice(0, 10) || "",
        noOfBaskets: firstEntry?.totalbasketCount || 0,
        avgBaskets: firstEntry?.avgBasketsAmount || 0,
        clips: firstEntry?.clips || 0,
        redemptions: firstEntry?.redemptions || 0
      });

    } else {
      // Reset values when data is unavailable or invalid
      setValue({
        firstName: "",
        lastName: "",
        email: "",
        member: "",
        memberSince: "",
        totalSpent: 0,
        rank: 0,
        noOfBaskets: 0,
        avgBaskets: 0,
        clips: 0,
        redemptions: 0
      });
    }
  }, [userHistoryData]);

  const handleInput = (e, name) => {
    setValue((prev) => {
      return {
        ...prev,
        [name]: e.target.value
      }
    })
  };

  
  useEffect(() => {
    if(transaction?.basketDataId !== 0  &&clientName !=""){
      //dispatch(getUserPurchasedProductsAPI(value?.basketDrop?.label, clientName));
      //dispatch(getUserPurchasedCouponsAPI(value?.basketDrop?.label, clientName));
      dispatch(getUserPurchasedProductsAPI(transaction?.transactionMsg, clientName));
      dispatch(getUserPurchasedCouponsAPI(transaction?.transactionMsg, clientName));
    }
  

  },[dispatch,transaction,clientName]);

 

  const rewardSpent = getLMRewardsWithMemberNumberData?.length > 0 ?  parseFloat(getLMRewardsWithMemberNumberData[0]?.rewardQtyAmountMoney).toFixed(2) : 0;
  const pointsAvailable = getLMRewardsWithMemberNumberData?.length > 0 ?  formatNumbers(getLMRewardsWithMemberNumberData[0]?.pointsPerEach) : 0;


  // PAGINATION

  
    // sorting ,filter,searching 
    const [searchTerm, setSearchTerm] = useState("");
    const [filterProductData, setFilterProductData] = useState(getUserRecentPurchasedProductsData || []);
    const [filterCouponData,setFilterCouponData] = useState(getUserPurchasedCouponData || []);
    const [fiterLoyalityRewardData,setFilterLoyalityRewardData] = useState(userRewardCouponsData || []);
    const [filterClipsRedeemsData,setFilterClipsRedeemsData] = useState(getUserClipsAndRedemptionData || []);
    const getUserRecentPurchasedProductsMessage = useSelector(state => state.getUserRecentPurchasedProductsMessage);
    const getUserPurchasedCouponMessage = useSelector(state => state.getUserPurchasedCouponMessage);

    const [sortTerm, setSortTerm] = useState({
        key: "", direction: "asc"
    });

    // const handleSearch = (e) => {
    //     setSearchTerm(e.target.value);
    //     handleSearchFilter(e.target.value);
    // }

    // const handleSearchFilter = (searchTermValue) => {
    //     if (!searchTermValue) {
    //         setFilterData(getFindShopperData);
    //         return;
    //     }
    //     const filter = getFindShopperData?.filter(item => {
    //         return Object.values(item).some((val) => {
    //             return val.toString().toLowerCase().includes(searchTermValue.toString()) ||
    //                 val.toString().toUpperCase().includes(searchTermValue.toString()) ||
    //                 val.toString().includes(searchTermValue.toString())
    //         })
    //     });
    //     setFilterData(filter);

    // }
    useEffect(() => {
        if (getUserRecentPurchasedProductsMessage === "Successful") {
            let updatedata = getUserRecentPurchasedProductsData;
            setFilterProductData(updatedata);
        }
        if(getUserPurchasedCouponMessage === "Successful"){
            let data = getUserPurchasedCouponData;
            setFilterCouponData(data);
        }
    }, [
      getUserRecentPurchasedProductsData, 
      getUserRecentPurchasedProductsMessage,
      getUserPurchasedCouponData,
      getUserPurchasedCouponMessage
    ]);


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

        // return <FontAwesomeIcon icon={faSort}  style={{color:"#65BBD6",marginLeft:"5px"}} />
        return <FontAwesomeIcon icon={faCaretDown} style={{ color: "#65BBD6", marginLeft: "5px" }} />
    }

   

  





 
    useEffect(() => {
      // Sort `getUserRecentPurchasedProductsData` directly when `sortTerm` changes
      const sortedData = Array.isArray(getUserRecentPurchasedProductsData) ? [...getUserRecentPurchasedProductsData].sort((a, b) => {
          if (!sortTerm.key) return 0;
          if (a[sortTerm.key] > b[sortTerm.key]) return sortTerm.direction === "asc" ? 1 : -1;
          if (a[sortTerm.key] < b[sortTerm.key]) return sortTerm.direction === "asc" ? -1 : 1;
          return 0;
      }) : [];
      
      setFilterProductData(sortedData);
  
  }, [sortTerm, getUserRecentPurchasedProductsData]);


 

    // Pagination:
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(filterProductData)
        ? filterProductData.slice(indexOfFirstItem, indexOfLastItem)
        : [];
    const totalPages = Math.ceil(filterProductData?.length / itemsPerPage);



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }




     // fiter coupons data:
  useEffect(() => {

    if(Array.isArray(getUserPurchasedCouponData)){
      const sortedCouponData = Array.isArray(getUserPurchasedCouponData) ? [...getUserPurchasedCouponData].sort((a, b) => {
        if (!sortTerm.key) return 0;
        if (a[sortTerm.key] > b[sortTerm.key]) return sortTerm.direction === "asc" ? 1 : -1;
        if (a[sortTerm.key] < b[sortTerm.key]) return sortTerm.direction === "asc" ? -1 : 1;
        return 0;
    }) : [];
    
    setFilterCouponData(sortedCouponData);
    }else{
      setFilterCouponData([])
    }
    
   

}, [sortTerm, getUserPurchasedCouponData]);
   
    const [coupnCurrentPage, setCouponCurrentPage] = useState(1);
    const [itemsCouponPerPage, setItemsCouponPerPage] = useState(5);
    const couponIndexOfLastItem =coupnCurrentPage * itemsCouponPerPage;
    const couponIndexOfFirstItem =  couponIndexOfLastItem - itemsCouponPerPage;
    const currentCouponItems = Array.isArray(filterCouponData)
        ? filterCouponData.slice(couponIndexOfFirstItem, couponIndexOfLastItem)
        : [];
    const coupontotalPages = Math.ceil(filterCouponData?.length / itemsCouponPerPage);


    
    const couponHandlePageChange = (pageNumber) => {
      setCouponCurrentPage(pageNumber);
    }
    // let pageCouponNumbers = [];
    // for (let i = 1; i <= coupontotalPages; i++) {
    //   pageCouponNumbers .push(i);
    // }

    const  pageCouponNumbers = Array.from({length:coupontotalPages},(_,i) => i+1);


// Pagination per Loyality Rewards:
useEffect(() => {

  if(Array.isArray(userRewardCouponsData)){
    const sortedLoyalityRewardData = Array.isArray(userRewardCouponsData) ? [...userRewardCouponsData].sort((a, b) => {
      if (!sortTerm.key) return 0;
      if (a[sortTerm.key] > b[sortTerm.key]) return sortTerm.direction === "asc" ? 1 : -1;
      if (a[sortTerm.key] < b[sortTerm.key]) return sortTerm.direction === "asc" ? -1 : 1;
      return 0;
  }) : [];
  
  setFilterLoyalityRewardData(sortedLoyalityRewardData );
  }else{
    setFilterLoyalityRewardData([])
  }
}, [sortTerm, userRewardCouponsData]);

const [currentLoyalityPage, setCurrentLoyalityPage] = useState(1);
const [itemsLoyalittyPerPage, setItemsLoyalityPerPage] = useState(5);
const loyalityIndexOfLastItem =currentLoyalityPage * itemsLoyalittyPerPage;
const loyalityIndexOfFirstItem =  loyalityIndexOfLastItem - itemsLoyalittyPerPage;
const currentLoyalityItems = Array.isArray(fiterLoyalityRewardData)
    ? fiterLoyalityRewardData.slice(loyalityIndexOfFirstItem , loyalityIndexOfLastItem)
    : [];
const loyalitytotalPages = Math.ceil(fiterLoyalityRewardData?.length / itemsLoyalittyPerPage);



const loyalityHandlePageChange = (pageNumber) => {
  setCurrentLoyalityPage(pageNumber);
}
// let  loyalityPageNumbers = [];
// for (let i = 1; i <= loyalitytotalPages; i++) {
//   loyalityHandlePageChange.push(i);
// }

const  loyalityPageNumbers = Array.from({length:loyalitytotalPages},(_,i) => i+1);


// Pagination per Clips and Redeems:

useEffect(() => {

  if(Array.isArray(getUserClipsAndRedemptionData)){
    const sortedClipsRedeemsData = Array.isArray(getUserClipsAndRedemptionData) ? [...getUserClipsAndRedemptionData].sort((a, b) => {
      if (!sortTerm.key) return 0;
      if (a[sortTerm.key] > b[sortTerm.key]) return sortTerm.direction === "asc" ? 1 : -1;
      if (a[sortTerm.key] < b[sortTerm.key]) return sortTerm.direction === "asc" ? -1 : 1;
      return 0;
  }) : [];
  
  setFilterClipsRedeemsData(sortedClipsRedeemsData );
  }else{
    setFilterClipsRedeemsData([])
  }
}, [sortTerm, getUserClipsAndRedemptionData]);

const [currentClipsRedeemsPage, setCurrentClipsRedeemsPage] = useState(1);
const [itemsClipsRedeemsPerPage, setItemsClipsRedeemsPerPage] = useState(5);
const clipsIndexOfLastItem =currentClipsRedeemsPage * itemsClipsRedeemsPerPage;
const clipsIndexOfFirstItem =  clipsIndexOfLastItem  - itemsClipsRedeemsPerPage;
const currentClipsRedeemsItems = Array.isArray(filterClipsRedeemsData)
    ? filterClipsRedeemsData.slice(clipsIndexOfFirstItem, clipsIndexOfLastItem)
    : [];
const clipstotalPages = Math.ceil(filterClipsRedeemsData?.length / itemsClipsRedeemsPerPage);



const clipsHandlePageChange = (pageNumber) => {
  setCurrentClipsRedeemsPage(pageNumber);
}
// let  clipsPageNumbers = [];
// for (let i = 1; i <= clipstotalPages; i++) {
//   clipsPageNumbers.push(i);
// }

const  clipsPageNumbers = Array.from({length:clipstotalPages},(_,i) => i+1);
  

    const handlePageSelect = (e) => {
        
        if (e.target.value == "All") {
            setItemsPerPage(currentItems?.length);
        }
        else {
            setItemsPerPage(e.target.value)
        }
    }

    const totalEntries = getUserRecentPurchasedProductsData?.length || 0;
    const totalCouponEntries = getUserPurchasedCouponData?.length || 0;
    const totalLoyalityRewards = userRewardCouponsData?.length || 0;
    const totalClipsRedeemsEntries = getUserClipsAndRedemptionData?.length || 0;


  

  return (
    <>
      <div className='right side-menu'>

      </div>
      <div className='content-page style-gg'
        style={{
          height: "100vh",
          marginLeft: isEnlarged ? "50px" : "240px", 
          // width: isEnlarged ? "calc(100% - 240px)":"",

          height: "100%",
      
        }}>
        <div className='content' style={{

          maxHeight: "100%",
          padding: "10px",
          outline: "none",
          


        }}>
          <>

            <div className='shooperTransaction'>
              {/* 
              <img src={UserImage} alt="UserImage.png" className='userImage' />

              <div className='detailsContainer'>
                
                <div className='containerStyle' >
                  <div className='rowStyle'>
                    <span className='labelStyles'>Name</span> sai kumar
                  </div>
                  <div style={{ flex: "1", display: "flex" }}>
                    <span className='labelStyle' >Total Spent</span> {"$0"}
                  </div>
                  <div style={{ flex: "1", display: "flex" }}>
                    <span className='labelStyle' >No of Baskets</span> {"0"}
                  </div>
                </div>
                <div className='containerStyle' >
                  <div className='rowStyle'>
                    <span className='labelStyles' >Member#</span> 39458793245
                  </div>
                  <div className='rowStyle'>
                    <span className='labelStyle' >Rank</span> {"0"}
                  </div>
                  <div className='rowStyle'>
                    <span className='labelStyle' >Avg. Basket Value</span> {"$"}
                  </div>
                </div>
                <div className='containerStyle' >
                  <div className='rowStyle'>
                    <span className='labelStyles' >Email</span> sai@gmail.com
                  </div>
                  <div className='rowStyle'>
                    <span className='labelStyle' >Member Since</span> {"10/11/2024"}
                  </div>
                  <div className='rowStyle'>
                    <span className='labelStyle' ></span>
                  </div>
                </div>


              </div>
              <div style={{ marginTop: "50px" }}>

              </div> */}
              <div className='col-md-3 col-sm-3 avatar-container'>
                <img src={UserImage} alt="UserImage.png" className='userImage profile-avatar' style={{ marginLeft: "50px" }} />
              </div>
              <div className='col-md-9 col-sm-9  text-right'>

                <div className='row' style={{ marginTop: "30px" }}>
                  <>
                    {/* <div className='col-md-3'>
                    <dl className='dl-horizontal'>
                      <dt style={{width:"100px"}}>
                        Name
                      </dt>
                      <dd >
                       {value?.firstName} {value?.lastName}
                      </dd>
                      <dt style={{ width: "100px" }}>
                        Member #
                      </dt>
                      <dd>
                      {value?.member}
                      </dd>
                      <dt style={{ width: "80px" }}>
                        Email
                      </dt>
                      <dd style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {value?.email}
                      </dd>
                    </dl>
                  </div> */}
                    <div className='col-md-3'>
                      <dl className='dl-flex'>
                        <div className='flex-row'>
                          <dt className='label'>Name</dt>
                          <dd>{value?.firstName} {value?.lastName}</dd>
                        </div>
                        <div className='flex-row'>
                          <dt className='label'>Member #</dt>
                          <dd>{value?.member}</dd>
                        </div>
                        <div className='flex-row'>
                          <dt className='label'>Email</dt>
                          <dd style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            {value?.email}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className='col-md-3'>
                      <dl className='dl-flex '>
                        <div className='flex-row'>
                          <dt className='label' style={{ width: "150px" }}>
                            Total Spent
                          </dt>
                          <dd>
                            ${value?.totalSpent}
                          </dd>
                        </div>

                        <div className='flex-row'>
                          <dt className='label' style={{ width: "150px" }}>
                            Rank
                          </dt>
                          <dd>
                            {value?.rank}
                          </dd>
                        </div>

                        <div className='flex-row'>
                          <dt className='label' style={{ width: "150px" }}>
                            Member Since
                          </dt>
                          <dd style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            {convertToMMddyyyystringFormat(value?.memberSince)}
                          </dd>
                        </div>


                      </dl>
                    </div>
                    <div className='col-md-3'>
                      <dl className='dl-flex'>
                        <div className='flex-row'>
                          <dt className='label' style={{ width: "150px" }}>
                            No of Baskets
                          </dt>
                          <dd>
                            {value?.noOfBaskets}
                          </dd>
                        </div>

                        <div className='flex-row'>
                          <dt className='label' style={{ width: "150px" }}>
                            Avg. Basket Value
                          </dt>
                          <dd>
                            ${value?.avgBaskets}
                          </dd>

                        </div>


                      </dl>
                    </div>
                  </>

                </div>


              </div>
            </div>

            <div style={{ marginTop: "50px" }}>
              {/* <div className='rowStyle'>
                <span className='labelStyles' style={{ marginBottom: "15px" }} >Clips</span> 2
              </div>
              <div className='rowStyle'>
                <span className='labelStyles' >Redeems</span> 0
              </div> */}
              <div className='row'>
                {/* <div className='col-md-3'></div> */}
                <div className='col-md-9'>
                  <div className='row'>
                    <div className='col-md-3' >

                      <dl className='dl-flex'>
                        <div className='flex-row'>
                          <dt style={{ width: "120px" }}>
                            Clips
                          </dt>
                          <dd>
                            {value?.clips}
                          </dd>
                        </div>

                        <div className='flex-row'>
                          <dt style={{ width: "120px" }}>
                            Redeems
                          </dt>
                          <dd>
                            {value?.redemptions}
                          </dd>

                        </div>


                      </dl>


                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div style={{ marginLeft: "10px", marginTop: "0px", background: "#FFFFFF", padding: "10px" }}>


              <div className='row' >
                <div className='col-md-12'>
                  <div className=''>
                    <div className='widget-content'  >
                      <ul className='nav nav-tabs' >
                        <li className={`btnstyle ${activeTab === "Timeline" ? 'active' : ""}`} onClick={() => setActiveTab('Timeline')}>
                          <a href='#demo1-home' data-toggle="tab">Timeline</a>
                        </li>
                        <li className={`btnstyle ${activeTab === "LoyalityRewards" ? 'active' : ""}`} onClick={() => setActiveTab('LoyalityRewards')}  >
                          <a href='#demo1-profile' data-toggle="tab">Loyality Rewards</a>
                        </li>
                        <li className={`btnstyle ${activeTab === "Clips" ? 'active' : ""}`} onClick={() => setActiveTab('Clips')}>
                          <a href='#demo1-dropdown1' data-toggle="tab">Clips/Redeems</a>
                        </li>
                        <li className={`btnstyle ${activeTab === "MyRewards" ? 'active' : ""}`} onClick={() => setActiveTab('MyRewards')}>
                          <a href='#demo1-UserReward'>My Rewards</a>
                        </li>
                      </ul>
                      <div className='tab-content'>
                        {
                          activeTab === "Timeline" &&
                          <div className='tab-pane  active in' >
                          
                            <div className='row' style={{ marginRight: "330px", paddingTop: "10px" }}>
                              {
                                getUserBasketTransactionsData?.length > 0 && (
                                  <>
                                    <div className='col-sm-5'>
                                      <label style={{ marginTop: "10px", font: "bold", marginLeft: "15px", marginRight: "15px", float: "left" }}>CHOOSE TRANSACTION TO VIEW</label>
                                    </div>
                                    <div className='col-sm-6'>
                                      <div className='form-group'>
                                        <select
                                          value={value?.basketDrop?.Name || ""}
                                          style={{ marginLeft: "-76px", width: "310px" }}
                                          name="basketDrop"
                                          onChange={(e) => {


                                            const findSelectedOption = getUserBasketTransactionsData?.find(item => item.dropDownName === e.target.value);


                                            setValue({
                                              ...value,
                                              basketDrop: { label: findSelectedOption?.dropDownKey || "", Name: findSelectedOption?.dropDownName || "" }
                                            });
                                            setTransaction(
                                            {
                                            Userid:userDetailId,
                                            basketDataId:findSelectedOption?.basketDataId,
                                            transactionMsg:findSelectedOption?.dropDownKey !="" ? findSelectedOption?.dropDownKey :""
                                            }
                                            );
                                            // dispatch(getUserPurchasedProductsAPI(findSelectedOption?.dropDownKey, clientName));
                                            // dispatch(getUserPurchasedCouponsAPI(findSelectedOption?.dropDownKey, clientName))

                                          }}

                                        >
                                        
                                          {
                                            getUserBasketTransactionsData?.map((each, i) => {
                                              return <option value={each?.dropDownName?.toString()} id={each?.dropDownName?.toString()} key={i} >{each?.dropDownName?.toString()}</option>
                                            })
                                          }
                                        </select>
                                      </div>
                                    </div>
                                  </>
                                )
                              }

                            </div>
                            <div className='row'>

                              <div className='col-md-6'>
                                <div className='text-center'>
                                  <div className=''>
                                    
                                    
                                     
                                     {
                                      getUserBasketTransactionsData?.length > 0 ? 
                                      <>
                                       <>
                                         
                                         <div className='widget-content' id="BasketTransactions">
                                            <div className='row'>
                                              <div className='col-md-12'>
                                                <div className='widget'>
                                                  <div className='widget-header' >
                                                    <h2 className='pull-left' style={{ marginTop: "20px" ,textAlign:"start"}} ><strong>Transaction</strong> Items</h2>
                                                  </div>
                                                  <div className='widget-content padding'>

                                                    {
                                                        currentItems?.length > 0 ? <>
                                                           <table className="table table-striped table-bordered table-hover col-md-11" cellSpacing={"0"} style={{ width: "100%" }} >
                                                      <thead>
                                                        <tr>
                                                          <th className='tableHeader' onClick={() => handleSort("productName")}>Product Name {handleSortIcon("productName")}</th>
                                                          <th  className='tableHeader'onClick={() => handleSort("productCode")}>UPC {handleSortIcon("productCode")}</th>
                                                          <th className='tableHeader' onClick={() => handleSort("qty")}>Qty {handleSortIcon("qty")}</th>
                                                          <th className='tableHeader' onClick={() => handleSort("amount")}>Amount{handleSortIcon("amount")}</th>


                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {
                                                          // getUserRecentPurchasedProductsData?.length > 0 &&
                                                          // getUserRecentPurchasedProductsData?.map((each, i) => {
                                                            currentItems?.length > 0 &&
                                                          currentItems?.map((each, i) => {
                                                            const productName = each.productName && each.productName.trim().length > 21 ?
                                                              `${each.productName.substring(0, 21)}... ` : each.productName || '';
                                                            const amount = each.amount === null ? "" : `${parseFloat(each?.amount).toFixed(2)}`
                                                            return <tr key={i}>
                                                              <td className='tableBody' style={{ width: "280px" }}>
                                                                {productName}

                                                              </td>
                                                              <td className='tableBody' style={{ width: "280px" }}>{each?.productCode} </td>
                                                              <td className='tableBody'  style={{ width: "280px" }}  >{each?.qty} </td>
                                                              <td className='tableBody' style={{ width: "280px" }}>{amount} </td>

                                                            </tr>
                                                          })
                                                        }
                                                      </tbody>
                                                    </table>
                                                        </>
                                                        :
                                                        <>
                                                        <div>
                                                          <span>No shoppers found</span>
                                                        </div>
                                                        </>
                                                    }
                                                 
{
   currentItems?.length > 0  && 
  <>
   <div >

<div>
    <p style={{textAlign:"start",color:"#5B5B5B"}}>{`Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} 
                to ${Math.min(currentPage * itemsPerPage, totalEntries)} 
        of ${totalEntries} entries`}</p>
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

    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='btnNext'>
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
                                          </div>
                                        </>
                                      </>
                                      :
                                      <>
                                      <div style={{ paddingTop:"0px",height:"100px",position:"absolute",left:"30px"}}>
                                             <span style={{ fontSize: "18px", fontWeight: "bold", color:"#5B5B5B" }}>{"No Transactions" }</span>
                                           </div>
                                      </>
                                     }
                                       
                                        
                                        
                                     
                                       
                                       
                                        
                                    
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='text-center'>
                                  <div className='widget'>
                                    {
                                       getUserPurchasedCouponData?.length >  0 &&
                                        <>
                                          <div className='widget-content' id="CouponsTransactions">
                                            <div className='row'>
                                              <div className='col-md-12'>
                                                <div className='widget'>
                                                  <div className='widget-header' >
                                                    <h2 className='pull-left' style={{ marginTop: "20px",textAlign:"start" }} ><strong>Transaction</strong> Coupons</h2>
                                                  </div>
                                                  <div className='widget-content padding'>
                                                    <table className="table table-striped table-bordered table-hover col-md-11" cellSpacing={"0"} style={{ width: "100%" }} >
                                                      <thead>
                                                        <tr>
                                                          <th className='tableHeader' onClick={() => handleSort("title")}> Title {handleSortIcon("title")}</th>
                                                          <th className='tableHeader' onClick={() => handleSort("details")}>Details {handleSortIcon("details")}</th>
                                                          {/* <th onClick={() => handleSort("newsId")}>NewsID {handleSortIcon("newsId")}</th> */}
                                                          <th className='tableHeader' onClick={() => handleSort("value")}>Amount{handleSortIcon("value")}</th>


                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {
                                                          //getUserPurchasedCouponData?.length > 0 && 

                                                          currentCouponItems?.length > 0 &&
                                                         
                                                          <>
                                                          {
                                                             currentCouponItems?.map((each, i) => {
                                                            // getUserPurchasedCouponData?.map((each, i) => {
                                                              const Title = each.title && each.title.trim().length > 21 ?
                                                                `${each.title.substring(0, 21)}... ` : each.title || '';
                                                              const Details = each.details && each.details.trim().length > 21 ?
                                                                `${each.details.substring(0, 21)}... ` : each.details || '';
                                                              const amount = each.value === null ? "" : `${parseFloat(each?.value).toFixed(2)}`
                                                              return <tr key={i}>
                                                                <td className='tableBody' style={{ width: "280px" }}>
                                                                  {Title}
  
                                                                </td>
                                                                <td className='tableBody' style={{ width: "280px" }}>{Details} </td>
                                                                {/* <td style={{ width: "280px" }}  >{each?.newsId} </td> */}
                                                                <td className='tableBody' style={{ width: "280px" }}>{amount} </td>
  
                                                              </tr>
                                                            })
                                                          }
                                                          </>
                                                         
                                                        }
                                                      </tbody>
                                                    </table>
                                                    <>
                                                      <div>
    <p style={{textAlign:"start",color:"#5B5B5B"}}>{`Showing ${Math.min((coupnCurrentPage - 1) * itemsCouponPerPage + 1, totalCouponEntries)} 
                to ${Math.min(coupnCurrentPage * itemsCouponPerPage, totalCouponEntries)} 
        of ${totalCouponEntries} entries`}</p>
</div>

<div className='pagination'
    style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}

>
    <button onClick={() =>couponHandlePageChange(coupnCurrentPage - 1)} disabled={coupnCurrentPage === 1} className='btnPrev'>
        <FontAwesomeIcon icon={faAngleLeft} />
    </button>

    {pageCouponNumbers.length > 10 ? (
        <>
            {coupnCurrentPage > 3 && <button className="inActivePage" onClick={() => couponHandlePageChange(1)}>1</button>}
            {coupnCurrentPage > 4 && <span className="inActivePage">...</span>}
            {pageCouponNumbers.slice(Math.max(0, coupnCurrentPage - 3), Math.min(coupnCurrentPage + 2, pageCouponNumbers.length)).map((number) => (
                <button key={number} onClick={() => couponHandlePageChange(number)} className={coupnCurrentPage === number ? 'activePage' : "inActivePage"}>
                    {number}
                </button>
            ))}
            {coupnCurrentPage < pageCouponNumbers.length - 3 && <span className='inActivePage'>...</span>}
            {coupnCurrentPage < pageCouponNumbers.length - 2 && <button className="inActivePage" onClick={() =>couponHandlePageChange(pageCouponNumbers.length)}>{pageCouponNumbers.length}</button>}
        </>
    ) : (
      pageCouponNumbers.map((number) => (
            <button key={number} onClick={() => couponHandlePageChange(number)} className={coupnCurrentPage === number ? 'activePage' : "inActivePage"}>
                {number}
            </button>
        ))
    )}

    <button onClick={() => couponHandlePageChange(coupnCurrentPage + 1)} disabled={coupnCurrentPage === coupontotalPages} className='btnNext'>
        <FontAwesomeIcon icon={faAngleRight} />
    </button>
</div>
                                            </>

                                          {/* {
                                            getUserPurchasedCouponData?.length > 0 &&
                                           
                                          } */}
                                                  </div>
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
                        {
                          activeTab === "LoyalityRewards" &&
                          <div className='tab-pane  active in' >
                            <div className='col-md-11' style={{ padding: "20px" }}>
                              <table className='table table-stripped table-bordered table-hover' cellSpacing={"0"}>
                                <thead>
                                  <tr>
                                  <th  className='tableHeader' onClick={() => handleSort("title")}>Reward Name {handleSortIcon("title")}</th>
                                  <th  className='tableHeader' onClick={() => handleSort("applieddate")}>Free Reward Given On {handleSortIcon("applieddate")}</th>
                                  <th  className='tableHeader' onClick={() => handleSort("createddate")}>Redeemed On {handleSortIcon("createddate")}</th>
                                   
                                  
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                  
                                    // userRewardCouponsData?.length > 0 ? <>
                                    currentLoyalityItems?.length > 0 ? <>
                                    {
                                      currentLoyalityItems?.map((each, i) => { 
                                      // userRewardCouponsData?.map((each, i) => {
                                        return <tr key={i}>
                                          <td className='tableBody'>{each?.title}</td>
                                          <td  className='tableBody'>{each?.applieddate}</td>
                                          <td className='tableBody' >{each?.createddate}</td>
                                         
                                        </tr>
                                      })
                                    }
                                     </>
                                     :
                                     <>
                                      <tr>
                                        <td valign='top' colSpan={"3"} style={{color:"#5B5B5B"}}> 
                                          No data available in table
                                        </td>
                                      </tr>
                                     </>
                                    
                                  }
                                </tbody>
                              </table>
   {
    currentLoyalityItems?.length > 0 &&
                               <div >

                               <div>
                                   <p style={{textAlign:"start",color:"#5B5B5B"}}>{`Showing ${Math.min((currentLoyalityPage - 1) * itemsLoyalittyPerPage + 1, totalLoyalityRewards)} 
                                               to ${Math.min(currentLoyalityPage * itemsLoyalittyPerPage,totalLoyalityRewards)} 
                                       of ${totalLoyalityRewards} entries`}</p>
                               </div>
                               
                               <div className='pagination'
                                   style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                               
                               >
                                   <button onClick={() => loyalityHandlePageChange(currentLoyalityPage - 1)} disabled={currentLoyalityPage === 1} className='btnPrev'>
                                       <FontAwesomeIcon icon={faAngleLeft} />
                                   </button>
                               
                                   {loyalityPageNumbers.length > 10 ? (
                                       <>
                                           {currentLoyalityPage > 3 && <button className="inActivePage" onClick={() => loyalityHandlePageChange(1)}>1</button>}
                                           {currentLoyalityPage > 4 && <span className="inActivePage">...</span>}
                                           {loyalityPageNumbers.slice(Math.max(0, currentLoyalityPage - 3), Math.min(currentLoyalityPage + 2, loyalityPageNumbers.length)).map((number) => (
                                               <button key={number} onClick={() => loyalityHandlePageChange(number)} className={currentLoyalityPage === number ? 'activePage' : "inActivePage"}>
                                                   {number}
                                               </button>
                                           ))}
                                           {currentLoyalityPage < loyalityPageNumbers.length - 3 && <span className='inActivePage'>...</span>}
                                           {currentLoyalityPage < loyalityPageNumbers.length - 2 && <button className="inActivePage" onClick={() => loyalityHandlePageChange(loyalityPageNumbers.length)}>{loyalityPageNumbers.length}</button>}
                                       </>
                                   ) : (
                                     loyalityPageNumbers.map((number) => (
                                           <button key={number} onClick={() => loyalityHandlePageChange(number)} className={currentLoyalityPage === number ? 'activePage' : "inActivePage"}>
                                               {number}
                                           </button>
                                       ))
                                   )}
                               
                                   <button onClick={() => loyalityHandlePageChange(currentLoyalityPage + 1)} disabled={currentLoyalityPage === loyalitytotalPages} className='btnNext'>
                                       <FontAwesomeIcon icon={faAngleRight} />
                                   </button>
                               </div>
                               
                               </div>
   }
                            </div>
                          </div>
                        }
                        {
                          activeTab === "Clips" &&
                          <>
                            <div className='tab-pane  active in' >
                              <div className='row'>
                                <div className='col-sm-12'>
                                  <div className=''>

                                    <div className=''>
                                      <div className='col-md-12' style={{ padding: "20px" }}>
                                        <table className="table table-striped table-bordered table-hover" cellSpacing={"0"} >
                                          <thead>
                                            <tr>
                                              <th className='tableHeader' onClick={() => handleSort("coupon")}>Coupon {handleSortIcon("coupon")}</th>
                                              <th className='tableHeader' onClick={() => handleSort("details")}>Details {handleSortIcon("details")}</th>
                                              <th className='tableHeader' onClick={() => handleSort("validFrom")}>Valid From {handleSortIcon("validFrom")}</th>
                                              <th className='tableHeader' onClick={() => handleSort("expiresOn")}>Expires On{handleSortIcon("expiresOn")}</th>
                                              <th className='tableHeader' onClick={() => handleSort("clippedOn")}>Clipped On{handleSortIcon("clippedOn")}</th>
                                              <th className='tableHeader' onClick={() => handleSort("redeemedOn")}>Redeemed On{handleSortIcon("redeemedOn")}</th>

                                            </tr>
                                          </thead>
                                          <tbody>
                                            {
                                              currentClipsRedeemsItems?.length > 0 &&
                                              currentClipsRedeemsItems?.map((each, i) => {
                                            //  getUserClipsAndRedemptionData?.length > 0 &&
                                              //getUserClipsAndRedemptionData?.map((each, i) => {
                                                return <tr key={i}>
                                                  <td  style={{ width: "280px",color:"#5B5B5B" }}>
                                                    {each?.title}

                                                  </td>
                                                  <td  style={{ width: "280px",color:"#5B5B5B" }}>{each?.details} </td>
                                                  <td   style={{ width: "150px" ,color:"#5B5B5B"}} >{each?.validfromdate} </td>
                                                  <td  style={{ width: "150px" ,color:"#5B5B5B"}} >{each?.expireson} </td>
                                                  <td   style={{ width: "150px" ,color:"#5B5B5B"}}>{each?.ncrimpressiondate}{" AM"}</td>
                                                  <td  style={{ width: "150px" ,color:"#5B5B5B"}}>{each?.redemptiondate}</td>
                                                </tr>
                                              })
                                            }
                                          </tbody>
                                        </table>

                                        {
                                          getUserClipsAndRedemptionData && Object?.keys(getUserClipsAndRedemptionData)?.length > 0 &&
                                                                                  <div >

<div>
    <p style={{textAlign:"start",color:"#5B5B5B"}}>{`Showing ${Math.min((currentClipsRedeemsPage - 1) * itemsClipsRedeemsPerPage + 1, totalClipsRedeemsEntries)} 
                to ${Math.min(currentClipsRedeemsPage * itemsClipsRedeemsPerPage,totalClipsRedeemsEntries)} 
        of ${totalClipsRedeemsEntries} entries`}</p>
</div>

<div className='pagination'
    style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}

>
    <button onClick={() => clipsHandlePageChange(currentClipsRedeemsPage - 1)} disabled={currentClipsRedeemsPage === 1} className='btnPrev'>
        <FontAwesomeIcon icon={faAngleLeft} />
    </button>

    {clipsPageNumbers.length > 10 ? (
        <>
            {currentClipsRedeemsPage > 3 && <button className="inActivePage" onClick={() => clipsHandlePageChange(1)}>1</button>}
            {currentClipsRedeemsPage > 4 && <span className="inActivePage">...</span>}
            {clipsPageNumbers.slice(Math.max(0, currentClipsRedeemsPage - 3), Math.min(currentClipsRedeemsPage + 2, clipsPageNumbers.length)).map((number) => (
                <button key={number} onClick={() => clipsHandlePageChange(number)} className={currentClipsRedeemsPage === number ? 'activePage' : "inActivePage"}>
                    {number}
                </button>
            ))}
            {currentClipsRedeemsPage < clipsPageNumbers.length - 3 && <span className='inActivePage'>...</span>}
            {currentClipsRedeemsPage < clipsPageNumbers.length - 2 && <button className="inActivePage" onClick={() => clipsHandlePageChange(clipsPageNumbers.length)}>{clipsPageNumbers.length}</button>}
        </>
    ) : (
      clipsPageNumbers.map((number) => (
            <button key={number} onClick={() => clipsHandlePageChange(number)} className={currentClipsRedeemsPage === number ? 'activePage' : "inActivePage"}>
                {number}
            </button>
        ))
    )}

    <button onClick={() => clipsHandlePageChange(currentClipsRedeemsPage + 1)} disabled={currentClipsRedeemsPage === clipstotalPages} className='btnNext'>
        <FontAwesomeIcon icon={faAngleRight} />
    </button>
</div>

</div>
                                        }



                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </>
                        }
                        {
                          activeTab === "MyRewards" &&
                          <>
                            <div className='tab-pane  active in' id="#demo1-UserReward">
                              <div id="basic-form" style={{ paddingTop: "15px" }}>
                              <>
                                     <table className='widgets table table-bordered table-stripped table-hover' cellSpacing={0} style={{ width: "32%" }}>
                                  <thead>

                                  </thead>
                                  <tbody>

                                    <tr>
                                      <td>
                                        <div style={{paddingLeft:"15px",paddingRight:"15px"}}>
                                          {/* <img src={getLMRewardsWithMemberNumberData[0]?.imageURL} style={{ width: "150px", height: "150px" }} /> */}
                                          <img src='https://s3.amazonaws.com/rsaqa/SpecialsImages/BasketDeal.png' style={{ width: "150px", height: "150px" }} />
                                        </div>
                                      </td>
                                      <td style={{padding:"15px"}}> 
                                        <div >
                                          <div style={{fontSize:"15px",fontWeight:"bold",color:"#5B5B5B",marginBottom:"10px"}}>
                                            Test-Points Program
                                          </div>
                                         
                                          <div style={{fontSize:"13px",fontWeight:"bold",color:"#5B5B5B"}}>
                                          
                                            Amount Spent:${ rewardSpent }
                                          </div>
                                          
                                          <div style={{fontSize:"13px",fontWeight:"bold",color:"#5B5B5B"}}>
                                            Points Available : {pointsAvailable}
                                          </div>
                                          <div className='col-sm-2'>
                                               &nbsp;
                                          </div>
                                        </div>
                                      </td>

                                    </tr>

                                  </tbody>
                                </table>
                                  </>
                             
                              </div>
                            </div>
                          </>

                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>


            {
 (  (getUserBasketTransactionsLoading === true)  ||
 (getUserRecentPurchasedProductsLoading == true) ||
           (useHistoryLoading === true) )
&&
 
 <>
 <LoaderModal show={true} />
 </>
            }
          </>
             
        </div>
      </div>
    </>
  )
}

export default ShopperTransaction