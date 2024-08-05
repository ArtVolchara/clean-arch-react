import React from 'react';

import { Field } from 'formik';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';
import { TValidateValueStringified } from '../../../../../Validation/domain/entities/TValidators';

export type TFormFieldProps = {
  attribute: TDTOAttribute;
  namePrefix?: string;
  namePostfix?: string;
  validate?: TValidateValueStringified;
  children: JSX.Element;
};
function FormField(props: TFormFieldProps) {
  const { attribute, namePrefix = '', namePostfix = '', children, validate = undefined } = props;
  let fieldName = namePrefix && attribute?.name
    ? `${namePrefix}.${attribute.name}`
    : attribute.name;
  fieldName = namePostfix ? `${fieldName}.${namePostfix}` : fieldName;
  return (
    <Field
      name={fieldName}
      validate={validate ? (value:any) => validate(value, attribute.validators) : undefined}
    >
      {({ field, form, meta }) => React.Children.map(children, (child, index) => React.cloneElement(child, {
        controlProps: { ...field, ...meta, ...form },
        required: !validate ? false : child.props.required,
      }))}
    </Field>
  );
}
export default FormField;
