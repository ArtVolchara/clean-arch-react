import IDependencyStorageAdapter from '../../../../DependencyStorage/application/ports/output/adaptersInterfaces/IDependencyStorageAdapter';
import IInitializeApplicationUseCase from '../../ports/input/IInitializeApplicationUseCase';
import {
  ISetHttpRequestProxyUseCase,
  SetHttpRequestProxyUseCaseToken,
} from '../../../../HttpRequest/application/ports/input/ISetHttpRequestProxyUseCase';
import {
  ISetLocalesUseCase,
  SetLocalesUseCaseToken,
} from '../../../../Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { DEFAULT_LOCALE_KEY } from '../../../../Internalization/domain/constants/appLocaleKeys';
import { TPresentationLayerElement } from '../../../../_shared/domain/entities';
import { TLocales } from '../../../../Internalization/domain/entities/TLocale';
import TSudirProtectedRequestProxifierUseCase, { SudirProtectedRequestProxifierUseCaseToken } from '../../../../Authentication/application/ports/input/TSudirProtectedRequestProxifierUseCase';

const initializeApplicationUseCase: IInitializeApplicationUseCase = <
    Views extends Array<TPresentationLayerElement>,
    Translation extends TLocales,
    >(
    views: Views,
    translation: Translation,
    dependencyStorageAdapter: IDependencyStorageAdapter,
  ) => {
  // const setHttpRequestStrategy = dependencyStorageAdapter.get<ISetHttpRequestProxyUseCase>(SetHttpRequestProxyUseCaseToken);
  // const protectedRequestStrategy = dependencyStorageAdapter.get<TSudirProtectedRequestProxifierUseCase>(SudirProtectedRequestProxifierUseCaseToken);
  const initializeIntlService = dependencyStorageAdapter.get<ISetLocalesUseCase>(SetLocalesUseCaseToken);
  // setHttpRequestStrategy(protectedRequestStrategy);
  initializeIntlService(translation, DEFAULT_LOCALE_KEY);
};

export default initializeApplicationUseCase;
