import { IAdapter } from '../../../../../_shared/domain/entities/Adapters/Adapter/IAdapter';

export interface IBrowserStoragesAdapter extends IAdapter {
  getItemFromLocalStorage(key: string):string | null;

  saveItemToLocalStorage(key: string, value: string): void;

  removeItemFromLocalStorage(key: string): void;
}

export const BrowserStoragesAdapterToken = 'browserStoragesAdapter';

export type TBrowserStoragesAdapterFactoryDepsType = [];