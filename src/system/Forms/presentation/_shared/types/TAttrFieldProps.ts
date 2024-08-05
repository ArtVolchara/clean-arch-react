import { FieldProps } from 'formik';
import IInputProps from './IInputProps';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export type TAttrFieldProps<TDTOAttribute> = IInputProps & {
  attribute: TDTOAttribute;
  translateMessage: ITranslateMessageUseCase;
  namePrefix?: string;
  namePostfix?: string;
  isSelect?: boolean;
  controlProps?: {
    value: FieldProps['field']['value'];
    setFieldValue: FieldProps['form']['setFieldValue'];
    setFieldError?: FieldProps['form']['setFieldError'];
    setFieldTouched?: FieldProps['form']['setFieldTouched'];
    validateField?: FieldProps['form']['validateField'];
    checked?: FieldProps['field']['checked'];
    onBlur?: FieldProps['field']['onBlur'];
    onChange?: FieldProps['field']['onChange'];
    error?: FieldProps['meta']['error'];
    touched?: FieldProps['meta']['touched'];
    initialValue?: FieldProps['meta']['initialValue'];
    initialTouched?: FieldProps['meta']['initialTouched'];
    initialError?: FieldProps['meta']['initialError'];
  }
};
