import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { TRouteObject } from '../../../domain/entities/IRouteObject';
import { ISetNavigationRoutesRequiredState, TSetNavigationRoutesUseCaseFactoryDepsType } from '../../ports/input/ISetNavigationRoutesUseCase';
import { NavigationServiceAdapterToken } from '../../ports/output/adaptersInterfaces/INavigationServiceAdapter';
import IGetNavigationRoutesUseCase, { GetNavigationRoutesUseCaseToken } from '../../ports/input/IGetNavigationRoutesUseCase';
import { MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';

const SetNavigationRoutesUseCaseFactory = (
  ...[{[MergeAppStatesUseCaseToken]: mergeAppStatesUseCase}]: TSetNavigationRoutesUseCaseFactoryDepsType
) => <
      const Routes extends Array<TRouteObject>,
      const RequiredState extends ISetNavigationRoutesRequiredState
      >(
         routes: Routes,
         appState: RequiredState
       ) => {
  const { 
    [ELayerKeys.ADAPTERS]: { [NavigationServiceAdapterToken]: navigationServiceAdapter }, 
    [ELayerKeys.APPLICATION]: { [GetNavigationRoutesUseCaseToken]: getNavigationRoutesUseCase } 
  } = appState;
  const updatedAdapter = navigationServiceAdapter.setRoutes<Routes>(routes);
  const setRoutesAppState = {
    [ELayerKeys.ADAPTERS]: {
      [NavigationServiceAdapterToken]: updatedAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [GetNavigationRoutesUseCaseToken]: getNavigationRoutesUseCase as IGetNavigationRoutesUseCase<Routes>,
    },
  };
  return mergeAppStatesUseCase(appState, setRoutesAppState);
};
export default SetNavigationRoutesUseCaseFactory;
 