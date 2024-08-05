import userLocales from './domain/translations';
import { UserDataStoreToken } from './application/ports/output/storesInterfaces/IUserDataStore';
import UserDataStoreConstructor from './adapters/_stores/UserStore/UserDataStore';
import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import GetUserStorageDataUseCaseFactory from './application/useCases/GetUserStorageDataUseCase/GetUserStorageDataUseCase';
import { GetUserStorageDataUseCaseToken } from './application/ports/input/IGetUserStorageDataUseCase';
import { SetRefreshTokenUseCaseToken } from './application/ports/input/ISetRefreshTokenUseCase';
import SetRefreshTokenUseCaseFactory from './application/useCases/SetRefreshTokenUseCase/SetRefreshTokenUseCase';
import { SetUserDataUseCaseToken } from './application/ports/input/ISetUserDataUseCase';
import SetUserDataUseCaseFactory from './application/useCases/SetUserDataUseCase/SetUserDataUseCase';
import { AddLocalesToAppUseCaseToken, IAddLocalesToAppUseCase } from 'system/Internalization/application/ports/input/IAddLocalesToAppUseCase';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from 'system/Internalization/application/ports/input/IGetLocalesUseCase';
import { TLocales } from 'system/Internalization/domain/entities/TLocale';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from 'system/Internalization/application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { DEFAULT_LOCALE_KEY } from 'system/Internalization/domain/constants/appLocaleKeys';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';

type IAddUserRequiredState = {
  [ELayerKeys.ADAPTERS]: {
    [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter,
  },
  [ELayerKeys.APPLICATION]: {
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase
    [AddLocalesToAppUseCaseToken]: IAddLocalesToAppUseCase
    [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>
  }
};

export default function addUser<const RequiredState extends IAddUserRequiredState>(appState: RequiredState) {
  const {[ELayerKeys.APPLICATION]:{[MergeAppStatesUseCaseToken]: mergeAppStatesUseCase, [AddLocalesToAppUseCaseToken]: addLocalesToAppUseCase} } = appState
  const userStore = new UserDataStoreConstructor()

  const userAppState = {
    [ELayerKeys.ADAPTERS]: {
      [UserDataStoreToken]: userStore
    },
    [ELayerKeys.APPLICATION]: {
      [GetUserStorageDataUseCaseToken]: GetUserStorageDataUseCaseFactory({[UserDataStoreToken]: userStore }),
      [SetRefreshTokenUseCaseToken]: SetRefreshTokenUseCaseFactory({[UserDataStoreToken]: userStore }),
      [SetUserDataUseCaseToken]: SetUserDataUseCaseFactory({[UserDataStoreToken]: userStore })
    },
  }
  addLocalesToAppUseCase(
    userLocales,
    DEFAULT_LOCALE_KEY,
  );
  return mergeAppStatesUseCase(
    // addLocalesToAppUseCase(
    //   userLocales,
    //   DEFAULT_LOCALE_KEY,
    //   appState
    // ),
    appState,
    userAppState
  )
}
