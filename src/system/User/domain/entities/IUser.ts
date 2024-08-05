import { TRoles } from '../../../Authorization/domain/entities/IRole';
import { ICredentials } from '../../../Authentication/domain/entities/Jwt/ICredentials';

export interface IUser {
  firstName: string;

  middleName?: string;

  lastName: string;

  userName: ICredentials['username'];

  refreshToken: string;

  isLoggedIn: boolean;

  roles: TRoles
}
