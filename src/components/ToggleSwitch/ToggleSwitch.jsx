import React, { useContext, useEffect } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  // const [isChecked, setIsChecked] = useState(currentTemperatureUnit === 'F');
  // useEffect(()=> setIsChecked(currentTemperatureUnit === 'F'),[currentTemperatureUnit]);

  return (
    <label htmlFor="" className="switch">
      <input
        type="checkbox"
        className="switch__box"
        value={currentTemperatureUnit}
        onChange={handleToggleSwitchChange}
        // checked={isChecked}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
