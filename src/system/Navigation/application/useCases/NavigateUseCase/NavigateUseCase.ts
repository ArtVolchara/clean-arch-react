import INavigateUseCase, {
  INavigateOptions,
  TNavigateUseCaseFactoryDepsType,
} from '../../ports/input/INavigateUseCase';

const NavigateUseCaseFactory = (
  ...[{
    navigationServiceAdapter,
  }]: TNavigateUseCaseFactoryDepsType
): INavigateUseCase => (to: Array<string> | number, options?:INavigateOptions) => {
  if (typeof to === 'number') {
    return navigationServiceAdapter?.navigate(to);
  } else {
    const url = to.reduce<string>((acc, currentPath) => {
      if (currentPath) {
        if ((!acc || acc[acc.length - 1] === '/') || (currentPath[0] && currentPath[0] === '/')) {
          acc = `${acc}${currentPath}`;
        } else {
          acc = `${acc}/${currentPath}`;
        }
      }
      return acc;
    }, '');
    return navigationServiceAdapter?.navigate(url, options);
  }
};
export default NavigateUseCaseFactory;
