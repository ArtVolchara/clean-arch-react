import { FormHelperText, Popper, TextField, TextFieldProps } from '@mui/material';
import { useRef } from 'react';

export type TTextInputProps = TextFieldProps & {
  helperTextInPopper?: boolean
};

export default function TextInput(props: TTextInputProps) {
  const {
    helperTextInPopper = false,
    ...rest
  } = props;
  const {
    sx,
    helperText,
    disabled,
    error,
    variant,
    required,
    placeholder,
    multiline,
    InputProps,
    FormHelperTextProps,
  } = rest;
  const anchorRef = useRef(null);
  const formHelperTextSx = FormHelperTextProps?.sx || {};
  return (
    <TextField
      sx={sx}
      {...rest}
      ref={anchorRef}
      FormHelperTextProps={{ ...FormHelperTextProps, sx: { mt: 0, ...formHelperTextSx } }}
        // Баг с использованием multiline https://github.com/mui/base-ui/issues/16, пришлось задать фиксированное количество строк
      InputProps={multiline ? {
        ...InputProps,
        rows: 10,
        multiline: true,
        inputComponent: 'textarea',
      }
        : InputProps}
      helperText={
        helperTextInPopper && anchorRef?.current
          ? (
            <Popper
              id={`${rest.id}-popper`}
              open={!!helperText}
              anchorEl={anchorRef?.current}
              placement="bottom-start"
            >
              <FormHelperText
                sx={{ mt: 0 }}
                variant={variant}
                error={error}
                disabled={disabled}
                required={required}
              >
                {helperText}
              </FormHelperText>
            </Popper>
          )
          : helperText
      }
    />
  );
}
