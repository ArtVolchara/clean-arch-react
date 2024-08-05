import { serverStatusCodes } from '../../domain/constants/serverStatusCodes';
import DTO from '../../../DTO/adapters/dtos/DTO';
import { TDTOAttributes } from '../../../DTO/domain/entities/TDTOAttributes';
import { onlyDigits, required } from '../../../Validation/domain/constants/validators';
import { IApiResponse } from '../../domain/entities/IApiResponse';
import { isHTTPCode } from '../../domain/constants/validators';
import IValidateValueUseCase from "../../../Validation/application/ports/input/IValidateValueUseCase";
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export default class ApiResponseDTO extends DTO<IApiResponse> implements IApiResponse {
  status;

  data;

  constructor(data?: any, translate?:ITranslateMessageUseCase, validate?: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const attributes: TDTOAttributes<IApiResponse> = {
      status: { name: 'status', validators: [required, onlyDigits, isHTTPCode], type: Number, defaultValue: serverStatusCodes.OK, labelKey: { id: 'system.httpRequest.response.status' } },
      data: { name: 'data', validators: [required], type: Object, defaultValue: {}, labelKey: { id: 'Request.response?.data' } },
    };
    Object.assign(this, super.getEntity(data, attributes, ApiResponseDTO.name, isLogValidation));
  }
}
