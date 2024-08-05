import {
  ISaveItemToLocalStorageUseCase,
  TSaveItemToLocalStorageUseCaseFactoryDepsType,
} from '../../ports/input/ISaveItemToLocalStorageUseCase';

const SaveItemToLocalStorageUseCaseFactory = (
  ...[{ browserStoragesAdapter }]: TSaveItemToLocalStorageUseCaseFactoryDepsType
): ISaveItemToLocalStorageUseCase => (key: string, value: string) => browserStoragesAdapter.saveItemToLocalStorage(key, value);
export default SaveItemToLocalStorageUseCaseFactory;
