import BrowserStoragesAdapterConstructor from './adapters/adapters/BrowserStorageAdapter/BrowserStoragesAdapter';
import { ELayerKeys } from '../_shared/domain/constants/constants';
import { BrowserStoragesAdapterToken } from './application/ports/output/adaptersInterfaces/IBrowserStoragesAdapter';
import { GetItemFromLocalStorageUseCaseToken } from './application/ports/input/IGetItemFromLocalStorageUseCase';
import GetItemFromLocalStorageUseCaseFactory from './application/useCases/GetItemFromLocalStorageUseCase/GetItemFromLocalStorageUseCase';
import RemoveItemFromLocalStorageUseCaseFactory from './application/useCases/RemoveItemFromLocalStorageUseCase/RemoveItemFromLocalStorageUseCase';
import { RemoveItemFromLocalStorageUseCaseToken } from './application/ports/input/IRemoveItemFromLocalStorageUseCase';
import SaveItemToLocalStorageUseCaseFactory from './application/useCases/SaveItemToLocalStorageUseCase/SaveItemToLocalStorageUseCase';
import { SaveItemToLocalStorageUseCaseToken } from './application/ports/input/ISaveItemToLocalStorageUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';

type IBrowserStoragesRequiredState = {
  [ELayerKeys.APPLICATION]: {
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase
  }
};

export default function addBrowserStorages<const RequiredState extends IBrowserStoragesRequiredState>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: {
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase
    }
  } = appState;
  const browserStoragesAdapter = new BrowserStoragesAdapterConstructor();
  const browserStoragesAppState = {
    [ELayerKeys.ADAPTERS]: {
      [BrowserStoragesAdapterToken]: browserStoragesAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [GetItemFromLocalStorageUseCaseToken]: GetItemFromLocalStorageUseCaseFactory({ [BrowserStoragesAdapterToken]: browserStoragesAdapter }),
      [RemoveItemFromLocalStorageUseCaseToken]: RemoveItemFromLocalStorageUseCaseFactory({ [BrowserStoragesAdapterToken]: browserStoragesAdapter }),
      [SaveItemToLocalStorageUseCaseToken]: SaveItemToLocalStorageUseCaseFactory({ [BrowserStoragesAdapterToken]: browserStoragesAdapter }),
    }
  }
  return mergeAppStatesUseCase(appState, browserStoragesAppState)
}
