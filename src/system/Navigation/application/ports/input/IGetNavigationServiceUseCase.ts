import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import INavigationServiceAdapter, { INavigationService } from '../output/adaptersInterfaces/INavigationServiceAdapter';

export default interface IGetNavigationServiceUseCase extends IUseCase {
  (): INavigationService
}
export const GetNavigationServiceUseCaseToken = 'getNavigationServiceUseCase';

export type TGetNavigationServiceUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
