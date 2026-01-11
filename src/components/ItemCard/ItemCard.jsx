import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './ItemCard.css';

function ItemCard({ item, onCardClick, onCardLike }) {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);

  const likes = Array.isArray(item.likes) ? item.likes : [];
  const currentUserId = currentUser?._id;

  const isLiked =
    isLoggedIn && currentUserId
      ? likes.some((u) => String(u) === String(currentUserId))
      : false;

  const cardLikeClassName = `card__like ${isLiked ? 'card__like_liked' : ''}`;

  const handleLike = () => {
    if (!isLoggedIn) return;
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={cardLikeClassName}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={`Image of ${item.name}`}
        loading="lazy"
        decoding="async"
        width="500"
        height="500"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
