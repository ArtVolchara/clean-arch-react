import IInternalizationServiceAdapter from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { ELocaleKeys } from '../../../domain/constants/appLocaleKeys';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';

export type TSwitchLocaleUseCaseFactoryDepsType = [props: { internalizationServiceAdapter: IInternalizationServiceAdapter<TLocales> }];

export interface ISwitchLocaleUseCase {
  (locale: ELocaleKeys): void;
}
export const SwitchLocaleUseCaseToken = 'switchLocaleUseCase';
