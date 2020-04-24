import React from "react";
import { useLocation } from "react-router-dom";
import style from "./RightBar.css";
import moment from "moment";
import {
  joinChannel,
  leaveChannel,
} from "../../../store/actions/channelActions";
import { connect } from "react-redux";

const RightBar = (props) => {
  const { profile, channels } = props;
  const roomName = useLocation().pathname.split("/").pop();
  const channel =
    channels &&
    channels.find((channel) => {
      return channel.channelName === roomName;
    });
  return (
    <div className="rightBar">
      <div className="rightBorder">
        <ul>
          <li className="rightTitle">About #{roomName} </li>
          <li className="detailsTitle">
            <img
              width="50px"
              src="https://img.icons8.com/carbon-copy/100/000000/info.png"
            />
            Channel Details
            <span className="joinRoomBtn">
              {channel.members && channel.members.includes(profile.userName) ? (
                <button
                  onClick={() => props.leaveChannel(channel.channelName)}
                  type="button"
                  class="btn btn-danger"
                >
                  Leave Room
                </button>
              ) : (
                <button
                  onClick={() => props.joinChannel(channel.channelName)}
                  type="button"
                  class="btn btn-primary"
                >
                  Join Room
                </button>
              )}
            </span>
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Topic:</span>{" "}
            {channel.description}
          </li>

          <li>
            <span style={{ fontWeight: "bold" }}>Created By: </span>{" "}
            {channel.creatorUserName}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Created At: </span>{" "}
            {moment(channel.createdAt.toDate()).calendar()}
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Members:</span>{" "}
            {channel.members.map((member) => {
              return <li>-{member}</li>;
            })}{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinChannel: (channelName) => dispatch(joinChannel(channelName)),
    leaveChannel: (channelName) => dispatch(leaveChannel(channelName)),
  };
};

export default connect(null, mapDispatchToProps)(RightBar);
