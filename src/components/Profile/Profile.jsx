import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  handleAddClick,
  onCardClick,
  clothingItems,
  handleLogOut,
  isLoggedIn,
  handleEditClick,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOut={handleLogOut}
          isLoggedIn={isLoggedIn}
          handleEditClick={handleEditClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
