import Login from './Login.tsx';
import Profile from './Profile.tsx';
import Button from './atoms/Button.tsx';
import { useEffect, useState, useMemo, useRef, useReducer } from 'react';
import { useSession } from '../hooks/session-context.tsx';
import { FaPlus } from 'react-icons/fa6';
import Item from './Item.tsx';
import useToggle from '../hooks/toggle.ts';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/timer-hooks.ts';

export default function My() {
  const { session, toggleReloadSession } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  // const [isAdding, setIsAdding] = useState(false);
  //
  // const toggleAdding = () => {
  //   setIsAdding((pre) => !pre);
  // };
  const DISCOUNT_RATE = 0.1;

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  // onChange = {(e) => addPrice(+e.currentTarget.value)}
  // const [totalPrice, addPrice] = useReducer(
  //   (acc, toAddPrice) => acc + toAddPrice,
  //   0
  // );

  const dcPrice = useMemo(
    () => Math.round(totalPrice * DISCOUNT_RATE),
    [totalPrice]
  );

  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const [searchstr, setSearchstr] = useState('');
  const [, toggleSearch] = useToggle();

  const searchRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      setSearchstr(searchRef.current?.value || '');
      console.log('useDebounce >> search debounce', searchRef.current?.value);
    },
    2000,
    [searchRef.current?.value]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetch('/data/sample.json', { signal })
      .then((res) => res.json())
      .then((data) => console.log(data));

    return () => {
      abortController.abort(); // closure
    };
  }, []);

  return (
    <>
      {session.loginUser ? (
        <div className='flex gap-5'>
          <Profile ref={logoutButtonRef} />
          <Button onClick={() => logoutButtonRef.current?.focus()}>
            MySignOut
          </Button>
        </div>
      ) : (
        <Login />
      )}

      <div className='w-2/3 border p-3'>
        <div className='flex items-center gap-2'>
          <FaSearch />
          <input
            type='text'
            onChange={toggleSearch}
            className='inp'
            placeholder='아이템명 검색..'
            ref={searchRef}
          />
        </div>

        <ul className='mt-3'>
          {session.cart?.length ? (
            session.cart
              .filter(({ name }) => name.includes(searchstr))
              .map((item) => (
                <li key={item.id}>
                  <Item item={item} />
                </li>
              ))
          ) : (
            <li className='text-slate-500'>There is no items.</li>
          )}
          <li className='mt-3 text-center'>
            {isAdding ? (
              <Item
                item={{ id: 0, name: '', price: 0 }}
                toggleAdding={() => toggleAdding()}
              />
            ) : (
              <Button onClick={toggleAdding}>
                <FaPlus /> Add Item
              </Button>
            )}
          </li>
        </ul>
      </div>
      <div className='mb-3 flex flex-col'>
        <span>총액: {totalPrice.toLocaleString()}원</span>
        <span>할인: {dcPrice.toLocaleString()}원</span>
      </div>
      <Button onClick={toggleReloadSession}>toggle</Button>
    </>
  );
}
