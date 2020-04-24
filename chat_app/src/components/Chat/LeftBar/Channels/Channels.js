import React from "react";
import style from "./Channels.css";
import ChannelModal from "./NewChannelModal";
import { Link } from "react-router-dom";

const Channels = (props) => {
  const { channels } = props;
  console.log("cc", props);

  return (
    <div className="channels">
      <div className="channelsTitle">
        <li>All Channels</li>
        <ChannelModal></ChannelModal>
      </div>

      {channels &&
        channels.map((channel) => {
          return (
            <li>
              <Link
                style={{ color: "white" }}
                to={"/chat/" + channel.channelName}
              >
                #{channel.channelName}
              </Link>
            </li>
          );
        })}
    </div>
  );
};

export default Channels;
