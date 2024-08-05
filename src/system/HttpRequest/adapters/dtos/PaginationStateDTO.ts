import { TDTOAttributes } from '../../../DTO/domain/entities/TDTOAttributes';
import { DEFAULT_ITEMS_OF_PAGE } from '../../../_shared/domain/configs/pagination';
import DTO from '../../../DTO/adapters/dtos/DTO';
import { IPaginationState } from '../../domain/entities/IPaginationState';
import IValidateValueUseCase from "../../../Validation/application/ports/input/IValidateValueUseCase";
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export default class PaginationStateDTO extends DTO<IPaginationState> implements IPaginationState {
  number;

  size;

  totalElements;

  totalPages;

  constructor(data?: any, translate?:ITranslateMessageUseCase, validate?: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const attributes: TDTOAttributes<IPaginationState> = {
      number: { name: 'number', validators: [], type: Number, defaultValue: 0, labelKey: { id: 'Request.response?.data.list.number' } },
      size: { name: 'size', validators: [], type: Number, defaultValue: DEFAULT_ITEMS_OF_PAGE, labelKey: { id: 'Request.response?.data.list.size' } },
      totalElements: { name: 'totalElements', validators: [], type: Number, defaultValue: 0, labelKey: { id: 'Request.response?.data.list.totalElements' } },
      totalPages: { name: 'totalPages', validators: [], type: Number, defaultValue: 0, labelKey: { id: 'Request.response?.data.list.totalPages' } },
    };
    Object.assign(this, super.getEntity(data, attributes, PaginationStateDTO.name, isLogValidation));
  }

  getPaginationState():IPaginationState {
    return {
      number: this.number,
      size: this.size,
      totalElements: this.totalElements,
      totalPages: this.totalPages,
    };
  }
}
