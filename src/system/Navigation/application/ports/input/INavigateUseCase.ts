import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';

export interface INavigateOptions {
  external?: boolean;
  search?: URLSearchParams;
  replace?: boolean;
  from?: string;
}

export default interface INavigateUseCase {
  (to: number): Promise<void>;
  (to: Array<string>, options?:INavigateOptions): Promise<void>;
}
export const NavigateUseCaseToken = 'navigateUseCase';

export type TNavigateUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
