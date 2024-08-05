import React, { ForwardedRef, useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteValue,
  FilterOptionsState,
} from '@mui/base/useAutocomplete/useAutocomplete';
import IInputProps from '../../../types/IInputProps';
import { ITranslateMessageUseCase } from '../../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import { TValidateValueStringified } from '../../../../../../Validation/domain/entities/TValidators';

export type TFilteredSelectWrapperProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    > =
    Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput' | 'filterOptions' | 'onChange'> & {
      TextFieldProps: Partial<Omit<TextFieldProps, 'onChange' | 'helperText' | 'error'>> & Omit<IInputProps, 'translateMessage' | 'validate'> & {
        withHelperText?: boolean,
        isShowError?: boolean,
        error?: string,
      },
      filterOptions?: (options: Array<Value>, filterText: string) => Array<Value>,
      onChange?: (
        event: React.SyntheticEvent,
        value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<Value>,
        setInputText?: (text: string) => void
      ) => void,
      translateMessage?: ITranslateMessageUseCase,
      validate?: TValidateValueStringified,
    };

export default function FilteredSelectInput<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    >(props: TFilteredSelectWrapperProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    id = `filter-select-input-${Math.random()}`,
    sx,
    value,
    options = [],
    ChipProps = undefined,
    fullWidth = false,
    TextFieldProps: {
      name = 'filter-select-input',
      variant = 'outlined',
      InputLabelProps = {},
      inputProps = {},
      InputProps = {},
      SelectProps,
      margin = 'none',
      size = 'medium',
      onBlur = () => {},
      required = false,
      isShowError = false,
      error = '',
      withHelperText = true,
      withLabel = true,
      label = '',
      placeholder,
      withPlaceholder = true,
      sx: TextFieldSxProps,
    },
    getOptionLabel = (option: any) => option?.label || '',
    isOptionEqualToValue,
    renderOption,
    renderTags,
    limitTags,
    onChange = (event, value, reason, details, setInputText) => {},
    onClose = (event: React.SyntheticEvent, reason: string) => {},
    blurOnSelect = false,
    loading = false,
    multiple = false,
    disabled,
    inputValue = '',
    clearOnBlur = false,
    filterOptions = (options: Array<Value>) => options.filter((option) => option),
    onInputChange = () => {},
    freeSolo,
    translateMessage = () => '',
    open,
    autoSelect,
  } = props;
  let helperText = '';
  if (withHelperText) {
    helperText = isShowError ? error : ' ';
  } else {
    helperText = '';
  }

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (inputValue !== inputText) {
      setInputText(inputValue);
    }
  }, [inputValue]);

  function handleInputChange(
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) {
    if (value !== inputText) {
      setInputText(value);
    }
    onInputChange(event, value, reason);
  }

  function handleFilterOptions(options: Array<Value>, state: FilterOptionsState<Value>) {
    return filterOptions(options, inputText);
  }

  function handleOnChange(
    event: React.SyntheticEvent,
    value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value>,
  ) {
    onChange(event, value, reason, details, setInputText);
  }
  return (
    <Autocomplete<Value, Multiple, DisableClearable, FreeSolo>
      id={id}
      sx={sx}
      value={value}
      onChange={handleOnChange}
      onClose={onClose}
      freeSolo={freeSolo}
      options={options}
      autoSelect={autoSelect}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      limitTags={limitTags}
      open={open}
      renderOption={renderOption}
      disabled={disabled}
      multiple={(multiple as Multiple)}
      loading={loading}
      filterOptions={handleFilterOptions}
      inputValue={inputText || ''}
      onInputChange={handleInputChange}
      noOptionsText={translateMessage({ id: 'system.select.noOptions' })}
      loadingText={translateMessage({ id: 'system.loading' })}
      openOnFocus
      blurOnSelect={blurOnSelect}
      clearOnBlur={clearOnBlur}
      renderTags={renderTags}
      ChipProps={ChipProps}
      fullWidth={fullWidth}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          sx={TextFieldSxProps}
          name={name}
          label={withLabel ? label : ''}
          error={isShowError}
          onBlur={onBlur}
          required={required}
          hiddenLabel={withLabel}
          placeholder={withPlaceholder ? placeholder : undefined}
          helperText={helperText}
          fullWidth={fullWidth}
          InputLabelProps={{ ...params?.InputLabelProps, ...InputLabelProps, shrink: !!withLabel }}
          inputProps={{ ...params?.inputProps, ...inputProps }}
          InputProps={{ ...params?.InputProps, ...InputProps }}
          SelectProps={SelectProps}
          variant={variant}
          size={size}
          margin={margin}
        />
      )}
    />
  );
}
