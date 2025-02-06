import { Route, BrowserRouter, Switch } from "react-router-dom";
import logo from "./logo.svg";
import Signin1 from "./pages/Signin1";

import Signin2 from "./pages/Signin2";

import Register1 from "./pages/Register1";
import Reset15 from "./pages/Reset15";

import Footer from "./pages/footer";

import SandP from "./pages/SandP";

import Location from "./pages/Location";
import ContactUs from "./pages/ContactUs";

import Card from "./pages/Card";
import Checkout from "./pages/Checkout";

import Profile from "./pages/Profile";
import Links from "./pages/Links";

import List from "./pages/List";
import Reaward from "./pages/Reaward";
import CoupensDetail from "./pages/CoupensDetail";
import Coupons from "./pages/Coupons";
import Card_info from "./pages/Card_info";
import CardNew from "./pages/CardNew";
import Coupens from "./pages/Coupens";

import DEMO from "./pages/demo";
import Demo2 from "./pages/demo2";

import Messages from "./pages/Messages";

import Deal from "./pages/DealofWeek";
import WeeklyAd from "./pages/Weeklyad";
import Sidebar from "./pages/Sidebar";
import Privacy from "./pages/Privacypolicy";
import Termandcondition from "./pages/Termsandcondition";
import Forgot from "./pages/Setnewpin";
import Emailpin from "./pages/EmailPin";
import Smspin from "./pages/Smspin";
import Chatwithus from "./pages/Chatwithus";
import Rewarddetails from "./pages/RewardDetails";
import Faq from "./pages/FAQ";
import Contactresult from "./pages/ContactResult";
import Searchresult from "./pages/Searchtheresult";
import Locationdetail from "./pages/Locationdetail";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop />
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signin1} />{" "}
        <Route path="/Signin2" component={Signin2} />{" "}
        <Route path="/Register1" component={Register1} />{" "}
        <Route path="/Reset15" component={Reset15} />{" "}
        <Route path="/Location" component={Location} />{" "}
        <Route path="/ContactUs" component={ContactUs} />{" "}
        <Route path="/Checkout" component={Checkout} />{" "}
        <Route path="/CardNew" component={CardNew} />{" "}
        <Route path="/SandP" component={SandP} />
        <Route path="/Links" component={Links} />
        <Route path="/List" component={List} />
        <Route path="/Reward" component={Reaward} />{" "}
        <Route path="/CouponsDetail" component={CoupensDetail} />{" "}
        <Route path="/Profile" component={Profile} />{" "}
        <Route exact path="/Coupons" component={Coupens} />
        <Route path="/coupons/:id" component={Coupons} />
        <Route path="/cardinfo" component={Card_info} />
        <Route path="/demo" component={DEMO} />
        <Route path="/demo2" component={Demo2} />
        <Route path="/dealofweek" component={Deal} />
        <Route path="/Weeklyad" component={WeeklyAd} />
        <Route path="/Sidebar" component={Sidebar} />
        {/* <Route path="/Messages" component={Messages} /> */}
        <Route path="/Privacypolicy" component={Privacy} />
        <Route path="/Termsandcondition" component={Termandcondition} />
        <Route path="/Forgot" component={Forgot} />
        <Route path="/Emailpin" component={Emailpin} />
        <Route path="/Smspin" component={Smspin} />
        <Route path="/Chatwithus" component={Chatwithus} />
        <Route path="/RewardDetails" component={Rewarddetails} />
        <Route path="/Faq" component={Faq} />
        <Route path="/contactresult" component={Contactresult} />
        <Route path="/search" component={Searchresult} />
        <Route path="/locationdetail" component={Locationdetail} />
      </Switch>
    </div>
    </>
  );
}

export default App;
