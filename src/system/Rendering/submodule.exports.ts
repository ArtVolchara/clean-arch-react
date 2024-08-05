import ViewRendererAdapterFactory from './adapters/adapters/ViewRendererAdapter/ViewRendererAdapter';
import { ELayerKeys } from '../_shared/domain/constants/constants';
import { ViewRendererAdapterToken } from './application/ports/output/adaptersInterfaces/IViewRendererAdapter';
import { RenderViewElementUseCaseToken } from './application/ports/input/IRenderViewElementUseCase';
import RenderViewElementUseCaseFactory from './application/useCases/RenderViewElementUseCase/RenderViewElementUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';



type IRenderingRequiredState = {
  [ELayerKeys.APPLICATION]: { 
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase,
  }
};

export default function addRendering<const RequiredState extends IRenderingRequiredState>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: { [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase },
  } = appState;
  const viewRendererAdapter = new ViewRendererAdapterFactory();
  const renderingAppState = {
    [ELayerKeys.ADAPTERS]: {
      [ViewRendererAdapterToken]: viewRendererAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [RenderViewElementUseCaseToken]: RenderViewElementUseCaseFactory({ viewRendererAdapter }),
    },
  };
  return mergeAppStatesUseCase(appState, renderingAppState);
}
