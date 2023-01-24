import Head from 'next/head'
import NavbarHome from '../components/navbarHome'
import FooterHome from '../components/footerHome'
import HomeMenu from '../components/homeMenu'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { Icon } from '@iconify-icon/react'
import IsLogin from '../components/isLogin'
import http from '../helpers/http'
import { useState } from 'react'
import { useSelector } from 'react-redux'

YupPassword(Yup)

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ChangePhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10)
    .max(13)
    .required()
})

const ChangePhoneNumberContent = () => {
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ChangePhoneNumberSchema),
    defaultValues: {
      phoneNumber: ''
    }
  })

  const onSubmit = async data => {
    try {
      setIsLoading(true)
      const res = await http(token).post('/profile/phone-number', data)
      if (res.data.success === true) {
        setIsError(false)
        setIsSuccess(true)
        setIsLoading(false)
      }
    } catch (error) {
      if (error) {
        setIsLoading(false)
        setIsError(true)
        setIsSuccess(false)
      }
    }
  }

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='flex flex-col gap-10 py-5'>
            <div className='font-bold'>Edit Phone Number</div>
            <p className='w-1/3'>
              Add at least one phone number for the transfer ID so you can start
              transfering your money to another user.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col items-center gap-5 mt-10'
            >
              {isError && (
                <span className='text-error mt-2'>
                  Failed to change phone number
                </span>
              )}
              {isSuccess && (
                <span className='text-success mt-2'>
                  Phone number changed successfully
                </span>
              )}
              <div className='w-1/3 input-group relative'>
                <span>
                  <Icon
                    icon='material-symbols:phone-enabled'
                    width='35'
                    height='35'
                  />
                </span>
                <input
                  name='phoneNumber'
                  type='tel'
                  placeholder='Enter your phone number'
                  className='input input-bordered input-primary w-full'
                  {...register('phoneNumber', { required: true })}
                />
              </div>
              {errors.phoneNumber && (
                <span className='text-error mt-2'>
                  {errors.phoneNumber?.message}
                </span>
              )}
              <button
                type='submit'
                className='btn btn-primary w-1/3'
                disabled={!isDirty || !isValid || isLoading}
              >
                Edit Phone Number
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChangePhoneNumber () {
  return (
    <>
      <Head>
        <title>Change Phone Number: MexL Pay</title>
        <meta name='description' content='Change Phone Number MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <ChangePhoneNumberContent />
      <FooterHome />
    </>
  )
}

export default IsLogin(ChangePhoneNumber)
