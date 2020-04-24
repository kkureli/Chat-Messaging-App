import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendMessage } from "../../../../store/actions/messageActions";
import { connect } from "react-redux";
import style from "./SendMessage.css";
const SendMessage = (props) => {
  const { profile, channels, auth } = props;
  const channelName = useLocation().pathname.split("/").pop();

  let memberList = [];
  channels.map((channel) => {
    return channel.channelName === channelName
      ? (memberList = channel.members)
      : null;
  });
  const inputStatus = memberList.includes(profile.userName);

  let writingWarning = "";

  const [message, setMessage] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);
  };

  const handleChange = (e) => {
    writingWarning = <p>{profile.userName} is typing...</p>;
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageAsFile === null) {
      return props.sendMessage(null, message, channelName);
    } else {
      return props.sendMessage(imageAsFile, message, channelName);
    }
  };

  return (
    <div>
      <span> {auth.uid === profile.userName ? null : writingWarning} </span>
      <div class="form-group">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            style={{ display: "inline" }}
            onChange={(e) => handleChange(e)}
            disabled={!inputStatus}
            type="text"
            className="form-control messageInp"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="Write your message"
          />
          <span>
            <button
              onClick={(e) => handleSubmit(e)}
              disabled={!inputStatus}
              style={{ display: "inline" }}
              type="button"
              class="btn btn-primary"
            >
              Send
            </button>
          </span>
          <input
            multiple={false}
            onChange={handleImageAsFile}
            disabled={!inputStatus}
            type="file"
            name=""
            id=""
          />
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (image, message, channelName) =>
      dispatch(sendMessage(image, message, channelName)),
  };
};

export default connect(null, mapDispatchToProps)(SendMessage);
