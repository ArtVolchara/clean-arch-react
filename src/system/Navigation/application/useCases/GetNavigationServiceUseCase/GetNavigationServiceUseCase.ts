import { INavigationService } from '../../ports/output/adaptersInterfaces/INavigationServiceAdapter';
import IGetNavigationServiceUseCase, { TGetNavigationServiceUseCaseFactoryDepsType } from '../../ports/input/IGetNavigationServiceUseCase';

const GetNavigationServiceUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]: TGetNavigationServiceUseCaseFactoryDepsType
): IGetNavigationServiceUseCase => (): INavigationService => navigationServiceAdapter.getNavigationService();
export default GetNavigationServiceUseCaseFactory;
