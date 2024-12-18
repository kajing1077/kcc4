import { PropsWithChildren } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='border p-5'>
        <h1 className='text-2xl '>About Layout</h1>
        <div className='flex gap-3'>
          <a href='/hello/morning'>Morning</a>
          <a href='/hello/afternoon'>Afternoon</a>
          <a href='/hello/evening'>Evening</a>
        </div>
        <div className='bg-purple-200 text-center'>{children}</div>
      </div>
    </>
  );
}
