import { promiseAll, promiseAllSettled, randTime } from "./test1";

describe("promiseAll", () => {
  test("빈 배열 처리", async () => {
    await expect(promiseAll([])).rejects.toThrow("Promise를 전달하세요!");
  });

  test("일반 값들 처리", async () => {
    const result = await promiseAll([randTime(1), randTime(2), randTime(3)]);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toEqual(expect.arrayContaining([1, 2]));
  });

  test("Promise 값들 처리", async () => {
    const result = await promiseAll([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    expect(result).toEqual([1, 2, 3]);
  });

  test("혼합된 값들 처리", async () => {
    const result = await promiseAll([1, Promise.resolve(2), 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  test("하나라도 reject되면 전체 reject", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject("에러 발생!"),
      Promise.resolve(3),
    ];
    await expect(promiseAll(promises)).rejects.toBe("에러 발생!");
  });
});

describe("promiseAllSettled test", () => {
  test("모든 프로미스 성공", async () => {
    const result = await promiseAllSettled([
      Promise.resolve(randTime(1)),
      Promise.resolve(randTime(2)),
    ]);

    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "fulfilled", value: 2 },
    ]);
  });

  test("프로미스가 아닌 값이 포함된 경우", async () => {
    const result = await promiseAllSettled([
      Promise.resolve(randTime(1)),
      Promise.resolve(2),
    ]);

    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "fulfilled", value: 2 },
    ]);
  });

  test("일부 프로미스가 실패할 경우", async () => {
    const result = await promiseAllSettled([
      Promise.resolve(randTime(1)),
      Promise.reject("실패"),
      Promise.resolve(randTime(3)),
    ]);
    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "rejected", reason: "실패" },
      { status: "fulfilled", value: 3 },
    ]);
  });
});
