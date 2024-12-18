'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import getPhoto, { type Photo } from '@/lib/photos';

export default function Photo({
  params: { photoId },
}: {
  params: {
    photoId: string;
  };
}) {
  const router = useRouter();
  const goList = () => {
    router.push('/photos');
  };
  const [photo, setPhoto] = useState<Photo>();
  useLayoutEffect(() => {
    (async function () {
      const data = await getPhoto(+photoId);
      setPhoto(data);
    })();
  }, [photoId]);

  return (
    <>
      <h1 className='text-2xl'>
        {photo?.albumId} - {photo?.title}
      </h1>
      {photo && (
        <Image
          onClick={goList}
          src={photo.url}
          alt={photo.title}
          width={600}
          height={600}
        />
      )}
    </>
  );
}
