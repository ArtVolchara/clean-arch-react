import IHttpRequestProxyUseCase from '../../ports/input/IHttpRequestProxyUseCase';
import {
  ISetHttpRequestProxyUseCase,
  ISetHttpRequestProxyUseCaseFactoryDepsType,
} from '../../ports/input/ISetHttpRequestProxyUseCase';

const SetHttpRequestProxyUseCaseFactory = (
  ...[{
    httpRequestServiceAdapter,
  }]: ISetHttpRequestProxyUseCaseFactoryDepsType
): ISetHttpRequestProxyUseCase => (strategy:IHttpRequestProxyUseCase) => httpRequestServiceAdapter.use(strategy);
export default SetHttpRequestProxyUseCaseFactory;
