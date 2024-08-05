import { IPaginationState } from './IPaginationState';

export interface IPaginatedResponse<T> extends IPaginationState {
  content: Array<T>,
}
