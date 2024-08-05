import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';

export default interface IGetUrlParamsUseCase {
  (): Record<string, string | undefined>
}
export const GetUrlParamsUseCaseToken = 'getUrlParamsUseCase';

export type TGetUrlParamsUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
