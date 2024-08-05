import IGetNotificationUseCase, { TGetNotificationUseCaseFactoryDepsType } from '../../ports/input/IGetNotificationUseCase';

const GetNotificationUseCaseFactory = (
  ...[{
    notificationStore,
  }]: TGetNotificationUseCaseFactoryDepsType
): IGetNotificationUseCase => () => notificationStore.notification;
export default GetNotificationUseCaseFactory;
