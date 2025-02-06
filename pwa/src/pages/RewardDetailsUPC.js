import React, { useState, useEffect } from "react";

function RewardDetailsUPC({ eachRewardTier }) {
  const [rewardDetailsUpcData, setRewardDetailsUpcData] = useState([]);

  console.log("rewardDetailsUpcData", rewardDetailsUpcData);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_LOGIN_BACKEND_MAIN_URL
      }/GetUPCTierProducts/${localStorage.getItem("Shopping_token")}/${
        eachRewardTier.TierRewardCouponTypeId
      }/${eachRewardTier.LMRewardTierID}`,
      {
        method: "get",
        headers: { domainname: process.env.REACT_APP_SUBDOMAIN },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setRewardDetailsUpcData(data?.RewardTierProducts);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div
      style={{
        maxHeight: "100%",
        background: "rgba(255, 255, 255, 0)",
      }}
      className="modal fade reward-detail-upc"
      id="rewardDetailsUPC"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="rewardDetailsUPCLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog scanner-box" role="document">
        <div
          className="modal-content modal-content-message rounded-lg-15"
          style={{ margin: "auto", padding: "0px" }}
        >
          <div className="modal-body p-0 top-close-btn">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <p className="popup-header text-white text-center py-3 rounded-lg-15-lrt">
              Reward Details
            </p>
            <ul className="list-group list-group-flush px-3 text-center">
              <div>
                <img
                  src={eachRewardTier?.TierImageUrl}
                  alt=""
                  className="reward-popup-image"
                />
                <h4 className="reward-detail-title">
                  {eachRewardTier?.TierTitle}
                </h4>
                <p>{eachRewardTier?.PointsRequiredString}</p>
                <div>
                  {rewardDetailsUpcData?.map((each) => (
                    <div className="reward-detail-popup-item">
                      <div>
                        <img
                          src={each?.ImageUrl}
                          alt=""
                          style={{ height: "5rem", width: "6rem" }}
                        />
                      </div>
                      <div className="reward-detail-desc">
                        <p>{each?.Title}</p>
                        <p>{each?.ProductName}</p>
                        <p>{each?.DeductPointsText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          </div>
          <div className="mb-3 text-center reward-close-btn">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardDetailsUPC;
