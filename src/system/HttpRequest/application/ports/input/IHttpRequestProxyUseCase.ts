import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { TPerformHttpRequest } from '../output/adaptersInterfaces/IHttpRequestServiceAdapter';

export type THttpRequestProxyUseCaseFactoryDepsType = [];

export default interface IHttpRequestProxyUseCase<ExtraDeps extends Array<any> = []> extends IUseCase {
  (performRequest: TPerformHttpRequest, ...extra: ExtraDeps): TPerformHttpRequest
}
