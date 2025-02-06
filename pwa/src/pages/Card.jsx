import React, { useEffect , useState } from 'react';
//import $ from "jquery";

import { Link } from 'react-router-dom';
import ImageR from '../assets/img/Icons/Icons/image.png'

import ImageQ from '../assets/img/Icons/Icons/imageQ.png'
import ImageC from '../assets/img/Icons/Icons/imagechat.png'
import Barside from '../assets/img/Icons/Icons/Icon-17.png'
import Footer from '../pages/footer'
import Imgcard1 from '../assets/img/Icons/Icons/cameraI.jpg'
const ContactUs = () => {


    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])


    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll < 25) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    
    return (
        <div style={{background:"#343a40"}}>
            <div className="bg-white bg-bottom-round">
                <div className="container page17">
                    <div className={`row mt-3 mb-2 align-items-center head-icon ${isSticky ? 'sticky-menu' : ''}`} >
                        <div className="text-center prev-icon">
                            <p className="mb-0"><Link to="/" className="text-decoration-none"><img src={Barside} className="Barside" alt="" /></Link></p>
                        </div>
                        <div className="col-sm-11-my17 text-center ">

                            <h5 className=" signin1-h1  mb-0">Card</h5>
                        </div>

                    </div>

                    <div className="row ">
                        <div className="col-sm-12 py-2">
                            <hr className="mt-2" />

                            <div className="row  scroll-inner">
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                   
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                   
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                   
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <div className="px-3 card-hori-t">
                                        <div className="row ">
                                            <div className="col-sm-4-my px-0">
                                                <div className="card-img-outer-left">
                                                    <img src={Imgcard1} alt="" className="card-img-left" />
                                                </div>
                                            </div>
                                            <div className="col-sm-8-my bg-light card-img-right">
                                                <div className="p-3">
                                                    <h5 className="font-weight-bold">Deal of the week free Coffee Cups</h5>
                                                    <p className="mb-0 ">Lorem ipsum dolor sit amet consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
              
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default ContactUs;

