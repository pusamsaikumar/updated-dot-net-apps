import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCoffee, faBars, faSearch, faPowerOff, faUser, faAngleDown, faHome, faCircle, faUsers, faAngleUp, faIndent, faInbox } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "../Dropdown/Dropdown";
import Menubar from "../Dropdown/Menubar";
import { useLocation } from "react-router-dom";



const Sidebar = () => {


  const [searchText, setSearchText] = useState("");
  const [openDropDown, setOpenDropDown] = useState(null);
  
  const handleSearch = () => {
    
  }

const handleDropDownToggle = (e,menuName) => {
  e.preventDefault();
setOpenDropDown((prev) => {
  return prev === menuName ? null : menuName;
})
}

const [activeIndex,setActiveIndex] = useState(null)
const isActive =(index) => {
  console.log("index",index)
  setActiveIndex(index)
}
const activePath = (path) => {
  return window.location.href.includes(path)
}



  return (
    <div className="left side-menu" style={{ position: "fixed", height: "100%", top: "50px", bottom: "50px"}}>
      <div className="slimScrollDiv" >
        <div className="sidebar-inner slimscrollleft">
          {/* <div className="navbar-form form-group" style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Shopper Email/Member Number"
              id="UserText"
              className="form-control"
              name="User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ padding: "6px 12px", color: "#ccc", marginLeft: "5px", width: "210px", fontSize: "13px" }}
            />
            <button type="button" onClick={handleSearch} className="btn search-button" id="btnSearchShpr">
              <FontAwesomeIcon icon={faSearch} style={{ width: "13px", height: "14px" }} />
            </button>
          </div>

          <div className="clearfix">

          </div>

          <div className="profile-info">
            <div className="col-xs-4">
              <a href="#" className="rounded-image profile-image">
                <img src="/Content/admin/images/UserImage.png" alt="User Profile" />
              </a>
            </div>
            <div className="col-xs-8">
              <div className="profile-button">
                <a className="md-trigger" href="javascript:;" title="Sign Out">
                 
                  <FontAwesomeIcon icon={faPowerOff} className=" text-red-1" />
                </a>
              </div>
            </div>
          </div> */}

          {/* <hr className="divider" /> */}


          <div id="sidebar-menu">
            <ul className="sidebar-menu-ul">
             
              <li className="has_sub sub-support">
                <a href="" className={openDropDown === "support" ? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "support")}>
                
                  <FontAwesomeIcon icon={faUsers} className="faAngledown" aria-hidden="true" />
                  <span>Support</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={ openDropDown === "support"  ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                  openDropDown === "support" &&
                  <ul id="sub-item" className="sidebar-menu-ul-child-Support nav"
                    style={{ display:  'block' }}

                  >
                    <li className="client">
                      <a href="/support/cleintaccess">
                        <span>Client Access</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href="/support/rewardstuck">
                        <span>Reward Stuck</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/myrewards">
                        <span>My Rewards</span>
                      </a>
                    </li> */}
                  </ul>
                }
              </li>
              <li className="has_sub sub-shopper" >
                <a href="" className={openDropDown === 'reward' ? "d-block subdrop" : "d-block"} onClick={(e) => { handleDropDownToggle(e, "reward") }}>
               
                  <FontAwesomeIcon icon={faUser} className="faAngledown" />
                  <span className="menuText">Reward</span>
                  <span className="pull-right">

                    <FontAwesomeIcon icon={ openDropDown === 'reward' ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />


                  </span>
                </a>
                {
                  openDropDown === 'reward' &&
                  <ul id="submenu" className="sidebar-menu-ul-child-Shopper nav"
                    style={{ display: "block" }}
 
                  >
                    <li>
                      <a href="/reward/viewreward">
                        <span>View Reward</span>
                      </a>
                    </li>
                    <li>
                      <a href="/reward/findmemberrewards">
                        <span style={{width:"200px"}}>Find Member Rewards</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href="/support/lastredemption">
                        <span>Last Redemptions Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/missingqtoken">
                        <span>Missing Qtoken</span>
                      </a>
                    </li> */}
                  </ul>
                }
               
              </li>


              <li className="has_sub sub-shoppers" >
                <a href="" className={openDropDown === 'shoppers' ? "d-block subdrop" : "d-block"} onClick={(e) => { handleDropDownToggle(e, "shoppers") }}>
               
                  <FontAwesomeIcon icon={faUser} className="faAngledown" />
                  <span className="menuText">Shoppers</span>
                  <span className="pull-right">

                    <FontAwesomeIcon icon={ openDropDown === 'shoppers' ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />


                  </span>
                </a>
                {
                  openDropDown === 'shoppers' &&
                  <ul id="submenu" className="sidebar-menu-ul-child-Shopper nav"
                    style={{ display: "block" }}

 
                  >
                     <li>
                      <a href="/shoppers/createshopper" 
                       className={ activePath("/shoppers/createshopper") ? "active":""}
                    
                      >
                        <span>Create Shopper</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shoppers/findshoppers"
                         className={ activePath("/shoppers/findshoppers") ? "active":""}
                         
                      >
                        <span>Find Shopper</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shoppers/ShopperGroupsList" 
                         className={ activePath("/shoppers/ShopperGroupsList") ? "active":""}
                        
                      >
                        <span>Shopper Groups</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shopper/AutomatedGroups"
                       className={activePath("/shopper/AutomatedGroups") ? "active":""}
                      
                      >
                        <span>Pre-Defined Groups</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shopper/TopShopper" 
                       className={activePath("/shopper/TopShopper")  ? "active":""}
                     
                      >
                        <span>Top Shopper</span>
                      </a>
                    </li>

                    <li>
                      <a href="/shopper/AdvanceSearch" 
                       className={activePath("/shopper/AdvanceSearch")  ? "active":""}
                     
                      >
                        <span>Advance Search</span>
                      </a>
                    </li>
                    
                    <li>
                      <a href="/shopper/ProductShopperSearch" 
                       className={activePath("/shopper/ProductShopperSearch")  ? "active":""}
                     
                      >
                        <span>Find shopper by UPC</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shopper/ByLastPurchaseDate" 
                       className={activePath("/shopper/ByLastPurchaseDate")  ? "active":""}
                     
                      >
                        <span>By Last Purchase Date</span>
                      </a>
                    </li>

                    <li>
                      <a href="/shopper/UploadShoppers" 
                       className={activePath("/shopper/UploadShoppers")  ? "active":""}
                     
                      >
                        <span>Upload Shoppers</span>
                      </a>
                    </li>
                    <li>
                      <a href="/shoppers/shoppertransaction?userId=0"
                       className={activePath("/shoppers/shoppertransaction?userId=0")  ? "active":""}
                      
                      >
                        <span style={{width:"200px"}}>Shopper Transaction</span>
                      </a>
                    </li>
                    {/* <li>
                      <a href="/support/lastredemption">
                        <span>Last Redemptions Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/missingqtoken">
                        <span>Missing Qtoken</span>
                      </a>
                    </li> */}
                  </ul>
                }
               
              </li>
              

              <li className="has_sub sub-coupons" >
                <a href="" className={openDropDown === 'coupons' ? "d-block subdrop" : "d-block"} onClick={(e) => { handleDropDownToggle(e, "coupons") }}>
               
                  <FontAwesomeIcon icon={faUser} className="faAngledown" />
                  <span className="menuText">Coupons</span>
                  <span className="pull-right">

                    <FontAwesomeIcon icon={ openDropDown === 'coupons' ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />


                  </span>
                </a>
                {
                  openDropDown === 'coupons' &&
                  <ul id="submenu" className="sidebar-menu-ul-child-Shopper nav"
                    style={{ display: "block" }}

 
                  >
                    
                    <li>
                      <a href="/Coupon/CreateCoupon" 
                       className={ activePath("/Coupon/CreateCoupon") ? "active":""}
                    
                      >
                        <span>Create Coupon</span>
                      </a>
                    </li>
                    
                     <li>
                      <a href="/Coupons/FindCoupon" 
                       className={ activePath("/Coupons/FindCoupon") ? "active":""}
                    
                      >
                        <span>Find Coupon</span>
                      </a>
                    </li>
                    
                    
                  
                    {/* <li>
                      <a href="/support/lastredemption">
                        <span>Last Redemptions Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/missingqtoken">
                        <span>Missing Qtoken</span>
                      </a>
                    </li> */}
                  </ul>
                }
               
              </li>
              


              {/* 
              
               <li className="has_sub sub-support">
                <a href="" className={openDropDown === "shoppers" ? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "shoppers")}>
                
                  <FontAwesomeIcon icon={faUsers} className="faAngledown" aria-hidden="true" />
                  <span>Shoppers</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={ openDropDown === "shoppers"  ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                  openDropDown === "shoppers" &&
                  <ul className="sidebar-menu-ul-child-Support nav"
                    style={{ display:  'block' }}

                  >
                    <li>
                      <a href="/support/findshopper">
                        <span>Find Shopper</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/rewardstuck">
                        <span>Reward Stuck</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/myrewards">
                        <span>My Rewards</span>
                      </a>
                    </li>
                  </ul>
                }
              </li>
              <li className="has_sub sub-shopper" >
                <a href="" className={openDropDown === 'systerOverview' ? "d-block subdrop" : "d-block"} onClick={(e) => { handleDropDownToggle(e, "systerOverview") }}>
               
                  <FontAwesomeIcon icon={faUser} className="faAngledown" />
                  <span className="menuText">System Overview</span>
                  <span className="pull-right">

                    <FontAwesomeIcon icon={ openDropDown === 'systerOverview' ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />


                  </span>
                </a>
                {
                  openDropDown === 'systerOverview' &&
                  <ul id="submenu" className="sidebar-menu-ul-child-Shopper nav"
                    style={{ display: "block" }}
 
                  >
                    <li>
                      <a href="/support/systemoverview">
                        <span>System Overview</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/basketreceived">
                        <span>Last Basket Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/lastredemption">
                        <span>Last Redemptions Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/missingqtoken">
                        <span>Missing Qtoken</span>
                      </a>
                    </li>
                  </ul>
                }
               
              </li>

              <li className="has_sub sub-coupon">
                <a href="" className={openDropDown === "coupons"  ? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "coupons")}>
             
                  <FontAwesomeIcon icon={faTags} className="faAngledown" aria-hidden="true" />
                  <span>Coupons</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={ openDropDown === "coupons" ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                openDropDown === "coupons" &&
                  <ul className="sidebar-menu-ul-child-Coupon nav"
                    style={{ display: 'block' }}
                  >
                    <li>
                      <a href="/coupon/viewcoupon">
                        <span>Find Coupon</span>
                      </a>
                    </li>
                    <li>
                      <a href="/coupon/recurringcoupons">
                        <span>Recurring Coupons</span>
                      </a>
                    </li>
                  </ul>
                }
              </li>

              <li className="has_sub sub-system opened">
                <a href="" className={openDropDown === "systemMonitoring"? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "systemMonitoring")}>
               
                  <FontAwesomeIcon icon={faUsers} className="faAngledown" aria-hidden="true" />
                  <span>System Monitoring</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={ openDropDown === "systemMonitoring" ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                  openDropDown === "systemMonitoring" &&
                  <ul className="sidebar-menu-ul-child-System nav" style={{ display: "block" }}>
                    <li>
                      <a href="#">
                        <span>Q Token Queue Status</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Push Notification Queue</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Last Basket Received</span>
                      </a>
                    </li>
                    <li>
                      <a href="/support/rewardoptins">
                        <span>Reward Opt-In Status</span>
                      </a>
                    </li>
                  </ul>
                }

              </li>

              <li className="has_sub sub-redemption">
                <a href="" className={openDropDown === "redemptions"? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "redemptions")}>
                
                  <FontAwesomeIcon icon={faCircle} className="faAngledown" />
                  <span>Redemptions</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={ openDropDown === "redemptions" ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                   openDropDown === "redemptions" &&
                  <ul className="sidebar-menu-ul-child-User nav" style={{ display: "block" }}>
                    <li>
                      <a href="/users/getredemption">
                        <span>View Redemptions</span>
                      </a>
                    </li>
                  </ul>

                }
              </li>

              <li className="has_sub sub-rsa">
                <a className={openDropDown === "rsaCleint" ? "d-block subdrop" : "d-block"} onClick={(e) => handleDropDownToggle(e, "rsaCleint")}>
                
                  <FontAwesomeIcon icon={faHome} className="faAngledown" />
                  <span>RSA Client</span>
                  <span className="pull-right">
                    <FontAwesomeIcon icon={openDropDown === "rsaCleint" ? faAngleUp : faAngleDown} className="Angle_down" aria-hidden="true" />
                  </span>
                </a>
                {
                 openDropDown === "rsaCleint" &&
                  <ul className="sidebar-menu-ul-child-RSA nav" style={{ display: "block" }}>
                    <li className="">
                      <a href="/global/viewretailers">
                        <span>View Retailers</span>
                      </a>
                    </li>
                  </ul>
                }

              </li> */}
            </ul>
            <div className="left-footer">
              <div className="progress progress-xs">
                <div
                  className="progress-bar bg-green-1"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "80%" }} // Inline style in React
                >
                  <span className="progress-precentage">80%</span>
                </div>

                <a
                  data-toggle="tooltip"
                  title="See task progress"
                  className="btn btn-default md-trigger"
                  data-modal="task-progress"
                >
                  {/* FontAwesome icon */}
                  <FontAwesomeIcon icon={faInbox} className="text-red-1" />
                </a>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
