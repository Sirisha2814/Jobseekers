import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '@/features/auth/authSlice';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { Icon } from 'react-icons-kit';
import Header from '@/components/Header';

function Login() {
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const handleToggle = (field) => {
    if (field === 'password') {
      setType(type === 'password' ? 'text' : 'password');
      setIcon(type === 'password' ? eye : eyeOff);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!password) {
      errors.push('Password is Required...');
    }
    if (password.length < 8 || password.length > 20) {
      errors.push('Password must be between 8 to 20 characters long');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      router.push('/login')
    }
    if (isSuccess || user) {
      router.push('/dashboard');
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, router, dispatch]);

  const validateInput = (field, value) => {
    if(field === 'email') {
        const emailRegex =
          /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?)*@(?=.*[a-zA-Z])[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
        setemailError(emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address');
      } else if(field==='phoneNumber'){
        const phoneNumberRegex = /^([6789]\d{9})$/;
        setPhoneNumberError(phoneNumberRegex.test(value.trim()) ? '' : 'Phone number must start with 6789 and be 10 digits');
      } 
      else if (field === 'password') {
      const errors = validatePassword(value);
      setpasswordError(errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInput('email', email);
    validateInput('password', password);
    validateInput('phoneNumber',phoneNumber);

    const hasErrors =
    emailError || phoneNumberError || (passwordError && passwordError.length > 0);

    if (!hasErrors) {
      const userData = {
        email,
        phoneNumber,
        password,
      };

      dispatch(login(userData))
        .then((result) => {
          if (result.payload) {
            // toast.success('Login successful');
          } else {
            toast.error(result.error.message);
          }
        })
        .catch((error) => {
          toast.error('An error occurred while logging in.');
          console.error(error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <div className='w-full max-w-md'>
          <div className='flex items-center justify-center mb-8'>
            <h1 className='text-2xl font-semibold text-gray-700'>Login</h1>
          </div>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className='mb-5'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={(e) => setemail(e.target.value)}
                  onBlur={() => validateInput('email', email)}
                  onFocus={() => setemailError('')}
                />
                <span className='text-red-500 text-xs italic'>{emailError}</span>
              </div>
        
              <div className='mb-6 relative'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone Number'>
                  Phone Number
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='phoneNumber'
                  type='phoneNumber'
                  value={phoneNumber}
                  placeholder='Enter phoneNumber'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => validateInput('phoneNumber', phoneNumber)}
                  onFocus={() => setPhoneNumberError('')}
                />
                <span className='text-red-500 text-xs italic'>{phoneNumberError}</span>
              </div>

            <div className='mb-6 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <div className='flex'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type={type}
                  value={password}
                  placeholder='Enter password'
                  onChange={(e) => setpassword(e.target.value)}
                  onBlur={() => validateInput('password', password)}
                  onFocus={() => setpasswordError('')}
                />
                <span
                  className='ml-2 mt-1 cursor-pointer'
                  onClick={() => handleToggle('password')}
                >
                  <Icon icon={icon} size={15} />
                </span>
              </div>
              {passwordError && passwordError.length > 0 && (
                <div className='text-red-500 text-xs italic'>
                  {passwordError.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            
            <div className='mb-6'>
              <div className='flex items-center justify-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
