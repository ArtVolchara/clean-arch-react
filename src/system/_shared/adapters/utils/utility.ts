export type TObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type TObjectValues<T> = {
  [K in keyof T]: T[K];
}[keyof T][];

export default function getObjectEntries<T extends Record<PropertyKey, any>>(obj: T): TObjectEntries<T> {
  return Object.entries(obj) as any;
}

export type Infer<T, R> = T extends R ? T : never;
