import React, { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setValues(inputValues);
  };

  return { values, handleChange, resetForm };
}
