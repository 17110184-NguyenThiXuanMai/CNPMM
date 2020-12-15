import React, { Component } from 'react'
import '../../css/footer.css'
import {BiBeenHere, BiPhone, BiEnvelope} from "react-icons/bi";
import { FaFacebookSquare,FaLinkedin } from 'react-icons/fa';
import {IoLogoYoutube} from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';

class Footer extends Component {
    render() {
        return (
            <div>
               <footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget company_widget wow fadeInLeft">
                                <h3 className="f-title f_600 t_color f_size_18">Contact</h3>
                                <p>Enter your email</p>
                                <form action="#" className="f_subscribe_two mailchimp" method="post" novalidate="true" _lpchecked="1">
                                    <input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
                                    <button className="btn btn_get btn_get_two" type="submit">Send</button>
                                    <p className="mchimp-errmessage"></p>
                                    <p className="mchimp-sucmessage"></p>
                                </form>
                            </div>
                        </div>
                      
                        <div className="col-lg-6 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft">
                                <ul className="list-unstyled f_list">
                                    <li><a href="#"> <BiBeenHere /> 12-14 Tran Phu - Nha Trang - Vietnam 650000 Nha Trang Vietnam</a></li>
                                    <li><a href="#"> <BiPhone /> +84 258 3820999</a></li>
                                    <li><a href="#"> <BiEnvelope /> info@sunrisenhatrang.com.vn</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget social-widget pl_70 wow fadeInLeft">
                                <h3 className="f-title f_600 t_color f_size_18">CONNECT</h3>
                                <div className="f_social_icon">
                                <FaFacebookSquare className="connect" />
                                <AiFillInstagram className="connect" />
                                <FaLinkedin className="connect" />
                                <IoLogoYoutube className="connect" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">© cakecounter Inc.. 2019 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 col-sm-5 text-right">
                            <p>Made with <i className="icon_heart"></i> in <a href="#">CakeCounter</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
            </div>
        )
    }
}

export default Footer;
