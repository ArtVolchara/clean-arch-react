import { TViewElement } from '../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';

export type TRouteObjectChildren = Array<TRouteObject>;

// export interface TIndexRouteObject {
//   element?: TViewElement,
//   index: true;
//   name: string;
//   redirect?: string;
//   children?: undefined
// }

// export interface TNonIndexRouteObject<
//     Path extends string = string,
//     ChildrenType extends TRouteObjectChildren = TRouteObjectChildren,
// > {
//   path: Path;
//   element?: TViewElement,
//   index?: false;
//   name: string;
//   redirect?: string;
//   children?: ChildrenType
// }

export type TRouteObject = {
  path?: string;
  element?: TViewElement,
  index?: false;
  name: string;
  redirect?: string;
  children?: TRouteObjectChildren
};
