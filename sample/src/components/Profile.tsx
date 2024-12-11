import { ForwardedRef, forwardRef } from 'react';
import { useSession } from '../hooks/session-context';
// import Button from './atoms/Button';

const Profile = forwardRef(
  (_: unknown, ref: ForwardedRef<HTMLButtonElement>) => {
    const { session, logout } = useSession();
    return (
      <div className='mb-3 border px-5 py-2'>
        <button
          onClick={logout}
          ref={ref}
          className='btn btn-primary normal-case'
        >
          {session.loginUser?.name} Sign Out
        </button>

        {/* <Button onClick={logout} text='SignOut' /> */}
      </div>
    );
  }
);

Profile.displayName = 'Profile';

export default Profile;
