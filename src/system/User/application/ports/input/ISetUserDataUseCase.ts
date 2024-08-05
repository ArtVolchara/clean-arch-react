import { IUserDataStore, UserDataStoreToken } from '../output/storesInterfaces/IUserDataStore';
import { IUser } from '../../../domain/entities/IUser';

export interface ISetUserDataUseCase {
  (userData: IUser | null): ReturnType<IUserDataStore['setUserData']>
}

export const SetUserDataUseCaseToken = 'setUserDataUseCase';

export type TSetUserDataUseCaseFactoryDepsType = [{ [UserDataStoreToken]: IUserDataStore }];
