import IGetCurrentUrlUseCase, {
  TGetCurrentUrlUseCaseFactoryDepsType,
} from '../../ports/input/IGetCurrentUrlUseCase';

const GetCurrentUrlUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]: TGetCurrentUrlUseCaseFactoryDepsType
): IGetCurrentUrlUseCase => () => navigationServiceAdapter.getCurrentUrl();
export default GetCurrentUrlUseCaseFactory;
