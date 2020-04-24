import React from "react";
import style from "./Starred.css";

const StarredChannels = (props) => {
  const { profile } = props;
  return (
    <div className="starredChannels">
      <div className="starredTitle">
        <li>
          <img
            width="40px"
            src="https://img.icons8.com/plasticine/100/000000/star--v1.png"
          />
          Starred
        </li>
      </div>
      {profile &&
        profile.starredRooms.map((room) => {
          return (
            <div>
              <li>{room}</li>
            </div>
          );
        })}
    </div>
  );
};

export default StarredChannels;
