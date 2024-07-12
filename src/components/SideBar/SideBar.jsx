import React from "react";
import avatar from "../../images/avatar.svg";
import "./SideBar.css";
const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default SideBar;
