import IValidateValueUseCase from '../../../../Validation/application/ports/input/IValidateValueUseCase';
import { TValidationFunction } from '../../../../Validation/domain/entities/TValidators';

export default function generateFieldValidator(validateValueUseCase: IValidateValueUseCase) {
  return (value: any, validators: TValidationFunction[]) => {
    const res = validateValueUseCase(value, validators);
    return res?.join('. ');
  };
}
