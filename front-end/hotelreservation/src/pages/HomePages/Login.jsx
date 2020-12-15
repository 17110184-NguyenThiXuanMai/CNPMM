import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../../css/signin.css';
import AuthService from "../../services/Login/auth.service";
import '../../css/main.css';
import '../../css/util.css';
import {BsFillPersonFill, BsArrowRight, BsFillLockFill} from "react-icons/bs"
import logo from "../../images/logo.png"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
        <div className="wrap-login100">
        <div className="login100-pic js-tilt" data-tilt>
					<img src={logo} alt="IMG" />
				</div>
          <Form className="login100-form validate-form"
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          > 
          	<span className="login100-form-title font-weight-bold">
						Member Login
					</span>
            <div className="wrap-input100 validate-input">
            
              <Input
                type="text"
                className="input100"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                placeholder="Username"
              />
              	<span className="focus-input100"></span>
						<span className="symbol-input100">
							{/* <i className="fa fa-envelope" aria-hidden="true"></i> */}
              <BsFillPersonFill />
						</span>
            </div>

            <div className="wrap-input100 validate-input" data-validate = "Password is required">
      
              <Input
                type="password"
                className="input100"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
						<span className="symbol-input100">
							{/* <i className="fa fa-envelope" aria-hidden="true"></i> */}
              <BsFillLockFill />
						</span>
            </div>

            <div className="container-login100-form-btn">
              <button
                className= "login100-form-btn"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span className="font-weight-bold">Login</span>
              </button>
            </div>
            <div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span> &nbsp;
						<a className="txt2" href="#">
							Username / Password?
						</a>
					</div>

					<div className="text-center p-t-136">
						<a className="txt2" href="#">
							Create your Account &nbsp;
							{/* <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i> */}
              <BsArrowRight />
						</a>
					</div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton className="btn"
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        </div>
      </div>
    );
  }
}