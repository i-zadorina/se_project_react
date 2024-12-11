import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteConfirm }) {
  const { currentUser: user } = useContext(CurrentUserContext) || {};
  const isOwn = card.owner === user._id;
  const cardDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_preview">
        <button
          onClick={onClose}
          className="modal__close_type_white"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className={isOwn ? "modal__footer_own" : "modal__footer"}></div>
        <div className="modal__left-section">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <div className="modal__right-section">
          <button
            className={cardDeleteButtonClassName}
            onClick={(e) => onDeleteConfirm(card._id)}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
