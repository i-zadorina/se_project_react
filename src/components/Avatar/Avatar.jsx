import "./Avatar.css";
import avatar from "../../images/avatar.svg";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Avatar({ isSidebar }) {
  const currentUser = useContext(CurrentUserContext);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {hasError ? (
        <div
          className={`avatar__placeholder ${
            isSidebar && "avatar__placeholder_sidebar"
          }`}
        >
          {currentUser?.name ? currentUser?.name[0].toUpperCase() : ""}
        </div>
      ) : (
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className={`avatar ${isSidebar && "avatar__sidebar"}`}
          onError={() => setHasError(true)}
        />
      )}
    </>
  );
}

{
  /* {currentUser.avatar ? (
                  <img
                    className="header__avatar"
                    src={currentUser.avatar}
                    alt="avatar"
                  />
                ) : (
                  <span className="header__avatar header__avatar_none">
                    {user.name?.toUpperCase().charAt(0) || ""}
                  </span>
                )} */
}
