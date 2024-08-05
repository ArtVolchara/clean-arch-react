import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import { TValidateValueStringified } from '../../../../Validation/domain/entities/TValidators';

export default interface IInputProps {
  name?: string,
  label?: string,
  placeholder?:string,
  withLabel?: boolean,
  withPlaceholder?: boolean,
  disabled?:boolean,
  required?:boolean,
  translateMessage?: ITranslateMessageUseCase,
  validate?: TValidateValueStringified;
}
