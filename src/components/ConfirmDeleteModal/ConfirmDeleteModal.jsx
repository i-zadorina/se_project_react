import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ onClose, isOpen, onDeleteItem, card }) => {
  const buttonConfirmText = "Yes, delete item";
  const buttonCancel = "Cancel";

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="confirm-delete-modal">
        <button
          className="confirm-delete-modal__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <div className="confirm-delete-modal__container">
          <p>
            <span className="confirm-delete-modal__text">
              Are you sure you want to delete this item?
            </span>
            <span className="confirm-delete-modal__text">
              This action is irreversible
            </span>
          </p>
          <button
            className="confirm-delete-modal__delete"
            type="submit"
            onClick={onDeleteItem}
          >
            {buttonConfirmText}
          </button>
          <button
            className="confirm-delete-modal__cancel"
            type="button"
            onClick={onClose}
          >
            {buttonCancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
