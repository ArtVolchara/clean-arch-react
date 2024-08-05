import { TIntlMessageParams } from '../../../Internalization/domain/entities/IInternalizationMessage';

export type TValidationFunction = (value:any) => undefined | TIntlMessageParams;

export type TValidateValueStringified = (value:any, validators: Array<TValidationFunction>) => string | void;

export type TValidators<Schema> = {
  [key in keyof Schema]: Array<TValidationFunction>
};
