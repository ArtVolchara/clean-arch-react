import { ELocaleKeys } from '../constants/appLocaleKeys';

export type TLocale = Record<string, string>;

export type TLocales = { [Key in ELocaleKeys]?: TLocale };
