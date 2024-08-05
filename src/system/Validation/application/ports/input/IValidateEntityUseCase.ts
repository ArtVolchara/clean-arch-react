import {
  TValidators,
} from '../../../domain/entities/TValidators';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from './IValidateValueUseCase';

export type TValidateEntityUseCaseFactoryDepsType = [{ translateMessageUseCase: ITranslateMessageUseCase, validateValueUseCase: IValidateValueUseCase }];

export default interface IValidateEntityUseCase {
  <Schema>(value: Schema, fieldsValidators: TValidators<Schema>):Record<keyof Schema, string> | undefined;
}
export const ValidateEntityUseCaseToken = 'validateEntityUseCase';
