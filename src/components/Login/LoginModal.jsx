import { useForm } from "../../hooks/UseForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const Login = ({
  isOpen,
  handleLogin,
  handleRegisterClick,
  onClose,
  activeModal,
}) => {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    onClose();
  };

  return (
    <ModalWithForm
      titleText="Login"
      buttonText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      activeModal={activeModal}
    >
      <label htmlFor="email" className="modal__input_type_email">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__input_type_password">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <button
        type="button"
        onClick={handleRegisterClick}
        className="modal__or-button"
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};
export default Login;
