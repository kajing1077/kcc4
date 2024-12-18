'use client';

import { useFetch } from '@/hooks/fetch-hooks';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { type Book } from '../api/books/bookData';

export default function Books() {
  // const [books, setBooks] = useState<Book[]>([]);
  const [searchStr, setSearchStr] = useState('');

  const {
    data: books,
    isLoading,
    error,
  } = useFetch<Book[]>('http://localhost:3000/api/books');

  // useLayoutEffect(() => {
  //   (async function () {
  //     const books = (await fetch('http://localhost:3000/api/books').then(
  //       (res) => res.json()
  //     )) as Book[];
  //     setBooks(books);
  //   })();
  // }, []);

  return (
    <>
      <h1 className='text-xl'> Books</h1>

      <Input
        onChange={(e) => setSearchStr(e.currentTarget.value)}
        placeholder='title or writer...'
      />
      {books?.length ? (
        <ul className='x'>
          {books
            .filter(
              ({ title, author }) =>
                title.includes(searchStr) || author.includes(searchStr)
            )
            .map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>{title}</Link>
              </li>
            ))}
        </ul>
      ) : (
        <div>There is no books.</div>
      )}
    </>
  );
}
