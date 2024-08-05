import {
  IRenderViewElementUseCase, TRenderViewElementUseCaseFactoryDepsType,
} from '../../ports/input/IRenderViewElementUseCase';
import {
  TViewElementProps,
} from '../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import { FunctionComponent, ReactElement } from 'react';

const RenderViewElementUseCaseFactory = (
  ...[{ viewRendererAdapter }]: TRenderViewElementUseCaseFactoryDepsType<
      ReactElement<TViewElementProps, FunctionComponent<TViewElementProps>>
  >
) => (<
   const Factory extends FunctionComponent<Props>,
   const Props extends TViewElementProps,
   >(
    factory: Factory,
    props: Props,
) => viewRendererAdapter.createViewElement<Factory, Props>(factory, props)
) as IRenderViewElementUseCase<ReactElement<TViewElementProps, FunctionComponent<TViewElementProps>>>;
export default RenderViewElementUseCaseFactory;
