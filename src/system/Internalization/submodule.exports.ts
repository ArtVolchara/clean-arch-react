import InternalizationServiceAdapter from './adapters/_adapters/IntlServiceAdapter/InternalizationServiceAdapter';
import { ELayerKeys } from '../_shared/domain/constants/constants';
import { InternalizationServiceAdapterToken } from './application/ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { TranslateMessageUseCaseToken } from './application/ports/input/ITranslateMessageUseCase';
import { TranslateMessageUseCaseFactory } from './application/useCases/TranslateMessageUseCase/TranslateMessageUseCase';
import { FormatDateUseCaseToken } from './application/ports/input/IFormatDateUseCase';
import FormatDateUseCaseFactory from './application/useCases/FormatDateUseCase/FormatDateUseCase';
import { SwitchLocaleUseCaseToken } from './application/ports/input/ISwitchLocaleUseCase';
import SwitchLocaleUseCaseFactory from './application/useCases/SwitchLocaleUseCase/SwitchLocaleUseCase';
import { GetCurrentLocaleKeyUseCaseToken } from './application/ports/input/IGetCurrentLocaleKeyUseCase';
import GetCurrentLocaleKeyUseCaseFactory from './application/useCases/GetCurrentLocaleKeyUseCase/GetCurrentLocaleKeyUseCase';
import { GetLocalesUseCaseToken } from './application/ports/input/IGetLocalesUseCase';
import AddLocalesToAppUseCaseFactory from './application/useCases/AddLocalesToAppUseCase/AddLocalesToAppUseCase';
import GetLocalesUseCaseFactory from './application/useCases/GetLocalesUseCase/GetLocalesUseCase';
import { AddLocalesToAppUseCaseToken } from './application/ports/input/IAddLocalesToAppUseCase';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';

type IInternalizationRequiredState = {
  [ELayerKeys.APPLICATION]: { 
    [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase, 
  }
};

export default function addInternalization<
  const RequiredState extends IInternalizationRequiredState,
>(appState: RequiredState) {
  const {
    [ELayerKeys.APPLICATION]: { 
      [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase
    },
  } = appState;
  const internalizationServiceAdapter = new InternalizationServiceAdapter();
  const getLocalesUseCase = GetLocalesUseCaseFactory({ [InternalizationServiceAdapterToken]: internalizationServiceAdapter });
  const internalizationAppState = {
    [ELayerKeys.ADAPTERS]: {
      [InternalizationServiceAdapterToken]: internalizationServiceAdapter,
    },
    [ELayerKeys.APPLICATION]: {
      [TranslateMessageUseCaseToken]: TranslateMessageUseCaseFactory({ internalizationServiceAdapter }),
      [FormatDateUseCaseToken]: FormatDateUseCaseFactory({ internalizationServiceAdapter }),
      [SwitchLocaleUseCaseToken]: SwitchLocaleUseCaseFactory({ internalizationServiceAdapter }),
      [GetCurrentLocaleKeyUseCaseToken]: GetCurrentLocaleKeyUseCaseFactory({ internalizationServiceAdapter }),
      [GetLocalesUseCaseToken]: getLocalesUseCase,
      [AddLocalesToAppUseCaseToken]: AddLocalesToAppUseCaseFactory(
        // { [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase }
        {[InternalizationServiceAdapterToken]: internalizationServiceAdapter}
        ),
    },
  };
  return mergeAppStatesUseCase(appState, internalizationAppState);
}
