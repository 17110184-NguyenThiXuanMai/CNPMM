import React, { Component } from 'react'
import '../../css/sb-admin-2.css'
import {Link} from 'react-router-dom'

class AdminSidebar extends Component {
    state = {
    }
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3"> Admin <sup>2</sup></div>
                </a>
                <ul className="sidebar-divider my-0">               
                    <li className="nav-item">
                        <Link to="/admin" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span> Room Types Manager</span></a>
                        </Link>
                    </li>
              
                    <li className="nav-item">
                        <Link to="/admin/policy" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-calendar"></i>
                            <span> Policy Manager</span></a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/discounts" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-calendar"></i>
                            <span> Discount Manager</span></a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/customers" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-calendar"></i>
                            <span> Customer Manager</span></a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/customers" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-calendar"></i>
                            <span> Customer Manager</span></a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/admin/user" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-pager"></i>
                            <span> User Manager</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/myuser" className="link-nav">
                            <a className="nav-link" href="index.html">
                            <i className="fas fa-fw fa-user"></i>
                            <span> Profile</span></a>
                        </Link>
                    </li>
                </ul>
            </ul>
        )
    }
}

export default AdminSidebar;
