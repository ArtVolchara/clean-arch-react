import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';

export default interface IGetCurrentUrlUseCase extends IUseCase {
  (): string
}
export const GetCurrentUrlUseCaseToken = 'getCurrentUrlUseCase';

export type TGetCurrentUrlUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
