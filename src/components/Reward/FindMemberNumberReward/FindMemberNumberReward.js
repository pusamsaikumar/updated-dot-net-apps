import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFindMemberDetailsAPI, rewardTypesAPI } from '../../redux/API';

const FindMemberNumberReward = ({ clientName , isEnlarged  }) => {
  const getRewardTypesData = useSelector(state => state.getRewardTypesData);
  const getRewardTypesMessage = useSelector(state => state.getRewardTypesMessage);
  const getRewardTypesLoading = useSelector(state => state.getRewardTypesLoading);

  const dispatch = useDispatch();

  const [value, setValue] = useState({
    rewardType: "",
    memberNumber: "",
    rewardTypeId:0
  });

  const [errorMsg, setErrorMsg] = useState({
    rewardTypeError: "",
    memberNumberError: ""
  });

  const handleInput = (e, name) => {

    setValue((prev) => {
      return {
        ...prev,
        [name]: e.target.value
      }
    })
  }
  const resetHandle = (e) => {
    e.preventDefault();
    setValue({
      rewardType: "",
      memberNumber: ""
    })
    setErrorMsg({
      rewardTypeError: "",
      memberNumberError: ""
    })
  }


  const handleMemberNumberChange = (e) => {
    const inputValue = e.target.value;
    const regex = `${/^\d{0,12}$/}`;
    const numbers = /^[0-9]+$/
    if (/^\d{0,12}$/.test(inputValue)) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          memberNumberError: ""
        }
      })
    } else if (!numbers.test(inputValue)) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          memberNumberError: "Member number contains digits only. "
        }
      })
    }
    else {
      setErrorMsg((prev) => {
        return {
          ...prev,
          memberNumberError: "Member number does not exceed 12 digits."
        }
      })
    }
  }

  const handleMemberNumberSearch = (e) => {
    e.preventDefault();
    console.log("value", value)
    if (
      value.rewardType.trim() === "" ||
      value.memberNumber.trim() === ""
    ) {
      if (value.rewardType.trim() === "") {
        setErrorMsg((prev) => {
          return {
            ...prev,
            rewardTypeError: "Please select reward type."
          }
        })
      }
      if (value.memberNumber.trim() === "") {
        setErrorMsg((prev) => {
          return {
            ...prev,
            memberNumberError: "Please enter member number"
          }
        })
      }
    }

    else {
      setErrorMsg({
        rewardTypeError: "",
        memberNumberError: ""
      });

      dispatch(getFindMemberDetailsAPI())
    }
  }
  console.log("member error", errorMsg);
  useEffect(() => {
    dispatch(rewardTypesAPI(clientName))
  }, [dispatch, clientName]);
  console.log("rewardTpes", getRewardTypesData);

  console.log("reward client", clientName)
  return (
    <>
      <div className='right side-menu'>

      </div>
      <div className='content-page style-gg'  style={{ height: "100vh", marginLeft:isEnlarged ? "50px" :"240px"}}>
                <div className='content' style={{
                    overflowY: "auto",
                    maxHeight: "100%",
                    padding: "10px",
                   outline:"none",
                  
                //    marginLeft:isEnlarged ? "0px" :"0px"
                    // background: "#f3f3f3"
                    // backgroundColor: "#f9f9f9"
                }}>
          <>

            <div>
              <h2 style={{ textAlign: "center", color: "green" }}>Find Member Rewards</h2>
            </div>

            <div className='row' style={{ marginTop: "20px" }}>

              <div className='col-3'>
                <div className='form-group'>
                  <label>Rewards</label>
                  <select
                    style={{ display: "block" }}
                    value={value.rewardType}
                    name="rewardType"
                    onChange={(e) => {

                      const findRewardTypeId = getRewardTypesData?.find(store => store.description === e.target.value);
                      
                      handleInput(e, "rewardType");
                      // setValue((prev) => {
                      //     return {
                      //         ...prev,
                      //         ["rewardTypeId"]: selectStores?.clientStoreId
                      //     }
                      // })
                    }}>
                    <option>Select RewardType</option>
                    {
                      getRewardTypesData?.length > 0 &&
                      getRewardTypesData?.map((each, i) => {
                        return <option value={each.description} key={i} id={each.rewardType}>{each.description}</option>
                      })
                    }

                  </select>
                  <span style={{ color: 'red' }}>{value.rewardType === "" && errorMsg.rewardTypeError}</span>
                </div>
              </div>

              <div className='col-4'>
                <label>Member Number</label>
                <input style={{ display: "flex" }} type="text" placeholder='Find Member Number' value={value.memberNumber} name="memberNumber" onChange={(e) => {
                  handleMemberNumberChange(e);
                  handleInput(e, "memberNumber");
                }

                } />
                <span style={{ color: 'red' }}>{(value.memberNumber.trim() === "" || value.memberNumber.length > 12 || !/^[0-9]+$/.test(value.memberNumber)) && errorMsg.memberNumberError}</span>
              </div>
              <div className='col-4'>
                <label></label>
                <div style={{ marginLeft: "30px" }}>
                  <button className='btnSearch' style={{ marginRight: "20px" }} onClick={(e) => resetHandle(e)}>Reset</button>
                  <button className='btnCancel' onClick={(e) => handleMemberNumberSearch(e)}>Search</button>
                </div>
              </div>

            </div>

          </>

        </div>
      </div>
    </>
  )
}

export default FindMemberNumberReward