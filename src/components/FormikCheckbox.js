import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

const FormikCheckbox = ({ name, label, ...otherProps }) => {
  // Hook Formika do obsługi stanu i metadanych pola formularza
  const [field, meta, helpers] = useField(name);

  // Funkcja zmieniająca stan checkboxa
  const handleChange = (event) => {
    const { checked } = event.target;
    helpers.setValue(checked);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          {...field}
          {...otherProps}
          checked={field.value ? true : false}
          onChange={handleChange}
          // Dodaj inne właściwości z Material-UI, które mogą być potrzebne
        />
      }
      label={label}
    />
  );
};

export default FormikCheckbox;