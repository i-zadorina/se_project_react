import React from "react";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  handleAddClick,
  onCardClick,
  defaultClothingItems,
  onCardLiked,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = defaultClothingItems?.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <section className="clothes-section">
      <div className="clothes-section__labels">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems?.map((item) => {
          return (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
              onCardLiked={onCardLiked}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
