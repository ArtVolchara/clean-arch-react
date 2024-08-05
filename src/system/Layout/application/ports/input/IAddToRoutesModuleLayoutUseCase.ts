import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken, TMergeAppStates } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import INavigationServiceAdapter, { NavigationServiceAdapterToken } from 'system/Navigation/application/ports/output/adaptersInterfaces/INavigationServiceAdapter';
import { TRouteObject } from 'system/Navigation/domain/entities/IRouteObject';
import { TRootLayoutRoute } from '../output/presentationInterfaces/IRootLayoutRoute';
import { TRootLayoutPage } from '../output/presentationInterfaces/IRootLayoutPage';
import { TModulesLayoutRoute } from '../output/presentationInterfaces/IModulesLayoutRoute';
import IGetNavigationRoutesUseCase, { GetNavigationRoutesUseCaseToken } from 'system/Navigation/application/ports/input/IGetNavigationRoutesUseCase';
import { TViewElement } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';
import ISendNotificationUseCase, { SendNotificationUseCaseToken } from 'system/Notification/application/ports/input/ISendNotificationUseCase';
import IValidateValueUseCase, { ValidateValueUseCaseToken } from 'system/Validation/application/ports/input/IValidateValueUseCase';
import { ITranslateMessageUseCase, TranslateMessageUseCaseToken } from 'system/Internalization/application/ports/input/ITranslateMessageUseCase';
import { TModulesLayoutPage } from '../output/presentationInterfaces/IModulesLayoutPage';
import { TExcludeFromTuple, TFindInTuple } from 'system/_shared/domain/types/utils';
import ISetNavigationRoutesUseCase, { SetNavigationRoutesUseCaseToken } from 'system/Navigation/application/ports/input/ISetNavigationRoutesUseCase';

export type TAddRoutesToModuleLayoutFactoryDepsType<ViewElement extends TViewElement> = [
  // {
      // [TranslateMessageUseCaseToken]: ITranslateMessageUseCase
      // [ValidateValueUseCaseToken]: IValidateValueUseCase,
      // [SendNotificationUseCaseToken]: ISendNotificationUseCase,
      // [RenderViewElementUseCaseToken]: IRenderViewElementUseCase<ViewElement>,
    // },
]

export interface IAddRoutesToModuleLayoutRequiredState {
  [ELayerKeys.ADAPTERS]: {
    [NavigationServiceAdapterToken]: INavigationServiceAdapter<Array<TRouteObject>>
  },
  [ELayerKeys.APPLICATION]: {
    [TranslateMessageUseCaseToken]: ITranslateMessageUseCase
    [ValidateValueUseCaseToken]: IValidateValueUseCase,
    [SendNotificationUseCaseToken]: ISendNotificationUseCase,
    [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<Array<TRouteObject>>,
    [SetNavigationRoutesUseCaseToken]: ISetNavigationRoutesUseCase,
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
  },
}

export type TIsRequiredStateHasModuleLayout<RequiredState extends IAddRoutesToModuleLayoutRequiredState> = RequiredState extends { 
    [ELayerKeys.APPLICATION]: { 
      [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<infer Routes extends TRouteObject[]> 
    } 
  } 
  ? TFindInTuple<Routes,TRootLayoutRoute> extends TRootLayoutRoute<TRootLayoutPage, infer RootLayoutChildren extends TRouteObject[]> 
    ? TFindInTuple<RootLayoutChildren, TModulesLayoutRoute> extends TModulesLayoutRoute
      ? RequiredState
      : never
    : never
  : never

export default interface IAddRoutesToModuleLayoutUseCase {
  <
  const RequiredState extends IAddRoutesToModuleLayoutRequiredState,
  const AppRoutes extends RequiredState extends { [ELayerKeys.APPLICATION]: { [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<infer Routes extends Array<TRouteObject>> } } 
    ? Routes 
    : never,
  RootLayoutRoute extends TFindInTuple<AppRoutes,TRootLayoutRoute> extends infer Route extends TRootLayoutRoute ? Route : never,
  RootLayoutRoutePage extends RootLayoutRoute extends TRootLayoutRoute<infer Page> ? Page : never,
  RootLayoutRouteChildren extends RootLayoutRoute extends TRootLayoutRoute<TRootLayoutPage, infer Children> ? Children : never,
  ModuleLayoutRoute extends TFindInTuple<RootLayoutRouteChildren,TModulesLayoutRoute> extends infer Route extends TModulesLayoutRoute ? Route : never,
  ModuleLayoutRoutePage extends ModuleLayoutRoute extends TModulesLayoutRoute<infer Page> ? Page : never,
  ModuleLayoutRouteChildren extends ModuleLayoutRoute extends TModulesLayoutRoute<TModulesLayoutPage, infer Children> ? Children : never,
  Callback extends (routes: ModuleLayoutRouteChildren) => Array<TRouteObject>,
  NewModuleLayoutRouteChildren extends Callback extends (routes: ModuleLayoutRouteChildren) => infer NewChildren ? NewChildren extends Array<TRouteObject> ? NewChildren: never : never
  >(state: RequiredState, callback: Callback): TMergeAppStates<
    RequiredState,
    { 
      [ELayerKeys.ADAPTERS]: {
        [NavigationServiceAdapterToken]: INavigationServiceAdapter<[
           TRootLayoutRoute<
           RootLayoutRoutePage,
           [
            TModulesLayoutRoute<ModuleLayoutRoutePage,NewModuleLayoutRouteChildren>,
            ...TExcludeFromTuple<RootLayoutRouteChildren, TModulesLayoutRoute>
          ]>
        ]>,
      },
      [ELayerKeys.APPLICATION]: {
        [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<[
          TRootLayoutRoute<
          RootLayoutRoutePage,
          [
            TModulesLayoutRoute<ModuleLayoutRoutePage,NewModuleLayoutRouteChildren>, 
            ...TExcludeFromTuple<RootLayoutRouteChildren, TModulesLayoutRoute>
          ]>,
        ]>
    },
  }>
}

  
export const AddRoutesToModuleLayoutUseCaseToken = 'addRoutesToModuleLayoutUseCase';

