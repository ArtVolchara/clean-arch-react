export const required = (value:any) => (value || (Array.isArray(value) && value.length) || typeof value === 'number' || typeof value === 'boolean' ? undefined : [{ id: 'system.validation.error.empty', defaultMessage: 'Field should not be empty' }]);

export const maxLength = (max:number) => (value:string) => (value && value.length > max ? [{ id: 'system.validation.error.maxLength' }, { max }] : undefined);
export const minLength = (min:number) => (value:string) => (value && value.length < min ? [{ id: 'system.validation.error.minLength' }, { min }] : undefined);
export const maxNumericValue = (max:number) => (value:number) => (value > max ? [{ id: 'system.validation.error.maxNumericValue' }, { max }] : undefined);

export const mustBeADigitString = (value:any) => {
  if (typeof value === 'string') {
    return !(/^[\p{N}]+$/u.test(value))
      ? [{ id: 'system.validation.error.mustBeADigitString' }]
      : undefined;
  }
  return [{ id: 'system.validation.error.mustBeADigitString' }];
};
export const mustBeNumber = (value:any) => (typeof value !== 'number'
  ? [{ id: 'system.validation.error.mustBeANumber' }]
  : undefined);

export const mustBePositiveNumber = (value:any) => (typeof value !== 'number' || value < 0
  ? [{ id: 'system.validation.error.mustBeAPositiveNumber' }]
  : undefined);

export const email = (value:string) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? [{ id: 'system.validation.error.invalidEmailAddress' }]
  : undefined);

export const phoneNumber = (value:string) => (value && !/^(0|[1-9][0-9]{9})$/i.test(value)
  ? [{ id: 'system.validation.error.invalidPhoneNumber' }]
  : undefined);

export const onlyDigitsAndLetters = (value:string) => (value && !(/^[0-9a-zA-Zа-яА-ЯёЁ]*$/.test(value))
  ? [{ id: 'system.validation.error.onlyDigitsAndLetters' }]
  : undefined);

export const onlyLetters = (value:string) => (value && !(/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value))
  ? [{ id: 'system.validation.error.onlyLetters' }]
  : undefined);

export const onlyDigits = (value:string) => (value && !(/^[0-9]*$/.test(value))
  ? [{ id: 'system.validation.error.onlyDigits' }]
  : undefined);

export const onlyLettersAndNumberAndHyphen = (value:string) => (value && !(/^[0-9-a-zA-Zа-яА-ЯёЁ.\s]*$/.test(value))
  ? [{ id: 'system.validation.error.onlyLettersAndNumberAndHyphen' }]
  : undefined);

export const onlyLettersAndHyphen = (value:string) => (value && !(/^[a-zA-Zа-яёЁА-Я-\s]*$/.test(value))
  ? [{ id: 'system.validation.error.onlyLettersAndHyphen' }]
  : undefined);

export const onlyLettersAndPunctuation = (value:string) => (value && !(/^[a-zA-Zа-яёЁА-Я\s?!,.']*$/.test(value))
  ? [{ id: 'system.validation.error.onlyLettersAndHyphen' }]
  : undefined);

export const noHyphenStartOrEnd = (value:string) => (value && /(^-+)|(-+$)/.test(value)
  ? [{ id: 'system.validation.error.noHyphenStartOrEnd' }]
  : undefined);

export const noDigits = (value:string) => (value && (/^\p{N}+$/u.test(value))
  ? [{ id: 'system.validation.error.noDigits' }]
  : undefined);

export const noLetters = (value:string) => (value && (/^\p{L}+$/u.test(value))
  ? [{ id: 'system.validation.error.onlyDigitsAndLetters' }]
  : undefined);

export const isFirstCharInUpperCase = (value:string) => (value && value.length && !(value[0] === value[0].toUpperCase())
  ? [{ id: 'system.validation.error.isFirstCharInUpperCase' }]
  : undefined);

export const isDateDdMmYyyy = (value:string) => (value && value.length
&& !(/^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value))
  ? [{ id: 'system.validation.error.DdMmYyyyDateOnly' }]
  : undefined);

export const isCIX8Mask = (value:string) => (value && (/[C,c][I,i]\d{8}/.test(value))
  ? [{ id: 'system.validation.error.onlyCIX8Mask' }]
  : undefined);

export const is4XQXMask = (value:string) => (value && (/^\d{4}Q\d$/.test(value))
  ? [{ id: 'system.validation.error.only4XQXMask' }]
  : undefined);

export const isP4XMask = (value:string) => (value && (/^П\d{4}$/.test(value))
  ? [{ id: 'system.validation.error.only4XQXMask' }]
  : undefined);

export const maxLength250 = maxLength(250);
export const maxLength150 = maxLength(150);
export const maxLength125 = maxLength(125);
export const maxLength80 = maxLength(80);
export const maxLength60 = maxLength(60);
export const maxLength50 = maxLength(50);
export const maxLength30 = maxLength(30);
export const maxLength20 = maxLength(20);
export const maxLength25 = maxLength(25);
export const maxLength15 = maxLength(15);
export const maxLength12 = maxLength(12);
export const maxLength10 = maxLength(10);
export const maxLength7 = maxLength(7);
export const maxLength6 = maxLength(6);
export const maxLength5 = maxLength(5);
export const maxLength4 = maxLength(4);
export const maxLength3 = maxLength(3);
export const maxLength2 = maxLength(2);
export const maxLength1 = maxLength(1);
export const minLength2 = minLength(2);
export const minLength3 = minLength(3);
export const minLength4 = minLength(4);
export const minLength6 = minLength(6);
export const minLength7 = minLength(7);
export const minLength10 = minLength(10);
export const minLength25 = minLength(25);
export const minLength80 = minLength(80);
