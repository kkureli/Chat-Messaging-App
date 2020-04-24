import React from "react";
import style from "./LeftBar.css";
import { signOut } from "../../../store/actions/authActions";
import { connect } from "react-redux";
import StarredChannels from "./StarredChannels/StarredChannels";
import Channels from "./Channels/Channels";
import { Link } from "react-router-dom";

const LeftBar = (props) => {
  const { profile, channels } = props;
  const symbol = "</>";
  const joinedRooms = profile.joinedRooms;

  if (profile.isLoaded) {
    return (
      <div className="leftBar">
        <ul>
          <li className="ulTitle">
            <h4>{symbol} Kaan's DevChat</h4>
          </li>
          <li className="ulUserName">{profile && profile.userName}</li>
          <li>
            <StarredChannels profile={profile}></StarredChannels>
          </li>
          <li>
            <Channels channels={channels}></Channels>
          </li>
          <li className="mt-3" style={{ color: "black" }}>
            Joined Rooms:
          </li>
          {joinedRooms &&
            joinedRooms.map((room) => {
              return (
                <div>
                  <Link style={{ color: "white" }} to={"/chat/" + room}>
                    <li>{room}</li>
                  </Link>
                </div>
              );
            })}

          {/* <li>
          <DirectMessages></DirectMessages>
        </li> */}
          <li className="logOutBtn">
            <button
              onClick={() => props.signOut()}
              type="button"
              class="btn btn-primary mt-4"
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(LeftBar);
