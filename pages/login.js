import Image from 'next/image';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify-icon/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/reducers/authReducer';
import PhoneImage from '../images/Group-57.png';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import IsNotLogin from '../components/IsNotLogin';
import http from '../helpers/http';
import useSWR from 'swr';

YupPassword(Yup);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1)
});

function Login () {
  const { token } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async values => {
    try {
      const { data } = await http().post('/auth/login', {
        email: values.email,
        password: values.password
      });
      dispatch(setToken(data.results.token));
    } catch (error) {
      setAlertMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      Router.push('/home');
    }
  }, [token]);

  const showingPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <title>Login: MexL Pay</title>
        <meta name='description' content='Login to MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='flex h-screen'>
          <div className='w-3/5 py-16 px-14 bg-primary gap-5 flex flex-col justify-center'>
            <div>
              <div className='text-secondary font-bold text-2xl btn glass btn-disabled'>
                MexL Pay
              </div>
            </div>
            <div className='relative w-full flex flex-col items-center'>
              <Image src={PhoneImage} alt='Phone Image' width={500} height={500} />
            </div>
            <div className='font-bold text-2xl'>App that Covering Banking Needs.</div>
            <p>
              MexL Pay is an application that focussing in banking needs for all users in the world.
              Always updated and always following world trends. 5000+ users registered in MexL Pay
              everyday with worldwide users coverage.
            </p>
          </div>
          <div className='w-2/5 py-16 px-14 flex flex-col gap-5 justify-center'>
            <div className='font-bold text-2xl'>
              Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users
            </div>
            <p className='mb-10'>
              Transferring money is easier than ever, you can access MexL Pay wherever you are.
              Desktop, laptop, mobile phone? we cover all of that for you!
            </p>
            {alertMessage && (
              <div className='alert alert-error'>
                <div className='flex-1'>
                  <Icon icon='mdi:alert-circle' className='w-5 h-5 mr-2' />
                  <label>{alertMessage}</label>
                </div>
                <Icon
                  icon='mdi:close'
                  className='w-5 h-5 ml-2 cursor-pointer'
                  onClick={() => {
                    setAlertMessage('');
                  }}
                />
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
              <div>
                <div className='w-full input-group'>
                  <span>
                    <Icon icon='mdi:email' width='35' height='35' />
                  </span>
                  <input
                    name='email'
                    type='text'
                    placeholder='Enter your e-mail'
                    className='input input-bordered input-primary w-full'
                    {...register('email', { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && <span className='text-error mt-2'>{errors.email?.message}</span>}
              </div>
              <div>
                <div className='w-full input-group relative'>
                  <span>
                    <Icon icon='mdi:lock' width='35' height='35' />
                  </span>
                  {showPassword ? (
                    <Icon
                      icon='mdi:eye-off'
                      className='absolute top-1 right-2 z-10'
                      width='35'
                      height='35'
                      onClick={showingPassword}
                    />
                  ) : (
                    <Icon
                      icon='mdi:eye'
                      className='absolute top-1 right-2 z-10'
                      width='35'
                      height='35'
                      onClick={showingPassword}
                    />
                  )}
                  <input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='input input-bordered input-primary w-full'
                    autoComplete='on'
                    {...register('password', { required: true })}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.password && (
                  <span className='text-error mt-2'>{errors.password?.message}</span>
                )}
              </div>
              <div className='-mt-8 text-right'>
                <Link href='/forgot-password' className='hover:text-secondary'>
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={!isDirty || !isValid || isSubmitting}>
                Login
              </button>
            </form>
            <div className='text-center'>
              Don’t have an account?{' '}
              <Link href='/register' className='hover:text-secondary'>
                Let’s Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default IsNotLogin(Login);
