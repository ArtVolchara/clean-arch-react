import { ELayerKeys } from 'system/_shared/domain/constants/constants';
import { TLocales } from '../../../domain/entities/TLocale';
import { IAddLocalesToAppUseCase, TAddLocalesToAppUseCaseFactoryDepsType } from '../../ports/input/IAddLocalesToAppUseCase';
import IInternalizationServiceAdapter, { InternalizationServiceAdapterToken } from '../../ports/output/adaptersInterfaces/IInternalizationServiceAdapter';
import { GetLocalesUseCaseToken, IGetLocalesUseCase } from '../../ports/input/IGetLocalesUseCase';
import { ELocaleKeys } from 'system/Internalization/domain/constants/appLocaleKeys';

const AddLocalesToAppUseCaseFactory = (
...[
  /*{ [MergeAppStatesUseCaseToken]: mergeAppStatesUseCase }*/
  {[InternalizationServiceAdapterToken]: internalizationServiceAdapter}
]: TAddLocalesToAppUseCaseFactoryDepsType
): IAddLocalesToAppUseCase => <
const NewLocales extends TLocales,
// const RequiredState extends IAddLocalesToAppRequiredState,
// const AppLocales extends RequiredState extends {
//   [ELayerKeys.APPLICATION]: {
//     [GetLocalesUseCaseToken]: IGetLocalesUseCase<infer Locales>
//   }
// } ? Locales : never,
>
  (
    locales: NewLocales,
    // defaultLocale: keyof NewLocales | keyof AppLocales,
    defaultLocale: ELocaleKeys,
    // appState: RequiredState,
  ) => {
  // const {
  //   [ELayerKeys.ADAPTERS]: {
  //     [InternalizationServiceAdapterToken]: internalizationServiceAdapter,
  //   },
  //   [ELayerKeys.APPLICATION]: {
  //     [GetLocalesUseCaseToken]: getLocalesUseCase,
  //   },
  // } = appState;
  // const appLocales = getLocalesUseCase();
  const appLocales = internalizationServiceAdapter.locales;
  const mergedLocales = Object.entries(locales)
    .reduce(
      (finalLocale, [localeKey, locale]) => {
        finalLocale[localeKey] = { ...(finalLocale[localeKey] || {}), ...locale };
        return finalLocale;
      },
      appLocales /*as TMergeLocales<AppLocales, NewLocales>*/,
    );
  const updatedAdapter = internalizationServiceAdapter.setLocales(mergedLocales, defaultLocale /*as keyof TMergeLocales<AppLocales, NewLocales>*/);
  // return mergeAppStatesUseCase(
  //   appState,
  //   {
  //     [ELayerKeys.ADAPTERS]: {
  //       [InternalizationServiceAdapterToken]: updatedAdapter as IInternalizationServiceAdapter<TMergeLocales<AppLocales, NewLocales>>,
  //     },
  //     [ELayerKeys.APPLICATION]: {
  //       [GetLocalesUseCaseToken]: getLocalesUseCase as IGetLocalesUseCase<TMergeLocales<AppLocales, NewLocales>>,
  //     },
  //   },
  // ) as TMergAppStates<
  // RequiredState,
  // {
  //   [ELayerKeys.ADAPTERS]: {
  //     [InternalizationServiceAdapterToken]: IInternalizationServiceAdapter<TMergeLocales<AppLocales, NewLocales>>
  //   },
  //   [ELayerKeys.APPLICATION]: {
  //     [GetLocalesUseCaseToken]: IGetLocalesUseCase<TMergeLocales<AppLocales, NewLocales>>
  //   }
  // }
  // >;
};
export default AddLocalesToAppUseCaseFactory;
