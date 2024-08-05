import { IApiResponse } from '../../../domain/entities/IApiResponse';
import { IHttpRequestData } from '../../../domain/entities/IHttpRequest';
import {
  IMakeHttpRequestUseCase,
  IMakeHttpRequestUseCaseFactoryDepsType,
} from '../../ports/input/IMakeHttpRequestUseCase';
import { serverStatusCodes } from '../../../domain/constants/serverStatusCodes';
import { isApiError } from '../../../domain/types/typeguards/errorTypeGuards';
import { ENotificationVariants } from '../../../../Notification/domain/entities/INotificationMessage';

const MakeHttpRequestUseCaseFactory = (
  ...[{
    httpRequestServiceAdapter,
    getCurrentLocaleKeyUseCase: getCurrentLocaleKey,
    sendNotificationUseCase: sendNotification,
    translateMessageUseCase: translateMessage,
  }]: IMakeHttpRequestUseCaseFactoryDepsType
): IMakeHttpRequestUseCase => (
  (requestProps: IHttpRequestData): Promise<IApiResponse> => {
    try {
      return httpRequestServiceAdapter.performHttpRequest({ ...requestProps, locale: getCurrentLocaleKey() });
    } catch (e) {
      if (isApiError(e) && e.status === serverStatusCodes.SERVICE_UNAVAILABLE) {
        console.error(e.data);
        sendNotification({ message: translateMessage({ id: 'system.httpRequest.request.failed.unavailable' }), options: { variant: ENotificationVariants.error } });
      } else {
        throw e;
      }
    }
  }
);
export default MakeHttpRequestUseCaseFactory;
