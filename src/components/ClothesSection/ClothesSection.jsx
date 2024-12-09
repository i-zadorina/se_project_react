import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  handleAddClick,
  onCardClick,
  clothingItems,
  onCardLiked,
}) => {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
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
