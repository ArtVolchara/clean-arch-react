import React from 'react';

import FormField from './FormField';
import TextInputFromAttr, { TTextFieldFromAttrProps } from '../inputs/inputsFromAttributes/TextInputFormAttr';

export type TFieldWrapperProps = TTextFieldFromAttrProps;

function TextFieldFromAttr(props:TFieldWrapperProps) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    validate = () => '',
    children,
  } = props;
  return (
    <FormField attribute={attribute} namePrefix={namePrefix} namePostfix={namePostfix} validate={validate}>
      <TextInputFromAttr
        {...props}
      >
        {children}
      </TextInputFromAttr>
    </FormField>
  );
}
export default TextFieldFromAttr;
