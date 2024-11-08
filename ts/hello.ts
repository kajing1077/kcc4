// // // debounce와 throttle 함수를 TypeScript로 작성하시오.
// export function debounce<T extends unknown[]>(cb: (...args: T) => void, delay: number) {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: T) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(cb, delay, ...args);
//   }
// }
// // function throttle
// export function debounce2<T extends (...args: any[]) => void>(cb: T, delay: number)  {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(cb, delay, ...args);
//   }
// }
//
// export function throttle<T extends unknown[]>(cb: (...args: T) => void, delay: number) {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: T) => {
//     if (timer) return;
//     timer = setTimeout(cb, delay, ...args);
//   }
// }
//
// export function throttle2<T extends (...args: any[]) => void>(cb: T, delay: number)  {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     if (timer) return;
//     timer = setTimeout(cb, delay, ...args);
//   }
// }
//
// // test
//
// const debo = debounce2((a: number, b: string) => console.log(a + 1, b), 1000);

// const debo = debounce2((a: number, b: string) => console.log(a + 1, b), 1000);
// for (let i = 10; i < 15; i++) debo(i, 'abc');  // 15, 'abc'
//
// const thro = throttle2((a:number) => console.log(a + 1), 1000);
// for (let i = 10; i < 15; i++) thro(i);   // 11


// JS 시간에 작성했던 memoized 함수를 범용성을 고려하여 TS로 작성하시오.
// function memoized<T extends unknown[]>(cb: (...args: T) => number) {
//   const cache: Record<string, number> = {};
//   return (...args: T) => {
//     const key = args.join(':');
//     if (cache[key]) {
//       return cache[key];
//     }
//     return (cache[key] = cb(...args))
//   }
// }
//
// // test
// const memoizeAdd = memoized((a: number, b: number) => {
//   return a + b;
// });
//
// console.log(memoizeAdd(1, 2)); // 3
// console.log(memoizeAdd(3, 4)); // 7
//
// const memoizeFactorial = memoized((n: number): number => {
//   if (n <= 1) return 1;
//
//   return n * memoizeFactorial(n - 1);
// });

// Promise.allSettled와 동일한 promiseAllSettled 함수를 TS로 작성하시오.

// function promiseAllSettled…
//
// // test
// assert.deepStrictEqual(
//   await Promise.allSettled([randTime(1), randTime(2), randTime(3)]),
//   await promiseAllSettled([randTime(1), randTime(2), randTime(3)])
// );
//
// assert.deepStrictEqual(
//   await Promise.allSettled([randTime(11), Promise.reject('REJECT'), randTime(33)]),
//   await promiseAllSettled([randTime(11), Promise.reject('REJECT'), randTime(33)])
// );
