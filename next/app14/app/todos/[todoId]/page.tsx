import Link from 'next/link';
import getTodo from '@/lib/todos';

export const revalidate = 5;

export default async function Todo({
  params: { todoId },
}: {
  params: { todoId: string };
}) {
  console.log('todos/todo>>', todoId);
  const { title, completed } = await getTodo(+todoId);
  return (
    <>
      <div>
        <div>id: {todoId}</div>
        <div>title: {title}</div>
        <div>completed: {completed ? 'Done' : 'Doing...'}</div>
        <Link href='/todos'>Go List</Link>
      </div>
    </>
  );
}
