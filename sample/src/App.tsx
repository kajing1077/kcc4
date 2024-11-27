// import { useState } from 'react';
// import './App.css';
// import Hello from './components/Hello';
// import My from './components/My';
//
// const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };
//
// type LoginUser = typeof SampleSession.loginUser;
// type CartItem = { id: number; name: string; price: number };
// export type Session = { loginUser: LoginUser | null; cart: CartItem[] };
//
// function App() {
//   const [count, setCount] = useState(0);
//   const [session, setSession] = useState<Session>(SampleSession);
//
//   const plusCount = () => {
//     setCount(count + 1);
//     console.log(count);
//   };
//   const minusCount = () => setCount(count - 1);
//   const logout = () => setSession({ ...session, loginUser: null });
//   const login = (id: number, name: string) =>
//     setSession({ ...session, loginUser: { id, name } });
//
//   return (
//     <>
//       <div className='mt-5 flex flex-col items-center'>
//         <Hello
//           name='kim'
//           age={20}
//           count={count}
//           plusCount={plusCount}
//           minusCount={minusCount}
//         />
//         {/* <hr /> */}
//         <My session={session} logout={logout} login={login} />
//         {/* <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//       </div> */}
//       </div>
//     </>
//   );
// }
//
// export default App;
import { useRef } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { CounterProvider } from "./hooks/counter-hook.tsx";

// import { useCounter } from './hooks/counter-hook';

function App() {
  const myHandleRef = useRef<MyHandler>(null);
  return (
    <div className='flex flex-col items-center'>
      <SessionProvider>
        <CounterProvider>
          <Hello age={33} ref={myHandleRef}/>
          <hr/>
          <My/>
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