import {
  ITranslateMessageUseCase,
  TTranslateMessageUseCaseFactoryDepsType,
} from '../../ports/input/ITranslateMessageUseCase';
import { TIntlMessageDescriptor, TIntlMessageValues } from '../../../domain/entities/IInternalizationMessage';

export const TranslateMessageUseCaseFactory = (
  ...[{
    internalizationServiceAdapter,
  }]: TTranslateMessageUseCaseFactoryDepsType
): ITranslateMessageUseCase => (descriptor: TIntlMessageDescriptor, values?: TIntlMessageValues) => internalizationServiceAdapter.formatMessage(descriptor, values);
