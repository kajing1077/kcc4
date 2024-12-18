import { ReactNode } from 'react';

export default function PhotosLayout({
  children,
  viewer,
}: {
  children: ReactNode;
  viewer: ReactNode;
}) {
  return (
    <>
      <div className='bg-cyan-300 w-full'>Header...</div>
      {children}
      {viewer}
    </>
  );
}
