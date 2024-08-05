import ListTypeFactory from '../factories/ListTypeFactory';
import { TDTOAttributes } from '../../domain/entities/TDTOAttributes';
import DTO from './DTO';
import IValidateValueUseCase from '../../../Validation/application/ports/input/IValidateValueUseCase';
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

interface IListSchema<ItemType> {
  data: Array<ItemType>
}

class ListDTO<ItemType> extends DTO<IListSchema<ItemType>> {
  data: Array<ItemType>;

  constructor(itemType: new(...args: any[]) => ItemType, data:any, translate:ITranslateMessageUseCase, validate: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const attributes: TDTOAttributes<IListSchema<ItemType>> = {
      data: { name: 'data', validators: [], type: ListTypeFactory(itemType, translate, validate, isLogValidation), defaultValue: [], labelKey: { id: 'system.dto.list' } },
    };
    Object.assign(this, super.getEntity({ data }, attributes, ListDTO.name, isLogValidation));
  }
}

export default ListDTO;
