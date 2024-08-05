import { IAdapter } from '../../../../../_shared/domain/entities/Adapters/Adapter/IAdapter';
import { ITranslateMessageUseCase } from '../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from '../../../../../Validation/application/ports/input/IValidateValueUseCase';
import { IHttpRequestData } from '../../../../domain/entities/IHttpRequest';
import IHttpRequestProxyUseCase from '../../input/IHttpRequestProxyUseCase';
import { IApiResponse } from '../../../../domain/entities/IApiResponse';
import ISendNotificationUseCase from '../../../../../Notification/application/ports/input/ISendNotificationUseCase';

export type THttpRequestServiceAdapterFactoryDeps = [props: {
  translateMessageUseCase: ITranslateMessageUseCase,
  validateValueUseCase: IValidateValueUseCase,
  sendNotificationUseCase: ISendNotificationUseCase,
}];

export type TPerformHttpRequest = (requestConfig:IHttpRequestData) => Promise<IApiResponse>;

export default interface IHttpRequestServiceAdapter extends IAdapter {
  proxy: IHttpRequestProxyUseCase;
  use(proxy:IHttpRequestProxyUseCase): void
  performHttpRequest: TPerformHttpRequest;
}
export const HttpRequestServiceAdapterToken = 'httpRequestServiceAdapter';
