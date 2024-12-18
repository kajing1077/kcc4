import Link from 'next/link';

export default function Hi_intercept({
  params: { time },
}: {
  params: { time: string };
}) {
  return (
    <>
      <h1>Hi/Time [{time}]- Intercept</h1>
      <a href='/hi/morning'>Real Morning</a>
    </>
  );
}
