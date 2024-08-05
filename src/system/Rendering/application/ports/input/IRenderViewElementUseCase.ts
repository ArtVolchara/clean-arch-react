import {  TViewElement, TViewElementFactory, TViewElementProps } from '../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import { TReturnTypeOrInstanceType } from '../../../../_shared/domain/types/utils';
import IViewRendererAdapter from '../output/adaptersInterfaces/IViewRendererAdapter';

export interface IRenderViewElementUseCase<ViewElement extends TViewElement<TViewElementProps>> {
    <
    const Factory extends TViewElementFactory<Props, ViewElement & TViewElement<Props>>,
    const Props extends TViewElementProps,
      >(
    factory: Factory,
    props: Props,
  ): ReturnType<Factory>
}
export const RenderViewElementUseCaseToken = 'renderViewElementUseCase';
export type TRenderViewElementUseCaseDepsType<ViewElement extends TViewElement<TViewElementProps>> = [{ viewRendererAdapter: IViewRendererAdapter<ViewElement> }];
export type TRenderViewElementUseCaseFactoryDepsType<ViewElement extends TViewElement<TViewElementProps>> = TRenderViewElementUseCaseDepsType<ViewElement>;
