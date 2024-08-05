import {
  IGetUserStorageDataUseCase,
  TGetUserStorageDataUseCaseFactoryDepsType,
} from '../../ports/input/IGetUserStorageDataUseCase';
import { UserDataStoreToken } from '../../ports/output/storesInterfaces/IUserDataStore';

const GetUserStorageDataUseCaseFactory = (
  ...[{
    [UserDataStoreToken]: userStore,
  }]: TGetUserStorageDataUseCaseFactoryDepsType
): IGetUserStorageDataUseCase => () => userStore.getUser();

export default GetUserStorageDataUseCaseFactory;
