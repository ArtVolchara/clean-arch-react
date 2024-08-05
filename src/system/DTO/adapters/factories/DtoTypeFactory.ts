import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from '../../../Validation/application/ports/input/IValidateValueUseCase';

export default function DtoTypeFactory(ItemType:{ new(...args: any[]): {} }, translateMessage: ITranslateMessageUseCase, validateValue: IValidateValueUseCase, isLogValidation = true) {
  return function DtoType(data) {
    return new ItemType(data, translateMessage, validateValue, isLogValidation);
  };
}
