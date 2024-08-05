export type TAtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type TExcludeEmpty<T> = T extends TAtLeastOne<T> ? T : never;

export type TRemoveReadonly<T> = { -readonly [P in keyof T]: T[P] };

export type TDeepRemoveReadonly<T> = { -readonly [P in keyof T]: TDeepRemoveReadonly<T[P]> };

export type TRemoveIndex<T> = {
  [ K in keyof T as
    string extends K
      ? never
      : number extends K
        ? never
        : symbol extends K
          ? never
          : K
  ]: T[K];
};

export type TDeepRequired<T> = {
  [K in keyof T]: Required<TDeepRequired<T[K]>>
}

export type TNoInfer<T> = [T][T extends any ? 0 : never];

export type TDotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type TPathsToStringProps<T> = T extends string ? [] : {
  [K in Extract<keyof T, string>]: [K, ...TPathsToStringProps<T[K]>]
}[Extract<keyof T, string>];

export type TSplitStringToTuple<S extends string, D extends string> =
    string extends S ? string[] :
      S extends '' ? [] :
        S extends `${infer T}${D}${infer U}` ? [T, ...TSplitStringToTuple<U, D>] : [S];

export type TJoinTupleToString<T extends string[], D extends string> =
    T extends []
      ? never
      : T extends [infer F]
        ? F
        : T extends [infer F, ...infer R]
          ? F extends string
            ? `${F}${D}${TJoinTupleToString<Extract<R, string[]>, D>}`
            : never
          : '';

export type TDotNestedKeys<T extends Record<string, any> | Array<any>> = TJoinTupleToString<TPathsToStringProps<T>, '.'>;

export type TWithoutIndexSignature<T> = {
  [P in keyof T as string extends P ? never : number extends P ? never : P ] : T[P]
};

export type TupleToObject<T extends any[]> = { [K in keyof T as Exclude<K, keyof []>]: T[K] };

export type TLastTupleOrArrayElement<T extends any[] | readonly any[]> = T extends [...infer F, infer L] ? L : T extends Array<infer El> ? El : never;

export type TGetTupleKeys<T> = T extends unknown[]
  ? T extends [] // special case empty tuple => no keys
    ? never
    : '0' extends keyof T // any tuple with at least one element
      ? Exclude<keyof T, keyof []>
      : number // other array
  : keyof T; // not an array

export type TConstructor<DepType extends Array<any> = Array<any>, ReturnType = any> = { new(...deps: DepType): ReturnType };
export type TGenericConstructor<DepType extends Array<any> = Array<any>, ReturnType = any> = { new <Deps extends DepType>(...deps: Deps): ReturnType };
export type TFunction<DepType extends Array<any> = Array<any>, ReturnType = any> = { (...deps: DepType): ReturnType };
export type TReturnTypeOrInstanceType<CreatorType extends TFunction | TConstructor> =
    CreatorType extends TFunction
      ? ReturnType<Extract<CreatorType, TFunction>>
      : InstanceType<Extract<CreatorType, TConstructor>>;

export type TFlattenTuple<T extends unknown[]> =
    T extends [any, ...infer R]
      ? [...T[0], ... TFlattenTuple<R>]
      : [];

export type TFlatten<T extends any[]> =
 T extends (number extends T['length'] ? [] : any[])
   ? TFlattenTuple<T>
   : Array<FlatArray<T, 1>>;

export type TExcludeFromTuple<T extends any[], E> =
    T extends [infer F, ...infer R] ?
      [F] extends [E] ?
        TExcludeFromTuple<R, E>
        : [F, ...TExcludeFromTuple<R, E>]
      : { [Key in keyof T]: [T[Key]] extends [E] ? never : T[Key] };

export type TFindInTuple<Arr extends any[], El> = Extract<Arr[number], El>

export type TReplaceProps<T, From, To> = { 
  [K in keyof T]: K extends keyof From 
    ? T[K] extends From[K] 
      ? K extends keyof To 
        ? To[K]
        : T[K] 
      : T[K]  
    : T[K]
};