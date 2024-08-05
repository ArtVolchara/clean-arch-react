import { makeAutoObservable } from 'mobx';
import { INotificationMessage } from '../../../domain/entities/INotificationMessage';
import {
  INotificationStore, TNotificationStoreFactoryDepsType,
} from '../../../application/ports/output/storesInterfaces/INotificationStore';

const NotificationStoreConstructor = class NotificationStore implements INotificationStore {
  notification: INotificationMessage | null;

  constructor(...deps: TNotificationStoreFactoryDepsType) {
    this.notification = null;
    makeAutoObservable(this);
  }

  setMessage = (notification:INotificationMessage | null) => {
    this.notification = notification;
  };
};

export default NotificationStoreConstructor;
