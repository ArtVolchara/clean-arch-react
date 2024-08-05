import ILogoutUseCase from '../../../../../Authentication/application/ports/input/ILogoutUseCase';
import EAuthModes from '../../../../../Authentication/domain/constants/EAuthModes';

interface ILayoutViewModelProps {
  logoutUseCase: ILogoutUseCase,
}
const useModulesLayoutPageViewModel = ({ logoutUseCase }: ILayoutViewModelProps) => {
  const handleLogout = (mode: EAuthModes) => logoutUseCase(mode);

  return {
    handleLogout,
  };
};

export default useModulesLayoutPageViewModel;
