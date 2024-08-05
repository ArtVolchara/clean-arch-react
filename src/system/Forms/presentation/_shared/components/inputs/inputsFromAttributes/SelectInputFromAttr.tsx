import React from 'react';

import { MenuItem, TextFieldProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select/Select';

import TextFieldFromAttr from './TextInputFormAttr';
import { TAttrFieldProps } from '../../../types/TAttrFieldProps';
import { TDTOAttribute } from '../../../../../../DTO/domain/entities/TDTOAttributes';

export type TSelectWrapperProps<T extends TDTOAttribute<string>> = Partial<TextFieldProps> & SelectProps & TAttrFieldProps<T>;

function SelectInputFromAttr<T extends TDTOAttribute<string>>(props:TSelectWrapperProps<T>) {
  const {
    attribute,
    placeholder = undefined,
    children,
    translateMessage,
  } = props;
  return (
    <TextFieldFromAttr
      {...props}
      isSelect
    >
      <MenuItem
        id={`${attribute.name}_empty_menu_item`}
        value=""
      >
        {placeholder || translateMessage({ id: `${attribute.labelKey.id}.placeholder` })}
      </MenuItem>
      {children}
    </TextFieldFromAttr>
  );
}
export default SelectInputFromAttr;
