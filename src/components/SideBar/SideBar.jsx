import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ handleEditClick, handleLogOut }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="sidebar">
      <div className="sidebar__userinfo">
        {currentUser.avatar ? (
          <img className="sidebar__avatar" src={currentUser.avatar} />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser.name[0]?.toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </section>
  );
};

export default SideBar;
