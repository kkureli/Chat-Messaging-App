import React from "react";
import style from "./Center.css";
import ChatTitle from "./ChatTitle/ChatTitle";
import ChatMessages from "./ChatMessages/ChatMessages";
import SendMessage from "./SendMessage/SendMessage";

const Center = (props) => {
  const { profile, channels, auth } = props;
  return (
    <div className="centerItems">
      <ChatTitle channels={channels} profile={profile}></ChatTitle>
      <ChatMessages profile={profile} channels={channels}></ChatMessages>
      <SendMessage
        auth={auth}
        profile={profile}
        channels={channels}
      ></SendMessage>
    </div>
  );
};

export default Center;
