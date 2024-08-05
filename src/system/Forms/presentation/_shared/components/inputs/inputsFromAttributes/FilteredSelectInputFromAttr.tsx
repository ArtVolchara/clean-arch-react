import React from 'react';
import { TextFieldProps } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import FilteredSelectInput from '../FilteredSelectInput/FilteredSelectInput';
import { TTextFieldFromAttrProps } from './TextInputFormAttr';
import { required as requiredValidator } from '../../../../../../Validation/domain/constants/validators';
import { TAttrFieldProps } from '../../../types/TAttrFieldProps';
import { TDTOAttribute } from '../../../../../../DTO/domain/entities/TDTOAttributes';

export type TFilteredSelectInputFromAttrProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    > =
    Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput' | 'onChange' | 'value'>
    & Partial<Omit<TextFieldProps, 'error'>>
    & Omit<TAttrFieldProps<TDTOAttribute>, 'isSelect'>
    & {
      options: Array<Value>;
      onInputChange: (...args: any) => void;
      isShowError?: boolean,
      withHelperText?: boolean,
    };

function FilteredSelectInputFromAttr<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    >(props: TFilteredSelectInputFromAttrProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const {
    attribute,
    options,
    sx,
    ChipProps,
    namePrefix = '',
    namePostfix = '',
    disabled = false,
    withLabel = true,
    label = '',
    withHelperText = true,
    placeholder = '',
    withPlaceholder = true,
    variant = 'outlined',
    fullWidth = true,
    required = !!attribute.validators.find((validator) => validator.toString() === requiredValidator.toString()),
    inputValue,
    inputProps = {},
    size = 'medium',
    margin = 'none',
    InputLabelProps = {},
    InputProps = {},
    SelectProps = {},
    controlProps = ({} as TTextFieldFromAttrProps['controlProps']),
    getOptionLabel,
    isOptionEqualToValue = (option: { label: string, value: Value }, value) => option.value === value,
    onInputChange = () => {},
    renderOption,
    type,
    translateMessage = () => '',
  } = props;
  const { value = '', error = '', touched, onChange = (e) => {}, setFieldValue = (field, value) => {}, onBlur = () => {} } = controlProps;
  const isShowError = touched && Boolean(error);
  let name = namePrefix ? `${namePrefix}.${attribute.name}` : attribute.name;
  name = namePostfix ? `${name}.${namePostfix}` : name;
  const id = `${name}-filtered-select-input`;
  return (
    <FilteredSelectInput
      id={id}
      value={value}
      sx={sx}
      options={options}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onChange={(event, value) => {
        setFieldValue(name, value);
        onChange(event);
      }}
      inputValue={inputValue}
      onInputChange={onInputChange}
      blurOnSelect
      onBlur={onBlur}
      disabled={disabled}
      filterOptions={(x) => x}
      ChipProps={ChipProps}
      TextFieldProps={{
        name,
        type,
        isShowError,
        error,
        placeholder: withPlaceholder ? placeholder || translateMessage({ id: `${attribute.labelKey.id}.placeholder` }) : undefined,
        withHelperText,
        withLabel,
        label: label || translateMessage(attribute.labelKey),
        fullWidth,
        required,
        size,
        margin,
        variant,
        InputLabelProps,
        inputProps,
        InputProps,
        SelectProps,
      }}
    />
  );
}
export default FilteredSelectInputFromAttr;
