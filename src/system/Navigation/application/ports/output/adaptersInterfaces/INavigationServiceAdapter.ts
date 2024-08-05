import { IAdapter } from '../../../../../_shared/domain/entities/Adapters/Adapter/IAdapter';
import { TRouteObject } from '../../../../domain/entities/IRouteObject';
import { INavigateOptions } from '../../input/INavigateUseCase';

// adjust in case of other library integration (router5, react-navigation and etc.)
export interface INavigationService {
  navigate(to: number): Promise<void>;
  navigate(to: string, options?:INavigateOptions): Promise<void>;
}

// adjust in case of other library integration (router5, react-navigation and etc.)
export default interface INavigationServiceAdapter<InitRoutes extends Array<TRouteObject> = []> extends IAdapter {
  routes: InitRoutes;
  setRoutes<Routes extends Array<TRouteObject>>(routes: Routes): INavigationServiceAdapter<Routes>;
  urlParams: Record<string, string | undefined>;
  navigate(to: number): Promise<void>;
  navigate(to: string, options?:INavigateOptions): Promise<void>;
  getNavigationService(): INavigationService | null;
  getUrlParams(): Record<string, string | undefined>;
  getSearchParams(): URLSearchParams;
  getCurrentPath(): string | undefined;
  getCurrentUrl(): string;
  getPreviousPath(): string | undefined;
}

export const NavigationServiceAdapterToken = 'navigationServiceAdapter' as const;

export type TNavigationServiceAdapterDepType<Routes extends Array<TRouteObject> = []> = [routes: Routes];
