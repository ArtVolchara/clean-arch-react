import {
  IRemoveItemFromLocalStorageUseCase,
  TRemoveItemFromLocalStorageUseCaseFactoryDepsType,
} from '../../ports/input/IRemoveItemFromLocalStorageUseCase';

const RemoveItemFromLocalStorageUseCaseFactory = (
  ...[{ browserStoragesAdapter }]: TRemoveItemFromLocalStorageUseCaseFactoryDepsType
): IRemoveItemFromLocalStorageUseCase => (key: string) => browserStoragesAdapter.removeItemFromLocalStorage(key);
export default RemoveItemFromLocalStorageUseCaseFactory;
