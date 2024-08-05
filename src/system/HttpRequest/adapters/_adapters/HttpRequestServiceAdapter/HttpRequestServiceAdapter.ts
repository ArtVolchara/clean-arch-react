import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { action, makeObservable } from 'mobx';
import IHttpRequestServiceAdapter, { THttpRequestServiceAdapterFactoryDeps } from '../../../application/ports/output/adaptersInterfaces/IHttpRequestServiceAdapter';
import ApiResponseDTO from '../../dtos/ApiResponseDTO';
import ApiErrorDTO from '../../dtos/ApiErrorDTO';
import { ITranslateMessageUseCase } from '../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import IValidateValueUseCase from '../../../../Validation/application/ports/input/IValidateValueUseCase';
import { IHttpRequestData } from '../../../domain/entities/IHttpRequest';
import IHttpRequestProxyUseCase from '../../../application/ports/input/IHttpRequestProxyUseCase';
import { BACKEND_URL } from '../../../../_shared/domain/configs';
import ISendNotificationUseCase from '../../../../Notification/application/ports/input/ISendNotificationUseCase';

const HttpRequestServiceAdapterConstructor = class HttpRequestServiceAdapter implements IHttpRequestServiceAdapter {
  proxy: IHttpRequestProxyUseCase;

  private axiosInstance: AxiosInstance = axios.create();

  private translateMessageUseCase: ITranslateMessageUseCase;

  private validateValueUseCase: IValidateValueUseCase;

  private sendNotificationUseCase: ISendNotificationUseCase;

  constructor(
    ...[{
      translateMessageUseCase,
      validateValueUseCase,
      sendNotificationUseCase,
    }]: THttpRequestServiceAdapterFactoryDeps
  ) {
    this.translateMessageUseCase = translateMessageUseCase;
    this.validateValueUseCase = validateValueUseCase;
    this.sendNotificationUseCase = sendNotificationUseCase;

    makeObservable(this, {
      use: action,
      performHttpRequest: action,
    });
  }

  use = (proxy:IHttpRequestProxyUseCase) => {
    this.proxy = proxy;
  };

  private doRequest = (requestConfig:IHttpRequestData) => {
    const {
      url, method, params, headers, data, locale, contentType, external = false,
    } = requestConfig;
    const { translateMessageUseCase: translateMessage, validateValueUseCase: validateValue } = this;
    const filteredParams = params ? Object.fromEntries(Object.entries(params).filter(([, value]) => value)) : params;
    const config:AxiosRequestConfig = {
      url: external ? url : `${BACKEND_URL}/${url}`,
      method,
      withCredentials: true,
      params: filteredParams,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType || 'application/json',
      },
      timeout: 30000,
      data,
    };
    if (locale) {
      config.headers['Accept-Language'] = locale;
    }
    config.headers = { ...config.headers, ...headers };
    return this.axiosInstance.request(config)
      .then((response) => new ApiResponseDTO(response, translateMessage, validateValue))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xх
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw new ApiErrorDTO(error.response, translateMessage, validateValue, false);
          } else if (error.request) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw new ApiErrorDTO(error.request, translateMessage, validateValue, false);
          }
        }
        throw error;
      });
  };

  performHttpRequest = (requestData: IHttpRequestData) => {
    try {
      return this.proxy
        ? this.proxy(this.doRequest)(requestData)
        : this.doRequest(requestData);
    } catch (e) {
      throw e;
    }
  };
};

export default HttpRequestServiceAdapterConstructor;
