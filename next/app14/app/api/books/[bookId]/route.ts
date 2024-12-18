// import { getBook } from '@/actions/books';
// import { notFound } from 'next/navigation';
// import { Book, books } from '../bookData';
// type Params = {
//   params: { bookId: string };
// };
// export function GET(req: Request, { params: { bookId } }: Params) {
//   const book = getBook(+bookId);
//   if (!book) return notFound();
//   return Response.json(book);
// }
// export function DELETE(_req: Request, { params: { bookId } }: Params) {
//   const idx = books.findIndex((book) => book.id === +bookId);
//   if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });
//   books.splice(idx, 1);
//   return Response.json({ message: 'ok', code: 200 });
// }
// export async function PATCH(req: Request, { params: { bookId } }: Params) {
//   const { title, author } = (await req.json()) as Book;
//   const book = save(+bookId, title, author);
//   return Response.json(book);
// }
import { getBook, save } from '@/actions/books';
import { notFound } from 'next/navigation';
import { Book, books } from '../bookData';

type Params = {
  params: { bookId: string };
};

export function GET(_req: Request, { params: { bookId } }: Params) {
  const book = getBook(+bookId);
  if (!book) return notFound();

  return Response.json(book);
}

export async function PATCH(req: Request, { params: { bookId } }: Params) {
  const { title, author } = (await req.json()) as Book;

  const book = save(+bookId, title, author);

  return Response.json(book);
}

export function DELETE(_req: Request, { params: { bookId } }: Params) {
  const idx = books.findIndex((book) => book.id === +bookId);
  if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });

  books.splice(idx, 1);
  return Response.json({ message: 'ok', code: 200 });
}
