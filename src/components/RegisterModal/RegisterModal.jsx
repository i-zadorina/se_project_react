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
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
    avatar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
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
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
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
