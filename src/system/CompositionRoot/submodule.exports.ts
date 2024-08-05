import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import IAppState from './domain/entities/IAppState';
import mergeAppStatesUseCaseFactory from './application/useCases/MergeAppStatesUseCase/mergeAppStatesUseCase';
import { MergeAppStatesUseCaseToken } from './application/ports/input/IMergeAppStatesUseCase';

type IAddCompositionRequiredState = IAppState;

export default function addComposition<const RequiredState extends IAddCompositionRequiredState = Record<string, never>>(appState: RequiredState) {
  const mergeAppStatesUseCase = mergeAppStatesUseCaseFactory();
  return mergeAppStatesUseCase(
    appState,
    { [ELayerKeys.APPLICATION]: { [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase } },
  );
}
