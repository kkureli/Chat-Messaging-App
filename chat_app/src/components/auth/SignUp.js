import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

export class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/"></Redirect>;

    return (
      <div className="container">
        <form onSubmit={(e) => this.handleSubmit(e)} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              required
              onChange={(e) => this.handleChange(e)}
              type="text"
              id="lastName"
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              onChange={(e) => this.handleChange(e)}
              type="text"
              id="firstName"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(e) => this.handleChange(e)}
              type="email"
              id="email"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              required
              onChange={(e) => this.handleChange(e)}
              type="password"
              id="password"
            />
          </div>
          <div className="input-field">
            <button type="submit" class="btn btn-primary">
              Sign Up
            </button>{" "}
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
