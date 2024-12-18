'use client';

import { useFetch } from '@/hooks/fetch-hooks';
import Link from 'next/link';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Book } from '../api/books/bookData';

export default function BooksLayout({ children }: { children: ReactNode }) {
  // const [books, setBooks] = useState<Book[]>([]);
  // const [searchStr, setSearchStr] = useState('');

  // useLayoutEffect(() => {
  //   (async function () {
  //     const books = (await fetch('http://localhost:3000/api/books').then(
  //       (res) => res.json()
  //     )) as Book[];
  //     setBooks(books);
  //   })();
  // }, []);
  const {
    data: books,
    isLoading,
    error,
  } = useFetch<Book[]>('http://localhost:3000/api/books');

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h1 className='text-2xl'>My Book Case</h1>

      <div className='grid grid-cols-2 gap-3 w-full'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <ul className='border'>
            {books?.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
        <div className='border w-full'>{children}</div>
      </div>
    </>
  );
}
