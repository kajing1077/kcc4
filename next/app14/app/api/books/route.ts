import { NextRequest } from 'next/server';
import { books } from './bookData';

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  console.log('qqqqqq>>>', searchParams.get('q'));
  const searchStr = searchParams.get('searchStr');
  let rets = books;

  if (searchStr)
    rets = rets.filter(
      ({ title, author }) =>
        title.includes(searchStr) || author.includes(searchStr)
    );

  return Response.json(rets);
}

export async function POST(req: Request) {
  const { title, author } = await req.json();

  const id = Math.max(...books.map(({ id }) => id), 0) + 1;
  const newer = { id, title, author };
  books.push(newer);

  return Response.json(newer);
}
