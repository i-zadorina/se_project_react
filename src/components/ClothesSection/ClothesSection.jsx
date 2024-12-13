import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  handleAddClick,
  onCardClick,
  defaultClothingItems,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const userItems = defaultClothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__labels">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-btn"
          onClick={handleAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
