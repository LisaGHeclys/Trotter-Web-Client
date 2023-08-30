import { useAsyncFn } from "react-use";

/**
 * A wrapper around useAsyncFn until its arguments can be properly typed
 * See https://github.com/streamich/react-use/issues/1111
 *
 * @param callback to be called in useAsyncFn
 * @param deps that should trigger recreating the callback
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function useTypedAsyncFn<T, R = any>(
  callback: (input: T) => Promise<R>,
  deps: unknown[]
) {
  return useAsyncFn(async (...args: T[]) => {
    return await callback(args[0]);
  }, deps);
}
