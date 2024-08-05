import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import { TLocales } from '../../../domain/entities/TLocale';

export type TGetLocalesUseCaseFactoryDepsType = [props: { [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter }];

export interface IGetLocalesUseCase<Locales extends TLocales = {}> {
  (): Locales;
}
export const GetLocalesUseCaseToken = 'getLocalesUseCase';
