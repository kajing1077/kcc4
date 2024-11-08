// debounce와 throttle 함수를 TypeScript로 작성하시오.
function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay)
  };
}

// function throttle…
function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    if (timer) return;
    timer = setTimeout(fn, delay, ...args);
  }
}

// test
const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, "abc"); // 15, 'abc'

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력

