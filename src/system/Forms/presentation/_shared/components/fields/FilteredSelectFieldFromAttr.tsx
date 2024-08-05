import React from 'react';
import { ChipTypeMap } from '@mui/material/Chip';
import { TAttrFieldProps } from '../../types/TAttrFieldProps';
import FormField from './FormField';
import FilteredSelectInputFromAttr, { TFilteredSelectInputFromAttrProps } from '../inputs/inputsFromAttributes/FilteredSelectInputFromAttr';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';

type TFilteredSelectFieldFromAttrProps<
    Value, Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    > =
    TFilteredSelectInputFromAttrProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & Omit<TAttrFieldProps<TDTOAttribute>, 'isSelect'> & {
      options: Array<Value>;
      onInputChange: (...args: any) => void;
    };

function FilteredSelectFieldFromAttr<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    >(props: TFilteredSelectFieldFromAttrProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    validate,
    ...rest
  } = props;

  return (
    <FormField attribute={attribute} namePrefix={namePrefix} namePostfix={namePostfix} validate={validate}>
      <FilteredSelectInputFromAttr<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> {...props} />
    </FormField>
  );
}
export default FilteredSelectFieldFromAttr;
