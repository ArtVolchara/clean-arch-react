import { serverStatusCodes } from './serverStatusCodes';

export const isHTTPCode = (value:number | string) => (serverStatusCodes[Number(value)] ? undefined : [{ id: 'system.httpRequest.request.mustBeHTTPCode', defaultMessage: 'Value should be in HTTP-code format' }]);
