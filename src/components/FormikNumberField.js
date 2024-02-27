import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikNumberField = ({ name, infoText, ...otherProps }) => {
  const [field, meta] = useField(name);

  // Logika określająca, co powinno zostać wyświetlone w helperText.
  const helperText = () => {
    if (meta.touched) {
      if (meta.error) {
        return meta.error;
      }
      return `${infoText || ''}`;
    }
    return infoText || '';
  };

  const configNumberField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'filled',
    type: 'number',
    error: Boolean(meta.touched && meta.error),
    helperText: helperText()
  };

  return <TextField {...configNumberField} />;
};

export default FormikNumberField;