import { IUser } from '../../../domain/entities/IUser';
import { ISetUserDataUseCase, TSetUserDataUseCaseFactoryDepsType } from '../../ports/input/ISetUserDataUseCase';
import { UserDataStoreToken } from '../../ports/output/storesInterfaces/IUserDataStore';

const SetUserDataUseCaseFactory = (
  ...[{
    [UserDataStoreToken]: userStore,
  }]: TSetUserDataUseCaseFactoryDepsType
): ISetUserDataUseCase => (userData:IUser | null) => (userData ? userStore.setUserData(userData) : userStore.cleanUser());

export default SetUserDataUseCaseFactory;
