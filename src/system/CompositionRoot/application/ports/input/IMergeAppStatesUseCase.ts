import IAppState from 'system/CompositionRoot/domain/entities/IAppState';
import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { TShallowObjectsMerge } from 'system/_shared/domain/types/MergeObjects';

export type IMergeAppStatesUseCaseFactoryDepsType = [];
//Условный тип c откатом в never, чтобы при многократном использовании тайпскрипт не считал тип бесконечным
export type TMergeAppStates<A extends IAppState, B extends IAppState> = A extends any
? B extends any
  ?  {
      [ELayerKeys.ADAPTERS]: TShallowObjectsMerge<Exclude<A[ELayerKeys.ADAPTERS], undefined>, Exclude<B[ELayerKeys.ADAPTERS], undefined>>,
      [ELayerKeys.APPLICATION]: TShallowObjectsMerge<Exclude<A[ELayerKeys.APPLICATION], undefined>, Exclude<B[ELayerKeys.APPLICATION], undefined>>,
      [ELayerKeys.PRESENTATION]: TShallowObjectsMerge<Exclude<A[ELayerKeys.PRESENTATION], undefined>, Exclude<B[ELayerKeys.PRESENTATION], undefined>>,
    }
  : never
: never;
export interface IMergeAppStatesUseCase {
  <
    const InputState extends IAppState, 
    const OutputState extends IAppState,
    >(
      inputState: InputState extends any ? InputState : never, 
      outputState: OutputState  extends any ? OutputState : never,
    ): TMergeAppStates<InputState, OutputState>
}

export const MergeAppStatesUseCaseToken = 'mergeAppStatesUseCase';