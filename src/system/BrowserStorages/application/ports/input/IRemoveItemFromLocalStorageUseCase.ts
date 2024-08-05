import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { IBrowserStoragesAdapter } from '../output/adaptersInterfaces/IBrowserStoragesAdapter';

export interface IRemoveItemFromLocalStorageUseCase {
  (key: string): void
}
export const RemoveItemFromLocalStorageUseCaseToken = 'removeItemFromLocalStorageUseCase';

export type TRemoveItemFromLocalStorageUseCaseFactoryDepsType = [{ browserStoragesAdapter: IBrowserStoragesAdapter }];
