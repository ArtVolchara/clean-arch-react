import {
  IFormatDateUseCase,
  TFormatDateUseCaseFactoryDepsType,
} from '../../ports/input/IFormatDateUseCase';

const FormatDateUseCaseFactory = (
  ...[{
    internalizationServiceAdapter,
  }]: TFormatDateUseCaseFactoryDepsType
): IFormatDateUseCase => (value: number | Date) => internalizationServiceAdapter.formatDate(value);

export default FormatDateUseCaseFactory;
