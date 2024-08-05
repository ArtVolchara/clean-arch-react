import { IAdapter } from '../../../_shared/domain/entities/Adapters/Adapter/IAdapter';
import IUseCase from '../../../_shared/domain/entities/Application/UseCase/IUseCase';
import { ELayerKeys } from '../../../_shared/domain/constants/constants';
import { TViewElement } from '../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';

export default interface IAppState {
  [ELayerKeys.ADAPTERS]?: Record<string, IAdapter>,
  [ELayerKeys.APPLICATION]?: Record<string, IUseCase>,
  [ELayerKeys.PRESENTATION]?: Record<string, TViewElement>,
}
