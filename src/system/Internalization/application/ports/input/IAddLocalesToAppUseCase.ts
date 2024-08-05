import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { IMergeAppStatesUseCase, MergeAppStatesUseCaseToken, TMergeAppStates } from 'system/CompositionRoot/application/ports/input/IMergeAppStatesUseCase';
import { ELocaleKeys } from 'system/Internalization/domain/constants/appLocaleKeys';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from '../output/adaptersInterfaces/IInternalizationServiceAdapter';
import { TLocales } from '../../../domain/entities/TLocale';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from './IGetLocalesUseCase';
import { TShallowObjectsMerge } from 'system/_shared/domain/types/MergeObjects';
import IAppState from 'system/CompositionRoot/domain/entities/IAppState';


// export type TMergeLocales<T extends TLocales, U extends TLocales> =  T extends any 
// ? U extends any 
//   ? {
//       [Key in ELocaleKeys]: TShallowObjectsMerge<T[Key], U[Key]>
//     }
//   : never
// : never;

// export interface IAddLocalesToAppRequiredState {
//   [ELayerKeys.ADAPTERS]: {
//     [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
//   },
//   [ELayerKeys.APPLICATION]: {
//     [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>
//   }
// }

// export interface IAddLocalesToAppUseCase {
//   <
//    const NewLocales extends TLocales,
//    const RequiredState extends IAddLocalesToAppRequiredState,
//    const AppLocales extends RequiredState extends {
//      [ELayerKeys.APPLICATION]: {
//        [GetLocalesUseCaseToken]: IGetLocalesUseCase<infer Locales>,
//      }
//    } ? Locales : never,
//    const DefaultKey extends keyof NewLocales | keyof AppLocales,
//    >(locales: NewLocales, defaultLocale: DefaultKey, appState: RequiredState): TMergAppStates<
//      RequiredState extends IAppState ? RequiredState: never,
//      {
//       [ELayerKeys.ADAPTERS]: {
//         [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>
//       },
//       [ELayerKeys.APPLICATION]: {
//         [GetLocalesUseCaseToken]: IGetLocalesUseCase<TLocales>
//       }
//     }
//   >;
// }
// export interface IAddLocalesToAppUseCase {
//   <
//    const NewLocales extends TLocales,
//    const RequiredState extends IAddLocalesToAppRequiredState,
//    const AppLocales extends RequiredState extends {
//      [ELayerKeys.APPLICATION]: {
//        [GetLocalesUseCaseToken]: IGetLocalesUseCase<infer Locales>,
//      }
//    } ? Locales : never,
//    const DefaultKey extends keyof NewLocales | keyof AppLocales,
//    >(locales: NewLocales, defaultLocale: DefaultKey, appState: RequiredState): TMergAppStates<
//      RequiredState extends IAppState ? RequiredState: never,
//      {
//       [ELayerKeys.ADAPTERS]: {
//         [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TMergeLocales<AppLocales, NewLocales>>
//       },
//       [ELayerKeys.APPLICATION]: {
//         [GetLocalesUseCaseToken]: IGetLocalesUseCase<TMergeLocales<AppLocales, NewLocales>>
//       }
//     }
//   >;
// }
export interface IAddLocalesToAppUseCase {
  <
   const NewLocales extends TLocales,
   const DefaultKey extends ELocaleKeys,
   >(locales: NewLocales, defaultLocale: DefaultKey): void;
}
export const AddLocalesToAppUseCaseToken = 'addLocalesToAppUseCase';
export type TAddLocalesToAppUseCaseFactoryDepsType = [
  /*{ [MergeAppStatesUseCaseToken]: IMergeAppStatesUseCase }*/
  {[InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TLocales>}
];
