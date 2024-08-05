import { IStore } from '../../../../../_shared/domain/entities/Adapters/Store/IStore';
import { INotificationMessage } from '../../../../domain/entities/INotificationMessage';

export interface INotificationStore extends IStore {
  notification: INotificationMessage | null
  setMessage(notification:INotificationMessage | null): void;
}
export const NotificationStoreToken = 'notificationStore';

export type TNotificationStoreFactoryDepsType = [];
