import { TFunction } from './utils';

type Lookup<T, K extends keyof any, Else=never> = K extends keyof T ? T[K] : Else;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type ArgType<F, Else=never> = F extends (arg: infer A) => any ? A : Else;

export type TPipe<FuncArray extends [TFunction, ...TFunction[]], G extends TFunction[] = Tail<FuncArray>> = {
  [K in keyof FuncArray]: (arg: ArgType<FuncArray[K]>) => ArgType<Lookup<G, K, any>, any>
};
