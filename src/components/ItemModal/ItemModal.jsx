import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import '../ModalWithForm/ModalWithForm.css';
import './ItemModal.css';

function ItemModal({ isOpen, onClose, card, onDeleteConfirm, onDeleteItem }) {
  const { isLoggedIn } = useContext(AppContext);

  if (!card) return null;

  const showDelete = isLoggedIn && !card.isDefault;

  const showRemoveForMe = isLoggedIn && card.isDefault;

  return (
    <div
      className={`modal ${isOpen ? 'modal_opened' : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal__content_type_preview">
        <button
          className="modal__close_type_white"
          type="button"
          onClick={onClose}
        />

        <img className="modal__image" src={card.imageUrl} alt={card.name} />

        <div className="modal__footer">
          <div className="modal__left-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <div className="modal__right-section">
            {showDelete && (
              <button
                className="modal__delete-button modal__delete-button_visible"
                type="button"
                onClick={onDeleteConfirm}
              >
                Delete item
              </button>
            )}

            {showRemoveForMe && (
              <button
                className="modal__delete-button modal__delete-button_visible"
                type="button"
                onClick={onDeleteItem}
              >
                Remove for me
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
