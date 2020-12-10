import React, { Component } from 'react'
import '../../css/footer.css'

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
                                <h3 className="f-title f_600 t_color f_size_18">Liên lạc</h3>
                                <p>Nhập email của bạn!</p>
                                <form action="#" className="f_subscribe_two mailchimp" method="post" novalidate="true" _lpchecked="1">
                                    <input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
                                    <button className="btn btn_get btn_get_two" type="submit">Đăng ký</button>
                                    <p className="mchimp-errmessage"></p>
                                    <p className="mchimp-sucmessage"></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" >
                                <ul className="list-unstyled f_list">
                                    <li><a href="#">Khu vực</a></li>
                                    <li><a href="#">Thành phố</a></li>
                                    <li><a href="#">Quận</a></li>
                                    <li><a href="#">Địa điểm được quan tâm</a></li>
                            
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft">
                                <ul className="list-unstyled f_list">
                                    <li><a href="#">Nhà</a></li>
                                    <li><a href="#">Căn hộ</a></li>
                                    <li><a href="#">Resort</a></li>
                                    <li><a href="#">Biệt thự</a></li>
                                    <li><a href="#">Nhà trọ</a></li>
                                    <li><a href="#">Nhà khách</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget social-widget pl_70 wow fadeInLeft">
                                <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                <div className="f_social_icon">
                                    <a href="#" className="fab fa-facebook"></a>
                                    <a href="#" className="fab fa-twitter"></a>
                                    <a href="#" className="fab fa-linkedin"></a>
                                    <a href="#" className="fab fa-pinterest"></a>
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
