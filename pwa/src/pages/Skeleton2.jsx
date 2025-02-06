import Skeleton from "react-loading-skeleton";
import React from "react";
import {Link} from 'react-router-dom';

function Styling() 
{
    return(
        <div className="col-sm-12 mt-2 mb-1">
        <div className=" card-hori-t">
            <div className="row ">
                <div className="col-sm-5-my-C px-0">
                    <div className="reward-card-img-outer-left-C reward-card-img-outer-left">
                        <Skeleton circle={true} className="reward-card-img-left" />
                    <div>
                        <p><small className="text-white pl-2"><Skeleton /></small></p>
                    </div>
                    </div>
                </div>

                <div className="col-sm-7-my-C bg-light card-img-right ">
                <div className="p-3">
                    <p className="float-right mb-0"><small className="text-danger"><Skeleton /></small></p>
                    <br />
                    <p className=" List-card-img-right-p1 mt-1 mb-1"><Skeleton /></p>
                    <p className="mb-0 List-card-img-right-p2 text-secondary-light-gray"><Skeleton /> </p>
                    <Link><small><Skeleton /></small></Link>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  Styling;