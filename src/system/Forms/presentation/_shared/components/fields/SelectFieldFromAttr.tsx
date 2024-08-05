import React from 'react';

import { TextFieldProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select/Select';

import { TAttrFieldProps } from '../../types/TAttrFieldProps';
import SelectInputFromAttr from '../inputs/inputsFromAttributes/SelectInputFromAttr';

import FormField from './FormField';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';

export type TSelectWrapperProps = Partial<TextFieldProps> & SelectProps & TAttrFieldProps<TDTOAttribute<string>>;

function SelectFieldFromAttr(props:TSelectWrapperProps) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    validate,
    children,
  } = props;
  return (
    <FormField attribute={attribute} namePrefix={namePrefix} namePostfix={namePostfix} validate={validate}>
      <SelectInputFromAttr
        {...props}
        isSelect
      >
        {children}
      </SelectInputFromAttr>
    </FormField>
  );
}
export default SelectFieldFromAttr;
