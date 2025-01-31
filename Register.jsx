import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '@/features/auth/authSlice';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Header from '@/components/Header';

function Register() {
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setusername] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [cpasswordError, setcpasswordError] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [confirmType, setConfirmType] = useState('password');
  const [confirmIcon, setConfirmIcon] = useState(eyeOff);

  const validatePassword = (password) => {
    const errors = [];
    if (!password) {
      errors.push('Password is Required...');
    }
    if (password.length > 8) {
      errors.push('Password must be at least 8 characters long');
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

  const handleToggle = (field) => {
    if (field === 'password') {
      setType(type === 'password' ? 'text' : 'password');
      setIcon(type === 'password' ? eye : eyeOff);
    } else if (field === 'cpassword') {
      setConfirmType(confirmType === 'password' ? 'text' : 'password');
      setConfirmIcon(confirmType === 'password' ? eye : eyeOff);
    }
  };

  const validateInput = (field, value) => {
    if (field === 'username' && value.trim() === '') {
      setusernameError('Username field cannot be empty');
    } else if (field === 'username') {
      const usernameregex = /^[a-zA-Z#_ ]{5,20}$/;
      setusernameError(!usernameregex.test(value.trim()) ? 'Username must be 5 - 20 Characters and can contain #_ ' : '');
    } else if (field === 'email') {
      const emailRegex =
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]+(\+[a-zA-Z0-9]+)?)*@(?=.*[a-zA-Z])[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
      setEmailError(emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address');
    } else if (field === 'phoneNumber') {
      const phoneNumberRegex = /^([6789]\d{9})$/;
      setPhoneNumberError(phoneNumberRegex.test(value.trim()) ? '' : 'Phone number must start with 6789 and be 10 digits');
    } else if (field === 'password') {
      const errors = validatePassword(value);
      setpasswordError(errors);
    } else if (field === 'cpassword') {
      setcpasswordError(value === password ? '' : 'Passwords do not match');
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      router.push('/register')
    }
    if (isSuccess || user) {
      router.push('/dashboard');
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, router, dispatch]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  if(!username||!email||!password||!phoneNumber){
    toast.error('Please include all fields')
  }
    
    console.log("Handling submit...");
  
    const passwordMatch = password === cpassword;
  
    if (!passwordMatch) {
      toast.error('Password does not match');
      return;
    }
  
    if (username) {
      const userData = {
        username,
        password,
        email,
        phoneNumber,
      };
      console.log(userData);
  
      try {
      dispatch(register(userData));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

return (
    <>
      <Header />
      <section className='flex flex-col items-center justify-center min-h-screen border p-8 bg-gray-200'>
      <div className='w-full max-w-md'>
      <div className='mb-6 flex items-center justify-center'>
      <h1 className='text-2xl font-semibold text-black-500'>Register</h1>
      </div>
            <div className='mb-4 flex items-center justify-center'>
              <div className='mb-6 relative'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                  Username
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='username'
                  value={username}
                  placeholder='Enter name'
                  onChange={(e) => setusername(e.target.value)}
                  onBlur={() => validateInput('username', username)}
                  onFocus={() => setusernameError('')}
                />
                <span className='text-red-500 text-xs italic'>{usernameError}</span>
              </div>
            </div>
            <div className='mb-4 relative'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateInput('email', email)}
                  onFocus={() => setEmailError('')}
                />
                <span className='text-red-500 text-xs italic'>{emailError}</span>
              </div>
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
                <span className='ml-2 mt-1 cursor-pointer' onClick={() => handleToggle('password')}>
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

            <div className='mb-6 relative'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cpassword'>
                Confirm Password
              </label>
              <div className='flex'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='cpassword'
                  type={confirmType}
                  value={cpassword}
                  placeholder='Confirm password'
                  onChange={(e) => setcpassword(e.target.value)}
                  onBlur={() => validateInput('cpassword', cpassword)}
                  onFocus={() => setcpasswordError('')}
                />
                <span className='ml-2 mt-1 cursor-pointer' onClick={() => handleToggle('cpassword')}>
                  <Icon icon={confirmIcon} size={15} />
                </span>
              </div>
              {cpasswordError && Array.isArray(cpasswordError) && cpasswordError.length > 0 && (
                <div className='text-red-500 text-xs italic'>
                  {cpasswordError.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            <div className='flex items-center justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
      </section>
    </>
  );
}

export default Register;
