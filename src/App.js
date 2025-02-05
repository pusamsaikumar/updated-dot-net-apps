import React, { useState, useEffect  } from "react";
import Header from "./components/Header/Header";
import ContentPage from "./components/ContentPage"
import Sidebar from "./components/SideBar/Sidebar";
import { BrowserRouter,Routes ,Route } from "react-router-dom";
import SelectQuery from "./components/SelectQuery/SelectQuery";
import ViewReward from "./components/Reward/ViewReward/ViewReward"; 
import FindMemberNumberReward from "./components/Reward/FindMemberNumberReward/FindMemberNumberReward";
import FindShoppers from "./components/Shoppers/FindShoppers";
import ShopperTransaction from "./components/Shoppers/ShopperTransaction";
import Layout from "./components/Layout/Layout";




const App = () => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Toggle function to change the state
  const toggleMenu = () => {
    setIsEnlarged(!isEnlarged);
  };
  
  const [retailerName, setRetailerName] = useState("");
  const handleRetailerName =(e)=> {
   setRetailerName(e.target.value);
  }
 
  return (
    <>
    <Layout />
   
    {/* <BrowserRouter>
    <div id="wrapper" className={isEnlarged ? "enlarged" : "force"}>
      <Header 
      toggleMenu={toggleMenu} 
      isEnlarged = {isEnlarged} 
       handleRetailerName = {handleRetailerName}
        retailerName={retailerName}
        setRetailerName = {setRetailerName}
        />
  
    </div>
    <Routes>
      <Route path="/support/cleintaccess" element={<SelectQuery clientName={retailerName} />} />
      <Route path="/reward/viewreward" element ={<ViewReward clientName={retailerName} />} />
      <Route path="/reward/findmemberrewards"  element = {<FindMemberNumberReward clientName={retailerName} />} />
      <Route path="/shoppers/findshoppers" element = {<FindShoppers clientName={retailerName} />} />
      <Route path="/shoppers/shoppertransaction" element = {<ShopperTransaction clientName={retailerName} />} />
      
    </Routes>
    </BrowserRouter> */}
    </>
    
   
  );
};

export default App;

