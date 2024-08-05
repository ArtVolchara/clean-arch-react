import DTO from '../../../DTO/adapters/dtos/DTO';
import { TDTOAttributes } from '../../../DTO/domain/entities/TDTOAttributes';
import ListTypeFactory from '../../../DTO/adapters/factories/ListTypeFactory';
import PaginationStateDTO from './PaginationStateDTO';
import { IPaginatedResponse } from '../../domain/entities/IPaginatedResponse';
import IValidateValueUseCase from "../../../Validation/application/ports/input/IValidateValueUseCase";
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

  export default class PaginatedResponseDTO<Constructor extends new (...args: any[]) => any> extends DTO<IPaginatedResponse<InstanceType<Constructor>>> implements IPaginatedResponse<InstanceType<Constructor>> {
  content: Array<InstanceType<Constructor>>;

  number;

  size;

  totalElements;

  totalPages;

  constructor(itemType: Constructor, data?: any, translate?:ITranslateMessageUseCase, validate?: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const paginationAttrs = new PaginationStateDTO(data, translate, validate, false).getAttributes();
    const attributes: TDTOAttributes<IPaginatedResponse<InstanceType<Constructor>>> = {
      content: { name: 'content', validators: [], type: ListTypeFactory<Constructor>(itemType, translate, validate, isLogValidation), defaultValue: [], labelKey: { id: 'Request.response?.data.list.content' } },
      ...paginationAttrs,
    };
    Object.assign(this, super.getEntity(data, attributes, PaginatedResponseDTO.name, isLogValidation));
  }
}
