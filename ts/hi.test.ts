import { getScore } from "./hi";
// const ret = getScore('영');
//
// console.log(ret);

describe("-hi-", () => {
  test("hi.getScore", () => {
    expect(getScore("영")).toBe("과목: 영");
  });
});

// describe.only("-hi-valid", () => {
//   test("-isValid-", () => {
//     expect(isValid()).toBe(true);
//     expect(isValid()).toBeTruthy();
//   });
// });
