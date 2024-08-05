import { Outlet } from 'react-router-dom';
import { ModulesLayoutRouteToken, TModulesLayoutRoute, TModulesLayoutRouteFactoryDeps } from '../../../application/ports/output/presentationInterfaces/IModulesLayoutRoute';
import { TRouteObjectChildren } from '../../../../Navigation/domain/entities/IRouteObject';
import { SYSTEM_PERMISSION } from '../../../../Authorization/domain/configs/roles';
import { IModulesLayoutPageProps, TModulesLayoutPage } from 'system/Layout/application/ports/output/presentationInterfaces/IModulesLayoutPage';
import { HOME_PATH } from 'system/_shared/domain/configs/configs';
import { TViewElements } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';

const ModulesLayoutRouteFactory = <
  ViewElement extends TModulesLayoutPage<IModulesLayoutPageProps<[typeof Outlet, ...TViewElements]>>, 
  Children extends TRouteObjectChildren = []
>( ...[{ element, children}]: TModulesLayoutRouteFactoryDeps<ViewElement,Children>
  ): TModulesLayoutRoute<ViewElement, Children> => {
  return {
    path: HOME_PATH,
    name: ModulesLayoutRouteToken,
    loginRequired: true,
    permissions: [SYSTEM_PERMISSION],
    element: element,
    children: children,
  };
};

export default ModulesLayoutRouteFactory;
