import React, { Component } from 'react';
import '../../css/sidebar.css';
import { Link } from 'react-router-dom'
import AuthService from "../../services/auth.service";

class AdminHeader extends Component {
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
        <nav className="navbar">
            <div className="container-fluid">
                    <Link to="/">
                        {/* <img src={logo} alt="Beach Resort" /> */}
                        <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">HOTEL ASTORIA</a>
                            </li>
                        </ul>                         
                    </Link>

                <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/rooms">Room</Link>
                    </li>
                    {showModeratorBoard && (
                        <li>
                            <Link to={"/mod"}>
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {/* {showAdminBoard && (
                        <li>
                            <Link to={"/admin"}>
                                Admin Page
                            </Link>
                        </li>
                    )} */}
{/* 
                    {currentUser && (
                        <li>
                            <Link to={"/user"}>
                                User
                            </Link>
                        </li>
                    )} */}

                    {currentUser ? (
                        <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                            <li>
                                <Link to={"/profile"}>
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li>
                                <a href="/login" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </ul>
                        ):(
                        <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    )}
                </ul>
                </div>
        </nav>
    )
}
}

export default AdminHeader;
