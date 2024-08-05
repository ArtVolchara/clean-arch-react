import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { INotificationMessage } from '../../../domain/entities/INotificationMessage';
import { INotificationStore } from '../output/storesInterfaces/INotificationStore';

export default interface IGetNotificationUseCase extends IUseCase {
  (): INotificationMessage;
}

export const GetNotificationUseCaseToken = 'getNotificationUseCase';

export type TGetNotificationUseCaseFactoryDepsType = [props: { notificationStore: INotificationStore }];
