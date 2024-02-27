import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikTextField = ({ name, infoText, ...otherProps }) => {
  const [field, meta] = useField(name);

  // Logika określająca, co powinno zostać wyświetlone w helperText.
  const helperText = () => {
    if (meta.touched) {
      if (meta.error) {
        return meta.error;
      }
      return `${infoText || ''}`; // Zwróć infoText, jeśli nie ma błędu
    }
    return infoText || ''; // Zwróć infoText także gdy pole nie było dotykane
  };

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'filled',
    error: Boolean(meta.touched && meta.error),
    helperText: helperText()
  };

  return <TextField {...configTextField} />;
};

export default FormikTextField;