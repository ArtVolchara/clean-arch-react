import { ISwitchLocaleUseCase, TSwitchLocaleUseCaseFactoryDepsType } from '../../ports/input/ISwitchLocaleUseCase';
import { ELocaleKeys } from '../../../domain/constants/appLocaleKeys';

const SwitchLocaleUseCaseFactory = (
  ...[{
    internalizationServiceAdapter,
  }]: TSwitchLocaleUseCaseFactoryDepsType
): ISwitchLocaleUseCase => (locale: ELocaleKeys) => internalizationServiceAdapter.setCurrentLocale(locale);
export default SwitchLocaleUseCaseFactory;
