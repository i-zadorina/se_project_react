import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to={"/"}>
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__current-user">
            <button
              className="header__add-btn"
              type="button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser?.name}</p>
              <Avatar />
            </Link>
          </div>
        ) : (
          <div className="header__auth">
            <button
              className="header__signup-btn"
              type="button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
