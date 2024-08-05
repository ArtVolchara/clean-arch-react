import { INotificationMessage } from '../../../domain/entities/INotificationMessage';
import { INotificationStore } from '../output/storesInterfaces/INotificationStore';

export default interface ISendNotificationUseCase {
  (notification:INotificationMessage | null): void;
}
export const SendNotificationUseCaseToken = 'sendNotificationUseCase';

export type TSendNotificationUseCaseFactoryDepsType = [props: { notificationStore: INotificationStore }];
