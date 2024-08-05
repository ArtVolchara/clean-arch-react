import React, { memo } from 'react';
import { Tooltip } from '@mui/material';
import { SelectProps } from '@mui/material/Select/Select';
import { required as requiredValidator } from '../../../../../../Validation/domain/constants/validators';
import { TAttrFieldProps } from '../../../types/TAttrFieldProps';
import { TDTOAttribute } from '../../../../../../DTO/domain/entities/TDTOAttributes';
import TextInput, { TTextInputProps } from '../TextInput';

export type TTextFieldFromAttrProps = Partial<Omit<TTextInputProps, 'error'>> & SelectProps & TAttrFieldProps<TDTOAttribute<string>>;
function TextInputFromAttr<T extends TDTOAttribute<string>>(props:TTextFieldFromAttrProps) {
  const {
    sx,
    attribute,
    namePrefix = '',
    namePostfix = '',
    label = '',
    placeholder = '',
    disabled = false,
    withLabel = true,
    withPlaceholder = true,
    variant = 'outlined',
    fullWidth = true,
    type = 'text',
    required = !!attribute.validators.find((validator) => validator.toString() === requiredValidator.toString()),
    InputLabelProps = {},
    inputProps = {},
    isSelect = false,
    multiline = false,
    size = 'medium',
    margin = 'none',
    helperTextInPopper = false,
    children,
    controlProps = ({} as TTextFieldFromAttrProps['controlProps']),
    SelectProps = ({} as TTextFieldFromAttrProps['SelectProps']),
    translateMessage,
  } = props;
  const { value = '', error = '', touched, onChange = () => {}, onBlur = () => {} } = controlProps;
  const isShowError = touched && Boolean(error);
  let name = namePrefix ? `${namePrefix}.${attribute.name}` : attribute.name;
  name = namePostfix ? `${name}.${namePostfix}` : name;
  const id = `${name}-${isSelect ? 'select' : type}-input`;
  const textFieldComponent = (
    <TextInput
      sx={sx}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={withLabel ? label || translateMessage(attribute.labelKey) : ''}
      error={isShowError}
      required={required}
      disabled={disabled}
      hiddenLabel={withLabel}
      placeholder={withPlaceholder ? placeholder || translateMessage({ id: `${attribute.labelKey.id}.placeholder` }) : undefined}
      helperText={error || ' '}
      helperTextInPopper={helperTextInPopper}
      fullWidth={fullWidth}
      type={type}
      select={isSelect}
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      inputProps={inputProps}
      SelectProps={{ displayEmpty: true, ...SelectProps }}
      multiline={multiline}
      variant={variant}
      size={size}
      margin={margin}
    >
      {children}
    </TextInput>
  );
  return (
    !isSelect && !multiline && value.length >= 40
      ? (
        <Tooltip title={value} placement="top-start" arrow>
          <>
            {textFieldComponent}
          </>
        </Tooltip>
      )
      : textFieldComponent
  );
}
export default TextInputFromAttr;
