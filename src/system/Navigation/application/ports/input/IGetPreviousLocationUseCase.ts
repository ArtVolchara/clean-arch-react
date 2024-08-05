import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import INavigationServiceAdapter from '../output/adaptersInterfaces/INavigationServiceAdapter';

export default interface IGetPreviousLocationUseCase extends IUseCase {
  (): string
}
export const GetPreviousLocationUseCaseToken = 'getPreviousLocationUseCase';

export type TGetPreviousLocationUseCaseFactoryDepsType = [props: { navigationServiceAdapter: INavigationServiceAdapter }];
