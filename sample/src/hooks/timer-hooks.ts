import { useCallback, useEffect, useRef } from 'react';

type TimerFn = typeof setTimeout | typeof setInterval;
type ClearFn = typeof clearTimeout | typeof clearInterval;

function useTimer<T extends (...args: Parameters<T>) => ReturnType<T>>(
  this: { timerFn: TimerFn; clearFn: ClearFn },
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  const timerRef = useRef<ReturnType<typeof this.timerFn>>();

  const { timerFn, clearFn } = this;
  const setup = useCallback(() => {
    timerRef.current = timerFn(cbRef.current, delay, ...argsRef.current);
  }, [delay, timerFn]);
  const clear = useCallback(() => {
    // console.log('useTime.clear.timer>>', timerRef.current);
    clearFn(timerRef.current);
  }, [clearFn]);
  const reset = useCallback(() => {
    clear();
    setup();
  }, [clear, setup]);

  useEffect(() => {
    setup();
    return clear;
  }, [setup, clear]);

  return { reset, clear };
}

export const useTimeout = useTimer.bind({
  timerFn: setTimeout,
  clearFn: clearTimeout,
});

export const useInterval = useTimer.bind({
  timerFn: setInterval,
  clearFn: clearInterval,
});

export const useDebounce = <T extends (...args: unknown[]) => ReturnType<T>>(
  cb: T,
  delay: number,
  depArr: unknown[] = []
) => {
  const { reset } = useTimeout(cb, delay);

  useEffect(reset, [...depArr, delay]);
  // useEffect(() => {
  //   if (timerRef.current) clearTimeout(timerRef.current);
  //   timerRef.current = setTimeout(cbRef.current, delay, depArr);
  //
  //   return () => clearTimeout(timerRef.current);
  // }, [depArr, delay]);
};

