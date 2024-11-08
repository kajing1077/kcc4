export function getScore(subject: '국' | '영' | '수') {
  return `과목: ${subject}`
}
console.log(getScore('국'));
