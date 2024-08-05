import { IRenderViewElementUseCase } from 'system/Rendering/application/ports/input/IRenderViewElementUseCase';
import {
  TViewElement,
  TViewElementProps,
} from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import IGetNavigationServiceUseCase from '../../input/IGetNavigationServiceUseCase';

export type TRoutesRendererChildren = [];
export interface IRoutesRendererProps extends TViewElementProps {
  getNavigationServiceUseCase: IGetNavigationServiceUseCase,
  children?:TRoutesRendererChildren
}
export type TRoutesRendererDeps = [IRoutesRendererProps];

export interface TRoutesRendererFactoryProps extends TViewElementProps {
  renderViewElementUseCase: IRenderViewElementUseCase
}

export type TRoutesRendererFactoryDeps = [TRoutesRendererFactoryProps, ...TRoutesRendererDeps];

export const RoutesRendererToken = 'routesRenderer';
export type TRoutesRenderer = TViewElement;
