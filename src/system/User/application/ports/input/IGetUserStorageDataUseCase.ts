import { IUserDataStore, UserDataStoreToken } from '../output/storesInterfaces/IUserDataStore';

export interface IGetUserStorageDataUseCase {
  (): ReturnType<IUserDataStore['getUser']>
}
export const GetUserStorageDataUseCaseToken = 'getUserDataUseCase';

export type TGetUserStorageDataUseCaseFactoryDepsType = [{ [UserDataStoreToken]: IUserDataStore }];
