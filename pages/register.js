import Image from 'next/image'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { Icon } from '@iconify-icon/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import PhoneImage from '../images/Group-57.png'
import { useState } from 'react'
import Link from 'next/link'
import { setToken } from '../redux/reducers/authReducer'

YupPassword(Yup)

const RegisterSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
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
}).required()

function Register () {
  const { isError, isSuccess, isLoading } = useSelector(state => state.auth)

  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = values => {
    const { data } = http().post('/auth/register', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    })
    dispatch(setToken(data.results.token))
  }

  if (
    isSuccess === true &&
    router.pathname === '/register' &&
    !isLoading &&
    !isError
  ) {
    router.push('/create-pin')
  }

  const showingPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Head>
        <title>Register: MexL Pay</title>
        <meta name='description' content='Register to MexL Pay' />
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
              <Image
                src={PhoneImage}
                alt='Phone Image'
                width={500}
                height={500}
              />
            </div>
            <div className='font-bold text-2xl'>
              App that Covering Banking Needs.
            </div>
            <p>
              MexL Pay is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in MexL Pay everyday with worldwide
              users coverage.
            </p>
          </div>
          <div className='w-2/5 py-16 px-14 flex flex-col gap-5 justify-center'>
            <div className='font-bold text-2xl'>
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </div>
            <p className='mb-10'>
              Transferring money is easier than ever, you can access MexL Pay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            {isError &&
              isError ===
                `duplicate key value violates unique constraint "users_email_key"` && (
                <div className='text-error font-bold text-center'>
                  Email already registered
                </div>
              )}
            {isSuccess && (
              <div className='text-success font-bold text-center'>
                Register Success
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-10'
            >
              <div>
                <div className='w-full input-group'>
                  <span>
                    <Icon
                      icon='material-symbols:person'
                      width='35'
                      height='35'
                    />
                  </span>
                  <input
                    name='firstName'
                    type='text'
                    placeholder='Enter your first name'
                    className='input input-bordered input-primary w-full'
                    {...register('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <span className='text-error mt-2'>
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
              <div>
                <div className='w-full input-group'>
                  <span>
                    <Icon
                      icon='material-symbols:person'
                      width='35'
                      height='35'
                    />
                  </span>
                  <input
                    name='lastName'
                    type='text'
                    placeholder='Enter your last name'
                    className='input input-bordered input-primary w-full'
                    {...register('lastName')}
                  />
                </div>
                {errors.lastName && (
                  <span className='text-error mt-2'>
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
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
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <span className='text-error mt-2'>
                    {errors.email?.message}
                  </span>
                )}
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
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <span className='text-error mt-2'>
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={!isDirty || !isValid || isLoading}
              >
                Register
              </button>
            </form>
            <div className='text-center'>
              Already have an account?{' '}
              <Link href='/login' className='hover:text-secondary'>
                Let’s Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Register
