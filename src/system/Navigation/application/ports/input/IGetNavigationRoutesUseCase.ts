import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';
import { TRouteObject } from '../../../domain/entities/IRouteObject';

export default interface IGetNavigationRoutesUseCase<Routes extends Array<TRouteObject>> {
  (): Routes
}
export const GetNavigationRoutesUseCaseToken = 'getNavigationRoutesUseCase' as const;

export type TGetNavigationRoutesUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter<Array<TRouteObject>> }];
