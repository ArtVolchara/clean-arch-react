import IInternalizationServiceAdapter from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import {
  TIntlMessageDescriptor,
  TIntlMessageValues,
} from '../../../domain/entities/IInternalizationMessage';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';

export type TTranslateMessageUseCaseFactoryDepsType = [props: { internalizationServiceAdapter: IInternalizationServiceAdapter<TLocales> }];

export interface ITranslateMessageUseCase {
  (descriptor: TIntlMessageDescriptor, values?: TIntlMessageValues): string;
}
export const TranslateMessageUseCaseToken = 'translateMessageUseCase';
