import { TRouteObjectChildren } from '../../../../../Navigation/domain/entities/IRouteObject';
import { TViewElements } from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import { IRootLayoutPageProps, TRootLayoutPage } from './IRootLayoutPage';
import { DOMAIN_PATH } from '../../../../../_shared/domain/configs';
import { TAuthenticatedRouteObject } from 'system/Authentication/domain/entities/TAuthenticatedRouteObject';
import { TAuthorizedRouteObject } from 'system/Authorization/domain/entities/TAuthorizedRouteObject';

export const RootLayoutRouteToken = 'rootLayoutRoute' as const;

export type TRootLayoutRouteFactoryDeps<
    ViewElement extends TRootLayoutPage<IRootLayoutPageProps<TViewElements>>, 
    RouteChildren extends TRouteObjectChildren
  > = [{ 
  element: ViewElement,
  children: RouteChildren
}];


export type TRootLayoutRoute<
  ViewElement extends TRootLayoutPage<IRootLayoutPageProps<TViewElements>>
  = TRootLayoutPage<IRootLayoutPageProps<TViewElements>>,
  RouteChildren extends TRouteObjectChildren 
  = TRouteObjectChildren
> = TAuthorizedRouteObject<
    TAuthenticatedRouteObject<{
      element: ViewElement,
      path: typeof DOMAIN_PATH,
      name: typeof RootLayoutRouteToken,
      children: RouteChildren
    }>
  >
