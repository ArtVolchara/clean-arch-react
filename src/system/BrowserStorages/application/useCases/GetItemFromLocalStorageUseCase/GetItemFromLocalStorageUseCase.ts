import {
  IGetItemFromLocalStorageUseCase,
  TGetItemFromLocalStorageUseCaseFactoryDepsType,
} from '../../ports/input/IGetItemFromLocalStorageUseCase';

const GetItemFromLocalStorageUseCaseFactory = (
  ...[{ browserStoragesAdapter }]: TGetItemFromLocalStorageUseCaseFactoryDepsType
): IGetItemFromLocalStorageUseCase => (key: string) => browserStoragesAdapter.getItemFromLocalStorage(key);
export default GetItemFromLocalStorageUseCaseFactory;
