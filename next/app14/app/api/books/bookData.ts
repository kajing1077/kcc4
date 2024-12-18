export type Book = {
  id: number;
  title: string;
  author: string;
  isbn?: string;
};

export const books = [
  { id: 1, title: '1st book', author: 'Jade1' },
  { id: 2, title: '2nd book', author: 'Jade2' },
  { id: 3, title: '3rd book', author: 'Jade3' },
];
