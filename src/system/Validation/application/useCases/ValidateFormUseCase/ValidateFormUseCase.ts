import { TValidators } from '../../../domain/entities/TValidators';
import getObjectEntries from '../../../../_shared/adapters/utils/utility';
import IValidateFormUseCase, { TValidateFormUseCaseFactoryDepsType } from '../../ports/input/IValidateFormUseCase';

const ValidateFormUseCaseFactory = (
  ...[{
    translateMessageUseCase: translateMessage,
    validateValueUseCase: validateValue,
  }]: TValidateFormUseCaseFactoryDepsType
): IValidateFormUseCase => <Schema>(value: Schema, fieldsValidators:TValidators<Schema>) => getObjectEntries<TValidators<Schema>>(fieldsValidators)
  .reduce((acc, fieldValidatorsEntry) => {
    const [fieldKey, validators] = fieldValidatorsEntry;
    const fieldErrors = validateValue(value[fieldKey], validators);
    if (fieldErrors) {
      acc[fieldKey] = fieldErrors;
    }
    return acc;
  }, {} as Record<keyof Schema, Array<string>>);

export default ValidateFormUseCaseFactory;
