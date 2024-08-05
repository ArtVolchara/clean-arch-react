import { observable, ObservableMap } from 'mobx';
import {
  IBrowserStoragesAdapter,
  TBrowserStoragesAdapterFactoryDepsType,
} from '../../../application/ports/output/adaptersInterfaces/IBrowserStoragesAdapter';

const BrowserStoragesAdapterConstructor = class BrowserStoragesAdapter implements IBrowserStoragesAdapter {
  localStorage: Storage;

  protected inMemoryLocalStorage: ObservableMap;

  constructor(...[]:TBrowserStoragesAdapterFactoryDepsType) {
    this.localStorage = window.localStorage;
    this.inMemoryLocalStorage = observable.map();
    this.initializeInMemoryStorage(this.localStorage, this.inMemoryLocalStorage);
  }

  protected initializeInMemoryStorage(storage: Storage, memoryStorage: ObservableMap) {
    Object.keys(storage).forEach((key) => {
      memoryStorage[key] = storage[key];
    });
  }

  getItemFromLocalStorage(key: string): string | null {
    if (!this.inMemoryLocalStorage.has(key)) {
      const value = this.localStorage.getItem(key);
      if (value) {
        this.saveItemToLocalStorage(key, value);
      }
    }
    return this.inMemoryLocalStorage.get(key);
  }

  removeItemFromLocalStorage(key: string): void {
    this.inMemoryLocalStorage.delete(key);
    this.localStorage.removeItem(key);
  }

  saveItemToLocalStorage(key: string, value: string): void {
    this.localStorage.setItem(key, value);
    this.inMemoryLocalStorage.set(key, value);
  }
};

export default BrowserStoragesAdapterConstructor;
