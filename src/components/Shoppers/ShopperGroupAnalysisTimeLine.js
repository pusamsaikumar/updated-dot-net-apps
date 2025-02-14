import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom'
import { GetAllTimeProductsAPI, GetGroupAnalysisAPI, GetTopProductsAPI } from '../redux/API';
import LoaderModal from "../Models/LoaderModal"

const ShopperGroupAnalysisTimeLine = (
  {
    clientName, isEnlarged
  }
) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get("GroupId");
  const userId = 0;
  const groupMessage = location?.state?.groupMessage;
  const getGroupAnalysisTimeLineData = useSelector(state => state.getGroupAnalysisTimeLineData);
  const getGroupAnalysisTimeLineMessage = useSelector(state => state.getGroupAnalysisTimeLineMessage);
  const getGroupAnalysisTimeLineLoading = useSelector(state => state.getGroupAnalysisTimeLineLoading);
  const getTopProductsData = useSelector(state => state.getTopProductsData);
  const getTopProductsLoading = useSelector(state => state.getTopProductsLoading);

  const getAllTimeProductsData = useSelector(state => state.getAllTimeProductsData);
  const getAllTimeProductsMessage = useSelector(state => state.getAllTimeProductsMessage);
  const getAllTimeProductsLoading = useSelector(state => state.getAllTimeProductsLoading);


  useEffect(() => {
    if (groupId && clientName === "Veritra RSA") {
      dispatch(GetGroupAnalysisAPI(clientName, groupId, userId));
      dispatch(GetAllTimeProductsAPI(clientName, groupId));
     // dispatch(GetTopProductsAPI(clientName, groupId, noOfDays));
    }
  }, [clientName, dispatch, groupId, userId]);
  console.log("getGroupAnalysisTimeLineData", getGroupAnalysisTimeLineData);
  console.log("data", getGroupAnalysisTimeLineData?.groupStartDetails);

const [noOfDays,setNoOfDays] = useState("7") ;
const handleInput =(e) => {
setNoOfDays(e.target.value)
}

useEffect(() => {
  if(noOfDays  && groupId && clientName === "Veritra RSA"){
    dispatch(GetTopProductsAPI(clientName, groupId, noOfDays));
  }
},[noOfDays]);
console.log("value",noOfDays)
  return (
    <>
      <div className='right side-menu'>

      </div>
      <div className='content-page style-gg'
        style={{
          height: "100vh",
          marginLeft: isEnlarged ? "50px" : "240px",
          // width: isEnlarged ? "calc(100% - 240px)":"",

          //height: "100%",
          overflowY: "auto"

        }}>
        <div className='content' style={{

          maxHeight: "auto",
          padding: "10px",
          outline: "none",
          overflowY: "auto"



        }}>
          <div>
            <h3 style={{ color: "#505458" }} >
              &nbsp;
              <span>
                Group Analysis Timeline
              </span>
            </h3>
          </div>
          <div style={{ float: "right" }}>
            <Link to={"/shoppers/ShopperGroupsList"}>
              <input type="button" value={"Back"} className='btnCancel' style={{ width: "135px", marginRight: "5px" }} />
            </Link>

          </div>
          <div className='col-sm-12' style={{ background: "#fff" }}>
            <table className='table' style={{ border: "0px solid black" }}>
              <tbody>

                <tr style={{ color: "#333333", fontWeight: "600" }}>
                  <td style={{ border: "none" }}>{`Group Name : ${getGroupAnalysisTimeLineData?.groupDetails && getGroupAnalysisTimeLineData?.groupDetails?.name || ""}`}</td>

                </tr>
                <tr style={{ color: "#333333", fontWeight: "600" }}>
                  <td style={{ border: "none" }}>{`Details :  ${getGroupAnalysisTimeLineData?.groupDetails && getGroupAnalysisTimeLineData?.groupDetails?.clubDetails || ""}`}</td>

                </tr>
                <tr style={{ color: "#333333", fontWeight: "600" }}>
                  <td style={{ border: "none" }}>{`Created Date :${getGroupAnalysisTimeLineData?.groupDetails && getGroupAnalysisTimeLineData?.groupDetails?.createdDate || ""}`}</td>
                </tr>
                <tr style={{ color: "#333333", fontWeight: "600" }}>
                  <td style={{ border: "none" }}>{`Group Message ARN (topic) : ${groupMessage || ""}`}</td>

                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-sm-12' style={{ marginTop: "10px" }}>
            <div className='col-sm-3' style={{ marginLeft: "15px" }}>
              <table className='table' style={{ border: "1px solid black" }}>
                <tbody>

                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.groupStartDetails && getGroupAnalysisTimeLineData?.groupStartDetails?.groupstatus || ""}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.groupStartDetails && getGroupAnalysisTimeLineData?.groupStartDetails?.totalshoppers || "0"}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.groupStartDetails && getGroupAnalysisTimeLineData?.groupStartDetails?.totaltransactions || "0"}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.groupStartDetails && getGroupAnalysisTimeLineData?.groupStartDetails?.totalincome ? `$${getGroupAnalysisTimeLineData?.groupStartDetails?.totalincome.toFixed(2)}` : "$"}`}</td>
                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`Avg Basket : ${getGroupAnalysisTimeLineData?.groupStartDetails && getGroupAnalysisTimeLineData?.groupStartDetails?.avgtransaction ? `$${getGroupAnalysisTimeLineData?.groupStartDetails?.avgtransaction.toFixed(2)}` : "$"}`}</td>

                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-sm-3' style={{ marginLeft: "15px" }}>
              <table className='table' style={{ border: "1px solid black" }}>
                <tbody>

                  <tr style={{ color: "#333333", fontWeight: "800" }}>
                    <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.groupSummeryDetails && getGroupAnalysisTimeLineData?.groupSummeryDetails?.groupstatus || ""}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.groupSummeryDetails && getGroupAnalysisTimeLineData?.groupSummeryDetails?.totalshoppers || "0"}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.groupSummeryDetails && getGroupAnalysisTimeLineData?.groupSummeryDetails?.totaltransactions || "0"}`}</td>

                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.groupSummeryDetails && getGroupAnalysisTimeLineData?.groupSummeryDetails?.totalincome ? `$${getGroupAnalysisTimeLineData?.groupSummeryDetails?.totalincome.toFixed(2)}` : "$"}`}</td>
                  </tr>
                  <tr style={{ color: "#333333", fontWeight: "600" }}>
                    <td style={{ border: "none" }}>{`Avg Basket : ${getGroupAnalysisTimeLineData?.groupSummeryDetails && getGroupAnalysisTimeLineData?.groupSummeryDetails?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.groupSummeryDetails?.avgtransaction.toFixed(2)}` : "$"}`}</td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <div className='col-sm-12'>
            <table className='table' style={{ border: "1px solid black" }}>
              <tbody>

                <tr>
                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays5 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays1?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays1?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays1 && getGroupAnalysisTimeLineData?.fromdays1?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays1 && getGroupAnalysisTimeLineData?.fromdays1?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays1 && getGroupAnalysisTimeLineData?.fromdays1?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays1?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays1 && getGroupAnalysisTimeLineData?.fromdays1?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays1?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays5 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays2?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays2?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays2?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays2?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays2?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays2?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays2?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays2?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays5 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays3?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays3?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays3 && getGroupAnalysisTimeLineData?.fromdays3?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays3 && getGroupAnalysisTimeLineData?.fromdays3?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays3 && getGroupAnalysisTimeLineData?.fromdays3?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays3?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays3 && getGroupAnalysisTimeLineData?.fromdays3?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays3?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays5 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays4?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays4?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays4 && getGroupAnalysisTimeLineData?.fromdays4?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays4 && getGroupAnalysisTimeLineData?.fromdays4?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays4 && getGroupAnalysisTimeLineData?.fromdays4?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays4?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays4?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays4?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays5 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays5?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays5?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays5 && getGroupAnalysisTimeLineData?.fromdays5?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays5 && getGroupAnalysisTimeLineData?.fromdays5?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays5 && getGroupAnalysisTimeLineData?.fromdays5?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays5?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays2 && getGroupAnalysisTimeLineData?.fromdays5?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays5?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table className='table' style={{ border: "1px solid black" }}>
                      <tbody>

                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{` ${getGroupAnalysisTimeLineData?.fromdays6 &&
                            `(${getGroupAnalysisTimeLineData?.fromdays6?.fromdate?.slice(0, 5)} - ${getGroupAnalysisTimeLineData?.fromdays6?.todate?.slice(0, 5)})`

                            || ""}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Shoppers :  ${getGroupAnalysisTimeLineData?.fromdays6 && getGroupAnalysisTimeLineData?.fromdays6?.totalshoppers || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`No of Transactions :  ${getGroupAnalysisTimeLineData?.fromdays6 && getGroupAnalysisTimeLineData?.fromdays6?.totaltransactions || "0"}`}</td>

                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Revenue : ${getGroupAnalysisTimeLineData?.fromdays6 && getGroupAnalysisTimeLineData?.fromdays6?.totalincome ? `$ ${getGroupAnalysisTimeLineData?.fromdays6?.totalincome}` : "$"}`}</td>
                        </tr>
                        <tr style={{ color: "#333333" }}>
                          <td style={{ border: "none" }}>{`Avg Baskets : ${getGroupAnalysisTimeLineData?.fromdays6 && getGroupAnalysisTimeLineData?.fromdays6?.avgtransaction ? `$ ${getGroupAnalysisTimeLineData?.fromdays6?.avgtransaction}` : "$"}`}</td>

                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <label style={{ fontWeight: "600", fontSize: "13px" }}>ALL TIME TOP PRODUCTS (For shoppers in the group during their lifetime)</label>
              <br />
              <br />
              <div className='col-sm-12'>
                <div className='row'>
                  <div className='col-sm-12'></div>
                  <div className='col-sm-12'>
                    <div className=''>
                      {
                        getAllTimeProductsData?.length > 0 ?
                          <>
                            <div className=''>
                              <table className='table table-stripped table-bordered table-hover' cellSpacing={"0"} width={"100%"}>
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>UPC</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    getAllTimeProductsData?.length > 0 &&
                                    getAllTimeProductsData?.map((each, i) => {
                                      return <tr key={i}>
                                        <td>{each?.productName}</td>
                                        <td>{each?.upc}</td>
                                        <td>${parseInt(each?.amount).toFixed(2)}</td>
                                      </tr>
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </> :
                          <>
                            <div style={{ background: "#fff" }}>
                              <span style={{ padding: "20px" }}>No Products found</span>
                            </div>
                          </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div style={{ float: "left" }}>
                <div style={{ float: "left" }}>
                  <label>TOP PRODUCTS During
                    <span style={{ color: "red" }}>*</span>
                  </label>

                </div>
                <div style={{ float: "left" }}>
                  <select style={{ width: "100px", height: "30px", marginLeft: "10px", marginTop: "-5px" }}
                    value={noOfDays}
                    onChange={(e) => handleInput(e)}
                  >
                    <option value={"7"}>7 Days</option>
                    <option value={"30"}>30 Days</option>
                    <option value={"60"}>60 Days</option>
                    <option value={"90"}>90 Days</option>
                    <option value={"120"}>120 Days</option>
                    <option value={"180"}>180 Days</option>
                  </select>

                </div>
                <div style={{float:"left",marginLeft:"5px"}}>
                      <label>from group creation</label>
                </div>
              </div>
              <br />
              <br />
              
              <div className='col-sm-12'>
                <div className='row'>
                  <div className='col-sm-12'></div>
                  <div className='col-sm-12'>
                    <div className=''>
                      {
                        getTopProductsData?.length > 0 ?
                          <>
                            <div className='' style={{marginTop:"10px"}}>
                              <table className='table table-stripped table-bordered table-hover' cellSpacing={"0"} width={"100%"}>
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>UPC</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    getTopProductsData?.length > 0 &&
                                    getTopProductsData?.map((each, i) => {
                                      return <tr key={i}>
                                        <td>{each?.productName}</td>
                                        <td>{each?.upc}</td>
                                        <td>${parseInt(each?.amount).toFixed(2)}</td>
                                      </tr>
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </> :
                          <>
                            <div style={{ background: "#fff" }}>
                              <span style={{ padding: "20px" }}>No Products found</span>
                            </div>
                          </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        ((getGroupAnalysisTimeLineLoading === true) || (getTopProductsLoading === true) || (getAllTimeProductsLoading === true)) && <LoaderModal show={true} />
      }
    </>
  )
}

export default ShopperGroupAnalysisTimeLine