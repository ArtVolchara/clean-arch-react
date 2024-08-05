import { cloneDeep } from 'lodash';

export default function cloneObjDeep<T extends object = object>(obj:T): T {
  return cloneDeep(obj);
}
