import DTO from '../../../DTO/adapters/dtos/DTO';
import ListTypeFactory from '../../../DTO/adapters/factories/ListTypeFactory';
import { TDTOAttributes } from '../../../DTO/domain/entities/TDTOAttributes';
import { IUser } from '../../domain/entities/IUser';
import IValidateValueUseCase from '../../../Validation/application/ports/input/IValidateValueUseCase';
import { ITranslateMessageUseCase } from '../../../Internalization/application/ports/input/ITranslateMessageUseCase';

export default class UserDTO extends DTO<IUser> implements IUser {
  firstName: IUser['firstName'];

  middleName: IUser['middleName'];

  lastName: IUser['lastName'];

  refreshToken: IUser['refreshToken'];

  isLoggedIn: IUser['isLoggedIn'];

  userName: IUser['userName'];

  roles: IUser['roles'];

  constructor(data?: any, translate?:ITranslateMessageUseCase, validate?: IValidateValueUseCase, isLogValidation?:boolean) {
    super(validate, translate);
    const attributes: TDTOAttributes<IUser> = {
      firstName: { name: 'firstName', validators: [], type: String, defaultValue: '', labelKey: { id: 'system.user.user.firstName' } },
      middleName: { name: 'middleName', validators: [], type: String, defaultValue: undefined, labelKey: { id: 'system.user.user.middleName' } },
      lastName: { name: 'lastName', validators: [], type: String, defaultValue: '', labelKey: { id: 'system.user.user.lastName' } },
      userName: { name: 'userName', validators: [], type: String, defaultValue: '', labelKey: { id: 'system.user.user.userName' } },
      refreshToken: { name: 'refreshToken', validators: [], type: String, defaultValue: '', labelKey: { id: 'system.user.user.refreshToken' } },
      isLoggedIn: { name: 'isLoggedIn', validators: [], type: Boolean, defaultValue: false, labelKey: { id: 'system.user.user.isLoggedIn' } },
      roles: { name: 'roles', validators: [], type: ListTypeFactory(String, translate, validate, isLogValidation), defaultValue: [], labelKey: { id: 'system.user.user.permissions' } },
    };
    Object.assign(this, super.getEntity(data, attributes, UserDTO.name, isLogValidation));
  }

  getData(this:UserDTO) {
    return super.getData();
  }
}
