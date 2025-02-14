




export const getClientNamesReducer =(state,payload)=> {
    return {
        ...state,
        getcleintNamesdata: payload && payload.data && payload.data,
        getclientNamesMessage : payload && payload.message && payload.message,
        getclientNamesLoading : payload && payload.loading && payload.loading

       
    }
}



export const getClientDataReducer=(state,payload)=>{
    return {
        ...state,
        getcleintsdata:payload && payload.data && payload.data,
        getclientsMessage:payload && payload.message && payload.message,
        getclientsLoading:payload && payload.loading && payload.loading,
      }

    }

export const getLMRewardReducer = (state,payload) => {
    return {
        ...state,
        getLMRewardData:payload && payload.data && payload.data,
    getLMRewardMessage: payload && payload.message && payload.message,
    getLMRewardLoading:payload && payload.loading && payload.loading
    }
}

export const getFindShopperReducer = (state,payload) => {
    return {
        ...state,
        getFindShopperData:payload && payload.data && payload.data,
        getFindShopperMessage:payload && payload.message && payload.message,
        getFindShopperLoading:payload && payload.loading && payload.loading
    }
}

export const getClientStoresReducer = (state,payload) => {
    return {
        ...state,
        getClientStoresData:payload && payload.data && payload.data,
        getClientStoresMessage:payload && payload.message && payload.message,
        getClientStoresLoading:payload && payload.loading && payload.loading
    }
}

export const getRewardTypesReducer = (state,payload) => {
    return {
        ...state,
        getRewardTypesData:payload && payload.data && payload.data,
        getRewardTypesMessage:payload && payload.message && payload.message,
        getRewardTypesLoading:payload && payload.loading && payload.loading
    }
}

export const getFindShopperByIdReducer = (state,payload) => {
    return {
        ...state,
        getFindShopperDetailsData:payload && payload.data && payload.data,
        getFindShopperDetailsMessage:payload && payload.message && payload.message,
        getFindShopperDetailsLoading:payload && payload.loading && payload.loading
    }
}

export const updateFindShopperReducer =(state,payload) => {
    return {
        ...state,
        updateFindShopperData:payload && payload.data && payload.data,
        updateFindShopperMessage:payload && payload.message && payload.message,
        updateFindShopperLoading:payload && payload.loading && payload.loading
    }
}

export const getUserClipsAndRedemptionsReducer = (state,payload) => {
    return {
        ...state,
        getUserClipsAndRedemptionData: payload && payload.data && payload.data,
    getUserClipsAndRedemptionMessage:payload && payload.message && payload.message,
    getUserClipsAndRedemptionLoading:payload && payload.loading && payload.loading
    }
}

export const getUserRewardCouponsReducer =(state,payload) => {
   return {
    ...state,
    userRewardCouponsData:payload && payload.data && payload.data,
    userRewardCouponsMessage:payload && payload.message && payload.message,
    userRewardCouponsLoading:payload && payload.loading && payload.loading
   }
}

export const useHistoryReducer = (state,payload) => {
return {
    ...state,
    userHistoryData : payload && payload.data && payload.data,
    useHistoryMessage:payload && payload.message && payload.message,
    useHistoryLoading:payload && payload.loading && payload.loading
}
}
export const userBasketTransactionReducer =(state,payload)=>{
    return {
        ...state,
        getUserBasketTransactionsData:payload && payload.data && payload.data,
        getUserBasketTransactionsMessage:payload && payload.message && payload.message,
        getUserBasketTransactionsLoading:payload && payload.loading && payload.loading
    }
}

export const getUserPurchasedProductsReducer =(state,payload) => {
    return {
        ...state,
        getUserRecentPurchasedProductsData:payload && payload.data && payload.data,
        getUserRecentPurchasedProductsMessage:payload && payload.message && payload.message,
        getUserRecentPurchasedProductsLoading:payload && payload.loading && payload.loading   
    }
}

export const getUserPurchasedCouponsReducer=(state,payload) => {
    return {
        ...state,
        getUserPurchasedCouponData:payload && payload.data && payload.data,
        getUserPurchasedCouponMessage:payload && payload.message && payload.message,
        getUserPurchasedCouponLoading:payload && payload.loading && payload.loading   
    }
}
export const getUserLMRewardswithMemberNumberReducer = (state,payload) => {
    return {
        ...state,
        getLMRewardsWithMemberNumberData:payload && payload.data && payload.data,
    getLMRewardsWithMemberNumberMessage:payload && payload.message && payload.message,
    getLMRewardsWithMemberNumberLoading:payload && payload.loading && payload.loading 
    }
}

export const  findMemberReducerDetails =(state,payload) => {
    return {
        ...state,
        getFindMemberDetails:payload && payload.data && payload.data,
        getFindMemberMessage:payload && payload.message && payload.message,
        getFindMemberLoading:payload && payload.loading && payload.loading 
    
    }
}

export const saveUserPointsReducer = (state,payload) => {
    return {
        ...state,
        saveUserPointsData:payload && payload.data && payload.data,
        saveUserPointsMessage:payload && payload.message && payload.message,
        saveUserPointsLoading:payload && payload.loading && payload.loading 
    }
}

export const deleteUserReducer =(state,payload) => {
    return {
        ...state,
        deleteUserData:payload && payload.data && payload.data,
       deleteUserMessage:payload && payload.message && payload.message,
       deleteUserLoading:payload && payload.loading && payload.loading 
    }
}
export const findShopperPagination = (state,payload) =>{
return {
    ...state,
    getFindShopperPaginationData:payload && payload.data && payload.data,
    getFindShopperPaginationMessage:payload && payload.message && payload.message,
    getFindShopperPaginationLoading:payload && payload.loading && payload.loading
}
}

export const createShopperGroupsReducer = (state,payload)=>{
    return {
        ...state,
        createShopperGroupsData:payload && payload.data && payload.data,
    createShopperGroupsMessage:payload && payload.message && payload.message,
    createShopperGroupsLoading:payload && payload.loading && payload.loading
    }
}

export const getUserGroupsReducer = (state,payload) => {
    return {
        ...state,
        getUserGroupsData:payload && payload.data && payload.data,
    getUserGroupsMessage:payload && payload.message && payload.message,
    getUserGroupsLoading:payload && payload.loading && payload.loading

  

    }
}

export const getUserAvailableGroups = (state,payload) => {
    return {
        ...state,
        getUserAvailableGroupsData:payload && payload.data && payload.data,
        getUserAvailableGroupsMessage:payload && payload.message && payload.message,
        getUserAvailableGroupsLoading:payload && payload.loading && payload.loading,
    }
}

export const addGroupsReducer =(state,payload) => {
    return {
        ...state,
        addGroupsData:payload && payload.data && payload.data,
        addGroupsMessage:payload && payload.message && payload.message,
        addGroupsLoading:payload && payload.loading && payload.loading,
    }
}

export const createShopperReducer =(state,payload) => {
    return {
        ...state,
        createShopperData:payload && payload.data && payload.data,
      
    createShopperMessage:payload && payload.message && payload.message,
    createShopperLoading :payload && payload.loading && payload.loading,

    }
}

export const getRolesReducer = (state,payload) => {
    return {
        ...state,
        getRolesData:payload && payload.data && payload.data,
        getRolesMessage:payload && payload.message && payload.message,
        getRolesLoading:payload && payload.loading && payload.loading,
    }
}

export const getUserTypesReducer = (state,payload) => {
    return {
        ...state,
        getUserTypesData:payload && payload.data && payload.data,
        getUserTypesMessage:payload && payload.message && payload.message,
        getUserTypesLoading:payload && payload.loading && payload.loading,
    }
}
export const GetGroupAnalysisTimeLineReducer =(state,payload)=> {
    return {
        ...state,
        getGroupAnalysisTimeLineData:payload && payload.data && payload.data,
        getGroupAnalysisTimeLineMessage:payload && payload.message && payload.message,
        getGroupAnalysisTimeLineLoading:payload && payload.loading && payload.loading,
    }
}

export const GetAllShopperGroupsReducer=(state,payload)=>{
    return {
        ...state,
        getAllShopperGroupsData:payload && payload.data && payload.data,
        getAllShopperGroupsMessage:payload && payload.message && payload.message,
        getAllShopperGroupsLoading:payload && payload.loading && payload.loading,
    }
}

export const GetAllTimeProductsData =(state,payload)=> {
    return {
        ...state,
        getAllTimeProductsData:payload && payload.data && payload.data,
        getAllTimeProductsMessage:payload && payload.message && payload.message,
        getAllTimeProductsLoading:payload && payload.loading && payload.loading,
    }
}
export const GetTopProductsData =(state,payload)=>{
    return {
        ...state,
        getTopProductsData:payload && payload.data && payload.data,
        getTopProductsMessage:payload && payload.message && payload.message,
        getTopProductsLoading:payload && payload.loading && payload.loading,

    }
}
 export const downloadShopperReducer =(state,payload)=>{
    return {
        ...state,
        downloadShopperdata:payload && payload.data && payload.data,
        downloadShopperMessage:payload && payload.message && payload.message,
        downloadShopperLoading:payload && payload.loading && payload.loading,
    }
 }  

export const CreateUpcListReducers = (state,payload) => {
    return {
        ...state,
        preDefinedShopperGroupsByUPCListData:payload && payload.data && payload.data,
        preDefinedShopperGroupsByUPCListMessage:payload && payload.message && payload.message,
        preDefinedShopperGroupsByUPCListLoading:payload && payload.loading && payload.loading,
    
    }
}
    
export const CreatelostShopperReducers = (state,payload) => {
    return {
        ...state,
        preDefinedShopperGroupsByLastShoppedDateData:payload && payload.data && payload.data,
preDefinedShopperGroupsByLastShoppedDateMessage:payload && payload.message && payload.message,
preDefinedShopperGroupsByLastShoppedDateLoading:payload && payload.loading && payload.loading,
    
    }
}

export const CreateZipcodesListReducers = (state,payload) => {
    return {
        ...state,
        preDefinedShopperGroupByZipcodesListData:payload && payload.data && payload.data,
        preDefinedShopperGroupByZipcodesListMessage:payload && payload.message && payload.message,
        preDefinedShopperGroupByZipcodesListLoading:payload && payload.loading && payload.loading,
    
    }
}

export const GetProductCategoryReducer = (state,payload) => {
    return {
        ...state,
        getProductCategoriesData:payload && payload.data && payload.data,
        getProductCategoriesMessage:payload && payload.message && payload.message,
        getProductCategoriesLoading:payload && payload.loading && payload.loading,
    }
}

export const GetTopShoppersReducer = (state,payload) => {
    return {
        ...state,
        getTopShoppersData:payload && payload.data && payload.data,
        getTopShoppersMessage:payload && payload.message && payload.message,
        getTopShoppersLoading:payload && payload.loading && payload.loading,
        
    }
}

export const GetAdvancedShopperSearchReducer = (state,payload) => {
    return {
        ...state,
        getShoppersAdvancedSearchData:payload && payload.data && payload.data,
    getShoppersAdvancedSearchMessage:payload && payload.message && payload.message,
    getShoppersAdvancedSearchLoading:payload && payload.loading && payload.loading,
    }
}

export const GetFindShopperByUpcsReducer =(state,payload) => {
    return {
        ...state,
        getFindShopperByUPCsData:payload && payload.data && payload.data,
        getFindShopperByUPCsMessage:payload && payload.message && payload.message,
        getFindShopperByUPCsLoading:payload && payload.loading && payload.loading,
    
    }
}
export const GetProductDetailsReducer=(state,payload) => {
    return {
        ...state,
        getProductDetailsData:payload && payload.data && payload.data,
        getProductDetailsMessage:payload && payload.message && payload.message,
        getProductDetailsLoading:payload && payload.loading && payload.loading,
    
    }
}
export const GetSearchandCountReducer=(state,payload) => {
    return {
        ...state,
        getSearchAndCountData:payload && payload.data && payload.data,
        getSearchAndCountMessage:payload && payload.message && payload.message,
        getSearchAndCountLoading:payload && payload.loading && payload.loading,
    
    }
}
export const GetSearchandCreateGroupReducer=(state,payload) => {
    return {
        ...state,
        getSearchAndCreateGroupData:payload && payload.data && payload.data,
        getSearchAndCreateGroupMessage:payload && payload.message && payload.message,
        getSearchAndCreateGroupLoading:payload && payload.loading && payload.loading,
    
    }
}

export const UploadShopperReducer=(state,payload) => {
    return {
        ...state,
        uploadShopperData:payload && payload.data && payload.data,
        uploadShopperMessage:payload && payload.message && payload.message,
        uploadShopperLoading:payload && payload.loading && payload.loading,
    }
}
export const NewsCategoriesReducer=(state,payload) => {
    return {
        ...state,
        getNewsCategoriesData:payload && payload.data && payload.data,
        getNewsCategoriesMessage:payload && payload.message && payload.message,
        getNewsCategoriesLoading:payload && payload.loading && payload.loading,
    }
}

export const FindCouponsReducer=(state,payload) => {
    return {
        ...state,
        getFindCouponsData:payload && payload.data && payload.data,
        getFindCouponsMessage:payload && payload.message && payload.message,
        getFindCouponsLoading:payload && payload.loading && payload.loading,
    }
}

export const createBasketCouponReducer = (state,payload) => {
    return {
        ...state,
    
        createBasketCouponData:payload && payload.data && payload.data,
        createBasketCouponMessage:payload && payload.message && payload.message,
        createBasketCouponLoading:payload && payload.loading && payload.loading,
        
    }
}
export const  CreateUPCCouponReducer=(state,payload)=> {
    return {
        ...state,
        createUPCCouponData:payload && payload.data && payload.data,
        createUPCCouponMessage:payload && payload.message && payload.message,
        createUPCCouponLoading:payload && payload.loading && payload.loading,
    }
}












   

   