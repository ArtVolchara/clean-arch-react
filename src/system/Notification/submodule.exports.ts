import NotificationStore from './adapters/_stores/NotificationStore/NotificationStore';
import { ELayerKeys } from '../_shared/domain/constants/constants';
import { NotificationStoreToken } from './application/ports/output/storesInterfaces/INotificationStore';
import GetNotificationUseCaseFactory from './application/useCases/GetNotificationUseCase/GetNotificationUseCase';
import { GetNotificationUseCaseToken } from './application/ports/input/IGetNotificationUseCase';
import { SendNotificationUseCaseToken } from './application/ports/input/ISendNotificationUseCase';
import SendNotificationUseCaseFactory from './application/useCases/SendNotificationUseCase/SendNotificationUseCase';
import NotificationRendererView from './presentation/views/NotificationRenderer/NotificationRendererView';
import { IRenderViewElementUseCase, RenderViewElementUseCaseToken } from '../Rendering/application/ports/input/IRenderViewElementUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import { ReactElement } from 'react';
import { TViewElementProps } from 'system/_shared/domain/entities/Presentation/ViewElement/TViewElement';
import { NotificationRendererToken } from './application/ports/output/presentationInterfaces/INotificationRenderer';

type INotificationRequiredState = {
  [ELayerKeys.APPLICATION]: {
    [RenderViewElementUseCaseToken]: IRenderViewElementUseCase<ReactElement<TViewElementProps>>,
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
  }
};

export default function addNotification<const RequiredState extends INotificationRequiredState>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: { 
      [RenderViewElementUseCaseToken]: renderViewElementUseCase,
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase,
    },
  } = appState;
  const notificationStore = new NotificationStore();
  const sendNotificationUseCase = SendNotificationUseCaseFactory({ notificationStore });
  const getNotificationUseCase = GetNotificationUseCaseFactory({ notificationStore });

  const notificationRendererView = renderViewElementUseCase(
    NotificationRendererView, { 
    [SendNotificationUseCaseToken]: sendNotificationUseCase, 
    [GetNotificationUseCaseToken]: getNotificationUseCase 
  });

  const notificationAppState = {
    [ELayerKeys.ADAPTERS]: {
      [NotificationStoreToken]: notificationStore,
    },
    [ELayerKeys.APPLICATION]: {
      [GetNotificationUseCaseToken]: getNotificationUseCase,
      [SendNotificationUseCaseToken]: sendNotificationUseCase,
    },
    [ELayerKeys.PRESENTATION]: {
      [NotificationRendererToken]: notificationRendererView
    }
  };
  return mergeAppStatesUseCase(appState, notificationAppState);
}
