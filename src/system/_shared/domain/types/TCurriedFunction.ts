export type PartialTuple<
    TUPLE extends any[],
    EXTRACTED extends any[] = [],
    > =
    TUPLE extends [infer NEXT_PARAM, ...infer REMAINING] ?
      PartialTuple<REMAINING, [...EXTRACTED, NEXT_PARAM?]> :
      [...EXTRACTED, ...TUPLE];

export type PartialParameters<
    FN extends (...args: any[]) => any,
    > = PartialTuple<Parameters<FN>>;

export type RemainingParameters<
    PROVIDED extends any[],
    EXPECTED extends any[],
    > =
    EXPECTED extends [infer E1, ...infer EX] ?
      PROVIDED extends [infer P1, ...infer PX] ?
        RemainingParameters<PX, EX> :
        EXPECTED :
      [];

export type TCurriedFunction<
    PROVIDED extends any[],
    FN extends (...args: any[]) => any,
    > =
    <NEW_ARGS extends PartialTuple<
    RemainingParameters<PROVIDED, Parameters<FN>>
    >>(...args: NEW_ARGS) =>
    CurriedFunctionOrReturnValue<[...PROVIDED, ...NEW_ARGS], FN>;

type CurriedFunctionOrReturnValue<
    PROVIDED extends any[],
    FN extends (...args: any[]) => any,
    > =
    RemainingParameters<PROVIDED, Parameters<FN>> extends [any, ...any[]] ?
      TCurriedFunction<PROVIDED, FN> :
      ReturnType<FN>;

export function curriedFunction<
    FN extends (...args: any[]) => any,
    STARTING_ARGS extends PartialParameters<FN>,
    >(targetFn: FN, ...existingArgs: STARTING_ARGS): TCurriedFunction<STARTING_ARGS, FN> {
  return function (...args) {
    const totalArgs = [...existingArgs, ...args];
    if (totalArgs.length >= targetFn.length) {
      return targetFn(...totalArgs);
    }
    return curriedFunction(targetFn, ...totalArgs as PartialParameters<FN>);
  };
}
