import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormHelperText, Popper, TextField, TextFieldProps } from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import { useRef } from 'react';

type TDatePickerProps = Partial<Omit<TextFieldProps, 'onChange'>> & DatePickerProps<string> & {
  onChange: (value?: string) => void
  helperTextInPopper?: boolean
};

//todo компонент имеет баги при вводе, поправить
export default function DateInput(props:TDatePickerProps) {
  const {
    id = `graph-date-input-${Math.random()}`,
    helperTextInPopper,
    onChange,
    onBlur,
    value,
    label,
    ...rest
  } = props;
  const {
    helperText,
    disabled,
    error,
    variant,
    required,
  } = rest;
  const anchorRef = useRef(null);
  let dateValue = null;
  if (value) {
    if (value && typeof value === 'object' && (value as Date) instanceof Date) {
      dateValue = DateTime.fromJSDate(value);
    } else {
      dateValue = DateTime.fromISO(value);
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru">
      <DatePicker
        slots={{ textField: TextField }}
        slotProps={{
          field: {
            clearable: true,
          },
          textField: {
            ...rest,
            id,
            onBlur: (e) => {
              const parsedValue = e.currentTarget?.value && DateTime.fromFormat(e.currentTarget?.value, 'dd.MM.YYYY');
              if (parsedValue && !parsedValue.invalid) {
                onChange(parsedValue.toISO());
              } else {
                onChange(undefined);
              }
              onBlur(e);
            },
            helperText: helperTextInPopper && anchorRef?.current
              ? (
                <Popper
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
              : helperText,
          },
        }}
        value={dateValue}
        onChange={(dayTime, ctx) => {
          if (dayTime && !dayTime.invalid) {
            onChange(dayTime.toISO());
          } else {
            onChange(undefined);
          }
        }}
        label={label}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
}
