import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { IBrowserStoragesAdapter } from '../output/adaptersInterfaces/IBrowserStoragesAdapter';

export interface ISaveItemToLocalStorageUseCase {
  (key: string, value: string): void
}
export const SaveItemToLocalStorageUseCaseToken = 'saveItemToLocalStorageUseCase';

export type TSaveItemToLocalStorageUseCaseFactoryDepsType = [{ browserStoragesAdapter: IBrowserStoragesAdapter }];
