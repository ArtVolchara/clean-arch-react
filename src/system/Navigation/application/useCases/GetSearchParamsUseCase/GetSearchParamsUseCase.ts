import IGetSearchParamsUseCase, { TGetSearchParamsUseCaseFactoryDepsType } from '../../ports/input/IGetSearchParamsUseCase';

const GetSearchParamsUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]:TGetSearchParamsUseCaseFactoryDepsType
): IGetSearchParamsUseCase => () => navigationServiceAdapter.getSearchParams();
export default GetSearchParamsUseCaseFactory;
