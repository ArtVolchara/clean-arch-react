import { IApiResponse } from '../../../domain/entities/IApiResponse';
import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { IHttpRequestData } from '../../../domain/entities/IHttpRequest';
import IHttpRequestServiceAdapter from '../output/adaptersInterfaces/IHttpRequestServiceAdapter';
import { IGetCurrentLocaleKeyUseCase } from '../../../../Internalization/application/ports/input/IGetCurrentLocaleKeyUseCase';
import ISendNotificationUseCase from '../../../../Notification/application/ports/input/ISendNotificationUseCase';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export type IMakeHttpRequestUseCaseFactoryDepsType = [
    props: {
      httpRequestServiceAdapter: IHttpRequestServiceAdapter,
      getCurrentLocaleKeyUseCase: IGetCurrentLocaleKeyUseCase,
      sendNotificationUseCase: ISendNotificationUseCase,
      translateMessageUseCase: ITranslateMessageUseCase,
    },
];

export interface IMakeHttpRequestUseCase {
  (props: IHttpRequestData): Promise<IApiResponse>;
}
export const MakeHttpRequestUseCaseToken = 'makeHttpRequestUseCase';
