import { TValidators } from '../../../domain/entities/TValidators';
import getObjectEntries from '../../../../_shared/adapters/utils/utility';
import IValidateEntityUseCase, { TValidateEntityUseCaseFactoryDepsType } from '../../ports/input/IValidateEntityUseCase';

const ValidateEntityUseCaseFactory = (
  ...[{
    translateMessageUseCase: translateMessage,
    validateValueUseCase: validateValue,
  }]: TValidateEntityUseCaseFactoryDepsType
): IValidateEntityUseCase => <Schema>(value: Schema, fieldsValidators:TValidators<Schema>) => {
  const res = getObjectEntries<TValidators<Schema>>(fieldsValidators)
    .reduce((acc, fieldValidatorsEntry) => {
      const [fieldKey, validators] = fieldValidatorsEntry;
      const fieldErrors = validateValue(value[fieldKey], validators);
      if (fieldErrors) {
        acc[fieldKey] = fieldErrors && fieldErrors.join();
      }
      return acc;
    }, {} as Record<keyof Schema, string>);
  return Object.values(res).length ? res : undefined;
};

export default ValidateEntityUseCaseFactory;
