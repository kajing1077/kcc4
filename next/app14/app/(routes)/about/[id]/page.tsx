import { notFound } from 'next/navigation';
import { getTodos } from '../../../../lib/todos';

export const revalidate = 5;
export async function generateStaticParams() {
  return (await getTodos(1)).map(({ id }) => ({
    id: id.toString(),
  }));
}

export default async function AboutTodo({
  params: { id },
}: {
  params: { id: number };
}) {
  const todos = await getTodos(1);
  const todo = todos.find((td) => td.id === +id);
  if (!todo) {
    return notFound();
  }

  const { title, completed } = todo;

  return (
    <>
      <h1 className='text-2xl'>About Todo #{id}</h1>
      <strong className={`${completed ? 'line-through' : 'font-extrabold'}`}>
        {title}
      </strong>
    </>
  );
}
