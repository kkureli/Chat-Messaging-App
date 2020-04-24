import React from "react";
import style from "./ChatTitle.css";
import { useLocation } from "react-router-dom";
import {
  channelStar,
  channelUnstar,
} from "../../../../store/actions/channelActions";
import { connect } from "react-redux";

function ChatTitle(props) {
  const { profile, channels } = props;
  const roomName = useLocation().pathname.split("/").pop();
  const channel =
    channels &&
    channels.find((channel) => {
      return channel.channelName === roomName;
    });

  return (
    <div className="chatTitle">
      <div className="chatSearchTitle">
        <span className="channelName">
          #{roomName}
          {profile && profile.starredRooms.includes(roomName) ? (
            <img
              width="30px"
              onClick={() => props.channelUnstar(roomName)}
              src="https://img.icons8.com/emoji/48/000000/star-emoji.png"
            />
          ) : (
            <img
              width="30px"
              onClick={() => props.channelStar(roomName)}
              src={require("./icons8-star-50.png")}
            />
          )}
        </span>
        {/* <div className="searchChat" class="form-group">
          <input
            className="searchChat"
            type="text"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="Search Messages"
          />
          
        </div> */}
      </div>
      <div style={{ color: "white" }}>
        {channel && channel.members.length} user
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    channelStar: (channelName) => dispatch(channelStar(channelName)),
    channelUnstar: (channelName) => dispatch(channelUnstar(channelName)),
  };
};

export default connect(null, mapDispatchToProps)(ChatTitle);
