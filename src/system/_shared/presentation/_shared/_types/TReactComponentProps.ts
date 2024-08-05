import { JSXElementConstructor } from 'react';

export type TReactComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = T extends null | undefined
  ? never
  : T extends JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {};
