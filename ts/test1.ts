type Settled<T> =
  | {
      status: "fulfilled";
      value: T;
    }
  | {
      status: "rejected";
      reason: unknown;
    };

export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export const promiseAll = <T>(promises: (T | Promise<T>)[]) =>
  new Promise((resolve, reject) => {
    if (!promises?.length) reject(new Error("Promise를 전달하세요!"));

    const results: T[] = [];
    let cntToRun = promises.length;
    for (let i = 0; i < promises.length; i += 1) {
      const promise = (
        promises[i] instanceof Promise
          ? promises[i]
          : Promise.resolve(promises[i])
      ) as Promise<T>;
      promise
        .then((succ) => {
          results[i] = succ;
          if ((cntToRun -= 1) === 0) resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });

export function promiseAllSettled<T>(promises: Promise<T>[]) {
  // const results: Promise<Settled<T>>[] = [];
  // return Promise.all(
  return promiseAll(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );

  // return results;
}
