import {
  TValidators,
} from '../../../domain/entities/TValidators';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from './IValidateValueUseCase';

export type TValidateFormUseCaseFactoryDepsType = [{ translateMessageUseCase: ITranslateMessageUseCase, validateValueUseCase: IValidateValueUseCase }];

export default interface IValidateFormUseCase {
  <Schema>(value: Schema, fieldsValidators: TValidators<Schema>):Record<keyof Schema, Array<string>>;
}
export const ValidateFormUseCaseToken = 'validateFormUseCase';
