import { TViewElement, TViewElementProps } from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';
import ISendNotificationUseCase from '../../input/ISendNotificationUseCase';
import IGetNotificationUseCase from '../../input/IGetNotificationUseCase';

export type TNotificationRendererChildren = [];

export interface INotificationRendererProps extends TViewElementProps {
  sendNotificationUseCase: ISendNotificationUseCase,
  getNotificationUseCase: IGetNotificationUseCase,
  children?: TNotificationRendererChildren
}
export type TNotificationRendererDeps = [props: INotificationRendererProps];

export const NotificationRendererToken = 'notificationRendererView';
export type TNotificationRenderer = TViewElement<TViewElementProps>;
