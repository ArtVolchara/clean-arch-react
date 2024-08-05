export type TRequestMethod = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH';

export interface IHttpRequestData<T = any> {
  url?: string;
  external?: boolean;
  method?: TRequestMethod;
  data?: T,
  headers?: any;
  params?: any;
  locale?: string,
  withCredentials?: boolean,
  noStringify?: boolean,
  contentType?: string,
}
