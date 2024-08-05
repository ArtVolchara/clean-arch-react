import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Router } from '@remix-run/router/dist/router';
import INavigationServiceAdapter, {
  TNavigationServiceAdapterDepType
} from '../../../application/ports/output/adaptersInterfaces/INavigationServiceAdapter';
import { TRouteObject } from '../../../domain/entities/IRouteObject';
import { INavigateOptions } from '../../../application/ports/input/INavigateUseCase';

// adjust in case of other library integration (router5, react-navigation and etc.)
const NavigationServiceAdapterConstructor = class NavigationServiceAdapterConstructor<Routes extends Array<TRouteObject> = []> implements INavigationServiceAdapter<Routes> {
  navigationService: Router | null = null;

  routes!: Routes;

  currentPath: string | undefined = undefined;

  previousPath: string | undefined = undefined;

  urlParams: Record<string, string | undefined> = {};

  constructor(...[routes]: TNavigationServiceAdapterDepType<Routes>) {
    this.navigationService = null;
    if (routes) {
      this.setRoutes(routes);
    }
    makeObservable(this, {
      navigationService: observable.ref,
      setRoutes: action,
      currentPath: observable,
      previousPath: observable,
      urlParams: observable,
    });
  }

  private getSearchString = (params: URLSearchParams) => {
    const queryString = params?.toString() || '';
    return queryString ? `?${queryString}` : queryString;
  };

  setRoutes = <Routes extends Array<TRouteObject>>(routes: Routes) => {
    const initializedRoutes = this.initializeRoutes(routes);
    const navigationService =  createBrowserRouter(initializedRoutes);
    navigationService.subscribe(this.updateState);
    this.updateState(navigationService.state);
    this.navigationService = navigationService;
    return this as unknown as INavigationServiceAdapter<Routes>;
  };

  private initializeRoutes = <Routes extends Array<TRouteObject>>(routes: Routes) => routes.map((route) => {
    if (route.redirect) {
      // eslint-disable-next-line no-param-reassign
      route.element = <Navigate to={route.redirect} />;
    }
    if (route?.children && route?.children.length) {
      route.children = this.initializeRoutes(route.children);
    }
    return route;
  });

  navigate = async (to: string | number, options?: INavigateOptions) => {
    try {
      if (this.navigationService) {
        if (typeof to === 'number') {
          return await this.navigationService.navigate(to);
        } if (options?.external) {
          window.location.assign(to);
        } else {
          if (options?.search) {
            return await this.navigationService.navigate(`${to}${this.getSearchString(options?.search)}`, {
              replace: !!options?.replace,
            });
          }
        }
      } else {
        throw Error('NavigationService was not found in the adapter')
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getNavigationService = () => this.navigationService;

  protected updateState = action((state: Router['state']) => {
    this.urlParams = this.retrieveUrlParams(state);
    this.currentPath = state?.location?.pathname;
    this.previousPath = state?.location?.state?.from;
  });

  protected retrieveUrlParams = (state: Router['state']) => state.matches.reduce(
    (acc, current) => ({ ...acc, ...current.params }),
    {} as Record<string, string | undefined>,
  );

  getSearchParams = () => new URLSearchParams(this.navigationService?.state?.location?.search);

  getUrlParams = () => this.urlParams;

  getCurrentPath = () => this.currentPath;

  getCurrentUrl = () => window.location.href;

  getPreviousPath = () => this.previousPath;
};

export default NavigationServiceAdapterConstructor;
