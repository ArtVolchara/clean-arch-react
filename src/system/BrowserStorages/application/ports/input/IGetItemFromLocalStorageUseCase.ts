import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { IBrowserStoragesAdapter } from '../output/adaptersInterfaces/IBrowserStoragesAdapter';

export interface IGetItemFromLocalStorageUseCase {
  (key: string): string
}
export const GetItemFromLocalStorageUseCaseToken = 'getItemFromLocalStorageUseCase';

export type TGetItemFromLocalStorageUseCaseFactoryDepsType = [{ browserStoragesAdapter: IBrowserStoragesAdapter }];
