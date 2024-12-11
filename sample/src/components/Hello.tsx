import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useReducer,
} from 'react';
import { useCounter } from '../hooks/counter-hook';
import { useSession } from '../hooks/session-context';
import { useFetch } from '../hooks/fetch-hook.ts';
import { FaSpinner } from 'react-icons/fa6';

type TitleProps = {
  text: string;
  name?: string;
};

type PlaceUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const Title = ({ text, name }: TitleProps) => {
  // console.log('Titttttttttttttt!!');
  return (
    <h1 className='text-3xl'>
      {text} {name}
    </h1>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  // console.log('bodddddddd!!!');
  return (
    <div className='red' style={{ color: 'blue' }}>
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
  friend: number;
};

// type WithoutParamFunction<T> = () => T;
// useState(x) | useState(() => x)
// setState(x)
// ->-> dispatch(x) =>=> reducer(s, x)
// setState((pre) => pre + 1)
// ->-> dispatch(x) =>=> reducer(s, x)
function useMyState<S>(init: S | (() => S)) {
  const [state, dispatch] = useReducer(
    (pre: S, action: S | ((s: S) => S)) =>
      isActionFunction<S>(action) ? action(pre) : action,
    isInitializerFunction<S>(init) ? init() : init
  );

  return [state, dispatch] as const;
}

function isActionFunction<T>(x: unknown): x is (t: T) => T {
  return typeof x === 'function';
}

function isInitializerFunction<T>(x: unknown): x is () => T {
  return typeof x === 'function';
}

export type MyHandler = {
  jumpHelloState: () => void;
};

function Hello({ friend }: Props, ref: ForwardedRef<MyHandler>) {
  // const [myState, setMyState] = useState(() => new Date().getTime());
  const {
    session: { loginUser },
  } = useSession();
  const { count, plusCount, minusCount } = useCounter();
  // const [myState, setMyState] = useState(0);
  const [myState, setMyState] = useMyState(0);
  let v = 1;

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  const {
    data: friendInfo,
    isLoading,
    error,
  } = useFetch<PlaceUser>(
    `https://jsonplaceholder.typicode.com/users/${friend}`,
    true,
    [friend]
  );

  return (
    <div className='my-5 w-2/3 border border-slate-300 p-3 text-center'>
      <Title text='Hello~' name={loginUser?.name} />
      <Body>
        <h3 className='text-center text-2xl'>myState: {myState}</h3>
        {isLoading ? (
          <h3 className='flex justify-center'>
            <FaSpinner size={20} className='animate-spin text-slate-500' />
          </h3>
        ) : error ? (
          <strong className='neon-slate text-primary rounded-md p-3'>
            {error.message && error.message.startsWith('404')
              ? `Your friend is not found(${friend})`
              : error.message}
          </strong>
        ) : (
          <strong> My Friend is {friendInfo?.username}.</strong>
        )}{' '}
        {v} - {friend}
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
