// // debounce와 throttle 함수를 TypeScript로 작성하시오.
// export function debounce<T>(cb: (...args: T[]) => void, delay: number) {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: T[]) => {
//     if (timer) clearTimeout(timer);
//     setTimeout(cb, delay, ...args);
//   }
// }

// export function debounce2<T extends (...args: any[]) => void>(cb: T, delay: number)  {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(cb, delay, ...args);
//   }
// }