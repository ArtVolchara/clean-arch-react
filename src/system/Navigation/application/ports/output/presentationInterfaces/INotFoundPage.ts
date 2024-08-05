import { TViewElement, TViewElementProps } from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import IGetPreviousLocationUseCase from '../../input/IGetPreviousLocationUseCase';
import { ITranslateMessageUseCase } from '../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import INavigateUseCase from '../../input/INavigateUseCase';
import { IRenderViewElementUseCase } from 'system/Rendering/application/ports/input/IRenderViewElementUseCase';

export type TNotFoundPageChildren = [];
export interface INotFoundPageProps extends TViewElementProps {
  navigateUseCase: INavigateUseCase,
  translateMessageUseCase: ITranslateMessageUseCase,
  getPreviousLocationUseCase: IGetPreviousLocationUseCase,
  children?: TNotFoundPageChildren | Readonly<TNotFoundPageChildren>
}
export type TNotFoundPageDeps = [props: INotFoundPageProps];
export const NotFoundPageToken = 'notFoundPage' as const;

export type TNotFoundPage = TViewElement<TViewElementProps>;
