import Link from 'next/link';
import { PropsWithChildren } from 'react';

const TIMES = ['morning', 'afternoon', 'evening', 'night'];

export default function HiLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='border p-5'>
        <h1 className='text-2xl'>Hi Layout</h1>
        <div className='flex gap-3'>
          {TIMES.map((time) => (
            <Link key={time} href={`/hi/${time}`} className='capitalize'>
              {time}
            </Link>
          ))}
        </div>
        <div className='bg-purple-200 text-center'>{children}</div>
      </div>
    </>
  );
}
