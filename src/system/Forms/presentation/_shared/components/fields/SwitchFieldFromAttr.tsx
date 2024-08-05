import React from 'react';
import { SwitchProps } from '@mui/material/Switch';
import FormField from './FormField';
import SwitchInputFromAttr from '../inputs/inputsFromAttributes/SwitchInputFromAttr';
import { TAttrFieldProps } from '../../types/TAttrFieldProps';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';

export type TSwitchWrapperProps = SwitchProps & TAttrFieldProps<TDTOAttribute>;

function SwitchFieldFromAttr(props:TSwitchWrapperProps) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    validate,
  } = props;
  return (
    <FormField attribute={attribute} namePrefix={namePrefix} namePostfix={namePostfix} validate={validate}>
      <SwitchInputFromAttr
        {...props}
      />
    </FormField>
  );
}
export default SwitchFieldFromAttr;
