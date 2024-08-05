import { TValidationFunction } from '../../../domain/entities/TValidators';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export type TValidateValueUseCaseFactoryDepsType = [{ translateMessageUseCase: ITranslateMessageUseCase }];

export default interface IValidateValueUseCase {
  (value:any, validators: Array<TValidationFunction>): Array<string> | undefined;
}
export const ValidateValueUseCaseToken = 'validateValueUseCase';
