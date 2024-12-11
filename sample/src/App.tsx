import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { CounterProvider } from './hooks/counter-hook.tsx';
import { useDebounce } from './hooks/timer-hooks.ts';
import useToggle from './hooks/toggle.ts';

// import { useCounter } from './hooks/counter-hook';

function App() {
  const myHandleRef = useRef<MyHandler>(null);
  const [friend, setFriend] = useState(10);
  const [, toggleRerender] = useToggle();

  const friendRef = useRef<HTMLInputElement>(null);

  // const { reset, clear } = useInterval(() => setFriend((pre) => pre + 1), 1000);

  useDebounce(
    () => {
      setFriend(+(friendRef.current?.value || 0));
    },
    1000,
    [friendRef.current?.value]
  );

  return (
    <div className='flex flex-col items-center'>
      <h1>F: {friend}</h1>
      <div className='flex'>
        {/*<Button onClick={reset}>RESET</Button>*/}
        {/*<Button onClick={clear}>CLEAR</Button>*/}
      </div>
      <SessionProvider>
        <CounterProvider>
          <input
            type='number'
            defaultValue={friend}
            onChange={toggleRerender}
            ref={friendRef}
            // onChange={(e) => setFriend(+e.currentTarget.value)}
            placeholder='friend is...'
            className='inp w-64'
          />
          <Hello friend={friend} ref={myHandleRef} />
          <hr />
          <My />
        </CounterProvider>
      </SessionProvider>

      {/* <div className='card'>
        <button
          onClick={() => {
            plusCount();
            if (session.loginUser) session.loginUser.name = 'XXX' + count;
            // console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
          }}
          className='btn'
        >
          App.count is {count}
        </button>
      </div> */}
    </div>
  );
}

export default App;
