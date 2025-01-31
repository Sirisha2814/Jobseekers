import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { useEffect } from 'react';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()).then(() => {
      router.push('/login');
    });
  };

  useEffect(() => {
    const handleIncognitoLogout = () => {
      if (user && window && window.private) {
        // User is logged in and in incognito mode
        dispatch(logout()).then(() => {
          router.push('/login');
        });
      }
    };

    // Check if in incognito mode
    if (window && 'private' in window) {
      handleIncognitoLogout();
    }

    // Listen for changes in incognito mode
    const onStorageChange = () => {
      handleIncognitoLogout();
    };

    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, [user, router, dispatch]);

  return (
    <header className='flex items-center justify-between p-2 bg-grey text-black'>
      <div>
        <Link href='/dashboard'>
          <p className='flex items-center space-x-2'>
            <p className='text-1xl font-semibold'>Dashboard</p>
          </p>
        </Link>
      </div>
      
      <ul className='flex items-center space-x-2'>
        {user ? (
          <li>
            <button
              className='bg-white text-blue-500 hover:bg-blue-500 hover:text-black font-semibold py-1 px-2 rounded'
              onClick={onLogout}
            >
               Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href='/login'>
                <p className='bg-white text-black-500 hover:bg-blue-500 hover:text-black font-semibold py-2 px-4 rounded'>Login</p></Link>
            </li>
            <li>
              <Link href='/register'>
                <p className='bg-white text-black-400 hover:bg-blue-400 hover:text-black font-semibold py-2 px-4 rounded'>Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
