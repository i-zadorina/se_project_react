import { useState } from 'react';
import { useForm } from '../../hooks/UseForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './RegisterModal.css';

const Register = ({
  isOpen,
  handleRegistration,
  onClose,
  handleLoginClick,
  activeModal,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ ...values, avatarFile });
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText={isLoading ? 'Signing up...' : 'Sign Up'}
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      activeModal={activeModal}
    >
      <label className="modal__input_type_name">
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name*"
          required
          value={values.name}
          onChange={handleChange}
          name="name"
        />
      </label>
      <label className="modal__input_type_email">
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email*"
          required
          value={values.email}
          onChange={handleChange}
          name="email"
        />
      </label>
      <label className="modal__input_type_password">
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password*"
          required
          value={values.password}
          onChange={handleChange}
          name="password"
        />
      </label>
      <label className="modal__input_type_avatar">
        <input
          className="modal__input"
          type="file"
          id="avatar"
          name="avatar"
          placeholder="Upload your avatar"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleAvatarChange}
        />
      </label>
      <button
        type="button"
        className="modal__or-button"
        onClick={handleLoginClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default Register;
