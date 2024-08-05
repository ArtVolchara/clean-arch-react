import { INotificationMessage } from '../../../domain/entities/INotificationMessage';
import ISendNotificationUseCase, { TSendNotificationUseCaseFactoryDepsType } from '../../ports/input/ISendNotificationUseCase';

const SendNotificationUseCaseFactory = (
  ...[{
    notificationStore,
  }]: TSendNotificationUseCaseFactoryDepsType
): ISendNotificationUseCase => (notification:INotificationMessage | null) => {
  notificationStore.setMessage(notification);
};

export default SendNotificationUseCaseFactory;
