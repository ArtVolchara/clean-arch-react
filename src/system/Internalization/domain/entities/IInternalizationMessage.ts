
export type TIntlMessageDescriptor = {
  id?:string;
  description?: string | object;
  defaultMessage?: string;
};

export type TIntlMessageValues = Record<string, string | number | boolean | Date | null | undefined>;
export type TIntlMessageParams = [TIntlMessageDescriptor?, TIntlMessageValues?, ...any];
export type TTranslateFunction = (descriptor: TIntlMessageDescriptor, values?: TIntlMessageValues, ...args) => string;
