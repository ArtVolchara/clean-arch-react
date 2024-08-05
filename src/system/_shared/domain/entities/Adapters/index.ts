import { IAdapter, TAdapterDepsType } from './Adapter/IAdapter';
import { IGateway, TGatewayDepsType } from './Gateway/IGateway';
import { IStore, TStoreDepsType } from './Store/IStore';

export type TAdaptersLayerElement = IAdapter | IGateway | IStore;
export type TAdaptersLayerElementDeps = TAdapterDepsType | TGatewayDepsType | TStoreDepsType;
