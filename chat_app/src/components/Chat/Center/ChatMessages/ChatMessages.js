import React from "react";
import style from "./ChatMessages.css";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ChatMessages = (props) => {
  const roomName = useLocation().pathname.split("/").pop();
  const { channels, profile } = props;

  let channel =
    channels &&
    channels.find((channel) => {
      return channel.channelName === roomName ? channel : null;
    });
  console.log(channel, "chan");

  return (
    <div className="chatMessages">
      {channel &&
        channel.messages.map((message, index) => {
          if (message.sender === profile.userName) {
            return (
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg"></div>
                <div style={{ color: "white" }}>{message.sender}</div>
                <div class="msg_cotainer">
                  {message.message}
                  <img width="300px" src={message.imageUrl} alt="" />

                  <span style={{ color: "white" }} class="msg_time">
                    {moment(message.createdAt.toDate()).calendar()}
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                  {message.message}

                  <img src={message.imageUrl} alt="" />

                  <span style={{ color: "white" }} class="msg_time_send">
                    {" "}
                    {moment(message.createdAt.toDate()).calendar()}
                  </span>
                </div>
                <div style={{ color: "white" }}>{message.sender}</div>

                <div class="img_cont_msg">
                  <img width="300px" src={message.imageUrl}></img>
                </div>
              </div>
            );

            // {(message.sender, message.message)}
          }
        })}
    </div>
  );
};

export default ChatMessages;
