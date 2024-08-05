import systemLocales from './domain/translations/index';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from 'system/Internalization/application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { ELayerKeys } from './domain/constants/constants';
import { AddLocalesToAppUseCaseToken, IAddLocalesToAppUseCase } from 'system/Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from 'system/Internalization/application/ports/input/IGetLocalesUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';
import { DEFAULT_LOCALE_KEY } from 'system/Internalization/domain/constants/appLocaleKeys';

interface ISharedRequiredState {
  [ELayerKeys.ADAPTERS]: {
    [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
  },
  [ELayerKeys.APPLICATION]: {
    [AddLocalesToAppUseCaseToken]: IAddLocalesToAppUseCase,
    [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
  },
}

export default function addShared<const RequiredState extends ISharedRequiredState>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: {
      [AddLocalesToAppUseCaseToken]: addLocalesUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
    },
  } = appState;

  return mergeAppStatesUseCase(
    addLocalesUseCase(
      systemLocales,
      DEFAULT_LOCALE_KEY,
      appState,
    ),
    appState,
  );
}
