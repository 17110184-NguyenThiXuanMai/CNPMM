import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import '../../css/profile.css'
import AuthService from "../../services/auth.service";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="limiter">
      <div className="container emp-profile">
        {(this.state.userReady) ?
      <div>
            <form method="post">
              <div class="row">
                <div class="col-md-4">
                  <div class="profile-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                    <div class="file btn btn-lg btn-primary">
                      Change Photo
                                <input type="file" name="file" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="profile-head">
                    <h3>
                      {currentUser.username} Profile
                                    </h3>
                    <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-2">
                  <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                </div>
                <div class="col-md-8">
                  <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div class="row">
                        <div class="col-md-6">
                          <label>User name</label>
                        </div>
                        <div class="col-md-6">
                          {currentUser.username} Profile
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Token:</label>
                        </div>
                        <div class="col-md-6">
                          {currentUser.accessToken.substring(0, 20)} ...{" "}
                          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Id:</label>
                        </div>
                        <div class="col-md-6">
                          {currentUser.id}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Email:</label>
                        </div>
                        <div class="col-md-6">
                          {currentUser.email}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label>Authorities:</label>
                        </div>
                        <div class="col-md-6">
                          {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div> : null}
      </div>
      </div>
    );
  }
}