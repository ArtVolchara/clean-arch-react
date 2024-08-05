import { ReactElement } from "react";
import IAddRoutesToModuleLayoutUseCase, { IAddRoutesToModuleLayoutRequiredState, TAddRoutesToModuleLayoutFactoryDepsType, TIsRequiredStateHasModuleLayout } from "../ports/input/IAddToRoutesModuleLayoutUseCase";
import { ELayerKeys } from "system/_shared/domain/constants/constants";
import IGetNavigationRoutesUseCase, { GetNavigationRoutesUseCaseToken } from "system/Navigation/application/ports/input/IGetNavigationRoutesUseCase";
import { TRouteObject } from "system/Navigation/domain/entities/IRouteObject";
import { TExcludeFromTuple, TFindInTuple } from "system/_shared/domain/types/utils";
import { TRootLayoutRoute } from "../ports/output/presentationInterfaces/IRootLayoutRoute";
import { TRootLayoutPage } from "../ports/output/presentationInterfaces/IRootLayoutPage";
import { ModulesLayoutRouteToken, TModulesLayoutRoute } from "../ports/output/presentationInterfaces/IModulesLayoutRoute";
import { TModulesLayoutPage } from "../ports/output/presentationInterfaces/IModulesLayoutPage";
import RootLayoutRouteFactory from "system/Layout/presentation/routes/RootLayoutRoute/RootLayoutRoute";
import ModulesLayoutRouteFactory from "system/Layout/presentation/routes/ModulesLayoutRoute/ModulesLayoutRoute";
import { SetNavigationRoutesUseCaseToken } from "system/Navigation/application/ports/input/ISetNavigationRoutesUseCase";



const AddRoutesToModuleLayoutUseCaseFactory = (
    ...[
        // {
        // [TranslateMessageUseCaseToken]: translateMessageUseCase,
        // [ValidateValueUseCaseToken]: validateValueUseCase,
        // [SendNotificationUseCaseToken]: sendNotificationUseCase,
        // [RenderViewElementUseCaseToken]: renderViewElementUseCase,
    // }
]: TAddRoutesToModuleLayoutFactoryDepsType<ReactElement>
  ): IAddRoutesToModuleLayoutUseCase => (
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
  >(state: RequiredState, callback: ReturnType<Callback> extends TRouteObject ? Callback : never) => {
    const {
        [ELayerKeys.APPLICATION]: {
          [SetNavigationRoutesUseCaseToken]: setNavigationRoutesUseCase,
          [GetNavigationRoutesUseCaseToken]: getNavigationRoutesUseCase
        }
    } = state
    const [ rootLayoutRoute ] = getNavigationRoutesUseCase() as [RootLayoutRoute];
    const { element: rootLayoutRoutePage, children: rootLayoutRouteChildren, ...restRootLayoutProps} = rootLayoutRoute
    const moduleLayoutRoute = (rootLayoutRouteChildren as RootLayoutRouteChildren).find((route) => {
        return route.name === ModulesLayoutRouteToken
    }) as ModuleLayoutRoute;
    // if (moduleLayoutRoute) {
        const restRouteChildren = (rootLayoutRouteChildren as RootLayoutRouteChildren)
        .filter((child) => child.name !== ModulesLayoutRouteToken) as TExcludeFromTuple<RootLayoutRouteChildren, TModulesLayoutRoute>
        const { element: moduleLayoutRoutePage, children: moduleLayoutRouteChildren } = moduleLayoutRoute;
        const newModuleLayoutRouteChildren = callback(moduleLayoutRouteChildren as ModuleLayoutRouteChildren)
        const newModuleLayoutRoute = ModulesLayoutRouteFactory({
            ...moduleLayoutRoute,
            element: moduleLayoutRoutePage as ModuleLayoutRoutePage, 
            children: newModuleLayoutRouteChildren as NewModuleLayoutRouteChildren
        }) as TModulesLayoutRoute<ModuleLayoutRoutePage, NewModuleLayoutRouteChildren>;
        const newRootLayoutRoute = RootLayoutRouteFactory({
            ...restRootLayoutProps,
            element: rootLayoutRoutePage as RootLayoutRoutePage,
            children: [newModuleLayoutRoute, ...restRouteChildren]
         })
         return setNavigationRoutesUseCase([newRootLayoutRoute] as const, state)
    // }
    // return state
  });
  export default AddRoutesToModuleLayoutUseCaseFactory;