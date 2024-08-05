import React from 'react';
import { SwitchProps } from '@mui/material/Switch';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';
import { TDTOAttribute } from '../../../../../../DTO/domain/entities/TDTOAttributes';
import { TAttrFieldProps } from '../../../types/TAttrFieldProps';
import { TTextFieldFromAttrProps } from './TextInputFormAttr';
import { required as requiredValidator } from '../../../../../../Validation/domain/constants/validators';
import SwitchInput from '../SwitchInput';

export type TSwitchWrapperProps<T extends TDTOAttribute<string>> = SwitchProps & TAttrFieldProps<T> & {
  labelPlacement?: FormControlLabelProps['labelPlacement']
};

function SwitchInputFromAttr<T extends TDTOAttribute<string>>(props:TSwitchWrapperProps<T>) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    disabled = false,
    withLabel = true,
    label = '',
    withPlaceholder = true,
    placeholder = '',
    size = 'medium',
    labelPlacement = 'top',
    required = !!attribute.validators.find((validator) => validator.toString() === requiredValidator.toString()),
    inputProps = {},
    edge = false,
    checkedIcon = undefined,
    icon = undefined,
    controlProps = ({} as TTextFieldFromAttrProps['controlProps']),
    color = 'primary',
    translateMessage,
  } = props;
  const { value = '', error = '', touched, onChange = () => {}, onBlur = () => {} } = controlProps;
  const isShowError = touched && Boolean(error);
  let name = namePrefix ? `${namePrefix}.${attribute.name}` : attribute.name;
  name = namePostfix ? `${name}.${namePostfix}` : name;
  return (
    <SwitchInput
      checked={value}
      onChange={onChange}
      checkedIcon={checkedIcon}
      icon={icon}
      name={name}
      label={withLabel ? label || translateMessage(attribute.labelKey) : ''}
      labelPlacement={labelPlacement}
      helperText={error || ' '}
      required={required}
      size={size}
      disabled={disabled}
      inputProps={inputProps}
      edge={edge}
    />
  );
}
export default SwitchInputFromAttr;
