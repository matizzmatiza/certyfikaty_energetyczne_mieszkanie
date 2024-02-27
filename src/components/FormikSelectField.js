import React from 'react';
import { useField } from 'formik';
import { TextField, MenuItem } from '@mui/material';

const FormikSelectField = ({ name, options, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configSelectField = {
    ...field,
    ...otherProps,
    select: true,
    fullWidth: true,
    variant: 'filled',
    error: Boolean(meta.touched && meta.error),
    helperText: meta.touched && meta.error ? meta.error : ''
  };

  return (
    <TextField {...configSelectField}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FormikSelectField;