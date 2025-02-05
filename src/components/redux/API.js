
import axios from "axios";
import * as Constants from "./Constant";
import { AddAvailableUsersGroupsAction, CreateBasketCouponAction, CreateLastShopperGroupAction, CreateShopperAction, createShopperGroupsAction, CreateUPCListGroupAction, CreateZipcodesListGroupAction, deleteUserAction, DownloadShoppersAction, FindCouponAction, findMemberDetailAction, GetAdvanceShopperAction, GetAllShopperAction, GetAllTimeProductsAction, GetAvailableUsersGroupsAction, GetClientAction, GetClientDataAction, GetClientStoresAction, GetFindShopperAction, GetFindShopperByIdAction, GetGroupAnalysisAction, GetLMRewardDataAction, GetProductCategoriesAction, GetProductDetailsUPCsAction, GetRewardTypesAction, GetRolesAction, GetSearchandCountAction, GetSearchandCreateGroupAction, GetShopperByUPCsAction, GetToProductsAction, GetTopShopperAction, GetUserClipsAndRedemptionsAction, GetUserRewardCouponsAction, GetUsersGroupsAction, GetUserTypesAction, NewsCategoryAction, paginationAction, saveUserPointsAction, UpdateFindShopperAction, UploadShoppersAction, useHistoryAction, userBasketTransactionAction, useRewardsWithMemberNumberAction, userPurchasedCouponsAction, userPurchaseProductAction } from "./Action";
import { getLMRewardReducer, GetProductDetailsReducer } from "./Reducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { FormatUtcString } from "../Auth";
import { AddToDays, DateFormatToYYYYMMddTime } from "../../Utils/Helpers/Public";

  
export const  getClientNames =() => async (dispatch) => {
   
    dispatch(GetClientAction(Constants.GET_CLINET_START,{},"",true))
   
    var config = {
        method:"get",
        url:"https://localhost:7140/api/RSASupportAPI/GetClients",
       
    }
    await axios(config).then(res => {
    
        dispatch(GetClientAction(Constants.GET_CLINET_SUCCESS,res?.data?.clients,"Successful",false));
      
    }).catch(err => {
        dispatch(GetClientAction(Constants.GET_CLINET_FAILURE,{},err?.response?.data?.message,false))
       
    })
}
export const getClientDetails = (clientName,query) => async (dispatch)=> {
    dispatch(GetClientDataAction(Constants.GET_CLINET_DATA_START,{},"",true));
    var config = {
        method:"get",
       // url:"https://localhost:7140/api/RSASupportAPI/GetClientData?clientName=RSA TEST05&selectQuery=select * from UserDetails"
       url:`https://localhost:7140/api/RSASupportAPI/GetClientData?clientName=${clientName}&selectQuery=${query}`

    }
    await axios(config).then(res => {
        
        dispatch(GetClientDataAction(Constants.GET_CLINET_DATA_SUCCESS,res?.data?.clientInfo,"Successful",false))
    }).catch(err => {
        console.log("error api",err?.response?.data)
        dispatch(GetClientDataAction(Constants.GET_CLINET_DATA_FAILURE,{},err?.response?.data,false))
    })
}

export const getLmRewardsAPI = (clientName) => async(dispatch) => {
    console.log("api clientName",clientName)
    dispatch(GetLMRewardDataAction(Constants.GET_LM_REWARD_DATA_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetLMReward?clientName=${clientName}`
    }
    await axios(config).then((response) =>
       {
        console.log("res",response?.data);
        dispatch(GetLMRewardDataAction(Constants.GET_LM_REWARD_DATA_SUCCESS,response?.data?.lmRewards,"Successful",false));
       }
) 
    .catch(error => {
        console.log(error);
        dispatch(GetLMRewardDataAction(Constants.GET_LM_REWARD_DATA_FAILURE,{},error?.response?.data,false));
    }
        
    )
}


export const getFindShopperAPI = (clientName,value) => async(dispatch) => {
    console.log("api value",value)
    var clientstoreId = value?.clientStoreId === undefined ? "" : value?.clientStoreId;
  // URL : https://localhost:7140/api/RSASupportAPI/FindShopper?clientName=SAI KUMAR&email=vijaykumarpusam@gmail.com&memberNumber=847388654&mobileNumber=99596085675&zipcode=107135&firstName=vijaykumar&lastName=pusam&signUpDate
    dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_START,{},"",true));
    var config = {
        method:"get",
       url:`https://localhost:7140/api/RSASupportAPI/FindShopper?clientName=${clientName}&email=${value.email}&memberNumber=${value.memberNumber}&mobileNumber=${value.phoneNumber}&zipcode=${value.zipCode}&clientStoreId=${clientstoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}`
        //url:`https://localhost:7140/api/RSASupportAPI/FindShopper?clientName=${clientName}&email=${value.email}&memberNumber=${value.memberNumber}&mobileNumber=${value.phoneNumber}&zipcode=${value.zipCode}&clientStoreId=${value.clientStoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}`
    }
    await axios(config).then((response) =>
       {
        
        if(response?.data?.errorCode === 404){
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_SUCCESS,{},response?.data?.errorMessage,false));
        }else{
            //dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_SUCCESS,response?.data?.findShopperInfo,"Successful",false));
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_SUCCESS,response?.data?.findShopperInfo,response?.data?.errorMessage,false));

        }
        
       }
) 
    .catch(error => {
         
        if(error?.response?.status === 400){
       
          //  dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},"Bad Request.",false)); 
       
        }else if(error?.response?.status === 500){
         
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},"Internel server error.",false)); 
       
        }
        else{
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},error?.response?.message,false)); 
            
        }
       
    }
        
    )
}

export const getFindShopperPaginationAPI = (clientName,value,page,limit,setTotalRecords,sortColumn,sortDirection,setTotalPage,setTotalEntrie,setPageNo,setPage,setData,setFilterdata) => async(dispatch) => {
    // const getFindShopperData = useSelector(state => state.getFindShopperData);
   
    // console.log("shopper data",getFindShopperData);
     
    var clientstoreId = value.clientStoreId === undefined ? "" : value.clientStoreId;
  // URL : https://localhost:7140/api/RSASupportAPI/FindShopper?clientName=SAI KUMAR&email=vijaykumarpusam@gmail.com&memberNumber=847388654&mobileNumber=99596085675&zipcode=107135&firstName=vijaykumar&lastName=pusam&signUpDate
    dispatch(paginationAction(Constants.PAGINATION_START,[],"",true));
    var config = {
        method:"get",


     url:`https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=${clientName}&page=${page}&limit=${limit}&email=${value.email}&barcodeValue=${value.memberNumber}&mobile=${value.phoneNumber}&zipCode=${value.zipCode}&clientStoreId=${value.clientStoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`,
      
     // https://localhost:7140/api/RSASupportAPI/GetPaginate?clientName=Veritra RSA&email=&memberNumber=&mobileNumber=&zipcode=&clientStoreId=6&firstName=&lastName=&signUpFromDate=&signUpToDate=&page=1&pageSize=5&sortBy=UserDetailId&isAscending=false&searchTerm=6
     // url:` https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=${clientName}&email=${value.email}&barcodeValue=${value.memberNumber}&mobile=${value.phoneNumber}&zipCode=${value.zipCode}&clientStoreId=${value.clientStoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`
       //url:`https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=${clientName}&page=${"2"}&limit=${limit}&email=${value.email}&barcodeValue=${value.memberNumber}&mobile=${value.phoneNumber}&zipCode=${value.zipCode}&clientStoreId=${clientstoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`
      // url:` https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=${clientName}&page=${page}&limit=${limit}&email=${value.email}&barcodeValue=${value.memberNumber}&mobile=${value.phoneNumber}&zipCode=${value.zipCode}&clientStoreId=${value.clientStoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`
        //url:`https://localhost:7140/api/RSASupportAPI/FindShopper?clientName=${clientName}&email=${value.email}&memberNumber=${value.memberNumber}&mobileNumber=${value.phoneNumber}&zipcode=${value.zipCode}&clientStoreId=${value.clientStoreId}&firstName=${value.firstName}&lastName=${value.lastName}&signUpFromDate=${value.signUpFromDate}&signUpToDate=${value.signUpToDate}`
    }
    await axios(config).then((response) =>
       {

        if(response?.data?.errorCode === 404){
            dispatch(paginationAction(Constants.PAGINATION_SUCCESS,[],response?.data?.errorMessage,false));
        }else{

        //     let shopperData;

        //  debugger;
        //  if(response?.data?.findShopperList?.length > 0){
        //     shopperData =   dispatch(getFindShopperAPI(clientName,value));
        //  }
       
      
            //dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_SUCCESS,response?.data?.findShopperInfo,"Successful",false));
            dispatch(paginationAction(Constants.PAGINATION_SUCCESS,response?.data?.findShopperList,"Successful",false));
             // setTotalItemsPages(response?.data?.totalPages);
          setData(response?.data?.findShopperList
          );
        //    setFilterdata(response?.data?.searchFindShopper
        //    );
        setFilterdata(response?.data?.findShopperList
        );
            setTotalRecords(response?.data?.totalCount);
            setTotalEntrie(response?.data?.totalCount);
            setTotalPage(Math.ceil(response?.data?.totalCount / limit))
            setPageNo([...Array(Math.ceil(response?.data?.totalCount / limit)).keys()].map((i) => i+1));
        }
        
       }
) 
    .catch(error => {
       
        if(error?.response?.status === 400){
          
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},"Bad Request.",false)); 
       
        }else if(error?.response?.status === 500){
         
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},"Internel server error.",false)); 
       
        }
        else{
            dispatch(GetFindShopperAction(Constants.GET_FIND_SHOPPER_DATA_FAILURE,{},error?.response?.message,false)); 
            
        }
       
    }
        
    )
}

export const getClientStoresAPI = () => async(dispatch) => {
    dispatch(GetClientStoresAction(Constants.GET_CLIENT_STORES_DATA_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetClientStores?clientName=Veritra RSA`
    }
    await axios(config).then((response) =>
       {
       
        dispatch(GetClientStoresAction(Constants.GET_CLIENT_STORES_DATA_SUCCESS,response?.data?.clientStores,"",true));
       }
) 
    .catch(error => {
       
        if(error?.response?.status === 400){
            
            dispatch(GetClientStoresAction(Constants.GET_CLIENT_STORES_DATA_START,{},"Failed",true));
       
        }else{
            dispatch(GetClientStoresAction(Constants.GET_CLIENT_STORES_DATA_START,{},"Failed",true));
        }
       
    }
        
    )
}

export const rewardTypesAPI =(clientName) => async(dispatch) => {
    
    dispatch(GetRewardTypesAction(Constants.GET_REWARD_TYPES_DATA_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetRewardTypes?clientName=${clientName}`
       //url:"https://localhost:7140/api/RSASupportAPI/GetRewardTypes?clientName=Veritra RSA"
    }
    await axios(config).then((response) =>
        {
         console.log("reward type api",response?.data);
         dispatch(GetRewardTypesAction(Constants.GET_REWARD_TYPES_DATA_SUCCESS,response?.data?.rewardTypes,"Successful",false));
        }
 ) 
     .catch(error => {
         console.log("Error reward types api",error?.response); 
       
            dispatch(GetRewardTypesAction(Constants.GET_REWARD_TYPES_DATA_FAILURE,{},"Failed",false));
         
        
     }
         
     )
}
export const getFindShopperByIdApi = (clientName,userDetailId) => async(dispatch)=> {
    dispatch(GetFindShopperByIdAction(Constants.GET_FIND_SHOPPER_DATA_BY_ID_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetFindShopperDetailsById?clientName=${clientName}&userDetailId=${userDetailId}`
    }
    await axios(config).then((response) =>
        {
         console.log("reward type api",response?.data);
         dispatch(GetFindShopperByIdAction(Constants.GET_FIND_SHOPPER_DATA_BY_ID_SUCCESS,response?.data?.findShopperInfo,response?.data?.errorMessage,false));
        }
 ) 
     .catch(error => {
         console.log("Error reward types api",error?.response); 
       
         dispatch(GetFindShopperByIdAction(Constants.GET_FIND_SHOPPER_DATA_BY_ID_SUCCESS,{},"Failed",false));
         
        
     }
         
     )
}

export const updateFindShopperAPI =(clientName,userDetailId,value,searchValue) => async(dispatch) => {
    dispatch(UpdateFindShopperAction(Constants.UPDATE_FIND_SHOPPER_DATA_BY_ID_START,{},"",true));

    var body = {
        "email": value.email,
        "barCodeValue": value.memberNumber,
        "mobile": value.phoneNumber,
        "zipCode": value.zipCode,
        "clientStoreId": value.clientStoreId,
        "firstName": value.firstName,
        "lastName": value.lastName,
        "signUpDate": value.signUpDate
    }
    var config = {
        method:"put",
        url:`https://localhost:7140/api/RSASupportAPI/UpdateUserDetails?clientName=${clientName}&userDetailId=${userDetailId}`,
        data:body
    }
    await axios(config).then((response) => {

        dispatch(UpdateFindShopperAction(Constants.UPDATE_FIND_SHOPPER_DATA_BY_ID_SUCCESS,response?.data?.findShopper,response?.data?.errorMessage,false));
        
        // toast.success("Successfully updated find shopper details.");
        if(response?.data?.errorMessage === "Successful"){
            dispatch(getFindShopperAPI(clientName,searchValue));
           // toast.success("Successfully updated find shopper details.");
         //   dispatch(getFindShopperAPI(clientName,searchValue));
            // setTimeout(() => {
          
            
            //  window.location.href="http://localhost:3000/shoppers/findshoppers";
            // }, 5000);
            
        }
    }).catch(error => {
        dispatch(UpdateFindShopperAction(Constants.UPDATE_FIND_SHOPPER_DATA_BY_ID_FAILURE,{},"Failed",false));
    })
}
export const GetUserClipsAndRedemptionsDatesAPI =(userDetailId) => async(dispatch) => {
    dispatch(GetUserClipsAndRedemptionsAction(Constants.GET_USER_CLIPS_REDEMPTIONS_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetUserClipsAndRedemptionDates?userId=${userDetailId}`,
    }
    await axios(config).then((response) => {
        dispatch(GetUserClipsAndRedemptionsAction(Constants.GET_USER_CLIPS_REDEMPTIONS_SUCCESS,response?.data?.userClipsAndRedemptionDates,response?.data?.errorMessage,false));
    }).catch((err) => {
        dispatch(GetUserClipsAndRedemptionsAction(Constants.GET_USER_CLIPS_REDEMPTIONS_FAILURE,{},"Failed",false));
    })
}

export const getUserRewardCouponsAPI =(userDetailId) => async(dispatch) => {
    dispatch(GetUserRewardCouponsAction(Constants.GET_USER_REWARD_COUPONS_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetUserRewardCoupons?userDetailId=${userDetailId}`
    }
     await axios(config).then((response) => {
        dispatch(GetUserRewardCouponsAction(Constants.GET_USER_REWARD_COUPONS_SUCCESS,response?.data?.userRewardCoupons,response?.data?.errorMessage,false));
     }).catch(err => {
        dispatch(GetUserRewardCouponsAction(Constants.GET_USER_REWARD_COUPONS_FAILURE,{},"Failed",false));
     })
}

export const userHistoryAPI = (userDetailId,clientName) => async(dispatch) => {
    dispatch(useHistoryAction(Constants.GET_USER_HISTORY_START,{},"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetUserHistory?userDetailId=${userDetailId}&clientName=${clientName}`
    }
    await axios(config).then((response) => {
        dispatch(useHistoryAction(Constants.GET_USER_HISTORY_SUCCESS,response?.data?.userHistoryInfo,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(useHistoryAction(Constants.GET_USER_HISTORY_FAILURE,{},"Failed",false));
    })
}

export const getUserBasketTransactionAPI =(userId,clientName) => async(dispatch) => {
    dispatch(userBasketTransactionAction(Constants.GET_USER_BASKET_TRANSACTION_START,{},"",true));
    var config = {
        method:"get",
        url:` https://localhost:7140/api/RSASupportAPI/GetUserBasketTransactions?userId=${userId}&clientName=${clientName}`
    }
    await axios(config).then((response) => {
        dispatch(userBasketTransactionAction(Constants.GET_USER_BASKET_TRANSACTION_SUCCESS,response?.data?.userBasketTransactions,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(userBasketTransactionAction(Constants.GET_USER_BASKET_TRANSACTION_FAILURE,{},"Internel server error.",false));
    })
}

export const getUserPurchasedProductsAPI =(transaction,clientName)=>async(dispatch)=>{
   dispatch(userPurchaseProductAction(Constants.GET_USER_PURCHASE_PRODUCT_START,{},"",true));
   var config = {
    method:"get",
    url:`https://localhost:7140/api/RSASupportAPI/GetUserRecentPurchasedProducts?Transaction=${transaction}&clientName=${clientName}`
   }
   await axios(config).then(response => {
    dispatch(userPurchaseProductAction(Constants.GET_USER_PURCHASE_PRODUCT_SUCCESS,response?.data?.userRecentProducts,response?.data?.errorMessage,false));
   }).catch((err) => {
    dispatch(userPurchaseProductAction(Constants.GET_USER_PURCHASE_PRODUCT_FAILURE,{},"Internel server error",false));
       
   })
}

export const getUserPurchasedCouponsAPI=(transaction,clientName)=> async(dispatch)=>{
    dispatch(userPurchasedCouponsAction(Constants.GET_USER_PURCHASE_COUPONS_START,[],"",true));
    var config={
        method:"get",
        //2460^86276
        url:` https://localhost:7140/api/RSASupportAPI/UserPurchasedCoupon?Transaction=${transaction}&clientName=${clientName}`

       // url:` https://localhost:7140/api/RSASupportAPI/UserPurchasedCoupon?Transaction=${transaction}&clientName=${transaction}`
    }
    await axios(config).then((response) => {
        dispatch(userPurchasedCouponsAction(Constants.GET_USER_PURCHASE_COUPONS_SUCCESS,response?.data?.userPurchasedCoupons,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(userPurchasedCouponsAction(Constants.GET_USER_PURCHASE_COUPONS_START,[],"Internel server error.",false));
    })
}
export const getUserRewardsAPI=(memberNumber,clientName)=> async(dispatch) => {
   dispatch(useRewardsWithMemberNumberAction(Constants.GET_USER_LMREWARDS_MEMBERNUMBER_START,[],"",true));
   var config = {
    method:"get",
    url:`https://localhost:7140/api/RSASupportAPI/GetLMRewardsWithMemberNumber?memberNumber=${memberNumber}&clientName=${clientName}`
   }
   await axios(config).then((response) => {
    dispatch(useRewardsWithMemberNumberAction(Constants.GET_USER_LMREWARDS_MEMBERNUMBER_SUCCESS,response?.data?.lmRewards,response?.data?.errorMessage,false));

   }).catch(err => {
    dispatch(useRewardsWithMemberNumberAction(Constants.GET_USER_LMREWARDS_MEMBERNUMBER_SUCCESS,[],"Internel server error",false));

   }
)
}

export const getFindMemberDetailsAPI =(rewardTypeId,memberNumber,clientName) => async (dispatch) => {
    dispatch(findMemberDetailAction(Constants.GET_FIND_MEMBERNUMBER_START,[],"",true));
    var config = {
        method:"get",
        url:``
    }
    await axios(config).then((response) => {
        dispatch(findMemberDetailAction(Constants.GET_FIND_MEMBERNUMBER_SUCCESS,response?.data?.findMemberNumberDetails,response?.data?.errorMessage,false));
    }).catch((err) => {
        dispatch(findMemberDetailAction(Constants.GET_FIND_MEMBERNUMBER_FAILURE,[],"Internel server error",false));
    })
}

export const saveUserPointsAPI =(clientName,value,searchValue) => async(dispatch) => {
    dispatch(saveUserPointsAction(Constants.SAVE_USER_POINTS_START,{},"",true));


    var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/SaveUserPoints?ClientName=${clientName}&MemberNumber=${value?.memberNumber}&UPC1=${value?.upc1}&Qty1=${value?.qty1}&UPC2=${value?.upc2}&Qty2=${value?.qty2}&TransactionAmount=${value?.transactionAmount}&RewardTypeId=${value?.rewardType}`
    }
    await axios(config).then((response) => {
        dispatch(saveUserPointsAction(Constants.SAVE_USER_POINTS_SUCCESS,response?.data?.saveUserPoints,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(saveUserPointsAction(Constants.SAVE_USER_POINTS_SUCCESS,{},"Internel server error",false));

    })
}

export const deleteUserAPI =(clientName,value,searchValue) => async(dispatch)=>{
    dispatch(deleteUserAction(Constants.DELETE_USER_START,{},"",true));
   let body = {
    
        "userDetailId": value?.userDetailId,
        "memberNumber":value?.memberNumber
      }

    
   
    var config = {
        method:`post`,
        url:`https://localhost:7140/api/RSASupportAPI/DeleteUser?clientName=${clientName}`,
        data:body
    }
    await axios(config).then(response => {

        dispatch(deleteUserAction(Constants.DELETE_USER_SUCCESS,response?.data?.deleteUser,response?.data?.errorMessage,false));
        if(response?.data?.errorMessage === "Successful"){
            dispatch(getFindShopperAPI(clientName,searchValue));
        }
    }).catch(err => {
        dispatch(deleteUserAction(Constants.DELETE_USER_FAILURE,{},'Internel server error',false));
       
    })
}

export const createShopperGroupsAPI = (clientName,signFromToDate,signUpToDate,firstName,lastName,userName,zipCode,clientStoreId,memberNumber,value,UserDetailId) => async(dispatch) =>{
//     let body = {
//           "signfromdate": "2024-02-02",
//   "signuptodate": "",
//   "firstname": "",
//   "lastname": "",
//   "username": "",
//   "zipcode": "",
//   "storeid": 4,
//   "membernumber": "",
//   "groupName": "TEST GROUP",
//   "description": "TEST "
//     }



    // https://localhost:7140/api/RSASupportAPI/CreateShopperGroups?clientName=Veritra%20RSA&SIGNFROMDATE=1994-11-01&SIGNUPTODATE=1994-11-01&FIRSTNAME=SAI&LASTNAME=KUMAR&USERNAME=sai@gmail.com&ZIPCODE=507134&STOREID=4&MEMBERNUMBER=384781273408&GroupName=TEST&Description=TEST GROUP
    var config = {
        method:'post',
        url:`https://localhost:7140/api/RSASupportAPI/CreateShopperGroups?clientName=${clientName}&SIGNFROMDATE=${signFromToDate}&SIGNUPTODATE=${signUpToDate}&FIRSTNAME=${firstName}&LASTNAME=${lastName}&USERNAME=${userName}&ZIPCODE=${zipCode}&STOREID=${clientStoreId}&MEMBERNUMBER=${memberNumber}&GroupName=${value.groupName}&Description=${value.description}&UserDetailId=${UserDetailId}`
       // url:`https://localhost:7140/api/RSASupportAPI/CreateShopperGroups?clientName=VeritraRSA`,
        //data:body
    }

    await axios(config).then((response) => {
        dispatch(createShopperGroupsAction(Constants.CREATE_SHOPPER_GROUPS_SUCCESS,"",response?.data?.errorMessage,false));
    }).then(err => {
        dispatch(createShopperGroupsAction(Constants.CREATE_SHOPPER_GROUPS_FAILURE,[],"Internel server error.",false));
    })
}

export const getUserGroupsAPI=(clientName,userId) => async(dispatch)=> {
    dispatch(GetUsersGroupsAction(Constants.GET_USER_GROUPS_START,[],"",true));
    var config ={
        method:'get',
        url:`https://localhost:7140/api/RSASupportAPI/GetUserGroups?clientName=${clientName}&userId=${userId}`
    }
    await axios(config).then((response) => {
        dispatch(GetUsersGroupsAction(Constants.GET_USER_GROUPS_SUCCESS,response?.data?.userGroups,response?.data?.errorMessage,false))
    }).catch((err) => {
        dispatch(GetUsersGroupsAction(Constants.GET_USER_AVAILABLE_GROUPS_FAILURE,[],"Internel server error.",false))

    })
}
export const getUserAvailableGroupsAPI=(clientName,userId) => async(dispatch)=> {
    dispatch(GetAvailableUsersGroupsAction(Constants.GET_USER_AVAILABLE_GROUPS_START,[],"",true));
    var config = {
        method:'get',
        url:`https://localhost:7140/api/RSASupportAPI/GetAvailableUserGroups?clientName=${clientName}&userId=${userId}`
    }
    await axios(config).then((response) => {
        dispatch(GetAvailableUsersGroupsAction(Constants.GET_USER_AVAILABLE_GROUPS_SUCCESS,response?.data?.availableUserGroups,response?.data?.errorMessage,false));
    }).catch((err) => {
        dispatch(GetAvailableUsersGroupsAction(Constants.GET_USER_AVAILABLE_GROUPS_FAILURE,[],"Internel server error",false));

    })
}

export const AddAvailableGroupsAPI =(clientName,userId,clubId) => async(dispatch) => {
    dispatch(AddAvailableUsersGroupsAction(Constants.ADD_USER_AVAILABLE_GROUPS_START,{},"",true));
    var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/AddGroups?clientName=${clientName}&userId=${userId}&clubId=${clubId}`
    }
await axios(config).then((response) => {
    dispatch(AddAvailableUsersGroupsAction(Constants.ADD_USER_AVAILABLE_GROUPS_SUCCESS,response?.data?.addGroups,response?.data?.errorMessage,false));
}).catch((err) => {
    dispatch(AddAvailableUsersGroupsAction(Constants.ADD_USER_AVAILABLE_GROUPS_FAILURE,{},"Internel server error.",false));

})

}

export const createShopperAPI = (clientName,value) => async(dispatch) => {
    dispatch(CreateShopperAction(Constants.CREATE_SHOPPER_START,"","",true));
    // let body = {
    //     "userName": "Rakesh@gmail.com",
    //     "password": "rakesh123",
    //     "confirmPassword": "rakesh123",
    //     "firstName": "Rakesh",
    //     "lastName": "Kuram",
    //     "userTypeId": 3,
    //     "zipCode": "352132",
    //     "mobile": "3265322210",
    //     "roleName": "ClientAdmin",
    //     "isActive": true
    //   }
    let body = {
        "userName": value?.userName,
        "password": value?.password,
        "confirmPassword": value?.confirmPassword,
        "firstName": value?.firstName,
        "lastName": value?.lastName,
        "userTypeId": value?.userTypeId,
        "zipCode":value?.zipCode,
        "mobile": value?.mobile,
        "roleName": value?.roleName,
        "isActive": value?.isActive
      }
      var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/CreateShopper?clientName=${clientName}`,
        data:body
      }
      await axios(config).then((response) => {
        if(response?.data?.errorCode === "400"){
           // dispatch(CreateShopperAction(Constants.CREATE_SHOPPER_SUCCESS,response?.data?.errorMessage,response?.data?.errorMessage,false));
        }else if(response?.data?.errorCode === "200"){
            dispatch(CreateShopperAction(Constants.CREATE_SHOPPER_SUCCESS,"Successful",response?.data?.errorMessage,false));

        }
        
      }).catch((err) => {
        console.log("errr mesage",err?.response)
        if(err?.response?.data?.errorCode  === "400" || err?.response?.data?.errorCode  === "500" ){
            dispatch(CreateShopperAction(Constants.CREATE_SHOPPER_FAILURE,err?.response?.data?.status,err?.response?.data?.errorMessage,false));
        }
        
      })
} 

export const GetRolesAPI =(clientName) => async (dispatch) => {
    dispatch(GetRolesAction(Constants.GET_ROLES_START,[],"",true));
    var config ={
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetRoles?clientName=${clientName}`
    }
    await axios(config).then((response) => {
        dispatch(GetRolesAction(Constants.GET_ROLES_SUCCESS,response?.data?.roles,response?.data?.errorMessage,false));
    }).catch((err) => {
        dispatch(GetRolesAction(Constants.GET_ROLES_FAILURE,[],"Internel server error",false));
    })
}

export const GetUserTypesAPI =(clientName) => async (dispatch) => {
    dispatch(GetUserTypesAction(Constants.GET_USERTYPES_START,[],"",true));
    var config = {
        method:'get',
        url:`https://localhost:7140/api/RSASupportAPI/GetUserTypes?clientName=${clientName}`
    }
    await axios(config).then((response) => {
        dispatch(GetUserTypesAction(Constants.GET_USERTYPES_SUCCESS,response?.data?.userTypes,response?.data?.errorMessage,false));
    }).catch((err) => {
        dispatch(GetUserTypesAction(Constants.GET_USERTYPES_FAILURE,[],"Internel server error",false));

    })
}

export const GetGroupAnalysisAPI=(clientName,groupId,userId) => async(dispatch) => {
    dispatch(GetGroupAnalysisAction(Constants.GET_GROUP_ANALYSIS_START,{},"",true));
    var config ={
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetGroupAnalysisTimeLine?clinetName=${clientName}&groupId=${groupId}&userId=${userId}`
    }
    await axios(config).then((response) => {
        dispatch(GetGroupAnalysisAction(Constants.GET_GROUP_ANALYSIS_SUCCESS,response?.data?.groupAnalysisList,response?.data?.errorMessage,false));

    }).catch(err => {
        dispatch(GetGroupAnalysisAction(Constants.GET_GROUP_ANALYSIS_SUCCESS,{},"Internel server error",false));
    })
    
}

export const GetAllshoppersGroupsAPI = (clientName,groupId,userId) => async(dispatch) =>{
    dispatch(GetAllShopperAction(Constants.GET_ALL_SHOPPERS_DATA_START,[],"",true));
    var config ={
        method:"get",
        //url:`https://localhost:7140/api/RSASupportAPI/AllShopperGroups?clientName=Veritra RSA&groupId=99&userId=0`
        url:`https://localhost:7140/api/RSASupportAPI/AllShopperGroups?clientName=${clientName}&groupId=${groupId}&userId=${userId}`

    }
    await axios(config).then(response => {
        dispatch(GetAllShopperAction(Constants.GET_ALL_SHOPPERS_DATA_SUCCESS,response?.data?.allShopperGroups,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(GetAllShopperAction(Constants.GET_ALL_SHOPPERS_DATA_FAILURE,{},"Internel server error",false));
        
    })
}

export const GetAllTimeProductsAPI =(ClientName,groupId) => async(dispatch) => {
    dispatch(GetAllTimeProductsAction(Constants.GET_ALL_TIME_PRODUCTS_START,[],"",true));
    var config ={
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetAllTimeProducts?clientName=${ClientName}&GroupId=${groupId}`
    }
    await axios(config).then((response) => {
        dispatch(GetAllTimeProductsAction(Constants.GET_ALL_TIME_PRODUCTS_SUCCESS,response?.data?.allTimeProducts,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(GetAllTimeProductsAction(Constants.GET_ALL_TIME_PRODUCTS_FAILURE,[],"Internel server error",false));
    })
}
export const GetTopProductsAPI =(clientName, groupId, noOfDays) => async(dispatch) => {
    dispatch(GetToProductsAction(Constants.GET_TOP_PRODUCTS_START,[],"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetTopProducts?clientName=${clientName}&GroupId=${groupId}&NoOfDays=${noOfDays}`
    }
    await axios(config).then((response) => {
        dispatch(GetToProductsAction(Constants.GET_TOP_PRODUCTS_SUCCESS,response?.data?.topProducts,response?.data?.errorMessage,true));
    }).catch(err => {
        if(err?.response?.status === 404){
            dispatch(GetToProductsAction(Constants.GET_TOP_PRODUCTS_FAILURE,[],"Top products not found.",false));
        }else{
            dispatch(GetToProductsAction(Constants.GET_TOP_PRODUCTS_FAILURE,[],"Internel server error",false));
        }
        
    })
}
// https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupByZipcodesList?clientName=Veritra RSA

// export const DownloadShoppersAPI =(ClientName,groupName,groupId)=> async(dispatch) =>{
//     dispatch(DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_START,"","",true));
//     var config ={

//         method:"get",
//         url:`https://localhost:7140/api/RSASupportAPI/DownloadShopperReport?clientName=${ClientName}&groupName=${groupName}&groupId=${groupId}`
//     }
// await axios(config).then(response => {
//     dispatch(DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_SUCCESS,"User reports downloaded successfully.","Successful",false));
// }).catch(err => {
//     dispatch(DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_FAILURE,"","Internel server error.",false));
// })
// }

// export const DownloadShoppersAPI = (ClientName, groupName, groupId) => async (dispatch) => {
//     // Dispatch start action

   
//     dispatch(
//         DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_START, "", "", true)
//     );

//     const config = {
//         method: "get",
//         url: `https://localhost:7140/api/RSASupportAPI/DownloadShopperReport`,
//         params: {
//             clientName: ClientName,
//             groupName: groupName,
//             groupId: groupId,
//         },
//         responseType: "blob", // Important for downloading files
//     };

//     try {
//         const response = await axios(config);

//         // Create a Blob from the response data
//         const blob = new Blob([response.data], {
//             type: response.headers["content-type"],
//         });

//         // Generate a URL for the Blob
//         const url = window.URL.createObjectURL(blob);

//         // Create a link element to trigger the download
//         const link = document.createElement("a");
//         link.href = url;

//         // Extract filename from Content-Disposition header, or use a default name
//         const contentDisposition = response.headers["content-disposition"];
//           const da = FormatUtcString(new Date());
         
      
//         const filename =
//             contentDisposition && contentDisposition.includes("filename=")
//                 ? contentDisposition
//                       .split("filename=")[1]
//                       .replace(/['"]/g, "") // Remove any quotes
//                 : `GroupUsers_Report_${FormatUtcString(new Date())}.xls"`; // Default file name

//         link.download = filename;

//         // Append link to the DOM and trigger the download
//         document.body.appendChild(link);
//         link.click();

//         // Cleanup
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);

//         // Dispatch success action
//         dispatch(
//             DownloadShoppersAction(
//                 Constants.DOWNLOAD_SHOPPERS_SUCCESS,
//                 "User reports downloaded successfully.",
//                 "Successful",
//                 false
//             )
//         );
//     } catch (err) {
//         console.error("Error downloading shopper report:", err);

//         // Dispatch failure action
//         dispatch(
//             DownloadShoppersAction(
//                 Constants.DOWNLOAD_SHOPPERS_FAILURE,
//                 "",
//                 "Internal server error.",
//                 false
//             )
//         );
//     }
// };

// https://localhost:7140/api/RSASupportAPI/UploadUPCTempalate
export const DownloadUPCTemplateAPI = () => async(dispatch) => {
    dispatch(
        DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_START, "", "", true)
    );
    var config = {
        method:"get",
        url:'https://localhost:7140/api/RSASupportAPI/UploadUPCTempalate',
        responseType:"blob"
    }
    try{
        const response = await axios(config);
        const blob = new Blob([response?.data],{
            type:response.headers["Content-Type"]
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition && contentDisposition.includes("filename=")
        ? contentDisposition.split("filename=")[1].replace(/['"]/g,"")
        : `UploadUPCTemplate.xlsx`;
        link.download = filename;
        document.body.appendChild(link);
         link.click();
         // clean up
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
                 dispatch(
            DownloadShoppersAction(
                Constants.DOWNLOAD_SHOPPERS_SUCCESS,
                "UPC Template downloaded successfully.",
                "Successful",
                false
            )
        );



    }catch(err){
        dispatch(
                        DownloadShoppersAction(
                            Constants.DOWNLOAD_SHOPPERS_FAILURE,
                            "",
                            "Internal server error.",
                            false
                        )
                    );
    }
}

export const DownloadShoppersAPI =(ClientName,groupName,groupId) => async(dispatch) => {
    dispatch(
        DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_START, "", "", true)
    );
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/DownloadShopperReport`,
        params:{
            clientName:ClientName,
            groupName:groupName,
            groupId:groupId
        },
        responseType: "blob",
    }
    try{
        const response = await axios(config);
        const blob = new Blob([response?.data],{
            type:response.headers["Content-Type"]
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition && contentDisposition.includes("filename=")
        ? contentDisposition.split("filename=")[1].replace(/['"]/g,"")
        : `GroupUsers_Report_${FormatUtcString(new Date())}.xls`;
        link.download = filename;
        document.body.appendChild(link);
         link.click();
         // clean up
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
                 dispatch(
            DownloadShoppersAction(
                Constants.DOWNLOAD_SHOPPERS_SUCCESS,
                "User reports downloaded successfully.",
                "Successful",
                false
            )
        );



    }catch(err){
        dispatch(
                        DownloadShoppersAction(
                            Constants.DOWNLOAD_SHOPPERS_FAILURE,
                            "",
                            "Internal server error.",
                            false
                        )
                    );
    }
}

export const preDefinedShopperGroupByZipcodesListDataAPI =(clientName,value)=>async(dispatch) => {
    dispatch(CreateZipcodesListGroupAction(Constants.CREATE_ZIPCODES_LIST_GROUP_STRAT,"","",true))
    let body = {
        "zipcodeList": value?.zipcodes,
        "allUsers": 0,
        "sinceRegistered":  new Date()
      }

      var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupByZipcodesList?clientName=${clientName}`,
        data:body
      }
      await axios(config).then((response) => {
        dispatch(CreateZipcodesListGroupAction(Constants.CREATE_ZIPCODES_LIST_GROUP_SUCCESS,response?.data?.status,response?.data?.errorMessage,false))
      }).catch(err => {
        dispatch(CreateZipcodesListGroupAction(Constants.CREATE_ZIPCODES_LIST_GROUP_FAILURE,"","Internel server error",false))
      })
}

export const PreDefinedShopperGroupsByLastShoppedDateAPI =(clientName,value) => async(dispatch) => {
    dispatch(CreateLastShopperGroupAction(Constants.CREATE_LOSTSHOPPER_GROUP_STRAT,"","",true));
    let body = {
        "noOfDaysSinceShopped": value?.lastDays,
        "groupName": value?.groupName
       
  
      }
      var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupsByLastShoppedDate?clientName=${clientName}`,
        data:body
      }
      await axios(config).then(response => {
        dispatch(CreateLastShopperGroupAction(Constants.CREATE_LOSTSHOPPER_GROUP_SUCCESS,response?.data?.status,response?.data?.errorMessage,false));
      }).catch(err => {
        dispatch(CreateLastShopperGroupAction(Constants.CREATE_LOSTSHOPPER_GROUP_SUCCESS,"","Internel server error",false));
      })

}

export const PreDefinedShopperGroupsByUPCListAPI =(clientName,value) => async(dispatch) => {
    dispatch(CreateUPCListGroupAction(Constants.CREATE_UPC_LIST_GROUP_STRAT,"","",true));
    let body = {
        "groupName":value?.productGroupName,
        "upcList":value?.productUPCs ,
        "noOfTimesPurchased": value?.productNoOfTimesBought,
        "noOfDaysSinceShopped": value?.productDuringLast

       
      }
      var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupsByUPCList?clientName=${clientName}`,
        data:body
      }
      await axios(config).then(response => {
        dispatch(CreateUPCListGroupAction(Constants.CREATE_UPC_LIST_GROUP_SUCCESS,response?.data?.status,response?.data?.errorMessage,false));
      }).catch(err => {
        dispatch(CreateUPCListGroupAction(Constants.CREATE_UPC_LIST_GROUP_FAILURE,"","Internel server error",false));

      })
}

//export const GetProductCategoriesAPI = (clientName) => async(dispatch) => {
    export const GetProductCategoriesAPI = () => async(dispatch) => {
     dispatch(GetProductCategoriesAction(Constants.GET_PRODUCT_CATEGORIES_START,[],"",true));
   
  
    var config = {
        method:"get",
       // url:`https://localhost:7140/api/RSASupportAPI/GetProductCategories?clientName=${clientName}`
        url:`https://localhost:7140/api/RSASupportAPI/GetProductCategories?clientName=Veritra RSA`
    }
    await axios(config).then(response => {
        dispatch(GetProductCategoriesAction(Constants.GET_PRODUCT_CATEGORIES_SUCCESS,response?.data?.productsCategories,response?.data?.errorMessage,false));
    }).catch(err => {
        
        dispatch(GetProductCategoriesAction(Constants.GET_PRODUCT_CATEGORIES_FAILURE,[],"",false));

    })
}

export const GetTopShoppersAPI = (clientName,value) => async(dispatch) => {
    dispatch(GetTopShopperAction(Constants.GET_TOP_SHOPPER_START,[],"",true));
    // {
    //     noOfRecords:"",
    //     storeId:0,
    //     orderByDirection:"",
    //     fromDate:"",
    //     toDate:"",
    //     departmentId:0
    // }
    var config ={
        method:'get',
        url:`https://localhost:7140/api/RSASupportAPI/GetTopShoppers?clientName=${clientName}&noOfRecords=${value?.noOfRecords}&storeId=${value?.storeId}&orderByDirection=${value?.orderByDirection}&fromDate=${value?.fromDate}&toDate=${value?.toDate}&departmentId=${value?.departmentId}`
    }
    await axios(config).then(response => {
        dispatch(GetTopShopperAction(Constants.GET_TOP_SHOPPER_SUCCESS,response?.data?.topShoppers,response?.data?.errorMessage,false));
    }).catch(err => {
        dispatch(GetTopShopperAction(Constants.GET_TOP_SHOPPER_FAILURE,[],"Internel server error",false));

    })
}




// DOWNLOAD TOP SHOPPERS :
export const DownloadTopShoppersAPI =(ClientName,value) => async(dispatch) => {
    dispatch(
        DownloadShoppersAction(Constants.DOWNLOAD_SHOPPERS_START, "", "", true)
    );
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/DownloadTopShoppers?clientName=Veritra RSA&noOfRecords=50&storeId=1&orderByDirection=ASC&fromDate=2019-06-23&toDate=2024-12-12&departmentId=0`,
        params:{
            clientName:ClientName,
            noOfRecords:value?.noOfRecords,
            storeId:value?.storeId,
            orderByDirection:value?.orderByDirection,
            fromDate:value?.fromDate,
            toDate:value?.toDate,
            departmentId:value?.departmentId
        },
        responseType: "blob",
    }
    try{
        const response = await axios(config);
        const blob = new Blob([response?.data],{
            type:response.headers["Content-Type"]
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition && contentDisposition.includes("filename=")
        ? contentDisposition.split("filename=")[1].replace(/['"]/g,"")
        : `Top Shoppers.xlsx`;
        link.download = filename;
        document.body.appendChild(link);
         link.click();
         // clean up
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
                 dispatch(
            DownloadShoppersAction(
                Constants.DOWNLOAD_SHOPPERS_SUCCESS,
                "User reports downloaded successfully.",
                "Successful",
                false
            )
        );



    }catch(err){
        dispatch(
                        DownloadShoppersAction(
                            Constants.DOWNLOAD_SHOPPERS_FAILURE,
                            "",
                            "Internal server error.",
                            false
                        )
                    );
    }
}

export const GetAdvancedShopperSearchAPI = (value) => async(dispatch) => {
    dispatch(GetAdvanceShopperAction(Constants.GET_ADVANCED_SHOPPER_SEARCH_START,[],"",true));

    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetShoppersAdvancedSearch?memberNumber=${value?.memberNumber}&transactionFrom=${value?.transactionFrom}&transactionTo=${value?.transactionTo}&minSpend=${value?.minSpend}&maxSpend=${value?.maxSpend}&clubId=${value?.clubId}&minBasketCount=${value?.minBasketCount}&maxBasketCount=${value?.maxBasketCount}&storeId=${value?.storeId}&minReedemCount=${value?.minReedemCount}&maxRedeemCount=${value?.maxRedeemCount}&departmentId=${value?.departmentId}&isCreatedGroup=${value?.isCreatedGroup}`
    }
    await axios(config).then(response => {
        dispatch(GetAdvanceShopperAction(Constants.GET_ADVANCED_SHOPPER_SEARCH_SUCCESS,response?.data?.advancedShoppers,response?.data?.errorMessage,false))
    }).catch(err => {
        console.log("data",err?.response)
        if(err?.response?.status === 404){
            dispatch(GetAdvanceShopperAction(Constants.GET_ADVANCED_SHOPPER_SEARCH_FAILURE,[],err?.response?.data?.errorMessage,false))

        }else{
            dispatch(GetAdvanceShopperAction(Constants.GET_ADVANCED_SHOPPER_SEARCH_FAILURE,[],"Internel server error",false))
        }
       

    }) 
}
export const GetShopperDetailsUPCsAPI = (clientName,value)=> async(dispatch) => {
    dispatch(GetShopperByUPCsAction(Constants.GET_SHOPPER_BY_UPCS_START,[],"",true));

    //  let body = {
    //     UPC:"",
    //     NoOfCoupons:"",
    //     FromDate:"",
    //     ToDate:""
    //  }

    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetFindShopperByUPCs?clientName=Veritra RSA&UPC=15&NoOfCoupons=0&FromDate=2018-08-02&ToDate=2019-08-02`

       // url:`https://localhost:7140/api/RSASupportAPI/GetFindShopperByUPCs?clientName=Veritra RSA&UPC=${value.UPC}&NoOfCoupons=${value?.NoOfCoupons}&FromDate=${value?.FromDate}&ToDate=${value?.ToDate}`
    }
    await axios(config).then(response => {
        dispatch(GetShopperByUPCsAction(Constants.GET_SHOPPER_BY_UPCS_SUCCESS,response?.data?.findShopperByUPCsList,response?.data?.errorMessage,false));
    }).catch(err => {
         if(err?.response?.status === 404){
            dispatch(GetShopperByUPCsAction(Constants.GET_SHOPPER_BY_UPCS_FAILURE,[],"No shoppers found",false));
         }else{
            dispatch(GetShopperByUPCsAction(Constants.GET_SHOPPER_BY_UPCS_FAILURE,[],"Internel server error",false));
         }
    })
}

export const GetProductDetailsUPCsAPI=(value) => async(dispatch) => {
    dispatch(GetProductDetailsUPCsAction(Constants.GET_SHOPPER_PRODUCT_START,[],"",true));
    // let body = {
    //     productCode:"",
    //     productName:"",
    //     productCategoryId:"0",
    //     isMajorDepartment:"false"


    // }
    var config={
        method:"get",
      //  url:`https://localhost:7140/api/RSASupportAPI/GetProductDetails?clientName=Veritra RSA&productCode=&productName=&productCategoryId=0&isMajorDepartment=true`
       url:`https://localhost:7140/api/RSASupportAPI/GetProductDetails?clientName=Veritra RSA&productCode=${value?.productCode}&productName=${value?.productName}&productCategoryId=${value?.productCategoryId}&isMajorDepartment=${value?.isMajorDepartment}`
    }

    await axios(config).then((response) => {
        dispatch(GetProductDetailsUPCsAction(Constants.GET_SHOPPER_PRODUCT_SUCCESS,response?.data?.productList,response?.data?.errorMessage,false));
    }).catch(err => {
        if(err?.response?.status === 404){
        dispatch(GetProductDetailsUPCsAction(Constants.GET_SHOPPER_PRODUCT_FAILURE,[],"No shoppers found.",false));
        
        }else{
        dispatch(GetProductDetailsUPCsAction(Constants.GET_SHOPPER_PRODUCT_FAILURE,[],"No shoppers found.",false));

        }
    })
}

export const GetSearchAndCountAPI =(value,clientName) => async(dispatch) => {
    dispatch(GetSearchandCountAction(Constants.GET_SEARCH_COUNT_START,[],"",true));
   
    var config = {
        method:`GET`,
        url:`https://localhost:7140/api/RSASupportAPI/GetSearchAndCountDetails?clientName=Veritra RSA&minDays=${value?.minDays}&maxDays=${value?.maxDays}&groupName=${value?.groupName}`
    }
    await axios(config).then((response) => {
        dispatch(GetSearchandCountAction(Constants.GET_SEARCH_COUNT_SUCCESS,response?.data?.shopperList,response?.data?.errorMessage,false));

    }).catch((err) => {
        if(err?.response?.status === 404){
            dispatch(GetSearchandCountAction(Constants.GET_SEARCH_COUNT_FAILURE,[],"Shopper data not found",false));
        } else{
            dispatch(GetSearchandCountAction(Constants.GET_SEARCH_COUNT_FAILURE,[],"Internel server error",false));
        }
        

    })
}
export const GetSearchAndCreateAPI =(value,clientName) => async(dispatch) => { 
    dispatch(GetSearchandCreateGroupAction(Constants.GET_SEARCH_CREATE_START,[],"",true));
    var config = {
        method:"post",
        url:`https://localhost:7140/api/RSASupportAPI/AddGroupWithSearchDetails?clientName=Veritra RSA&minDays=${value?.minDays}&maxDays=${value?.maxDays}&groupName=${value?.groupName}`
        //url:`https://localhost:7140/api/RSASupportAPI/AddGroupWithSearchDetails?clientName=Veritra RSA&minDays=${value?.minDays}&maxDays=${value?.maxDays}&groupName=${value?.groupName}`
        // https://localhost:7140/api/RSASupportAPI/AddGroupWithSearchDetails?clientName=Veritra%20RSA&minDays=1&maxDays=100&groupName=Sai%20Special%20Group
       // url:`https://localhost:7140/api/RSASupportAPI/GetSearchAndCreateGroup?clientName=Veritra RSA&minDays=${value?.minDays}&maxDays=${value?.maxDays}&groupName=${value?.groupName}`
    }
    await axios(config).then((response) => {
        dispatch(GetSearchandCreateGroupAction(Constants.GET_SEARCH_CREATE_SUCCESS,response?.data?.shopperList,response?.data?.errorMessage,false));

    }).catch(err => {
        if(err?.response?.status === 404){
            dispatch(GetSearchandCreateGroupAction(Constants.GET_SEARCH_CREATE_FAILURE,0,"Failed",false));
        } else{
            dispatch(GetSearchandCreateGroupAction(Constants.GET_SEARCH_CREATE_FAILURE,0,"Internel server error",false));
        }
    })
}

export const UploadShoppersGroupsAPI = (clientName,value) => async(dispatch) => {
    dispatch(UploadShoppersAction(Constants.UPLOAD_SHOPPERS_START,0,"",true));
    let body = new FormData();
      body.append("file",value?.file)
    var config = {
        method:"post",
        url: `https://localhost:7140/api/RSASupportAPI/UploadShoppers?clientName=${encodeURIComponent(clientName)}&groupName=${encodeURIComponent(value?.groupName)}`,
        //url:`https://localhost:7140/api/RSASupportAPI/UploadShoppers?clientName=Veritra RSA&groupName=${value?.groupName}`,
        data:body,
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    await axios(config).then((response) => {
        dispatch(UploadShoppersAction(Constants.UPLOAD_SHOPPERS_SUCCESS,response?.data?.upload,response?.data?.errorMessage,false));
    }).catch(err => {
        if(err?.response?.status === 400){
            dispatch(UploadShoppersAction(Constants.UPLOAD_SHOPPERS_FAILURE,0,"Something went wrong",false));
        } else{
            dispatch(UploadShoppersAction(Constants.UPLOAD_SHOPPERS_FAILURE,0,"Internel server error.",false));
        }
    })
}

export const GetNewsCategoriesAPI = (clientName) => async(dispatch) => {
    dispatch(NewsCategoryAction(Constants.GET_NEWS_CATAGORY_START,[],"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/GetNewsCategories?clientName=Veritra RSA`
    }
    await axios(config).then((response) => {
        dispatch(NewsCategoryAction(Constants.GET_NEWS_CATAGORY_SUCCESS,response?.data?.newsCategories,response?.data?.errorMessage,false));
    }).catch((err) => {
        if(err?.response?.status === 404){
            dispatch(NewsCategoryAction(Constants.GET_NEWS_CATAGORY_FAILURE,[],"No categories found",false));
        } else{
            dispatch(NewsCategoryAction(Constants.GET_NEWS_CATAGORY_FAILURE,[],"Internel server error",false));
        }
    })
}
export const FindCouponsAPI =(clientName,value) => async(dispatch) => {
    dispatch(FindCouponAction(Constants.GET_FIND_COUPON_START,[],"",true));
    var config = {
        method:"get",
        url:`https://localhost:7140/api/RSASupportAPI/FindCoupons?clientName=Veritra RSA&newsCategoryId=${value?.newsCategoryId}&valid=${value?.valid}&expires=${value?.expires}`
    }
    await axios(config).then(response => {
        dispatch(FindCouponAction(Constants.GET_FIND_COUPON_SUCCESS,response?.data?.coupons,response?.data?.errorMessage,false)); 
    }).catch((err) => {
        if(err?.response?.status === 404){
            dispatch(FindCouponAction(Constants.GET_FIND_COUPON_FAILURE,[],"No coupons found",false));
        } else{
            dispatch(FindCouponAction(Constants.GET_FIND_COUPON_FAILURE,[],"Internel server error",false));
        }
    })
}

export const CreateBasketCouponAPI = (clientName,value) => async(dispatch) => {
    dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_START,0,"",true))


    // let body = {
    //     "newsID": value?.newsId,
    //     "newsCategoryId": value?.newsCategoryId,
    //     "title": value?.title,
    //     "details": value?.details,
    //     "imagePath": value?.imagePath,
    //     "validFromDate": DateFormatToYYYYMMddTime(value?.validFromDate),
    //     "expiresOn": DateFormatToYYYYMMddTime(value?.expiresOn),
    //     "sendNotification": value?.sendNotification,
    //     "customerId": value?.customerId,
    //     "createUserId": value?.createUserId,
    //     "updateUserId": value?.updateUserId,
    //     "puiCode":value?.puiCode,
    //     "productId": value?.productId,
    //     "amount": value?.amount,
    //     "discountAmount": value?.discountAmount,
    //     "isDiscountPercentage": value?.isDiscountPercentage,
    //     "ncrPromotionCode": value?.ncrPromotionCode,
    //     "isItStoreSpecific":value?.isItStoreSpecific,
    //     "manufacturerCouponId": value?.manufacturerCouponId,
    //     "productQuantity": value?.productQuantity,
    //     "upSellProductId": value?.upSellProductId,
    //     "upSellProductQuantity": value?.upSellProductQuantity,
    //     "isFeatured": value?.isFeatured,
    //     "deleteFlag": value?.deleteFlag,
    //     "isItTargetSpecific": value?.isItTargetSpecific,
    //     "otherDetails": value?.otherDetails,
    //     "isRecurring": value?.isRecurring,
    //     "mfgShutOffDate": DateFormatToYYYYMMddTime(value?.mfgShutOffDate).slice(0,10),
    //     "isDealOfTheWeek": value?.isDealOfTheWeek,
    //     "departmentId": value?.departmentId,
    //     "isMajorDepartment": value?.isMajorDepartment,
    //     "storeId": value?.storeId,
    //     "pageNumber": 1,
    //     "pdfFileName": `${value.title}.pdf `,
    //     "clubId": 0,
    //     "userDetailId": 0,
    //     "clubMemberId": 3,
    //     "id": 0,
    //     "storeRouteId":value?.storeRouteId,
    //     "clientStoreId": 0,
    //     "news_Id": "",
    //     "recurringStartDate": DateFormatToYYYYMMddTime(value?.validFromDate),
        
    //     "recurringEndDate":  DateFormatToYYYYMMddTime(value?.recurringEndDate),
    //     "recurringTypeId": 1,
    //     "clubIds": value?.clubIds,
    //     "groupNames": value?.groupNames,
    //     "clientStoreIds": value?.clientStoreIds
    //   }

    console.log("value api ",value)
    let body = {
        "newsID": value?.newsID,
        "newsCategoryId": value?.newsCategoryI,
        "title": value?.title,
        "details": value?.details,
        "imagePath": value?.imagePath,
        "validFromDate": DateFormatToYYYYMMddTime(value?.validFromDate),
        "expiresOn": DateFormatToYYYYMMddTime(value?.expiresOn),
       
        "sendNotification": value?.sendNotification,
        "customerId": value?.customerId,
        "createUserId": value?.createUserId,
        "updateUserId": value?.updateUserId,
        "puiCode": value?.puiCode,
        "productId": value?.productId,
        "amount": value?.amount,
        "discountAmount": value?.discountAmount,
        "isDiscountPercentage": value?.isDiscountPercentage,
        "ncrPromotionCode": value?.ncrPromotionCode,
        "isItStoreSpecific": value?.isItStoreSpecific,
        "manufacturerCouponId": value?.manufacturerCouponId,
        "productQuantity": value?.productQuantity,
        "upSellProductId": value?.upSellProductId,
        "upSellProductQuantity": value?.upSellProductQuantity,
        "isFeatured": value?.isFeatured,
        "deleteFlag": false, // default to false
        "isItTargetSpecific": value?.isItTargetSpecific,
        "otherDetails": value?.otherDetails === "" ? value?.title : value?.otherDetails,
        "isRecurring": value?.isRecurring,
         //"mfgShutOffDate":  DateFormatToYYYYMMddTime(value?.expiresOn),
        "mfgShutOffDate": (value?.mfgShutOffDate),
        "isDealOfTheWeek": value?.isDealOfTheWeek,
        "departmentId": value?.departmentId,
        "isMajorDepartment": value?.isMajorDepartment,
        "storeId": value?.clientStoreIds,
        "pageNumber": 1,
        "pdfFileName": "example",
        "clubId": 0,
        "userDetailId": 0,
        "clubMemberId": 0,
        "id": 0,
        "storeRouteId": "",
        "clientStoreId": 0,
         "recurringStartDate": DateFormatToYYYYMMddTime(value.validFromDate),
         "recurringEndDate": DateFormatToYYYYMMddTime(value.recurringEndDate),

      
        "recurringTypeId": 1,
        "clubIds": value?.clubIds,
        "groupNames": value?.groupNames,
        "clientStoreIds": value?.clientStoreIds
      }
      
      console.log("body",body);
    var config = {
        method:'post',
        url:`https://localhost:7140/api/RSASupportAPI/CreateBasketCoupon?clientName=Veritra RSA`,
        data:body
    }
    await axios(config).then(response => {
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_SUCCESS,response?.data?.status,response?.data?.errorMessage,false))
    }).catch((err) => {
        if(err?.response?.status === 400){
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_FAILURE,0,"Something went wrong. Please try again.",false))
        setTimeout(() => {
            dispatch(FindCouponsAPI("Veritra RSA",value))
        }, 1000);
        }else{
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_FAILURE,0,"Internel server error.",false))

        }
    })
}
export const CreateBasketCouponAPID = (clientName,value) => async(dispatch) => {
    dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_START,0,"",true))


    // let body = {
    //     "newsID": value?.newsId,
    //     "newsCategoryId": value?.newsCategoryId,
    //     "title": value?.title,
    //     "details": value?.details,
    //     "imagePath": value?.imagePath,
    //     "validFromDate": DateFormatToYYYYMMddTime(value?.validFromDate),
    //     "expiresOn": DateFormatToYYYYMMddTime(value?.expiresOn),
    //     "sendNotification": value?.sendNotification,
    //     "customerId": value?.customerId,
    //     "createUserId": value?.createUserId,
    //     "updateUserId": value?.updateUserId,
    //     "puiCode":value?.puiCode,
    //     "productId": value?.productId,
    //     "amount": value?.amount,
    //     "discountAmount": value?.discountAmount,
    //     "isDiscountPercentage": value?.isDiscountPercentage,
    //     "ncrPromotionCode": value?.ncrPromotionCode,
    //     "isItStoreSpecific":value?.isItStoreSpecific,
    //     "manufacturerCouponId": value?.manufacturerCouponId,
    //     "productQuantity": value?.productQuantity,
    //     "upSellProductId": value?.upSellProductId,
    //     "upSellProductQuantity": value?.upSellProductQuantity,
    //     "isFeatured": value?.isFeatured,
    //     "deleteFlag": value?.deleteFlag,
    //     "isItTargetSpecific": value?.isItTargetSpecific,
    //     "otherDetails": value?.otherDetails,
    //     "isRecurring": value?.isRecurring,
    //     "mfgShutOffDate": DateFormatToYYYYMMddTime(value?.mfgShutOffDate).slice(0,10),
    //     "isDealOfTheWeek": value?.isDealOfTheWeek,
    //     "departmentId": value?.departmentId,
    //     "isMajorDepartment": value?.isMajorDepartment,
    //     "storeId": value?.storeId,
    //     "pageNumber": 1,
    //     "pdfFileName": `${value.title}.pdf `,
    //     "clubId": 0,
    //     "userDetailId": 0,
    //     "clubMemberId": 3,
    //     "id": 0,
    //     "storeRouteId":value?.storeRouteId,
    //     "clientStoreId": 0,
    //     "news_Id": "",
    //     "recurringStartDate": DateFormatToYYYYMMddTime(value?.validFromDate),
        
    //     "recurringEndDate":  DateFormatToYYYYMMddTime(value?.recurringEndDate),
    //     "recurringTypeId": 1,
    //     "clubIds": value?.clubIds,
    //     "groupNames": value?.groupNames,
    //     "clientStoreIds": value?.clientStoreIds
    //   }

    console.log("value api ",value)
    let body = {
        "newsID": value?.newsID,
        "newsCategoryId": value?.newsCategoryI,
        "title": value?.title,
        "details": value?.details,
        "imagePath": value?.imagePath,
        "validFromDate": DateFormatToYYYYMMddTime(value?.validFromDate),
        "expiresOn": DateFormatToYYYYMMddTime(value?.expiresOn),
       
        "sendNotification": value?.sendNotification,
        "customerId": value?.customerId,
        "createUserId": value?.createUserId,
        "updateUserId": value?.updateUserId,
        "puiCode": value?.puiCode,
        "productId": value?.productId,
        "amount": value?.amount,
        "discountAmount": value?.discountAmount,
        "isDiscountPercentage": value?.isDiscountPercentage,
        "ncrPromotionCode": value?.ncrPromotionCode,
        "isItStoreSpecific": value?.isItStoreSpecific,
        "manufacturerCouponId": value?.manufacturerCouponId,
        "productQuantity": value?.productQuantity,
        "upSellProductId": value?.upSellProductId,
        "upSellProductQuantity": value?.upSellProductQuantity,
        "isFeatured": value?.isFeatured,
        "deleteFlag": false, // default to false
        "isItTargetSpecific": value?.isItTargetSpecific,
        "otherDetails": value?.otherDetails === "" ? value?.title : value?.otherDetails,
        "isRecurring": value?.isRecurring,
         "mfgShutOffDate":  DateFormatToYYYYMMddTime(value?.expiresOn),
        //"mfgShutOffDate": (value?.mfgShutOffDate),
        "isDealOfTheWeek": value?.isDealOfTheWeek,
        "departmentId": value?.departmentId,
        "isMajorDepartment": value?.isMajorDepartment,
        "storeId": value?.clientStoreIds,
        "pageNumber": 1,
        "pdfFileName": "example",
        "clubId": 0,
        "userDetailId": 0,
        "clubMemberId": 0,
        "id": 0,
        "storeRouteId": "",
        "clientStoreId": 0,
         "recurringStartDate": DateFormatToYYYYMMddTime(value.recurringStartDate),
         "recurringEndDate": DateFormatToYYYYMMddTime(value.recurringEndDate),

      
        "recurringTypeId": 1,
        "clubIds": value?.clubIds,
        "groupNames": value?.groupNames,
        "clientStoreIds": value?.clientStoreIds
      }
      
      console.log("body",body);
    var config = {
        method:'post',
        url:`https://localhost:7140/api/RSASupportAPI/CreateBasketCoupon?clientName=Veritra RSA`,
        data:body
    }
    await axios(config).then(response => { 
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_SUCCESS,response?.data?.status,response?.data?.errorMessage,false))
    }).catch((err) => {
        if(err?.response?.status === 400){
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_FAILURE,0,"Something went wrong. Please try again.",false))
       
        }else{
        dispatch(CreateBasketCouponAction(Constants.CREATE_BASKET_COUPON_FAILURE,0,"Internel server error.",false))

        }
    })
}
// https://localhost:7140/api/RSASupportAPI/CreateBasketCoupon?clientName=Veritra RSA

//https://localhost:7140/api/RSASupportAPI/GetNewsCategories?clientName=Veritra RSA
// https://localhost:7140/api/RSASupportAPI/FindCoupons?clientName=Veritra RSA&newsCategoryId=4&valid=2020-05-17&expires=2020-06-22

// https://localhost:7140/api/RSASupportAPI/UploadShoppers?clientName=2&groupName=s
// https://localhost:7140/api/RSASupportAPI/GetSearchAndCreateGroup?clientName=Veritra RSA&minDays=0&maxDays=100&groupName=Veritra Family  Group
// https://localhost:7140/api/RSASupportAPI/GetSearchAndCountDetails?clientName=Veritra RSA&minDays=0&maxDays=100&groupName=SAI TEST

// https://localhost:7140/api/RSASupportAPI/GetFindShopperByUPCs?clientName=Veritra RSA&UPC=15&NoOfCoupons=0&FromDate=2018-08-02&ToDate=2019-08-02
// https://localhost:7140/api/RSASupportAPI/GetProductDetails?clientName=Veritra RSA&productCode=&productName=&productCategoryId=0&isMajorDepartment=true

// https://localhost:7140/api/RSASupportAPI/GetShoppersAdvancedSearch?memberNumber=0&transactionFrom=2024-12-05&transactionTo=2024-12-12&minSpend=0&maxSpend=0&clubId=0&minBasketCount=0&maxBasketCount=0&storeId=0&minReedemCount=0&maxRedeemCount=0&departmentId=0&isCreatedGroup=false

// https://localhost:7140/api/RSASupportAPI/DownloadTopShoppers?clientName=Veritra RSA&noOfRecords=50&storeId=1&orderByDirection=ASC&fromDate=2019-06-23&toDate=2024-12-12&departmentId=0
//https://localhost:7140/api/RSASupportAPI/GetProductCategories?clientName=Veritra RSA
// https://localhost:7140/api/RSASupportAPI/GetTopShoppers?clientName=Veritra RSA&noOfRecords=50&storeId=1&orderByDirection=ASC&fromDate=2019-06-23&toDate=2024-12-12&departmentId=0

// https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupsByLastShoppedDate?clientName=Veritra RSA
// https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupByZipcodesList?clientName=Veritra RSA
// https://localhost:7140/api/RSASupportAPI/PreDefinedShopperGroupsByUPCList?clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/DownloadShopperReport?clientName=Veritra%20RSA&groupId=99
// https://localhost:7140/api/RSASupportAPI/GetGroupAnalysisTimeLine?clinetName=Veritra%20RSA&groupId=99&userId=0
//https://localhost:7140/api/RSASupportAPI/AllShopperGroups?clientName=Veritra RSA&groupId=99&userId=0
//https://localhost:7140/api/RSASupportAPI/GetAllTimeProducts?clientName=Veritra RSA&GroupId=0
//https://localhost:7140/api/RSASupportAPI/GetTopProducts?clientName=Veritra RSA&GroupId=0&NoOfDays=7



// https://localhost:7140/api/RSASupportAPI/CreateShopper?clientName=Veritra RSA
// https://localhost:7140/api/RSASupportAPI/GetRoles?clientName=Veritra RSA
//https://localhost:7140/api/RSASupportAPI/GetUserTypes?clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/GetUserGroups?clientName=Veritra RSA&userId=3462
// https://localhost:7140/api/RSASupportAPI/GetAvailableUserGroups?clientName=Veritra RSA&userId=3461
//https://localhost:7140/api/RSASupportAPI/AddGroups?clientName=Veritra RSA&userId=3481&clubId=5


// https://localhost:7140/api/RSASupportAPI/GetClientData?clientName=RSA TEST05&selectQuery=select * from UserDetails
// https://localhost:7140/api/RSASupportAPI/GetLMReward?clientName=SAI KUMAR&selectQuery=SELECT * FROM LM_REWARD

//https://localhost:7140/api/RSASupportAPI/GetClientStores?clientName=Veritra RSA

//https://localhost:7140/api/RSASupportAPI/GetRewardTypes?clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/GetFindShopperDetailsById?clientName=Veritra RSA&userDetailId=1

// https://localhost:7140/api/RSASupportAPI/UpdateUserDetails?clientName=Veritra RSA&userDetailId=3457
// https://localhost:7140/api/RSASupportAPI/GetUserClipsAndRedemptionDates?userId=2

// https://localhost:7140/api/RSASupportAPI/GetUserRewardCoupons?userDetailId=1
// https://localhost:7140/api/RSASupportAPI/GetUserBasketTransactions?userId=2460&clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/GetUserRecentPurchasedProducts?Transaction=2460^86276&clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/UserPurchasedCoupon?Transaction=2460^2&clientName=Veritra RSA

//https://localhost:7140/api/RSASupportAPI/GetLMRewardsWithMemberNumber?memberNumber=44205593556&clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/GetFindMemberDetails?rewardTypeId=2&memberNumber=44205593556&clientName=Veritra%20RSA

// https://localhost:7140/api/RSASupportAPI/SaveUserPoints?ClientName=Veritra RSA&MemberNumber=44205593556&UPC1=7143000974&Qty1=2&UPC2=17143000975&Qty2=10&TransactionAmount=2500&RewardTypeId=2

//https://localhost:7140/api/RSASupportAPI/DeleteUser?clientName=Veritra RSA

// https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=Veritra RSA&page=1&limit=2&email=&barcodeValue=&mobile=&zipCode=&clientStoreId=&firstName=&lastName=&signUpFromDate=&signUpToDate=&sortColumn=&sortDirection=

// https://localhost:7140/api/RSASupportAPI/GetPaginationData?clientName=Veritra RSA&page=&limit=&email=&barcodeValue=&mobile=&zipCode=&clientStoreId=4&firstName=&lastName=&signUpFromDate=&signUpToDate=&sortColumn=&sortDirection=

// https://localhost:7140/api/RSASupportAPI/CreateShopperGroups?clientName=VeritraRSA
// {
//   "signfromdate": "2024-02-02",
//   "signuptodate": "",
//   "firstname": "",
//   "lastname": "",
//   "username": "",
//   "zipcode": "",
//   "storeid": 4,
//   "membernumber": "",
//   "groupName": "TEST GROUP",
//   "description": "TEST "
// }