import { IApiError } from '../../entities/IApiError';

export function isApiError(object:any): object is IApiError {
  return object?.status;
}

export function isBaseJSError(object:object): object is Error {
  return object instanceof Error;
}
