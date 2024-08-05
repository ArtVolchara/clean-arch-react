import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';

export type TGetCurrentLocaleKeyUseCaseFactoryDepsType = [props: { [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales> }];

export interface IGetCurrentLocaleKeyUseCase {
  (): string;
}
export const GetCurrentLocaleKeyUseCaseToken = 'getCurrentLocaleKeyUseCase';
