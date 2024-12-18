import { useEffect, useState } from 'react';

const ABORT_REASON = 'My useFetch Clean-up';

// const cache = new Map<string, unknown>();
const cache: Record<string, unknown> = {};

interface IErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is IErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string';

const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));

export const useFetch = <T>(
  url: string,
  options: Record<string, string> = {},
  isCache: boolean = false,
  depArr: unknown[] = []
) => {
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<IErrorWithMessage>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useFetch>>>', depArr);
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      try {
        if (isCache && url in cache) {
          setResult(cache[url] as T);
        }

        setIsLoading(true);
        const data = (await fetch(url, { ...options, signal }).then((res) => {
          if (res.ok) return res.json();
          throw new Error(String(res.status));
        })) as T;

        setResult(data);
        setError(undefined);

        if (isCache) cache[url] = data;
      } catch (error) {
        if (error && String(error) === ABORT_REASON) {
          console.log(error, String(error));
          setError(toErrorWithMessage(error));
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abortController.abort(ABORT_REASON);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);

  return { data: result, isLoading, error };
};
