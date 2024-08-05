import { IGetLocalesUseCase, TGetLocalesUseCaseFactoryDepsType } from '../../ports/input/IGetLocalesUseCase';

const GetLocalesUseCaseFactory = <
  const Deps extends TGetLocalesUseCaseFactoryDepsType,
>(
    ...[{
      internalizationServiceAdapter,
    }]: Deps
  ):IGetLocalesUseCase<typeof internalizationServiceAdapter.locales> => () => internalizationServiceAdapter.locales
export default GetLocalesUseCaseFactory;
