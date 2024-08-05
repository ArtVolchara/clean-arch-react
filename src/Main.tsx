import 'reflect-metadata';
import { ThemeProvider } from '@mui/material';
import './Main.css';
import ISetRoutesUseCase, { InitializeNavigationServiceUseCaseToken } from './system/Navigation/application/ports/input/IInitializeNavigationServiceUseCase';
import IGetAuthorizedRoutesUseCase, { GetAuthorizedRoutesUseCaseToken } from './system/Authorization/application/ports/input/IGetAuthorizedRoutesUseCase';
import IGetAuthenticatedRoutesUseCase, { GetAuthenticatedRoutesUseCaseToken } from './system/Authentication/application/ports/input/IGetAuthenticatedRoutesUseCase';
import { RoutesRendererToken, TRoutesRenderer } from './system/Navigation/application/ports/output/presentationInterfaces/IRoutesRenderer';
import DependencyStorageAdapterConstructor from './system/DependencyStorage/adapters/_adapters/DependencyStorageAdapter';
import theme from './system/_shared/presentation/_shared/styles/Theme';
import { IRenderViewElementUseCase, RenderViewElementUseCaseToken } from './system/_shared/application/ports/input/IRenderViewElementUseCase';
import composeApplicationUseCase from './system/CompositionRoot/application/useCases/ComposeApplicationUseCase/ComposeApplicationUseCase';
import { TAuthorizedRouteObject } from './system/Authorization/domain/entities/TAuthorizedRouteObject';

const dependencyStorageAdapter = new DependencyStorageAdapterConstructor();
const composedRoutes = composeApplicationUseCase(appConfiguration, dependencyStorageAdapter);
const getAuthorizedRoutes = dependencyStorageAdapter.get<IGetAuthorizedRoutesUseCase>(GetAuthorizedRoutesUseCaseToken);
const getAuthenticatedRoutes = dependencyStorageAdapter.get<IGetAuthenticatedRoutesUseCase>(GetAuthenticatedRoutesUseCaseToken);
const authorizedRoutes = getAuthorizedRoutes(composedRoutes);
// const authenticatedRoutes = getAuthenticatedRoutes(authorizedRoutes as unknown as Array<TAuthenticatedRouteObject>);
dependencyStorageAdapter.get<ISetRoutesUseCase>(InitializeNavigationServiceUseCaseToken)(authorizedRoutes);
const routesRenderer = dependencyStorageAdapter.get<TRoutesRenderer>(RoutesRendererToken);
const renderViewElement = dependencyStorageAdapter.get<IRenderViewElementUseCase>(RenderViewElementUseCaseToken);
const app = renderViewElement(ThemeProvider, { theme, key: 'ThemeProvider', children: routesRenderer });

export default app;
