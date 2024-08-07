import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteConfirm }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_preview">
        <button
          onClick={onClose}
          className="modal__close_type_white"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__left-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__right-section">
            <button
              className="modal__delete_type_preview"
              onClick={(e) => onDeleteConfirm(card._id)}
              type="button"
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
