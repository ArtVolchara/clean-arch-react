import {
  TViewElement,
  TViewElementFactory,
  TViewElementProps,
} from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';
import { IAdapter } from '../../../../../_shared/domain/entities/Adapters/Adapter/IAdapter';
import { TFunction } from 'system/_shared/domain/types/utils';

export type TViewRendererAdapterDeps = [];
export type TViewRendererAdapterFactoryDeps = TViewRendererAdapterDeps;

export default interface IViewRendererAdapter<ViewElement extends TViewElement<TViewElementProps>> extends IAdapter {
  createViewElement: <
   const Factory extends TViewElementFactory<Props, ViewElement>,
   const Props extends TViewElementProps,
   >(
    factory: Factory,
    props: Props,
  ) => ReturnType<Factory>

  render(container: HTMLDivElement, views: ViewElement | Array<ViewElement>): void
}

export const ViewRendererAdapterToken = 'viewRendererAdapter' as const;
