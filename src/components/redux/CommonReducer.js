import { ADD_USER_AVAILABLE_GROUPS_FAILURE, ADD_USER_AVAILABLE_GROUPS_START, Add_USER_AVAILABLE_GROUPS_SUCCESS, CREATE_BASKET_COUPON_FAILURE, CREATE_BASKET_COUPON_START, CREATE_BASKET_COUPON_SUCCESS, CREATE_LOSTSHOPPER_GROUP_FAILURE, CREATE_LOSTSHOPPER_GROUP_STRAT, CREATE_LOSTSHOPPER_GROUP_SUCCESS, CREATE_SHOPPER_FAILURE, CREATE_SHOPPER_GROUPS_FAILURE, CREATE_SHOPPER_GROUPS_START, CREATE_SHOPPER_GROUPS_SUCCESS, CREATE_SHOPPER_START, CREATE_SHOPPER_SUCCESS, CREATE_UPC_LIST_GROUP_FAILURE, CREATE_UPC_LIST_GROUP_STRAT, CREATE_UPC_LIST_GROUP_SUCCESS, CREATE_ZIPCODES_LIST_GROUP_FAILURE, CREATE_ZIPCODES_LIST_GROUP_STRAT, CREATE_ZIPCODES_LIST_GROUP_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_START, DELETE_USER_SUCCESS, DOWNLOAD_SHOPPERS_FAILURE, DOWNLOAD_SHOPPERS_START, DOWNLOAD_SHOPPERS_SUCCESS, GET_ADVANCED_SHOPPER_SEARCH_FAILURE, GET_ADVANCED_SHOPPER_SEARCH_START, GET_ADVANCED_SHOPPER_SEARCH_SUCCESS, GET_ALL_SHOPPERS_DATA_FAILURE, GET_ALL_SHOPPERS_DATA_START, GET_ALL_SHOPPERS_DATA_SUCCESS, GET_ALL_TIME_PRODUCTS_FAILURE, GET_ALL_TIME_PRODUCTS_START, GET_ALL_TIME_PRODUCTS_SUCCESS, GET_CLIENT_STORES_DATA_FAILURE, GET_CLIENT_STORES_DATA_SUCCESS, GET_CLINET_DATA_FAILURE, GET_CLINET_DATA_START, GET_CLINET_DATA_SUCCESS, GET_CLINET_FAILURE, GET_CLINET_START, GET_CLINET_SUCCESS, GET_FIND_COUPON_FAILURE, GET_FIND_COUPON_START, GET_FIND_COUPON_SUCCESS, GET_FIND_MEMBERNUMBER_FAILURE, GET_FIND_MEMBERNUMBER_START, GET_FIND_MEMBERNUMBER_SUCCESS, GET_FIND_SHOPPER_DATA_BY_ID_FAILURE, GET_FIND_SHOPPER_DATA_BY_ID_START, GET_FIND_SHOPPER_DATA_BY_ID_SUCCESS, GET_FIND_SHOPPER_DATA_FAILURE, GET_FIND_SHOPPER_DATA_START, GET_FIND_SHOPPER_DATA_SUCCESS, GET_GROUP_ANALYSIS_FAILURE, GET_GROUP_ANALYSIS_START, GET_GROUP_ANALYSIS_SUCCESS, GET_LM_REWARD_DATA_FAILURE, GET_LM_REWARD_DATA_START, GET_LM_REWARD_DATA_SUCCESS, GET_NEWS_CATAGORY_FAILURE, GET_NEWS_CATAGORY_START, GET_NEWS_CATAGORY_SUCCESS, GET_PRODUCT_CATEGORIES_FAILURE, GET_PRODUCT_CATEGORIES_START, GET_PRODUCT_CATEGORIES_SUCCESS, GET_REWARD_TYPES_DATA_FAILURE, GET_REWARD_TYPES_DATA_SUCCESS, GET_ROLES_FAILURE, GET_ROLES_START, GET_ROLES_SUCCESS, GET_SEARCH_COUNT_FAILURE, GET_SEARCH_COUNT_START, GET_SEARCH_COUNT_SUCCESS, GET_SEARCH_CREATE_FAILURE, GET_SEARCH_CREATE_START, GET_SEARCH_CREATE_SUCCESS, GET_SHOPPER_BY_UPCS_FAILURE, GET_SHOPPER_BY_UPCS_START, GET_SHOPPER_BY_UPCS_SUCCESS, GET_SHOPPER_PRODUCT_FAILURE, GET_SHOPPER_PRODUCT_START, GET_SHOPPER_PRODUCT_SUCCESS, GET_TOP_PRODUCTS_FAILURE, GET_TOP_PRODUCTS_START, GET_TOP_PRODUCTS_SUCCESS, GET_TOP_SHOPPER_FAILURE, GET_TOP_SHOPPER_SUCCESS, GET_USER_AVAILABLE_GROUPS_FAILURE, GET_USER_AVAILABLE_GROUPS_START, GET_USER_AVAILABLE_GROUPS_SUCCESS, GET_USER_BASKET_TRANSACTION_FAILURE, GET_USER_BASKET_TRANSACTION_START, GET_USER_BASKET_TRANSACTION_SUCCESS, GET_USER_CLIPS_REDEMPTIONS_FAILURE, GET_USER_CLIPS_REDEMPTIONS_START, GET_USER_CLIPS_REDEMPTIONS_SUCCESS, GET_USER_GROUPS_FAILURE, GET_USER_GROUPS_START, GET_USER_GROUPS_SUCCESS, GET_USER_HISTORY_FAILURE, GET_USER_HISTORY_START, GET_USER_HISTORY_SUCCESS, GET_USER_LMREWARDS_MEMBERNUMBER_FAILURE, GET_USER_LMREWARDS_MEMBERNUMBER_START, GET_USER_LMREWARDS_MEMBERNUMBER_SUCCESS, GET_USER_PURCHASE_COUPONS_FAILURE, GET_USER_PURCHASE_COUPONS_START, GET_USER_PURCHASE_COUPONS_SUCCESS, GET_USER_PURCHASE_PRODUCT_FAILURE, GET_USER_PURCHASE_PRODUCT_START, GET_USER_PURCHASE_PRODUCT_SUCCESS, GET_USER_REWARD_COUPONS_FAILURE, GET_USER_REWARD_COUPONS_START, GET_USER_REWARD_COUPONS_SUCCESS, GET_USERTYPES_FAILURE, GET_USERTYPES_START, GET_USERTYPES_SUCCESS, PAGINATION_FAILURE, PAGINATION_START, PAGINATION_SUCCESS, SAVE_USER_POINTS_FAILURE, SAVE_USER_POINTS_START, SAVE_USER_POINTS_SUCCESS, UPDATE_FIND_SHOPPER_DATA_BY_ID_FAILURE, UPDATE_FIND_SHOPPER_DATA_BY_ID_START, UPDATE_FIND_SHOPPER_DATA_BY_ID_SUCCESS, UPLOAD_SHOPPERS_FAILURE, UPLOAD_SHOPPERS_START, UPLOAD_SHOPPERS_SUCCESS } from "./Constant";
import INITIAL_STATE  from "./INITIAL_STATE";
import { addGroupsReducer, createBasketCouponReducer, CreatelostShopperReducers, createShopperGroupsReducer, createShopperReducer, CreateUpcListReducers, CreateZipcodesListReducers, deleteUserReducer, downloadShopperReducer, FindCouponsReducer, findMemberReducerDetails, findShopperPagination, GetAdvancedShopperSearchReducer, GetAllShopperGroupsReducer, GetAllTimeProductsData, getClientDataReducer, getClientNamesReducer, getClientStoresReducer, getFindShopperByIdReducer, GetFindShopperByUpcsReducer, getFindShopperReducer, GetGroupAnalysisTimeLineReducer, getLMRewardReducer, GetProductCategoryReducer, GetProductDetailsReducer, getRewardTypesReducer, getRolesReducer, GetSearchandCountReducer, GetSearchandCreateGroupReducer, GetTopProductsData, GetTopShoppersReducer, getUserAvailableGroups, getUserClipsAndRedemptionsReducer, getUserGroupsReducer, getUserLMRewardswithMemberNumberReducer, getUserPurchasedCouponsReducer, getUserPurchasedProductsReducer, getUserRewardCouponsReducer, getUserTypesReducer, NewsCategoriesReducer, saveUserPointsReducer, updateFindShopperReducer, UploadShopperReducer, useHistoryReducer, userBasketTransactionReducer } from "./Reducer";



const reducers = {
    GET_CLINET_START:getClientNamesReducer,
    GET_CLINET_SUCCESS:getClientNamesReducer,
    GET_CLINET_FAILURE:getClientNamesReducer,

    GET_CLINET_DATA_START:getClientDataReducer,
    GET_CLINET_DATA_SUCCESS:getClientDataReducer,
    GET_CLINET_DATA_FAILURE:getClientDataReducer,
    
    GET_LM_REWARD_DATA_START:getLMRewardReducer,
    GET_LM_REWARD_DATA_SUCCESS:getLMRewardReducer,
    GET_LM_REWARD_DATA_FAILURE:getLMRewardReducer,

    GET_FIND_SHOPPER_DATA_START:getFindShopperReducer,
    GET_FIND_SHOPPER_DATA_SUCCESS:getFindShopperReducer,
    GET_FIND_SHOPPER_DATA_FAILURE:getFindShopperReducer,

    GET_CLIENT_STORES_DATA_START:getClientStoresReducer,
    GET_CLIENT_STORES_DATA_SUCCESS:getClientStoresReducer,
    GET_CLIENT_STORES_DATA_FAILURE:getClientStoresReducer,

    GET_REWARD_TYPES_DATA_START:getRewardTypesReducer,
    GET_REWARD_TYPES_DATA_SUCCESS:getRewardTypesReducer,
    GET_REWARD_TYPES_DATA_FAILURE:getRewardTypesReducer,

    GET_FIND_SHOPPER_DATA_BY_ID_START:getFindShopperByIdReducer,
    GET_FIND_SHOPPER_DATA_BY_ID_SUCCESS:getFindShopperByIdReducer,
    GET_FIND_SHOPPER_DATA_BY_ID_FAILURE:getFindShopperByIdReducer,

    UPDATE_FIND_SHOPPER_DATA_BY_ID_START:updateFindShopperReducer,
    UPDATE_FIND_SHOPPER_DATA_BY_ID_SUCCESS:updateFindShopperReducer,
    UPDATE_FIND_SHOPPER_DATA_BY_ID_FAILURE:updateFindShopperReducer,

    GET_USER_CLIPS_REDEMPTIONS_START:getUserClipsAndRedemptionsReducer,
    GET_USER_CLIPS_REDEMPTIONS_SUCCESS:getUserClipsAndRedemptionsReducer,
    GET_USER_CLIPS_REDEMPTIONS_FAILURE:getUserClipsAndRedemptionsReducer,

    GET_USER_REWARD_COUPONS_START:getUserRewardCouponsReducer,
    GET_USER_REWARD_COUPONS_SUCCESS:getUserRewardCouponsReducer,
    GET_USER_REWARD_COUPONS_FAILURE:getUserRewardCouponsReducer,

    GET_USER_HISTORY_START: useHistoryReducer,
    GET_USER_HISTORY_SUCCESS:useHistoryReducer,
    GET_USER_HISTORY_FAILURE:useHistoryReducer,

    GET_USER_BASKET_TRANSACTION_START: userBasketTransactionReducer,
    GET_USER_BASKET_TRANSACTION_SUCCESS: userBasketTransactionReducer,
    GET_USER_BASKET_TRANSACTION_FAILURE:userBasketTransactionReducer,

    GET_USER_PURCHASE_PRODUCT_START:getUserPurchasedProductsReducer,
    GET_USER_PURCHASE_PRODUCT_SUCCESS:getUserPurchasedProductsReducer,
    GET_USER_PURCHASE_PRODUCT_FAILURE:getUserPurchasedProductsReducer,
   
    GET_USER_PURCHASE_COUPONS_START:getUserPurchasedCouponsReducer,
    GET_USER_PURCHASE_COUPONS_SUCCESS:getUserPurchasedCouponsReducer,
    GET_USER_PURCHASE_COUPONS_FAILURE:getUserPurchasedCouponsReducer,

    GET_USER_LMREWARDS_MEMBERNUMBER_START:getUserLMRewardswithMemberNumberReducer,
    GET_USER_LMREWARDS_MEMBERNUMBER_SUCCESS:getUserLMRewardswithMemberNumberReducer,
    GET_USER_LMREWARDS_MEMBERNUMBER_FAILURE:getUserLMRewardswithMemberNumberReducer,

    GET_FIND_MEMBERNUMBER_START:findMemberReducerDetails,
    GET_FIND_MEMBERNUMBER_SUCCESS:findMemberReducerDetails,
    GET_FIND_MEMBERNUMBER_FAILURE:findMemberReducerDetails,

    SAVE_USER_POINTS_START:saveUserPointsReducer,
    SAVE_USER_POINTS_SUCCESS:saveUserPointsReducer,
    SAVE_USER_POINTS_FAILURE:saveUserPointsReducer,

    DELETE_USER_START:deleteUserReducer,
    DELETE_USER_SUCCESS:deleteUserReducer,
    DELETE_USER_FAILURE:deleteUserReducer,
    
     PAGINATION_START:findShopperPagination,
     PAGINATION_SUCCESS:findShopperPagination,
     PAGINATION_FAILURE:findShopperPagination,

     CREATE_SHOPPER_GROUPS_START:createShopperGroupsReducer,
     CREATE_SHOPPER_GROUPS_SUCCESS:createShopperGroupsReducer,
     CREATE_SHOPPER_GROUPS_FAILURE:createShopperGroupsReducer,
    GET_USER_GROUPS_START:getUserGroupsReducer,
    GET_USER_GROUPS_SUCCESS:getUserGroupsReducer,
    GET_USER_GROUPS_FAILURE:getUserGroupsReducer,
    GET_USER_AVAILABLE_GROUPS_START:getUserAvailableGroups,
    GET_USER_AVAILABLE_GROUPS_SUCCESS:getUserAvailableGroups,
    GET_USER_AVAILABLE_GROUPS_FAILURE:getUserAvailableGroups,
    ADD_USER_AVAILABLE_GROUPS_START:addGroupsReducer,
    ADD_USER_AVAILABLE_GROUPS_SUCCESS:addGroupsReducer,
    ADD_USER_AVAILABLE_GROUPS_FAILURE:addGroupsReducer,

    CREATE_SHOPPER_START:createShopperReducer,
    CREATE_SHOPPER_SUCCESS:createShopperReducer,
    CREATE_SHOPPER_FAILURE:createShopperReducer,

    GET_USERTYPES_START:getUserTypesReducer,
    GET_USERTYPES_SUCCESS:getUserTypesReducer,

    GET_USERTYPES_FAILURE:getUserTypesReducer,

    GET_ROLES_START:getRolesReducer,
    GET_ROLES_SUCCESS:getRolesReducer,
    GET_ROLES_FAILURE:getRolesReducer,

    GET_GROUP_ANALYSIS_START:GetGroupAnalysisTimeLineReducer,
    GET_GROUP_ANALYSIS_SUCCESS:GetGroupAnalysisTimeLineReducer,
    GET_GROUP_ANALYSIS_FAILURE:GetGroupAnalysisTimeLineReducer,

    GET_ALL_TIME_PRODUCTS_START:GetAllTimeProductsData,
    GET_ALL_TIME_PRODUCTS_SUCCESS:GetAllTimeProductsData,
    GET_ALL_TIME_PRODUCTS_FAILURE:GetAllTimeProductsData,

    GET_ALL_SHOPPERS_DATA_START:GetAllShopperGroupsReducer,
    GET_ALL_SHOPPERS_DATA_SUCCESS:GetAllShopperGroupsReducer,
    GET_ALL_SHOPPERS_DATA_FAILURE:GetAllShopperGroupsReducer,

    GET_TOP_PRODUCTS_START:GetTopProductsData,
    GET_TOP_PRODUCTS_SUCCESS:GetTopProductsData,
    GET_TOP_PRODUCTS_FAILURE:GetTopProductsData,  

    DOWNLOAD_SHOPPERS_START:downloadShopperReducer,
    DOWNLOAD_SHOPPERS_SUCCESS:downloadShopperReducer,
    DOWNLOAD_SHOPPERS_FAILURE:downloadShopperReducer,
    CREATE_UPC_LIST_GROUP_STRAT:CreateUpcListReducers,
    CREATE_UPC_LIST_GROUP_SUCCESS:CreateUpcListReducers,
    CREATE_UPC_LIST_GROUP_FAILURE:CreateUpcListReducers,

    CREATE_LOSTSHOPPER_GROUP_STRAT:CreatelostShopperReducers,
    CREATE_LOSTSHOPPER_GROUP_SUCCESS:CreatelostShopperReducers,
    CREATE_LOSTSHOPPER_GROUP_FAILURE:CreatelostShopperReducers,

    CREATE_ZIPCODES_LIST_GROUP_STRAT:CreateZipcodesListReducers,
    CREATE_ZIPCODES_LIST_GROUP_SUCCESS:CreateZipcodesListReducers,
    CREATE_ZIPCODES_LIST_GROUP_FAILURE:CreateZipcodesListReducers,

    GET_PRODUCT_CATEGORIES_START:GetProductCategoryReducer,
    GET_PRODUCT_CATEGORIES_SUCCESS:GetProductCategoryReducer,
    GET_PRODUCT_CATEGORIES_FAILURE:GetProductCategoryReducer,
    GET_TOP_SHOPPER_START: GetTopShoppersReducer,
    GET_TOP_SHOPPER_SUCCESS: GetTopShoppersReducer,
    GET_TOP_SHOPPER_FAILURE: GetTopShoppersReducer,

    GET_ADVANCED_SHOPPER_SEARCH_START:GetAdvancedShopperSearchReducer,
    GET_ADVANCED_SHOPPER_SEARCH_SUCCESS:GetAdvancedShopperSearchReducer,
    GET_ADVANCED_SHOPPER_SEARCH_FAILURE:GetAdvancedShopperSearchReducer,

    GET_SHOPPER_BY_UPCS_START:GetFindShopperByUpcsReducer,
    GET_SHOPPER_BY_UPCS_SUCCESS:GetFindShopperByUpcsReducer,
    GET_SHOPPER_BY_UPCS_FAILURE:GetFindShopperByUpcsReducer,

    GET_SHOPPER_PRODUCT_START:GetProductDetailsReducer,
    GET_SHOPPER_PRODUCT_SUCCESS:GetProductDetailsReducer,
    GET_SHOPPER_PRODUCT_FAILURE:GetProductDetailsReducer,

    GET_SEARCH_COUNT_START:GetSearchandCountReducer,
    GET_SEARCH_COUNT_SUCCESS:GetSearchandCountReducer,
    GET_SEARCH_COUNT_FAILURE:GetSearchandCountReducer,

    GET_SEARCH_CREATE_START:GetSearchandCreateGroupReducer,
    GET_SEARCH_CREATE_SUCCESS:GetSearchandCreateGroupReducer,
    GET_SEARCH_CREATE_FAILURE:GetSearchandCreateGroupReducer,

    UPLOAD_SHOPPERS_START:UploadShopperReducer,
    UPLOAD_SHOPPERS_SUCCESS:UploadShopperReducer,
    UPLOAD_SHOPPERS_FAILURE:UploadShopperReducer,

    GET_FIND_COUPON_START:FindCouponsReducer,
    GET_FIND_COUPON_SUCCESS:FindCouponsReducer,
    GET_FIND_COUPON_FAILURE:FindCouponsReducer,

    GET_NEWS_CATAGORY_START:NewsCategoriesReducer,
    GET_NEWS_CATAGORY_SUCCESS:NewsCategoriesReducer,
    GET_NEWS_CATAGORY_FAILURE:NewsCategoriesReducer,

   
    CREATE_BASKET_COUPON_START:createBasketCouponReducer,
    CREATE_BASKET_COUPON_SUCCESS:createBasketCouponReducer,
    CREATE_BASKET_COUPON_FAILURE:createBasketCouponReducer,
}


export const commonReducer = (state = INITIAL_STATE,action) => {
    const {type,payload} = action;
    const reducer = reducers[type];
    return reducer ? reducer(state,payload) : state;
}