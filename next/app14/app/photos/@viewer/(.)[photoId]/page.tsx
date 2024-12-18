import Image from 'next/image';
import getPhoto from '@/lib/photos';
import Modal from '@/components/Modal';

export default async function PhotoInterceptor({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  const { title, url } = await getPhoto(+photoId);
  return (
    <Modal>
      <div className='w-full'>
        <Image src={url} alt={title} width={600} height={600} priority />
      </div>
    </Modal>
  );
}
