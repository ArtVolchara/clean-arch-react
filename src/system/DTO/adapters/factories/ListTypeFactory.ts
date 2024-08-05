import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from '../../../Validation/application/ports/input/IValidateValueUseCase';

export default function ListTypeFactory<ItemType>(
  DTO: new(...args: any[]) => ItemType,
  translateMessage: ITranslateMessageUseCase,
  validateValue: IValidateValueUseCase,
  isLogValidation = true,
): (list:Array<any>) => Array<ItemType> {
  return (list:Array<any>): Array<ItemType> => {
    const resultList = ([] as Array<ItemType>);
    if (list && list.length) {
      list.forEach((el) => { resultList.push(new DTO(el, translateMessage, validateValue, isLogValidation)); });
    }
    return resultList;
  };
}
