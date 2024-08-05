import IInternalizationServiceAdapter from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';

export type TFormatDateUseCaseFactoryDepsType = [props: { internalizationServiceAdapter: IInternalizationServiceAdapter<TLocales> }];

export interface IFormatDateUseCase {
  (value: number | Date): string;
}
export const FormatDateUseCaseToken = 'formatDateUseCase';
