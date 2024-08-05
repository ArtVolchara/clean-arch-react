import IGetPreviousLocationUseCase, { TGetPreviousLocationUseCaseFactoryDepsType } from '../../ports/input/IGetPreviousLocationUseCase';

const GetPreviousLocationUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]: TGetPreviousLocationUseCaseFactoryDepsType
): IGetPreviousLocationUseCase => () => navigationServiceAdapter.getPreviousPath();
export default GetPreviousLocationUseCaseFactory;
