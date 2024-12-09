import { useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeImage from "../../images/like.png";
import likedImage from "../../images/liked.png";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = (e) => {
    e.preventDefault();
    onCardLike({ id: item._id, isLiked });
  };

  useEffect(() => {
    const isLiked = item.likes.some((id) => id === currentUser._id);
    {
      isLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [item.likes, currentUser._id]);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <img
            className="like-button__icon"
            src={isLiked ? likedImage : likeImage}
            alt={isLiked ? "Unlike" : "Like"}
            onClick={handleCardLike}
          />
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
