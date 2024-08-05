import { TAuthorizedRouteObject } from 'system/Authorization/domain/entities/TAuthorizedRouteObject';
import { TRouteObjectChildren } from '../../../../../Navigation/domain/entities/IRouteObject';
import { TModulesLayoutPage } from './IModulesLayoutPage';
import { TAuthenticatedRouteObject } from 'system/Authentication/domain/entities/TAuthenticatedRouteObject';
import { HOME_PATH } from 'system/_shared/domain/configs/configs';

export const ModulesLayoutRouteToken = 'modulesLayoutRoute' as const;

export type TModulesLayoutRouteFactoryDeps<ViewElement extends TModulesLayoutPage, RouteChildren extends TRouteObjectChildren = []> = [{ 
  element: ViewElement,
  children: RouteChildren
}];

export type TModulesLayoutRoute<ViewElement extends TModulesLayoutPage = TModulesLayoutPage, RouteChildren extends TRouteObjectChildren = TRouteObjectChildren> = TAuthorizedRouteObject<
TAuthenticatedRouteObject<{
  path: typeof HOME_PATH,
  element: ViewElement,
  name: typeof ModulesLayoutRouteToken,
  children?: RouteChildren
}>>
