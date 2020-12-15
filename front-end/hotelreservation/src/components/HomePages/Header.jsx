import React, { Component } from 'react'
import { FaAlignRight } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import AuthService from "../../services/Login/auth.service";
import jquery from 'jquery';

// for changing navbar  color
jquery(window).scroll(function() {
jquery('nav').toggleClass('scrolled', jquery(this).scrollTop() > 0);
})
export default class Header extends Component {
    state = {
        isOpen: false
    }
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            // showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top">
            <div className="container-fluid">
            <span className="navbar-brand font-weight-bolder text-warning">HOTEL ASTORIA</span>
            <a href="void(0)" className="navbar-toggler border-0" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span>
                    <FaAlignRight className="nav-icon" /></span>
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to="/rooms">Rooms</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to="/policy">Policy</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to="/contact">Contact</NavLink>
                    </li>
                    {showModeratorBoard && (
                        <li className="nav-item">
                            <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact  to={"/mod"}>
                                Moderator Board
                            </NavLink>
                        </li>
                    )}

                    {showAdminBoard && (                          
                        <li className="nav-item">
                            <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to={"/admin"}>
                                Admin Page
                            </NavLink>
                        </li>
                    )}
                
                          {/* {currentUser && (
                             <li>
                                 <Link to={"/user"}>
                                     User
                                </Link>
                             </li>
                         )}  */}
                         </ul>
                         <ul className="navbar-nav ml-auto">                   
                        {currentUser ? (
                            <ul className={this.state.isOpen ? "nav-links3 show-nav" : "nav-links3"}>
                                <li>
                                    <NavLink className="nav-link font-weight-bolder" activeClassName="active_class" exact to={"/profile"}>
                                        {currentUser.username}                                      
                                    </NavLink>
                                    
                                </li>
                                <li>
                                    <a href="/login" onClick={this.logOut} className="font-weight-bolder">
                                        LogOut
                                    </a>
                                </li>
                            </ul>
                            ):(
                            <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                                <li>
                                    <Link to={"/login"} className="nav-link font-weight-bolder">
                                        Login
                                    </Link>
                                     
                                </li>
                                <li>
                                    <Link to={"/register"} className="nav-link font-weight-bolder">
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </ul>                                                      
                    </div>
                </div>
            </nav>
        )
    }
}


