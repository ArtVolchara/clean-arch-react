import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import IHttpRequestServiceAdapter from '../output/adaptersInterfaces/IHttpRequestServiceAdapter';
import IHttpRequestProxyUseCase from './IHttpRequestProxyUseCase';

export type ISetHttpRequestProxyUseCaseFactoryDepsType = [
    props:{
      httpRequestServiceAdapter: IHttpRequestServiceAdapter,
    },
];

export interface ISetHttpRequestProxyUseCase {
  (strategy:IHttpRequestProxyUseCase): void;
}
export const SetHttpRequestProxyUseCaseToken = 'setHttpRequestProxyUseCase';
