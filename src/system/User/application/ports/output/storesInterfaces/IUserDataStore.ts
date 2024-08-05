import { IUser } from '../../../../domain/entities/IUser';
import { IStore } from '../../../../../_shared/domain/entities/Adapters/Store/IStore';

export interface IUserDataStore extends IStore, IUser {
  firstName: IUser['firstName']

  middleName?: IUser['middleName']

  lastName: IUser['lastName']

  userName: IUser['userName']

  isLoggedIn: IUser['isLoggedIn']

  refreshToken: IUser['refreshToken'];

  roles: IUser['roles']

  setUserData(user:IUser): void;
  cleanUser(): void;
  setRefreshToken(refreshToken:IUserDataStore['refreshToken']): void;
  getUser():IUser;
}
export const UserDataStoreToken = 'userDataStore';

export type TUserDataStoreFactoryDepsType = [];
