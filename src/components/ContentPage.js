import React from 'react'
import SelectQuery from './SelectQuery/SelectQuery'
import { useLocation } from 'react-router-dom';
import ViewReward from './Reward/ViewReward/ViewReward';
import FindMemberNumberReward from './Reward/FindMemberNumberReward/FindMemberNumberReward';
import FindShoppers from './Shoppers/FindShoppers';
import ShopperTransaction from './Shoppers/ShopperTransaction';

const ContentPage = () => {
  const location = useLocation();
  const supportAccessPath = location?.pathname?.includes("/support/clientaccess");
  const viewRewardPath = location?.pathname?.includes("/reward/viewreward");
  const findMemberNumberRewardsPath = location?.pathname?.includes("/reward/findmemberrewards");
  const findShopperPath = location?.pathname?.includes("/shoppers/findshoppers");
  const shopperTransactionPath = location?.pathname?.includes("/shoppers/shoppertransaction");
  return (
  <>
    <>
     
      {/* {
        window.location.href.includes("/support/clientaccess") &&   <SelectQuery clientName={clientName}  />
      } */}
      {
        supportAccessPath && <SelectQuery />
      }
     
       {
        viewRewardPath && <ViewReward />
       }
       {
        findMemberNumberRewardsPath && <FindMemberNumberReward />
       }
       {
        findShopperPath && <FindShoppers />
       }
       {
        shopperTransactionPath && <ShopperTransaction />
       }
    </>
  </>
  )
}

export default ContentPage