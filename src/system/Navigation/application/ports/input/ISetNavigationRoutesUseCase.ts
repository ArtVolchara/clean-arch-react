import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import INavigationServiceAdapter, { NavigationServiceAdapterToken } from '../output/adaptersInterfaces/INavigationServiceAdapter';
import { TRouteObject } from '../../../domain/entities/IRouteObject';
import IGetNavigationRoutesUseCase, { GetNavigationRoutesUseCaseToken } from './IGetNavigationRoutesUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken, TMergeAppStates } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';


export type TSetNavigationRoutesUseCaseFactoryDepsType = [
  props: {
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase
  }
]

export interface ISetNavigationRoutesRequiredState {
  [ELayerKeys.ADAPTERS]: {
    [NavigationServiceAdapterToken]: INavigationServiceAdapter<Array<TRouteObject>>
  },
  [ELayerKeys.APPLICATION]: {
    [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<Array<TRouteObject>>
  }
}

export default interface ISetNavigationRoutesUseCase {
  <
    const Routes extends Array<TRouteObject>, 
    const RequiredState extends ISetNavigationRoutesRequiredState
  >(routes: Routes , state: RequiredState): TMergeAppStates<
  RequiredState,
  { 
    [ELayerKeys.ADAPTERS]: {
      [NavigationServiceAdapterToken]: INavigationServiceAdapter<Routes>,
    },
    [ELayerKeys.APPLICATION]: {
      [GetNavigationRoutesUseCaseToken]: IGetNavigationRoutesUseCase<Routes>
    },
  }>
}
export const SetNavigationRoutesUseCaseToken = 'setNavigationRoutesUseCase';

