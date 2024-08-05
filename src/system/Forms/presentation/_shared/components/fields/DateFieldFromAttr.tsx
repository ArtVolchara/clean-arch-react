import { DatePickerProps } from '@mui/lab/DatePicker/DatePicker';
import { TextFieldProps } from '@mui/material';

import { TAttrFieldProps } from '../../types/TAttrFieldProps';
import DateInputFromAttr from '../inputs/inputsFromAttributes/DateInputFromAttr';

import FormField from './FormField';
import { TDTOAttribute } from '../../../../../DTO/domain/entities/TDTOAttributes';

type TDatePickerProps = Omit<Partial<DatePickerProps<Record<any, any>>> & Partial<TextFieldProps>, 'type'> & TAttrFieldProps<TDTOAttribute<string>> & {
  type?: 'date' | 'time' | 'datetime-local'
};

//todo компонент имеет баги при вводе, поправить дочерний DateInput
export default function DateFieldFromAttr(props:TDatePickerProps) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    validate,
  } = props;
  return (
    <FormField attribute={attribute} namePrefix={namePrefix} namePostfix={namePostfix} validate={validate}>
      <DateInputFromAttr
        {...props}
      />
    </FormField>
  );
}
