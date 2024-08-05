import { TAuthorizedRouteObject } from '../../../../../Authorization/domain/entities/TAuthorizedRouteObject';
import { NotFoundPageToken, TNotFoundPage } from './INotFoundPage';
import { TAuthenticatedRouteObject } from '../../../../../Authentication/domain/entities/TAuthenticatedRouteObject';
import { NOT_FOUND_PATH } from '../../../../domain/configs/configs';

export const NotFoundRouteToken = 'notFoundRoute' as const;

export type TNotFoundRouteFactoryDeps<ViewElement extends TNotFoundPage> = [{ element: ViewElement }];
export type TNotFoundRoute<ViewElement extends TNotFoundPage = TNotFoundPage> = TAuthorizedRouteObject<TAuthenticatedRouteObject<{
  element: ViewElement,
  path: typeof NOT_FOUND_PATH,
  name: typeof NotFoundRouteToken,
}>>;
