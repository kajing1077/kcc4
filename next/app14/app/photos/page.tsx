import Image from 'next/image';
import Link from 'next/link';
import { getPhotos } from '@/lib/photos';

export default async function Photos() {
  const photos = await getPhotos();
  return (
    <>
      <h1 className='text-2xl'>Photos</h1>
      <div className='grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-3'>
        {photos.map(({ id, thumbnailUrl, title }) => (
          <Link
            key={id}
            href={`/photos/${id}`}
            className='opacity-85 hover:opacity-100'
          >
            <Image src={thumbnailUrl} alt={title} width={150} height={150} />
          </Link>
        ))}
      </div>
    </>
  );
}
