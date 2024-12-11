// export const randTime = <T>(val: T): Promise<T> => {
//   return new Promise((resolve, _) => {
//     setTimeout(resolve, Math.random() * 1000, val);
//   });
// };

// export const promiseAll = <T>(promises: (T | Promise<T>)[]) => {
//   return new Promise((resolve, reject) => {
//     if (!promises?.length) reject(new Error("Promise를 전달하세요!"));

//     const results: T[] = [];
//     let cntToRun = promises.length;

//     for (let i = 0; i < promises.length; i++) {
//       const promise = (
//         promises[i] instanceof Promise
//           ? promises[i]
//           : Promise.resolve(promises[i])
//       ) as Promise<T>;
//       promise
//         .then((succ) => {
//           results[i] = succ;
//           if (--cntToRun === 0) resolve(results);
//         })
//         .catch((error) => reject(error));
//     }
//   });
// };

// // 객체 전달할때 괄호 안하면 함수로 해석됨
// // 화살표 함수에서 {}로 감쌀때 return 확인할 것
// export const promiseAllSettled = <T>(promises: Promise<T>[]) => {
//   return promiseAll(
//     promises.map((promise) => {
//       return promise
//         .then((value) => ({
//           status: "fulfilled",
//           value,
//         }))
//         .catch((reason) => ({
//           status: "rejected",
//           reason,
//         }));
//     })
//   );
// };

// export const promiseAllSettled = <T>(promises: Promise<T>[]) => {
//   return promiseAll(
//     promises.map((promise) =>
//       promise
//         .then((value) => ({
//           status: "fulfilled",
//           value,
//         }))
//         .catch((reason) => ({
//           status: "rejected",
//           reason,
//         }))
//     )
//   );
// };
// interface FullyMutableName {
//   first: string;
//   last: string;
// }

// const jackie: PartlyMutableName = { first: "Jacqueline", last: "Kennedy" };
// jackie.last = "Onassis"; // OK
// jackie.first = "Jacky";
