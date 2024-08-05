import { makeAutoObservable } from 'mobx';
import { IUserDataStore } from '../../../application/ports/output/storesInterfaces/IUserDataStore';
import { IUser } from '../../../domain/entities/IUser';

const UserDataStoreConstructor = class UserDataStore implements IUserDataStore {
  firstName: IUserDataStore['firstName'];

  middleName: IUserDataStore['middleName'];

  lastName: IUserDataStore['lastName'];

  userName: IUserDataStore['userName'];

  isLoggedIn: IUserDataStore['isLoggedIn'];

  refreshToken: IUserDataStore['refreshToken'];

  roles: IUserDataStore['roles'];

  constructor() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.userName = '';
    this.refreshToken = '';
    this.roles = [];
    makeAutoObservable(this);
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  setUserData(user:IUser | null) {
    Object.assign(this, user);
  }

  cleanUser() {
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.userName = '';
    this.refreshToken = '';
    this.isLoggedIn = false;
    this.roles = [];
  }

  getUser(): IUser {
    return {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      userName: this.userName,
      refreshToken: this.refreshToken,
      isLoggedIn: this.isLoggedIn,
      roles: this.roles,
    };
  }
};

export default UserDataStoreConstructor;
