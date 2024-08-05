import ISendNotificationUseCase, { SendNotificationUseCaseToken } from 'system/Notification/application/ports/input/ISendNotificationUseCase';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from 'system/Internalization/application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { AddLocalesToAppUseCaseToken, IAddLocalesToAppUseCase } from 'system/Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from 'system/Internalization/application/ports/input/IGetLocalesUseCase';
import { DEFAULT_LOCALE_KEY } from 'system/Internalization/domain/constants/appLocaleKeys';
import HttpRequestServiceAdapter from './adapters/_adapters/HttpRequestServiceAdapter/HttpRequestServiceAdapter';
import { ELayerKeys } from '../_shared/domain/constants/constants';
import { ITranslateMessageUseCase, TranslateMessageUseCaseToken } from '../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase, { ValidateValueUseCaseToken } from '../Validation/application/ports/input/IValidateValueUseCase';
import { HttpRequestServiceAdapterToken } from './application/ports/output/adaptersInterfaces/IHttpRequestServiceAdapter';
import MakeHttpRequestUseCaseFactory from './application/useCases/MakeHttpRequestUseCase/MakeHttpRequestUseCase';
import { MakeHttpRequestUseCaseToken } from './application/ports/input/IMakeHttpRequestUseCase';
import { GetCurrentLocaleKeyUseCaseToken, IGetCurrentLocaleKeyUseCase } from '../Internalization/application/ports/input/IGetCurrentLocaleKeyUseCase';
import { SetHttpRequestProxyUseCaseToken } from './application/ports/input/ISetHttpRequestProxyUseCase';
import SetHttpRequestProxyUseCaseFactory from './application/useCases/SetHttpRequestProxy/SetHttpRequestProxyUseCase';
import httpRequestLocales from './domain/translations/index';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';

interface IHttpRequestRequiredState {
  [ELayerKeys.ADAPTERS]: {
    [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
  },
  [ELayerKeys.APPLICATION]: {
    [TranslateMessageUseCaseToken]: ITranslateMessageUseCase
    [ValidateValueUseCaseToken]: IValidateValueUseCase,
    [SendNotificationUseCaseToken]: ISendNotificationUseCase,
    [GetCurrentLocaleKeyUseCaseToken]: IGetCurrentLocaleKeyUseCase,
    [AddLocalesToAppUseCaseToken]: IAddLocalesToAppUseCase,
    [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>,
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase
  },
}

export default function addHttpRequesting<const RequiredState extends IHttpRequestRequiredState>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: {
      [TranslateMessageUseCaseToken]: translateMessageUseCase,
      [SendNotificationUseCaseToken]: sendNotificationUseCase,
      [ValidateValueUseCaseToken]: validateValueUseCase,
      [GetCurrentLocaleKeyUseCaseToken]: getCurrentLocaleKeyUseCase,
      [AddLocalesToAppUseCaseToken]: addLocalesToAppUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
    },
  } = appState;
  const httpRequestServiceAdapter = new HttpRequestServiceAdapter({
    [TranslateMessageUseCaseToken]: translateMessageUseCase,
    [SendNotificationUseCaseToken]: sendNotificationUseCase,
    [ValidateValueUseCaseToken]: validateValueUseCase,
  });
  const httpRequestingAppState = {
    [ELayerKeys.ADAPTERS]: {
      [HttpRequestServiceAdapterToken]: httpRequestServiceAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [MakeHttpRequestUseCaseToken]: MakeHttpRequestUseCaseFactory({
        [HttpRequestServiceAdapterToken]: httpRequestServiceAdapter,
        [TranslateMessageUseCaseToken]: translateMessageUseCase,
        [SendNotificationUseCaseToken]: sendNotificationUseCase,
        [GetCurrentLocaleKeyUseCaseToken]: getCurrentLocaleKeyUseCase,
      }),
      [SetHttpRequestProxyUseCaseToken]: SetHttpRequestProxyUseCaseFactory({ [HttpRequestServiceAdapterToken]: httpRequestServiceAdapter }),
    },
  };
  addLocalesToAppUseCase(
    httpRequestLocales,
    DEFAULT_LOCALE_KEY,
  );
  return mergeAppStatesUseCase(
    // addLocalesToAppUseCase(
    //   httpRequestLocales,
    //   DEFAULT_LOCALE_KEY,
    //   appState,
    // ),
    appState,
    httpRequestingAppState,
  );
}
