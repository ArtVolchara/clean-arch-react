import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox';
import IInputProps from '../../types/IInputProps';

type TCheckboxInputProps = CheckboxProps & IInputProps & {
  error?: string,
};

export default function CheckboxInput(props:TCheckboxInputProps) {
  const {
    name = 'checkbox-input',
    id = `${name}-${Math.random()}`,
    value = '',
    checked = false,
    label = '',
    withLabel = true,
    onChange = () => {},
    disabled,
    error = '',
    required = false,
    inputProps = {},
    size = 'medium',
    sx,
  } = props;
  return (
    <FormControlLabel
      sx={sx}
      control={(
        <Checkbox
          checked={checked}
          onChange={onChange}
          inputProps={inputProps}
          required={required}
          size={size}
        />
        )}
      label={label}
      disabled={disabled}
    />
  );
}
