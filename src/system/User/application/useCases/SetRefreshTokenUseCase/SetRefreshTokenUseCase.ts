import {
  ISetRefreshTokenUseCase,
  TSetRefreshTokenUseCaseFactoryDepsType,
} from '../../ports/input/ISetRefreshTokenUseCase';
import { UserDataStoreToken } from '../../ports/output/storesInterfaces/IUserDataStore';

const SetRefreshTokenUseCaseFactory = (
  ...[{ [UserDataStoreToken]:userStore }]: TSetRefreshTokenUseCaseFactoryDepsType
): ISetRefreshTokenUseCase => (refreshToken:string) => {
  userStore.setRefreshToken(refreshToken);
};

export default SetRefreshTokenUseCaseFactory;
