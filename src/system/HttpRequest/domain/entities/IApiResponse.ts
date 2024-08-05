export interface IApiResponse<Data = any> {
  status: number;
  data: Data;
}
