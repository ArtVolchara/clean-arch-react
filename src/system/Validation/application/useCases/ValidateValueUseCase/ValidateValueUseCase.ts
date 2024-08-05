import { TValidationFunction } from '../../../domain/entities/TValidators';
import { TValidateValueUseCaseFactoryDepsType } from '../../ports/input/IValidateValueUseCase';

const ValidateValueUseCaseFactory = (...[{
  translateMessageUseCase: translateMessage,
}]: TValidateValueUseCaseFactoryDepsType) => (value:any, validators: Array<TValidationFunction>): undefined | Array<string> => {
  const isIntlServiceProvided = !!(translateMessage);
  if (!isIntlServiceProvided) {
    console.log('No internalization service provided.');
  }
  const errorMessages = [];
  validators.forEach((validator: TValidationFunction) => {
    const errorMessageParams: ReturnType<TValidationFunction> = validator(value);
    if (errorMessageParams) {
      errorMessages.push(
        isIntlServiceProvided
          ? translateMessage(...errorMessageParams)
          : errorMessageParams[0]?.defaultMessage || `Value did not pass the validation rule (${validator.name}), but no custom nor default message provided for the rule`,
      );
    }
  });
  if (errorMessages.length) {
    return errorMessages;
  }
  return undefined;
};

export default ValidateValueUseCaseFactory;
