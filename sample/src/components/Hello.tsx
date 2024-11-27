import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-hook';
import { useSession } from '../hooks/session-context';

type TitleProps = {
  text: string;
  name?: string;
};

const Title = ({text, name}: TitleProps) => {
  // console.log('Titttttttttttttt!!');
  return (
    <h1 className='text-3xl'>
      {text} {name}
    </h1>
  );
};

const Body = ({children}: { children: ReactNode }) => {
  // console.log('bodddddddd!!!');
  return (
    <div className='red' style={{color: 'blue'}}>
      {children}
    </div>
  );
};

// function useState<S>(initValueOrFn) {
//   const state = {
//     _state: initValueOrFn,
//     get state() {
//       return this._state;
//     },
//     setState(x: S) {
//       this._state = x;
//       vdom.trigger(this);
//     }
//   }

//   return [state.state, state.setState];
// }

type Props = {
  age: number;
};

export type MyHandler = {
  jumpHelloState: () => void;
};

function Hello({age}: Props, ref: ForwardedRef<MyHandler>) {
  // const [myState, setMyState] = useState(() => new Date().getTime());
  const {
    session: {loginUser},
  } = useSession();
  const {count, plusCount, minusCount} = useCounter();
  const [myState, setMyState] = useState(0);
  let v = 1;

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  return (
    <div className='my-5 border border-slate-300 p-3'>
      <Title text='Hello~' name={loginUser?.name}/>
      <Body>
        <h3 className='text-center text-2xl'>myState: {myState}</h3>
        This is Hello Body Component. {v} - {age}
      </Body>
      <button
        onClick={() => {
          v++;
          setMyState(myState + 1);
          plusCount();
          // console.log('v/myState=', v, myState);
        }}
        className='btn'
      >
        Hello(+)
      </button>
      <strong id='cnt' className='mx-5'>
        {count}
      </strong>
      <button onClick={() => minusCount()} className='btn btn-danger'>
        Minus
      </button>
    </div>
  );
}

const ImpHello = forwardRef(Hello);

export default ImpHello;