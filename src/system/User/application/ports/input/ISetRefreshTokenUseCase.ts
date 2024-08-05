import IUseCase from '../../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { IUserDataStore, UserDataStoreToken } from '../output/storesInterfaces/IUserDataStore';

export interface ISetRefreshTokenUseCase extends IUseCase {
  (refreshToken:string): ReturnType<IUserDataStore['setRefreshToken']>
}
export const SetRefreshTokenUseCaseToken = 'setRefreshTokenUseCase';

export type TSetRefreshTokenUseCaseFactoryDepsType = [{ [UserDataStoreToken]: IUserDataStore }];
