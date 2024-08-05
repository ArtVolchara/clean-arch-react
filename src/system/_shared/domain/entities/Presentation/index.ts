import { TViewElement, TViewElementDepsType } from './ViewElement/TViewElement';
import { TRouteObject, TRouteObjectDepsType } from '../../../../Navigation/domain/entities/IRouteObject';

export type TPresentationLayerElement = TViewElement | TRouteObject;
export type TPresentationLayerElementDeps = TViewElementDepsType | TRouteObjectDepsType;
