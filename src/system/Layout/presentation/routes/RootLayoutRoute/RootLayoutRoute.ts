import { Outlet } from 'react-router-dom';
import { TRouteObjectChildren } from '../../../../Navigation/domain/entities/IRouteObject';
import { SYSTEM_PERMISSION } from '../../../../Authorization/domain/configs/roles';
import { RootLayoutRouteToken, TRootLayoutRoute, TRootLayoutRouteFactoryDeps } from '../../../application/ports/output/presentationInterfaces/IRootLayoutRoute';
import { DOMAIN_PATH } from '../../../../_shared/domain/configs';
import { IRootLayoutPageProps, TRootLayoutPage } from 'system/Layout/application/ports/output/presentationInterfaces/IRootLayoutPage';
import { TViewElements } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';

const RootLayoutRouteFactory = <
  const ViewElement extends TRootLayoutPage<IRootLayoutPageProps<[...TViewElements, ReturnType<typeof Outlet>]>>, 
  const Children extends TRouteObjectChildren
  >(...[{ element, children}]: TRootLayoutRouteFactoryDeps<ViewElement,Children>
  ): TRootLayoutRoute<ViewElement, Children> => {
  return {
    path: DOMAIN_PATH,
    name: RootLayoutRouteToken,
    loginRequired: false,
    permissions: [SYSTEM_PERMISSION],
    element: element,
    children: children,
  };
};

export default RootLayoutRouteFactory;
