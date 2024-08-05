import { GetLocalesUseCaseToken, IGetLocalesUseCase } from 'system/Internalization/application/ports/input/IGetLocalesUseCase';
import { IAddLocalesToAppUseCase, AddLocalesToAppUseCaseToken } from 'system/Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { ITranslateMessageUseCase, TranslateMessageUseCaseToken } from 'system/Internalization/application/ports/input/ITranslateMessageUseCase';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from 'system/Internalization/application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import ValidateValueUseCaseFactory from './application/useCases/ValidateValueUseCase/ValidateValueUseCase';
import { ValidateValueUseCaseToken } from './application/ports/input/IValidateValueUseCase';
import { ValidateEntityUseCaseToken } from './application/ports/input/IValidateEntityUseCase';
import ValidateEntityUseCaseFactory from './application/useCases/ValidateEntityUseCase/ValidateEntityUseCase';
import { ValidateFormUseCaseToken } from './application/ports/input/IValidateFormUseCase';
import ValidateFormUseCaseFactory from './application/useCases/ValidateFormUseCase/ValidateFormUseCase';
import { DEFAULT_LOCALE_KEY } from 'system/Internalization/domain/constants/appLocaleKeys';
import validationLocales from './domain/translations/index';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';

type TValidationRequiredState = {
  [ELayerKeys.ADAPTERS]: {
    [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
  },
  [ELayerKeys.APPLICATION]: {
    [TranslateMessageUseCaseToken]: ITranslateMessageUseCase,
    [AddLocalesToAppUseCaseToken]: IAddLocalesToAppUseCase,
    [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>,
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase
  },
};

export default function addValidation<
  const RequiredAppState extends TValidationRequiredState,
>(
  appState: RequiredAppState,
) {
  const {
    [ELayerKeys.ADAPTERS]: {
      [InternalizationServiceAdapterToken]: internalizationServiceAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [TranslateMessageUseCaseToken]: translateMessageUseCase,
      [AddLocalesToAppUseCaseToken]: addLocalesToAppUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
    },
  } = appState;
  const validateValueUseCase = ValidateValueUseCaseFactory({ [TranslateMessageUseCaseToken]: translateMessageUseCase });
  const validationAppState = {
    [ELayerKeys.APPLICATION]: {
      [ValidateValueUseCaseToken]: validateValueUseCase,
      [ValidateEntityUseCaseToken]: ValidateEntityUseCaseFactory({
        [ValidateValueUseCaseToken]: validateValueUseCase,
        [TranslateMessageUseCaseToken]: translateMessageUseCase,
      }),
      [ValidateFormUseCaseToken]: ValidateFormUseCaseFactory({
        [ValidateValueUseCaseToken]: validateValueUseCase,
        [TranslateMessageUseCaseToken]: translateMessageUseCase,
      }),
    },
  };
  addLocalesToAppUseCase(
    validationLocales,
    DEFAULT_LOCALE_KEY,
  );
  return mergeAppStatesUseCase(
    // addLocalesToAppUseCase(
    //   validationLocales,
    //   DEFAULT_LOCALE_KEY,
    //   appState,
    // ),
    appState,
    validationAppState,
  );
}
