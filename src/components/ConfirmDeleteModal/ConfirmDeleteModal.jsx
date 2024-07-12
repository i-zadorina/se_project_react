import './ConfirmDeleteModal.css';

function ConfirmDeleteModal ({
  closeActiveModal,
  isOpen,
  onSubmit,
  handleCardDelete,
  confirmDeleteModal,
  card
}) {

  const deleteCard = (e) => {
    e.preventDefault();
    handleCardDelete(card);
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="confirm-delete-modal">
        <button
          onClick={closeActiveModal}
          type="button"
          className="confirm-delete-modal__close-btn"
        ></button>
        <div className="confirm-delete-modal__desc">
          <p>
            <span className="confirm-delete-modal__prompt">
              Are you sure you want to delete this item?
            </span>
            <span className="confirm-delete-modal__prompt">
              This action is irreversible
            </span>
          </p>
          <button
            onClick={deleteCard}
            type="submit"
            className="confirm-delete-modal__close"
          >
            Yes, delete item
          </button>
          <button
            onClick={closeActiveModal}
            className="confirm-delete-modal__cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;