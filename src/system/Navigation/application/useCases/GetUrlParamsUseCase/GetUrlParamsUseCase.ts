import IGetUrlParamsUseCase, { TGetUrlParamsUseCaseFactoryDepsType } from '../../ports/input/IGetUrlParamsUseCase';

const GetUrlParamsUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]:TGetUrlParamsUseCaseFactoryDepsType
): IGetUrlParamsUseCase => () => navigationServiceAdapter.getUrlParams();
export default GetUrlParamsUseCaseFactory;
