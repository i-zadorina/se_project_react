import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeImage from "../../images/like.png";
import likedImage from "../../images/liked.png";
import "./ItemCard.css";

function ItemCard({ items, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    onCardClick(items);
  };

  const handleCardLike = (e) => {
    e.preventDefault();
    onCardLike({ id: items._id, isLiked });
  };

  useEffect(() => {
    const isLiked = items.likes.some((id) => id === currentUser._id);
    {
      isLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [items.likes, currentUser._id]);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{items.name}</h2>
        {currentUser && (
          <img
            className="like-button__icon"
            src={isLiked ? likedImage : likeImage}
            // alt={isLiked ? "Unlike" : "Like"}
            onClick={handleCardLike}
          />
        )}
      </div>
      <img
        className="card__image"
        src={items.imageUrl}
        alt={items.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
