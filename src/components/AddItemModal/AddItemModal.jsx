import { useForm } from "../../hooks/UseForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ onAddItem, onClose, isOpen }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleWeatherType = (e) => {
    setValues({ ...values, weather: e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
    onClose();
    // resetForm();
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      name={"addgarment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__input_type_name">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          name="name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__input_type_image">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          name="imageUrl"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleWeatherType}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleWeatherType}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleWeatherType}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
