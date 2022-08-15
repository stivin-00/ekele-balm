import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <img
              src="https://res.cloudinary.com/balmai/image/upload/v1654867977/balm-web/My_project_4_1_1_joyfse.png"
              alt=""
              srcset=""
            />
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://res.cloudinary.com/balmai/image/upload/v1654867414/balm-web/dollar-gill-XhL9yTaomaI-unsplash_hn4dtx_pozngn.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
