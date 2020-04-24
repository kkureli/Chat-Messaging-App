import React, { useState } from "react";
import style from "./Homepage.css";
import { signInAnonymously } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect, NavLink } from "react-router-dom";

const Homepage = (props) => {
  const { users } = props;

  let userNames =
    users &&
    users.map((user) => {
      return user.userName;
    });
  const [userName, setUserName] = useState("");
  const [warning, setWarning] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    console.log(userName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userNames.includes(userName)) {
      return setWarning("This username is used please change.");
    } else {
      return props.signInAnonymously(userName);
    }
  };
  {
  }

  if (props.profile.isLoaded && !props.profile.isEmpty) {
    return <Redirect to="/chat"></Redirect>;
  } else {
    return (
      <div className="homepage">
        <h1>Welcome To Chat App</h1>
        <h3>To join chat rooms please</h3>
        <div className="hpBtn">
          <button type="button" class="btn btn-primary mr-4">
            <NavLink style={{ color: "white" }} to={"/signup"}>
              Sign Up
            </NavLink>
          </button>

          <button type="button" class="btn btn-primary ml-4">
            <NavLink style={{ color: "white" }} to={"/login"}>
              Login
            </NavLink>
          </button>
          <div className="anonymText">or join anonymously</div>

          <div class="form-group">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                required
                onChange={(e) => handleChange(e)}
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Username"
              />

              <button
                disabled={userName === ""}
                type="submit"
                onClick={(e) => handleSubmit(e)}
                type="button"
                class="btn btn-primary"
              >
                Join!
              </button>
            </form>
            {warning}
          </div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInAnonymously: (userName) => dispatch(signInAnonymously(userName)),
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "users",
      },
    ];
  })
)(Homepage);
