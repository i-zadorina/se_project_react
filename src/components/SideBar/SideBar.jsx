import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ handleEditClick, handleLogOut }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">{currentUser?.name}</p>
      <li>
        <button
          onClick={handleEditClick}
          type="button"
          className="sidebar__button"
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </li>
    </div>
  );
};

export default SideBar;
