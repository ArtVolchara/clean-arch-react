import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';

export default interface IGetSearchParamsUseCase {
  (): URLSearchParams
}
export const GetSearchParamsUseCaseToken = 'getSearchParamsUseCase';

export type TGetSearchParamsUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
