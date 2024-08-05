import React from 'react';
import { FieldArray } from 'formik';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';

interface FieldArrayHocProps {
  attribute: TDTOAttribute<string>;
  namePrefix?: string;
  children: JSX.Element
}

export default function FieldArrayFromAttr(props:FieldArrayHocProps) {
  const {
    attribute,
    namePrefix = '',
    children,
  } = props;
  const name = namePrefix ? `${namePrefix}.${attribute.name}` : attribute.name;
  return (
    <FieldArray name={name}>
      {(FieldArrayProps) => {
        const { form: { values } } = FieldArrayProps;
        return values[name].map((element, index) => {
          const fieldName = `${name}.${index}`;
          return React.Children.map(children, (child, index) => React.cloneElement(child, {
            fieldName,
          }));
        });
      }}
    </FieldArray>
  );
}
