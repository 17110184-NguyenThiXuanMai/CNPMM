import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import "../App.css";

import AuthService from "../services/auth.service";
import Login from "./HomePages/Login";
import Home from './HomePages/Home';
import Register from "./HomePages/Register";
import Profile from "./HomePages/Profile";
import Header from '../components/HomePages/Header';
import Rooms from './HomePages/Rooms';
import SingleRoom from './HomePages/SingleRoom';
import Error from './HomePages/Error';
import Booknow from './HomePages/Booknow';
import Footer from '../components/HomePages/Footer';
import { Provider } from 'react-redux';
import store from '../services/store';

export default class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showModeratorBoard: false,
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
        return (
          <div>
            <Header />
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />              
                <Provider store={store}>
                <Route exact path="/rooms/" component={Rooms} />
                  <Route exact path="/rooms/:id" component={SingleRoom} />   
                  <Route exact path="/booknow/:id" component={Booknow} />     
                </Provider>    
                <Route component={Error} />
              </Switch>
            <Footer />
          </div>
        );
      }
}
