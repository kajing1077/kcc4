'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';

export default function Me() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const goBack = () => {
    router.back();
  };

  const goHello = () => {
    router.push('/hello');
  };

  const changeSearchParams = (x: string) => {
    urlSearchParams.set('xxx', x);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };
  return (
    <Modal>
      <div className='flex justify-between text-sm bg-white'>
        <button onClick={goBack}>Back</button>
        <button onClick={goHello}>Hello</button>
        <button onClick={() => changeSearchParams('1000')}>change-xxx</button>
        Me Page {pathname}?xxx={searchParams.get('xxx')}
      </div>
    </Modal>
  );
}
