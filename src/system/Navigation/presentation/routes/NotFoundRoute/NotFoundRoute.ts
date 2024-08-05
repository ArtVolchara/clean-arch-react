import {
  NotFoundRouteToken,
  TNotFoundRoute,
  TNotFoundRouteFactoryDeps,
} from '../../../application/ports/output/presentationInterfaces/INotFoundRoute';
import { NOT_FOUND_PATH } from '../../../domain/configs/configs';
import { SYSTEM_PERMISSION } from '../../../../Authorization/domain/configs/roles';
import {  TNotFoundPage } from 'system/Navigation/application/ports/output/presentationInterfaces/INotFoundPage';

const NotFoundRouteFactory = <ViewElement extends TNotFoundPage>(...[{ element }]:TNotFoundRouteFactoryDeps<ViewElement>): TNotFoundRoute<ViewElement> => ({
  element: element,
  name: NotFoundRouteToken,
  path: NOT_FOUND_PATH,
  loginRequired: false,
  permissions: [SYSTEM_PERMISSION],
});

export default NotFoundRouteFactory;
