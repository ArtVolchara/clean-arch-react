import IAppState from 'system/CompositionRoot/domain/entities/IAppState';
import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { IMergeAppStatesUseCaseFactoryDepsType, TMergeAppStates } from '../../ports/input/IMergeAppStatesUseCase';

// Нужна только для того, чтобы правильно соединить типы состояний
export default function mergeAppStatesUseCaseFactory(...[]:IMergeAppStatesUseCaseFactoryDepsType) {
  return <
    const InputState extends IAppState,
    const OutputState extends IAppState
   >(
     inputState: InputState,
     outputState: OutputState
    ): TMergeAppStates<InputState, OutputState> => ({
    [ELayerKeys.ADAPTERS]: {
      ...inputState[ELayerKeys.ADAPTERS] || {},
      ...outputState[ELayerKeys.ADAPTERS] || {},
    },
    [ELayerKeys.APPLICATION]: {
      ...inputState[ELayerKeys.APPLICATION] || {},
      ...outputState[ELayerKeys.APPLICATION] || {},
    },
    [ELayerKeys.PRESENTATION]: {
      ...inputState[ELayerKeys.PRESENTATION] || {},
      ...outputState[ELayerKeys.PRESENTATION] || {},
    },
  });
}
