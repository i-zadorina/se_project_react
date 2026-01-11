import { useEffect, useContext, useState } from 'react';
import { useForm } from '../../hooks/UseForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function EditProfileModal({
  isOpen,
  onClose,
  updateUserName, // PATCH /users/me
  uploadAvatar, // POST /users/me/avatar
  activeModal,
  isLoading,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser.name || '',
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserName({ name: values.name });

      if (avatarFile) {
        await uploadAvatar(avatarFile);
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setValues({ name: currentUser.name || '' });
    setAvatarFile(null);
  }, [currentUser, setValues]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      name={'edit-profile'}
      buttonText={isLoading ? 'Saving...' : 'Save changes'}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      activeModal={activeModal}
    >
      <label className="modal__label">
        <input
          className="modal__input"
          id="edit-name"
          type="text"
          name="name"
          placeholder="Name*"
          minLength="2"
          maxLength="40"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        <input
          type="file"
          className="modal__input"
          id="edit-avatar"
          name="avatar"
          placeholder="Change your Avatar*"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
