import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { IRenderViewElementUseCase, RenderViewElementUseCaseToken } from 'system/Rendering/application/ports/input/IRenderViewElementUseCase';
import { ITranslateMessageUseCase, TranslateMessageUseCaseToken } from 'system/Internalization/application/ports/input/ITranslateMessageUseCase';
import { AddLocalesToAppUseCaseToken, IAddLocalesToAppUseCase } from 'system/Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from 'system/Internalization/application/ports/input/IGetLocalesUseCase';
import { DEFAULT_LOCALE_KEY } from 'system/Internalization/domain/constants/appLocaleKeys';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from 'system/Internalization/application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import NavigationServiceAdapterConstructor from './adapters/_adapters/NavigatorAdapter/NavigationServiceAdapter';
import { NavigationServiceAdapterToken } from './application/ports/output/adaptersInterfaces/INavigationServiceAdapter';
import { GetUrlParamsUseCaseToken } from './application/ports/input/IGetUrlParamsUseCase';
import { GetCurrentUrlUseCaseToken } from './application/ports/input/IGetCurrentUrlUseCase';
import GetCurrentUrlUseCaseFactory from './application/useCases/GetCurrentUrlUseCase/GetCurrentUrlUseCase';
import GetUrlParamsUseCaseFactory from './application/useCases/GetUrlParamsUseCase/GetUrlParamsUseCase';
import { GetSearchParamsUseCaseToken } from './application/ports/input/IGetSearchParamsUseCase';
import GetSearchParamsUseCaseFactory from './application/useCases/GetSearchParamsUseCase/GetSearchParamsUseCase';
import { GetPreviousLocationUseCaseToken } from './application/ports/input/IGetPreviousLocationUseCase';
import GetPreviousLocationUseCaseFactory from './application/useCases/GetPreviousLocationUseCase/GetPreviousLocationUseCase';
import GetNavigationServiceUseCaseFactory from './application/useCases/GetNavigationServiceUseCase/GetNavigationServiceUseCase';
import { NavigateUseCaseToken } from './application/ports/input/INavigateUseCase';
import NavigateUseCaseFactory from './application/useCases/NavigateUseCase/NavigateUseCase';
import { NotFoundPageToken } from './application/ports/output/presentationInterfaces/INotFoundPage';
import NotFoundPage from './presentation/views/NotFoundPage/NotFoundPage';
import SetNavigationRoutesUseCaseFactory from './application/useCases/SetNavigationRoutesUseCase/SetNavigationRoutesUseCase';
import { RoutesRendererToken } from './application/ports/output/presentationInterfaces/IRoutesRenderer';
import RoutesRendererView from './presentation/views/RoutesRenderer/RoutesRendererView';
import NotFoundRouteFactory from './presentation/routes/NotFoundRoute/NotFoundRoute';
import { GetNavigationServiceUseCaseToken } from './application/ports/input/IGetNavigationServiceUseCase';
import GetNavigationRoutesUseCase from './application/useCases/GetNavigationRoutesUseCase/GetNavigationRoutesUseCase';
import ISetNavigationRoutesUseCase, { SetNavigationRoutesUseCaseToken } from './application/ports/input/ISetNavigationRoutesUseCase';
import { GetNavigationRoutesUseCaseToken } from './application/ports/input/IGetNavigationRoutesUseCase';
import navigationLocales from './domain/translations/index';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import { ReactElement } from 'react';
import { TViewElementProps } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';

interface INavigationRequiredState {
  [ELayerKeys.ADAPTERS]: {
    [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
  },
  [ELayerKeys.APPLICATION]: {
    [RenderViewElementUseCaseToken]: IRenderViewElementUseCase<ReactElement<TViewElementProps>>,
    [TranslateMessageUseCaseToken]: ITranslateMessageUseCase,
    [AddLocalesToAppUseCaseToken]: IAddLocalesToAppUseCase,
    [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
  },
}

export default function addNavigation<
    const RequiredState extends INavigationRequiredState
  >(appState: RequiredState) {
  const {
    [ELayerKeys.ADAPTERS]: {
      [InternalizationServiceAdapterToken]: internalizationServiceAdapter
    },
    [ELayerKeys.APPLICATION]: {
      [RenderViewElementUseCaseToken]: renderViewElementUseCase,
      [TranslateMessageUseCaseToken]: translateMessageUseCase,
      [AddLocalesToAppUseCaseToken]: addLocalesUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
    },
  } = appState;
  const navigationServiceAdapter = new NavigationServiceAdapterConstructor([] as const);
  const navigateUseCase = NavigateUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter });
  const getPreviousLocationUseCase = GetPreviousLocationUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter });
  const getNavigationServiceUseCase = GetNavigationServiceUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter });
  const setNavigationRoutesUseCase = SetNavigationRoutesUseCaseFactory({ [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase });

  const notFoundPage = renderViewElementUseCase(
    NotFoundPage,
    {
      [TranslateMessageUseCaseToken]: translateMessageUseCase,
      [NavigateUseCaseToken]: navigateUseCase,
      [GetPreviousLocationUseCaseToken]: getPreviousLocationUseCase,
      children: [] as const,
    },
  );
  const notFoundRoute = NotFoundRouteFactory({ element: notFoundPage });

  const navigationAppState = {
    [ELayerKeys.ADAPTERS]: {
      [NavigationServiceAdapterToken]: navigationServiceAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [GetCurrentUrlUseCaseToken]: GetCurrentUrlUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter }),
      [GetUrlParamsUseCaseToken]: GetUrlParamsUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter }),
      [GetSearchParamsUseCaseToken]: GetSearchParamsUseCaseFactory({ [NavigationServiceAdapterToken]: navigationServiceAdapter }),
      [GetPreviousLocationUseCaseToken]: getPreviousLocationUseCase,
      [GetNavigationServiceUseCaseToken]: getNavigationServiceUseCase,
      [NavigateUseCaseToken]: navigateUseCase,
      [SetNavigationRoutesUseCaseToken]: setNavigationRoutesUseCase,
      [GetNavigationRoutesUseCaseToken]: GetNavigationRoutesUseCase({ [NavigationServiceAdapterToken]: navigationServiceAdapter }),
    },
    [ELayerKeys.PRESENTATION]: {
      [NotFoundPageToken]: notFoundPage,
      [RoutesRendererToken]: renderViewElementUseCase(RoutesRendererView, { [GetNavigationServiceUseCaseToken]: getNavigationServiceUseCase }),
    },
  };
  
  addLocalesUseCase(
    navigationLocales,
    DEFAULT_LOCALE_KEY,
   );
  return mergeAppStatesUseCase(
  //   // addLocalesUseCase(
  //   //   navigationLocales,
  //   //   DEFAULT_LOCALE_KEY,
  //   //   appState,
  //   // ),
      appState,
      setNavigationRoutesUseCase([notFoundRoute] as const, navigationAppState)
    )
}
