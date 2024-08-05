import { ELocaleKeys } from 'system/Internalization/domain/constants/appLocaleKeys';
import { TIntlMessageDescriptor, TIntlMessageParams, TIntlMessageValues } from '../../../../domain/entities/IInternalizationMessage';
import { TLocales } from '../../../../domain/entities/TLocale';

export interface IInternalizationService {
  locale: string
  formatMessage(...args:TIntlMessageParams): string;
  formatDate(value: number | Date, ...args: any): string;
}


interface IInternalizationServiceAdapter<Locales extends TLocales = {}> {
  currentLocale: ELocaleKeys
  
  locales: Locales

  setCurrentLocale(localeKey: keyof Locales): void;

  setLocales<const Locales extends TLocales, LocaleKey extends keyof Locales>(locales: Locales, defaultLocale: LocaleKey): IInternalizationServiceAdapter<Locales>;

  formatMessage(descriptor: TIntlMessageDescriptor, values?: TIntlMessageValues): string;

  formatDate(value: number | Date): string;

  getCurrentLocale(): typeof this.currentLocale
};

export const InternalizationServiceAdapterToken = 'internalizationServiceAdapter';

export type TInternalizationServiceAdapterConstructorDepsType<Locales extends TLocales> = [locales?: Locales, currentLocale?: keyof Locales];
export default IInternalizationServiceAdapter;
