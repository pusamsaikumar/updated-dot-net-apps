import Skeleton from "react-loading-skeleton";
import React from "react";
import {Link} from 'react-router-dom';

function Styling() 
{
    return(
    <div className="col-sm-12 mt-3">
        <Link className="text-decoration-none ">
            <div className="d-flex">
                <div className="circle-outer">
                    <Skeleton circle={true} className="circle-inner" />
                </div>
                <p className="my-auto ml-3 w-75 text-dark"><span className=""><Skeleton /></span></p>
                <p className="float-right my-auto">
                    <span className=" text-danger"><Skeleton /></span>
                </p>
            </div>
        </Link>
    </div>
    )
}

export default  Styling;