import { IApiError } from 'system/HttpRequest/domain/entities/IApiError';
import DTO from '../../../DTO/adapters/dtos/DTO';
import { TDTOAttributes } from '../../../DTO/domain/entities/TDTOAttributes';
import { onlyDigits, required } from '../../../Validation/domain/constants/validators';
import { serverStatusCodes } from '../../domain/constants/serverStatusCodes';
import { isHTTPCode } from '../../domain/constants/validators';
import IValidateValueUseCase from "../../../Validation/application/ports/input/IValidateValueUseCase";
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export default class ApiErrorDTO extends DTO<IApiError> implements IApiError {
  status;

  data;

  constructor(data?: any, translate?:ITranslateMessageUseCase, validate?: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const attributes: TDTOAttributes<IApiError> = {
      status: { name: 'status', validators: [required, onlyDigits, isHTTPCode], type: Number, defaultValue: serverStatusCodes.SERVICE_UNAVAILABLE, labelKey: { id: 'system.httpRequest.error.status' } },
      data: { name: 'data', validators: [required], type: Object, defaultValue: {}, labelKey: { id: 'system.httpRequest.error.data' } },
    };
    Object.assign(this, super.getEntity(data, attributes, ApiErrorDTO.name, isLogValidation));
  }
}
