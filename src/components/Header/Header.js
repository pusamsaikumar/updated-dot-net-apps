import React, { useState ,useEffect,useRef} from 'react';
import { Navbar, Container, Row, Col, Nav, Image } from 'react-bootstrap';
import logo from "../../assets/images/rsa.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faBars } from '@fortawesome/free-solid-svg-icons';
import ContentPage from "../ContentPage"
import Sidebar from '../SideBar/Sidebar';
import RightBar from '../RightBar.js/RightBar';
import { useDispatch,useSelector } from 'react-redux';
import { getClientNames } from '../redux/API';
import SelectQuery from '../SelectQuery/SelectQuery';


const Header = ({toggleMenu,isEnlarged,handleRetailerName,retailerName, setRetailerName,getcleintNamesdata}) => {
   //const getcleintNamesdata = useSelector((state) => state.getcleintNamesdata)


  const dispatch = useDispatch();
 
  
 
  // const [retailerName, setRetailerName] = useState("");

  // const handleRetailerChange = (e) => {
  //   setRetailerName(e.target.value);
  // };
   
  // useEffect(()=> {
  //   dispatch(getClientNames());
  //     },[dispatch])

useEffect(()=> {
    if(getcleintNamesdata?.clientNames?.length > 0) {
      setRetailerName(getcleintNamesdata?.clientNames[0])
    }else{
      setRetailerName("Akins Foods")
    }

},[getcleintNamesdata])

  return (
    <>
      <header>
        <div className="topbar">
          <div className="topbar-left">
            <div className="logo">
              <h1>
                <a href="/support/system-overview">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ height: '90%', marginRight: '40px' ,marginTop:"5px" }}
                  />
                </a>
              </h1>
            </div>
            <button className={ "button-menu-mobile"}  id="#barIcon">
              <FontAwesomeIcon   id="#barIcon" icon={faBars} onClick={toggleMenu}  />
            </button>
          </div>

          <div className="topbartext" style={{ padding: '15px', textAlign: 'center' }}>
            <span style={{ color: 'yellow' }}>Retailer Name: </span>
            <select id="ddlRetailer" name="RetailerName" className='selectNames' onChange={(e) =>
              handleRetailerName(e)
            }>
              {/* <option value="Akins Foods">Akins Foods</option>
              <option value="Alliance Grocery Kart">Alliance Grocery Kart</option> */}
               {
                getcleintNamesdata?.clientNames?.length > 0  ?
                getcleintNamesdata?.clientNames?.map((item,i) => {
                  return <option  value={item} key={i} id={item}>{item}</option>
                })
                :
                <>
                <option value="Akins Foods">Akins Foods</option>
                <option value="Alliance Grocery Kart">Alliance Grocery Kart</option>
                </> 
              }
            </select>
            <span style={{ color: 'yellow' }}>
              <span id="ddlRetailerId">
                <a href="/" style={{ color: 'yellow' }}>{retailerName}</a>
              </span>
            </span>
          </div>
        </div>
        <Sidebar isEnlarged={isEnlarged} />
        {/* <RightBar /> */}
        {/* {
          window.location.pathname.includes("/support/clientaccess") && <SelectQuery />
        } */}
      </header>
    </>
  );
};

export default Header;

