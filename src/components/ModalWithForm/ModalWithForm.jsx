import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  name,
  onSubmit,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      {/* <div className={`modal__content modal__content_type_${name}`}> */}
        <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={onClose}
          // className="modal__close modal__close_type_grey"
          className="modal__close"
          type="button"
        />
        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
          <button type="submit" className="modal__submit modal__submit_disabled">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
