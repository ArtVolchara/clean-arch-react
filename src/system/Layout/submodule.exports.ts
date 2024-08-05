import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { IRenderViewElementUseCase, RenderViewElementUseCaseToken } from 'system/Rendering/application/ports/input/IRenderViewElementUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import IGetNavigationRoutesUseCase, { GetNavigationRoutesUseCaseToken } from 'system/Navigation/application/ports/input/IGetNavigationRoutesUseCase';
import { TRouteObject } from 'system/Navigation/domain/entities/IRouteObject';
import ISetNavigationRoutesUseCase, { SetNavigationRoutesUseCaseToken } from 'system/Navigation/application/ports/input/ISetNavigationRoutesUseCase';
import RootLayoutPage from '../Layout/presentation/views/RootLayoutPage/RootLayoutPage';
import ModulesLayoutPage from '../Layout/presentation/views/ModulesLayoutPage/ModulesLayoutPage';
import RootLayoutRouteFactory from '../Layout/presentation/routes/RootLayoutRoute/RootLayoutRoute';
import INavigationServiceAdapter, { NavigationServiceAdapterToken } from 'system/Navigation/application/ports/output/adaptersInterfaces/INavigationServiceAdapter';
import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { ITranslateMessageUseCase, TranslateMessageUseCaseToken } from 'system/Internalization/application/ports/input/ITranslateMessageUseCase';
import ModulesLayoutRouteFactory from './presentation/routes/ModulesLayoutRoute/ModulesLayoutRoute';
import { NotificationRendererToken, TNotificationRenderer } from 'system/Notification/application/ports/output/presentationInterfaces/INotificationRenderer';
import AddRoutesToModuleLayoutUseCaseFactory from './application/useCases/AddRoutesToModuleLayoutUseCase';
import { AddRoutesToModuleLayoutUseCaseToken } from './application/ports/input/IAddToRoutesModuleLayoutUseCase';

interface ILayoutsRequiredState {
      [ELayerKeys.ADAPTERS]: {
        [NavigationServiceAdapterToken]: INavigationServiceAdapter<Array<TRouteObject>>
      },
      [ELayerKeys.APPLICATION]: {
        [RenderViewElementUseCaseToken]: IRenderViewElementUseCase<ReactElement>,
        [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
        [TranslateMessageUseCaseToken]: ITranslateMessageUseCase,
        [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<Array<TRouteObject>>
        [SetNavigationRoutesUseCaseToken]: ISetNavigationRoutesUseCase,
      },
      [ELayerKeys.PRESENTATION]: {
        [NotificationRendererToken]: TNotificationRenderer
      }
}
 
export default function addLayouts<
    const RequiredState extends ILayoutsRequiredState,
    AppRoutes extends RequiredState extends {
      [ELayerKeys.APPLICATION]: {
        [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<infer Routes>
      }
    } ? Routes  : never,
    NotificationRenderer extends RequiredState extends {
      [ELayerKeys.PRESENTATION]: {
        [NotificationRendererToken]: infer NotificationRendererView
      }
    } ? NotificationRendererView : never,
    >(appState: RequiredState) {
  const {
    [ELayerKeys.ADAPTERS]: { 
      [NavigationServiceAdapterToken]: navigationServiceAdapter 
    }, 
    [ELayerKeys.APPLICATION]: {
      [RenderViewElementUseCaseToken]: renderViewElementUseCase,
      [TranslateMessageUseCaseToken]: translateMessageUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
      [GetNavigationRoutesUseCaseToken]: getNavigationRoutesUseCase,
      [SetNavigationRoutesUseCaseToken]: setNavigationRoutesUseCase,
    },
    [ELayerKeys.PRESENTATION]: {
      [NotificationRendererToken]: notificationRenderer
    }
  } = appState;

  const rootLayoutProps = { 
    children: [renderViewElementUseCase(Outlet, {})] as const
  }
  const moduleLayoutProps = { 
    translateMessageUseCase,
    children: [renderViewElementUseCase(Outlet, {}), notificationRenderer as NotificationRenderer] as const
  }

  const moduleLayoutPage = renderViewElementUseCase(
    ModulesLayoutPage<[typeof moduleLayoutProps]>,
    moduleLayoutProps,
  );

  const rootLayoutPage = renderViewElementUseCase(
    RootLayoutPage<[typeof rootLayoutProps]>,
    rootLayoutProps,
  );

  const moduleLayoutRoute = ModulesLayoutRouteFactory({element: moduleLayoutPage, children: [] as const});
  const rootLayoutRoute = RootLayoutRouteFactory({element: rootLayoutPage, children: [ moduleLayoutRoute, ...(getNavigationRoutesUseCase() as AppRoutes)]});

  const layoutsAppState = {
    [ELayerKeys.APPLICATION]: { 
      [AddRoutesToModuleLayoutUseCaseToken]: AddRoutesToModuleLayoutUseCaseFactory()
    },
  };
  
  return setNavigationRoutesUseCase([rootLayoutRoute] as const, mergeAppStatesUseCase(appState, layoutsAppState));
}
