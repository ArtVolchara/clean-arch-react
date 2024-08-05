import { DatePickerProps } from '@mui/lab/DatePicker/DatePicker';
import { TextFieldProps } from '@mui/material';

import { required as requiredValidator } from '../../../../../../Validation/domain/constants/validators';

import { TTextFieldFromAttrProps } from './TextInputFormAttr';
import DateInput from '../DateInput';
import { TAttrFieldProps } from '../../../types/TAttrFieldProps';
import { TDTOAttribute } from '../../../../../../DTO/domain/entities/TDTOAttributes';

type TDatePickerProps = Omit<Partial<DatePickerProps<Record<any, any>>> & Partial<TextFieldProps>, 'type'> & TAttrFieldProps<TDTOAttribute<string>> & {
};

export default function DateInputFromAttr(props:TDatePickerProps) {
  const {
    attribute,
    namePrefix = '',
    namePostfix = '',
    disabled,
    withLabel = true,
    label = '',
    withPlaceholder = true,
    placeholder = '',
    variant = 'outlined',
    fullWidth = true,
    required = !!attribute.validators.find((validator) => validator.toString() === requiredValidator.toString()),
    InputLabelProps = {},
    inputProps = {},
    controlProps = ({} as TTextFieldFromAttrProps['controlProps']),
    translateMessage = () => '',
  } = props;
  let name = namePrefix ? `${namePrefix}.${attribute.name}` : attribute.name;
  name = namePostfix ? `${name}.${namePostfix}` : name;
  const id = `${name}-date-input`;
  const { value = '', error, touched, setFieldValue = () => {}, onBlur = () => {} } = controlProps;
  const isShowError = touched && Boolean(error);
  //todo компонент имеет баги при вводе, поправить дочерний DateInput
  return (
    <DateInput
      value={value}
      disabled={disabled}
      label={withLabel ? label || translateMessage(attribute.labelKey) : ''}
      onChange={(value) => {
        setFieldValue(name, value);
      }}
      id={id}
      name={name}
      error={isShowError}
      onBlur={onBlur}
      required={required}
      hiddenLabel={withLabel}
      placeholder={withPlaceholder ? placeholder || translateMessage({ id: `${attribute.labelKey.id}.placeholder` }) : undefined}
      helperText={isShowError ? error : ' '}
      fullWidth={fullWidth}
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      inputProps={inputProps}
      variant={variant}
    />
  );
}
