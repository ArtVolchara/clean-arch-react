import { createIntl, createIntlCache, IntlCache } from '@formatjs/intl';
import { makeAutoObservable } from 'mobx';
import { ELocaleKeys } from '../../../domain/constants/appLocaleKeys';
import IInternalizationServiceAdapter, { IInternalizationService, TInternalizationServiceAdapterConstructorDepsType } from '../../../application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { TIntlMessageDescriptor, TIntlMessageValues } from '../../../domain/entities/IInternalizationMessage';
import { TLocale, TLocales } from '../../../domain/entities/TLocale';

const IntlServiceAdapterConstructor = class IntlServiceAdapterConstructor<Locales extends TLocales = /*{}*/TLocales> implements IInternalizationServiceAdapter<Locales> {
  currentLocale: ELocaleKeys;

  locales: Locales = {} as Locales;

  protected currentTranslatorInstance?: IInternalizationService;

  protected intlCache: IntlCache;

  protected translatorsInstances: Record<keyof Locales, IInternalizationService>;

  constructor(...[locales, localeKey]: TInternalizationServiceAdapterConstructorDepsType<Locales>) {
    if (locales && Object.entries(locales).length) {
      const key = localeKey || Object.keys(locales)[0]
      this.setLocales(locales, key as keyof Locales);
    }
    this.intlCache = createIntlCache();
    makeAutoObservable(this);
  }

  protected setCurrentIntlInstance = (intl: IInternalizationService) => {
    this.currentTranslatorInstance = intl;
  };

  protected createIntlInstance = (localeKey: ELocaleKeys, messages: TLocale) => createIntl({
    locale: localeKey,
    messages,
  }, this.intlCache);

  setLocales = <const Locales extends TLocales>(locales: Locales, defaultLocale: keyof Locales) => {
    this.translatorsInstances = Object.entries(locales).reduce((instances, [localeKey, locale]: [ELocaleKeys, TLocale]) => {
      instances[localeKey] = this.createIntlInstance(localeKey, locale);
      return instances;
    }, {} as typeof this.translatorsInstances);
    (this as unknown as IInternalizationServiceAdapter<Locales>).setCurrentLocale(defaultLocale);
    return this as unknown as IInternalizationServiceAdapter<Locales>;
  };

  setCurrentLocale = (localeKey: keyof Locales) => {
    if (this.translatorsInstances[localeKey]) {
      this.currentLocale = localeKey as ELocaleKeys;
      this.currentTranslatorInstance = this.translatorsInstances[localeKey];
    } else {
      throw new Error('Translator instance for the given key was not found');
    }
  };

  getCurrentLocale = () => this.currentLocale;

  formatMessage = (descriptor: TIntlMessageDescriptor, values?: TIntlMessageValues, ...args: any) => {
    if (this.currentTranslatorInstance) {
      return this.currentTranslatorInstance.formatMessage(descriptor, values, args);
    }
    throw new Error('Translator instance was not found in the adapter');
  };

  formatDate = (value: number | Date, ...args: any) => {
    if (this.currentTranslatorInstance) {
      return this.currentTranslatorInstance.formatDate(value, args);
    }
    throw new Error('Translator instance was not found in the adapter');
  };
};

export default IntlServiceAdapterConstructor;
