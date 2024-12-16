import { useEffect, useContext } from "react";
import { useForm } from "../../hooks/UseForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, updateUser, activeModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(values);
    onClose();
  };

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      name={"edit-profile"}
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *{" "}
      </label>
      <input
        className="modal__input"
        id="edit-name"
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        required
        value={values.name}
        onChange={handleChange}
      />

      <label htmlFor="change-avatar" className="modal__label">
        Avatar *{" "}
      </label>
      <input
        type="url"
        className="modal__input"
        id="edit-avatar"
        name="avatar"
        placeholder="Avatar URL"
        minLength="2"
        maxLength="200"
        required
        value={values.avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
