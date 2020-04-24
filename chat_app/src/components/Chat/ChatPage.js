import React from "react";
import { Redirect } from "react-router-dom";
import LeftBar from "./LeftBar/LeftBar";
import style from "./ChatPage.css";
import { connect } from "react-redux";
import { firestoreConnect, authIsReady } from "react-redux-firebase";
import { compose } from "redux";
import Center from "./Center/Center";
import { useLocation } from "react-router-dom";
import RightBar from "./RightBar/RightBar";

const ChatPage = (props) => {
  const location = useLocation();
  const { channels, profile, auth } = props;

  if (props.profile && props.profile.isEmpty) {
    return <Redirect to="/"></Redirect>;
  } else if (location.pathname === "/chat") {
    return (
      <div className="welcomeMessageChat">
        <LeftBar channels={channels} profile={profile}></LeftBar>
        <h1 className="ml-4">Please join room from left bar</h1>
      </div>
    );
  } else {
    return (
      <div className="chatPage">
        <LeftBar channels={channels} profile={profile}></LeftBar>
        <Center auth={auth} channels={channels} profile={profile}></Center>
        <RightBar channels={channels} profile={profile}></RightBar>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
    channels: state.firestore.ordered.channels,
  };
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    return [
      {
        collection: "users",
      },
      {
        collection: "channels",
        orderBy: ["channelName"],
      },
    ];
  })
)(ChatPage);
