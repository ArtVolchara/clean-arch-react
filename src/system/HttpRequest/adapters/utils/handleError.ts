import { isApiError } from '../../domain/types/typeguards/errorTypeGuards';
import { IApiError } from '../../domain/entities/IApiError';

export default function handleError(error:Error | IApiError):void {
  if (isApiError(error)) {
    console.error(error?.data);
  } else {
    console.error(error.message);
  }
  throw error;
}
