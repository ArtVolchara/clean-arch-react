import { TDTOAttribute, TDTOAttributes } from '../../domain/entities/TDTOAttributes';
import { TValidators } from '../../../Validation/domain/entities/TValidators';
import IValidateValueUseCase from '../../../Validation/application/ports/input/IValidateValueUseCase';
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export default class DTO<Schema> {
  protected attributes: TDTOAttributes<Schema>;

  protected validate?: IValidateValueUseCase;

  protected translate?: ITranslateMessageUseCase;

  constructor(validate?: IValidateValueUseCase, translate?:ITranslateMessageUseCase) {
    Object.defineProperty(this, 'validate', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: validate,
    });
    Object.defineProperty(this, 'translate', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: translate,
    });
  }

  getEntity(
    data: any,
    attributes: TDTOAttributes<Schema>,
    dtoName: string,
    isLogValidation = true,
  ): Schema {
    try {
      Object.defineProperty(this, 'attributes', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: attributes,
      });
      const entity: any = {};
      Object.entries<TDTOAttribute<keyof Schema & string>>(attributes).forEach(
        ([name, attribute]: [string, TDTOAttribute<keyof Schema & string>]) => {
          const {
            validators: propertyValidators = [],
            type,
            defaultValue = undefined,
          } = attribute;
          const param = data?.[name];
          if ((param === null || param === undefined) && defaultValue === undefined) {
            return;
          }
          if ((param === null || param === undefined) && defaultValue === null) {
            return null;
          }
          const typedValue = this.getTypedValue(param, type);
          entity[name] = typedValue;
          if (this.validate) {
            const errorMessages: Array<string> = this.validate(param, propertyValidators);
            if (errorMessages?.length && isLogValidation) {
              console.error(
                this.translate
                  ? this.translate(
                    { id: 'system.dto.error.validation' },
                    {
                      dtoName,
                      name,
                      value: param,
                      errorNumber: errorMessages.length,
                      errorMessages: errorMessages.join(', '),
                    },
                  )
                  : `${dtoName}: value ${param} of the field ${name} didn't pass field validation rules`,
              );
            }
            if (this.validate(typedValue, propertyValidators)?.length) {
              entity[name] = defaultValue;
            }
          }
        },
      );
      return entity as Schema;
    } catch (e) {
      if (this.translate) {
        console.error(this.translate({ id: 'system.dto.error.creation' }), e);
      }
      throw new Error(e.message);
    }
  }

  private getTypedValue(value: any, type): any {
    if (type) {
      switch (type) {
        case Array:
          return value ? (type as { (...args: any[]): any })(...value) : [];
        case Date:
          return value
            ? new (type as { new (...args: any[]): {} })(value)
            : new Date(`${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`);
        case String:
          return value === null || value === undefined
            ? ''
            : (type as { (...args: any[]): any })(value);
        case Number:
          return value === null || value === undefined
            ? 0
            : (type as { (...args: any[]): any })(value);
        default:
          return (type as { (...args: any[]): any })(value);
      }
    } else {
      return value;
    }
  }

  getData(): Schema {
    const data = { ...this };
    delete data.attributes;
    delete data.translate;
    delete data.validate;
    return data as unknown as Schema;
  }

  getAttributes(): TDTOAttributes<Schema> {
    return this.attributes;
  }

  getValidators(): TValidators<Schema> {
    return Object.entries<TDTOAttribute<keyof Schema & string>>(this.attributes).reduce<
    TValidators<Schema>
    >((acc, current) => {
      const [key, value] = current;
      acc[key] = value.validators;
      return acc;
    }, {} as TValidators<Schema>);
  }
}
