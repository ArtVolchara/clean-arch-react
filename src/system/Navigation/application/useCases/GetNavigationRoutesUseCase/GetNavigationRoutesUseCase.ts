import IGetNavigationRoutesUseCase, { TGetNavigationRoutesUseCaseFactoryDepsType } from "../../ports/input/IGetNavigationRoutesUseCase";

const GetNavigationRoutesUseCaseFactory = <Deps extends TGetNavigationRoutesUseCaseFactoryDepsType = TGetNavigationRoutesUseCaseFactoryDepsType>(
  ...[{ navigationServiceAdapter }]: Deps
): IGetNavigationRoutesUseCase<typeof navigationServiceAdapter['routes']> => () => navigationServiceAdapter.routes;
export default GetNavigationRoutesUseCaseFactory;
