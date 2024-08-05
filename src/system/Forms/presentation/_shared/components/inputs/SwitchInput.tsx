import * as React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

type TSwitchInputProps = SwitchProps & {
  label?: string,
  error?: boolean,
  helperText?: string,
  labelPlacement?: FormControlLabelProps['labelPlacement']
};

export default function SwitchInput(props:TSwitchInputProps) {
  const {
    name = 'switch-input',
    id = `${name}-${Math.random()}`,
    checked = false,
    value = '',
    label = '',
    helperText,
    onChange = () => {},
    disabled = false,
    error = false,
    required = false,
    inputProps = {},
    size = 'medium',
    sx,
    labelPlacement = 'top',
    edge = false,
    checkedIcon = undefined,
    icon = undefined,
    inputRef = undefined,
  } = props;
  const { color = 'primary' } = props;
  const switchProps:SwitchProps = {
    id,
    name,
    checked,
    value,
    onChange,
    inputProps,
    required,
    size,
    edge,
    inputRef,
    color,
    disabled,
  };
  if (icon) {
    switchProps.icon = icon;
  }
  if (checkedIcon) {
    switchProps.checkedIcon = icon;
  }
  const SwitchComponent = (
    <Switch
      sx={sx}
      {...switchProps}
    />
  );
  return (
    <>
      {label
        ? (
          <FormControl
            component="fieldset"
            fullWidth
          >
            <InputLabel
              shrink
            >
              {label}
            </InputLabel>
            {SwitchComponent}
            <FormHelperText
              error={error}
              disabled={disabled}
              required={required}
            >
              {helperText}
            </FormHelperText>
          </FormControl>
        )
        : SwitchComponent}
    </>
  );
}
