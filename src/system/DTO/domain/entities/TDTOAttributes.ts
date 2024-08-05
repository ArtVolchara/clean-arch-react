import { TValidationFunction } from '../../../Validation/domain/entities/TValidators';

export type TDTOAttribute<SchemaKey extends string = string> = {
  name: SchemaKey,
  validators: Array<TValidationFunction>,
  type: { new(...args: any[]): {} } | { (...args: any[]):any },
  defaultValue: any,
  labelKey: { id: string }
};

export type TDTOAttributes<T> = {
  [key in keyof Omit<Required<T>, 'attributes'> & string]: TDTOAttribute<key>
};
