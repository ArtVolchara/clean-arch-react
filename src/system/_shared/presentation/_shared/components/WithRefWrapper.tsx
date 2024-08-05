import { forwardRef } from 'react';

export default function withRef<RefType, PropsType>(displayName, component) {
  return Object.assign(
    forwardRef<RefType, PropsType>((props, ref) => component({ ...props, ref })),
    { displayName },
  );
}
