import { serverStatusCodes } from '../constants/serverStatusCodes';

export interface IApiError {
  status: serverStatusCodes;
  data: any;
}
