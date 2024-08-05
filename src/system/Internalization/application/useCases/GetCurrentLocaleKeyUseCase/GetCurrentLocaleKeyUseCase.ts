import {
  IGetCurrentLocaleKeyUseCase,
  TGetCurrentLocaleKeyUseCaseFactoryDepsType,
} from '../../ports/input/IGetCurrentLocaleKeyUseCase';
import { InternalizationServiceAdapterToken } from '../../ports/output/adaptersInterfaces/IInternalizationServiceAdapter';

const GetCurrentLocaleKeyUseCaseFactory = (
  ...[{
    [InternalizationServiceAdapterToken]:internalizationServiceAdapter,
  }]: TGetCurrentLocaleKeyUseCaseFactoryDepsType
): IGetCurrentLocaleKeyUseCase => () => internalizationServiceAdapter.getCurrentLocale();

export default GetCurrentLocaleKeyUseCaseFactory;
