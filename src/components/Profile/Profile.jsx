import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  handleAddClick,
  onCardClick,
  defaultClothingItems,
  handleLogOut,
  setIsLoggedIn,
  isLoggedIn,
  handleEditClick,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOut={handleLogOut}
          setIsLoggedIn={setIsLoggedIn}
          handleEditClick={handleEditClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          defaultClothingItems={defaultClothingItems}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
